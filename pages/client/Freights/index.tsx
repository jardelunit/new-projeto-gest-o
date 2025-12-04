// # Contexto: módulo de fretes.
// # Responsabilidades: alternar entre lista e detalhe de frete e acionar modais de criação/despesa.

import React from 'react';
import useFreights from './hooks/useFreights';
import FreightDetail from './components/FreightDetail';
import FreightList from './components/FreightList';
import CreateFreightModal from './modals/CreateFreightModal';
import ExpenseModal from './modals/ExpenseModal';

const Freights: React.FC = () => {
  const {
    freights,
    selectedFreight,
    selectFreight,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    isExpenseModalOpen,
    openExpenseModal,
    closeExpenseModal,
    formData,
    setFormData,
    handleCreate,
    handleStatusUpdate,
    drivers,
    vehicles,
    getDriverName,
    getVehiclePlate,
    getDriverById,
    getVehicleById,
    getExpensesByFreight,
  } = useFreights();

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
    <>
      <FreightList
        freights={freights}
        onSelect={selectFreight}
        onAdd={openCreateModal}
        getDriverName={getDriverName}
        getVehiclePlate={getVehiclePlate}
      />

      <CreateFreightModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSubmit={handleCreate}
        formData={formData}
        setFormData={setFormData}
        drivers={drivers}
        vehicles={vehicles}
      />
    </>
  );
};

export default Freights;
