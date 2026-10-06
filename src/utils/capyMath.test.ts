import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getChillVerdict,
  formatDistance,
  estimateWalkingMinutes,
  incrementSnacks,
  getSnackMilestone,
  filterCapybaras,
} from './capyMath';
import { Capybara } from '../types';

test('getChillVerdict returns expected zen tiers', () => {
  assert.equal(getChillVerdict(9.9), 'Zen Total');
  assert.equal(getChillVerdict(9.5), 'Super Damai');
  assert.equal(getChillVerdict(8.5), 'Cukup Santai');
  assert.equal(getChillVerdict(7.0), 'Perlu Rendaman');
});

test('formatDistance formats meters and kilometers accurately', () => {
  assert.equal(formatDistance(120), '±120m');
  assert.equal(formatDistance(950), '±950m');
  assert.equal(formatDistance(1500), '±1.5km');
});

test('estimateWalkingMinutes returns reasonable times', () => {
  assert.equal(estimateWalkingMinutes(120), 2);
  assert.equal(estimateWalkingMinutes(750), 10);
  assert.equal(estimateWalkingMinutes(0), 1);
});

test('incrementSnacks adds correct amounts', () => {
  assert.equal(incrementSnacks(142), 143);
  assert.equal(incrementSnacks(142, 5), 147);
});

test('getSnackMilestone calculates progress toward tiers', () => {
  const milestone = getSnackMilestone(142);
  assert.equal(milestone.nextGoal, 150);
  assert.equal(milestone.title, 'Pesta Semangka Kecil');
  assert.ok(milestone.progress > 90);
});

test('filterCapybaras handles search and status filters correctly', () => {
  const mockCapybaras: Partial<Capybara>[] = [
    {
      id: 'roy',
      name: 'Masbro Roy',
      sanctuaryName: 'Taman Rekreasi Onsen Lembah Hijau',
      habitatZone: 'Zona Danau Bambu',
      status: 'Sedang Berendam',
    },
    {
      id: 'luna',
      name: 'Mpok Luna',
      sanctuaryName: 'Kolam Teratai Tirta',
      habitatZone: 'Padang Rumput',
      status: 'Sedang Nyemil',
    },
  ];

  const filtered = filterCapybaras(mockCapybaras as Capybara[], 'Roy', 'all');
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].id, 'roy');

  const statusFiltered = filterCapybaras(mockCapybaras as Capybara[], '', 'Sedang Nyemil');
  assert.equal(statusFiltered.length, 1);
  assert.equal(statusFiltered[0].id, 'luna');
});

test('snack milestone increments and bounds gracefully', () => {
  const milestone0 = getSnackMilestone(0);
  assert.equal(milestone0.nextGoal, 150);
  assert.equal(milestone0.progress, 0);

  const milestoneEnd = getSnackMilestone(600);
  assert.equal(milestoneEnd.nextGoal, 500);
  assert.equal(milestoneEnd.progress, 100);
});

