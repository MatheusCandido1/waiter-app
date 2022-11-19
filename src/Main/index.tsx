import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { api } from '../services/axios';

import {
  Container,
  CategoriesContainer,
  MenuContainer,
  FooterContainer,
  Footer,
  CenteredContainer
} from './styles';

import { Header } from '../components/Header';
import { Categories } from '../components/Categories';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { Category } from '../types/Category';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading,setIsLoading] = useState(true);
  const [isLoadingProducts,setIsLoadingProducts] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleRemoveItemFromCart(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        carItem => carItem.product._id === product._id
      );

      const item = prevState[itemIndex];

      if (item.quantity === 1) {
        return prevState.filter(carItem => carItem.product._id !== product._id);
      } else {
        const updatedItems = [...prevState];
        updatedItems[itemIndex].quantity -= 1;

        return updatedItems;
      }
    });
  }

  function handleAddToCart(product: Product) {
    if(!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const productAlreadyInCart = prevState.find(item => item.product._id === product._id);

      if (productAlreadyInCart) {
        return prevState.map(item => item.product._id === product._id ? {
          ...item,
          quantity: item.quantity + 1
        } : item);
      }

      return [...prevState, {
        product,
        quantity: 1
      }];
    });
  }
  /*
  async function getProducts() {
    try {
      setIsLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
    } catch(e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function getCategories() {
    try {
      setIsLoading(true);
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch(e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  } */

  async function handleSelectCategory(categoryId: string) {
    try {
      const route = categoryId ? `/categories/${categoryId}/products` : '/products';
      setIsLoadingProducts(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const { data } = await api.get(route);
      setProducts(data);
    } catch(e) {
      console.log(e);
    } finally {
      setIsLoadingProducts(false);
    }
  }

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ]).then(([categoriesResponse, productResponse]) => {
      setCategories(categoriesResponse.data);
      setProducts(productResponse.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />
        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator
              color="#D73035"
              size="large"
            />
          </CenteredContainer>
        ) : (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>
            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator
                  color="#D73035"
                  size="large"
                />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu
                      products={products}
                      onAddToCart={handleAddToCart}
                    />
                  </MenuContainer>
                ): (
                  <CenteredContainer>
                    <Empty />
                    <Text
                      color="#666"
                      style={{marginTop: 24}}
                    >
                  Nenhum produto foi encontrado!
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button
              disabled={isLoading}
              onPress={() => setIsTableModalVisible(true)}
            >
            Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onRemove={handleRemoveItemFromCart}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          )}
        </FooterContainer>
      </Footer>
      <TableModal
        onClose={() => setIsTableModalVisible(false)}
        visible={isTableModalVisible}
        onSave={handleSaveTable}
      />
    </>
  );
}
