import { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Plus, Pencil, Trash2, X, Upload, Save, ChevronDown, Eye, EyeOff } from 'lucide-react';

const PAGES = [
  { value: 'home',                  label: 'Home' },
  { value: 'for-brands',            label: 'For Brands' },
  { value: 'for-investors',         label: 'For Investors' },
  { value: 'growth-opportunities',  label: 'Growth Opportunities' },
  { value: 'our-approach',          label: 'Our Approach' },
  { value: 'industries',            label: 'Industries' },
  { value: 'about',                 label: 'About' },
  { value: 'insights',              label: 'Insights' },
  { value: 'contact',               label: 'Contact' },
];

const SECTION_LABELS = {
  stats: 'Stats / Numbers', pillars: 'Pillars', offerings: 'Offerings',
  'photo-cards': 'Photo Cards', services: 'Services', 'why-us': 'Why Us',
  categories: 'Categories', differentiators: 'Differentiators',
  steps: 'Approach Steps', principles: 'Principles', sectors: 'Sectors / Industries',
  'focus-areas': 'Focus Areas',
};

const EMPTY_ITEM = { badge: '', tag: '', title: '', subtitle: '', description: '', metrics: '', imageUrl: '', link: '', order: 0 };

const SECTION_CONFIG = {
  stats:           { show: ['title','subtitle'],                        labels: { title: 'Number (e.g. 250+)', subtitle: 'Label (e.g. Projects Supported)' } },
  pillars:         { show: ['title','description'],                     labels: { title: 'Pillar Name', description: 'Description' } },
  offerings:       { show: ['badge','title','description'],             labels: { badge: 'Icon (◈ ◉ ◎)', description: 'Description' } },
  'photo-cards':   { show: ['tag','title','subtitle','image','link'],   labels: { tag: 'Category Tag', subtitle: 'Sub-label', link: 'Page Link (e.g. /for-brands)' } },
  services:        { show: ['tag','title','description','image'],       labels: { tag: 'Badge (e.g. Franchise Ready)', description: 'Description' } },
  'why-us':        { show: ['badge','title','description'],             labels: { badge: 'Number (01, 02…)', description: 'Supporting text' } },
  categories:      { show: ['tag','title','description','image'],       labels: { tag: 'Sector Tag', description: 'Description' } },
  differentiators: { show: ['badge','title','description'],             labels: { badge: 'Number (01, 02…)', description: 'Supporting text' } },
  steps:           { show: ['badge','title','description'],             labels: { badge: 'Step Number (01–05)', description: 'Step description' } },
  principles:      { show: ['title','description'],                     labels: { title: 'Principle Name', description: 'One-line description' } },
  sectors:         { show: ['badge','title','subtitle','description','metrics'], labels: { badge: 'Number (01–06)', subtitle: 'Sub-categories (e.g. QSR · Cafés)', description: 'Description', metrics: 'Metrics (comma separated)' } },
  'focus-areas':   { show: ['tag','title','description','image'],       labels: { tag: 'Area Tag', description: 'Description' } },
};

const getConfig = section => SECTION_CONFIG[section] || { show: ['badge','tag','title','subtitle','description','metrics','image','link'], labels: {} };
const shows = (section, field) => getConfig(section).show.includes(field);
const label = (section, field, fallback) => getConfig(section).labels[field] || fallback;

const Input = ({ label, value, onChange, placeholder, area }) =>
  area ? (
    <div>
      <label className="block text-gray-400 text-xs mb-1">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f07920] resize-none" />
    </div>
  ) : (
    <div>
      <label className="block text-gray-400 text-xs mb-1">{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f07920]" />
    </div>
  );

export default function AdminPages() {
  const { authFetch, token, API } = useAdminAuth();
  const [page, setPage] = useState('home');
  const [tab, setTab] = useState('hero');
  const [hero, setHero] = useState(null);
  const [heroImg, setHeroImg] = useState(null);
  const [heroImgPrev, setHeroImgPrev] = useState('');
  const [items, setItems] = useState([]);
  const [section, setSection] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_ITEM);
  const [imgFile, setImgFile] = useState(null);
  const [imgPrev, setImgPrev] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const load = useCallback(async () => {
    try {
      const [pageData, allItems] = await Promise.all([
        fetch(`${API}/page/${page}`).then(r => r.json()),
        authFetch(`/content?page=${page}`),
      ]);
      if (pageData.success) { setHero(pageData.data.hero || {}); setHeroImgPrev(pageData.data.hero?.backgroundImage || ''); }
      if (allItems.success) {
        setItems(allItems.data);
        // auto-select first section
        const sections = [...new Set(allItems.data.map(i => i.section))];
        if (sections.length && !sections.includes(section)) setSection(sections[0]);
      }
    } catch (err) { showToast(err.message); }
  }, [page]);

  useEffect(() => { load(); setTab('hero'); }, [page]);

  // ── Hero save ──
  const saveHero = async () => {
    setSaving(true);
    try {
      const fd = new FormData();
      ['label','title','titleHighlight','subtitle','ctaText','ctaLink','backgroundImage'].forEach(k => fd.append(k, hero[k] || ''));
      if (heroImg) fd.append('image', heroImg);
      await fetch(`${API}/page/${page}/hero`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      showToast('Hero saved!');
    } catch (err) { showToast(err.message); } finally { setSaving(false); }
  };

  // ── Content item CRUD ──
  const openAdd = () => {
    setEditing(null); setForm({ ...EMPTY_ITEM, order: items.filter(i => i.section === section).length + 1 });
    setImgFile(null); setImgPrev(''); setModal(true);
  };

  const openEdit = item => {
    setEditing(item);
    setForm({ badge: item.badge || '', tag: item.tag || '', title: item.title || '', subtitle: item.subtitle || '',
      description: item.description || '', metrics: (item.metrics || []).join(', '),
      imageUrl: item.imageUrl || '', link: item.link || '', order: item.order || 0 });
    setImgPrev(item.imageUrl || ''); setImgFile(null); setModal(true);
  };

  const saveItem = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('page', page); fd.append('section', section);
      ['badge','tag','title','subtitle','description','link','order'].forEach(k => fd.append(k, form[k]));
      fd.append('metrics', JSON.stringify(form.metrics ? form.metrics.split(',').map(s => s.trim()).filter(Boolean) : []));
      if (!imgFile && form.imageUrl) fd.append('imageUrl', form.imageUrl);
      if (imgFile) fd.append('image', imgFile);

      const url = editing ? `/content/${editing._id}` : '/content';
      const res = await fetch(`${API}${url}`, {
        method: editing ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const d = await res.json();
      if (!d.success) throw new Error(d.message);
      showToast(editing ? 'Updated!' : 'Added!');
      setModal(false); load();
    } catch (err) { showToast(err.message); } finally { setSaving(false); }
  };

  const deleteItem = async id => {
    if (!confirm('Delete this item?')) return;
    try { await authFetch(`/content/${id}`, { method: 'DELETE' }); showToast('Deleted'); load(); }
    catch (err) { showToast(err.message); }
  };

  const toggleActive = async item => {
    try {
      const fd = new FormData();
      fd.append('isActive', !item.isActive);
      await fetch(`${API}/content/${item._id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      load();
    } catch (err) { showToast(err.message); }
  };

  const sections = [...new Set(items.map(i => i.section))];
  const visibleItems = items.filter(i => i.section === section).sort((a, b) => a.order - b.order);
  const activeCount = visibleItems.filter(i => i.isActive !== false).length;

  return (
    <div className="space-y-4">
      {toast && <div className="fixed bottom-6 right-6 bg-[#f07920] text-white px-4 py-2 rounded-lg text-sm font-medium z-50 shadow-lg">{toast}</div>}

      {/* Page selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-gray-400 text-sm">Page:</span>
        <div className="relative">
          <select value={page} onChange={e => setPage(e.target.value)}
            className="bg-[#0f0f0f] border border-[#1e1e1e] text-white rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-[#f07920] appearance-none cursor-pointer">
            {PAGES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
        {/* Tabs */}
        <div className="flex gap-1 ml-auto bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-1">
          {['hero', 'content'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${tab === t ? 'bg-[#f07920] text-white' : 'text-gray-400 hover:text-white'}`}>{t}</button>
          ))}
        </div>
      </div>

      {/* ── HERO TAB ── */}
      {tab === 'hero' && hero && (
        <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl p-6 space-y-4">
          <h3 className="text-white font-medium text-sm mb-2">Hero Section — <span className="text-[#f07920]">{PAGES.find(p => p.value === page)?.label}</span></h3>

          <Input label="Label (small caps above title)" value={hero.label || ''} onChange={v => setHero(h => ({ ...h, label: v }))} placeholder="e.g. For Brands" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Title" value={hero.title || ''} onChange={v => setHero(h => ({ ...h, title: v }))} placeholder="Main title text" />
            <Input label="Title Highlight (orange)" value={hero.titleHighlight || ''} onChange={v => setHero(h => ({ ...h, titleHighlight: v }))} placeholder="Orange colored part" />
          </div>
          <Input label="Subtitle / Description" value={hero.subtitle || ''} onChange={v => setHero(h => ({ ...h, subtitle: v }))} placeholder="Hero paragraph text" area />
          <div className="grid grid-cols-2 gap-4">
            <Input label="CTA Button Text" value={hero.ctaText || ''} onChange={v => setHero(h => ({ ...h, ctaText: v }))} placeholder="e.g. Start Expanding" />
            <Input label="CTA Button Link" value={hero.ctaLink || ''} onChange={v => setHero(h => ({ ...h, ctaLink: v }))} placeholder="e.g. /contact" />
          </div>

          {/* Background image */}
          <div>
            <label className="block text-gray-400 text-xs mb-2">Background Image</label>
            <label className={`flex items-center justify-center border-2 border-dashed rounded-xl cursor-pointer h-40 transition-colors overflow-hidden ${heroImgPrev ? 'border-[#f07920]/30' : 'border-[#2a2a2a] hover:border-[#f07920]/30'}`}>
              {heroImgPrev
                ? <img src={heroImgPrev} alt="hero bg" className="w-full h-full object-cover" />
                : <><Upload size={20} className="text-gray-500 mr-2" /><span className="text-gray-500 text-sm">Upload image or enter URL below</span></>}
              <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files[0]; if (f) { setHeroImg(f); setHeroImgPrev(URL.createObjectURL(f)); } }} />
            </label>
            <input type="text" value={!heroImg ? (hero.backgroundImage || '') : ''} onChange={e => { setHero(h => ({ ...h, backgroundImage: e.target.value })); setHeroImgPrev(e.target.value); setHeroImg(null); }}
              placeholder="Or paste image URL…"
              className="w-full mt-2 bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f07920]" />
          </div>

          <button onClick={saveHero} disabled={saving} className="flex items-center gap-2 bg-[#f07920] hover:bg-[#d96b1a] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60">
            <Save size={15} /> {saving ? 'Saving…' : 'Save Hero'}
          </button>
        </div>
      )}

      {/* ── CONTENT TAB ── */}
      {tab === 'content' && (
        <div className="space-y-4">
          {/* Section picker + Add */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <select value={section} onChange={e => setSection(e.target.value)}
                className="bg-[#0f0f0f] border border-[#1e1e1e] text-white rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-[#f07920] appearance-none cursor-pointer">
                {sections.map(s => <option key={s} value={s}>{SECTION_LABELS[s] || s}</option>)}
                {sections.length === 0 && <option value="">No sections yet</option>}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            <button onClick={openAdd} className="flex items-center gap-1.5 bg-[#f07920] hover:bg-[#d96b1a] text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors ml-auto">
              <Plus size={15} /> Add Item
            </button>
          </div>

          {/* Items table */}
          {visibleItems.length === 0 ? (
            <div className="text-center py-16 bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl text-gray-500 text-sm">No items in this section.</div>
          ) : (
            <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl overflow-hidden">
              <div className="px-4 py-2 border-b border-[#1e1e1e] flex items-center gap-2">
                <span className="text-gray-500 text-xs">{activeCount} of {visibleItems.length} visible on site</span>
              </div>
              <table className="w-full text-sm">
                <thead><tr className="border-b border-[#1e1e1e]">
                  {['#', 'Image', 'Badge / Tag', 'Title', 'Visible', ''].map(h => (
                    <th key={h} className="text-left text-gray-500 text-xs px-4 py-3 font-medium">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {visibleItems.map(item => {
                    const isOn = item.isActive !== false;
                    return (
                      <tr key={item._id} className={`border-b border-[#161616] transition-colors ${isOn ? 'hover:bg-white/2' : 'opacity-40 hover:opacity-60'}`}>
                        <td className="px-4 py-3 text-gray-500 text-xs">{item.order}</td>
                        <td className="px-4 py-3">
                          {item.imageUrl
                            ? <img src={item.imageUrl} alt="" className="w-12 h-9 object-cover rounded" />
                            : <div className="w-12 h-9 bg-[#1a1a1a] rounded flex items-center justify-center text-gray-600 text-xs">{item.badge || '—'}</div>}
                        </td>
                        <td className="px-4 py-3">
                          {item.badge && <span className="text-[#f07920] text-xs font-mono block">{item.badge}</span>}
                          {item.tag  && <span className="text-gray-400 text-xs">{item.tag}</span>}
                        </td>
                        <td className="px-4 py-3 text-white text-sm max-w-[200px]">
                          <p className="truncate">{item.title}</p>
                          {item.subtitle && <p className="text-gray-500 text-xs truncate">{item.subtitle}</p>}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleActive(item)}
                            title={isOn ? 'Click to hide from site' : 'Click to show on site'}
                            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-all ${isOn ? 'bg-emerald-500/10 text-emerald-400 hover:bg-red-500/10 hover:text-red-400' : 'bg-[#1a1a1a] text-gray-500 hover:bg-emerald-500/10 hover:text-emerald-400'}`}
                          >
                            {isOn ? <><Eye size={11} /> Visible</> : <><EyeOff size={11} /> Hidden</>}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button onClick={() => openEdit(item)} className="p-1.5 text-gray-500 hover:text-[#f07920] transition-colors"><Pencil size={13} /></button>
                            <button onClick={() => deleteItem(item._id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── MODAL ── */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
              <h3 className="text-white font-semibold">{editing ? 'Edit Item' : 'Add Item'} — <span className="text-[#f07920] text-sm">{SECTION_LABELS[section] || section}</span></h3>
              <button onClick={() => setModal(false)} className="text-gray-500 hover:text-white"><X size={18} /></button>
            </div>
            <form onSubmit={saveItem} className="p-6 space-y-4">
              {(shows(section,'badge') || shows(section,'tag')) && (
                <div className={`grid gap-4 ${shows(section,'badge') && shows(section,'tag') ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {shows(section,'badge') && <Input label={label(section,'badge','Badge / Number / Icon')} value={form.badge} onChange={v => set('badge', v)} placeholder="01, ◈, etc." />}
                  {shows(section,'tag')   && <Input label={label(section,'tag','Tag / Category')}         value={form.tag}   onChange={v => set('tag', v)}   placeholder="e.g. Franchise Ready" />}
                </div>
              )}
              <Input label={label(section,'title','Title') + ' *'} value={form.title} onChange={v => set('title', v)} placeholder="Item title" />
              {shows(section,'subtitle') && <Input label={label(section,'subtitle','Subtitle')} value={form.subtitle} onChange={v => set('subtitle', v)} placeholder="Secondary / supporting text" />}
              {shows(section,'description') && <Input label={label(section,'description','Description')} value={form.description} onChange={v => set('description', v)} placeholder="Full description text" area />}
              {shows(section,'metrics') && <Input label={label(section,'metrics','Metrics (comma separated)')} value={form.metrics} onChange={v => set('metrics', v)} placeholder="e.g. High repeat business, Scalable, Multi-format" />}
              {shows(section,'link') && <Input label={label(section,'link','Link / URL')} value={form.link} onChange={v => set('link', v)} placeholder="/for-brands" />}
              <Input label="Display Order" value={String(form.order)} onChange={v => set('order', parseInt(v) || 0)} placeholder="1" />

              {/* Image — upload goes to Cloudinary */}
              {shows(section,'image') && <div>
                <label className="block text-gray-400 text-xs mb-2">Image <span className="text-gray-600">(uploads saved to Cloudinary permanently)</span></label>
                <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer h-28 transition-colors overflow-hidden ${imgPrev ? 'border-[#f07920]/30' : 'border-[#2a2a2a] hover:border-[#f07920]/30'}`}>
                  {imgPrev
                    ? <img src={imgPrev} alt="preview" className="w-full h-full object-cover" />
                    : <><Upload size={20} className="text-gray-500 mb-1" /><span className="text-gray-500 text-xs">Click to upload image</span><span className="text-gray-600 text-[10px]">JPG, PNG, WebP — max 5MB</span></>}
                  <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files[0]; if (f) { setImgFile(f); setImgPrev(URL.createObjectURL(f)); } }} />
                </label>
                {imgFile && <p className="text-[#f07920] text-xs mt-1">✓ {imgFile.name} — will upload to Cloudinary on save</p>}
                <input type="text" value={!imgFile ? form.imageUrl : ''} onChange={e => { set('imageUrl', e.target.value); setImgPrev(e.target.value); setImgFile(null); }}
                  placeholder="Or paste existing image URL…"
                  className="w-full mt-2 bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f07920]" />
              </div>}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-[#2a2a2a] text-gray-400 rounded-lg text-sm hover:border-[#3a3a3a]">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-[#f07920] hover:bg-[#d96b1a] text-white font-semibold py-2.5 rounded-lg text-sm disabled:opacity-60">
                  {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
