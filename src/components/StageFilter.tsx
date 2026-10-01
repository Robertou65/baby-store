import React from 'react';
import { Search, RotateCcw, Filter } from 'lucide-react';
import { STAGES, BRANDS } from '../data/products';

interface StageFilterProps {
  selectedStage: string;
  onSelectStage: (stage: string) => void;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalResults: number;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const StageFilter: React.FC<StageFilterProps> = ({
  selectedStage,
  onSelectStage,
  selectedBrand,
  onSelectBrand,
  searchQuery,
  onSearchChange,
  totalResults,
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-slate-200/90 shadow-xs mb-8 space-y-6">
      {/* Top Search & Results Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por marca, talla (ej. T1, T2), línea..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all outline-hidden"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 p-1"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 bg-slate-100 px-3.5 py-2 rounded-xl">
            <Filter className="w-4 h-4 text-slate-500" />
            <span>
              <strong className="text-slate-900 font-bold">{totalResults}</strong> pañales disponibles
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* Stage Selector Pills (The Playroom Blocks) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-['Fredoka'] text-base font-bold text-slate-800 flex items-center gap-2">
            <span>Selecciona la Talla del Bebé</span>
            <span className="text-xs font-normal text-slate-500 font-sans">(por etapa y peso)</span>
          </span>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 gap-2.5">
          {STAGES.map((stage) => {
            const isSelected = selectedStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => onSelectStage(stage.id)}
                className={`p-3 rounded-2xl text-left transition-all border-2 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-400/20 border-amber-500 text-slate-900 shadow-xs scale-102 font-bold ring-2 ring-amber-300'
                    : 'bg-[#FDFBF7] border-slate-200 hover:border-amber-300 hover:bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-['Fredoka'] text-base font-bold">
                    {stage.label}
                  </span>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  )}
                </div>
                <span className="text-[11px] text-slate-500 leading-tight block">
                  {stage.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Filters */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
          Filtrar por Marca:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {BRANDS.map((brand) => {
            const isSelected = selectedBrand === brand;
            return (
              <button
                key={brand}
                onClick={() => onSelectBrand(brand)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
