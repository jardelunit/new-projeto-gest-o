// # Contexto: formatadores de despesas.
// # Responsabilidades: formatar valores monetários e exibir despesas com sinal negativo.

export const formatCurrency = (value: number): string =>
  `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

export const formatExpenseValue = (value: number): string => `- ${formatCurrency(value)}`;
