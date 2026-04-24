"use client";

import { ReactNode } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded border border-border text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover"
      >
        Anterior
      </button>

      {/* Pages */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded text-sm ${
            page === currentPage
              ? "bg-neutral-900 text-white"
              : "border border-border hover:bg-surface-hover"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded border border-border text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-hover"
      >
        Siguiente
      </button>
    </div>
  );
}

interface PaginationInfoProps {
  currentPage: number;
  pageSize: number;
  total: number;
  onPageSizeChange?: (size: number) => void;
}

export function PaginationInfo({ currentPage, pageSize, total, onPageSizeChange }: PaginationInfoProps) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <p className="text-sm text-text-secondary">
        Mostrando {start}-{end} de {total} empleados
      </p>
      
      {onPageSizeChange && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-secondary">Por página:</label>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-3 py-1.5 rounded border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      )}
    </div>
  );
}