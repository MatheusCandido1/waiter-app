import { FlatList } from 'react-native';

import { products } from '../../mocks/products';
import {
  Product,
  ProductImage,
  ProductDetails,
  Divider,
  AddToCartButton
} from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';

export function Menu() {
  return (
    <FlatList
      data={products}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      keyExtractor={product => product._id}
      ItemSeparatorComponent={Divider}
      renderItem={({ item: product }) => (
        <Product>
          <ProductImage
            source={{
              uri: `http://10.82.209.214:3001/uploads/${product.imagePath}`
            }}
          />
          <ProductDetails>
            <Text weight="600">{product.name}</Text>
            <Text style={{marginVertical: 8}} size={14} color="#666">{product.description}</Text>
            <Text size={14} weight="600">{formatCurrency(product.price)}</Text>
          </ProductDetails>

          <AddToCartButton>
            <PlusCircle />
          </AddToCartButton>
        </Product>
      )}
    />
  );
}
