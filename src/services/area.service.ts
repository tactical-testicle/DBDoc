import { AreaDAO } from '../daos/area.dao';
import type IArea from '../interfaces/area.interface';
import logger from "../../lib/logger";

export class AreaService {
  static async create(data: IArea): Promise<IArea> {
    try {
      return await AreaDAO.create(data);
    } catch (error) {
      logger.error(`[service/area/create]: ${error}`);
      throw error;
    }
  }

  static async findAll(): Promise<IArea[]> {
    try {
      return await AreaDAO.findAll();
    } catch (error) {
      logger.error(`[service/area/findAll]: ${error}`);
      throw error;
    }
  }

  static async findById(id: string): Promise<IArea | null> {
    try {
      return await AreaDAO.findById(id);
    } catch (error) {
      logger.error(`[service/area/findById]: ${error}`);
      throw error;
    }
  }

  static async update(uuid: string, body: IArea) {
    try {
      return await AreaDAO.update(uuid, body);
    } catch (error) {
      logger.error(`[service/area/update]: ${error}`);
      throw error;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      return await AreaDAO.delete(id);
    } catch (error) {
      logger.error(`[service/area/delete]: ${error}`);
      throw error;
    }
  }
}