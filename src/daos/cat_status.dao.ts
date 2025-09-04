import pool from '../config/db';
import type ICat_status from '../interfaces/cat_status.interface';
import {v4 as uuidv4} from 'uuid';

export class Cat_statusDAO {
  // Obtener todos los cat_statuss
  static async findAll(): Promise<ICat_status[]> {
    const result = await pool.query('SELECT * FROM cat_status ORDER BY name ASC');
    return result.rows;
  }

  // Buscar un rol por UUID
  static async findById(uuid: string): Promise<ICat_status | null> {
    const result = await pool.query('SELECT * FROM cat_status WHERE uuid = $1', [uuid]);
    return result.rows[0] || null;
  }

   // Buscar un rol por UUID
  // Buscar por nombre
  static async findByName(name: string) { 
    const query = `SELECT * FROM cat_status WHERE name = $1 ;`
    const result = await pool.query(query, [name]);
    return result.rows[0] || null;
  }

  // Crear un nuevo rol
  static async create(cat_status: ICat_status): Promise<ICat_status> {
    const query =
      `INSERT INTO cat_status (uuid, name)
       VALUES ($1, $2)
       RETURNING *`
    ;
    const values = [uuidv4(), cat_status.name]
    const result = await pool.query(query, values)
    return result.rows[0];
  }

  // Actualizar rol por UUID
  static async update(uuid: string, cat_status: Partial<ICat_status>): Promise<ICat_status | null> {
    const result = await pool.query(
      `UPDATE cat_status
       SET name = COALESCE($2, name)
       WHERE uuid = $1
       RETURNING *`,
      [uuid, cat_status.name]
    );
    return result.rows[0] || null;
  }

  // Eliminar un rol
  static async delete(uuid: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM cat_status WHERE uuid = $1', [uuid]);
    return (result.rowCount ??0) > 0;
  }
}