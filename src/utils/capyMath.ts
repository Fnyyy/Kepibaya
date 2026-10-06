import { Capybara } from '../types';

/**
 * Returns descriptive verdict for chill score
 */
export function getChillVerdict(score: number): string {
  if (score >= 9.8) return 'Zen Total';
  if (score >= 9.0) return 'Super Damai';
  if (score >= 8.0) return 'Cukup Santai';
  return 'Perlu Rendaman';
}

/**
 * Formats distance in meters or kilometers
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `±${Math.round(meters)}m`;
  }
  return `±${(meters / 1000).toFixed(1)}km`;
}

/**
 * Estimates walking time at leisurely pace (~75m/min)
 */
export function estimateWalkingMinutes(meters: number): number {
  if (meters <= 0) return 1;
  return Math.max(1, Math.ceil(meters / 75));
}

/**
 * Increments snack count reliably
 */
export function incrementSnacks(current: number, amount = 1): number {
  return Math.max(0, current + amount);
}

/**
 * Calculates current snack milestone level and progress
 */
export function getSnackMilestone(count: number): { nextGoal: number; title: string; progress: number } {
  if (count < 150) {
    return { nextGoal: 150, title: 'Pesta Semangka Kecil', progress: Math.min(100, Math.round((count / 150) * 100)) };
  }
  if (count < 250) {
    return { nextGoal: 250, title: 'Prasmanan Kangkung Mewah', progress: Math.min(100, Math.round(((count - 150) / 100) * 100)) };
  }
  return { nextGoal: 500, title: 'Pesta Onsen Akbar Masbro', progress: Math.min(100, Math.round(((count - 250) / 250) * 100)) };
}

/**
 * Pure filter function for capybara list
 */
export function filterCapybaras(capybaras: Capybara[], query: string, statusFilter: string): Capybara[] {
  const cleanQuery = query.trim().toLowerCase();
  return capybaras.filter((item) => {
    const matchesQuery =
      !cleanQuery ||
      item.name.toLowerCase().includes(cleanQuery) ||
      item.sanctuaryName.toLowerCase().includes(cleanQuery) ||
      item.habitatZone.toLowerCase().includes(cleanQuery);

    const matchesStatus =
      statusFilter === 'all' || item.status === statusFilter;

    return matchesQuery && matchesStatus;
  });
}
