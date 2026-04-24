import { IRepository } from '@/types/IRepository';
import { Empleado } from '@/types/Empleado';

export interface IEmpleadoRepository extends IRepository<Empleado> {
  findByEmail(email: string, usuarioId: string): Promise<Empleado | null>;
}
