import React from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';
import { getStageColor } from '../utils/format';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStage: (stage: string) => void;
}

const GUIDE_DATA = [
  {
    stage: 'T0',
    title: 'Recién Nacido (RN)',
    weight: 'Menos de 4.5 kg',
    age: '0 a 1 mes',
    diapersPerDay: '8 a 10 pañales / día',
    tip: 'Tienen corte especial para proteger el cordón umbilical y cubierta de algodón ultra suave.',
  },
  {
    stage: 'T1',
    title: 'Talla 1 (Etapa 1)',
    weight: '4 a 7 kg',
    age: '1 a 3 meses',
    diapersPerDay: '7 a 9 pañales / día',
    tip: 'Ideales cuando el bebé comienza a aumentar de peso rápidamente. Barreras laterales suaves.',
  },
  {
    stage: 'T2',
    title: 'Talla 2 (Etapa 2)',
    weight: '6 a 9.5 kg',
    age: '3 a 6 meses',
    diapersPerDay: '6 a 8 pañales / día',
    tip: 'Para bebés con mayor movilidad. Cinturas elastizadas que acompañan el movimiento.',
  },
  {
    stage: 'T4',
    title: 'Talla 4 (Grande / G)',
    weight: '9 a 13 kg',
    age: '9 a 18 meses',
    diapersPerDay: '5 a 6 pañales / día',
    tip: 'Etapa de gateo y primeros pasos. Doble núcleo de absorción para evitar escapes nocturnos.',
  },
  {
    stage: 'T5',
    title: 'Talla 5 (Extra Grande / XG)',
    weight: 'Más de 12 kg',
    age: '18+ meses',
    diapersPerDay: '4 a 5 pañales / día',
    tip: 'Para niños activos en transición al control de esfínteres. Máxima capacidad de retención.',
  },
];

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectStage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-[#FDFBF7] p-6 text-left shadow-2xl border-2 border-amber-300 transition-all">
          <div className="flex items-center justify-between pb-4 border-b border-amber-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-['Fredoka'] text-xl font-bold text-slate-900">
                  Guía de Tallas y Etapas
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Orientación por peso para elegir el pañal correcto
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-5 space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
            {GUIDE_DATA.map((item) => {
              const colors = getStageColor(item.stage);
              return (
                <div
                  key={item.stage}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:border-amber-400 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl text-base font-bold font-['Fredoka'] shrink-0 ${colors.bg} ${colors.text} border ${colors.border}`}
                    >
                      {item.stage}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-['Fredoka'] text-base font-bold text-slate-800">
                          {item.title}
                        </h4>
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                          {item.weight}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Edad aprox: <strong>{item.age}</strong> • Uso promedio: <strong>{item.diapersPerDay}</strong>
                      </p>
                      <p className="text-[11px] text-amber-800 bg-amber-50 rounded-lg px-2.5 py-1 mt-2 inline-block">
                        💡 {item.tip}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectStage(item.stage);
                      onClose();
                    }}
                    className="self-end sm:self-center shrink-0 px-4 py-2 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-amber-950 text-white font-['Fredoka'] text-xs font-bold transition-colors cursor-pointer"
                  >
                    Ver pañales {item.stage}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-amber-200/80 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Si tu bebé está entre dos tallas, te recomendamos elegir la más grande.</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
