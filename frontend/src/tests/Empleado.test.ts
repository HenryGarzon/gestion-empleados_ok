import { describe, it, expect } from 'vitest';
import { Empleado } from '@/types/Empleado';

describe('Empleado', () => {
  describe('constructor y fromJson', () => {
    it('debería crear una instancia de Empleado con el constructor', () => {
      const now = new Date();
      const empleado = new Empleado(
        '123',
        'Juan Pérez',
        'Desarrollador',
        'TI',
        'juan@test.com',
        '555-1234',
        now,
        'user-uuid',
        now,
        now
      );

      expect(empleado.id).toBe('123');
      expect(empleado.nombre).toBe('Juan Pérez');
      expect(empleado.cargo).toBe('Desarrollador');
      expect(empleado.departamento).toBe('TI');
      expect(empleado.email).toBe('juan@test.com');
      expect(empleado.telefono).toBe('555-1234');
      expect(empleado.usuarioId).toBe('user-uuid');
    });

    it('debería crear Empleado desde JSON de Supabase', () => {
      const data = {
        id: '456',
        nombre: 'María García',
        cargo: 'Diseñadora',
        departamento: 'UX',
        email: 'maria@test.com',
        telefono: '555-5678',
        fecha_ingreso: '2024-01-15',
        usuario_id: 'user-456',
        created_at: '2024-01-15T10:00:00.000Z',
        updated_at: '2024-01-15T10:00:00.000Z',
      };

      const empleado = Empleado.fromJson(data);

      expect(empleado.id).toBe('456');
      expect(empleado.nombre).toBe('María García');
      expect(empleado.cargo).toBe('Diseñadora');
      expect(empleado.departamento).toBe('UX');
      expect(empleado.email).toBe('maria@test.com');
      expect(empleado.usuarioId).toBe('user-456');
      expect(empleado.fechaIngreso).toBeInstanceOf(Date);
    });
  });

  describe('toJson', () => {
    it('debería convertir a formato JSON para Supabase', () => {
      const fecha = new Date('2024-01-15T00:00:00.000Z');
      const empleado = new Empleado(
        '123',
        'Juan Pérez',
        'Desarrollador',
        'TI',
        'juan@test.com',
        '555-1234',
        fecha,
        'user-uuid',
        new Date(),
        new Date()
      );

      const json = empleado.toJson();

      expect(json.id).toBe('123');
      expect(json.nombre).toBe('Juan Pérez');
      expect(json.cargo).toBe('Desarrollador');
      expect(json.departamento).toBe('TI');
      expect(json.email).toBe('juan@test.com');
      expect(json.telefono).toBe('555-1234');
      expect(json.fecha_ingreso).toBe('2024-01-15');
      expect(json.usuario_id).toBe('user-uuid');
      expect(json.created_at).toBeDefined();
      expect(json.updated_at).toBeDefined();
    });
  });

  describe('validate', () => {
    it('debería retornar array vacío si no hay errores', () => {
      const empleado = new Empleado(
        '123',
        'Juan Pérez',
        'Desarrollador',
        'TI',
        'juan@test.com',
        '555-1234',
        new Date(),
        'user-uuid',
        new Date(),
        new Date()
      );

      const errors = empleado.validate();

      expect(errors).toHaveLength(0);
    });

    it('debería retornar error si nombre está vacío', () => {
      const empleado = new Empleado(
        '123',
        '',
        'Desarrollador',
        'TI',
        'juan@test.com',
        '555-1234',
        new Date(),
        'user-uuid',
        new Date(),
        new Date()
      );

      const errors = empleado.validate();

      expect(errors).toContain('Nombre es requerido');
    });

    it('debería retornar error si cargo está vacío', () => {
      const empleado = new Empleado(
        '123',
        'Juan Pérez',
        '',
        'TI',
        'juan@test.com',
        '555-1234',
        new Date(),
        'user-uuid',
        new Date(),
        new Date()
      );

      const errors = empleado.validate();

      expect(errors).toContain('Cargo es requerido');
    });

    it('debería retornar error si email es inválido', () => {
      const empleado = new Empleado(
        '123',
        'Juan Pérez',
        'Desarrollador',
        'TI',
        'email-invalido',
        '555-1234',
        new Date(),
        'user-uuid',
        new Date(),
        new Date()
      );

      const errors = empleado.validate();

      expect(errors).toContain('Email inválido');
    });

    it('debería retornar múltiples errores', () => {
      const empleado = new Empleado(
        '123',
        '',
        '',
        'TI',
        'email-invalido',
        '555-1234',
        new Date(),
        'user-uuid',
        new Date(),
        new Date()
      );

      const errors = empleado.validate();

      expect(errors.length).toBeGreaterThanOrEqual(2);
    });

    it('debería permitir email vacío (opcional)', () => {
      const empleado = new Empleado(
        '123',
        'Juan Pérez',
        'Desarrollador',
        'TI',
        '',
        '555-1234',
        new Date(),
        'user-uuid',
        new Date(),
        new Date()
      );

      const errors = empleado.validate();

      expect(errors).not.toContain('Email inválido');
    });
  });
});
