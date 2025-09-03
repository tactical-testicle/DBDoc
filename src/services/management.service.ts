import { ManagementDAO } from '../daos/management.dao';
import type IManagement from '../interfaces/management.interface';
import logger from '../../lib/logger';

export class ManagementService {

  // Crear un nuevo Management
  static async createManagement(body: IManagement) {
    try {
      const exists = await ManagementDAO.findByName(body.name);
      if (exists) {
        return {
          ok: false,
          message: 'El Management con nombre "${body.name}" ya está registrado.',
          code: 409
        };
      }

      const newManagement = await ManagementDAO.create(body);

      return {
        ok: true,
        message: 'Management creado exitosamente.',
        data: newManagement,
        code: 201
      };
    } catch (error) {
      logger.error('[Error/ManagementService/createManagement]: ' + error);
      return {
        ok: false,
        message: 'Error al crear el Management.',
        code: 500
      };
    }
  }

  // Obtener todos los managements
  static async getAllManagements() {
    try {
      const managements = await ManagementDAO.findAll();
      return {
        ok: true,
        message: 'Managements obtenidos exitosamente.',
        data: managements,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/ManagementService/getAllManagements]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener managements.',
        code: 500
      };
    }
  }

  // Obtener rol por UUID
  static async getManagementById(uuid: string) {
    try {
      const management = await ManagementDAO.findById(uuid);
      if (!management) {
        return {
          ok: false,
          message: 'Management no encontrado.',
          code: 404
        };
      }
      return {
        ok: true,
        message: 'Management obtenido exitosamente.',
        data: management,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/ManagementService/getManagementById]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener Management.',
        code: 500
      };
    }
  }

  // Actualizar rol
  static async updateManagement(uuid: string, body: IManagement) {
    try {
      const updated = await ManagementDAO.update(uuid, body);
      if (!updated) {
        return {
          ok: false,
          message: 'No se pudo actualizar el Management.',
          code: 400
        };
      }
      return {
        ok: true,
        message: 'Management actualizado exitosamente.',
        data: updated,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/ManagementService/updateManagement]: ${error}');
      return {
        ok: false,
        message: 'Error al actualizar Management.',
        code: 500
      };
    }
  }

  // Eliminar rol
  static async deleteManagement(uuid: string) {
    try {
      const deleted = await ManagementDAO.delete(uuid);
      if (!deleted) {
        return {
          ok: false,
          message: 'No se pudo eliminar el Management.',
          code: 400
        };
      }
      return {
        ok: true,
        message: 'Management eliminado exitosamente.',
        data: deleted,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/ManagementService/deleteManagement]: ${error}');
      return {
        ok: false,
        message: 'Error al eliminar Management.',
        code: 500
      };
    }
  }

  // Obtener rol por nombre (útil para validar duplicados)
  static async getManagementByName(name: string) {
    try {
      const management = await ManagementDAO.findByName(name);
      if (!management) {
        return { ok: false, message: 'Management no encontrado.', code: 404 };
      }
      return { ok: true, data: management, message: 'Management encontrado.', code: 200 };
    } catch (error) {
      logger.error('[Error/ManagementService/getManagementByName]:'+ error);
      return { ok: false, message: 'Error al buscar rol.', code: 500 };
    }
  }
}