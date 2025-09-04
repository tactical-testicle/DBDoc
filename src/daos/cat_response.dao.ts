import pool from '../config/db';
import type ICat_response from '../interfaces/cat_response.interface';
import {v4 as uuidv4} from 'uuid';

export class Cat_responseDAO {
  // Obtener todos los cat_responses
  static async findAll(): Promise<ICat_response[]> {
    const result = await pool.query('SELECT * FROM cat_response ORDER BY name ASC');
    return result.rows;
  }

  // Buscar un rol por UUID
  static async findById(uuid: string): Promise<ICat_response | null> {
    const result = await pool.query('SELECT * FROM cat_response WHERE uuid = $1', [uuid]);
    return result.rows[0] || null;
  }

   // Buscar un rol por UUID
  // Buscar por nombre
  static async findByName(name: string) { 
    const query = `SELECT * FROM cat_response WHERE name = $1 ;`
    const result = await pool.query(query, [name]);
    return result.rows[0] || null;
  }

  // Crear un nuevo rol
  static async create(cat_response: ICat_response): Promise<ICat_response> {
    const query =
      `INSERT INTO cat_response (uuid, name)
       VALUES ($1, $2)
       RETURNING *`
    ;
    const values = [uuidv4(), cat_response.name]
    const result = await pool.query(query, values)
    return result.rows[0];
  }

  // Actualizar rol por UUID
  static async update(uuid: string, cat_response: Partial<ICat_response>): Promise<ICat_response | null> {
    const result = await pool.query(
      `UPDATE cat_response
       SET name = COALESCE($2, name)
       WHERE uuid = $1
       RETURNING *`,
      [uuid, cat_response.name]
    );
    return result.rows[0] || null;
  }

  // Eliminar un rol
  static async delete(uuid: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM cat_response WHERE uuid = $1', [uuid]);
    return (result.rowCount ??0) > 0;
  }
}