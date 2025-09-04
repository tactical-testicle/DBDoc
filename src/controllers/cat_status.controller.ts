import type { Request, Response } from "express";
import { Cat_statusService } from "../services/cat_status.service";
import { ResponseHelper } from "../helpers/response.helper";
import logger from "../../lib/logger";

export default class Cat_statusController {

  // Crear un nuevo cat_status
  async createCat_status(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body;
      if (!body || !body.name) {
        return ResponseHelper.error(res, "No se recibieron datos válidos", null, 400);
      }

      const exist = await Cat_statusService.getCat_statusByName(body.name);
      if (exist.ok) {
        return ResponseHelper.error(res, "El cat_status que intentas crear ya existe", null, 409);
      }

      const status = await Cat_statusService.createCat_status(body);
      if (status.ok) {
        return ResponseHelper.success(res, "cat_status creado exitosamente", status, 201);
      } else {
        return ResponseHelper.error(res, "No se pudo crear el cat_status", null, 400);
      }
    } catch (error) {
      logger.error('[controller/cat_status/createCat_status]:'+ error);
      return ResponseHelper.error(res, "Error al crear cat_status", null, 500);
    }
  }

  // Obtener todos los cat_statuss
  async getAllCat_statuss(req: Request, res: Response): Promise<any> {
    try {
      const status = await Cat_statusService.getAllCat_statuss();
      return ResponseHelper.success(res, "Cat_statuss obtenidos correctamente", status, 200);
    } catch (error) {
      logger.error('[controller/cat_status/getAllCat_statuss]: ${error}');
      return ResponseHelper.error(res, "Error al obtener cat_statuss", null, 500);
    }
  }

  // Obtener un cat_status por UUID
  async getCat_statusById(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const status = await Cat_statusService.getCat_statusById(uuid);
      if (status.ok) {
        return ResponseHelper.success(res, "cat_status obtenido correctamente", status, 200);
      } else {
        return ResponseHelper.error(res, "cat_status no encontrado", null, 404);
      }
    } catch (error) {
      logger.error('[controller/cat_status/getCat_statusById]: ${error}');
      return ResponseHelper.error(res, "Error al obtener cat_status", null, 500);
    }
  }

  // Actualizar un cat_status
  async updateCat_status(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      const body = req.body;
      if (!uuid || !body || !body.name) {
        return ResponseHelper.error(res, "Datos incompletos para actualizar cat_status", null, 400);
      }

      const status = await Cat_statusService.updateCat_status(uuid, body);
      if (status.ok) {
        return ResponseHelper.success(res, "Rol actualizado correctamente", status, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo actualizar el cat_status", null, 400);
      }
    } catch (error) {
      logger.error('[controller/cat_status/updateCat_status]: ${error}');
      return ResponseHelper.error(res, "Error al actualizar cat_status", null, 500);
    }
  }

  // Eliminar un cat_status
  async deleteCat_status(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const status = await Cat_statusService.deleteCat_status(uuid);
      if (status.ok) {
        return ResponseHelper.success(res, "Rol eliminado correctamente", status, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo eliminar el cat_status", null, 400);
      }
    } catch (error) {
      logger.error('[controller/cat_status/deleteCat_status]: ${error}');
      return ResponseHelper.error(res, "Error al eliminar cat_status", null, 500);
    }
  }
}