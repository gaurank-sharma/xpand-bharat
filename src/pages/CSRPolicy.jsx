import { Heart, Leaf, Users, GraduationCap } from 'lucide-react';

const pillars = [
  {
    icon: GraduationCap,
    title: 'Education & Skill Development',
    desc: 'We support local talent by offering internship programs, mentorship opportunities, and skill development workshops for youth in the event management and creative industries.',
  },
  {
    icon: Users,
    title: 'Community Engagement',
    desc: 'WebMobHut actively participates in community development initiatives, partnering with NGOs to organise awareness events, charity drives, and social welfare programs across India.',
  },
  {
    icon: Leaf,
    title: 'Environmental Responsibility',
    desc: 'We are committed to sustainable event practices — reducing paper waste, using eco-friendly materials, and working with vendors who share our commitment to minimising environmental impact.',
  },
  {
    icon: Heart,
    title: 'Inclusive Workplace',
    desc: 'We believe in equal opportunity employment. Our team is built on diversity and inclusion, ensuring a respectful and supportive work environment for every member.',
  },
];

export default function CSRPolicy() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <section className="pt-36 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#2eaff0] mb-4 block">Legal</span>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wide mb-4">CSR Policy</h1>
          <p className="text-gray-400 text-sm mb-10">Corporate Social Responsibility</p>
          <div className="h-px bg-neutral-800 mb-12" />

          <div className="mb-12">
            <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">
              At WebMobHut Pvt Ltd, we believe that business success and social responsibility go hand in hand.
              Our CSR policy reflects our commitment to creating positive impact — for our clients, our communities,
              and the environment. We integrate responsible practices into everything we do.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-6 hover:border-[#2eaff0]/30 transition-colors group">
                <div className="w-11 h-11 bg-[#2eaff0]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#2eaff0]/20 transition-colors">
                  <Icon size={20} className="text-[#2eaff0]" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-6 space-y-4 text-sm text-gray-400">
            <h2 className="text-white font-semibold">Our Commitment</h2>
            <p>WebMobHut Pvt Ltd commits to reviewing and improving our CSR practices annually. We encourage our employees, partners, and clients to actively participate in our social responsibility initiatives.</p>
            <p>For queries about our CSR activities or to report concerns, please reach out to us at <a href="mailto:webmobhut@gmail.com" className="text-[#2eaff0] hover:underline">webmobhut@gmail.com</a>.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
