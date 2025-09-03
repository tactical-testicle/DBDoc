import type { Request, Response } from "express";
import { ManagementService } from "../services/management.service";
import { ResponseHelper } from "../helpers/response.helper";
import logger from "../../lib/logger";

export default class ManagementController {

  // Crear un nuevo rol
  async createManagement(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body;
      if (!body || !body.name) {
        return ResponseHelper.error(res, "No se recibieron datos válidos", null, 400);
      }

      const exist = await ManagementService.getManagementByName(body.name);
      if (exist.ok) {
        return ResponseHelper.error(res, "El management que intentas crear ya existe", null, 409);
      }

      const response = await ManagementService.createManagement(body);
      if (response.ok) {
        return ResponseHelper.success(res, "management creado exitosamente", response, 201);
      } else {
        return ResponseHelper.error(res, "No se pudo crear el management", null, 400);
      }
    } catch (error) {
      logger.error('[controller/management/createManagement]:'+ error);
      return ResponseHelper.error(res, "Error al crear management", null, 500);
    }
  }

  // Obtener todos los managements
  async getAllManagements(req: Request, res: Response): Promise<any> {
    try {
      const response = await ManagementService.getAllManagements();
      return ResponseHelper.success(res, "Managements obtenidos correctamente", response, 200);
    } catch (error) {
      logger.error('[controller/management/getAllManagements]: ${error}');
      return ResponseHelper.error(res, "Error al obtener managements", null, 500);
    }
  }

  // Obtener un rol por UUID
  async getManagementById(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const response = await ManagementService.getManagementById(uuid);
      if (response.ok) {
        return ResponseHelper.success(res, "management obtenido correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "management no encontrado", null, 404);
      }
    } catch (error) {
      logger.error('[controller/management/getManagementById]: ${error}');
      return ResponseHelper.error(res, "Error al obtener rol", null, 500);
    }
  }

  // Actualizar un management
  async updateManagement(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      const body = req.body;
      if (!uuid || !body || !body.name) {
        return ResponseHelper.error(res, "Datos incompletos para actualizar management", null, 400);
      }

      const response = await ManagementService.updateManagement(uuid, body);
      if (response.ok) {
        return ResponseHelper.success(res, "Rol actualizado correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo actualizar el management", null, 400);
      }
    } catch (error) {
      logger.error('[controller/management/updateManagement]: ${error}');
      return ResponseHelper.error(res, "Error al actualizar management", null, 500);
    }
  }

  // Eliminar un management
  async deleteManagement(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const response = await ManagementService.deleteManagement(uuid);
      if (response.ok) {
        return ResponseHelper.success(res, "Rol eliminado correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo eliminar el management", null, 400);
      }
    } catch (error) {
      logger.error('[controller/management/deleteManagement]: ${error}');
      return ResponseHelper.error(res, "Error al eliminar management", null, 500);
    }
  }
}