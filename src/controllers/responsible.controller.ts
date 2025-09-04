import type { Request, Response } from "express";
import { ResponsibleService } from "../services/responsible.service";
import { ResponseHelper } from "../helpers/response.helper";
import logger from "../../lib/logger";

export default class ResponsibleController {

  // Crear un nuevo responsible
  async createResponsible(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body;
      if (!body || !body.name) {
        return ResponseHelper.error(res, "No se recibieron datos válidos", null, 400);
      }

      const exist = await ResponsibleService.getResponsibleByName(body.name);
      if (exist.ok) {
        return ResponseHelper.error(res, "El responsible que intentas crear ya existe", null, 409);
      }

      const response = await ResponsibleService.createResponsible(body);
      if (response.ok) {
        return ResponseHelper.success(res, "responsible creado exitosamente", response, 201);
      } else {
        return ResponseHelper.error(res, "No se pudo crear el responsible", null, 400);
      }
    } catch (error) {
      logger.error('[controller/responsible/createResponsible]:'+ error);
      return ResponseHelper.error(res, "Error al crear responsible", null, 500);
    }
  }

  // Obtener todos los responsibles
  async getAllResponsibles(req: Request, res: Response): Promise<any> {
    try {
      const response = await ResponsibleService.getAllResponsibles();
      return ResponseHelper.success(res, "Responsibles obtenidos correctamente", response, 200);
    } catch (error) {
      logger.error('[controller/responsible/getAllResponsibles]: ${error}');
      return ResponseHelper.error(res, "Error al obtener responsibles", null, 500);
    }
  }

  // Obtener un responsible por UUID
  async getResponsibleById(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const response = await ResponsibleService.getResponsibleById(uuid);
      if (response.ok) {
        return ResponseHelper.success(res, "responsible obtenido correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "responsible no encontrado", null, 404);
      }
    } catch (error) {
      logger.error('[controller/responsible/getResponsibleById]: ${error}');
      return ResponseHelper.error(res, "Error al obtener responsible", null, 500);
    }
  }

  // Actualizar un responsible
  async updateResponsible(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      const body = req.body;
      if (!uuid || !body || !body.name) {
        return ResponseHelper.error(res, "Datos incompletos para actualizar responsible", null, 400);
      }

      const response = await ResponsibleService.updateResponsible(uuid, body);
      if (response.ok) {
        return ResponseHelper.success(res, "Rol actualizado correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo actualizar el responsible", null, 400);
      }
    } catch (error) {
      logger.error('[controller/responsible/updateResponsible]: ${error}');
      return ResponseHelper.error(res, "Error al actualizar responsible", null, 500);
    }
  }

  // Eliminar un responsible
  async deleteResponsible(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const response = await ResponsibleService.deleteResponsible(uuid);
      if (response.ok) {
        return ResponseHelper.success(res, "Rol eliminado correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo eliminar el responsible", null, 400);
      }
    } catch (error) {
      logger.error('[controller/responsible/deleteResponsible]: ${error}');
      return ResponseHelper.error(res, "Error al eliminar responsible", null, 500);
    }
  }
}