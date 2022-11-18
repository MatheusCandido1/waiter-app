import { FlatList, Modal } from 'react-native';

import { Text } from '../Text';

import { Image, CloseButton, ModalBody, Header, IngredientsContainer, Ingredient } from './styles';
import { Product } from '../../types/Product';
import { Close } from '../Icons/Close';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
}

export function ProductModal({ visible, onClose, product }: ProductModalProps) {
  if (!product) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://10.82.209.214:3001/uploads/${product.imagePath}`
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>
      <ModalBody>
        <Header>
          <Text size={24} weight="600">{product.name}</Text>
          <Text style={{marginTop: 8}} color="#666">{product.description}</Text>
        </Header>
        <IngredientsContainer>
          <Text color="#666" weight="600">Ingredients</Text>
          <FlatList
            data={product.ingredients}
            keyExtractor={ingredient => ingredient.id}
            showsVerticalScrollIndicator={false}
            style={{marginTop: 16}}
            renderItem={({ item: ingredient }) => (
              <Ingredient>
                <Text>{ingredient.icon}</Text>
                <Text style={{marginLeft: 20}} size={14} color="#666">{ingredient.name}</Text>
              </Ingredient>
            )}
          />
        </IngredientsContainer>
      </ModalBody>
      <Text>Product Modal</Text>
    </Modal>
  );
}
