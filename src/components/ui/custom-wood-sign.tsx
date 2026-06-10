import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { motion } from "motion/react";
import { Upload, Type, Eraser, Check, Mail, Send, Image as ImageIcon, Sparkles, Move } from "lucide-react";

const PRODUCT_CATEGORIES = [
  { id: "signs", name: "Custom Sign & Wood Plaque", description: "Beautiful hand-painted signs with custom lettering." },
  { id: "drinkware", name: "Custom Drinkware & Mug", description: "Elegant cups with scratch-resistant premium vinyl." },
  { id: "seasonal", name: "Seasonal / Ornaments", description: "Festive shapes and tags designed for changing seasons." },
  { id: "giftbox", name: "Custom Keepsake Box", description: "Lidded memory boxes personalized with names or messages." },
  { id: "other", name: "Bespoke / Custom Pieces", description: "Any other special custom item of your imagination!" }
];

const FONTS = [
  { id: "font-script", name: "Classic Script", class: "font-script" },
  { id: "font-serif", name: "Elegant Serif", class: "font-serif" },
  { id: "font-sans", name: "Modern Sans", class: "font-sans" },
  { id: "font-mono", name: "Typewriter", class: "font-mono tracking-widest" }
];

export function CustomWoodSign() {
  const [image, setImage] = useState<string | null>(null);
  const [bgIsDark, setBgIsDark] = useState(false);
  const [text, setText] = useState<string>("");
  const [imgScale, setImgScale] = useState(1);
  const [textScale, setTextScale] = useState(1);
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const pixel = ctx.getImageData(0, 0, 1, 1).data;
          const luminance = (0.299 * pixel[0] + 0.587 * pixel[1] + 0.114 * pixel[2]) / 255;
          setBgIsDark(luminance < 0.5);
        }
      };
      img.src = url;
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setImage(null);
        setBgIsDark(false);
        setText("");
        setImgScale(1);
        setTextScale(1);
        setEmail("");
        setDetails("");
        setSelectedCategory(PRODUCT_CATEGORIES[0]);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-adren font-bold gold-gradient-text mb-3 sm:mb-4">Request a Custom Piece</h2>
        <p className="text-xs sm:text-sm font-medium text-brand-taupe max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
          Create your personalized visual draft below. Preview your custom message and design idea, then submit your request. Ivette will review your custom vinyl details and coordinate with you to craft the perfect custom keepsake.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Controls - Left Panel */}
        <div className="lg:col-span-5 xl:col-span-4 order-2 lg:order-1">
          <form onSubmit={handleSubmit} className="bg-white/50 backdrop-blur-md rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 md:p-8 soft-shadow border border-brand-beige space-y-6 sm:space-y-8 relative overflow-hidden">
            {isSubmitted && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="absolute inset-0 z-50 bg-brand-cream flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-olive mb-4 soft-shadow">
                  <Check size={32} />
                </div>
                <h3 className="font-adren font-bold text-4xl text-brand-charcoal mb-2">Request Sent!</h3>
                <p className="text-sm text-brand-taupe">We've received your custom design request. We'll be in touch via email soon with a final proof.</p>
              </motion.div>
            )}

            {/* Design Steps */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-brand-beige pb-4">
                <span className="w-8 h-8 rounded-full bg-brand-beige text-brand-charcoal font-bold flex items-center justify-center text-sm">1</span>
                <h3 className="font-bold text-brand-charcoal text-lg">Product Selection</h3>
              </div>

              {/* Product Category Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-brand-taupe mb-3 block">Choose a Product Base</label>
                <div className="grid grid-cols-1 gap-2">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`p-3.5 px-4 rounded-[20px] text-xs font-bold transition-all border text-left flex flex-col ${
                        selectedCategory.id === cat.id 
                          ? "bg-white text-brand-charcoal border-brand-olive scale-[1.01] shadow-sm" 
                          : "bg-white/40 text-brand-taupe border-brand-cream/60 hover:bg-white/80"
                      }`}
                    >
                      <span className="font-bold text-[12px] text-brand-charcoal">{cat.name}</span>
                      <span className="text-[10px] opacity-75 font-medium normal-case mt-0.5 text-brand-taupe">{cat.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-brand-taupe mb-3 block mt-2">Design or Inspiration Image</label>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button 
                  type="button"
                  onClick={handleClickUpload}
                  className="w-full py-4 px-4 bg-white/60 rounded-[20px] text-sm font-medium text-brand-charcoal hover:bg-white transition-all border border-white dashed-border flex flex-col items-center justify-center gap-3 min-h-[100px]"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-taupe">
                    {image ? <ImageIcon size={18} /> : <Upload size={18} />}
                  </div>
                  <span>{image ? "Change Image" : "Click to Upload Inspiration Image"}</span>
                </button>
                {image && (
                  <div className="mt-4 px-2">
                    <div className="flex justify-between items-center mb-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-brand-taupe">Image Size</label>
                      <span className="text-[10px] text-brand-taupe">{Math.round(imgScale * 100)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.2" max="2" step="0.05" 
                      value={imgScale} 
                      onChange={(e) => setImgScale(parseFloat(e.target.value))}
                      className="w-full accent-brand-charcoal"
                    />
                  </div>
                )}
              </div>

              {/* Text Input */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-brand-taupe mb-3 block">Personalized Message</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your custom message, names, or date..."
                  className="w-full bg-white/60 rounded-[20px] p-4 text-sm text-brand-charcoal placeholder-brand-taupe focus:outline-none focus:ring-2 focus:ring-white border border-white transition-all resize-none h-24"
                />
                {text && (
                  <div className="mt-4 px-2">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-brand-taupe">Text Size</label>
                      <span className="text-[10px] text-brand-taupe">{Math.round(textScale * 100)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.5" max="3" step="0.1" 
                      value={textScale} 
                      onChange={(e) => setTextScale(parseFloat(e.target.value))}
                      className="w-full accent-brand-charcoal"
                    />
                  </div>
                )}
              </div>

              {/* Font Selection */}
              {text && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-taupe mb-3 block">Typography</label>
                  <div className="grid grid-cols-2 gap-2">
                    {FONTS.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedFont(f)}
                        className={`py-3 px-2 rounded-[16px] text-sm transition-all border ${f.class} ${
                          selectedFont.id === f.id 
                            ? "bg-white text-brand-charcoal border-white soft-shadow scale-[1.02]" 
                            : "bg-transparent text-brand-taupe border-brand-cream hover:bg-white/50"
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Steps */}
            <div className="space-y-6 pt-4 border-t border-brand-beige">
              <div className="flex items-center gap-3 pb-2">
                <span className="w-8 h-8 rounded-full bg-brand-beige text-brand-charcoal font-bold flex items-center justify-center text-sm">2</span>
                <h3 className="font-bold text-brand-charcoal text-lg">Contact Info</h3>
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-taupe" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="w-full bg-white/60 rounded-[16px] py-4 pl-12 pr-4 text-sm text-brand-charcoal placeholder-brand-taupe focus:outline-none focus:ring-2 focus:ring-white border border-white transition-all"
                />
              </div>

              <div>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Any specific requests? (e.g. 'Make the dog larger', 'Put text at bottom')"
                  className="w-full bg-white/60 rounded-[16px] p-4 text-sm text-brand-charcoal placeholder-brand-taupe focus:outline-none focus:ring-2 focus:ring-white border border-white transition-all resize-none h-20"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full py-4 px-6 bg-brand-olive text-white rounded-[20px] font-bold hover:bg-[#687460] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <Send size={18} /> Submit Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Preview Area - Right Panel */}
        <div className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2 flex flex-col items-center justify-center h-full w-full">
          {(image || text) && (
            <div className="mb-4 text-brand-taupe text-[10px] sm:text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              <Move size={14} className="text-brand-sage animate-pulse" /> Drag elements inside the active boards to plan your layout
            </div>
          )}

          {/* Neutral Workspace Canvas */}
          <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center p-2 sm:p-4">
            <motion.div 
              ref={canvasRef}
              layout
              className="relative w-full aspect-square sm:aspect-[4/3] rounded-[32px] overflow-hidden soft-shadow bg-[#FAF8F5] border border-brand-beige transition-all duration-500 touch-none flex flex-col justify-between p-6 sm:p-10 select-none"
            >
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(#E9DEC9_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40"></div>
              
              {/* Header inside mockup */}
              <div className="flex justify-between items-center border-b border-brand-beige/50 pb-3 w-full z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-brand-sage rounded-full"></div>
                  <span className="text-[10px] uppercase font-bold text-brand-taupe tracking-wider">Design Proof Workspace</span>
                </div>
                <span className="text-[9px] uppercase font-bold text-brand-olive bg-white px-3 py-1 rounded-full border border-brand-cream shadow-sm">
                  {selectedCategory.name}
                </span>
              </div>

              {/* Dynamic Workspace Content */}
              <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-6 py-4 w-full relative">
                
                {/* 1. If we have custom text, show it in a polished personalized item card */}
                {(text || image) ? (
                  <div className="w-full h-full flex flex-col justify-center items-center relative gap-6">
                    
                    {/* The typography design box */}
                    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-brand-beige/40 shadow-sm flex flex-col justify-center items-center min-h-[140px] md:min-h-[180px] max-w-lg transition-transform duration-300 relative overflow-hidden">
                      <div className="absolute top-2.5 left-4 text-[8px] uppercase tracking-wider font-bold text-brand-taupe">Custom Vinyl Text</div>
                      <div className="absolute top-2.5 right-4 text-[8px] uppercase tracking-wider font-semibold text-brand-olive flex items-center gap-1">
                        <Sparkles size={8} /> {selectedFont.name}
                      </div>

                      <div className="w-full text-center mt-2">
                        {text ? (
                          <motion.p 
                            drag
                            dragConstraints={canvasRef}
                            dragElastic={0.1}
                            dragMomentum={false}
                            style={{ scale: textScale }}
                            className={`${selectedFont.class} text-[#2E2824] leading-relaxed drop-shadow-sm whitespace-pre-wrap break-words inline-block max-w-full cursor-grab active:cursor-grabbing pointer-events-auto select-none ${
                              selectedFont.id === 'font-script' ? 'text-3xl sm:text-4xl md:text-5xl font-bold' : 
                              selectedFont.id === 'font-serif' ? 'text-xl sm:text-2xl md:text-3xl font-medium' : 
                              selectedFont.id === 'font-mono' ? 'text-base sm:text-lg md:text-xl font-mono' :
                              'text-xl sm:text-2xl font-bold'
                            }`}
                          >
                            {text}
                          </motion.p>
                        ) : (
                          <p className="text-xs text-brand-taupe/70 italic font-medium">
                            Add a personalized message or names inside the creator form on the left...
                          </p>
                        )}
                      </div>
                    </div>

                    {/* The inspiration visual attachment box */}
                    {image && (
                      <motion.div 
                        drag
                        dragConstraints={canvasRef}
                        dragElastic={0.1}
                        dragMomentum={false}
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: -3 }}
                        className="bg-white p-3 pb-5 rounded-2xl shadow-md border border-brand-beige/45 max-w-[150px] sm:max-w-[170px] cursor-grab active:cursor-grabbing pointer-events-auto absolute bottom-2 right-2 sm:right-6 sm:bottom-4 z-20 hover:scale-105 transition-all"
                        style={{ scale: imgScale }}
                      >
                        {/* Polaroid tape detail */}
                        <div className="absolute -top-3.5 left-1/2 -xl -translate-x-1/2 w-14 h-4 bg-[#f1ebd9]/90 border border-brand-beige/50 backdrop-blur-sm -rotate-3 rounded-sm opacity-80 pointer-events-none"></div>
                        <div className="aspect-square w-full overflow-hidden rounded-lg bg-brand-cream/40 mb-2 pointer-events-none">
                          <img src={image} alt="Inspiration source" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <p className="text-[8px] uppercase tracking-widest text-brand-taupe font-bold text-center pointer-events-none">Design Source</p>
                      </motion.div>
                    )}

                  </div>
                ) : (
                  /* Workspace Empty state instruction */
                  <div className="flex flex-col items-center justify-center text-center p-8 gap-4 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-brand-beige [box-shadow:0_4px_20px_rgba(167,178,154,0.1)]">
                      <Sparkles size={24} className="text-brand-sage animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-adren text-lg font-bold text-brand-charcoal">Design Proof Planner</h4>
                      <p className="text-xs text-brand-taupe max-w-sm font-medium leading-relaxed">
                        Customize your typography, type a message, or drop an inspiration image. Click “Submit Request” below and Ivette will handcraft your design.
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Footer signature line inside workspace */}
              <div className="flex justify-between items-center border-t border-brand-beige/40 pt-3 text-[8px] uppercase tracking-widest text-brand-taupe font-bold w-full z-10 select-none">
                <span>VetteCraft by Ivette Handcrafted Creations</span>
                <span>South Florida</span>
              </div>
            </motion.div>
          </div>

          <p className="text-center mt-6 text-xs font-semibold text-brand-taupe tracking-wider max-w-md px-4 leading-relaxed">
            *This planner is a modern design template. Ivette reviews every detail closely and will send you a final proof configuration before beginning personalization.
          </p>
        </div>
      </div>
    </div>
  );
}
