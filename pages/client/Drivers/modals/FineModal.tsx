// # Contexto: modal de registro de multa.
// # Responsabilidades: lançar infração com data, pontos, valor e status.

import React from 'react';
import { Button, Input, Modal, Select } from '../../../../components/ui/Common';

interface FineModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (e: React.FormEvent) => void;
}

const FineModal: React.FC<FineModalProps> = ({ isOpen, onClose, onSubmit }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Infração">
        <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <Input label="Data da Infração" type="date" required />
                <Input label="Pontos" type="number" placeholder="Ex: 5" required />
            </div>
            <Input label="Descrição" placeholder="Ex: Avançar sinal vermelho" required />
            <div className="grid grid-cols-2 gap-4">
                 <Input label="Valor (R$)" type="number" step="0.01" required />
                 <Select label="Status" options={[{value:'Pendente', label:'Pendente'}, {value:'Paga', label:'Paga'}]} />
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <Button variant="ghost" type="button" onClick={onClose}>Cancelar</Button>
                <Button type="submit">Salvar Registro</Button>
            </div>
        </form>
    </Modal>
);

export default FineModal;
