// # Contexto: modal simples para criar rascunhos de CT-e/MDF-e.
// # Responsabilidades: coletar dados mínimos e delegar criação ao hook.

import React, { useEffect, useMemo, useState } from 'react';
import { Button, Input, Modal, Select } from '../../../../components/ui/Common';
import { CreateDraftPayload, ElectronicDocType } from '../services/cteMdfeService';

type DocumentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: CreateDraftPayload) => void;
};

const defaultForm: CreateDraftPayload = {
  type: 'CT-e',
  issuer: 'LogiMaster Transporte',
  recipient: '',
  uf: 'SP',
  totalValue: 0,
};

const DocumentModal: React.FC<DocumentModalProps> = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState<CreateDraftPayload>(defaultForm);

  useEffect(() => {
    if (isOpen) setForm(defaultForm);
  }, [isOpen]);

  const typeOptions = useMemo(
    () => [
      { value: 'CT-e', label: 'CT-e' },
      { value: 'MDF-e', label: 'MDF-e' },
    ],
    [],
  );

  const ufOptions = useMemo(
    () => ['SP', 'RJ', 'MG', 'PR', 'SC', 'RS', 'BA', 'GO'].map((uf) => ({ value: uf, label: uf })),
    [],
  );

  const handleChange = (key: keyof CreateDraftPayload, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [key]: key === 'totalValue' ? Number(value) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.recipient.trim()) return;
    onSave(form);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo CT-e / MDF-e">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Select
          label="Tipo de documento"
          value={form.type}
          onChange={(e) => handleChange('type', e.target.value as ElectronicDocType)}
          options={typeOptions}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Emitente"
            value={form.issuer}
            onChange={(e) => handleChange('issuer', e.target.value)}
            placeholder="Nome da transportadora"
          />
          <Input
            label="Destinatário"
            value={form.recipient}
            onChange={(e) => handleChange('recipient', e.target.value)}
            placeholder="Cliente ou SEFAZ"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select label="UF" value={form.uf} onChange={(e) => handleChange('uf', e.target.value)} options={ufOptions} />
          <Input
            label="Valor total"
            type="number"
            min={0}
            step={100}
            value={form.totalValue}
            onChange={(e) => handleChange('totalValue', e.target.value)}
            placeholder="0,00"
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Criar rascunho</Button>
        </div>

        <p className="text-sm text-slate-500">
          O documento é criado como rascunho local. A transmissão e validação de regras fiscais serão implementadas em
          breve.
        </p>
      </form>
    </Modal>
  );
};

export default DocumentModal;
