import pool from '../config/db';
import type IManagement from '../interfaces/management.interface';
import {v4 as uuidv4} from 'uuid';

export class ManagementDAO {
  // Obtener todos los managements
  static async findAll(): Promise<IManagement[]> {
    const result = await pool.query('SELECT * FROM management ORDER BY name ASC');
    return result.rows;
  }

  // Buscar un rol por UUID
  static async findById(uuid: string): Promise<IManagement | null> {
    const result = await pool.query('SELECT * FROM management WHERE uuid = $1', [uuid]);
    return result.rows[0] || null;
  }

   // Buscar un rol por UUID
  // Buscar por nombre
  static async findByName(name: string) { 
    console.log ("paso 1")
    const query = `SELECT * FROM management WHERE name = $1 ;`
    console.log ("paso 2: ", query)
    const result = await pool.query(query, [name]);
    console.log ("paso 3: ")
    return result.rows[0] || null;
  }

  // Crear un nuevo rol
  static async create(management: IManagement): Promise<IManagement> {
    console.log("1")
    const query =
      `INSERT INTO management (uuid, name)
       VALUES ($1, $2)
       RETURNING *`
    ;
    const values = [uuidv4(), management.name]
    const result = await pool.query(query, values)
    return result.rows[0];
  }

  // Actualizar rol por UUID
  static async update(uuid: string, management: Partial<IManagement>): Promise<IManagement | null> {
    const result = await pool.query(
      `UPDATE management
       SET name = COALESCE($2, name)
       WHERE uuid = $1
       RETURNING *`,
      [uuid, management.name]
    );
    return result.rows[0] || null;
  }

  // Eliminar un rol
  static async delete(uuid: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM management WHERE uuid = $1', [uuid]);
    return (result.rowCount ??0) > 0;
  }
}