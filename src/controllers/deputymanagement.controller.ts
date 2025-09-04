import type { Request, Response } from "express";
import { DeputyManagementService } from "../services/deputmanagement.service";
import { ResponseHelper } from "../helpers/response.helper";
import logger from "../../lib/logger";

export default class DeputyManagementController {
  // Crear un DeputyManagement
  async createDeputyManagement(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body;
      const result = await DeputyManagementService.create(body);
      return ResponseHelper.success(res, "DeputyManagement creado con éxito", result, 201);
    } catch (error) {
      logger.error(`[controller/deputymanagement/create]: ${error}`);
      return ResponseHelper.error(res, "Error al crear DeputyManagement", error, 500);
    }
  }

  // Obtener todos los DeputyManagement
  async getAllDeputyManagement(req: Request, res: Response): Promise<any> {
    try {
      const result = await DeputyManagementService.findAll();
      return ResponseHelper.success(res, "Lista de DeputyManagement", result, 200);
    } catch (error) {
      logger.error(`[controller/deputymanagement/getAll]: ${error}`);
      return ResponseHelper.error(res, "Error al obtener DeputyManagement", error, 500);
    }
  }

  // Obtener un DeputyManagement por uuid
  async getDeputyManagementById(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }
      const result = await DeputyManagementService.findById(uuid);
      if (!result) {
        return ResponseHelper.error(res, "DeputyManagement no encontrado", null, 404);
      }
      return ResponseHelper.success(res, "DeputyManagement encontrado", result, 200);
    } catch (error) {
      logger.error(`[controller/deputymanagement/getById]: ${error}`);
      return ResponseHelper.error(res, "Error al obtener DeputyManagement", error, 500);
    }
  }

  // Actualizar un DeputyManagement
  async updateDeputyManagement(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      const body = req.body;
       if (!uuid || !body || !body.name) {
        return ResponseHelper.error(res, "Datos incompletos para actualizar updateDeputyManagement", null, 400);
      }
      const result = await DeputyManagementService.update(uuid, body);
      if (!result) {
        return ResponseHelper.error(res, "DeputyManagement no encontrado para actualizar", null, 404);
      }
      return ResponseHelper.success(res, "DeputyManagement actualizado con éxito", result, 200);
    } catch (error) {
      logger.error(`[controller/deputymanagement/update]: ${error}`);
      return ResponseHelper.error(res, "Error al actualizar DeputyManagement", error, 500);
    }
  }

  // Eliminar un DeputyManagement
  async deleteDeputyManagement(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "Datos incompletos para actualizar deleteDeputyManagement", null, 400);
      }
      const result = await DeputyManagementService.delete(uuid);
      if (!result) {
        return ResponseHelper.error(res, "DeputyManagement no encontrado para eliminar", null, 404);
      }
      return ResponseHelper.success(res, "DeputyManagement eliminado con éxito", null, 200);
    } catch (error) {
      logger.error(`[controller/deputymanagement/delete]: ${error}`);
      return ResponseHelper.error(res, "Error al eliminar DeputyManagement", error, 500);
    }
  }
}