import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmpleadoRepository } from '@/lib/repositories/implementations/EmpleadoRepository';

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

describe('EmpleadoRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findAll', () => {
    it('debería retornar array de empleados', async () => {
      const mockData = [
        {
          id: '1',
          nombre: 'Juan',
          cargo: 'Dev',
          departamento: 'TI',
          email: 'juan@test.com',
          telefono: '555-1234',
          fecha_ingreso: '2024-01-01',
          usuario_id: 'user-1',
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z',
        },
      ];

      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockData, error: null }),
      };

      const { createClient } = await import('@/lib/supabase/server');
      (createClient as any).mockResolvedValue(mockSupabase);

      const repository = new EmpleadoRepository();
      const result = await repository.findAll('user-1');

      expect(result).toHaveLength(1);
      expect(result[0].nombre).toBe('Juan');
    });
  });

  describe('create', () => {
    it('debería crear un empleado y retornarlo', async () => {
      const mockResult = {
        id: 'new-id',
        nombre: 'Nuevo',
        cargo: 'Tester',
        departamento: 'QA',
        email: 'nuevo@test.com',
        telefono: '555-9999',
        fecha_ingreso: '2024-02-01',
        usuario_id: 'user-1',
        created_at: '2024-02-01T00:00:00.000Z',
        updated_at: '2024-02-01T00:00:00.000Z',
      };

      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockResult, error: null }),
      };

      const { createClient } = await import('@/lib/supabase/server');
      (createClient as any).mockResolvedValue(mockSupabase);

      const repository = new EmpleadoRepository();
      const result = await repository.create(
        { nombre: 'Nuevo', cargo: 'Tester' },
        'user-1'
      );

      expect(result.id).toBe('new-id');
      expect(result.nombre).toBe('Nuevo');
    });
  });
});
