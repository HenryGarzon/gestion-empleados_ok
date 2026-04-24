"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/ui/Avatar";

export default function NewEmpleadoPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: "",
    cargo: "",
    departamento: "",
    email: "",
    telefono: "",
    fechaIngreso: "",
    imagenBase64: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("No hay sesión activa");
      setLoading(false);
      return;
    }

    const errors: string[] = [];
    if (!formData.nombre.trim()) errors.push("Nombre es requerido");
    if (!formData.cargo.trim()) errors.push("Cargo es requerido");

    if (errors.length > 0) {
      setError(errors.join(", "));
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("empleados").insert({
      nombre: formData.nombre,
      cargo: formData.cargo,
      departamento: formData.departamento || null,
      email: formData.email || null,
      telefono: formData.telefono || null,
      fecha_ingreso: formData.fechaIngreso || null,
      usuario_id: user.id,
      imagen_base64: formData.imagenBase64 || null,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/empleados");
      router.refresh();
    }
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Nuevo Empleado</h1>
        <p className="text-sm text-text-secondary mt-1">
          Completa los datos del empleado
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="nombre"
            label="Nombre *"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            placeholder="Juan Pérez"
            required
          />
          <Input
            id="cargo"
            label="Cargo *"
            value={formData.cargo}
            onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
            placeholder="Desarrollador"
            required
          />
        </div>

        <Input
          id="departamento"
          label="Departamento"
          value={formData.departamento}
          onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
          placeholder="TI, Recursos Humanos, etc."
        />

        <Input
          id="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="juan@empresa.com"
        />

        <Input
          id="telefono"
          label="Teléfono"
          value={formData.telefono}
          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          placeholder="+57 300 123 4567"
        />

        <Input
          id="fechaIngreso"
          type="date"
          label="Fecha de Ingreso"
          value={formData.fechaIngreso}
          onChange={(e) => setFormData({ ...formData, fechaIngreso: e.target.value })}
        />

        {error && (
          <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Empleado"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}