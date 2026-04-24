"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUpload, Avatar } from "@/components/ui/Avatar";

export default function EditEmpleadoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    nombre: "",
    cargo: "",
    departamento: "",
    email: "",
    telefono: "",
    fechaIngreso: "",
    imagenBase64: "",
    imagenUrl: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadEmpleado() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("empleados")
        .select("*")
        .eq("id", id)
        .eq("usuario_id", user.id)
        .single();

      if (fetchError || !data) {
        setError("Empleado no encontrado");
        setLoading(false);
        return;
      }

      setFormData({
        nombre: data.nombre || "",
        cargo: data.cargo || "",
        departamento: data.departamento || "",
        email: data.email || "",
        telefono: data.telefono || "",
        fechaIngreso: data.fecha_ingreso || "",
        imagenBase64: data.imagen_base64 || "",
        imagenUrl: data.imagen_url || "",
      });

      setLoading(false);
    }

    loadEmpleado();
  }, [id, router]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("No hay sesión activa");
      setSaving(false);
      return;
    }

    const errors: string[] = [];
    if (!formData.nombre.trim()) errors.push("Nombre es requerido");
    if (!formData.cargo.trim()) errors.push("Cargo es requerido");

    if (errors.length > 0) {
      setError(errors.join(", "));
      setSaving(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("empleados")
      .update({
        nombre: formData.nombre,
        cargo: formData.cargo,
        departamento: formData.departamento || null,
        email: formData.email || null,
        telefono: formData.telefono || null,
        fecha_ingreso: formData.fechaIngreso || null,
        imagen_base64: formData.imagenBase64 || null,
        imagen_url: formData.imagenUrl || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("usuario_id", user.id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
    } else {
      router.push("/empleados");
      router.refresh();
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-text-secondary">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Editar Empleado</h1>
        <p className="text-sm text-text-secondary mt-1">
          Actualiza los datos del empleado
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="flex justify-center">
          <Avatar src={formData.imagenBase64 || formData.imagenUrl} name={formData.nombre} size="lg" />
        </div>

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

        <ImageUpload
          value={formData.imagenBase64}
          onChange={(base64) => setFormData({ ...formData, imagenBase64: base64 })}
          label="Fotografía"
        />

        {error && (
          <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar Cambios"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}