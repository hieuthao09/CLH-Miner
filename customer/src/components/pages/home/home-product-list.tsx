import { Box, Center, Grid, GridItem, Skeleton, Text } from '@chakra-ui/react';
import { Product, ReactIcon } from '@component/ui';
import { useTranslation, useSearchParam } from '@hook/index';
import { useGet } from '@hook/queries';
import { skeletons } from '@lib/util';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './HomeProductList.module.css';
import { ProductCollectionType } from '@type/collection';

const HomeProductList = () => {
    const { t } = useTranslation();
    const params = useSearchParam();
    const [currentPage, setCurrentPage] = useState(0);

    const productQuery = useGet<ProductCollectionType[]>({
        api: 'product',
        filter: {
            Sorts: '',
            PageIndex: currentPage + 1,
            PageSize: 20,
        },
    });

    return (
        <Box p={4}>
            <Text textAlign='center' mb={8} fontWeight='bold' fontSize='2xl'>
                {t('common:all_products')}
            </Text>

            <Grid templateColumns='repeat(4, 1fr)' gap={5}>
                {(productQuery.data?.data || skeletons<ProductCollectionType>(10)).map((product) => (
                    <GridItem key={product.id}>
                        <Product data={product} />
                    </GridItem>
                ))}
            </Grid>

            {productQuery.data?.data && productQuery.data.data.length > 0 && (
                <Center mt={8}>
                    <ReactPaginate
                        breakLabel='...'
                        previousLabel={<ReactIcon icon='IoChevronBack' />}
                        nextLabel={<ReactIcon icon='IoChevronForward' />}
                        forcePage={currentPage}
                        pageRangeDisplayed={8}
                        pageCount={productQuery.data?.extra.totalPages || 1}
                        marginPagesDisplayed={2}
                        containerClassName='paginate-container'
                        onPageChange={(page) => setCurrentPage(page.selected)}
                        previousClassName='paginate-previous'
                        nextClassName='paginate-next'
                        activeClassName='paginate-active'
                    />
                </Center>
            )}
        </Box>
    );
};

export { HomeProductList };
