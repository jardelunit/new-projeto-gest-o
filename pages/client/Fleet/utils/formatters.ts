// # Contexto: helpers de formatação da frota.
// # Responsabilidades: exibir moeda, quilometragem e datas em formatos legíveis.

export const formatCurrency = (value: number, options?: Intl.NumberFormatOptions) =>
  `R$ ${value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  })}`;

export const formatKilometers = (value: number) => `${value.toLocaleString()} km`;

export const formatDate = (value: string | number | Date) => new Date(value).toLocaleDateString();
