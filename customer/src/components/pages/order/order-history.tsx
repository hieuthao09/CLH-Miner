import React, { useState } from 'react';
import { Box, Heading, List, ListItem, Text, Badge, Button, Flex } from '@chakra-ui/react';
import { OrderHistoryCollectionType } from '@type/collection';
import { useGet } from '@hook/queries';
import { usePatch } from '@hook/mutations';
import { OrderStatusType } from '@type/common';
import OrderDetail from './order-detail';

const OrderHistory: React.FC = () => {
    const orderHistoryQuery = useGet<OrderHistoryCollectionType[]>({
        api: 'order-history',
    });

    const orderStatus = usePatch();

    const [expandedOrder, setExpandedOrder] = useState<OrderHistoryCollectionType | null>(null);

    const handleListItemClick = (order: OrderHistoryCollectionType) => {
        if (expandedOrder && expandedOrder.id === order.id) {
            setExpandedOrder(null); // Clicking again collapses the expanded order
        } else {
            setExpandedOrder(order); // Expand the clicked order
        }
    };

    const handleContinueShoppingClick = () => {
        window.location.href = `http://localhost:8888/vi`;
    };

    const handleReceivedClick = async (id: number) => {
        try {
            const data: OrderStatusType = {
                orderId: id,
                status: 4 // Assuming 4 represents 'Hoàn Thành'
            };

            await orderStatus.mutateAsync(data);

            // After updating order status, refetch order history
            orderHistoryQuery.refetch();

        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <Box p={5}>
            <Heading as="h1" mb={5} size="lg" color="teal.600">Lịch sử đơn hàng</Heading>
            <List spacing={5}>
                {orderHistoryQuery.data?.data.map(order => (
                    <React.Fragment key={order.internalCode}>
                        <ListItem
                            p={5}
                            shadow="md"
                            borderWidth="1px"
                            borderRadius="md"
                            cursor="pointer"
                            onClick={() => handleListItemClick(order)}
                        >
                            <Flex justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Heading as="h3" size="md" color="teal.500">
                                        Mã Đơn Hàng: {order.internalCode}
                                    </Heading>
                                    <Text>
                                        <strong>Ngày:</strong> {new Date(order.date).toLocaleString('vi-VN')}
                                    </Text>
                                    <Text>
                                        <strong>Tổng Số Tiền:</strong> {order.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </Text>
                                    <Text>
                                        <strong>Trạng Thái:</strong> <Badge colorScheme={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                                    </Text>
                                </Box>
                                {order.status === 3 && (
                                    <Button colorScheme="blue" onClick={() => handleReceivedClick(order.id)}>
                                        Đã Nhận
                                    </Button>
                                )}
                            </Flex>
                        </ListItem>
                        {expandedOrder && expandedOrder.id === order.id && (
                            <Box mt={4}>
                                <OrderDetail orderId={order.id} />
                            </Box>
                        )}
                    </React.Fragment>
                ))}
            </List>
            <Button mt={5} colorScheme="teal" onClick={handleContinueShoppingClick}>
                Tiếp Tục Đặt Hàng
            </Button>
        </Box>
    );
};

const getStatusText = (status: number): string => {
    switch (status) {
        case 1:
            return 'Đang Chờ';
        case 3:
            return 'Đã vận chuyển';
        case 4:
            return 'Hoàn Thành';
        default:
            return 'Không Rõ';
    }
};

const getStatusColor = (status: number): string => {
    switch (status) {
        case 1:
            return 'yellow';
        case 3:
            return 'blue';
        case 4:
            return 'green';
        default:
            return 'gray';
    }
};

export default OrderHistory;
