import { useState, useRef, FormEvent } from "react";
import { motion } from "motion/react";
import { Upload, Type, Eraser, Check, Mail, Send, Image as ImageIcon, Sparkles, Move } from "lucide-react";

const SHAPES = [
  { id: "rectangle", name: "Rectangle", class: "aspect-square md:aspect-[4/3] rounded-[32px]" },
  { id: "square", name: "Square", class: "aspect-square rounded-[32px]" },
  { id: "round", name: "Round", class: "aspect-square rounded-full" },
  { id: "arch", name: "Arch", class: "aspect-[3/4] md:aspect-[2/3] rounded-t-full rounded-b-[32px]" }
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
  const [removeBg, setRemoveBg] = useState(false);
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [selectedShape, setSelectedShape] = useState(SHAPES[0]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setImage(null);
        setBgIsDark(false);
        setText("");
        setImgScale(1);
        setTextScale(1);
        setEmail("");
        setDetails("");
        setRemoveBg(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-script font-bold gold-gradient-text mb-4">Request a Custom Piece</h2>
        <p className="text-sm font-medium text-gray-text max-w-2xl mx-auto leading-relaxed">
          Design your perfect wood burned sign. Preview your image and text below, then submit your request. Our artists will manually refine your image, remove backgrounds, and perfect the design before burning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Controls - Left Panel */}
        <div className="lg:col-span-5 xl:col-span-4 order-2 lg:order-1">
          <form onSubmit={handleSubmit} className="bg-white/50 backdrop-blur-md rounded-[32px] p-6 sm:p-8 soft-shadow border border-[#F5EDE8] space-y-8 relative overflow-hidden">
            {isSubmitted && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="absolute inset-0 z-50 bg-[#F5EDE8] flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#7C5C5C] mb-4 soft-shadow">
                  <Check size={32} />
                </div>
                <h3 className="font-script text-4xl text-[#7C5C5C] mb-2">Request Sent!</h3>
                <p className="text-sm text-gray-text">We've received your custom design request. We'll be in touch via email soon with a final proof.</p>
              </motion.div>
            )}

            {/* Design Steps */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#F5EDE8] pb-4">
                <span className="w-8 h-8 rounded-full bg-[#EAE2D8] text-[#7C5C5C] font-bold flex items-center justify-center text-sm">1</span>
                <h3 className="font-bold text-[#7C5C5C] text-lg">Design Details</h3>
              </div>

              {/* Shape Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[#A68F8F] mb-3 block">Canvas Shape</label>
                <div className="grid grid-cols-2 gap-2">
                  {SHAPES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedShape(s)}
                      className={`py-3 px-2 rounded-[16px] text-xs font-bold transition-all border ${
                        selectedShape.id === s.id 
                          ? "bg-white text-[#7C5C5C] border-white soft-shadow scale-[1.02]" 
                          : "bg-transparent text-[#A68F8F] border-[#EAE2D8] hover:bg-white/50"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[#A68F8F] mb-3 block">Main Subject</label>
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
                  className="w-full py-4 px-4 bg-white/60 rounded-[20px] text-sm font-medium text-[#7C5C5C] hover:bg-white transition-all border border-white dashed-border flex flex-col items-center justify-center gap-3 min-h-[100px]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F5EDE8] flex items-center justify-center text-[#A68F8F]">
                    {image ? <ImageIcon size={18} /> : <Upload size={18} />}
                  </div>
                  <span>{image ? "Change Image" : "Click to Upload Image"}</span>
                </button>
                {image && (
                  <div className="mt-4 px-2">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#A68F8F]">Image Size</label>
                      <span className="text-[10px] text-[#A68F8F]">{Math.round(imgScale * 100)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.2" max="2" step="0.05" 
                      value={imgScale} 
                      onChange={(e) => setImgScale(parseFloat(e.target.value))}
                      className="w-full accent-[#7C5C5C]"
                    />
                  </div>
                )}
              </div>

              {/* Remove Background Toggle */}
              <div className="flex items-center justify-between p-4 bg-white/40 rounded-[16px] border border-white/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#F5EDE8] rounded-full text-[#7C5C5C]">
                    <Eraser size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#7C5C5C]">Remove Background</h4>
                    <p className="text-[10px] text-[#A68F8F] uppercase tracking-wide mt-0.5">Auto-detects contrast</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setRemoveBg(!removeBg)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors relative flex items-center ${removeBg ? "bg-[#7C5C5C]" : "bg-[#D8CFC4]"}`}
                >
                  <motion.div 
                    initial={false}
                    animate={{ x: removeBg ? 24 : 0 }}
                    className="w-4 h-4 rounded-full bg-white shadow-sm"
                  />
                </button>
              </div>

              {/* Text Input */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[#A68F8F] mb-3 block">Engraving Text</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your custom message, names, or date..."
                  className="w-full bg-white/60 rounded-[20px] p-4 text-sm text-[#7C5C5C] placeholder-[#A68F8F] focus:outline-none focus:ring-2 focus:ring-white border border-white transition-all resize-none h-24"
                />
                {text && (
                  <div className="mt-4 px-2">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#A68F8F]">Text Size</label>
                      <span className="text-[10px] text-[#A68F8F]">{Math.round(textScale * 100)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.5" max="3" step="0.1" 
                      value={textScale} 
                      onChange={(e) => setTextScale(parseFloat(e.target.value))}
                      className="w-full accent-[#7C5C5C]"
                    />
                  </div>
                )}
              </div>

              {/* Font Selection */}
              {text && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[#A68F8F] mb-3 block">Typography</label>
                  <div className="grid grid-cols-2 gap-2">
                    {FONTS.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedFont(f)}
                        className={`py-3 px-2 rounded-[16px] text-sm transition-all border ${f.class} ${
                          selectedFont.id === f.id 
                            ? "bg-white text-[#7C5C5C] border-white soft-shadow scale-[1.02]" 
                            : "bg-transparent text-[#A68F8F] border-[#EAE2D8] hover:bg-white/50"
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
            <div className="space-y-6 pt-4 border-t border-[#F5EDE8]">
              <div className="flex items-center gap-3 pb-2">
                <span className="w-8 h-8 rounded-full bg-[#EAE2D8] text-[#7C5C5C] font-bold flex items-center justify-center text-sm">2</span>
                <h3 className="font-bold text-[#7C5C5C] text-lg">Contact Info</h3>
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A68F8F]" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="w-full bg-white/60 rounded-[16px] py-4 pl-12 pr-4 text-sm text-[#7C5C5C] placeholder-[#A68F8F] focus:outline-none focus:ring-2 focus:ring-white border border-white transition-all"
                />
              </div>

              <div>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Any specific requests? (e.g. 'Make the dog larger', 'Put text at bottom')"
                  className="w-full bg-white/60 rounded-[16px] p-4 text-sm text-[#7C5C5C] placeholder-[#A68F8F] focus:outline-none focus:ring-2 focus:ring-white border border-white transition-all resize-none h-20"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full py-4 px-6 bg-[#3B2C2C] text-white rounded-[20px] font-bold hover:bg-[#2A1F1F] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
        <div className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2 flex flex-col items-center justify-center h-full">
          {(image || text) && (
            <div className="mb-4 text-[#A68F8F] text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              <Move size={14} /> You can drag elements to position
            </div>
          )}
          {/* Filter definitions */}
          <svg width="0" height="0" className="hidden">
            <filter id="woodMonochrome">
              {/* Convert to grayscale based on luminance */}
              <feColorMatrix 
                type="matrix" 
                values="0.2126 0.7152 0.0722 0 0
                        0.2126 0.7152 0.0722 0 0
                        0.2126 0.7152 0.0722 0 0
                        0      0      0      1 0" 
              />
              {/* Map grayscale values to a gradient of wood tones */}
              <feComponentTransfer>
                <feFuncR type="table" tableValues="0.12 0.30 0.50 0.75 0.98" />
                <feFuncG type="table" tableValues="0.06 0.18 0.35 0.60 0.95" />
                <feFuncB type="table" tableValues="0.02 0.09 0.20 0.40 0.90" />
              </feComponentTransfer>
            </filter>
            
            <filter id="removeBgContrast">
              <feComponentTransfer>
                <feFuncR type="linear" slope="1.5" intercept="-0.1" />
                <feFuncG type="linear" slope="1.5" intercept="-0.1" />
                <feFuncB type="linear" slope="1.5" intercept="-0.1" />
              </feComponentTransfer>
            </filter>
          </svg>

          {/* Canvas Viewport */}
          <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center p-4">
            <motion.div 
              ref={canvasRef}
              layout
              className={`relative w-full ${selectedShape.class} overflow-hidden soft-shadow bg-[#D8CFC4] transition-all duration-500 touch-none`}
            >
              {/* Base Wood Texture */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
                style={{ 
                  backgroundImage: "url('https://images.squarespace-cdn.com/content/v1/5829ff9f893fc0eadc780393/1596758011956-4DO8EMMSM7AOPMHYTZC2/Woden+Panels.png?format=2500w')"
                }}
              />

              {/* Overlaid Content */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center sm:p-12 overflow-hidden pointer-events-none">
                {/* The Image layer */}
                {image && (
                  <motion.img 
                    drag
                    dragConstraints={canvasRef}
                    dragElastic={0.1}
                    dragMomentum={false}
                    src={image}
                    alt="Custom upload"
                    className="w-[75%] max-w-md object-contain mix-blend-multiply cursor-grab active:cursor-grabbing pointer-events-auto"
                    style={{
                      scale: imgScale,
                      opacity: removeBg ? 0.95 : 0.85,
                      filter: removeBg 
                        ? (bgIsDark ? "invert(1) url(#removeBgContrast) url(#woodMonochrome)" : "url(#removeBgContrast) url(#woodMonochrome)") 
                        : "url(#woodMonochrome)",
                      maxHeight: text ? "55%" : "80%"
                    }}
                  />
                )}

                {/* Text on Top */}
                {text && (
                  <motion.h3 
                    drag
                    dragConstraints={canvasRef}
                    dragElastic={0.1}
                    dragMomentum={false}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${selectedFont.class} ${
                      selectedFont.id === 'font-script' ? 'text-5xl md:text-7xl font-bold' : 
                      selectedFont.id === 'font-serif' ? 'text-3xl md:text-5xl font-medium' : 
                      selectedFont.id === 'font-mono' ? 'text-2xl md:text-4xl font-normal uppercase tracking-widest' :
                      'text-3xl md:text-5xl font-semibold tracking-tight'
                    } text-[#1A1111] drop-shadow-sm whitespace-pre-wrap mix-blend-multiply opacity-90 max-w-full break-words relative z-20 mt-6 md:mt-8 cursor-grab active:cursor-grabbing pointer-events-auto`}
                    style={{ scale: textScale }}
                  >
                    {text}
                  </motion.h3>
                )}
              </div>

              {/* Top texture layers for wood grain overlay */}
              <div 
                className="absolute inset-0 z-20 pointer-events-none mix-blend-multiply bg-cover bg-center opacity-30"
                style={{ 
                  backgroundImage: "url('https://images.squarespace-cdn.com/content/v1/5829ff9f893fc0eadc780393/1596758011956-4DO8EMMSM7AOPMHYTZC2/Woden+Panels.png?format=2500w')"
                }}
              />
              <div 
                className="absolute inset-0 z-20 pointer-events-none mix-blend-screen bg-cover bg-center opacity-[0.35]"
                style={{ 
                  backgroundImage: "url('https://images.squarespace-cdn.com/content/v1/5829ff9f893fc0eadc780393/1596758011956-4DO8EMMSM7AOPMHYTZC2/Woden+Panels.png?format=2500w')"
                }}
              />

              {/* Placeholder Empty State */}
              {!image && !text && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                    <Sparkles size={24} className="text-[#3B2C2C]/50" />
                  </div>
                  <span className="text-[#3B2C2C]/50 font-bold uppercase tracking-widest text-sm bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/40 shadow-sm">
                    {selectedShape.name} Canvas Preview
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          <p className="text-center mt-6 text-xs uppercase font-bold text-[#A68F8F] tracking-wider max-w-md">
            *This is a digital preview. Final physical product may vary slightly in texture, color, and contrast.
          </p>
        </div>
      </div>
    </div>
  );
}
