export type OrderStatus = 'open' | 'complete';

export interface OrderInterface {
    id?: number;
    status: OrderStatus;
    user_id: number;
}

export interface OrderProducts {
    id: number;
    quantity: number;
    order_id: number;
    product_id: number;
}
