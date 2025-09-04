import pool from '../config/db';
import type IResponsible from '../interfaces/responsible.interface';
import {v4 as uuidv4} from 'uuid';

export class ResponsibleDAO {
  // Obtener todos los responsibles
  static async findAll(): Promise<IResponsible[]> {
    const result = await pool.query('SELECT * FROM responsible ORDER BY name ASC');
    return result.rows;
  }

  // Buscar un rol por UUID
  static async findById(uuid: string): Promise<IResponsible | null> {
    const result = await pool.query('SELECT * FROM responsible WHERE uuid = $1', [uuid]);
    return result.rows[0] || null;
  }

   // Buscar un rol por UUID
  // Buscar por nombre
  static async findByName(name: string) { 
    const query = `SELECT * FROM responsible WHERE name = $1 ;`
    const result = await pool.query(query, [name]);
    return result.rows[0] || null;
  }

  // Crear un nuevo rol
  static async create(responsible: IResponsible): Promise<IResponsible> {
    const query =
      `INSERT INTO responsible (uuid, name)
       VALUES ($1, $2)
       RETURNING *`
    ;
    const values = [uuidv4(), responsible.name]
    const result = await pool.query(query, values)
    return result.rows[0];
  }

  // Actualizar rol por UUID
  static async update(uuid: string, responsible: Partial<IResponsible>): Promise<IResponsible | null> {
    const result = await pool.query(
      `UPDATE responsible
       SET name = COALESCE($2, name)
       WHERE uuid = $1
       RETURNING *`,
      [uuid, responsible.name]
    );
    return result.rows[0] || null;
  }

  // Eliminar un rol
  static async delete(uuid: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM responsible WHERE uuid = $1', [uuid]);
    return (result.rowCount ??0) > 0;
  }
}