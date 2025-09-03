import pool from '../config/db';
import type IRole from '../interfaces/role.interface';
import {v4 as uuidv4} from 'uuid';

export class RoleDAO {
  // Obtener todos los roles
  static async findAll(): Promise<IRole[]> {
    const result = await pool.query('SELECT * FROM role ORDER BY name ASC');
    return result.rows;
  }

  // Buscar un rol por UUID
  static async findById(uuid: string): Promise<IRole | null> {
    const result = await pool.query('SELECT * FROM role WHERE uuid = $1', [uuid]);
    return result.rows[0] || null;
  }

   // Buscar un rol por UUID
  // Buscar por nombre
  static async findByName(name: string) { 
    const query = `SELECT * FROM ROLE WHERE name = $1 ;`
    const result = await pool.query(query, [name]);
    return result.rows[0] || null;
  }

  // Crear un nuevo rol
  static async create(role: IRole): Promise<IRole> {
    const query =
      `INSERT INTO role (uuid, name)
       VALUES ($1, $2)
       RETURNING *`
    ;
    const values = [uuidv4(), role.name]
    const result = await pool.query(query, values)
    return result.rows[0];
  }

  // Actualizar rol por UUID
  static async update(uuid: string, role: Partial<IRole>): Promise<IRole | null> {
    const result = await pool.query(
      `UPDATE role
       SET name = COALESCE($2, name)
       WHERE uuid = $1
       RETURNING *`,
      [uuid, role.name]
    );
    return result.rows[0] || null;
  }

  // Eliminar un rol
  static async delete(uuid: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM role WHERE uuid = $1', [uuid]);
    return (result.rowCount ??0) > 0;
  }
}