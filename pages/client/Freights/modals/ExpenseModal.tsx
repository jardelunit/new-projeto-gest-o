// # Contexto: modal de despesa vinculada ao frete.
// # Responsabilidades: registrar rapidamente valor, descrição e categoria da despesa.

import React from 'react';
import { Button, Input, Modal, Select } from '../../../../components/ui/Common';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ isOpen, onClose }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Despesa">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input label="Descrição" placeholder="Ex: Combustível Posto X" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Valor (R$)" type="number" />
          <Select
            label="Categoria"
            options={[
              { value: 'Combustível', label: 'Combustível' },
              { value: 'Pedágio', label: 'Pedágio' },
              { value: 'Alimentação', label: 'Alimentação' },
            ]}
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ExpenseModal;
