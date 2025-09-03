import type { Request, Response } from "express";
import { Cat_typedocumentService } from "../services/cat_typedocument.service";
import { ResponseHelper } from "../helpers/response.helper";
import logger from "../../lib/logger";

export default class Cat_typedocumentController {

  // Crear un nuevo cat_typedocument
  async createCat_typedocument(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body;
      if (!body || !body.name) {
        return ResponseHelper.error(res, "No se recibieron datos válidos", null, 400);
      }

      const exist = await Cat_typedocumentService.getCat_typedocumentByName(body.name);
      if (exist.ok) {
        return ResponseHelper.error(res, "El cat_typedocument que intentas crear ya existe", null, 409);
      }

      const response = await Cat_typedocumentService.createCat_typedocument(body);
      if (response.ok) {
        return ResponseHelper.success(res, "cat_typedocument creado exitosamente", response, 201);
      } else {
        return ResponseHelper.error(res, "No se pudo crear el cat_typedocument", null, 400);
      }
    } catch (error) {
      logger.error('[controller/cat_typedocument/createCat_typedocument]:'+ error);
      return ResponseHelper.error(res, "Error al crear cat_typedocument", null, 500);
    }
  }

  // Obtener todos los cat_typedocuments
  async getAllCat_typedocuments(req: Request, res: Response): Promise<any> {
    try {
      const response = await Cat_typedocumentService.getAllCat_typedocuments();
      return ResponseHelper.success(res, "Cat_typedocuments obtenidos correctamente", response, 200);
    } catch (error) {
      logger.error('[controller/cat_typedocument/getAllCat_typedocuments]: ${error}');
      return ResponseHelper.error(res, "Error al obtener cat_typedocuments", null, 500);
    }
  }

  // Obtener un cat_typedocument por UUID
  async getCat_typedocumentById(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const response = await Cat_typedocumentService.getCat_typedocumentById(uuid);
      if (response.ok) {
        return ResponseHelper.success(res, "cat_typedocument obtenido correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "cat_typedocument no encontrado", null, 404);
      }
    } catch (error) {
      logger.error('[controller/cat_typedocument/getCat_typedocumentById]: ${error}');
      return ResponseHelper.error(res, "Error al obtener rol", null, 500);
    }
  }

  // Actualizar un cat_typedocument
  async updateCat_typedocument(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      const body = req.body;
      if (!uuid || !body || !body.name) {
        return ResponseHelper.error(res, "Datos incompletos para actualizar cat_typedocument", null, 400);
      }

      const response = await Cat_typedocumentService.updateCat_typedocument(uuid, body);
      if (response.ok) {
        return ResponseHelper.success(res, "Rol actualizado correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo actualizar el cat_typedocument", null, 400);
      }
    } catch (error) {
      logger.error('[controller/cat_typedocument/updateCat_typedocument]: ${error}');
      return ResponseHelper.error(res, "Error al actualizar cat_typedocument", null, 500);
    }
  }

  // Eliminar un cat_typedocument
  async deleteCat_typedocument(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const response = await Cat_typedocumentService.deleteCat_typedocument(uuid);
      if (response.ok) {
        return ResponseHelper.success(res, "cat_typedocument eliminado correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo eliminar el cat_typedocument", null, 400);
      }
    } catch (error) {
      logger.error('[controller/cat_typedocument/deleteCat_typedocument]: ${error}');
      return ResponseHelper.error(res, "Error al eliminar cat_typedocument", null, 500);
    }
  }
}