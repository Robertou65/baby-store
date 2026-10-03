// Hoisted Intl.NumberFormat instance to avoid costly instantiation on every render/format call (js-cache-function-results)
const copFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

export function formatCOP(amount: number): string {
  return copFormatter.format(amount);
}

export interface StageColorStyle {
  bg: string;
  text: string;
  border: string;
  pillBg: string;
}

// Module-level lookup record to avoid object recreation on every render (js-index-maps, js-cache-property-access)
const STAGE_COLORS: Record<string, StageColorStyle> = {
  T0: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-300',
    pillBg: 'bg-amber-500',
  },
  T1: {
    bg: 'bg-sky-100',
    text: 'text-sky-800',
    border: 'border-sky-300',
    pillBg: 'bg-sky-500',
  },
  T2: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    border: 'border-emerald-300',
    pillBg: 'bg-emerald-500',
  },
  T4: {
    bg: 'bg-rose-100',
    text: 'text-rose-800',
    border: 'border-rose-300',
    pillBg: 'bg-rose-500',
  },
  T5: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-300',
    pillBg: 'bg-purple-500',
  },
};

const DEFAULT_STAGE_COLOR: StageColorStyle = {
  bg: 'bg-blue-100',
  text: 'text-blue-800',
  border: 'border-blue-300',
  pillBg: 'bg-blue-500',
};

export function getStageColor(size: string): StageColorStyle {
  return STAGE_COLORS[size] ?? DEFAULT_STAGE_COLOR;
}

