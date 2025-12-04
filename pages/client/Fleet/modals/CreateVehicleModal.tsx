// # Contexto: modal de cadastro rápido de veículo.
// # Responsabilidades: coletar dados básicos (placa, modelo, ano, km) e salvar.

import React from 'react';
import { Button, Input, Modal } from '../../../../components/ui/Common';

type CreateVehicleModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateVehicleModal: React.FC<CreateVehicleModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cadastrar Veículo">
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Placa" placeholder="ABC-1234" />
          <Input label="Modelo" placeholder="Ex: Volvo FH 540" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Ano" type="number" />
          <Input label="KM Atual" type="number" />
        </div>
        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Salvar Veículo</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateVehicleModal;
