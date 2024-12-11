import { Box, Grid, GridItem, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import { Link } from '@component/ui';
import { useTranslation } from '@hook/index';
import { useDispatch, useSelector } from '@redux/index';
import { ProductDetailBottomAction } from './product-detail-bottom-action';
import { ProductDetailQuantity } from './product-detail-quantity';
import { productDetailSlice } from '@redux/slices';
import { ProductDetailDescribe } from './product-detail-describe';

const ProductDetailInfo = () => {
	const { t } = useTranslation();
	const { data, quantity } = useSelector((state) => state.productDetail);
	const dispatch = useDispatch();

	return (
		<Box>
			<Grid
				templateRows='repeat(6, 1fr)'
				gap={8}
			>
				<GridItem>
					<Skeleton isLoaded={!!data?.internalCode}>
						<Text
							fontSize='2xl'
							fontWeight='700'
						>
							[{data?.internalCode}] - {data?.name}
						</Text>
					</Skeleton>
				</GridItem>
				<GridItem>
					<Skeleton
						isLoaded={!!data?.price}
						w='fit-content'
					>
						<Text
							fontWeight='700'
							fontSize='2xl'
							textColor={data?.price !== data?.newPrice ? 'gray' : 'red'}
							textDecoration={data?.price !== data?.newPrice ? 'line-through' : 'none'}
							minW={200}
						>
							{data?.price?.toLocaleString('vi-VN')}đ
						</Text>
						{data?.price !== data?.newPrice && (
							<Text
								fontWeight='700'
								fontSize='2xl'
								textColor='red'
							>
								{data?.newPrice?.toLocaleString('vi-VN')}đ
							</Text>
						)}
					</Skeleton>
				</GridItem>
				<GridItem>
					<Text w={60}>{t('category')}</Text>

					<Skeleton
						isLoaded={!!data?.category?.name}
						w='fit-content'
					>
						<Link
							href='category-detail'
							fontWeight='600'
							color='blue.600'
							textDecoration='underline'
							cursor='pointer'
							fontSize='lg'
							minW={200}
							minH={7}
							params={{
								id: data?.category?.id,
							}}
						>
							{data?.category?.name}
						</Link>
					</Skeleton>
				</GridItem>
				<GridItem>
					{data?.id && (
						<ProductDetailQuantity
							quantity={quantity}
							productQuantity={data.quantity}
							onChange={(value) => {
								dispatch(productDetailSlice.actions.setQuantity(value));
							}}
						/>
					)}
				</GridItem>

				<GridItem>
					<ProductDetailBottomAction />
				</GridItem>
			</Grid>


		</Box>
	);
};

export { ProductDetailInfo };
