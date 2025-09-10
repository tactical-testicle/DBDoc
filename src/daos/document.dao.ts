import pool from "../config/db";
import type IDocument from "../interfaces/document.interface";
import {v4 as uuidv4} from 'uuid';

export class DocumentDAO {
  static async create(data: IDocument): Promise<IDocument> {
    const query = `
      INSERT INTO "document" (
        "uuid", "uuidUser", "date", "uuidTypeDocument", 
        "record", "folioSSESFI", "affair", "uuidStatus", 
        "documentDir", "documentRelation", "uuidAgreement", "uuidResponsible"
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *;
    `;
    const values = [
      uuidv4(),
      data.uuidUser,
      data.date,
      data.uuidTypeDocument,
      data.record,
      data.folioSSESFI,
      data.affair,
      data.uuidStatus,
      data.documentDir ?? null,
      data.documentRelation,
      data.uuidAgreement,
      data.uuidResponsible ?? null,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll(): Promise<IDocument[]> {
    const result = await pool.query(
      `SELECT d.*, u."fullName" as userName, td."name" as typeDocumentName,
              a."name" as agreementName, r."name" as responsibleName, s."name" as statusName
       FROM "document" d
       JOIN "user" u ON d."uuidUser" = u."uuid"
       JOIN "cat_typedocument" td ON d."uuidTypeDocument" = td."uuid"
       JOIN "cat_agreement" a ON d."uuidAgreement" = a."uuid"
       JOIN "cat_status" s ON d."uuidStatus" = s."uuid"
       LEFT JOIN "responsible" r ON d."uuidResponsible" = r."uuid"`
    );
    return result.rows;
  }

  static async findById(uuid: string): Promise<IDocument | null> {
    const result = await pool.query(
      `SELECT * FROM "document" WHERE "uuid" = $1`,
      [uuid]
    );
    return result.rows[0] || null;
  }

  static async update(uuid: string, data: Partial<IDocument>): Promise<IDocument | null> {
    const fields = Object.keys(data)
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(", ");
    const values = Object.values(data);
    const query = `UPDATE "document" SET ${fields} WHERE "uuid" = $1 RETURNING *`;
    const result = await pool.query(query, [uuid, ...values]);
    return result.rows[0] || null;
  }

  static async delete(uuid: string): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM "document" WHERE "uuid" = $1`,
      [uuid]
    );
    return (result.rowCount ?? 0) > 0;
  }
}