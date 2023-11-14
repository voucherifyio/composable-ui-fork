import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { CartData, useCart } from 'hooks'
import { Price } from 'components/price'
import { CouponForm } from 'components/forms/coupon-form'
import {
  Box,
  Button,
  Divider,
  Flex,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react'
import { CartSummaryItem } from '.'
import { CartPromotions } from './cart-promotions'

interface CartSummaryProps {
  rootProps?: StackProps
  renderCheckoutButton?: boolean
  cartData?: CartData
}

export const CartSummary = ({
  rootProps,
  renderCheckoutButton = true,
  cartData,
}: CartSummaryProps) => {
  const router = useRouter()
  const { cart } = useCart()
  const intl = useIntl()
  const _cartData = cartData ?? cart

  const vouchers =
    _cartData.redeemables?.filter(
      (redeemable) => redeemable.object === 'voucher'
    ) || []
  const promotions =
    _cartData.redeemables?.filter(
      (redeemable) => redeemable.object === 'promotion_tier'
    ) || []

  return (
    <Stack spacing={{ base: '4', md: '6' }} width="full" {...rootProps}>
      <Stack bg="shading.100" p={'2rem 1.5rem'}>
        <Text
          as={'h2'}
          textStyle={{ base: 'Mobile/XS', md: 'Desktop/M' }}
          fontWeight={900}
          mb="sm"
        >
          {intl.formatMessage({ id: 'cart.summary.title' })}
        </Text>

        <Stack spacing="4">
          {_cartData.summary?.subtotalPrice && (
            <CartSummaryItem
              label={intl.formatMessage({ id: 'cart.summary.subtotal' })}
            >
              <Price
                rootProps={{ textStyle: 'Body-S' }}
                price={_cartData.summary.subtotalPrice}
              />
            </CartSummaryItem>
          )}
          {_cartData.summary?.shipping && (
            <CartSummaryItem
              label={intl.formatMessage({ id: 'cart.summary.shipping' })}
            >
              <Price
                rootProps={{ textStyle: 'Body-S' }}
                price={_cartData.summary.shipping}
              />
            </CartSummaryItem>
          )}

          {_cartData.summary?.taxes && (
            <CartSummaryItem
              label={intl.formatMessage({ id: 'cart.summary.taxes' })}
            >
              <Price
                rootProps={{ textStyle: 'Body-S' }}
                price={_cartData.summary.taxes}
              />
            </CartSummaryItem>
          )}

          {_cartData.summary?.totalPrice && (
            <>
              <Divider />
              <Flex
                justify="space-between"
                textStyle={{ base: 'Mobile/S', md: 'Desktop/S' }}
              >
                <Text>
                  {intl.formatMessage({ id: 'cart.summary.orderTotal' })}
                </Text>
                <Box>
                  <Price price={_cartData.summary.totalPrice} />
                </Box>
              </Flex>
            </>
          )}
          <CartPromotions promotions={promotions} />
          <CouponForm />
          {_cartData.summary?.totalDiscountAmount && (
            <CartSummaryItem
              label={intl.formatMessage({
                id: 'cart.summary.totalDiscountAmount',
              })}
            >
              <Price
                rootProps={{ textStyle: 'Body-S', color: 'green' }}
                price={`-${_cartData.summary.totalDiscountAmount}`}
              />
            </CartSummaryItem>
          )}

          {_cartData.summary?.grandPrice && (
            <>
              <Divider />
              <Flex
                justify="space-between"
                textStyle={{ base: 'Mobile/S', md: 'Desktop/S' }}
              >
                <Text>
                  {intl.formatMessage({ id: 'cart.summary.grandPrice' })}
                </Text>
                <Box>
                  <Price price={_cartData.summary.grandPrice} />
                </Box>
              </Flex>
            </>
          )}
        </Stack>
      </Stack>

      {renderCheckoutButton && (
        <Button
          onClick={() => {
            router.push('/checkout')
          }}
          w={{ base: 'full' }}
          maxW={{ base: 'full' }}
          variant={'solid'}
          size={'lg'}
        >
          {intl.formatMessage({ id: 'action.proceedToCheckout' })}
        </Button>
      )}
    </Stack>
  )
}
