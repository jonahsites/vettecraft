import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Folder, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { GalleryFolder, GalleryImage } from '../../types/gallery';

interface FolderDetailModalProps {
  folder: GalleryFolder | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenOrganizer?: () => void;
}

export const FolderDetailModal: React.FC<FolderDetailModalProps> = ({
  folder,
  isOpen,
  onClose,
  onOpenOrganizer,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Reset selected image when folder changes or modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedImageIndex(null);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        if (selectedImageIndex !== null) {
          setSelectedImageIndex(null);
        } else {
          onClose();
        }
      } else if (selectedImageIndex !== null && folder) {
        const visibleImages = folder.images.filter((img) => img.visible !== false);
        if (e.key === 'ArrowRight') {
          setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % visibleImages.length : 0));
        } else if (e.key === 'ArrowLeft') {
          setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + visibleImages.length) % visibleImages.length : 0));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedImageIndex, folder, onClose]);

  if (!isOpen || !folder) return null;

  const visibleImages = folder.images.filter((img) => img.visible !== false);
  const activeImage: GalleryImage | undefined = 
    selectedImageIndex !== null ? visibleImages[selectedImageIndex] : undefined;

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % visibleImages.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + visibleImages.length) % visibleImages.length);
    }
  };

  return (
    <AnimatePresence>
      <div 
        id="folder-detail-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-brand-charcoal/75 backdrop-blur-md overflow-hidden"
        onClick={() => {
          if (selectedImageIndex !== null) {
            setSelectedImageIndex(null);
          } else {
            onClose();
          }
        }}
      >
        <motion.div
          id="folder-detail-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-[#FAF8F5] border border-brand-beige rounded-[28px] sm:rounded-[36px] shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-brand-charcoal"
        >
          {/* Header */}
          <div className="px-5 sm:px-8 py-5 border-b border-brand-beige/60 bg-white/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-brand-sage/20 text-brand-olive flex items-center justify-center shadow-inner">
                <Folder size={24} className="fill-brand-olive/20" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md bg-brand-cream border border-brand-beige text-brand-olive">
                    Collection Folder
                  </span>
                  <span className="text-[11px] text-brand-taupe font-semibold">
                    {visibleImages.length} {visibleImages.length === 1 ? 'creation' : 'creations'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-adren font-bold text-brand-charcoal tracking-wide mt-0.5">
                  {folder.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {onOpenOrganizer && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenOrganizer();
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-brand-charcoal hover:text-brand-olive bg-brand-cream/60 hover:bg-brand-cream rounded-full border border-brand-beige transition-colors"
                >
                  <SlidersHorizontal size={13} />
                  <span>Organize Folder</span>
                </button>
              )}
              <button
                type="button"
                id="close-folder-modal-btn"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white hover:bg-brand-beige/50 text-brand-charcoal flex items-center justify-center border border-brand-beige/80 transition-colors shadow-sm"
                aria-label="Close folder"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Optional description bar */}
          {folder.description && (
            <div className="px-5 sm:px-8 py-3 bg-brand-cream/40 border-b border-brand-beige/40 text-xs text-brand-taupe font-medium flex items-center gap-2">
              <Sparkles size={14} className="text-brand-sage flex-shrink-0" />
              <span>{folder.description}</span>
            </div>
          )}

          {/* Grid of images in this folder */}
          <div 
            id="folder-images-grid"
            className="flex-1 overflow-y-auto p-5 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {visibleImages.map((img, idx) => (
              <div
                key={img.id || idx}
                onClick={() => setSelectedImageIndex(idx)}
                className="group relative bg-white rounded-[22px] overflow-hidden border border-brand-beige/70 hover:border-brand-olive hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image display */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-cream/30">
                  <img
                    src={img.imgUrl}
                    alt={img.title || `Creation ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-white/95 text-brand-charcoal text-xs font-bold shadow flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Maximize2 size={13} /> View Fullscreen
                    </span>
                  </div>
                </div>

                {/* Content caption */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                  {img.title && (
                    <h4 className="font-adren font-bold text-sm sm:text-base text-brand-charcoal mb-1">
                      {img.title}
                    </h4>
                  )}
                  {img.content && (
                    <p className="text-xs text-brand-taupe leading-relaxed font-sans line-clamp-2">
                      {img.content}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Bar */}
          <div className="px-5 sm:px-8 py-3.5 border-t border-brand-beige/60 bg-white/70 flex items-center justify-between text-xs text-brand-taupe">
            <span className="flex items-center gap-1.5">
              <Info size={13} className="text-brand-olive" />
              Click any photo to enlarge or view slideshow
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-brand-charcoal text-white hover:bg-brand-olive text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Done Viewing
            </button>
          </div>
        </motion.div>

        {/* Fullscreen Lightbox Overlay when an image is clicked */}
        {selectedImageIndex !== null && activeImage && (
          <motion.div
            id="image-fullscreen-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex(null);
            }}
          >
            {/* Top Lightbox Controls */}
            <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-20">
              <div className="bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold">
                Photo {selectedImageIndex + 1} of {visibleImages.length} &middot; {folder.name}
              </div>
              <button
                type="button"
                onClick={() => setSelectedImageIndex(null)}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                aria-label="Close full view"
              >
                <X size={20} />
              </button>
            </div>

            {/* Left Nav */}
            {visibleImages.length > 1 && (
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-105"
                aria-label="Previous photo"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Main Image Container */}
            <div 
              className="relative max-w-4xl max-h-[75vh] flex flex-col items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeImage.imgUrl}
                alt={activeImage.title || "Full photo view"}
                className="max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
              {activeImage.content && (
                <div className="mt-4 px-4 py-2 bg-black/50 backdrop-blur-md rounded-xl text-center max-w-xl text-white/90 text-sm font-serif">
                  {activeImage.content}
                </div>
              )}
            </div>

            {/* Right Nav */}
            {visibleImages.length > 1 && (
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-105"
                aria-label="Next photo"
              >
                <ChevronRight size={28} />
              </button>
            )}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};
