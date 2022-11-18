import { useState } from 'react';
import { Modal, TouchableOpacity, Platform } from 'react-native';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Button } from '../Button';
import {
  Overlay,
  ModalBody,
  Header,
  Form,
  Input
} from './styles';

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleSave() {
    onSave(table);
    onClose();
    setTable('');
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <Overlay behavior={Platform.OS === 'android' ? 'height': 'padding'}>
        <ModalBody>
          <Header>
            <Text weight='600'>Informe a mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={setTable}
            />
            <Button
              disabled={!table}
              onPress={handleSave}
            >
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
