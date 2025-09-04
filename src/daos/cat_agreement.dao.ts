import pool from '../config/db';
import type ICat_agreement from '../interfaces/cat_agreement.interface';
import {v4 as uuidv4} from 'uuid';

export class Cat_agreementDAO {
  // Obtener todos los cat_agreements
  static async findAll(): Promise<ICat_agreement[]> {
    const result = await pool.query('SELECT * FROM cat_agreement ORDER BY name ASC');
    return result.rows;
  }

  // Buscar un cat_agreement por UUID
  static async findById(uuid: string): Promise<ICat_agreement | null> {
    const result = await pool.query('SELECT * FROM cat_agreement WHERE uuid = $1', [uuid]);
    return result.rows[0] || null;
  }

   // Buscar un cat_agreement por UUID
  // Buscar por nombre
  static async findByName(name: string) { 
    const query = `SELECT * FROM cat_agreement WHERE name = $1 ;`
    const result = await pool.query(query, [name]);
    return result.rows[0] || null;
  }

  // Crear un nuevo cat_agreement
  static async create(cat_agreement: ICat_agreement): Promise<ICat_agreement> {
    const query =
      `INSERT INTO cat_agreement (uuid, name)
       VALUES ($1, $2)
       RETURNING *`
    ;
    const values = [uuidv4(), cat_agreement.name]
    const result = await pool.query(query, values)
    return result.rows[0];
  }

  // Actualizar cat_agreement por UUID
  static async update(uuid: string, cat_agreement: Partial<ICat_agreement>): Promise<ICat_agreement | null> {
    const result = await pool.query(
      `UPDATE cat_agreement
       SET name = COALESCE($2, name)
       WHERE uuid = $1
       RETURNING *`,
      [uuid, cat_agreement.name]
    );
    return result.rows[0] || null;
  }

  // Eliminar un cat_agreement
  static async delete(uuid: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM cat_agreement WHERE uuid = $1', [uuid]);
    return (result.rowCount ??0) > 0;
  }
}