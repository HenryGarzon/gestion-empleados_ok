import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { error } = await supabase
    .from("empleados")
    .delete()
    .eq("usuario_id", user.id)
    .not("imagen_url", "is", null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Empleados sin imagen_url eliminados" });
}

export async function GET() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { count } = await supabase
    .from("empleados")
    .select("*", { count: "exact", head: true })
    .eq("usuario_id", user.id)
    .not("imagen_url", "is", null);

  if (count && count > 0) {
    await supabase
      .from("empleados")
      .delete()
      .eq("usuario_id", user.id)
      .not("imagen_url", "is", null);
  }

  return NextResponse.json({ message: `${count || 0} empleados con imagen_url eliminados` });
}