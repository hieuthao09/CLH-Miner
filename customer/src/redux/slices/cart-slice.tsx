import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartDetailType } from '@type/collection';

const initialState: CartDetailType = {
	details: [],
	total: 0,
	totalAmount: 0,
	totalDecrease: 0,
};

const cartSlice = createSlice({
	name: 'product-detail',
	initialState,
	reducers: {
		setData(state, action: PayloadAction<CartDetailType | undefined>) {
			if (action.payload) {
				return (state = action.payload);
			}
		},
		updateItem(
			state,
			action: PayloadAction<{ productId: number; quantity: number; isSelected: boolean; index: number }>,
		) {
			state.details[action.payload.index] = {
				...state.details[action.payload.index],
				...action.payload,
			};
		},
	},
});

export { cartSlice };
