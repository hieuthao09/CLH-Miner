import {
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	HStack,
	StackDivider,
	Text,
	VStack,
} from '@chakra-ui/react';
import { usePost } from '@hook/mutations';
import { useGet } from '@hook/queries';
import { useDispatch, useSelector } from '@redux/index';
import { cartSlice } from '@redux/slices';
import { CartDetailType } from '@type/collection';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { CartProductList } from './cart-product-list';
import { useTranslation } from '@hook/use-translation';
import { Loading } from '@component/ui';

const CartOrderDrawer = ({ onClose }: { onClose: () => void }) => {
	const dispatch = useDispatch();
	const createOrderMutate = usePost('create-order');
	const { t } = useTranslation();

	const productCartsQuery = useGet<CartDetailType>({
		api: 'cart-detail',
	});

	useEffect(() => {
		dispatch(cartSlice.actions.setData(productCartsQuery.data?.data));
	}, [productCartsQuery.data?.data]);

	const onCreateOrder = () => {
		createOrderMutate.mutate(
			{},
			{
				onSuccess() {
					toast.success(t('request:CREATE_ORDER_SUCCESS'));

					onClose();

					dispatch(
						cartSlice.actions.setData({
							details: [],
							total: 0,
							totalAmount: 0,
							totalDecrease: 0,
						}),
					);
				},
			},
		);
	};

	return (
		<Drawer
			placement='right'
			size='xl'
			isOpen={true}
			onClose={onClose}
		>
			<DrawerOverlay />

			<DrawerContent position='relative'>
				<Loading show={createOrderMutate.isPending} />

				<DrawerHeader>Thông tin đơn hàng</DrawerHeader>

				<DrawerBody>
					<CartProductList readonly={true} />

					<HStack></HStack>
				</DrawerBody>

				<DrawerFooter
					flexDirection='column'
					gap={8}
				>
					<VStack
						w='100%'
						align='stretch'
						borderWidth='2px'
						borderColor='green.400'
						borderStyle='dashed'
						p={5}
						borderRadius='md'
						shadow='md'
						spacing={4}
						divider={<StackDivider borderColor='gray.200' />}
					>
						<HStack justifyContent='space-between'>
							<Text>Thành tiền: </Text>
							<Text>{productCartsQuery.data?.data?.totalAmount?.toLocaleString('vi-VN')}đ</Text>
						</HStack>

						<HStack justifyContent='space-between'>
							<Text>Số tiền giảm:</Text>
							<Text>{productCartsQuery.data?.data?.totalDecrease?.toLocaleString('vi-VN')}đ</Text>
						</HStack>

						<HStack justifyContent='space-between'>
							<Text>Tổng tiền:</Text>
							<Text
								color='red'
								fontWeight={600}
							>
								{productCartsQuery.data?.data?.total?.toLocaleString('vi-VN')}đ
							</Text>
						</HStack>
					</VStack>

					<HStack justifyContent='center'>
						<Button
							variant='outline'
							mr={3}
							onClick={onClose}
						>
							Hủy
						</Button>

						<Button
							colorScheme='green'
							onClick={onCreateOrder}
						>
							Xác nhận
						</Button>
					</HStack>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export { CartOrderDrawer };
