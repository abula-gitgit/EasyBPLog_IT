/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserSettings } from '../types';

export const DEFAULT_SETTINGS: UserSettings = {
  targetSystolic: 130,
  targetDiastolic: 80,
  hospitalName: '',
  patientName: '',
  weightUnit: 'kg',
};

export const AHA_TARGET_SYSTOLIC = 130;
export const AHA_TARGET_DIASTOLIC = 80;

export const LIFESTYLE_TAGS = [
  { id: 'meds_taken', label: '💊 Farmaco assunto', category: 'medication' },
  { id: 'alcohol', label: '🍷 Alcol', category: 'lifestyle' },
  { id: 'travel', label: '✈️ Viaggio / Fuori casa', category: 'lifestyle' },
  { id: 'stress_sleep', label: '😰 Stress / Poco sonno', category: 'condition' },
  { id: 'unwell', label: '🤒 Malessere', category: 'condition' },
  { id: 'meds_changed', label: '🆕 Cambio terapia', category: 'medication' },
] as const;

export const EMPTY_MEASUREMENT = {
  systolic: null,
  diastolic: null,
  pulse: null,
};
