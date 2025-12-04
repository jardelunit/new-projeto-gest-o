// # Contexto: serviço simulado para a visão geral.
// # Responsabilidades: expor KPIs e fretes mockados usados no dashboard.

import { Freight, KPI } from '../../../../types';
import { clientKPIs, mockFreights } from '../../../../mocks';

export const getClientKpis = (): KPI[] => clientKPIs;

export const getFreights = (): Freight[] => mockFreights;
