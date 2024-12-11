import { Checkbox, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import { Image, Loading } from '@component/ui';
import { useTranslation } from '@hook/index';
import { usePost } from '@hook/mutations';
import { CartDetailItemType } from '@type/collection';
import { useEffect, useState } from 'react';
import { ProductDetailQuantity } from '../product-detail/product-detail-quantity';
import { useDispatch } from '@redux/index';
import { cartSlice } from '@redux/slices';

const CartProductItem = ({
	data,
	readonly,
	index,
}: {
	data: CartDetailItemType;
	readonly?: boolean;
	index: number;
}) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const updateQuantityMutate = usePost<
		any,
		{
			productId: number;
			quantity: number;
			isSelected: boolean;
		}
	>('add-to-cart', 'update');

	return (
		<HStack
			align='stretch'
			spacing={6}
			overflow='hidden'
			position='relative'
			rounded='md'
			p={4}
		>
			<Loading show={updateQuantityMutate.isPending} />

			{!readonly && (
				<Checkbox
					isChecked={data.isSelected}
					colorScheme='green'
					size='lg'
					onChange={(e) => {
						updateQuantityMutate.mutate(
							{
								quantity: data.quantity,
								isSelected: e.target.checked,
								productId: data.productId,
							},
							{
								onSuccess() {
									dispatch(
										cartSlice.actions.updateItem({
											index,
											isSelected: !data.isSelected,
											productId: data.productId,
											quantity: data.quantity,
										}),
									);
								},
							},
						);
					}}
				/>
			)}

			<Skeleton isLoaded={!!data?.product?.images}>
				<Image
					src={data?.product?.images[0]}
					boxSize={120}
					objectFit='contain'
				/>
			</Skeleton>

			<VStack
				flex={1}
				align='stretch'
				justifyContent='space-between'
			>
				<VStack align='stretch'>
					<Skeleton
						isLoaded={!!data?.product?.name}
						minH={25}
						minW={400}
					>
						<Text fontWeight='600'>{data?.product?.name}</Text>
					</Skeleton>

					<Skeleton
						isLoaded={!!data?.price}
						minH={25}
						minW={400}
					>
						<Text
							fontWeight='600'
							fontSize='xl'
							color='red'
						>
							{data?.price?.toLocaleString('vi-VN')}đ
						</Text>
					</Skeleton>
				</VStack>

				<Skeleton
					isLoaded={data.quantity > -1 && data.product.quantity > -1}
					w='fit-content'
				>
					{readonly ? (
						<HStack>
							<Text>Số lượng: </Text>
							<Text>{data.quantity}</Text>
						</HStack>
					) : (
						<ProductDetailQuantity
							quantity={data.quantity}
							productQuantity={data?.product?.quantity}
							onChange={(value) => {
								updateQuantityMutate.mutate(
									{
										isSelected: true,
										productId: data.productId,
										quantity: value,
									},
									{
										onSuccess() {
											dispatch(
												cartSlice.actions.updateItem({
													index,
													isSelected: data.isSelected,
													productId: data.productId,
													quantity: value,
												}),
											);
										},
									},
								);
							}}
						/>
					)}
				</Skeleton>
			</VStack>

			{/* <Flex alignItems='center'>
				<Center
					w={10}
					h={10}
					borderRadius='full'
					cursor='pointer'
					backgroundColor='gray.400'
					transition='all linear 0.2s'
					_hover={{
						backgroundColor: 'red.600',
					}}
				>
					<ReactIcon
						icon='FaXmark'
						color='white'
					/>
				</Center>
			</Flex> */}
		</HStack>
	);
};

export { CartProductItem };
