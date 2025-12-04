// # Contexto: modal de criação de despesa.
// # Responsabilidades: coletar descrição, categoria, data e valor com validação básica.

import React from 'react';
import { Button, Input, Modal, Select } from '../../../../components/ui/Common';
import { Expense } from '../../../../types';

type CategoryOption = { value: string; label: string };

type CreateExpenseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryOption[];
  newExpense: Partial<Expense>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeField: (field: keyof Expense, value: string | number) => void;
};

const CreateExpenseModal: React.FC<CreateExpenseModalProps> = ({
  isOpen,
  onClose,
  categories,
  newExpense,
  onSubmit,
  onChangeField
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Nova Despesa">
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        label="Descrição"
        placeholder="Ex: Pagamento de IPVA"
        required
        value={newExpense.description}
        onChange={e => onChangeField('description', e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Categoria"
          options={categories}
          value={newExpense.category}
          onChange={e => onChangeField('category', e.target.value)}
        />
        <Input
          label="Data"
          type="date"
          required
          value={newExpense.date}
          onChange={e => onChangeField('date', e.target.value)}
        />
      </div>

      <Input
        label="Valor (R$)"
        type="number"
        step="0.01"
        required
        value={newExpense.amount}
        onChange={e => onChangeField('amount', parseFloat(e.target.value))}
      />

      <div className="pt-4 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" variant="danger">
          Confirmar Despesa
        </Button>
      </div>
    </form>
  </Modal>
);

export default CreateExpenseModal;
