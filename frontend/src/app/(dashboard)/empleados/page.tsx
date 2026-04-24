"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "@/components/ui/Table";
import { SearchBar } from "@/components/ui/SearchBar";
import { Pagination } from "@/components/ui/Pagination";
import { Avatar } from "@/components/ui/Avatar";

const DEFAULT_PAGE_SIZE = 10;

interface Empleado {
  id: string;
  nombre: string;
  cargo: string;
  departamento: string;
  email: string;
  telefono: string;
  fecha_ingreso: string;
  usuario_id: string;
  created_at: string;
  updated_at: string;
  imagen_base64?: string;
  imagen_url?: string;
}

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

interface SortHeaderProps {
  column: string;
  label: string;
  sortKey: keyof Empleado;
  currentSort: { key: keyof Empleado; direction: "asc" | "desc" };
  onSort: (key: keyof Empleado) => void;
}

function SortHeader({ label, sortKey, currentSort, onSort }: SortHeaderProps) {
  const isActive = currentSort.key === sortKey;

  return (
    <TableHeader>
      <button
        onClick={() => onSort(sortKey)}
        className="flex items-center gap-1 hover:text-neutral-900 transition-colors"
      >
        <span>{label}</span>
        <svg
          className={`w-3 h-3 ${isActive ? "opacity-100" : "opacity-30"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isActive && currentSort.direction === "desc" ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          )}
        </svg>
      </button>
    </TableHeader>
  );
}

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-text-secondary mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [allEmpleados, setAllEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [query, setQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; empleado: Empleado | null }>({
    open: false,
    empleado: null,
  });

  const [sortConfig, setSortConfig] = useState<{ key: keyof Empleado; direction: "asc" | "desc" }>({
    key: "nombre",
    direction: "asc",
  });

  const loadEmpleados = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data } = await supabase
        .from("empleados")
        .select("*")
        .eq("usuario_id", user.id)
        .order("created_at", { ascending: false });

      setAllEmpleados(data || []);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmpleados();
  }, [loadEmpleados]);

  const handleRetirar = useCallback(async () => {
    if (!deleteModal.empleado) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("empleados")
      .delete()
      .eq("id", deleteModal.empleado.id);

    if (!error) {
      const newEmpleados = allEmpleados.filter(e => e.id !== deleteModal.empleado!.id);
      setAllEmpleados(newEmpleados);
      
      const newTotalPages = Math.max(1, Math.ceil(newEmpleados.length / pageSize));
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    }
    setDeleteModal({ open: false, empleado: null });
  }, [deleteModal.empleado, allEmpleados, pageSize, currentPage]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setCurrentPage(1);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const filteredEmpleados = useMemo(() => {
    let result = query.trim()
      ? allEmpleados.filter(emp =>
          emp.nombre.toLowerCase().includes(query.toLowerCase()) ||
          emp.cargo.toLowerCase().includes(query.toLowerCase()) ||
          (emp.departamento && emp.departamento.toLowerCase().includes(query.toLowerCase())) ||
          (emp.email && emp.email.toLowerCase().includes(query.toLowerCase()))
        )
      : [...allEmpleados];

    result.sort((a, b) => {
      const aVal = a[sortConfig.key] || "";
      const bVal = b[sortConfig.key] || "";
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [allEmpleados, query, sortConfig]);

  const paginatedEmpleados = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEmpleados.slice(start, start + pageSize);
  }, [filteredEmpleados, currentPage, pageSize]);

  const handleSort = useCallback((key: keyof Empleado) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(1);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-text-secondary">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Empleados</h1>
          <p className="text-sm text-text-secondary mt-1">
            {filteredEmpleados.length} {filteredEmpleados.length === 1 ? "empleado" : "empleados"}
          </p>
        </div>
        <Link href="/empleados/new">
          <Button>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo
          </Button>
        </Link>
      </div>

      {/* Search and Page Size */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            onSearchChange={handleSearch}
            placeholder="Buscar por nombre, cargo, departamento o email..."
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-secondary whitespace-nowrap">Por página:</label>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="px-3 py-2 rounded-md border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {allEmpleados.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-secondary mb-4">No hay empleados registrados</p>
          <Link href="/empleados/new">
            <Button>Agregar primer empleado</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Foto</TableHeader>
                  <SortHeader column="nombre" label="Nombre" sortKey="nombre" currentSort={sortConfig} onSort={handleSort} />
                  <SortHeader column="cargo" label="Cargo" sortKey="cargo" currentSort={sortConfig} onSort={handleSort} />
                  <SortHeader column="departamento" label="Departamento" sortKey="departamento" currentSort={sortConfig} onSort={handleSort} />
                  <SortHeader column="email" label="Email" sortKey="email" currentSort={sortConfig} onSort={handleSort} />
                  <TableHeader>Acciones</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedEmpleados.map((empelado) => (
                  <TableRow key={empelado.id}>
                    <TableCell>
                      <Avatar src={empelado.imagen_base64 || empelado.imagen_url} name={empelado.nombre} size="sm" />
                    </TableCell>
                    <TableCell>{empelado.nombre}</TableCell>
                    <TableCell>{empelado.cargo}</TableCell>
                    <TableCell>{empelado.departamento || "—"}</TableCell>
                    <TableCell>{empelado.email || "—"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`/empleados/${empelado.id}`}>
                          <Button variant="secondary" size="sm">
                            Ver
                          </Button>
                        </Link>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => setDeleteModal({ open: true, empleado:empelado })}
                        >
                          Retirar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              {filteredEmpleados.length > 0 
                ? `Mostrando ${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, filteredEmpleados.length)} de ${filteredEmpleados.length}`
                : "Sin resultados"}
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredEmpleados.length / pageSize)}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.open}
        title="Retirar empleado"
        message={`¿Estás seguro de retirar a ${deleteModal.empleado?.nombre}? Esta acción no se puede deshacer.`}
        onConfirm={handleRetirar}
        onCancel={() => setDeleteModal({ open: false, empleado: null })}
      />
    </div>
  );
}