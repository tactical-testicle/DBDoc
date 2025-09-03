import pool from '../config/db';
import type ICat_typedocument from '../interfaces/cat_typedocument.interface';
import {v4 as uuidv4} from 'uuid';

export class Cat_typedocumentDAO {
  // Obtener todos los cat_typedocuments
  static async findAll(): Promise<ICat_typedocument[]> {
    const result = await pool.query('SELECT * FROM cat_typedocument ORDER BY name ASC');
    return result.rows;
  }

  // Buscar un cat_typedocument por UUID
  static async findById(uuid: string): Promise<ICat_typedocument | null> {
    const result = await pool.query('SELECT * FROM cat_typedocument WHERE uuid = $1', [uuid]);
    return result.rows[0] || null;
  }

   // Buscar un cat_typedocument por UUID
  // Buscar por nombre
  static async findByName(name: string) { 
    const query = `SELECT * FROM cat_typedocument WHERE name = $1 ;`
    const result = await pool.query(query, [name]);
    return result.rows[0] || null;
  }

  // Crear un nuevo cat_typedocument
  static async create(cat_typedocument: ICat_typedocument): Promise<ICat_typedocument> {
    const query =
      `INSERT INTO cat_typedocument (uuid, name)
       VALUES ($1, $2)
       RETURNING *`
    ;
    const values = [uuidv4(), cat_typedocument.name]
    const result = await pool.query(query, values)
    return result.rows[0];
  }

  // Actualizar cat_typedocument por UUID
  static async update(uuid: string, cat_typedocument: Partial<ICat_typedocument>): Promise<ICat_typedocument | null> {
    const result = await pool.query(
      `UPDATE cat_typedocument
       SET name = COALESCE($2, name)
       WHERE uuid = $1
       RETURNING *`,
      [uuid, cat_typedocument.name]
    );
    return result.rows[0] || null;
  }

  // Eliminar un cat_typedocument
  static async delete(uuid: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM cat_typedocument WHERE uuid = $1', [uuid]);
    return (result.rowCount ??0) > 0;
  }
}