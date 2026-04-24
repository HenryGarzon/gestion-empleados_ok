import { Empleado } from '@/types/Empleado';

export interface IRepository<T> {
  findAll(usuarioId: string): Promise<T[]>;
  findById(id: string, usuarioId: string): Promise<T | null>;
  create(data: Partial<T>, usuarioId: string): Promise<T>;
  update(id: string, data: Partial<T>, usuarioId: string): Promise<T>;
  delete(id: string, usuarioId: string): Promise<boolean>;
}

export interface IEmpleadoRepository extends IRepository<Empleado> {
  findByEmail(email: string, usuarioId: string): Promise<Empleado | null>;
}
