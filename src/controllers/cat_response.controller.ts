import type { Request, Response } from "express";
import { Cat_responseService } from "../services/cat_response.service";
import { ResponseHelper } from "../helpers/response.helper";
import logger from "../../lib/logger";

export default class Cat_responseController {

  // Crear un nuevo cat_response
  async createCat_response(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body;
      if (!body || !body.name) {
        return ResponseHelper.error(res, "No se recibieron datos válidos", null, 400);
      }

      const exist = await Cat_responseService.getCat_responseByName(body.name);
      if (exist.ok) {
        return ResponseHelper.error(res, "El cat_response que intentas crear ya existe", null, 409);
      }

      const response = await Cat_responseService.createCat_response(body);
      if (response.ok) {
        return ResponseHelper.success(res, "cat_response creado exitosamente", response, 201);
      } else {
        return ResponseHelper.error(res, "No se pudo crear el cat_response", null, 400);
      }
    } catch (error) {
      logger.error('[controller/cat_response/createCat_response]:'+ error);
      return ResponseHelper.error(res, "Error al crear cat_response", null, 500);
    }
  }

  // Obtener todos los cat_responses
  async getAllCat_responses(req: Request, res: Response): Promise<any> {
    try {
      const response = await Cat_responseService.getAllCat_responses();
      return ResponseHelper.success(res, "Cat_responses obtenidos correctamente", response, 200);
    } catch (error) {
      logger.error('[controller/cat_response/getAllCat_responses]: ${error}');
      return ResponseHelper.error(res, "Error al obtener cat_responses", null, 500);
    }
  }

  // Obtener un cat_response por UUID
  async getCat_responseById(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const response = await Cat_responseService.getCat_responseById(uuid);
      if (response.ok) {
        return ResponseHelper.success(res, "cat_response obtenido correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "cat_response no encontrado", null, 404);
      }
    } catch (error) {
      logger.error('[controller/cat_response/getCat_responseById]: ${error}');
      return ResponseHelper.error(res, "Error al obtener cat_response", null, 500);
    }
  }

  // Actualizar un cat_response
  async updateCat_response(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      const body = req.body;
      if (!uuid || !body || !body.name) {
        return ResponseHelper.error(res, "Datos incompletos para actualizar cat_response", null, 400);
      }

      const response = await Cat_responseService.updateCat_response(uuid, body);
      if (response.ok) {
        return ResponseHelper.success(res, "Rol actualizado correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo actualizar el cat_response", null, 400);
      }
    } catch (error) {
      logger.error('[controller/cat_response/updateCat_response]: ${error}');
      return ResponseHelper.error(res, "Error al actualizar cat_response", null, 500);
    }
  }

  // Eliminar un cat_response
  async deleteCat_response(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const response = await Cat_responseService.deleteCat_response(uuid);
      if (response.ok) {
        return ResponseHelper.success(res, "Rol eliminado correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo eliminar el cat_response", null, 400);
      }
    } catch (error) {
      logger.error('[controller/cat_response/deleteCat_response]: ${error}');
      return ResponseHelper.error(res, "Error al eliminar cat_response", null, 500);
    }
  }
}