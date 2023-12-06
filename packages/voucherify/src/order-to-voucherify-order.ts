import { Order } from '@composable/types'
import { OrdersCreate } from '@voucherify/sdk'
import { toCent } from '@composable/commerce-generic'

export const orderToVoucherifyOrder = (order: Order): OrdersCreate => {
  return {
    amount: toCent(order.summary.priceBeforeDiscount),
    items: order.items.map((item) => ({
      quantity: item.quantity,
      product_id: item.id,
      sku_id: item.sku,
      price: item.price * 100,
    })),
  }
}
