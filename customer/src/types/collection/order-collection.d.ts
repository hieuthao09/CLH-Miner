import { ProductCollectionType } from './product-collection';

type AddToCartType = {
	productId: number;
	quantity: number;
};

type CartDetailType = {
	details: CartDetailItemType[];
	total: number;
	totalAmount: number;
	totalDecrease: number;
};

type CartDetailItemType = {
	cost: number;
	isSelected: boolean;
	price: number;
	reducedPrice: number;
	productId: number;
	product: ProductCollectionType;
	quantity: number;
};

export { AddToCartType, CartDetailType, CartDetailItemType };
