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

interface CartProps {
  cartItems: CartItem[];
}

export function Cart({ cartItems}: CartProps) {
  return (
    <>
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
              <TouchableOpacity style={{marginRight: 24}}>
                <PlusCircle />
              </TouchableOpacity>

              <TouchableOpacity>
                <MinusCircle />
              </TouchableOpacity>
            </Actions>
          </Item>
        )}
      />
      <Summary>
        <TotalContainer>
          <Text color="#666">Total</Text>
          <Text size={20} weight="600">{formatCurrency(120)}</Text>
        </TotalContainer>
        <Button onPress={() => alert('')}>
                Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
