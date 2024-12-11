export interface IProfit {
	id: number;
	items: {
		id: number;
		internalCode: string;
		name: string;
		isCategory: boolean;
	}[];
	profit: number;
}
