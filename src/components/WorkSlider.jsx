import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { portfolioData } from '../data';

gsap.registerPlugin(ScrollTrigger);

const WorkSlider = () => {
  const sliderImages = portfolioData.slice(0, 10);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const mobileSliderRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.matchMedia();

    ctx.add('(min-width: 1024px)', () => {
      const section = sectionRef.current;
      const scrollContainer = scrollContainerRef.current;
      const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

      gsap.to(scrollContainer, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollWidth + 1000}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    ctx.add('(max-width: 1023px)', () => {
      const portfolioItems = mobileSliderRef.current.querySelectorAll('.mobile-portfolio-item');
      portfolioItems.forEach(item => {
        gsap.fromTo(item,
          { opacity: 0, y: 100 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=100px',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden relative border-t
        bg-gray-50 border-gray-100
        dark:bg-[#0a0a0a] dark:border-neutral-900"
    >

      {/* ── DESKTOP: Horizontal Scroll ── */}
      <div ref={scrollContainerRef} className="hidden lg:flex h-screen items-center w-max">

        {/* Intro Block */}
        <div className="w-[40vw] shrink-0 pl-20 z-10">
          <span className="font-bold tracking-widest text-xs uppercase mb-4 block text-[#2eaff0]">
            Our Portfolio
          </span>
          <h2 className="text-5xl lg:text-7xl font-medium leading-[1.1] tracking-tight
            text-gray-900 dark:text-white">
            Recent <br /> Executions
          </h2>
          <Link
            to="/gallery"
            className="mt-12 inline-flex items-center font-bold tracking-widest uppercase text-sm transition-colors group
              text-gray-400 hover:text-[#2eaff0] dark:text-gray-400 dark:hover:text-[#2eaff0]"
          >
            View Full Gallery
            <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Staggered Cards */}
        <div className="flex gap-20 pr-[20vw]">
          {sliderImages.map((item, index) => (
            <div
              key={item.id}
              className={`relative w-[40vw] xl:w-[35vw] h-[70vh] flex-shrink-0 group ${
                index % 2 === 0 ? '-mt-16' : 'mt-32'
              }`}
            >
              <div className="w-full h-full overflow-hidden shadow-2xl rounded-lg border
                border-gray-200 bg-gray-100
                dark:border-neutral-800 dark:bg-black">
                <img
                  src={item.src || item.image}
                  alt="Portfolio Work"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-[#2eaff0]/0 group-hover:bg-[#2eaff0]/10 transition-colors duration-500 z-10 mix-blend-overlay" />
              </div>

              {/* Number overlay */}
              <div className="absolute top-1/2 -left-12 -translate-y-1/2 flex items-center gap-4 z-20 pointer-events-none">
                <span className="text-3xl font-black tracking-widest text-[#2eaff0] drop-shadow-md">
                  0{index + 1}/
                </span>
                <span
                  className="text-xl font-bold tracking-widest uppercase text-transparent drop-shadow-md"
                  style={{ WebkitTextStroke: '1px #6b7280' }}
                >
                  {item.category || 'Projects'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE: Alternating Layout ── */}
      <div
        ref={mobileSliderRef}
        className="block lg:hidden py-24 px-4 overflow-hidden
          bg-gray-50 dark:bg-[#050505]"
      >
        {/* Header */}
        <div className="mb-16 px-2">
          <span className="font-bold tracking-[0.2em] uppercase text-xs mb-4 block text-[#2eaff0]">Work</span>
          <h2 className="text-5xl font-black tracking-tight uppercase leading-none
            text-gray-900 dark:text-white">
            Selected <br /> projects
          </h2>
        </div>

        {/* Cards */}
        <div className="flex flex-col">
          {sliderImages.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <Link
                key={item.id}
                to="/gallery"
                className={`mobile-portfolio-item block relative w-[82%] aspect-[4/5] group overflow-hidden shadow-2xl bg-gray-200 dark:bg-black ${
                  isLeft
                    ? 'self-start z-10 mt-5'
                    : 'self-end z-20 mb-5 mt-5'
                } ${index > 1 && isLeft ? 'mt-4' : ''}`}
              >
                <img
                  src={item.src || item.image}
                  alt="Portfolio Work"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[#2eaff0]/0 group-hover:bg-[#2eaff0]/20 transition-colors duration-500 z-10 mix-blend-overlay" />

                <div className="absolute bottom-5 left-5 text-white z-20 pr-10">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2eaff0] mb-1.5 drop-shadow-md">
                    {item.category || 'Event Production'}
                  </p>
                  <h3 className="text-xl font-bold tracking-wide leading-tight text-white drop-shadow-md">
                    {item.title || `Execution ${index + 1}`}
                  </h3>
                </div>

                <div className="absolute bottom-5 right-5 text-white z-20 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                    <line x1="6" y1="18" x2="18" y2="6" />
                    <polyline points="8 6 18 6 18 16" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-20 px-2">
          <Link
            to="/gallery"
            className="block w-full py-5 text-center text-xs tracking-widest uppercase font-bold transition-colors border
              border-gray-300 text-gray-600 hover:border-[#2eaff0] hover:text-[#2eaff0]
              dark:border-neutral-800 dark:text-white dark:hover:border-[#2eaff0] dark:hover:text-[#2eaff0]"
          >
            View All Projects
          </Link>
        </div>
      </div>

    </section>
  );
};

export default WorkSlider;
