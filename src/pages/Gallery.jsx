import { useState, useLayoutEffect, useRef } from 'react';
import { portfolioData } from '../data';
import { X, ZoomIn } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      gsap.utils.toArray('.desktop-anim-right').forEach(el => {
        const imgContent = el.querySelector('.img-content');
        gsap.fromTo(el,
          { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'power2.inOut',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 40%', scrub: 1.2 } }
        );
        gsap.fromTo(imgContent,
          { xPercent: -20, scale: 1.15 },
          { xPercent: 0, scale: 1, ease: 'power2.inOut',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 40%', scrub: 1.2 } }
        );
      });

      gsap.utils.toArray('.desktop-anim-left').forEach(el => {
        const imgContent = el.querySelector('.img-content');
        gsap.fromTo(el,
          { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'power2.inOut',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 40%', scrub: 1.2 } }
        );
        gsap.fromTo(imgContent,
          { xPercent: 20, scale: 1.15 },
          { xPercent: 0, scale: 1, ease: 'power2.inOut',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 40%', scrub: 1.2 } }
        );
      });

      gsap.utils.toArray('.mobile-anim').forEach(el => {
        const imgContent = el.querySelector('.img-content');
        gsap.fromTo(el,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'power2.inOut',
            scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 50%', scrub: 1 } }
        );
        gsap.fromTo(imgContent,
          { yPercent: 20, scale: 1.1 },
          { yPercent: 0, scale: 1, ease: 'power2.inOut',
            scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 50%', scrub: 1 } }
        );
      });

    }, galleryRef);

    return () => ctx.revert();
  }, []);

  const getGridClasses = (index) => {
    const dCycle = index % 10;
    const mCycle = index % 3;

    let classes = 'group relative overflow-hidden aspect-[4/5] md:aspect-square cursor-pointer '
      + 'bg-gray-200 dark:bg-black ';

    if (mCycle === 0) classes += 'col-span-12 mobile-anim ';
    else classes += 'col-span-6 ';

    if (dCycle === 0)                       classes += 'md:col-span-6 ';
    else if (dCycle === 1)                  classes += 'md:col-span-6 desktop-anim-right ';
    else if (dCycle >= 2 && dCycle <= 4)    classes += 'md:col-span-4 ';
    else if (dCycle === 5)                  classes += 'md:col-span-6 desktop-anim-left ';
    else if (dCycle === 6)                  classes += 'md:col-span-6 ';
    else if (dCycle >= 7 && dCycle <= 9)    classes += 'md:col-span-4 ';

    return classes;
  };

  return (
    <div className="min-h-screen pb-20 font-sans selection:bg-[#2eaff0] selection:text-black
      bg-white dark:bg-black">

      {/* HERO */}
      <div className="relative pt-32 pb-24 text-center border-b overflow-hidden
        bg-gray-50 border-gray-100
        dark:bg-[#050505] dark:border-neutral-900">
        <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2eaff0]/20 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <span className="font-bold tracking-widest uppercase text-sm mb-4 block text-[#2eaff0]">
            Visual Journey
          </span>
          <h1 className="text-5xl md:text-7xl font-medium mb-6 tracking-tight
            text-gray-900 dark:text-white">
            Our Gallery
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl font-light
            text-gray-500 dark:text-gray-400">
            A curated showcase of our most impactful executions and unforgettable live events.
          </p>
        </div>
      </div>

      {/* GALLERY GRID */}
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24" ref={galleryRef}>
        <div className="grid grid-cols-12 gap-2 md:gap-4">
          {portfolioData.map((item, index) => (
            <div
              key={item.id}
              className={getGridClasses(index)}
              onClick={() => setSelectedImage(item.src)}
            >
              <div className="img-content w-full h-full relative">
                <img
                  src={item.src}
                  alt={`Execution ${index + 1}`}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#2eaff0]/0 group-hover:bg-[#2eaff0]/20 transition-all duration-500 mix-blend-overlay z-10" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div className="bg-black/50 backdrop-blur-md p-4 rounded-full text-[#2eaff0] opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100 border border-[#2eaff0]/30 shadow-[0_0_20px_rgba(46,175,240,0.3)]">
                    <ZoomIn size={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10 backdrop-blur-xl"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-[#2eaff0] transition-colors bg-white/5 hover:bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/10 hover:border-[#2eaff0]/50 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="relative max-w-7xl max-h-[90vh] w-full flex justify-center items-center">
            <img
              src={selectedImage}
              alt="Full view"
              className="max-h-[90vh] max-w-full rounded-lg shadow-[0_0_50px_rgba(0,0,0,1)] object-contain border border-neutral-800"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;
