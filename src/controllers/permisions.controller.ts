import type { Request, Response } from "express";
import { PermisionsService } from "../services/permisions.service";
import { ResponseHelper } from "../helpers/response.helper";
import logger from "../../lib/logger";

export default class PermisionsController {

  // Crear un nuevo permisions
  async createPermisions(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body;
      if (!body || !body.name) {
        return ResponseHelper.error(res, "No se recibieron datos válidos", null, 400);
      }

      const exist = await PermisionsService.getPermisionsByName(body.name);
      if (exist.ok) {
        return ResponseHelper.error(res, "El permisions que intentas crear ya existe", null, 409);
      }

      const response = await PermisionsService.createPermisions(body);
      if (response.ok) {
        return ResponseHelper.success(res, "permisions creado exitosamente", response, 201);
      } else {
        return ResponseHelper.error(res, "No se pudo crear el permisions", null, 400);
      }
    } catch (error) {
      logger.error('[controller/permisions/createPermisions]:'+ error);
      return ResponseHelper.error(res, "Error al crear permisions", null, 500);
    }
  }

  // Obtener todos los permisionss
  async getAllPermisionss(req: Request, res: Response): Promise<any> {
    try {
      const response = await PermisionsService.getAllPermisionss();
      return ResponseHelper.success(res, "Permisionss obtenidos correctamente", response, 200);
    } catch (error) {
      logger.error('[controller/permisions/getAllPermisionss]: ${error}');
      return ResponseHelper.error(res, "Error al obtener permisionss", null, 500);
    }
  }

  // Obtener un permisions por UUID
  async getPermisionsById(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const response = await PermisionsService.getPermisionsById(uuid);
      if (response.ok) {
        return ResponseHelper.success(res, "permisions obtenido correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "permisions no encontrado", null, 404);
      }
    } catch (error) {
      logger.error('[controller/permisions/getPermisionsById]: ${error}');
      return ResponseHelper.error(res, "Error al obtener permisions", null, 500);
    }
  }

  // Actualizar un permisions
  async updatePermisions(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      const body = req.body;
      if (!uuid || !body || !body.name) {
        return ResponseHelper.error(res, "Datos incompletos para actualizar permisions", null, 400);
      }

      const response = await PermisionsService.updatePermisions(uuid, body);
      if (response.ok) {
        return ResponseHelper.success(res, "Rol actualizado correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo actualizar el permisions", null, 400);
      }
    } catch (error) {
      logger.error('[controller/permisions/updatePermisions]: ${error}');
      return ResponseHelper.error(res, "Error al actualizar permisions", null, 500);
    }
  }

  // Eliminar un permisions
  async deletePermisions(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const response = await PermisionsService.deletePermisions(uuid);
      if (response.ok) {
        return ResponseHelper.success(res, "Rol eliminado correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo eliminar el permisions", null, 400);
      }
    } catch (error) {
      logger.error('[controller/permisions/deletePermisions]: ${error}');
      return ResponseHelper.error(res, "Error al eliminar permisions", null, 500);
    }
  }
}