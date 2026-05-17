import { useEffect, useState } from 'react';
import { MapPin, Briefcase, Clock, ChevronRight, Search, X, Upload, CheckCircle, AlertCircle } from 'lucide-react';

const API = 'https://web-mob-hut-backend.vercel.app/api';

const TYPE_COLORS = {
  'full-time':  'bg-green-500/10 text-green-500 border-green-500/20',
  'part-time':  'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'contract':   'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'internship': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'freelance':  'bg-pink-500/10 text-pink-500 border-pink-500/20',
};

const FILTERS = ['All', 'full-time', 'part-time', 'contract', 'internship', 'freelance'];
const EMPTY_APPLY = { name: '', email: '', phone: '', message: '' };

export default function Careers() {
  const [jobs, setJobs]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('All');
  const [search, setSearch]     = useState('');
  const [expanded, setExpanded] = useState(null);
  const [applyJob, setApplyJob] = useState(null);
  const [applyForm, setApplyForm] = useState(EMPTY_APPLY);
  const [cvFile, setCvFile]     = useState(null);
  const [applyStatus, setApplyStatus] = useState(null);
  const [applyError, setApplyError]   = useState('');

  const openApply = (job) => {
    setApplyJob(job);
    setApplyForm(EMPTY_APPLY);
    setCvFile(null);
    setApplyStatus(null);
    setApplyError('');
  };
  const closeApply = () => { setApplyJob(null); setApplyStatus(null); };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!cvFile) { setApplyError('Please upload your CV (PDF or DOC).'); return; }
    setApplyStatus('loading');
    setApplyError('');
    try {
      const fd = new FormData();
      fd.append('name', applyForm.name);
      fd.append('email', applyForm.email);
      fd.append('phone', applyForm.phone);
      fd.append('message', applyForm.message || `Applied for: ${applyJob.title}`);
      fd.append('jobTitle', applyJob.title);
      fd.append('jobId', applyJob._id);
      fd.append('cv', cvFile);
      const res  = await fetch(`${API}/apply`, { method: 'POST', body: fd });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Submission failed');
      setApplyStatus('success');
    } catch (err) {
      setApplyStatus('error');
      setApplyError(err.message);
    }
  };

  useEffect(() => {
    fetch(`${API}/careers?isActive=true`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setJobs(d.data); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = jobs.filter((j) => {
    const matchType   = filter === 'All' || j.type === filter;
    const q           = search.toLowerCase();
    const matchSearch = !q || j.title.toLowerCase().includes(q) || j.department?.toLowerCase().includes(q) || j.location?.toLowerCase().includes(q);
    return matchType && matchSearch;
  });

  /* Shared input classes */
  const inputCls = `w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#2eaff0]
    bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400
    dark:bg-[#1a1a1a] dark:border-neutral-700 dark:text-white dark:placeholder-neutral-600`;

  return (
    <div className="min-h-screen font-sans
      bg-white text-gray-900
      dark:bg-black dark:text-white">

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2eaff0]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-5xl text-center relative">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#2eaff0] mb-4 block">Join Our Team</span>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wide leading-tight mb-6">
            Build Something <br />
            <span className="text-[#2eaff0]">Extraordinary</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed
            text-gray-500 dark:text-gray-400">
            We're always looking for passionate, creative individuals to join the WebMobHut family.
            Explore open roles and become part of a team that shapes unforgettable experiences.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-t border-b py-10 px-6
        border-gray-100 dark:border-neutral-900">
        <div className="container mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '10+',  label: 'Years of Excellence' },
            { value: '500+', label: 'Events Delivered' },
            { value: '50+',  label: 'Team Members' },
            { value: '2',    label: 'Office Locations' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-bold text-[#2eaff0]">{value}</p>
              <p className="text-xs uppercase tracking-wider mt-1
                text-gray-400 dark:text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OPENINGS ── */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-10">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#2eaff0] mb-2 block">Open Positions</span>
            <h2 className="text-3xl md:text-4xl font-bold">Current Openings</h2>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, department, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`${inputCls} pl-10`}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border
                    ${filter === f
                      ? 'bg-[#2eaff0] text-black border-[#2eaff0]'
                      : 'border-gray-200 text-gray-500 hover:border-[#2eaff0]/40 dark:border-neutral-800 dark:text-gray-400 dark:hover:border-[#2eaff0]/40'
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs list */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#2eaff0] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 border rounded-2xl
              bg-gray-50 border-gray-200
              dark:bg-neutral-950 dark:border-neutral-800">
              <Briefcase size={36} className="mx-auto mb-3 text-gray-300 dark:text-neutral-700" />
              <p className="font-medium text-gray-500 dark:text-gray-400">
                {jobs.length === 0 ? 'No open positions right now.' : 'No results match your search.'}
              </p>
              {jobs.length === 0 && (
                <p className="text-sm mt-1 text-gray-400 dark:text-gray-600">Check back soon or send us your resume.</p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((job) => (
                <div key={job._id} className="border rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#2eaff0]/30
                  bg-white border-gray-200
                  dark:bg-[#0a0a0a] dark:border-neutral-800">
                  <button
                    className="w-full text-left p-6 flex items-start justify-between gap-4 group"
                    onClick={() => setExpanded(expanded === job._id ? null : job._id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg transition-colors group-hover:text-[#2eaff0]
                          text-gray-900 dark:text-white">
                          {job.title}
                        </h3>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border capitalize ${TYPE_COLORS[job.type] || ''}`}>
                          {job.type}
                        </span>
                        {job.isFeatured && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-400 dark:text-gray-500">
                        {job.department && <span className="flex items-center gap-1.5"><Briefcase size={11} /> {job.department}</span>}
                        {job.location   && <span className="flex items-center gap-1.5"><MapPin size={11} /> {job.location}</span>}
                        {job.experience && <span className="flex items-center gap-1.5"><Clock size={11} /> {job.experience}</span>}
                        {job.salary     && <span className="text-[#2eaff0] font-medium">{job.salary}</span>}
                      </div>
                    </div>
                    <ChevronRight size={20} className={`transition-all shrink-0 text-gray-400 group-hover:text-[#2eaff0] ${expanded === job._id ? 'rotate-90' : ''}`} />
                  </button>

                  {expanded === job._id && (
                    <div className="px-6 pb-6 border-t pt-5 space-y-5
                      border-gray-100 dark:border-neutral-800">
                      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{job.description}</p>

                      <div className="grid sm:grid-cols-3 gap-5">
                        {job.requirements?.length > 0 && (
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#2eaff0] mb-3">Requirements</p>
                            <ul className="space-y-1.5">
                              {job.requirements.map((r, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                                  <span className="w-1.5 h-1.5 bg-[#2eaff0] rounded-full mt-1.5 shrink-0" />{r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {job.responsibilities?.length > 0 && (
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#2eaff0] mb-3">Responsibilities</p>
                            <ul className="space-y-1.5">
                              {job.responsibilities.map((r, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                                  <span className="w-1.5 h-1.5 bg-[#2eaff0] rounded-full mt-1.5 shrink-0" />{r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {job.benefits?.length > 0 && (
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#2eaff0] mb-3">Benefits</p>
                            <ul className="space-y-1.5">
                              {job.benefits.map((b, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 shrink-0" />{b}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          onClick={() => openApply(job)}
                          className="px-7 py-3 bg-[#2eaff0] text-black font-bold tracking-widest text-xs uppercase rounded-full hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 shadow-[0_0_15px_rgba(46,175,240,0.2)]"
                        >
                          Apply Now
                        </button>
                        <span className="text-xs text-gray-400">
                          or email your CV to{' '}
                          <span className="text-[#2eaff0] select-all">
                            {job.applicationEmail || 'webmobhut@gmail.com'}
                          </span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── APPLY MODAL ── */}
      {applyJob && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={closeApply}>
          <div className="border rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto
            bg-white border-gray-200
            dark:bg-[#0f0f0f] dark:border-neutral-800"
            onClick={(e) => e.stopPropagation()}>

            <div className="flex items-start justify-between px-6 py-5 border-b
              border-gray-100 dark:border-neutral-800">
              <div>
                <p className="text-xs text-[#2eaff0] font-bold tracking-widest uppercase mb-1">Apply for</p>
                <h3 className="font-bold text-lg leading-tight">{applyJob.title}</h3>
              </div>
              <button onClick={closeApply} className="mt-1 shrink-0 text-gray-400 hover:text-gray-900 dark:hover:text-white"><X size={18} /></button>
            </div>

            {applyStatus === 'success' ? (
              <div className="flex flex-col items-center py-14 px-6 text-center">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={30} className="text-green-400" />
                </div>
                <h4 className="font-bold text-lg mb-2">Application Submitted!</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">We'll review your application and get back to you soon.</p>
                <button onClick={closeApply} className="mt-6 px-6 py-2.5 border text-sm rounded-full transition-colors
                  border-gray-200 text-gray-500 hover:border-[#2eaff0] hover:text-[#2eaff0]
                  dark:border-neutral-700 dark:text-gray-300">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="p-6 space-y-4">
                {applyStatus === 'error' && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-lg">
                    <AlertCircle size={14} /> {applyError || 'Something went wrong. Please try again.'}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs mb-1.5 uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">Full Name *</label>
                    <input required type="text" placeholder="Your full name"
                      value={applyForm.name} onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                      className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5 uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">Email *</label>
                    <input required type="email" placeholder="you@email.com"
                      value={applyForm.email} onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                      className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5 uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">Phone</label>
                    <input type="tel" placeholder="+91 00000 00000"
                      value={applyForm.phone} onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                      className={inputCls} />
                  </div>
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-xs mb-1.5 uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">Upload CV *</label>
                  <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-5 cursor-pointer transition-colors
                    ${cvFile
                      ? 'border-[#2eaff0]/40 bg-[#2eaff0]/5'
                      : 'border-gray-200 hover:border-[#2eaff0]/40 dark:border-neutral-700'}`}>
                    {cvFile ? (
                      <div className="text-center">
                        <CheckCircle size={22} className="text-[#2eaff0] mx-auto mb-1.5" />
                        <p className="text-[#2eaff0] text-xs font-semibold truncate max-w-[200px]">{cvFile.name}</p>
                        <p className="text-xs mt-0.5 text-gray-400">{(cvFile.size / 1024 / 1024).toFixed(1)} MB</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload size={22} className="mx-auto mb-1.5 text-gray-400" />
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Click to upload your CV</p>
                        <p className="text-[10px] mt-0.5 text-gray-400 dark:text-gray-600">PDF, DOC, DOCX — max 5 MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="hidden"
                      onChange={(e) => { const f = e.target.files[0]; if (f) setCvFile(f); }}
                    />
                  </label>
                  {cvFile && (
                    <button type="button" onClick={() => setCvFile(null)} className="text-xs mt-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      Remove file
                    </button>
                  )}
                </div>

                {/* Cover note */}
                <div>
                  <label className="block text-xs mb-1.5 uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                    Cover Note <span className="normal-case font-normal text-gray-400">(optional)</span>
                  </label>
                  <textarea rows={3} placeholder="Tell us briefly why you're a great fit..."
                    value={applyForm.message} onChange={(e) => setApplyForm({ ...applyForm, message: e.target.value })}
                    className={`${inputCls} resize-none`} />
                </div>

                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={closeApply} className="flex-1 py-3 border text-sm rounded-full transition-colors
                    border-gray-200 text-gray-500 hover:border-gray-400
                    dark:border-neutral-700 dark:text-gray-400 dark:hover:border-neutral-600">
                    Cancel
                  </button>
                  <button type="submit" disabled={applyStatus === 'loading'}
                    className="flex-1 py-3 bg-[#2eaff0] text-black font-bold text-sm rounded-full hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {applyStatus === 'loading'
                      ? <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Submitting...</>
                      : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <section className="border-t py-20 px-6
        bg-gray-50 border-gray-200
        dark:bg-neutral-950 dark:border-neutral-800">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't see the right role?</h2>
          <p className="text-sm leading-relaxed mb-8 text-gray-500 dark:text-gray-400">
            We're always on the lookout for great talent. Send us your resume and tell us how you'd love to contribute.
          </p>
          <a
            href="mailto:careers@webmobhut.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2eaff0] text-black font-bold tracking-widest text-xs uppercase rounded-full hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 shadow-[0_0_20px_rgba(46,175,240,0.2)]"
          >
            Send Open Application
          </a>
        </div>
      </section>
    </div>
  );
}
