import pool from "../config/db";
import type IDeputyManagement from "../interfaces/deputyManagement.interface";
import {v4 as uuidv4} from 'uuid';

export class DeputyManagementDAO {
  // Crear
  static async create(data: IDeputyManagement): Promise<IDeputyManagement> {
    const query = `
      INSERT INTO deputymanagement (uuid, name, "uuidManagement")
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [uuidv4(), data.name, data.uuidManagement];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Obtener todos
  static async findAll(): Promise<IDeputyManagement[]> {
    const query = `SELECT * FROM deputymanagement ORDER BY name ASC;`;
    const result = await pool.query(query);
    return result.rows;
  }

  // Buscar por ID
  static async findById(id: string): Promise<IDeputyManagement | null> {
    const query = `SELECT * FROM deputymanagement WHERE uuid = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  // Actualizar
  static async update(id: string, data: Partial<IDeputyManagement>): Promise<IDeputyManagement | null> {
    const query = `
      UPDATE deputymanagement
      SET name = COALESCE($1, name),
          "uuidManagement" = COALESCE($2, "uuidManagement")
      WHERE uuid = $3
      RETURNING *;
    `;
    const values = [data.name, data.uuidManagement, id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  // Eliminar
  static async delete(id: string): Promise<boolean> {
    const query = `DELETE FROM deputymanagement WHERE uuid = $1;`;
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }
}