import { motion } from 'motion/react';
import { Gift, Home, MapPin, Heart, Sparkles, Star, Send, Mail, User, MessageSquare, ArrowRight, Cloud, Sun, Flower2, Coffee } from 'lucide-react';
import { useState } from 'react';
import { useScroll } from 'framer-motion';
import { LinePath } from "./components/ui/svg-follow-scroll";
import Card from "./components/ui/carousel-card";
import { CustomWoodSign } from "./components/ui/custom-wood-sign";

const SERVICES = [
  {
    title: 'Home Decor',
    description: 'Sweet, curated pieces to make every room in your house feel like home.',
    icon: Home,
    color: 'bg-pastel-blue',
    borderColor: 'border-pastel-blue-border',
    textColor: 'text-pastel-blue-text',
    subTextColor: 'text-[#7E9EB1]',
  },
  {
    title: 'Personalized Gifts',
    description: 'Custom-made treasures bursting with love for your special someone.',
    icon: Gift,
    color: 'bg-pastel-pink',
    borderColor: 'border-pastel-pink-border',
    textColor: 'text-pastel-pink-text',
    subTextColor: 'text-[#A68F8F]',
  },
  {
    title: 'Custom Creations',
    description: 'Have a dream design? Let’s bring your cozy visions to life together.',
    icon: Sparkles,
    color: 'bg-pastel-purple',
    borderColor: 'border-pastel-purple-border',
    textColor: 'text-pastel-purple-text',
    subTextColor: 'text-[#A58CA9]',
  },
];

const PORTFOLIO_DATA = [
  {
    id: 1,
    imgUrl: "https://lh3.googleusercontent.com/d/1MmFgKG9FyQDYRtBKL-WL2mXLvMSg8D1H",
    content: "A beautiful piece curated to elevate the calm and aesthetics of your space. Perfectly imperfect and full of character."
  },
  {
    id: 2,
    imgUrl: "https://lh3.googleusercontent.com/d/1NJhLivS3YB5_bufwqEamX3tgB2_fjxiK",
    content: "Handpicked charm that brings a touch of nature indoors. Neutral tones for a peaceful environment."
  },
  {
    id: 3,
    imgUrl: "https://lh3.googleusercontent.com/d/1YEG7X8e2dxV1IGnCRw-KS35j7DWrsMQ_",
    content: "Cozy elements that transform a simple corner into a warm sanctuary."
  },
  {
    id: 4,
    imgUrl: "https://lh3.googleusercontent.com/d/1YMAgPCjikO1nPtThFu0mu9ejYHfUp3ia",
    content: "Minimalist decor designed to blend seamlessly with your everyday life and rituals."
  },
  {
    id: 5,
    imgUrl: "https://lh3.googleusercontent.com/d/1aVuXAJ16W9fz2R2IuEibKDTJF_CKDyeV",
    content: "Earthy textures and soft lighting—the perfect companion for a quiet afternoon."
  },
  {
    id: 6,
    imgUrl: "https://lh3.googleusercontent.com/d/1e77Dxi-mgNf2HZObaYdg27Tt_yp23btM",
    content: "Delicate details that speak volumes. Bringing artful intention to your home styling."
  },
  {
    id: 7,
    imgUrl: "https://lh3.googleusercontent.com/d/1tgYiRQ5b6tlzHQVVHEE_Bl0SgsvJhkyH",
    content: "A gentle reminder to pause and appreciate the little things in our surroundings."
  },
  {
    id: 8,
    imgUrl: "https://lh3.googleusercontent.com/d/1uDQgHYOBt9i6kgyk6p3fGbLd4foJX2So",
    content: "Curated with love, designed for comfort. Making memories in beautifully styled spaces."
  },
  {
    id: 9,
    imgUrl: "https://lh3.googleusercontent.com/d/1ullojyZbsfOCgQmqNFA8kSwgPUptjUlv",
    content: "Timeless pieces that add character and warmth to modern and traditional homes alike."
  },
  {
    id: 10,
    imgUrl: "https://lh3.googleusercontent.com/d/1xkYCzmKFc-mGOKSbuAUKcXFfh3kxMBVj",
    content: "Simple joys captured in carefully arranged vignettes across the living space."
  },
  {
    id: 11,
    imgUrl: "https://lh3.googleusercontent.com/d/1ykTazPPma95WM-V2-r97NBEo8dIquC4o",
    content: "Enhancing the everyday with functional, aesthetically pleasing decor items."
  },
  {
    id: 12,
    imgUrl: "https://lh3.googleusercontent.com/d/1yla8N9FRXsP-Lbvi2bqwl4gmfOKuBxe8",
    content: "Where comfort meets style. A curated aesthetic for the modern soul."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-clean-bg text-clean-text font-serif selection:bg-[#FEECEC] selection:text-[#7C5C5C] overflow-x-hidden relative">
      
      {/* Global Scroll Path Component (Background Layer) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40 mix-blend-multiply overflow-hidden touch-none">
        <LinePath scrollYProgress={scrollYProgress} className="w-full h-full text-[#D1B48C] stroke-current" />
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 w-full p-4 sm:p-6 flex flex-col sm:flex-row justify-center sm:justify-between items-center z-50 max-w-7xl mx-auto left-0 right-0 gap-4 sm:gap-0">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-script font-bold tracking-tight gold-gradient-text cursor-pointer"
          onClick={() => scrollToSection('home')}
        >
          Vettecraft
        </motion.div>
        <motion.ul 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-text"
        >
          <li className={`hover:text-[#7C5C5C] transition-colors cursor-pointer ${activeTab === 'shop' ? 'text-[#7C5C5C]' : ''}`} onClick={() => scrollToSection('shop')}>Shop</li>
          <li className={`hover:text-[#7C5C5C] transition-colors cursor-pointer ${activeTab === 'gallery' ? 'text-[#7C5C5C]' : ''}`} onClick={() => scrollToSection('gallery')}>Gallery</li>
          <li className={`hover:text-[#7C5C5C] transition-colors cursor-pointer ${activeTab === 'about' ? 'text-[#7C5C5C]' : ''}`} onClick={() => scrollToSection('about')}>About</li>
          <li className={`hover:text-[#7C5C5C] transition-colors cursor-pointer ${activeTab === 'contact' ? 'text-[#7C5C5C]' : ''}`} onClick={() => scrollToSection('contact')}>Contact</li>
        </motion.ul>
      </nav>

      {/* Enhanced Hero Section (Bento Grid) */}
      <section id="home" className="pt-32 sm:pt-40 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#FFD1DC_2px,transparent_2px)] [background-size:40px_40px] opacity-40 mix-blend-multiply"></div>
        {/* Floating Background Icons */}
        <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -z-10 top-20 left-4 sm:left-10 text-[#FFD1DC] opacity-70">
          <Flower2 size={40} strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -z-10 top-40 right-4 sm:right-10 text-[#B4D4EE] opacity-70">
          <Cloud size={56} strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -z-10 bottom-20 left-1/3 text-[#FFCC99] opacity-70 hidden sm:block">
          <Sparkles size={40} strokeWidth={1} />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 min-h-[400px] sm:min-h-[500px]">
          {/* Main Hero Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex flex-col justify-between p-8 sm:p-10 md:p-14 bg-[#FEECEC] rounded-[32px] sm:rounded-[48px] relative overflow-hidden soft-shadow border border-[#FFD1DC]"
          >
            <div className="z-10 bg-white/40 absolute -right-32 -bottom-32 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="z-10 relative mt-4 sm:mt-0">
              <span className="inline-block px-4 py-1.5 bg-white rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#FFB7B7] mb-6 sm:mb-8 shadow-sm border border-white soft-shadow">
                New Collection
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold font-serif text-pastel-pink-text leading-[1.1] mb-4 sm:mb-6">
                Cozy Home <br/>
                <span className="font-script italic font-normal">Essentials</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#A68F8F] max-w-sm mb-6 sm:mb-8 leading-relaxed font-medium">
                Discover pieces crafted with love in South Florida, blending modern minimalism with charming details perfectly suited for your everyday life.
              </p>
            </div>

            <div className="z-10 relative mt-auto pt-6 sm:pt-8 pb-4 sm:pb-0 text-center sm:text-left">
              <button 
                onClick={() => scrollToSection('shop')}
                className="w-full sm:w-auto px-8 py-4 bg-[#7C5C5C] text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#634848] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
              >
                Explore Decor
              </button>
            </div>

            {/* Overlapping aesthetic image on the right inside card */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden md:block overflow-hidden rounded-l-[48px]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FEECEC] to-transparent z-10 w-24"></div>
              <img 
                src="https://lh3.googleusercontent.com/d/1HUzCoWHBEII4gFy9XlsX_nR2nI6Us0O5" 
                alt="Cozy aesthetic" 
                className="w-full h-full object-cover opacity-[0.65] mix-blend-multiply"
              />
            </div>
          </motion.div>

          {/* Right Stacked Cards */}
          <div className="w-full lg:w-80 flex flex-col sm:flex-row lg:flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex-1 bg-pastel-blue rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 flex flex-col justify-center items-center text-center border-b-4 border-pastel-blue-border soft-shadow group hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform shadow-sm">
                <Gift size={20} className="sm:w-[24px] sm:h-[24px] text-pastel-blue-text" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg sm:text-xl font-medium font-serif text-pastel-blue-text">Personalized Gifts</h3>
              <p className="text-[9px] sm:text-[10px] mt-2 text-[#7E9EB1] px-2 sm:px-4 font-bold uppercase tracking-widest leading-relaxed">Made just for you</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onClick={() => scrollToSection('shop')}
              className="flex-1 bg-pastel-purple rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 flex flex-col justify-center items-center text-center border-b-4 border-pastel-purple-border soft-shadow group hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform shadow-sm">
                <Sparkles size={20} className="sm:w-[24px] sm:h-[24px] text-pastel-purple-text" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg sm:text-xl font-medium font-serif text-pastel-purple-text">Curation Box</h3>
              <p className="text-[9px] sm:text-[10px] mt-2 text-[#A58CA9] px-2 sm:px-4 font-bold uppercase tracking-widest leading-relaxed">Seasonal Surprises</p>
            </motion.div>
          </div>
        </div>

        {/* Small Bottom Features Row */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8 px-2 sm:px-4">
          <div className="flex gap-4 sm:gap-6">
             <div className="flex flex-col items-center gap-2 group cursor-pointer">
               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-pastel-orange rounded-2xl sm:rounded-3xl flex items-center justify-center soft-shadow border border-pastel-orange-border group-hover:-translate-y-1 transition-transform">
                 <div className="w-6 h-6 sm:w-8 sm:h-8 border-[2px] border-[#FFCC99] rounded-full"></div>
               </div>
               <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#B39B84] font-bold">Vases</span>
             </div>
             <div className="flex flex-col items-center gap-2 group cursor-pointer">
               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E6F7FF] rounded-2xl sm:rounded-3xl flex items-center justify-center soft-shadow border border-[#D1F0FF] group-hover:-translate-y-1 transition-transform">
                 <div className="w-6 sm:w-8 h-[2px] sm:h-[3px] bg-[#B4D4EE]"></div>
               </div>
               <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#B39B84] font-bold">Linens</span>
             </div>
             <div className="flex flex-col items-center gap-2 group cursor-pointer">
               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F9F0FF] rounded-2xl sm:rounded-3xl flex items-center justify-center soft-shadow border border-[#F2E6FF] group-hover:-translate-y-1 transition-transform">
                 <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#E0BBE4]/30 rounded-full"></div>
               </div>
               <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#B39B84] font-bold">Charms</span>
             </div>
          </div>
          
          <div className="max-w-xs text-center sm:text-right mt-4 sm:mt-0">
            <p className="text-xs leading-relaxed text-gray-text font-medium">Based in the heart of Miami, Ivette crafts unique home treasures that blend modern minimalism with a soft, charming touch.</p>
            <div className="flex justify-center sm:justify-end gap-2 mt-4 hidden sm:flex">
              <div className="w-2 h-2 bg-[#FFD1DC] rounded-full"></div>
              <div className="w-2 h-2 bg-[#FFCC99] rounded-full"></div>
              <div className="w-2 h-2 bg-[#B4D4EE] rounded-full"></div>
              <div className="w-2 h-2 bg-[#E0BBE4] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section id="shop" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 border-t border-[#F5EDE8]/50 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#B4D4EE_2px,transparent_2px)] [background-size:40px_40px] opacity-20"></div>
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-32 left-10 text-[#B4D4EE] opacity-50 z-0 hidden lg:block">
           <Cloud size={80} strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-20 right-10 text-[#E0BBE4] opacity-50 z-0 hidden md:block">
           <Heart size={60} strokeWidth={1} />
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FFF2E6]/40 to-transparent pointer-events-none z-0"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 space-y-4 px-4">
            <h2 className="text-4xl sm:text-5xl font-script font-bold gold-gradient-text">Our Services</h2>
            <p className="text-gray-text font-bold text-[9px] sm:text-[10px] uppercase tracking-widest mt-2 px-4">Delicate details for your everyday spaces</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] flex flex-col justify-center items-center text-center ${service.color} border-b-4 ${service.borderColor} shadow-sm hover:soft-shadow hover:-translate-y-1 transition-all duration-300 group`}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 ${service.textColor}`}>
                    <Icon size={20} className="sm:w-[24px] sm:h-[24px]" strokeWidth={1.5} />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-medium font-serif ${service.textColor}`}>{service.title}</h3>
                  <p className={`text-[10px] sm:text-[11px] uppercase tracking-wider mt-3 ${service.subTextColor} px-2 leading-relaxed font-bold`}>
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#F5EDE8]/50 relative z-10 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#FFE0CC_2px,transparent_2px)] [background-size:40px_40px] opacity-20"></div>
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-20 text-[#FFE0CC] opacity-60 z-0 hidden sm:block">
           <Sun size={96} strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-20 right-32 text-[#FFE0CC] opacity-100 z-0 hidden md:block">
           <Coffee size={48} strokeWidth={1} />
        </motion.div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-10 sm:mb-16 gap-6 text-center sm:text-left">
            <div>
              <h2 className="text-4xl sm:text-5xl font-script font-bold gold-gradient-text">Charm Gallery</h2>
              <p className="text-gray-text font-bold text-[9px] sm:text-[10px] uppercase tracking-widest mt-3 sm:mt-4">A peek into our recent creations</p>
            </div>
            <button className="flex items-center justify-center gap-2 text-pastel-pink-text text-[10px] uppercase tracking-widest font-bold hover:gap-4 transition-all pb-2 sm:pb-0">
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="w-full relative z-10 px-2 sm:px-8 py-4">
            <Card data={PORTFOLIO_DATA} showCarousel={true} cardsPerView={3} />
          </div>
        </div>
      </section>

      {/* Custom Sign Section */}
      <section id="custom-sign" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#F5EDE8]/50 relative z-10 overflow-hidden bg-gradient-to-b from-transparent to-[#FFF2E6]/20">
        <CustomWoodSign />
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 border-y border-[#F5EDE8]/50 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#F2E6FF_2px,transparent_2px)] [background-size:40px_40px] opacity-30"></div>
        <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-10 left-1/4 text-[#E0BBE4] opacity-50 z-0 hidden md:block">
           <Flower2 size={72} strokeWidth={1} />
        </motion.div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-pastel-pink/40 rounded-full blur-3xl pointer-events-none z-0"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pastel-orange/40 rounded-full blur-3xl pointer-events-none z-0 hidden sm:block"></div>
        
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 sm:gap-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-sm sm:max-w-none mx-auto"
          >
            <div className="w-full aspect-square bg-[#FFF2E6] rounded-[32px] sm:rounded-[48px] p-3 soft-shadow border border-[#FFE0CC] relative">
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-white w-16 h-16 sm:w-20 sm:h-20 rounded-full soft-shadow z-20 border border-pastel-pink-border flex items-center justify-center text-pastel-pink-text">
                <Heart size={24} className="sm:w-[32px] sm:h-[32px] fill-pastel-pink" strokeWidth={1.5} />
              </div>
              <img 
                src="https://lh3.googleusercontent.com/d/1JHFsgCPnR2_mGQ7ll02iH-7Qj5RpTwRd" 
                alt="Ivette's Studio" 
                className="rounded-[24px] sm:rounded-[36px] object-cover w-full h-full"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            <div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#FFB7B7] font-bold mb-3 sm:mb-4">Meet the Maker</p>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-script font-bold gold-gradient-text leading-tight">About Ivette</h2>
            </div>
            <p className="text-sm text-gray-text font-medium leading-relaxed max-w-md lg:max-w-lg mx-auto lg:mx-0 px-4 sm:px-0">
              Vettecraft By Ivette is born out of a love for cozy, charming spaces. 
              Blending soft pastels, minimalistic structures, and a whole lot of heart, 
              each piece is meticulously crafted in vibrant Miami, FL to bring a touch of sweet serenity to your life.
            </p>
            <p className="text-sm text-[#A68F8F] font-medium leading-relaxed max-w-md lg:max-w-lg mx-auto lg:mx-0 px-4 sm:px-0">
              Whether you are looking for that perfect centerpiece to pull a room together, or a personalized charm to gift a loved one, Vettecraft is here to turn your home into a sanctuary.
            </p>
            <div className="pt-2">
              <button className="px-8 py-4 bg-white text-[#7C5C5C] font-bold uppercase tracking-widest text-[10px] rounded-full border border-[#FFD1DC] hover:bg-[#FEECEC] transition-colors soft-shadow">
                Read Our Story
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#FFD1DC_2px,transparent_2px)] [background-size:40px_40px] opacity-20"></div>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 right-20 text-[#FFD1DC] opacity-80 z-0 hidden lg:block">
           <Send size={56} strokeWidth={1} className="rotate-45" />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-20 left-20 text-[#B4D4EE] opacity-80 z-0 hidden md:block">
           <Heart size={64} strokeWidth={1} />
        </motion.div>
        <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-t from-transparent to-[#FEECEC]/20 pointer-events-none z-0"></div>

        <div className="max-w-4xl mx-auto relative z-10 bg-pastel-blue rounded-[32px] sm:rounded-[48px] p-6 sm:p-8 md:p-14 border-b-4 border-pastel-blue-border soft-shadow border border-white">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-4xl sm:text-5xl font-script font-bold text-pastel-blue-text mb-3 sm:mb-4">Say Hello</h2>
            <p className="text-pastel-blue-text opacity-70 font-bold text-[9px] sm:text-[10px] uppercase tracking-widest">We'd love to hear from you</p>
          </div>

          <form className="space-y-4 sm:space-y-6 max-w-2xl mx-auto flex flex-col">
            <div className="flex flex-col justify-center sm:flex-row gap-4 sm:gap-6">
              <div className="flex-1 relative">
                <div className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 text-[#7E9EB1]">
                   <User size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
                </div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-white rounded-full py-3.5 sm:py-4 pl-12 sm:pl-14 pr-6 text-sm text-clean-text font-medium placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#B4D4EE] border border-transparent transition-all shadow-sm"
                />
              </div>
              <div className="flex-1 relative">
                <div className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 text-[#7E9EB1]">
                   <Mail size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
                </div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white rounded-full py-3.5 sm:py-4 pl-12 sm:pl-14 pr-6 text-sm text-clean-text font-medium placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#B4D4EE] border border-transparent transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-5 sm:left-6 top-4 sm:top-5 text-[#7E9EB1]">
                <MessageSquare size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
              </div>
              <textarea 
                placeholder="How can we help make your space cozier?" 
                rows={4}
                className="w-full bg-white rounded-[24px] sm:rounded-[32px] py-4 pl-12 sm:pl-14 pr-6 text-sm text-clean-text font-medium placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#B4D4EE] border border-transparent transition-all shadow-sm resize-none"
              ></textarea>
            </div>

            <button type="button" onClick={() => alert("Message sent! Thanks for reaching out.")} className="self-center flex items-center justify-center gap-3 px-8 sm:px-10 py-4 bg-[#5B7A8E] text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#4A6475] transition-all shadow-lg hover:-translate-y-1 active:scale-95 mt-4 w-full sm:w-auto">
              Send Message <Send size={14} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-16 flex flex-col md:flex-row justify-between border-t border-[#F5EDE8]/50 items-center text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-bold text-[#D1B48C] gap-6 md:gap-0 relative z-10 w-full overflow-hidden text-center sm:text-left">
        <span className="flex-1 w-full text-center md:text-left break-words">© {new Date().getFullYear()} Vettecraft By Ivette</span>
        
        <div className="flex items-center gap-2 sm:gap-4 text-center justify-center flex-1 whitespace-nowrap">
          <Heart size={12} className="sm:w-[14px] sm:h-[14px] text-[#FFD1DC]" strokeWidth={3} fill="#FFD1DC" />
          <span>Crafted in Miami, FL</span>
          <Heart size={12} className="sm:w-[14px] sm:h-[14px] text-[#FFD1DC]" strokeWidth={3} fill="#FFD1DC" />
        </div>

        <div className="flex justify-center md:justify-end gap-6 flex-1 w-full text-[#A0A0A0]">
          <a href="#" className="hover:text-[#7C5C5C] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#7C5C5C] transition-colors">Pinterest</a>
        </div>
      </footer>
    </div>
  );
}
