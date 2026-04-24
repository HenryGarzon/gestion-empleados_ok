import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const COLORS = [
  "1abc9c", "2ecc71", "3498db", "9b59b6", "f39c12",
  "e74c3c", "16a085", "27ae60", "2980b9", "8e44ad",
  "f1c40f", "e67e22", "95a5a6", "7f8c8d", "34495e"
];

export async function GET() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const nombres = [
    "Juan", "Maria", "Carlos", "Ana", "Pedro", "Lucia", "Miguel", "Sofia",
    "Jorge", "Isabella", "Fernando", "Valentina", "Roberto", "Camila", "Antonio",
    "Eugenia", "Diego", "Natalia", "Javier", "Andrea", "Luis", "Daniela",
    "Eduardo", "Rosa", "Manuel", "Silvia", "Carlos", "Elena", "Jorge", "Patricia",
    "Fernando", "Monica", "Alejandro", "Gloria", "Francisco", "Beatriz",
    "Alberto", "Margarita", "Hugo", "Teresa", "Rodrigo", "Julia",
    "Andres", "Lorena", "Sergio", "Adriana", "Oscar", "Veronica",
    "Daniel", "Karla", "Martin", "Yaneth", "Cristian", "Diana"
  ];

  const cargos = [
    "Desarrollador", "Disenador", "Gerente", "Analista", "Contador",
    "Abogado", "Arquitecto", "Ingeniero", "Secretario", "Asistente",
    "Coordinador", "Director", "Especialista", "Tecnico", "Consultor",
    "Supervisor", "Auditor", "Asesor", "Ejecutivo", "Recepcionista"
  ];

  const departamentos = [
    "TI", "Recursos Humanos", "Finanzas", "Legal", "Mercadeo",
    "Ventas", "Operaciones", "Administracion", "Inventario", "Produccion"
  ];

  const apellidos = [
    "Garcia", "Lopez", "Martinez", "Rodriguez", "Hernandez",
    "Gonzalez", "Perez", "Sanchez", "Ramirez", "Torres"
  ];

  function generateAvatarUrl(name: string, index: number): string {
    const color = COLORS[index % COLORS.length];
    const initials = name.split(" ").map(n => n[0]).join("+");
    return `https://ui-avatars.com/api/?name=${initials}&background=${color}&color=fff&size=128&bold=true`;
  }

  const empleados = [];
  const seedImages: { url: string; used: boolean; empleado?: string }[] = [];

  for (let i = 0; i < 50; i++) {
    const nombre = nombres[i % nombres.length] + " " + apellidos[(i + 7) % 10];
    const cargo = cargos[i % cargos.length];
    const depto = departamentos[i % departamentos.length];
    const telefono = "+57 3" + String(Math.floor(Math.random() * 90) + 10) + " " + String(Math.floor(Math.random() * 10000000));
    const fecha = new Date(2020 + (i % 5), i % 12, (i % 28) + 1).toISOString().split("T")[0];
    const imagenUrl = generateAvatarUrl(nombre, i);

    empleados.push({
      nombre,
      cargo,
      departamento: depto,
      email: nombre.toLowerCase().replace(" ", ".") + (i + 1) + "@test.com",
      telefono,
      fecha_ingreso: fecha,
      usuario_id: user.id,
      imagen_url: imagenUrl
    });

    seedImages.push({ url: imagenUrl, used: true, empleado: nombre });
  }

  for (let i = 0; i < 15; i++) {
    const color = COLORS[(i + 7) % COLORS.length];
    const url = `https://ui-avatars.com/api/?name=Disponible&background=${color}&color=fff&size=128&bold=true`;
    seedImages.push({ url, used: false });
  }

  const { count: existingCount } = await supabase
    .from("empleados")
    .select("*", { count: "exact", head: true })
    .eq("usuario_id", user.id);

  if (existingCount && existingCount > 0) {
    return NextResponse.json({ 
      message: "Ya existen empleados. Primero límpialos con /api/seed-clean",
      count: existingCount 
    }, { status: 400 });
  }

  const { error } = await supabase.from("empleados").insert(empleados);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "50 empleados creados con imágenes",
    count: empleados.length,
    seedImages
  });
}
