import { DeputyManagementDAO } from '../daos/deputymanagement.dao';
import type IDeputyManagement from '../interfaces/deputyManagement.interface';
import logger from "../../lib/logger";

export class DeputyManagementService {
  static async create(data: IDeputyManagement): Promise<IDeputyManagement> {
    try {
      return await DeputyManagementDAO.create(data);
    } catch (error) {
      logger.error(`[service/deputymanagement/create]: ${error}`);
      throw error;
    }
  }

  static async findAll(): Promise<IDeputyManagement[]> {
    try {
      return await DeputyManagementDAO.findAll();
    } catch (error) {
      logger.error(`[service/deputymanagement/findAll]: ${error}`);
      throw error;
    }
  }

  static async findById(id: string): Promise<IDeputyManagement | null> {
    try {
      return await DeputyManagementDAO.findById(id);
    } catch (error) {
      logger.error(`[service/deputymanagement/findById]: ${error}`);
      throw error;
    }
  }

  static async update(uuid: string, body: IDeputyManagement) {
    try {
      return await DeputyManagementDAO.update(uuid, body);
    } catch (error) {
      logger.error(`[service/deputymanagement/update]: ${error}`);
      throw error;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      return await DeputyManagementDAO.delete(id);
    } catch (error) {
      logger.error(`[service/deputymanagement/delete]: ${error}`);
      throw error;
    }
  }
}