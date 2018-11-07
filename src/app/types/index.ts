import { WpPost } from '../interfaces/wp-post';

type LAGalleryItem = {
    src?: string,
    post: WpPost,
    format: string,
    thumb: string
};

type Contacts = {email: string};

export {
    LAGalleryItem,
    Contacts,
};