'use client';

import { Card, CardBody, Skeleton, Text } from '@chakra-ui/react';
import { useTranslation } from '@hook/use-translation';
import { currency } from '@lib/util';
import { ProductCollectionType } from '@type/collection';
import { Image } from './image';
import { Link } from './link';

const Product = ({ data }: { data: ProductCollectionType }) => {
	const { t } = useTranslation();

	return (
		<Card width={200} borderRadius="lg" overflow="hidden" height="auto">
			<Skeleton isLoaded={!!data.name}>
				<Image
					src={data?.images?.[0]}
					alt=''
					width='100%'
					height={200}
					objectFit='contain'
					borderTopLeftRadius='lg'
					borderTopRightRadius='lg'
				/>
			</Skeleton>

			<CardBody>
				<Skeleton
					isLoaded={!!data.name}
					height={data.name ? 'auto' : '20px'}
					fontWeight='semibold'
					noOfLines={2}
				>
					{data.name}
				</Skeleton>

				<Skeleton
					isLoaded={!!data.name}
					height='20px'
					width='100px'
					mt={6}
					mb={3}
				>
					<Text textColor='red'>{currency(data.price)}</Text>
				</Skeleton>

				{!data.name && (
					<Skeleton
						height='20px'
						width='100px'
					>
						<Text
							textDecoration='line-through'
							textColor='gray.400'
						>
							{currency(data.newPrice)}
						</Text>
					</Skeleton>
				)}

				{data.newPrice && <Text>{currency(data.newPrice)}</Text>}

				<Skeleton
					isLoaded={!!data.name}
					borderRadius='full'
					overflow='hidden'
					mt={6}
				>
					<Link
						py={2}
						textAlign='center'
						backgroundColor='green.400'
						cursor='pointer'
						href='product-detail'
						params={{
							id: data.id.toString(),
						}}
						_hover={{
							backgroundColor: 'green.500',
						}}
					>
						<Text textColor='white'>{t('common:see_more')}</Text>
					</Link>
				</Skeleton>
			</CardBody>
		</Card>
	);
};

export { Product };
