// # Contexto: validação de intervalo de datas para relatórios.
// # Responsabilidades: verificar se uma data está entre início e fim.

export const isDateWithinRange = (dateStr: string, start: Date, end: Date): boolean => {
  const date = new Date(dateStr);
  return date >= start && date <= end;
};
