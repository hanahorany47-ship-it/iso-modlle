import { Scenario } from '../../types';
import { level1Scenarios } from './level1';
import { level2Scenarios } from './level2';

export const ALL_SCENARIOS: Scenario[] = [...level1Scenarios, ...level2Scenarios];

export function getScenarioById(id: string): Scenario {
  const found = ALL_SCENARIOS.find((s) => s.id === id);
  return found || ALL_SCENARIOS[0];
}

export function getScenariosByLevel(level: 1 | 2): Scenario[] {
  return ALL_SCENARIOS.filter((s) => s.level === level);
}
