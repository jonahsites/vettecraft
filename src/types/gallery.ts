export interface GalleryImage {
  id: string | number;
  imgUrl: string;
  title?: string;
  content?: string;
  visible?: boolean;
}

export interface GalleryFolder {
  id: string;
  name: string;
  description?: string;
  coverImageId?: string | number;
  images: GalleryImage[];
  visible?: boolean;
}
