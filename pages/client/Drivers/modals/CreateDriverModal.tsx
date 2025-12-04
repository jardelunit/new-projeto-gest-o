// # Contexto: modal de cadastro de motorista.
// # Responsabilidades: capturar dados pessoais e da CNH para novo motorista.

import React from 'react';
import { Button, Input, Modal, Select } from '../../../../components/ui/Common';
import { Driver } from '../../../../types';

interface CreateDriverModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    newDriver: Partial<Driver>;
    onChange: (field: keyof Driver, value: string) => void;
}

const CreateDriverModal: React.FC<CreateDriverModalProps> = ({ isOpen, onClose, onSubmit, newDriver, onChange }) => (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Cadastrar Novo Motorista"
    >
        <form onSubmit={onSubmit} className="space-y-4">
            <Input 
                label="Nome Completo" 
                placeholder="Ex: João da Silva" 
                required 
                value={newDriver.name}
                onChange={e => onChange('name', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
                <Input 
                    label="Telefone" 
                    placeholder="(00) 00000-0000" 
                    required 
                    value={newDriver.phone}
                    onChange={e => onChange('phone', e.target.value)}
                />
                <Select 
                    label="Categoria CNH" 
                    options={[{value:'C',label:'C'},{value:'D',label:'D'},{value:'E',label:'E'}]} 
                    value={newDriver.cnhCategory}
                    onChange={e => onChange('cnhCategory', e.target.value)}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input 
                    label="Número CNH" 
                    placeholder="00000000000" 
                    required 
                    value={newDriver.cnh}
                    onChange={e => onChange('cnh', e.target.value)}
                />
                <Input 
                    label="Validade CNH" 
                    type="date" 
                    required 
                    value={newDriver.cnhExpiry}
                    onChange={e => onChange('cnhExpiry', e.target.value)}
                />
            </div>
            <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                <Button type="submit">Salvar Motorista</Button>
            </div>
        </form>
    </Modal>
);

export default CreateDriverModal;
