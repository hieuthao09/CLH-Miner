import { apiConfig } from './api-config';

const queryKeyConfig: {
	[key in keyof typeof apiConfig]: {
		default: (filter?: any) => any[];
	};
} = {
	'login': {
		default: () => [],
	},
	'register': {
		default: () => [],
	},

	'add-to-cart': {
		default: () => [],
	},
	'create-order': {
		default: () => [],
	},
	'cart-detail': {
		default: (filter) => ['list', 'cart-detail', filter],
	},

	'product': {
		default: (filter) => ['list', 'products', filter],
	},
	'product-detail': {
		default: (filter) => ['detail', 'product', filter],
	},

	'category': {
		default: (filter) => ['list', 'categories', filter],
	},
	'category-detail': {
		default: (filter) => ['detail', 'category', filter],
	},
	'order-history': {
		default: (filter) => ['detail', 'order', filter],
	},
	'order-change-status': {
		default: () => [],
	},
	'order-detail': {
		default: () => [],
	},
};

export { queryKeyConfig };
