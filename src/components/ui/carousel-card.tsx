import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define the type for card data
interface CardData {
  id?: number | string;
  imgUrl: string;
  content: string;
}

interface CardProps {
  data: CardData[];
  showCarousel?: boolean;
  cardsPerView?: number;
}

const Card = ({ data, showCarousel = true, cardsPerView: defaultCardsPerView = 3 }: CardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSingleCard, setIsSingleCard] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(defaultCardsPerView);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsSingleCard(data?.length === 1);
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

    if (containerRef.current) {
      // Apply slide out animation
      containerRef.current.style.transition = "transform 500ms ease";
      containerRef.current.style.transform = `translateX(-${cardWidth}%)`;

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

    if (containerRef.current) {
      // First move instantly to the right position
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(-${cardWidth}%)`;

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
                <div className="relative overflow-hidden rounded-[24px] shadow-sm group h-full bg-[#F5EDE8] border border-white">
                  <div className="w-full aspect-[4/5]">
                    <img
                      src={card.imgUrl}
                      alt={card.content || "Gallery image"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  {card.content && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 overflow-y-auto">
                      <p className="text-white text-sm font-medium leading-relaxed font-serif">{card.content}</p>
                    </div>
                  )}
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
