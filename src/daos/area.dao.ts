import pool from "../config/db";
import type IArea from "../interfaces/area.interface";
import {v4 as uuidv4} from 'uuid';

export class AreaDAO {
  // Crear
  static async create(data: IArea): Promise<IArea> {
    const query = `
      INSERT INTO area (uuid, name, "deputyManagement")
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [uuidv4(), data.name, data.uuidDeputyManagement];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Obtener todos
  static async findAll(): Promise<IArea[]> {
    const query = `SELECT * FROM area ORDER BY name ASC;`;
    const result = await pool.query(query);
    return result.rows;
  }

  // Buscar por ID
  static async findById(id: string): Promise<IArea | null> {
    const query = `SELECT * FROM area WHERE uuid = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  // Actualizar
  static async update(id: string, data: Partial<IArea>): Promise<IArea | null> {
    const query = `
      UPDATE area
      SET name = COALESCE($1, name),
          "uuidManagement" = COALESCE($2, "uuidManagement")
      WHERE uuid = $3
      RETURNING *;
    `;
    const values = [data.name, data.uuidDeputyManagement, id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  // Eliminar
  static async delete(id: string): Promise<boolean> {
    const query = `DELETE FROM area WHERE uuid = $1;`;
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }
}