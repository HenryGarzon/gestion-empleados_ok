import { createClient } from '@/lib/supabase/server';
import { IEmpleadoRepository } from '../interfaces/IEmpleadoRepository';
import { Empleado } from '@/types/Empleado';

export class EmpleadoRepository implements IEmpleadoRepository {
  private tableName = 'empleados';

  async findAll(usuarioId: string): Promise<Empleado[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('usuario_id', usuarioId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return (data || []).map(Empleado.fromJson);
  }

  async findById(id: string, usuarioId: string): Promise<Empleado | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .eq('usuario_id', usuarioId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(error.message);
    }
    return Empleado.fromJson(data);
  }

  async findByEmail(email: string, usuarioId: string): Promise<Empleado | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('email', email)
      .eq('usuario_id', usuarioId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(error.message);
    }
    return Empleado.fromJson(data);
  }

  async create(data: Partial<Empleado>, usuarioId: string): Promise<Empleado> {
    const supabase = await createClient();
    const now = new Date();

    const empleado = new Empleado(
      '',
      data.nombre || '',
      data.cargo || '',
      data.departamento || '',
      data.email || '',
      data.telefono || '',
      data.fechaIngreso || now,
      usuarioId,
      now,
      now,
      data.imagenBase64
    );

    const { data: result, error } = await supabase
      .from(this.tableName)
      .insert(empleado.toJson())
      .select()
      .single();

    if (error) throw new Error(error.message);
    return Empleado.fromJson(result);
  }

  async update(id: string, data: Partial<Empleado>, usuarioId: string): Promise<Empleado> {
    const supabase = await createClient();
    const updateData: Record<string, any> = {};

    if (data.nombre !== undefined) updateData.nombre = data.nombre;
    if (data.cargo !== undefined) updateData.cargo = data.cargo;
    if (data.departamento !== undefined) updateData.departamento = data.departamento;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.telefono !== undefined) updateData.telefono = data.telefono;
    if (data.fechaIngreso !== undefined) {
      updateData.fecha_ingreso = data.fechaIngreso.toISOString().split('T')[0];
    }
    if (data.imagenBase64 !== undefined) {
      updateData.imagen_base64 = data.imagenBase64;
    }
    if (data.imagenUrl !== undefined) {
      updateData.imagen_url = data.imagenUrl;
    }
    updateData.updated_at = new Date().toISOString();

    const { data: result, error } = await supabase
      .from(this.tableName)
      .update(updateData)
      .eq('id', id)
      .eq('usuario_id', usuarioId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return Empleado.fromJson(result);
  }

  async delete(id: string, usuarioId: string): Promise<boolean> {
    const supabase = await createClient();
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id)
      .eq('usuario_id', usuarioId);

    if (error) throw new Error(error.message);
    return true;
  }
}
