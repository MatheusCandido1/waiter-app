import { useState } from 'react';
import { FlatList } from 'react-native';

import { Text } from '../Text';

import { CategoryButton, Icon,  } from './styles';

import { Category } from '../../types';

interface CategoriesProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;

    onSelectCategory(category);
    setSelectedCategory(category);
  }

  return (
    <>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        contentContainerStyle={{ paddingRight: 24 }}
        keyExtractor={category => category._id}
        renderItem={({ item: category }) => {
          const isSelected = selectedCategory === category._id;
          return (
            <CategoryButton onPress={() => handleSelectCategory(category._id)}>
              <Icon>
                <Text opacity={isSelected ? 1: 0.5}>{category.icon}</Text>
              </Icon>
              <Text opacity={isSelected ? 1: 0.5} >{category.name}</Text>
            </CategoryButton>
          );
        }}
      />
    </>
  );
}
