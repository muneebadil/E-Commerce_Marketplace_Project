

export interface Product {
    _id: string;
    title: string;
    _type: "product";
    slug: {
        _type : "slug"
        current: string;
    };
    // slug: string;
    image?: {
        asset: {
            _ref: string;
            _type: "image";
        };
    };
    price: number;
    description: string;
    inventory: number;
    product: Product;
    discountPercentage?: number;
    tags: string[]; // Tags as an array of strings, as defined in the schema
    isNew?: boolean; // Optional boolean for "New Badge"
    imageURL :string;
}
