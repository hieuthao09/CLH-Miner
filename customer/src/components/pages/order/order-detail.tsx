import React, { useEffect, useState } from 'react';
import { useTranslation } from '@hook/index';
import { useGet } from '@hook/queries';
import { OrderDetailCollectionType } from '@type/collection';
import { Box, Heading, Text, List, ListItem, Badge, Flex, Divider, Image, Grid, GridItem } from '@chakra-ui/react';

interface OrderDetailProps {
    orderId: number;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId }) => {
    const { t } = useTranslation();
    const [orderDetail, setOrderDetail] = useState<OrderDetailCollectionType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const orderDetailQuery = useGet<OrderDetailCollectionType>({
        api: 'order-detail',
        filter: {
            Id: orderId
        }
    });

    useEffect(() => {
        if (orderDetailQuery.isSuccess) {
            setOrderDetail(orderDetailQuery.data?.data);
            setLoading(false);
        } else if (orderDetailQuery.isError) {
            setError('Lỗi khi lấy chi tiết đơn hàng');
            setLoading(false);
        }
    }, [orderId, orderDetailQuery.isSuccess, orderDetailQuery.isError, orderDetailQuery.data]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    if (loading) {
        return <p>Đang tải...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!orderDetail) {
        return <p>Không tìm thấy chi tiết đơn hàng</p>;
    }

    return (
        <Box maxW="auto" mx="auto" p="4" borderWidth="1px" borderRadius="md" bgColor="white" boxShadow="lg">
            <Heading as="h3" size="xl" mb="4" textAlign="center" color="teal.500" fontWeight="bold">CHI TIẾT ĐƠN HÀNG</Heading>

            <Box mb="4">
                <Text fontSize="xl"><strong>Mã đơn hàng:</strong> {orderDetail.internalCode}</Text>
                <Text fontSize="xl"><strong>Ngày:</strong> {formatDate(orderDetail.date)}</Text>
                <Text fontSize="xl"><strong>Tổng số tiền:</strong> {orderDetail.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                <Text fontSize="xl"><strong>Giảm giá:</strong> {orderDetail.totalDecrease.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                <Text fontSize="xl"><strong>Tổng cộng:</strong> {orderDetail.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                <Flex alignItems="center" mt="2">
                    <Text fontSize="xl" mr="4"><strong>Trạng thái:</strong></Text>
                    <Badge colorScheme={orderDetail.status === 1 ? 'green' : 'yellow'} fontSize="xl">
                        {orderDetail.status === 1 ? 'Hoàn thành' : 'Chờ xử lý'}
                    </Badge>
                </Flex>
                <Flex alignItems="center">
                    <Text fontSize="xl" mr="4"><strong>Đã thanh toán:</strong></Text>
                    <Badge colorScheme={orderDetail.isPay ? 'green' : 'red'} fontSize="xl">
                        {orderDetail.isPay ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </Badge>
                </Flex>
            </Box>

            <Divider mb="4" />

            {/* <Box mb="4">
                <Heading as="h3" size="lg" pb="4">Thông tin khách hàng</Heading>
                <Text fontSize="xl"><strong>Tên:</strong> {orderDetail.customer.name}</Text>
                <Text fontSize="xl"><strong>Số điện thoại:</strong> {orderDetail.customer.phone}</Text>
                <Text fontSize="xl"><strong>Email:</strong> {orderDetail.customer.email}</Text>
                <Text fontSize="xl"><strong>Địa chỉ:</strong> {orderDetail.customer.address}</Text>
                <Text fontSize="xl"><strong>Giới tính:</strong> {orderDetail.customer.gender}</Text>
            </Box> */}

            {/* <Divider mb="4" /> */}

            {/* <Box mb="4">
                <Heading as="h3" size="lg" pb="4">Thông tin phê duyệt</Heading>
                <Text fontSize="xl"><strong>Tên:</strong> {orderDetail.staffApproved.name}</Text>
                <Text fontSize="xl"><strong>Số điện thoại:</strong> {orderDetail.staffApproved.phoneNumber}</Text>
                <Text fontSize="xl"><strong>Email:</strong> {orderDetail.staffApproved.email}</Text>
                <Text fontSize="xl"><strong>Chức vụ:</strong> {orderDetail.staffApproved.position?.name}</Text>
            </Box> */}

            {/* <Divider mb="4" /> */}

            <Box>
                <Heading as="h3" size="lg" pb="4">Danh sách sản phẩm đã mua</Heading>
                <List spacing={4}>
                    {orderDetail.details.map((detail, index) => (
                        <ListItem key={index} borderWidth="1px" p="4" borderRadius="md" bgColor="gray.100">
                            <Flex align="center">
                                <Image src={detail.product.images} alt={detail.product.name} boxSize="80px" objectFit="cover" mr="4" />
                                <Box flex="1">
                                    <Text fontSize="xl"><strong>Sản phẩm:</strong> {detail.product.name}</Text>
                                    <Text fontSize="xl"><strong>Giá:</strong> {detail.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                    <Text fontSize="xl"><strong>Số lượng:</strong> {detail.quantity}</Text>
                                </Box>
                            </Flex>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default OrderDetail;
