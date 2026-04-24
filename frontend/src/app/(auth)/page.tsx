"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Cargar seed si no hay empleados
      try {
        const seedRes = await fetch('/api/seed', { method: 'GET' });
        if (!seedRes.ok) {
          // Ya hay empleados o erro, no importa
        }
      } catch {
        // Ignore seed errors
      }
      router.push("/empleados");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold">Gestión de Empleados</h1>
          <p className="text-sm text-text-secondary mt-2">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            type="email"
            label="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />
          <Input
            id="password"
            type="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Iniciando..." : "Iniciar Sesión"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-text-secondary mt-6">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-accent hover:text-accent-hover">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}