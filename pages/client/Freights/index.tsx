// # Contexto: módulo de fretes com opção de carregar CT-e/MDF-e via rota filha.
// # Responsabilidades: manter fluxo de operação de fretes e renderizar CT-e/MDF-e quando a rota pedir, sem tabs na UI.

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import useFreights from './hooks/useFreights';
import FreightDetail from './components/FreightDetail';
import FreightList from './components/FreightList';
import ExpenseModal from './modals/ExpenseModal';
import NewFreightWizard from './components/NewFreightWizard';
import CTeMDFe from '../CTe_MDFe';

type FreightsTab = 'operation' | 'cte-mdfe';

const Freights: React.FC = () => {
  const [searchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as FreightsTab) || 'operation';

  const {
    freights,
    selectedFreight,
    selectFreight,
    isWizardOpen,
    openWizard,
    closeWizard,
    isExpenseModalOpen,
    openExpenseModal,
    closeExpenseModal,
    addFreight,
    handleStatusUpdate,
    drivers,
    vehicles,
    getDriverName,
    getVehiclePlate,
    getDriverById,
    getVehicleById,
    getExpensesByFreight,
  } = useFreights();

  if (activeTab === 'cte-mdfe') {
    return <CTeMDFe />;
  }

  if (isWizardOpen) {
    return (
      <NewFreightWizard
        isOpen={isWizardOpen}
        onClose={closeWizard}
        onCreate={addFreight}
        drivers={drivers}
        vehicles={vehicles}
      />
    );
  }

  if (selectedFreight) {
    return (
      <>
        <FreightDetail
          freight={selectedFreight}
          driver={getDriverById(selectedFreight.driverId)}
          vehicle={getVehicleById(selectedFreight.vehicleId)}
          expenses={getExpensesByFreight(selectedFreight.id)}
          onBack={() => selectFreight(null)}
          onUpdateStatus={handleStatusUpdate}
          onAddExpense={openExpenseModal}
        />

        <ExpenseModal isOpen={isExpenseModalOpen} onClose={closeExpenseModal} />
      </>
    );
  }

  return (
    <FreightList
      freights={freights}
      onSelect={selectFreight}
      onAdd={openWizard}
      getDriverName={getDriverName}
      getVehiclePlate={getVehiclePlate}
    />
  );
};

export default Freights;
