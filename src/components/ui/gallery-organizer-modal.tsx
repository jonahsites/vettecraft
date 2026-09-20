import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  GripVertical, 
  Check, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  SlidersHorizontal,
  Sparkles,
  Folder,
  Plus,
  Trash2,
  Star,
  FolderPlus,
  Edit2,
  MoveRight
} from 'lucide-react';
import { GalleryFolder, GalleryImage } from '../../types/gallery';

interface GalleryOrganizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  folders: GalleryFolder[];
  defaultFolders: GalleryFolder[];
  allImages: GalleryImage[];
  onSave: (updatedFolders: GalleryFolder[]) => void;
}

export const GalleryOrganizerModal: React.FC<GalleryOrganizerModalProps> = ({
  isOpen,
  onClose,
  folders,
  defaultFolders,
  allImages,
  onSave,
}) => {
  // Working copy of folders
  const [workingFolders, setWorkingFolders] = useState<GalleryFolder[]>([]);
  const [activeFolderId, setActiveFolderId] = useState<string>('');
  
  // Drag & drop state for images inside active folder
  const [draggedImgIdx, setDraggedImgIdx] = useState<number | null>(null);
  const [dragOverImgIdx, setDragOverImgIdx] = useState<number | null>(null);

  // Folder name edit state
  const [isEditingFolderName, setIsEditingFolderName] = useState(false);
  const [folderNameInput, setFolderNameInput] = useState('');

  // Add photos sub-view modal/drawer
  const [isAddPhotosOpen, setIsAddPhotosOpen] = useState(false);

  // Sync state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const cloned = JSON.parse(JSON.stringify(folders)) as GalleryFolder[];
      setWorkingFolders(cloned);
      if (cloned.length > 0) {
        setActiveFolderId(cloned[0].id);
        setFolderNameInput(cloned[0].name);
      }
      setIsEditingFolderName(false);
      setIsAddPhotosOpen(false);
      setDraggedImgIdx(null);
      setDragOverImgIdx(null);
    }
  }, [isOpen, folders]);

  if (!isOpen) return null;

  const currentFolder = workingFolders.find((f) => f.id === activeFolderId) || workingFolders[0];
  const currentFolderIdx = workingFolders.findIndex((f) => f.id === activeFolderId);

  // Helper to update current folder
  const updateCurrentFolder = (updater: (prev: GalleryFolder) => GalleryFolder) => {
    if (!currentFolder) return;
    setWorkingFolders((prev) =>
      prev.map((f) => (f.id === currentFolder.id ? updater(f) : f))
    );
  };

  // Reorder folders (left/right in carousel)
  const handleMoveFolder = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= workingFolders.length) return;
    setWorkingFolders((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, moved);
      return copy;
    });
  };

  // Create new folder
  const handleCreateFolder = () => {
    const newId = `folder-${Date.now()}`;
    const newName = `New Collection ${workingFolders.length + 1}`;
    // Grab first image from allImages as initial placeholder
    const initialImg = allImages[0] ? [{ ...allImages[0], visible: true }] : [];
    const newFolder: GalleryFolder = {
      id: newId,
      name: newName,
      description: "Custom curated collection",
      coverImageId: initialImg[0]?.id || 1,
      visible: true,
      images: initialImg,
    };
    setWorkingFolders((prev) => [...prev, newFolder]);
    setActiveFolderId(newId);
    setFolderNameInput(newName);
    setIsEditingFolderName(true);
  };

  // Delete folder
  const handleDeleteFolder = (folderId: string) => {
    if (workingFolders.length <= 1) {
      alert("At least one folder is required.");
      return;
    }
    const remaining = workingFolders.filter((f) => f.id !== folderId);
    setWorkingFolders(remaining);
    if (activeFolderId === folderId && remaining.length > 0) {
      setActiveFolderId(remaining[0].id);
      setFolderNameInput(remaining[0].name);
    }
  };

  // Save folder name change
  const handleSaveFolderName = () => {
    if (!folderNameInput.trim()) return;
    updateCurrentFolder((f) => ({ ...f, name: folderNameInput.trim() }));
    setIsEditingFolderName(false);
  };

  // Toggle folder inclusion in carousel
  const handleToggleFolderVisibility = (folderId: string) => {
    setWorkingFolders((prev) =>
      prev.map((f) =>
        f.id === folderId ? { ...f, visible: f.visible === false ? true : false } : f
      )
    );
  };

  // Inside active folder: set an image as the single carousel cover
  const handleSetAsCover = (imageId: string | number) => {
    updateCurrentFolder((f) => ({ ...f, coverImageId: imageId }));
  };

  // Inside active folder: toggle image visibility
  const handleToggleImageVisibility = (idx: number) => {
    updateCurrentFolder((f) => {
      const copy = [...f.images];
      copy[idx] = {
        ...copy[idx],
        visible: copy[idx].visible === false ? true : false,
      };
      return { ...f, images: copy };
    });
  };

  // Inside active folder: move image position (drag or arrows)
  const handleMoveImage = (fromIdx: number, toIdx: number) => {
    if (!currentFolder || toIdx < 0 || toIdx >= currentFolder.images.length) return;
    updateCurrentFolder((f) => {
      const copy = [...f.images];
      const [moved] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, moved);
      return { ...f, images: copy };
    });
  };

  // Remove image from active folder
  const handleRemoveImageFromFolder = (imgId: string | number) => {
    if (!currentFolder) return;
    if (currentFolder.images.length <= 1) {
      alert("A folder needs at least one photo.");
      return;
    }
    updateCurrentFolder((f) => {
      const remaining = f.images.filter((img) => img.id !== imgId);
      const newCoverId = f.coverImageId === imgId && remaining[0] ? remaining[0].id : f.coverImageId;
      return { ...f, images: remaining, coverImageId: newCoverId };
    });
  };

  // Move image to another folder
  const handleMoveImageToFolder = (img: GalleryImage, targetFolderId: string) => {
    if (!currentFolder || currentFolder.id === targetFolderId) return;
    if (currentFolder.images.length <= 1) {
      alert("Each folder must keep at least one image.");
      return;
    }

    setWorkingFolders((prev) => {
      return prev.map((f) => {
        if (f.id === currentFolder.id) {
          const remaining = f.images.filter((i) => i.id !== img.id);
          const newCover = f.coverImageId === img.id && remaining[0] ? remaining[0].id : f.coverImageId;
          return { ...f, images: remaining, coverImageId: newCover };
        }
        if (f.id === targetFolderId) {
          // Avoid duplicate
          const alreadyExists = f.images.some((i) => i.id === img.id);
          return {
            ...f,
            images: alreadyExists ? f.images : [...f.images, { ...img, visible: true }],
          };
        }
        return f;
      });
    });
  };

  // Add photo from photo library to active folder
  const handleAddPhotoToCurrentFolder = (img: GalleryImage) => {
    if (!currentFolder) return;
    const alreadyInFolder = currentFolder.images.some((i) => i.id === img.id);
    if (alreadyInFolder) return;

    updateCurrentFolder((f) => ({
      ...f,
      images: [...f.images, { ...img, visible: true }],
    }));
  };

  // Drag & Drop handlers for images
  const handleDragStart = (idx: number, e: React.DragEvent) => {
    setDraggedImgIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (idx: number) => {
    if (draggedImgIdx !== null && draggedImgIdx !== idx) {
      setDragOverImgIdx(idx);
    }
  };

  const handleDrop = (idx: number, e: React.DragEvent) => {
    e.preventDefault();
    if (draggedImgIdx !== null && draggedImgIdx !== idx) {
      handleMoveImage(draggedImgIdx, idx);
    }
    setDraggedImgIdx(null);
    setDragOverImgIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedImgIdx(null);
    setDragOverImgIdx(null);
  };

  const handleResetToDefaults = () => {
    if (window.confirm("Reset all folders and photo assignments to default?")) {
      const cloned = JSON.parse(JSON.stringify(defaultFolders)) as GalleryFolder[];
      setWorkingFolders(cloned);
      if (cloned.length > 0) {
        setActiveFolderId(cloned[0].id);
        setFolderNameInput(cloned[0].name);
      }
    }
  };

  const handleSave = () => {
    onSave(workingFolders);
    onClose();
  };

  const activeCoverId = currentFolder?.coverImageId || currentFolder?.images[0]?.id;

  return (
    <AnimatePresence>
      <div 
        id="gallery-organizer-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-brand-charcoal/75 backdrop-blur-md overflow-hidden"
      >
        <motion.div
          id="gallery-organizer-modal"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-[#FAF8F5] border border-brand-beige rounded-[28px] sm:rounded-[36px] shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-brand-charcoal"
        >
          {/* Main Top Header */}
          <div className="px-5 sm:px-8 py-4 border-b border-brand-beige/60 bg-white/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-sage/20 text-brand-olive flex items-center justify-center">
                <SlidersHorizontal size={20} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-adren font-bold text-brand-charcoal tracking-wide flex items-center gap-2">
                  Organize Folders & Carousel
                </h3>
                <p className="text-xs text-brand-taupe font-medium mt-0.5">
                  Organize your photos into themed folders. Each folder displays one cover photo in the carousel that opens all photos when clicked.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                id="organizer-reset-btn"
                onClick={handleResetToDefaults}
                title="Reset to default folders"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-brand-taupe hover:text-brand-charcoal bg-white rounded-full border border-brand-beige hover:bg-brand-cream/50 transition-colors"
              >
                <RotateCcw size={13} />
                <span>Reset Defaults</span>
              </button>
              <button
                type="button"
                id="organizer-close-btn"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white hover:bg-brand-beige/50 text-brand-charcoal flex items-center justify-center border border-brand-beige transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Folder Tabs Navigation Bar */}
          <div className="px-5 sm:px-8 py-3 bg-brand-cream/40 border-b border-brand-beige/50 flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 min-w-max">
              <span className="text-[10px] uppercase font-bold text-brand-taupe tracking-wider mr-1">
                Folders:
              </span>
              {workingFolders.map((f, idx) => {
                const isActive = f.id === activeFolderId;
                const isFolderVisible = f.visible !== false;
                return (
                  <div
                    key={f.id}
                    className={`flex items-center rounded-full border transition-all ${
                      isActive 
                        ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-sm' 
                        : 'bg-white text-brand-charcoal border-brand-beige hover:border-brand-olive'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFolderId(f.id);
                        setFolderNameInput(f.name);
                        setIsEditingFolderName(false);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold"
                    >
                      <Folder size={13} className={isActive ? 'text-brand-cream' : 'text-brand-olive'} />
                      <span>{f.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans ${
                        isActive ? 'bg-white/20 text-brand-cream' : 'bg-brand-cream text-brand-taupe'
                      }`}>
                        {f.images.length}
                      </span>
                    </button>

                    {/* Visibility indicator on folder tab */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFolderVisibility(f.id);
                      }}
                      title={isFolderVisible ? "Folder is visible in carousel" : "Folder is hidden from carousel"}
                      className={`pr-2.5 pl-1 py-1.5 text-[11px] ${
                        isActive 
                          ? isFolderVisible ? 'text-brand-cream hover:text-white' : 'text-white/40' 
                          : isFolderVisible ? 'text-brand-olive' : 'text-brand-taupe/40'
                      }`}
                    >
                      {isFolderVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                    </button>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={handleCreateFolder}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-brand-sage hover:text-white text-brand-olive border border-brand-beige text-xs font-bold transition-colors"
                title="Create a new folder"
              >
                <FolderPlus size={13} />
                <span>+ New Folder</span>
              </button>
            </div>
          </div>

          {/* Active Folder Controls & Explanation Bar */}
          {currentFolder && (
            <div className="px-5 sm:px-8 py-3 bg-white border-b border-brand-beige/40 flex flex-wrap items-center justify-between gap-3">
              {/* Folder name edit + position in carousel */}
              <div className="flex items-center gap-2">
                {isEditingFolderName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={folderNameInput}
                      onChange={(e) => setFolderNameInput(e.target.value)}
                      className="text-sm font-bold px-3 py-1 bg-brand-cream/30 border border-brand-olive rounded-lg focus:outline-none"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleSaveFolderName}
                      className="px-2.5 py-1 bg-brand-sage text-white text-xs font-bold rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h4 className="font-adren font-bold text-base text-brand-charcoal">
                      {currentFolder.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setFolderNameInput(currentFolder.name);
                        setIsEditingFolderName(true);
                      }}
                      className="text-brand-taupe hover:text-brand-charcoal p-1"
                      title="Rename folder"
                    >
                      <Edit2 size={13} />
                    </button>
                  </div>
                )}

                {/* Folder position arrows */}
                <div className="flex items-center gap-1 ml-2 pl-2 border-l border-brand-beige">
                  <span className="text-[10px] uppercase font-bold text-brand-taupe mr-1">
                    Order:
                  </span>
                  <button
                    type="button"
                    disabled={currentFolderIdx === 0}
                    onClick={() => handleMoveFolder(currentFolderIdx, currentFolderIdx - 1)}
                    title="Move folder earlier in carousel"
                    className="w-6 h-6 rounded bg-brand-cream/60 hover:bg-brand-beige disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-brand-charcoal"
                  >
                    <ArrowLeft size={12} />
                  </button>
                  <button
                    type="button"
                    disabled={currentFolderIdx === workingFolders.length - 1}
                    onClick={() => handleMoveFolder(currentFolderIdx, currentFolderIdx + 1)}
                    title="Move folder later in carousel"
                    className="w-6 h-6 rounded bg-brand-cream/60 hover:bg-brand-beige disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-brand-charcoal"
                  >
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Right actions: Add photos & Delete folder */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPhotosOpen(!isAddPhotosOpen)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                    isAddPhotosOpen 
                      ? 'bg-brand-olive text-white border-brand-olive' 
                      : 'bg-white hover:bg-brand-cream/60 text-brand-charcoal border-brand-beige'
                  }`}
                >
                  <Plus size={13} />
                  <span>{isAddPhotosOpen ? 'Close Library' : 'Add Photos to Folder'}</span>
                </button>

                {workingFolders.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteFolder(currentFolder.id)}
                    className="p-1.5 text-brand-taupe hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete this folder"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Add Photos Sub-Drawer (If opened) */}
          {isAddPhotosOpen && currentFolder && (
            <div className="px-5 sm:px-8 py-3 bg-brand-cream/50 border-b border-brand-beige/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-brand-charcoal flex items-center gap-1.5">
                  <Sparkles size={13} className="text-brand-olive" />
                  Select from Photo Library to add into &ldquo;{currentFolder.name}&rdquo;:
                </span>
              </div>
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                {allImages.map((img) => {
                  const isAlreadyIn = currentFolder.images.some((i) => i.id === img.id);
                  return (
                    <div
                      key={`library-${img.id}`}
                      className="relative group min-w-[76px] w-[76px] aspect-square rounded-xl overflow-hidden border border-brand-beige flex-shrink-0 bg-white"
                    >
                      <img
                        src={img.imgUrl}
                        alt="Thumbnail"
                        className={`w-full h-full object-cover ${isAlreadyIn ? 'opacity-40 grayscale' : ''}`}
                        referrerPolicy="no-referrer"
                      />
                      {isAlreadyIn ? (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Check size={16} className="text-white" />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddPhotoToCurrentFolder(img)}
                          className="absolute inset-0 bg-brand-olive/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold uppercase transition-opacity"
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Explanatory Banner */}
          <div className="px-5 sm:px-8 py-2 bg-[#F6F3EE] border-b border-brand-beige/40 flex items-center justify-between text-[11px] text-brand-taupe font-medium">
            <span className="flex items-center gap-1.5">
              <Star size={13} className="text-amber-500 fill-amber-500" />
              The photo marked with <strong className="text-brand-charcoal">Carousel Cover</strong> is the single displayed image. Click ⭐ to set a different cover.
            </span>
            <span className="hidden sm:inline text-brand-taupe/80">
              Drag & drop photos to reorder inside this folder
            </span>
          </div>

          {/* Grid of Images for Active Folder */}
          <div 
            id="active-folder-images-grid"
            className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
          >
            {currentFolder?.images.map((item, index) => {
              const isCover = item.id === activeCoverId;
              const isVisible = item.visible !== false;
              const isDragged = draggedImgIdx === index;
              const isDragOver = dragOverImgIdx === index;

              return (
                <div
                  key={item.id || index}
                  draggable
                  onDragStart={(e) => handleDragStart(index, e)}
                  onDragOver={handleDragOver}
                  onDragEnter={() => handleDragEnter(index)}
                  onDrop={(e) => handleDrop(index, e)}
                  onDragEnd={handleDragEnd}
                  className={`relative group rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col bg-white select-none ${
                    isCover
                      ? 'ring-2 ring-amber-500 border-amber-400 shadow-md'
                      : isDragged 
                      ? 'opacity-40 scale-95 border-brand-olive ring-2 ring-brand-sage' 
                      : isDragOver
                      ? 'border-brand-olive ring-2 ring-brand-olive scale-[1.02] shadow-lg'
                      : isVisible
                      ? 'border-brand-beige/70 hover:border-brand-olive hover:shadow-md'
                      : 'border-brand-beige/40 bg-brand-cream/30 opacity-60'
                  }`}
                >
                  {/* Sequence Position Badge (Top-Left) */}
                  <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-brand-charcoal/85 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    <GripVertical size={11} className="cursor-grab active:cursor-grabbing text-brand-beige/70" />
                    <span>#{index + 1}</span>
                  </div>

                  {/* Top-Right Cover Indicator / Action Button */}
                  <button
                    type="button"
                    onClick={() => handleSetAsCover(item.id)}
                    title={isCover ? "This is the One Displayed Image in Carousel" : "Click to make this the Carousel Cover Image"}
                    className={`absolute top-2 right-2 z-20 px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md transition-all ${
                      isCover 
                        ? 'bg-amber-500 text-white ring-2 ring-white' 
                        : 'bg-white/90 text-brand-taupe hover:text-brand-charcoal hover:bg-white'
                    }`}
                  >
                    <Star size={11} className={isCover ? 'fill-white' : 'text-amber-500 fill-amber-500/30'} />
                    <span>{isCover ? 'Cover' : 'Make Cover'}</span>
                  </button>

                  {/* Image Thumbnail */}
                  <div 
                    onClick={() => handleToggleImageVisibility(index)}
                    className="relative aspect-square w-full overflow-hidden bg-brand-cream/40 cursor-pointer"
                  >
                    <img
                      src={item.imgUrl}
                      alt={`Item ${index + 1}`}
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                        !isVisible ? 'grayscale opacity-60' : ''
                      }`}
                      referrerPolicy="no-referrer"
                    />

                    {/* Cover label overlay if this is cover image */}
                    {isCover && (
                      <div className="absolute bottom-1.5 inset-x-1.5 bg-amber-500/95 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider py-0.5 text-center rounded">
                        Displayed in Carousel
                      </div>
                    )}
                  </div>

                  {/* Card bottom bar */}
                  <div className="p-2 bg-white border-t border-brand-beige/40 flex flex-col gap-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleToggleImageVisibility(index)}
                        className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                          isVisible ? 'text-brand-olive' : 'text-brand-taupe'
                        }`}
                      >
                        {isVisible ? <Eye size={11} /> : <EyeOff size={11} />}
                        <span>{isVisible ? 'Viewed' : 'Hidden'}</span>
                      </button>

                      {/* Step Reorder arrows */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMoveImage(index, index - 1)}
                          title="Move photo earlier"
                          className="w-5 h-5 rounded bg-brand-cream/60 hover:bg-brand-beige disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-brand-charcoal"
                        >
                          <ArrowLeft size={10} />
                        </button>
                        <button
                          type="button"
                          disabled={index === currentFolder.images.length - 1}
                          onClick={() => handleMoveImage(index, index + 1)}
                          title="Move photo later"
                          className="w-5 h-5 rounded bg-brand-cream/60 hover:bg-brand-beige disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-brand-charcoal"
                        >
                          <ArrowRight size={10} />
                        </button>
                      </div>
                    </div>

                    {/* Move to another folder or delete */}
                    <div className="flex items-center justify-between pt-1 border-t border-brand-beige/30 text-[10px]">
                      {workingFolders.length > 1 && (
                        <select
                          className="bg-brand-cream/40 border border-brand-beige rounded px-1.5 py-0.5 text-[10px] font-medium text-brand-charcoal focus:outline-none"
                          defaultValue=""
                          onChange={(e) => {
                            if (e.target.value) {
                              handleMoveImageToFolder(item, e.target.value);
                              e.target.value = "";
                            }
                          }}
                        >
                          <option value="" disabled>Move to...</option>
                          {workingFolders
                            .filter((f) => f.id !== currentFolder.id)
                            .map((f) => (
                              <option key={f.id} value={f.id}>
                                {f.name}
                              </option>
                            ))}
                        </select>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemoveImageFromFolder(item.id)}
                        className="text-brand-taupe hover:text-red-600 p-0.5 ml-auto"
                        title="Remove photo from this folder"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer controls: Summary, Cancel & Save */}
          <div className="px-5 sm:px-8 py-4 border-t border-brand-beige/60 bg-white/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-brand-taupe font-medium text-center sm:text-left">
              <span className="font-bold text-brand-charcoal">{workingFolders.filter((f) => f.visible !== false).length}</span> active folders will be displayed in the carousel.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                id="organizer-cancel-btn"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-brand-beige hover:bg-brand-cream/50 text-xs uppercase font-bold tracking-wider text-brand-charcoal transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                id="organizer-save-btn"
                onClick={handleSave}
                className="px-6 py-2.5 rounded-full bg-brand-sage hover:bg-brand-olive text-white text-xs uppercase font-bold tracking-widest transition-all shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95"
              >
                <Check size={14} strokeWidth={2.5} />
                <span>Save Carousel & Folders</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
