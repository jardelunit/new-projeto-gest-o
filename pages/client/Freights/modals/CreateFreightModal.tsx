// # Contexto: modal para criação de frete.
// # Responsabilidades: coletar origem/destino, motorista, veículo, data e valor do frete.

import React from 'react';
import { Button, Input, Modal, Select } from '../../../../components/ui/Common';
import { Driver, Freight, Vehicle } from '../../../../types';

interface CreateFreightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formData: Partial<Freight>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Freight>>>;
  drivers: Driver[];
  vehicles: Vehicle[];
}

const CreateFreightModal: React.FC<CreateFreightModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  drivers,
  vehicles,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Novo Frete">
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Origem"
          placeholder="Cidade, UF"
          required
          value={formData.origin}
          onChange={e => setFormData(prev => ({ ...prev, origin: e.target.value }))}
        />
        <Input
          label="Destino"
          placeholder="Cidade, UF"
          required
          value={formData.destination}
          onChange={e => setFormData(prev => ({ ...prev, destination: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Motorista"
          options={drivers.map(driver => ({ value: driver.id, label: driver.name }))}
          value={formData.driverId}
          onChange={e => setFormData(prev => ({ ...prev, driverId: e.target.value }))}
        />
        <Select
          label="Veículo"
          options={vehicles.map(vehicle => ({ value: vehicle.id, label: vehicle.plate }))}
          value={formData.vehicleId}
          onChange={e => setFormData(prev => ({ ...prev, vehicleId: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Data de Saída"
          type="date"
          required
          value={formData.date}
          onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
        />
        <Input
          label="Valor do Frete (R$)"
          type="number"
          step="0.01"
          required
          value={formData.value}
          onChange={e => setFormData(prev => ({ ...prev, value: parseFloat(e.target.value) }))}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Criar Frete</Button>
      </div>
    </form>
  </Modal>
);

export default CreateFreightModal;
