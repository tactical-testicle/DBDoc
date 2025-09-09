import pool from '../config/db'; // Asegúrate que tu archivo de conexión esté en esa ruta
import type IUser  from '../interfaces/user.interface';
import {v4 as uuidv4} from 'uuid';

export class UserDAO {
  static async findAll(): Promise<IUser[]> {
    const result = await pool.query('SELECT * FROM USER WHERE status = $1', ['active']);
    return result.rows;
  }

  static async findById(id: number): Promise<IUser | null> {
    const result = await pool.query('SELECT * FROM USER WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async findByFicha(ficha: number): Promise<IUser | null> {
    console.log('Va a buscar la ficha: ',ficha)
    const query =
      `SELECT * FROM "user" WHERE ficha = $1`;
    const values = [ficha]
    const result = await pool.query(query, values)
    return result.rows[0] || null;
  }

  static async create(user: IUser): Promise<IUser> {
    const query = `
      INSERT INTO "user" ("uuid", "fullName", "email", "ficha", "status", "uuidRole", "uuidPermisions", "startDate", "salt", "area", "twoFactor", "password")
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), $8, $9, $10, $11)
      RETURNING *;
    `;
    const values = [
      uuidv4(),
      user.fullName,
      user.email,
      user.ficha,
      user.status,
      user.uuidRole,
      user.uuidPermisions,
      "sdfjhaselirgbhlbiluehfkanoiusalt123-algo-asi-jajaja",
      user.area,
      "asdFactor",
      user.password
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(user: IUser): Promise<IUser> {
    const query = `
      UPDATE USER SET
        name = $1,
        password = $2,
        ficha = $3,
        status = $4,
        role = $5,
        usuario_modificacion = $6,
        fecha_modificacion = NOW()
      WHERE id = $7
      RETURNING *;
    `;
    const values = [
      user.fullName,
      user.password,
      user.ficha,
      user.status,
      user.uuidRole,
      user.auditUsers,
      user.uuid
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM USER WHERE id = $1', [id]);
  }

  static async findAdmins(): Promise<IUser[]> {
    const result = await pool.query('SELECT * FROM USER WHERE "adminUser" = true');
    return result.rows;
  }
}