import pool from '../config/db';
import type IPermisions from '../interfaces/permisions.interface';
import {v4 as uuidv4} from 'uuid';

export class PermisionsDAO {
  // Obtener todos los permisionss
  static async findAll(): Promise<IPermisions[]> {
    const result = await pool.query('SELECT * FROM permisions ORDER BY name ASC');
    return result.rows;
  }

  // Buscar un rol por UUID
  static async findById(uuid: string): Promise<IPermisions | null> {
    const result = await pool.query('SELECT * FROM permisions WHERE uuid = $1', [uuid]);
    return result.rows[0] || null;
  }

   // Buscar un rol por UUID
  // Buscar por nombre
  static async findByName(name: string) { 
    const query = `SELECT * FROM permisions WHERE name = $1 ;`
    const result = await pool.query(query, [name]);
    return result.rows[0] || null;
  }

  // Crear un nuevo rol
  static async create(permisions: IPermisions): Promise<IPermisions> {
    const query =
      `INSERT INTO permisions (uuid, name)
       VALUES ($1, $2)
       RETURNING *`
    ;
    const values = [uuidv4(), permisions.name]
    const result = await pool.query(query, values)
    return result.rows[0];
  }

  // Actualizar rol por UUID
  static async update(uuid: string, permisions: Partial<IPermisions>): Promise<IPermisions | null> {
    const result = await pool.query(
      `UPDATE permisions
       SET name = COALESCE($2, name)
       WHERE uuid = $1
       RETURNING *`,
      [uuid, permisions.name]
    );
    return result.rows[0] || null;
  }

  // Eliminar un rol
  static async delete(uuid: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM permisions WHERE uuid = $1', [uuid]);
    return (result.rowCount ??0) > 0;
  }
}