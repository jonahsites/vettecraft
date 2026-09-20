import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Folder, Sparkles, Eye } from "lucide-react";

// Define the type for card data
export interface CardData {
  id?: number | string;
  imgUrl: string;
  content?: string;
  folderName?: string;
  photoCount?: number;
  folderId?: string;
  rawFolder?: any;
}

interface CardProps {
  key?: React.Key;
  data: CardData[];
  showCarousel?: boolean;
  cardsPerView?: number;
  onCardClick?: (card: CardData) => void;
}

const Card = ({ data, showCarousel = true, cardsPerView: defaultCardsPerView = 3, onCardClick }: CardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSingleCard, setIsSingleCard] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(defaultCardsPerView);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsSingleCard(data?.length === 1);
    setCurrentIndex(0);
  }, [data]);

  useEffect(() => {
    // Basic responsiveness
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(defaultCardsPerView);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [defaultCardsPerView]);

  // Calculate width percentage for each card based on cardsPerView
  const cardWidth = 100 / cardsPerView;

  const nextSlide = () => {
    if (isAnimating || !showCarousel || !data) return;

    // Don't allow navigation if there aren't enough cards
    if (data.length <= cardsPerView) return;

    setIsAnimating(true);
    const nextIndex = (currentIndex + 1) % data.length;

    // The container has space for cardsPerView + 1 cards.
    // Therefore, shifts are in units of 100 / (cardsPerView + 1)%
    const stepPercent = 100 / (cardsPerView + 1);

    if (containerRef.current) {
      // Apply slide out animation
      containerRef.current.style.transition = "transform 500ms ease";
      containerRef.current.style.transform = `translateX(-${stepPercent}%)`;

      // After animation completes, reset position and update index
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        if (containerRef.current) {
          containerRef.current.style.transition = "none";
          containerRef.current.style.transform = "translateX(0)";

          // Force reflow
          void containerRef.current.offsetWidth;

          setIsAnimating(false);
        }
      }, 500);
    }
  };

  const prevSlide = () => {
    if (isAnimating || !showCarousel || !data) return;
    if (data.length <= cardsPerView) return;

    setIsAnimating(true);
    const prevIndex = (currentIndex - 1 + data.length) % data.length;
    const stepPercent = 100 / (cardsPerView + 1);

    if (containerRef.current) {
      // First move instantly to the right position
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(-${stepPercent}%)`;

      // Update the index immediately
      setCurrentIndex(prevIndex);

      // Force reflow
      void containerRef.current.offsetWidth;

      // Then animate back to center
      containerRef.current.style.transition = "transform 500ms ease";
      containerRef.current.style.transform = "translateX(0)";

      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  // Calculate which cards to show
  const getVisibleCards = () => {
    if (!showCarousel || !data) return data || [];

    const visibleCards = [];
    const totalCards = data.length;

    // For next slide animation, we need current cards + 1 extra
    for (let i = 0; i < cardsPerView + 1; i++) {
      const index = (currentIndex + i) % totalCards;
      visibleCards.push(data[index]);
    }

    return visibleCards;
  };

  if (!data || data.length === 0) {
    return <div>No card data available</div>;
  }

  return (
    <div className="w-full px-4">
      <div className={`relative ${isSingleCard ? 'max-w-sm mx-auto' : 'w-full'}`}>
        {/* Carousel Controls */}
        {showCarousel && data.length > cardsPerView && (
          <>
            <button
              onClick={prevSlide}
              className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20 bg-white/80 text-[#7C5C5C] p-3 rounded-full soft-shadow hover:bg-white hover:scale-105 hover:text-pastel-pink-text transition-all duration-300 backdrop-blur-sm border border-[#F5EDE8]"
              disabled={isAnimating}
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20 bg-white/80 text-[#7C5C5C] p-3 rounded-full soft-shadow hover:bg-white hover:scale-105 hover:text-pastel-pink-text transition-all duration-300 backdrop-blur-sm border border-[#F5EDE8]"
              disabled={isAnimating}
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Cards Container Wrapper - limits visible area */}
        <div className="overflow-hidden">
          {/* Sliding Cards Container */}
          <div
            ref={containerRef}
            className="flex"
            style={{
              transform: "translateX(0)",
              width: showCarousel ? `${(cardsPerView + 1) * 100 / cardsPerView}%` : '100%'
            }}
          >
            {getVisibleCards().map((card, idx) => (
              <div
                key={`card-${currentIndex}-${idx}`}
                style={{
                  width: showCarousel ? `${100 / (cardsPerView + 1)}%` : `${100 / Math.min(cardsPerView, data.length)}%`
                }}
                className="px-3"
              >
                <div 
                  onClick={() => onCardClick?.(card)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onCardClick?.(card);
                    }
                  }}
                  className="relative overflow-hidden rounded-[24px] shadow-sm hover:shadow-xl group h-full bg-[#F5EDE8] border border-white cursor-pointer transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Top Folder Indicator Badge */}
                  {card.photoCount !== undefined && (
                    <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-charcoal/80 backdrop-blur-md text-white text-[11px] font-bold tracking-wide shadow-md group-hover:bg-brand-olive transition-colors">
                      <Folder size={12} className="text-brand-cream fill-brand-cream/30" />
                      <span>{card.photoCount} {card.photoCount === 1 ? 'Photo' : 'Photos'}</span>
                    </div>
                  )}

                  {/* Top Right Click Hint */}
                  <div className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-brand-charcoal flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md group-hover:scale-105">
                    <Eye size={14} className="text-brand-olive" />
                  </div>

                  {/* Main Displayed Image (Cover) */}
                  <div className="w-full aspect-[4/5] overflow-hidden bg-brand-cream/30">
                    <img
                      src={card.imgUrl}
                      alt={card.folderName || card.content || "Gallery folder cover"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Bottom Folder Caption Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    {card.folderName && (
                      <span className="text-[10px] uppercase font-bold tracking-widest text-brand-beige mb-1 flex items-center gap-1">
                        <Sparkles size={11} className="text-brand-cream" />
                        Collection
                      </span>
                    )}
                    {card.folderName && (
                      <h4 className="text-white text-base sm:text-lg font-adren font-bold tracking-wide leading-tight mb-1.5 drop-shadow">
                        {card.folderName}
                      </h4>
                    )}
                    {card.content && (
                      <p className="text-white/80 text-xs font-sans line-clamp-2 leading-relaxed mb-2 font-light">
                        {card.content}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-cream tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-1 group-hover:translate-y-0">
                      <span>Click to open folder & view all photos</span>
                      <span>&rarr;</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
