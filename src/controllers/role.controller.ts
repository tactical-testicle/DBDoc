import type { Request, Response } from "express";
import { RoleService } from "../services/role.service";
import { ResponseHelper } from "../helpers/response.helper";
import logger from "../../lib/logger";

export default class RoleController {

  // Crear un nuevo rol
  async createRole(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body;
      if (!body || !body.name) {
        return ResponseHelper.error(res, "No se recibieron datos válidos", null, 400);
      }

      const exist = await RoleService.getRoleByName(body.name);
      if (exist.ok) {
        return ResponseHelper.error(res, "El rol que intentas crear ya existe", null, 409);
      }

      const response = await RoleService.createRole(body);
      if (response.ok) {
        return ResponseHelper.success(res, "Rol creado exitosamente", response, 201);
      } else {
        return ResponseHelper.error(res, "No se pudo crear el rol", null, 400);
      }
    } catch (error) {
      logger.error('[controller/role/createRole]:'+ error);
      return ResponseHelper.error(res, "Error al crear rol", null, 500);
    }
  }

  // Obtener todos los roles
  async getAllRoles(req: Request, res: Response): Promise<any> {
    try {
      const response = await RoleService.getAllRoles();
      return ResponseHelper.success(res, "Roles obtenidos correctamente", response, 200);
    } catch (error) {
      logger.error('[controller/role/getAllRoles]: ${error}');
      return ResponseHelper.error(res, "Error al obtener roles", null, 500);
    }
  }

  // Obtener un rol por UUID
  async getRoleById(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const response = await RoleService.getRoleById(uuid);
      if (response.ok) {
        return ResponseHelper.success(res, "Rol obtenido correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "Rol no encontrado", null, 404);
      }
    } catch (error) {
      logger.error('[controller/role/getRoleById]: ${error}');
      return ResponseHelper.error(res, "Error al obtener rol", null, 500);
    }
  }

  // Actualizar un rol
  async updateRole(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      const body = req.body;
      if (!uuid || !body || !body.name) {
        return ResponseHelper.error(res, "Datos incompletos para actualizar rol", null, 400);
      }

      const response = await RoleService.updateRole(uuid, body);
      if (response.ok) {
        return ResponseHelper.success(res, "Rol actualizado correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo actualizar el rol", null, 400);
      }
    } catch (error) {
      logger.error('[controller/role/updateRole]: ${error}');
      return ResponseHelper.error(res, "Error al actualizar rol", null, 500);
    }
  }

  // Eliminar un rol
  async deleteRole(req: Request, res: Response): Promise<any> {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return ResponseHelper.error(res, "UUID no proporcionado", null, 400);
      }

      const response = await RoleService.deleteRole(uuid);
      if (response.ok) {
        return ResponseHelper.success(res, "Rol eliminado correctamente", response, 200);
      } else {
        return ResponseHelper.error(res, "No se pudo eliminar el rol", null, 400);
      }
    } catch (error) {
      logger.error('[controller/role/deleteRole]: ${error}');
      return ResponseHelper.error(res, "Error al eliminar rol", null, 500);
    }
  }
}