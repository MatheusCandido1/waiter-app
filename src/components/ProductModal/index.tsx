import { FlatList, Modal } from 'react-native';

import { Text } from '../Text';

import {
  Image,
  CloseButton,
  ModalBody,
  Header,
  IngredientsContainer,
  Ingredient,
  Footer,
  FooterContainer,
  PriceContainer
} from './styles';

import { formatCurrency } from '../../utils/formatCurrency';
import { getImageUrl } from '../../utils/getImageUrl';

import { Product } from '../../types/Product';
import { Close } from '../Icons/Close';
import { Button } from '../Button';

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
          uri: getImageUrl(product.imagePath)
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
        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text color="#666" weight="600">Ingredientes</Text>
            <FlatList
              data={product.ingredients}
              keyExtractor={ingredient => ingredient._id}
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
        )}

      </ModalBody>
      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="600" color="#666">{formatCurrency(product.price)}</Text>
          </PriceContainer>
          <Button onPress={() => alert('')}>
            Adicionar ao pedido
          </Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
