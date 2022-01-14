export interface ProductInterface {
    id?: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string | number;
}

export interface Category {
    id?: number;
    category: string;
}
