

    export interface IProduct {
        id: number;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        categoryId: number;
        category: ICategory;
    }


    export interface ICategory {
        id: number;
        name: string;
    }

    export interface IAddProduct {
        name: string;
        description: string;
        price: number;
        imageUrl: File;
        categoryId: number;
    }