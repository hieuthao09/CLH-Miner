import { BaseCollectionType } from './base-collection';
import { CategoryCollectionType } from './category-collection';

type ProductCollectionType = BaseCollectionType & {
	internalCode: number;
	name: string;
	price: number;
	newPrice?: number;
	images: string[];
	describes: string;
	category?: CategoryCollectionType;
	quantity: number;
	feature: string;
	specifications: string;
};

export type { ProductCollectionType };
