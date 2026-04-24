export class Empleado {
  constructor(
    public id: string,
    public nombre: string,
    public cargo: string,
    public departamento: string,
    public email: string,
    public telefono: string,
    public fechaIngreso: Date,
    public usuarioId: string,
    public createdAt: Date,
    public updatedAt: Date,
    public imagenBase64?: string,
    public imagenUrl?: string
  ) {}

  get imagen(): string | undefined {
    return this.imagenUrl || this.imagenBase64;
  }

  static fromJson(data: any): Empleado {
    return new Empleado(
      data.id,
      data.nombre,
      data.cargo,
      data.departamento,
      data.email,
      data.telefono,
      new Date(data.fecha_ingreso),
      data.usuario_id,
      new Date(data.created_at),
      new Date(data.updated_at),
      data.imagen_base64 || data.imagenBase64,
      data.imagen_url || data.imagenUrl
    );
  }

  toJson(): Record<string, any> {
    const json: Record<string, any> = {
      id: this.id,
      nombre: this.nombre,
      cargo: this.cargo,
      departamento: this.departamento,
      email: this.email,
      telefono: this.telefono,
      fecha_ingreso: this.fechaIngreso.toISOString().split('T')[0],
      usuario_id: this.usuarioId,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString()
    };
    if (this.imagenBase64) json.imagen_base64 = this.imagenBase64;
    if (this.imagenUrl) json.imagen_url = this.imagenUrl;
    return json;
  }

  validate(): string[] {
    const errors: string[] = [];
    if (!this.nombre.trim()) errors.push('Nombre es requerido');
    if (!this.cargo.trim()) errors.push('Cargo es requerido');
    if (this.email && !this.email.includes('@')) errors.push('Email inválido');
    return errors;
  }
}
