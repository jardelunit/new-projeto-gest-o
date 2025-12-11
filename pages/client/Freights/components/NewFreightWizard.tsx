import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Input, Select } from '../../../../components/ui/Common';
import { Driver, Freight, Vehicle } from '../../../../types';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileInput,
  FileText,
  Gauge,
  Info,
  MapPin,
  RefreshCw,
  Truck,
} from 'lucide-react';

interface NewFreightWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: Partial<Freight>) => void;
  drivers: Driver[];
  vehicles: Vehicle[];
}

type WizardStep = 0 | 1 | 2 | 3;

interface WizardFormState {
  nfeKey: string;
  cteType: Freight['cteType'];
  serviceTaker: string;
  origin: string;
  destination: string;
  cargoWeight: string;
  cargoValue: string;
  driverId?: string;
  vehicleId?: string;
  routeUFs: string[];
  pickupDate: string;
  deliveryDate: string;
  freightTotal: string;
  adValorem: string;
  gris: string;
  pedagio: string;
  regimeTributario: string;
  baseCalculo: string;
  aliquota: string;
  generateMdf: boolean;
}

const ufList = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

const initialFormState: WizardFormState = {
  nfeKey: '',
  cteType: 'Normal',
  serviceTaker: 'Remetente',
  origin: '',
  destination: '',
  cargoWeight: '',
  cargoValue: '',
  driverId: '',
  vehicleId: '',
  routeUFs: [],
  pickupDate: '',
  deliveryDate: '',
  freightTotal: '',
  adValorem: '',
  gris: '',
  pedagio: '',
  regimeTributario: 'Simples Nacional',
  baseCalculo: '',
  aliquota: '12',
  generateMdf: true,
};

const NewFreightWizard: React.FC<NewFreightWizardProps> = ({ isOpen, onClose, onCreate, drivers, vehicles }) => {
  const [step, setStep] = useState<WizardStep>(0);
  const [form, setForm] = useState<WizardFormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isImporting, setIsImporting] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionStatus, setTransmissionStatus] = useState<Freight['cteStatus'] | null>(null);
  const [importedPreview, setImportedPreview] = useState<{ sender: string; recipient: string; weight: string; value: string } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setForm(initialFormState);
      setStep(0);
      setErrors({});
      setIsImporting(false);
      setIsTransmitting(false);
      setTransmissionStatus(null);
      setImportedPreview(null);
    }
  }, [isOpen]);

  const steps = useMemo(
    () => [
      { title: 'Carga & NF-e', subtitle: 'Origem fiscal e dados da mercadoria' },
      { title: 'Rota e Recursos', subtitle: 'Veículo, motorista e UFs do percurso' },
      { title: 'Valores e Impostos', subtitle: 'Componentes do frete e ICMS' },
      { title: 'Revisão e Emissão', subtitle: 'Transmitir CT-e/MDF-e' },
    ],
    [],
  );
  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step, steps.length]);

  const toggleUF = (uf: string) => {
    setForm(prev => ({
      ...prev,
      routeUFs: prev.routeUFs.includes(uf) ? prev.routeUFs.filter(item => item !== uf) : [...prev.routeUFs, uf],
    }));
  };

  const handleImportNfe = () => {
    if (form.nfeKey.length !== 44) {
      setErrors(prev => ({ ...prev, nfeKey: 'Informe a chave de acesso completa (44 dígitos).' }));
      return;
    }

    setIsImporting(true);
    setErrors(prev => ({ ...prev, nfeKey: '' }));

    setTimeout(() => {
      setForm(prev => ({
        ...prev,
        origin: prev.origin || 'Origem NF-e (São Paulo, SP)',
        destination: prev.destination || 'Destino NF-e (Curitiba, PR)',
        cargoWeight: prev.cargoWeight || '12000',
        cargoValue: prev.cargoValue || '180000',
        freightTotal: prev.freightTotal || '3500',
      }));
      setImportedPreview({ sender: 'Industria Alfa LTDA', recipient: 'Comercial Beta SA', weight: '12.000 kg', value: 'R$ 180.000,00' });
      setIsImporting(false);
    }, 1200);
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (form.nfeKey.length !== 44) newErrors.nfeKey = 'Chave NF-e deve ter 44 dígitos.';
    }
    if (step === 1) {
      if (!form.driverId) newErrors.driverId = 'Selecione o motorista';
      if (!form.vehicleId) newErrors.vehicleId = 'Selecione o veículo';
    }
    if (step === 2) {
      if (!form.freightTotal) newErrors.freightTotal = 'Informe o valor total da prestação';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep(prev => Math.min((prev + 1) as WizardStep, 3));
  };

  const handlePrev = () => setStep(prev => Math.max((prev - 1) as WizardStep, 0));

  const emitPayload = (status: Freight['cteStatus']) => {
    const payload: Partial<Freight> = {
      origin: form.origin || importedPreview?.sender || '',
      destination: form.destination || importedPreview?.recipient || '',
      value: Number(form.freightTotal) || 0,
      date: form.pickupDate ? form.pickupDate.split('T')[0] : new Date().toISOString().split('T')[0],
      driverId: form.driverId,
      vehicleId: form.vehicleId,
      cteStatus: status,
      nfeKey: form.nfeKey,
      cteType: form.cteType,
      serviceTaker: form.serviceTaker,
      routeUFs: form.routeUFs,
      pickupDate: form.pickupDate,
      deliveryDate: form.deliveryDate,
      mdfStatus: form.generateMdf && status === 'Autorizado' ? 'Aberto' : 'N/A',
      freightComponents: {
        total: Number(form.freightTotal) || 0,
        adValorem: form.adValorem ? Number(form.adValorem) : undefined,
        gris: form.gris ? Number(form.gris) : undefined,
        pedagio: form.pedagio ? Number(form.pedagio) : undefined,
        regimeTributario: form.regimeTributario || undefined,
        baseCalculo: form.baseCalculo ? Number(form.baseCalculo) : undefined,
        aliquota: form.aliquota ? Number(form.aliquota) : undefined,
      },
    };

    onCreate(payload);
  };

  const handleTransmit = () => {
    if (isTransmitting) return;
    if (!validateStep()) {
      setStep(2);
      return;
    }

    setIsTransmitting(true);
    setTransmissionStatus(null);

    setTimeout(() => {
      const status: Freight['cteStatus'] = Math.random() > 0.2 ? 'Autorizado' : 'Rejeitado';
      setTransmissionStatus(status);
      emitPayload(status);
      setIsTransmitting(false);
    }, 1400);
  };

  const renderNFImport = () => (
    <div className="space-y-4">
      <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-900/50 border border-slate-800 rounded-lg p-3">
        <Info size={14} className="text-blue-300 mt-0.5" />
        <p>Use a chave da NF-e para preencher remetente, destinatário e dados de carga automaticamente. Você pode ajustar depois.</p>
      </div>

      <div className="flex gap-3 items-end">
        <Input
          label="Chave de Acesso NF-e"
          placeholder="44 dígitos"
          value={form.nfeKey}
          error={errors.nfeKey}
          onChange={e => setForm(prev => ({ ...prev, nfeKey: e.target.value }))}
        />
        <Button className="shrink-0" variant="secondary" onClick={handleImportNfe} isLoading={isImporting}>
          <FileInput size={16} className="mr-2" /> Importar Dados
        </Button>
      </div>

      {importedPreview && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[{ label: 'Remetente', value: importedPreview.sender }, { label: 'Destinatário', value: importedPreview.recipient }, { label: 'Peso', value: importedPreview.weight }, { label: 'Valor da Carga', value: importedPreview.value }].map(item => (
            <div key={item.label} className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
              <p className="text-xs text-slate-500 uppercase">{item.label}</p>
              <p className="text-sm text-white font-semibold mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Origem"
          placeholder="Cidade, UF"
          value={form.origin}
          onChange={e => setForm(prev => ({ ...prev, origin: e.target.value }))}
        />
        <Input
          label="Destino"
          placeholder="Cidade, UF"
          value={form.destination}
          onChange={e => setForm(prev => ({ ...prev, destination: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Tipo de CT-e"
          value={form.cteType}
          options={[
            { value: 'Normal', label: 'Normal' },
            { value: 'Substituição', label: 'Substituição' },
            { value: 'Anulação', label: 'Anulação' },
          ]}
          onChange={e => setForm(prev => ({ ...prev, cteType: e.target.value as Freight['cteType'] }))}
        />
        <Select
          label="Tomador do Serviço"
          value={form.serviceTaker}
          options={[
            { value: 'Remetente', label: 'Remetente' },
            { value: 'Destinatário', label: 'Destinatário' },
            { value: 'Expedidor', label: 'Expedidor' },
            { value: 'Recebedor', label: 'Recebedor' },
          ]}
          onChange={e => setForm(prev => ({ ...prev, serviceTaker: e.target.value }))}
        />
      </div>
    </div>
  );

  const renderRouteStep = () => (
    <div className="space-y-4">
      <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-900/50 border border-slate-800 rounded-lg p-3">
        <Truck size={14} className="text-emerald-300 mt-0.5" />
        <p>Selecione motorista e veículo e marque as UFs que o caminhão vai cruzar. Essas UFs vão para o MDF-e automaticamente.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Motorista"
          value={form.driverId}
          error={errors.driverId}
          options={drivers.map(driver => ({ value: driver.id, label: driver.name }))}
          onChange={e => setForm(prev => ({ ...prev, driverId: e.target.value }))}
        />
        <Select
          label="Veículo"
          value={form.vehicleId}
          error={errors.vehicleId}
          options={vehicles.map(vehicle => ({ value: vehicle.id, label: `${vehicle.plate} • ${vehicle.model}` }))}
          onChange={e => setForm(prev => ({ ...prev, vehicleId: e.target.value }))}
        />
      </div>

      <Card className="bg-slate-900/60 border-slate-800">
        <p className="text-sm text-slate-300 font-semibold mb-2 flex items-center">
          <MapPin size={16} className="mr-2 text-blue-400" /> UFs de Percurso (MDF-e)
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {ufList.map(uf => (
            <label key={uf} className="flex items-center gap-2 text-sm text-slate-200 bg-slate-800/60 border border-slate-700 rounded-md px-3 py-2 cursor-pointer hover:border-blue-500/60">
              <input
                type="checkbox"
                className="accent-blue-500"
                checked={form.routeUFs.includes(uf)}
                onChange={() => toggleUF(uf)}
              />
              {uf}
            </label>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Data/Hora de Coleta"
          type="datetime-local"
          value={form.pickupDate}
          onChange={e => setForm(prev => ({ ...prev, pickupDate: e.target.value }))}
        />
        <Input
          label="Data/Hora de Entrega"
          type="datetime-local"
          value={form.deliveryDate}
          onChange={e => setForm(prev => ({ ...prev, deliveryDate: e.target.value }))}
        />
      </div>
    </div>
  );

  const renderValuesStep = () => (
    <div className="space-y-4">
      <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-900/50 border border-slate-800 rounded-lg p-3">
        <BadgeCheck size={14} className="text-amber-300 mt-0.5" />
        <p>Informe o valor bruto e, se necessário, Ad Valorem, GRIS e Pedágio. Base e alíquota alimentam o cálculo de ICMS enviado à API.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Valor Total da Prestação (R$)"
          type="number"
          value={form.freightTotal}
          error={errors.freightTotal}
          onChange={e => setForm(prev => ({ ...prev, freightTotal: e.target.value }))}
        />
        <Input
          label="Ad Valorem (R$)"
          type="number"
          value={form.adValorem}
          onChange={e => setForm(prev => ({ ...prev, adValorem: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="GRIS (R$)"
          type="number"
          value={form.gris}
          onChange={e => setForm(prev => ({ ...prev, gris: e.target.value }))}
        />
        <Input
          label="Pedágio (R$)"
          type="number"
          value={form.pedagio}
          onChange={e => setForm(prev => ({ ...prev, pedagio: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Regime Tributário"
          value={form.regimeTributario}
          onChange={e => setForm(prev => ({ ...prev, regimeTributario: e.target.value }))}
        />
        <Input
          label="Base de Cálculo"
          type="number"
          value={form.baseCalculo}
          onChange={e => setForm(prev => ({ ...prev, baseCalculo: e.target.value }))}
        />
        <Input
          label="Alíquota ICMS (%)"
          type="number"
          value={form.aliquota}
          onChange={e => setForm(prev => ({ ...prev, aliquota: e.target.value }))}
        />
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-4">
      <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-900/50 border border-slate-800 rounded-lg p-3">
        <FileText size={14} className="text-blue-300 mt-0.5" />
        <p>Revise os dados antes de transmitir. A simulação retorna Autorizado ou Rejeitado em ~1-2s e já registra o frete na lista.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-slate-900/60 border-slate-800">
          <p className="text-sm text-slate-300 flex items-center gap-2 mb-2">
            <FileText size={16} className="text-blue-400" /> NF-e & CT-e
          </p>
          <div className="space-y-2 text-slate-200 text-sm">
            <p><span className="text-slate-500">NF-e:</span> {form.nfeKey || '—'}</p>
            <p><span className="text-slate-500">Tipo CT-e:</span> {form.cteType}</p>
            <p><span className="text-slate-500">Tomador:</span> {form.serviceTaker}</p>
          </div>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800">
          <p className="text-sm text-slate-300 flex items-center gap-2 mb-2">
            <Truck size={16} className="text-emerald-400" /> Rota e Recursos
          </p>
          <div className="space-y-2 text-slate-200 text-sm">
            <p><span className="text-slate-500">Motorista:</span> {drivers.find(d => d.id === form.driverId)?.name || '—'}</p>
            <p><span className="text-slate-500">Veículo:</span> {vehicles.find(v => v.id === form.vehicleId)?.plate || '—'}</p>
            <p><span className="text-slate-500">Percurso:</span> {form.routeUFs.length ? form.routeUFs.join(' • ') : '—'}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-slate-900/60 border-slate-800">
          <p className="text-sm text-slate-300 flex items-center gap-2 mb-2">
            <Clock size={16} className="text-amber-300" /> Datas
          </p>
          <div className="space-y-2 text-slate-200 text-sm">
            <p><span className="text-slate-500">Coleta:</span> {form.pickupDate || '—'}</p>
            <p><span className="text-slate-500">Entrega:</span> {form.deliveryDate || '—'}</p>
          </div>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800">
          <p className="text-sm text-slate-300 flex items-center gap-2 mb-2">
            <BadgeCheck size={16} className="text-emerald-400" /> Valores & ICMS
          </p>
          <div className="space-y-2 text-slate-200 text-sm">
            <p><span className="text-slate-500">Prestação:</span> R$ {form.freightTotal || '0,00'}</p>
            <p><span className="text-slate-500">Base:</span> {form.baseCalculo || '—'} | <span className="text-slate-500">Alíquota:</span> {form.aliquota || '—'}%</p>
            <p><span className="text-slate-500">Regime:</span> {form.regimeTributario || '—'}</p>
          </div>
        </Card>
      </div>

      <label className="flex items-center gap-3 text-sm text-slate-200 bg-slate-900/70 border border-slate-800 rounded-lg px-4 py-3 cursor-pointer">
        <input
          type="checkbox"
          className="accent-blue-500"
          checked={form.generateMdf}
          onChange={e => setForm(prev => ({ ...prev, generateMdf: e.target.checked }))}
        />
        Gerar MDF-e imediatamente com este CT-e?
      </label>

      {transmissionStatus && (
        <div
          className={`p-4 rounded-lg border ${transmissionStatus === 'Autorizado' ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200' : 'border-red-500/50 bg-red-500/10 text-red-200'}`}
        >
          <div className="flex items-center gap-2">
            {transmissionStatus === 'Autorizado' ? <CheckCircle2 size={18} /> : <RefreshCw size={18} className="animate-spin" />}
            <p className="font-semibold">CT-e {transmissionStatus}</p>
          </div>
          <p className="text-sm text-slate-200/80 mt-1">Retorno simulado da SEFAZ com status fiscal.</p>
        </div>
      )}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return renderNFImport();
      case 1:
        return renderRouteStep();
      case 2:
        return renderValuesStep();
      case 3:
      default:
        return renderReviewStep();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={onClose} className="px-3">
            <ArrowLeft size={16} />
          </Button>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Novo Documento Fiscal</p>
            <h1 className="text-2xl font-bold text-white">CT-e / MDF-e</h1>
            <p className="text-sm text-slate-400">Fluxo em 4 passos para emissão rápida.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Gauge size={14} className="text-emerald-300" />
          <span>{progress}% concluído</span>
        </div>
      </div>

      <Card className="bg-slate-900/70 border-slate-800">
        <div className="flex items-start gap-3 overflow-x-auto pb-1">
          {steps.map((item, index) => {
            const isActive = index === step;
            const isDone = index < step;
            return (
              <div key={item.title} className="flex items-center gap-3">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                    isActive
                      ? 'border-blue-500/70 bg-blue-500/10 text-blue-200'
                      : isDone
                        ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200'
                        : 'border-slate-700 bg-slate-900 text-slate-400'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center text-sm font-bold">
                    {isDone ? <CheckCircle2 size={16} /> : index + 1}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide">{item.title}</p>
                    <p className="text-[11px] text-slate-400">{item.subtitle}</p>
                  </div>
                </div>
                {index < steps.length - 1 && <ChevronRight className="text-slate-600" size={18} />}
              </div>
            );
          })}
        </div>
        <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-slate-500">
          <span>Passo {step + 1} de {steps.length}</span>
          <span>{progress}%</span>
        </div>
      </Card>

      {renderStepContent()}

      <div className="flex justify-between items-center pt-2 pb-6">
        {step > 0 ? (
          <Button variant="ghost" onClick={handlePrev}>
            Voltar
          </Button>
        ) : (
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        )}

        {step < 3 ? (
          <Button onClick={handleNext}>
            Próximo Passo <ArrowRight size={16} className="ml-2" />
          </Button>
        ) : (
          <div className="flex gap-3 items-center">
            <Button variant="secondary" onClick={() => setStep(0)}>
              Reiniciar
            </Button>
            <Button onClick={handleTransmit} isLoading={isTransmitting}>
              Emitir CT-e e Transmitir
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewFreightWizard;
