import type { Request, Response } from "express";
import { Cat_agreementService } from "../services/cat_agreement.service";
import { ResponseHelper } from "../helpers/response.helper";
import logger from "../../lib/logger";

export default class Cat_agreementController {

  // Crear un nuevo cat_agreement
  async createCat_agreement(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body;
      if (!body || !body.name) {
        return ResponseHelper.error(res, "No se recibieron datos válidos", null, 400);
      }

      const exist = await Cat_agreementService.getCat_agreementByName(body.name);
      if (exist.ok) {
        return ResponseHelper.error(res, "El cat_agreement que intentas crear ya existe", null, 409);
      }

      const response = await Cat_agreementService.createCat_agreement(body);
      if (response.ok) {
        return ResponseHelper.success(res, "cat_agreement creado exitosamente", response, 201);
      } else {
        return ResponseHelper.error(res, "No se pudo crear el cat_agreement", null, 400);
      }
    } catch (error) {
      logger.error('[controller/cat_agreement/createCat_agreement]:'+ error);
      return ResponseHelper.error(res, "Error al crear cat_agreement", null, 500);
    }
  }

  // Obtener todos los cat_typedocuments
  async getAllCat_agreements(req: Request, res: Response): Promise<any> {
    try {
      const response = await Cat_agreementService.getAllCat_agreements();
      return ResponseHelper.success(res, "Cat_agreements obtenidos correctamente", response, 200);
    } catch (error) {
      logger.error('[controller/cat_agreement/getAllCat_agreements]: ${error}');
      return ResponseHelper.error(res, "Error al obtener cat_typedocuments", null, 500);
    }
  }

  // Obtener un cat_agreement por UUID
  async getCat_agreementById(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const response = await Cat_agreementService.getCat_agreementById(uuid);
      if (response.ok) {
        return ResponseHelper.success(res, "cat_agreement obtenido correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "cat_agreement no encontrado", null, 404);
      }
    } catch (error) {
      logger.error('[controller/cat_agreement/getCat_agreementById]: ${error}');
      return ResponseHelper.error(res, "Error al obtener rol", null, 500);
    }
  }

  // Actualizar un cat_agreement
  async updateCat_agreement(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      const body = req.body;
      if (!uuid || !body || !body.name) {
        return ResponseHelper.error(res, "Datos incompletos para actualizar cat_agreement", null, 400);
      }

      const response = await Cat_agreementService.updateCat_agreement(uuid, body);
      if (response.ok) {
        return ResponseHelper.success(res, "Rol actualizado correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo actualizar el cat_agreement", null, 400);
      }
    } catch (error) {
      logger.error('[controller/cat_agreement/updateCat_agreement]: ${error}');
      return ResponseHelper.error(res, "Error al actualizar cat_agreement", null, 500);
    }
  }

  // Eliminar un cat_agreement
  async deleteCat_agreement(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const response = await Cat_agreementService.deleteCat_agreement(uuid);
      if (response.ok) {
        return ResponseHelper.success(res, "cat_agreement eliminado correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo eliminar el cat_agreement", null, 400);
      }
    } catch (error) {
      logger.error('[controller/cat_agreement/deleteCat_agreement]: ${error}');
      return ResponseHelper.error(res, "Error al eliminar cat_agreement", null, 500);
    }
  }
}