import type { Request, Response } from "express";
import { AreaService } from "../services/area.service";
import { ResponseHelper } from "../helpers/response.helper";
import logger from "../../lib/logger";

export default class AreaController {
  // Crear un Area
  async createArea(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body;
      const result = await AreaService.create(body);
      return ResponseHelper.success(res, "Area creado con éxito", result, 201);
    } catch (error) {
      logger.error(`[controller/deputymanagement/create]: ${error}`);
      return ResponseHelper.error(res, "Error al crear Area", error, 500);
    }
  }

  // Obtener todos los Area
  async getAllArea(req: Request, res: Response): Promise<any> {
    try {
      const result = await AreaService.findAll();
      return ResponseHelper.success(res, "Lista de Area", result, 200);
    } catch (error) {
      logger.error(`[controller/deputymanagement/getAll]: ${error}`);
      return ResponseHelper.error(res, "Error al obtener Area", error, 500);
    }
  }

  // Obtener un Area por uuid
  async getAreaById(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }
      const result = await AreaService.findById(uuid);
      if (!result) {
        return ResponseHelper.error(res, "Area no encontrado", null, 404);
      }
      return ResponseHelper.success(res, "Area encontrado", result, 200);
    } catch (error) {
      logger.error(`[controller/deputymanagement/getById]: ${error}`);
      return ResponseHelper.error(res, "Error al obtener Area", error, 500);
    }
  }

  // Actualizar un Area
  async updateArea(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      const body = req.body;
       if (!uuid || !body || !body.name) {
        return ResponseHelper.error(res, "Datos incompletos para actualizar updateArea", null, 400);
      }
      const result = await AreaService.update(uuid, body);
      if (!result) {
        return ResponseHelper.error(res, "Area no encontrado para actualizar", null, 404);
      }
      return ResponseHelper.success(res, "Area actualizado con éxito", result, 200);
    } catch (error) {
      logger.error(`[controller/deputymanagement/update]: ${error}`);
      return ResponseHelper.error(res, "Error al actualizar Area", error, 500);
    }
  }

  // Eliminar un Area
  async deleteArea(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "Datos incompletos para actualizar deleteArea", null, 400);
      }
      const result = await AreaService.delete(uuid);
      if (!result) {
        return ResponseHelper.error(res, "Area no encontrado para eliminar", null, 404);
      }
      return ResponseHelper.success(res, "Area eliminado con éxito", null, 200);
    } catch (error) {
      logger.error(`[controller/deputymanagement/delete]: ${error}`);
      return ResponseHelper.error(res, "Error al eliminar Area", error, 500);
    }
  }
}