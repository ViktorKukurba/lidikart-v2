export interface WpPost {
    id: string|number;
    title: {rendered: string};
    acf: any;
    better_featured_image?: any;
    format: string;
    categories: Array<string|number>;
}
