// # Contexto: formatador usado nos relatórios.
// # Responsabilidades: exibir valores monetários com prefixo.

export const formatCurrency = (value: number): string => `R$ ${value.toLocaleString()}`;
