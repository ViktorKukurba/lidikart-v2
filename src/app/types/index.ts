import { WpPost } from '../interfaces/wp-post';

interface LAGalleryItem {
    src?: string;
    post: WpPost;
    format: string;
    thumb: {small: string, big: string};
}

interface Contacts {
    email: string;
}

export {
    LAGalleryItem,
    Contacts,
};
