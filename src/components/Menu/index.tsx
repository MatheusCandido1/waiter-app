import { useState } from 'react';
import { FlatList } from 'react-native';

import { products } from '../../mocks/products';
import { Product } from '../../types/Product';
import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  Divider,
  AddToCartButton
} from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { getImageUrl } from '../../utils/getImageUrl';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';

export function Menu() {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setIsProductModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isProductModalVisible}
        onClose={() => setIsProductModalVisible(false)}
        product={selectedProduct}
      />
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={Divider}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: getImageUrl(product.imagePath)
              }}
            />
            <ProductDetails >
              <Text weight="600">{product.name}</Text>
              <Text style={{marginVertical: 8}} size={14} color="#666">{product.description}</Text>
              <Text size={14} weight="600">{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCartButton>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />
    </>
  );
}
