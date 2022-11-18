import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Container, OrderContent, OrderHeader, Table } from './styles';

interface HeaderProps {
  selectedTable: string;
  onCancelOrder: () => void;
}

export function Header({ selectedTable, onCancelOrder }: HeaderProps) {
  return (
    <Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9}>Bem vindo(a)</Text>
          <Text size={24} weight="700">
            WAITER
            <Text size={24}>APP</Text>
          </Text>
        </>
      )}
      {selectedTable && (
        <OrderContent>
          <OrderHeader>
            <Text size={24} weight="600">Pedido</Text>
            <TouchableOpacity onPress={onCancelOrder}>
              <Text size={14} weight="600" color="#D73035">Cancelar Pedido</Text>
            </TouchableOpacity>
          </OrderHeader>
          <Table>
            <Text color="#666">Mesa {selectedTable}</Text>
          </Table>
        </OrderContent>
      )}
    </Container>
  );
}
