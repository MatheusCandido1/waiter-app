import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';
import {
  Item,
  ProductContainer,
  Actions,
  Image,
  QuantityContainer,
  ProductDetails,
  Summary,
  TotalContainer
} from './styles';

import { getImageUrl } from '../../utils/getImageUrl';
import { formatCurrency } from '../../utils/formatCurrency';
import { Text } from '../Text';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Button } from '../Button';
import { Product } from '../../types/Product';
import { OrderConfirmedModal } from '../OrderConfirmedModal';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
  onConfirmOrder: () => void;
}

export function Cart({ cartItems, onAdd, onRemove, onConfirmOrder }: CartProps) {
  const [isLoading] = useState(false);
  const [isOrderConfirmedModal, setisOrderConfirmedModal] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + (cartItem.product.price * cartItem.quantity);
  }, 0);

  function handleConfirmOrder() {
    setisOrderConfirmedModal(true);
  }

  function handleOk() {
    onConfirmOrder();
    setisOrderConfirmedModal(false);
  }

  return (
    <>
      <OrderConfirmedModal
        visible={isOrderConfirmedModal}
        onOk={handleOk}
      />
      {cartItems.length > 0 && (
        <FlatList
          style={{
            marginBottom: 20,
            maxHeight: 140
          }}
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: getImageUrl(cartItem.product.imagePath)
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>
                <ProductDetails>
                  <Text size={14} weight="600" >{cartItem.product.name}</Text>
                  <Text
                    size={14}
                    color="#666"
                    style={{marginTop: 4}}
                  >
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity
                  onPress={() => onAdd(cartItem.product)}
                  style={{marginRight: 24}}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onRemove(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}
      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">{formatCurrency(total)}</Text>
            </>
          ) : (
            <>
              <Text color="#999">Seu carrinho está vazio</Text>
            </>
          )}

        </TotalContainer>
        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
