// # Contexto: validações simples da frota.
// # Responsabilidades: validar campos obrigatórios nos formulários.

export const isRequired = (value: string) => value.trim().length > 0;
