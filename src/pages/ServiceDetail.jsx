import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesData } from '../data';

gsap.registerPlugin(ScrollTrigger);

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find(s => s.id === id);

  const heroRef    = useRef(null);
  const contentRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef     = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    let ctx = gsap.matchMedia();

    ctx.add('(min-width: 320px)', () => {
      gsap.fromTo('.hero-text',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo('.feature-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: featuresRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 90%' }
        }
      );
    });

    return () => ctx.revert();
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col
        bg-white text-gray-900 dark:bg-black dark:text-white">
        <h2 className="text-4xl font-bold mb-4">Service Not Found</h2>
        <Link to="/services" className="text-[#2eaff0] hover:underline">Return to Services</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans overflow-hidden
      bg-white text-gray-900
      dark:bg-black dark:text-white">

      {/* 1. HERO */}
      <div ref={heroRef} className="relative w-full h-[60vh] md:h-[80vh]">
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-24">
          <Link
            to="/services"
            className="hero-text flex items-center mb-8 uppercase tracking-widest text-sm font-bold w-max transition-colors
              text-gray-300 hover:text-[#2eaff0]"
          >
            <ArrowLeft size={18} className="mr-3" /> Back to Services
          </Link>

          <div className="hero-text inline-block bg-[#2eaff0] text-black font-black uppercase tracking-tight text-xl md:text-3xl px-4 py-2 w-max mb-4">
            {service.title.split(' ')[0]}
          </div>
          <h1 className="hero-text text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] max-w-4xl text-white">
            {service.title}
          </h1>
        </div>
      </div>

      {/* 2. CONTENT */}
      <div className="container mx-auto px-6 max-w-7xl py-24 md:py-32">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image */}
          <div className="relative p-2 rounded-2xl border border-[#2eaff0] shadow-[0_0_30px_rgba(46,175,240,0.1)] group">
            <div className="overflow-hidden rounded-xl aspect-square md:aspect-[4/3]">
              <img
                src={service.image}
                alt="Service Detail"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-12">
            <div>
              <div className="inline-block bg-[#2eaff0] text-black font-black uppercase tracking-tight text-3xl md:text-4xl px-4 py-1 mb-6">
                DISCOVER
              </div>
              <p className="text-2xl md:text-3xl leading-snug mb-6 font-medium
                text-gray-800 dark:text-white">
                {service.shortDesc}
              </p>
              <p className="text-lg leading-relaxed font-light
                text-gray-500 dark:text-neutral-400">
                {service.fullDesc}
              </p>
            </div>

            {/* Features */}
            <div ref={featuresRef} className="border-t pt-12
              border-gray-200 dark:border-neutral-800">
              <div className="inline-block bg-[#2eaff0] text-black font-black uppercase tracking-tight text-3xl md:text-4xl px-4 py-1 mb-8">
                DEFINE
              </div>
              <p className="mb-8 text-lg font-light
                text-gray-500 dark:text-neutral-400">
                Strategic approach and execution deliverables included in this service:
              </p>

              <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                {service.features.map((feature, index) => (
                  <li key={index} className="feature-item flex items-center gap-4
                    text-gray-700 dark:text-neutral-200">
                    <div className="w-1.5 h-1.5 bg-[#2eaff0] rounded-full shrink-0 shadow-[0_0_8px_#2eaff0]" />
                    <span className="text-base font-medium tracking-wide">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CTA STRIP */}
      <div ref={ctaRef} className="container mx-auto px-6 max-w-7xl pb-24 md:pb-32">
        <div className="border rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden
          bg-gray-50 border-gray-200
          dark:bg-[#111] dark:border-neutral-800">

          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#2eaff0]/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-3xl md:text-5xl font-medium mb-2
              text-gray-900 dark:text-white">
              Ready to initiate?
            </h3>
            <p className="text-lg
              text-gray-500 dark:text-neutral-400">
              Let's discuss how we can execute this for your brand.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-5 bg-[#2eaff0] text-black font-bold tracking-widest uppercase text-sm rounded-full hover:bg-gray-900 dark:hover:bg-white transition-colors duration-300 group"
            >
              Get a Quote
              <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ServiceDetail;
