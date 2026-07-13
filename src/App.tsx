import { motion } from 'motion/react';
import { Gift, Home, MapPin, Heart, Sparkles, Star, Send, Mail, User, MessageSquare, ArrowRight, Cloud, Sun, Flower2, Coffee } from 'lucide-react';
import { useState } from 'react';
import { useScroll } from 'framer-motion';
import Card from "./components/ui/carousel-card";
import { CustomWoodSign } from "./components/ui/custom-wood-sign";

const SERVICES = [
  {
    title: 'Personalized Gifts',
    description: 'Custom-made treasures bursting with love, beautifully personalized with premium vinyl.',
    icon: Gift,
    color: 'bg-white',
    borderColor: 'border-brand-cream',
    textColor: 'text-brand-olive',
    subTextColor: 'text-brand-taupe',
  },
  {
    title: 'Home Decor',
    description: 'Curated and crafted pieces designed to bring warmth and character to every room of your home.',
    icon: Home,
    color: 'bg-brand-beige',
    borderColor: 'border-brand-taupe/20',
    textColor: 'text-brand-charcoal',
    subTextColor: 'text-brand-taupe',
  },
  {
    title: 'Seasonal Items',
    description: 'Cozy additions and festive custom decorations designed to celebrate changing seasons.',
    icon: Flower2,
    color: 'bg-[#FDFBF7]',
    borderColor: 'border-brand-beige',
    textColor: 'text-brand-olive',
    subTextColor: 'text-brand-taupe',
  },
  {
    title: 'Custom Pieces',
    description: 'Have a beautiful vision? Let’s bring your bespoke design ideas to life with loving care.',
    icon: Sparkles,
    color: 'bg-brand-sage',
    borderColor: 'border-brand-olive/20',
    textColor: 'text-brand-white',
    subTextColor: 'text-brand-white/80',
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
  },
  {
    id: 13,
    imgUrl: "https://lh3.googleusercontent.com/d/102J1M6C1g6xLTzd8JGWv-QUOUJrvcm9X",
    content: "Bespoke customized drinkware with name decals, blending daily functionality with premium styling."
  },
  {
    id: 14,
    imgUrl: "https://lh3.googleusercontent.com/d/11i565G39OSqMLeTcXAw6udc-w5BltF8g",
    content: "Personalized family wood sign, crafted with clean lines and rustic warmth to match any cozy room."
  },
  {
    id: 15,
    imgUrl: "https://lh3.googleusercontent.com/d/1BPWVWPrOZEfIrCwglveub32KFbtmCByx",
    content: "Custom-crafted seasonal tags and holiday ornaments, meticulously finished to highlight your family milestones."
  },
  {
    id: 16,
    imgUrl: "https://lh3.googleusercontent.com/d/1GZ4emu3LxJdQo69yb_FkRfm-6gWqICB_",
    content: "Beautiful name plaques and signs, designed for custom bedrooms and nurseries with soft natural accents."
  },
  {
    id: 17,
    imgUrl: "https://lh3.googleusercontent.com/d/1HjFOpCYiGKViypHPXJAK0HMUySta8e-8",
    content: "Elegant glass tumblers personalized with custom lettering, perfect for refreshing drinks on the go."
  },
  {
    id: 18,
    imgUrl: "https://lh3.googleusercontent.com/d/1K2B02AnIAeIo2lKbs_T67rkaBNDR9n7j",
    content: "Custom laser-cut details painted with precision, offering a crisp contemporary styling for your front door."
  },
  {
    id: 19,
    imgUrl: "https://lh3.googleusercontent.com/d/1M0runU5ILcUGpyWmCpMpSl2Cuk6yqdo9",
    content: "Charming wooden memory boxes, personalized with beautiful script fonts to hold your precious keepsakes."
  },
  {
    id: 20,
    imgUrl: "https://lh3.googleusercontent.com/d/1RSREp4Vu6w3d1e5e84CYu0gmOu-w4L6O",
    content: "Festive custom holiday items and wood tags, bringing an air of warm, handcrafted joy to your home."
  },
  {
    id: 21,
    imgUrl: "https://lh3.googleusercontent.com/d/1WzHLbH2jJ5ReCG_Qu4rRm_KE1m_G5-Nk",
    content: "Premium personalized water bottles, combining durable high-grade build with unique vinyl-cut naming."
  },
  {
    id: 22,
    imgUrl: "https://lh3.googleusercontent.com/d/1aOb7g3kQBFKWZeAwCDMYFS-6uMkXcAmQ",
    content: "Customized event welcome sign, ideal for weddings, showers, or inviting front entrances."
  },
  {
    id: 23,
    imgUrl: "https://lh3.googleusercontent.com/d/1gif3mrOFNGNp4kkdkZS22I3U3aB0BOj9",
    content: "Lovingly created milestone plaques, capturing special growth highlights with graceful script elements."
  },
  {
    id: 24,
    imgUrl: "https://lh3.googleusercontent.com/d/1kUKPnfDc5YPllJbdMljlPBtf96AoDCxx",
    content: "Delicate customized transparent acrylic plaques, offering a clean modern aesthetic for the tabletop."
  },
  {
    id: 25,
    imgUrl: "https://lh3.googleusercontent.com/d/1op4_nlfDdlvxhHtKVL2kyGqpl_BFFKtu",
    content: "Beautiful personalized custom mugs, perfect for enjoying your morning brew with cozy comfort."
  },
  {
    id: 26,
    imgUrl: "https://lh3.googleusercontent.com/d/1rQ1lOwzL5EqwiOwoObbEVO90Msu5R8w9",
    content: "Aesthetic wooden welcome signs, meticulously painted and personalized to match any entryway decor."
  },
  {
    id: 27,
    imgUrl: "https://lh3.googleusercontent.com/d/1rj5JXySqNbQbvAYaSS33Dd1N-SKhu773",
    content: "Charming customized holiday slice ornaments, bringing authentic Florida style and character to any tree."
  },
  {
    id: 28,
    imgUrl: "https://lh3.googleusercontent.com/d/1uSOO0_cZ0CIkBwLMhkzNqiYt3u62Ta9m",
    content: "Bespoke seasonal and custom table sets, designed to celebrate changing moments in cozy warmth."
  },
  {
    id: 29,
    imgUrl: "https://lh3.googleusercontent.com/d/1vTjTloOZ07xBCJYE0uOuNdOzCmTfugXl",
    content: "Whimsical personalized nursery signage, featuring delicate colors and custom laser-cut nameplates."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal font-sans selection:bg-brand-beige selection:text-brand-olive overflow-x-hidden relative">
      
      {/* Navigation */}
      <nav className="relative w-full p-6 flex flex-row justify-center sm:justify-between items-center z-50 max-w-7xl mx-auto gap-4 sm:gap-0">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl font-adren font-bold tracking-[0.05em] sm:tracking-widest uppercase gold-gradient-text cursor-pointer flex flex-col sm:flex-row sm:items-baseline gap-1"
          onClick={() => scrollToSection('home')}
        >
          <span>VetteCraft</span>
          <span className="text-[9px] sm:text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-brand-olive select-none">by Ivette</span>
        </motion.div>
        <motion.ul 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="hidden sm:flex flex-wrap justify-center gap-4 sm:gap-8 text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-taupe"
        >
          <li className={`hover:text-brand-olive transition-colors cursor-pointer ${activeTab === 'shop' ? 'text-brand-olive' : ''}`} onClick={() => scrollToSection('shop')}>Shop</li>
          <li className={`hover:text-brand-olive transition-colors cursor-pointer ${activeTab === 'gallery' ? 'text-brand-olive' : ''}`} onClick={() => scrollToSection('gallery')}>Gallery</li>
          <li className={`hover:text-brand-olive transition-colors cursor-pointer ${activeTab === 'about' ? 'text-brand-olive' : ''}`} onClick={() => scrollToSection('about')}>About</li>
          <li className={`hover:text-brand-olive transition-colors cursor-pointer ${activeTab === 'contact' ? 'text-brand-olive' : ''}`} onClick={() => scrollToSection('contact')}>Contact</li>
        </motion.ul>
      </nav>

      {/* Top Brand Banner Image (Positioned below the menu bar) */}
      <div className="w-full relative h-[28vh] sm:h-[36vh] md:h-[45vh] min-h-[220px] sm:min-h-[320px] md:min-h-[400px] max-h-[500px] overflow-hidden bg-brand-cream flex justify-center items-center py-6 sm:py-8">
        <img 
          src="https://lh3.googleusercontent.com/d/1AofX993p0B6j2LZceNH0Ml4pRE29YfzG" 
          alt="Vettecraft Header Banner" 
          className="max-w-[100%] md:max-w-[98%] h-full object-contain scale-105 sm:scale-110 transition-transform duration-500 hover:scale-115"
          referrerPolicy="no-referrer"
        />
        {/* Sophisticated subtle gradient mapping for seamless integration */}
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#25211b]/5 to-transparent pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-brand-cream to-transparent pointer-events-none"></div>
      </div>

      {/* Modern fluid bottom navigation bar for mobile only */}
      <motion.div 
        initial={{ y: 80, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#F7F3EEDD]/90 backdrop-blur-lg rounded-full shadow-2xl border border-brand-beige px-6 py-3 flex sm:hidden items-center gap-6"
      >
        <button 
          onClick={() => scrollToSection('home')} 
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-all duration-300 ${activeTab === 'home' ? 'text-brand-olive bg-white/80 scale-110 shadow-sm' : 'text-brand-taupe hover:text-brand-olive'}`}
        >
          <Home size={18} strokeWidth={2} />
        </button>
        <button 
          onClick={() => scrollToSection('shop')} 
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-all duration-300 ${activeTab === 'shop' ? 'text-brand-olive bg-white/80 scale-110 shadow-sm' : 'text-brand-taupe hover:text-brand-olive'}`}
        >
          <Sparkles size={18} strokeWidth={2} />
        </button>
        <button 
          onClick={() => scrollToSection('gallery')} 
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-all duration-300 ${activeTab === 'gallery' ? 'text-brand-olive bg-white/80 scale-110 shadow-sm' : 'text-brand-taupe hover:text-brand-olive'}`}
        >
          <Heart size={18} strokeWidth={2} />
        </button>
        <button 
          onClick={() => scrollToSection('about')} 
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-all duration-300 ${activeTab === 'about' ? 'text-brand-olive bg-white/80 scale-110 shadow-sm' : 'text-brand-taupe hover:text-brand-olive'}`}
        >
          <User size={18} strokeWidth={2} />
        </button>
        <button 
          onClick={() => scrollToSection('contact')} 
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-all duration-300 ${activeTab === 'contact' ? 'text-brand-olive bg-white/80 scale-110 shadow-sm' : 'text-brand-taupe hover:text-brand-olive'}`}
        >
          <Mail size={18} strokeWidth={2} />
        </button>
      </motion.div>

      {/* Enhanced Hero Section (Bento Grid) */}
      <section id="home" className="pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#E9DEC9_2px,transparent_2px)] [background-size:40px_40px] opacity-40 mix-blend-multiply"></div>
        {/* Floating Background Icons */}
        <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -z-10 top-20 left-4 sm:left-10 text-brand-taupe opacity-30">
          <Flower2 size={40} strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -z-10 top-40 right-4 sm:right-10 text-brand-sage opacity-40">
          <Cloud size={56} strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -z-10 bottom-20 left-1/3 text-brand-olive opacity-30 hidden sm:block">
          <Sparkles size={40} strokeWidth={1} />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 min-h-[400px] sm:min-h-[500px]">
          {/* Main Hero Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex flex-col justify-between p-6 sm:p-10 md:p-14 bg-brand-beige rounded-[28px] sm:rounded-[48px] relative overflow-hidden soft-shadow"
          >
            <div className="z-10 bg-white/40 absolute -right-32 -bottom-32 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="z-10 relative mt-2 sm:mt-0">
              <span className="inline-block px-4 py-1.5 bg-white rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-brand-olive mb-4 sm:mb-6 shadow-sm border border-white soft-shadow">
                New Collection
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-adren text-brand-charcoal leading-[1.15] mb-4 sm:mb-6">
                Personalized Gifts <br className="hidden sm:inline"/>
                <span className="font-adren font-normal">&amp; Home Decor</span>
              </h1>
              <p className="text-xs sm:text-sm text-brand-charcoal/85 max-w-xl mb-4 sm:mb-8 leading-relaxed font-medium">
                Discover pieces handcrafted with love and care in South Florida, custom-tailored with premium vinyl detailing to make every room, gift, and moment truly yours.
              </p>
            </div>

            <div className="z-10 relative mt-auto pt-4 sm:pt-8 pb-2 sm:pb-0 text-center sm:text-left">
              <button 
                onClick={() => scrollToSection('shop')}
                className="w-full sm:w-auto px-8 py-4 bg-brand-sage text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-olive transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
              >
                Explore Offerings
              </button>
            </div>
          </motion.div>

          {/* Right Stacked Cards - side-by-side on mobile, stacked on desktop */}
          <div className="w-full lg:w-80 flex flex-row lg:flex-col gap-4 sm:gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex-1 bg-brand-sage rounded-[24px] sm:rounded-[40px] p-4 sm:p-8 flex flex-col justify-center items-center text-center border-b-4 border-brand-olive/20 soft-shadow group hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform shadow-sm">
                <Gift size={16} className="sm:w-[24px] sm:h-[24px] text-brand-olive" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm sm:text-xl font-medium font-adren text-white">Personalized Gifts</h3>
              <p className="text-[8px] sm:text-[10px] mt-1 sm:mt-2 text-white/80 px-1 sm:px-4 font-bold uppercase tracking-widest leading-relaxed">Made just for you</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onClick={() => scrollToSection('shop')}
              className="flex-1 bg-white rounded-[24px] sm:rounded-[40px] p-4 sm:p-8 flex flex-col justify-center items-center text-center border-b-4 border-brand-cream soft-shadow group hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-brand-cream rounded-full flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform shadow-sm">
                <Sparkles size={16} className="sm:w-[24px] sm:h-[24px] text-brand-charcoal" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm sm:text-xl font-medium font-adren text-brand-charcoal">Curation Box</h3>
              <p className="text-[8px] sm:text-[10px] mt-1 sm:mt-2 text-brand-taupe px-1 sm:px-4 font-bold uppercase tracking-widest leading-relaxed">Seasonal Surprises</p>
            </motion.div>
          </div>
        </div>

        {/* Small Bottom Features Row */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8 px-2 sm:px-4">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
             <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => scrollToSection('shop')}>
               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center soft-shadow border border-brand-cream group-hover:-translate-y-1 transition-transform">
                 <Gift className="w-6 h-6 text-brand-olive" strokeWidth={1.5} />
               </div>
               <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-brand-taupe font-bold">Gifts</span>
             </div>
             <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => scrollToSection('shop')}>
               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-cream rounded-2xl sm:rounded-3xl flex items-center justify-center soft-shadow border border-brand-beige group-hover:-translate-y-1 transition-transform">
                 <Home className="w-6 h-6 text-brand-charcoal" strokeWidth={1.5} />
               </div>
               <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-brand-taupe font-bold">Decor</span>
             </div>
             <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => scrollToSection('shop')}>
               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-beige rounded-2xl sm:rounded-3xl flex items-center justify-center soft-shadow border border-brand-taupe/20 group-hover:-translate-y-1 transition-transform">
                 <Flower2 className="w-6 h-6 text-brand-olive" strokeWidth={1.5} />
               </div>
               <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-brand-taupe font-bold">Seasonal</span>
             </div>
             <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => scrollToSection('shop')}>
               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-sage rounded-2xl sm:rounded-3xl flex items-center justify-center soft-shadow border border-brand-olive/20 group-hover:-translate-y-1 transition-transform">
                 <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
               </div>
               <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-brand-taupe font-bold">Custom</span>
             </div>
          </div>
          
          <div className="max-w-xs text-center sm:text-right mt-4 sm:mt-0">
            <p className="text-xs leading-relaxed text-brand-taupe font-medium">Based in the heart of Miami, Ivette crafts unique home treasures that blend modern minimalism with a soft, charming touch.</p>
            <div className="flex justify-center sm:justify-end gap-2 mt-4 hidden sm:flex">
              <div className="w-2 h-2 bg-brand-sage rounded-full"></div>
              <div className="w-2 h-2 bg-brand-olive rounded-full"></div>
              <div className="w-2 h-2 bg-brand-beige rounded-full"></div>
              <div className="w-2 h-2 bg-brand-taupe rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section id="shop" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 border-t border-brand-beige/50 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#E9DEC9_2px,transparent_2px)] [background-size:40px_40px] opacity-20"></div>
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-32 left-10 text-brand-sage opacity-50 z-0 hidden lg:block">
           <Cloud size={80} strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-20 right-10 text-brand-beige opacity-50 z-0 hidden md:block">
           <Heart size={60} strokeWidth={1} />
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-beige/40 to-transparent pointer-events-none z-0"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 space-y-4 px-4">
            <h2 className="text-4xl sm:text-5xl font-adren font-bold gold-gradient-text">Our Services</h2>
            <p className="text-brand-taupe font-bold text-[9px] sm:text-[10px] uppercase tracking-widest mt-2 px-4">Delicate details for your everyday spaces</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                  <h3 className={`text-lg sm:text-xl font-medium font-adren ${service.textColor}`}>{service.title}</h3>
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
      <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-brand-beige/50 relative z-10 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#E9DEC9_2px,transparent_2px)] [background-size:40px_40px] opacity-20"></div>
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-20 text-brand-beige opacity-60 z-0 hidden sm:block">
           <Sun size={96} strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-20 right-32 text-brand-sage opacity-100 z-0 hidden md:block">
           <Coffee size={48} strokeWidth={1} />
        </motion.div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-10 sm:mb-16 gap-6 text-center sm:text-left">
            <div>
              <h2 className="text-4xl sm:text-5xl font-adren font-bold gold-gradient-text">Featured Creations</h2>
              <p className="text-brand-taupe font-bold text-[9px] sm:text-[10px] uppercase tracking-widest mt-3 sm:mt-4">A peek into our recent creations</p>
            </div>
            <button className="flex items-center justify-center gap-2 text-brand-olive text-[10px] uppercase tracking-widest font-bold hover:gap-4 transition-all pb-2 sm:pb-0">
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="w-full relative z-10 px-2 sm:px-8 py-4">
            <Card data={PORTFOLIO_DATA} showCarousel={true} cardsPerView={3} />
          </div>
        </div>
      </section>

      {/* Custom Sign Section */}
      <section id="custom-sign" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-brand-beige/50 relative z-10 overflow-hidden bg-gradient-to-b from-transparent to-brand-beige/20">
        <CustomWoodSign />
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 border-y border-brand-beige/50 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#E9DEC9_2px,transparent_2px)] [background-size:40px_40px] opacity-30"></div>
        <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-10 left-1/4 text-brand-sage opacity-50 z-0 hidden md:block">
           <Flower2 size={72} strokeWidth={1} />
        </motion.div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-brand-beige/40 rounded-full blur-3xl pointer-events-none z-0"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-cream/60 rounded-full blur-3xl pointer-events-none z-0 hidden sm:block"></div>
        
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 sm:gap-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-sm sm:max-w-none mx-auto"
          >
            <div className="w-full aspect-square bg-brand-cream rounded-[32px] sm:rounded-[48px] p-3 soft-shadow border border-brand-beige relative">
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-white w-16 h-16 sm:w-20 sm:h-20 rounded-full soft-shadow z-20 border border-brand-beige flex items-center justify-center text-brand-olive">
                <Heart size={24} className="sm:w-[32px] sm:h-[32px] fill-brand-olive/20" strokeWidth={1.5} />
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
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-adren font-bold gold-gradient-text leading-tight">About VetteCraft by Ivette</h2>
              <p className="text-brand-taupe font-bold text-[9px] sm:text-[10px] uppercase tracking-widest mt-2 sm:mt-3">The story behind our creations</p>
            </div>
            <div className="text-xs sm:text-sm text-brand-charcoal/85 font-medium leading-relaxed max-w-md lg:max-w-xl mx-auto lg:mx-0 px-4 sm:px-0 space-y-4 text-left pt-2">
              <p>
                My name is Ivette, and I have always felt a special connection to creativity and the beauty of handmade details.
              </p>
              <p>
                The name VetteCraft was born from a story very close to my heart. Two of my nieces could not pronounce “Aunt Ivette” and lovingly began calling me “Aunt Vette.” From that affection and simple little moment, VetteCraft by Ivette was born.
              </p>
              <p>
                My journey began in 2017, creating handmade wreaths made from yarn pom-poms. What started as a personal passion gradually grew into a space where creativity, dedication, and love for handmade artistry come to life.
              </p>
              <p>
                Over time, VetteCraft evolved to include home decor, personalized gifts, and thoughtfully designed pieces created to celebrate meaningful moments and bring warmth and beauty into everyday spaces.
              </p>
              <p>
                I deeply believe that memories hold immense value. Every message I incorporate into my pieces is created with the hope of touching someone’s heart — a family, a friend, or someone who simply needs a special detail or a small reminder of happiness.
              </p>
              <p>
                More than creating products, my purpose is to create lasting memories that inspire emotion and celebrate the beauty and meaning found in life’s little details.
              </p>
              <p className="font-semibold text-brand-olive pt-2">
                Welcome to VetteCraft by Ivette, where every piece is created with love, intention, and meaning.
              </p>
            </div>
            <div className="pt-2">
              <button className="px-8 py-4 bg-white text-brand-olive font-bold uppercase tracking-widest text-[10px] rounded-full border border-brand-beige hover:bg-brand-cream transition-colors soft-shadow">
                Read Our Story
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#E9DEC9_2px,transparent_2px)] [background-size:40px_40px] opacity-20"></div>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 right-20 text-brand-sage opacity-80 z-0 hidden lg:block">
           <Send size={56} strokeWidth={1} className="rotate-45" />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-20 left-20 text-brand-beige opacity-80 z-0 hidden md:block">
           <Heart size={64} strokeWidth={1} />
        </motion.div>
        <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-t from-transparent to-brand-beige/20 pointer-events-none z-0"></div>

        <div className="max-w-4xl mx-auto relative z-10 bg-brand-sage rounded-[32px] sm:rounded-[48px] p-6 sm:p-8 md:p-14 border-b-4 border-brand-olive/20 soft-shadow border border-white">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-4xl sm:text-5xl font-adren font-bold text-white mb-3 sm:mb-4">Say Hello</h2>
            <p className="text-white/80 font-bold text-[9px] sm:text-[10px] uppercase tracking-widest">We'd love to hear from you</p>
          </div>

          <form className="space-y-4 sm:space-y-6 max-w-2xl mx-auto flex flex-col">
            <div className="flex flex-col justify-center sm:flex-row gap-4 sm:gap-6">
              <div className="flex-1 relative">
                <div className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 text-brand-taupe">
                   <User size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
                </div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-white rounded-full py-3.5 sm:py-4 pl-12 sm:pl-14 pr-6 text-sm text-brand-charcoal font-medium placeholder-brand-taupe/60 focus:outline-none focus:ring-2 focus:ring-brand-olive border border-transparent transition-all shadow-sm"
                />
              </div>
              <div className="flex-1 relative">
                <div className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 text-brand-taupe">
                   <Mail size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
                </div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white rounded-full py-3.5 sm:py-4 pl-12 sm:pl-14 pr-6 text-sm text-brand-charcoal font-medium placeholder-brand-taupe/60 focus:outline-none focus:ring-2 focus:ring-brand-olive border border-transparent transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-5 sm:left-6 top-4 sm:top-5 text-brand-taupe">
                <MessageSquare size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
              </div>
              <textarea 
                placeholder="Tell us about the custom pieces or personalized gifts you would like us to create for you..." 
                rows={4}
                className="w-full bg-white rounded-[24px] sm:rounded-[32px] py-4 pl-12 sm:pl-14 pr-6 text-sm text-brand-charcoal font-medium placeholder-brand-taupe/60 focus:outline-none focus:ring-2 focus:ring-brand-olive border border-transparent transition-all shadow-sm resize-none"
              ></textarea>
            </div>

            <button type="button" onClick={() => alert("Message sent! Thanks for reaching out.")} className="self-center flex items-center justify-center gap-3 px-8 sm:px-10 py-4 bg-brand-olive text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#687460] transition-all shadow-lg hover:-translate-y-1 active:scale-95 mt-4 w-full sm:w-auto">
              Send Message <Send size={14} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 pb-28 sm:pb-8 px-4 sm:px-16 flex flex-col md:flex-row justify-between border-t border-brand-beige/50 items-center text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-bold text-brand-taupe gap-6 md:gap-0 relative z-10 w-full overflow-hidden text-center sm:text-left">
        <span className="flex-1 w-full text-center md:text-left break-words">© {new Date().getFullYear()} Vettecraft By Ivette</span>
        
        <div className="flex items-center gap-2 sm:gap-4 text-center justify-center flex-1 whitespace-nowrap">
          <Heart size={12} className="sm:w-[14px] sm:h-[14px] text-brand-sage" strokeWidth={3} fill="#A7B29A" />
          <span>Crafted in Miami, FL</span>
          <Heart size={12} className="sm:w-[14px] sm:h-[14px] text-brand-sage" strokeWidth={3} fill="#A7B29A" />
        </div>

        <div className="flex justify-center md:justify-end gap-6 flex-1 w-full text-brand-taupe">
          <a href="#" className="hover:text-brand-olive transition-colors">Instagram</a>
          <a href="#" className="hover:text-brand-olive transition-colors">Pinterest</a>
        </div>
      </footer>
    </div>
  );
}
