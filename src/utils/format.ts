export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getStageColor(size: string): {
  bg: string;
  text: string;
  border: string;
  pillBg: string;
} {
  switch (size) {
    case 'T0':
      return {
        bg: 'bg-amber-100',
        text: 'text-amber-800',
        border: 'border-amber-300',
        pillBg: 'bg-amber-500',
      };
    case 'T1':
      return {
        bg: 'bg-sky-100',
        text: 'text-sky-800',
        border: 'border-sky-300',
        pillBg: 'bg-sky-500',
      };
    case 'T2':
      return {
        bg: 'bg-emerald-100',
        text: 'text-emerald-800',
        border: 'border-emerald-300',
        pillBg: 'bg-emerald-500',
      };
    case 'T4':
      return {
        bg: 'bg-rose-100',
        text: 'text-rose-800',
        border: 'border-rose-300',
        pillBg: 'bg-rose-500',
      };
    case 'T5':
      return {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        border: 'border-purple-300',
        pillBg: 'bg-purple-500',
      };
    default:
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-300',
        pillBg: 'bg-blue-500',
      };
  }
}
