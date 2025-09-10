import { DocumentDAO } from "../daos/document.dao";
import type IDocument from "../interfaces/document.interface";
import logger from "../../lib/logger";

export class DocumentService {
  static async create(data: IDocument): Promise<IDocument> {
    try {
      return await DocumentDAO.create(data);
    } catch (error) {
      logger.error(`[service/document/create]: ${error}`);
      throw error;
    }
  }

  static async findAll(): Promise<IDocument[]> {
    try {
      return await DocumentDAO.findAll();
    } catch (error) {
      logger.error(`[service/document/findAll]: ${error}`);
      throw error;
    }
  }

  static async findById(uuid: string): Promise<IDocument | null> {
    try {
      return await DocumentDAO.findById(uuid);
    } catch (error) {
      logger.error(`[service/document/findById]: ${error}`);
      throw error;
    }
  }

  static async update(uuid: string, data: Partial<IDocument>): Promise<IDocument | null> {
    try {
      return await DocumentDAO.update(uuid, data);
    } catch (error) {
      logger.error(`[service/document/update]: ${error}`);
      throw error;
    }
  }

  static async delete(uuid: string): Promise<boolean> {
    try {
      return await DocumentDAO.delete(uuid);
    } catch (error) {
      logger.error(`[service/document/delete]: ${error}`);
      throw error;
    }
  }
}