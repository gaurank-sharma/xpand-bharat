import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesData } from '../data';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const headerRef = useRef(null);
  const serviceRefs = useRef([]);
  serviceRefs.current = new Array(servicesData.length).fill(null);

  useEffect(() => {
    let ctx = gsap.matchMedia();

    ctx.add('(min-width: 320px)', () => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      serviceRefs.current.forEach((el) => {
        if (el) {
          gsap.fromTo(el,
            { opacity: 0, y: 100 },
            {
              opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen font-sans py-24 md:py-32 overflow-hidden
      bg-white text-gray-900
      dark:bg-black dark:text-white">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-32">
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tight leading-[0.9] mb-8
            text-gray-900 dark:text-white">
            Experience <br />
            <span className="text-[#2eaff0]">Solutions</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light tracking-wide
            text-gray-500 dark:text-gray-400">
            PHYSICAL, VIRTUAL OR HYBRID <br className="hidden md:block" />
            <span className="font-medium text-gray-900 dark:text-white">WE'VE GOT YOU COVERED!</span>
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-32 md:space-y-48">
          {servicesData.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                ref={el => serviceRefs.current[index] = el}
                className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
              >

                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative p-2 rounded-2xl border border-[#2eaff0] shadow-[0_0_30px_rgba(46,175,240,0.1)] group">
                    <div className="overflow-hidden rounded-xl h-[350px] md:h-[500px]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2 space-y-8">

                  <div>
                    <div className="inline-block bg-[#2eaff0] text-black font-black uppercase tracking-tight text-3xl md:text-5xl px-4 py-2 mb-6">
                      {service.title.split(' ')[0]}
                    </div>
                    <h3 className="text-2xl md:text-4xl font-medium mb-6
                      text-gray-900 dark:text-white">
                      {service.title.substring(service.title.indexOf(' ') + 1)}
                    </h3>

                    <p className="text-xl md:text-2xl leading-snug mb-4
                      text-gray-700 dark:text-neutral-300">
                      {service.shortDesc}
                    </p>
                    <p className="leading-relaxed font-light
                      text-gray-400 dark:text-neutral-500">
                      {service.fullDesc}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mt-8 border-t pt-8
                    text-gray-600 dark:text-neutral-300
                    border-gray-200 dark:border-neutral-800">
                    {service.features?.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-[#2eaff0] rounded-full shrink-0" />
                        <span className="text-sm font-medium tracking-wide">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="pt-8">
                    <Link
                      to={`/services/${service.id}`}
                      className="inline-flex items-center font-bold tracking-widest uppercase text-sm transition-colors group
                        text-gray-900 hover:text-[#2eaff0]
                        dark:text-white dark:hover:text-[#2eaff0]"
                    >
                      Explore Service
                      <span className="ml-4 p-3 rounded-full border transition-all duration-300
                        border-gray-300 group-hover:border-[#2eaff0] group-hover:bg-[#2eaff0] group-hover:text-black
                        dark:border-neutral-700 dark:group-hover:border-[#2eaff0] dark:group-hover:bg-[#2eaff0] dark:group-hover:text-black">
                        <ArrowRight size={20} />
                      </span>
                    </Link>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Services;
