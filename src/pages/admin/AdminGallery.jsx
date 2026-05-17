import { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Upload, Trash2, X, Star, StarOff, Filter, CheckSquare, Square } from 'lucide-react';

const CATEGORIES = ['all', 'events', 'activations', 'corporate', 'decor', 'team', 'other'];

export default function AdminGallery() {
  const { authFetch, token } = useAdminAuth();
  const API = 'https://web-mob-hut-backend.vercel.app/api';
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const [toast, setToast] = useState('');
  const [uploadForm, setUploadForm] = useState({ category: 'events', title: '', tags: '' });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const load = async () => {
    setLoading(true);
    try {
      const params = category !== 'all' ? `?category=${category}` : '';
      const res = await fetch(`${API}/gallery${params}`);
      const d = await res.json();
      if (d.success) setImages(d.data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [category]);

  const uploadFiles = async (files) => {
    if (!files.length) return;
    setUploading(true);
    try {
      const fd = new FormData();
      Array.from(files).forEach((f) => fd.append('images', f));
      fd.append('category', uploadForm.category);
      if (uploadForm.title) fd.append('title', uploadForm.title);
      if (uploadForm.tags) fd.append('tags', uploadForm.tags);
      const res = await fetch(`${API}/gallery`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const d = await res.json();
      if (!d.success) throw new Error(d.message);
      showToast(`${d.count} image(s) uploaded!`);
      load();
    } catch (e) { showToast(e.message); } finally { setUploading(false); }
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    uploadFiles(e.dataTransfer.files);
  }, [uploadForm, token]);

  const deleteImage = async (id) => {
    try {
      await authFetch(`/gallery/${id}`, { method: 'DELETE' });
      showToast('Image deleted');
      load();
    } catch (e) { showToast(e.message); }
  };

  const toggleFeatured = async (img) => {
    try {
      await authFetch(`/gallery/${img._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !img.isFeatured }),
      });
      load();
    } catch (e) { showToast(e.message); }
  };

  const bulkDelete = async () => {
    if (!selected.size || !confirm(`Delete ${selected.size} images?`)) return;
    try {
      await authFetch('/gallery/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: [...selected] }),
      });
      setSelected(new Set());
      showToast(`${selected.size} images deleted`);
      load();
    } catch (e) { showToast(e.message); }
  };

  const toggleSelect = (id) => {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  };

  return (
    <div className="space-y-4">
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#2eaff0] text-black px-4 py-2 rounded-lg text-sm font-medium z-50 shadow-lg">
          {toast}
        </div>
      )}

      {/* Upload Area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
          dragOver ? 'border-[#2eaff0] bg-[#2eaff0]/5' : 'border-[#2a2a2a] bg-[#0f0f0f]'
        }`}
      >
        <Upload className="mx-auto text-gray-500 mb-2" size={28} />
        <p className="text-white text-sm font-medium mb-1">Drag & drop images here</p>
        <p className="text-gray-500 text-xs mb-4">or click to browse — JPG, PNG, WEBP supported</p>

        {/* Upload settings */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          <select
            value={uploadForm.category}
            onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
            className="bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#2eaff0]"
          >
            {CATEGORIES.filter((c) => c !== 'all').map((c) => (
              <option key={c} value={c} className="capitalize">{c}</option>
            ))}
          </select>
          <input
            placeholder="Title (optional)"
            value={uploadForm.title}
            onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
            className="bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 placeholder-gray-600 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#2eaff0] w-36"
          />
          <input
            placeholder="Tags (comma separated)"
            value={uploadForm.tags}
            onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
            className="bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 placeholder-gray-600 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#2eaff0] w-44"
          />
        </div>

        <label className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${uploading ? 'bg-gray-700 text-gray-400' : 'bg-[#2eaff0] text-black hover:bg-[#1a9fd8]'}`}>
          {uploading ? (
            <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Uploading...</>
          ) : (
            <><Upload size={14} /> Choose Images</>
          )}
          <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => uploadFiles(e.target.files)} disabled={uploading} />
        </label>
      </div>

      {/* Filter & Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter size={14} className="text-gray-500" />
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all border
              ${category === c ? 'bg-[#2eaff0] text-black border-[#2eaff0]' : 'bg-[#111] text-gray-400 border-[#222] hover:border-[#2eaff0]/40'}`}
          >
            {c}
          </button>
        ))}
        {selected.size > 0 && (
          <button onClick={bulkDelete} className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs hover:bg-red-500/20 transition-colors">
            <Trash2 size={12} /> Delete {selected.size} selected
          </button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16"><div className="w-7 h-7 border-2 border-[#2eaff0] border-t-transparent rounded-full animate-spin" /></div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-sm bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl">
          No images in this category. Upload some above.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {images.map((img) => (
            <div key={img._id} className="group relative bg-[#111] rounded-xl overflow-hidden border border-[#1e1e1e] hover:border-[#2eaff0]/30 transition-all aspect-square">
              <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" loading="lazy" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-between p-2">
                <button onClick={() => toggleSelect(img._id)} className="text-white">
                  {selected.has(img._id) ? <CheckSquare size={16} className="text-[#2eaff0]" /> : <Square size={16} />}
                </button>
                <div className="flex gap-1">
                  <button onClick={() => toggleFeatured(img)} className={`p-1 rounded transition-colors ${img.isFeatured ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}>
                    {img.isFeatured ? <Star size={14} fill="currentColor" /> : <StarOff size={14} />}
                  </button>
                  <button onClick={() => deleteImage(img._id)} className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              {/* Category badge */}
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] bg-black/60 text-gray-300 px-1.5 py-0.5 rounded capitalize">{img.category}</span>
              </div>
              {img.isFeatured && (
                <div className="absolute top-2 right-2">
                  <Star size={12} className="text-yellow-400" fill="currentColor" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
