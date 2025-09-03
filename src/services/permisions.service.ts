import { PermisionsDAO } from '../daos/permisions.dao';
import type IPermisions from '../interfaces/permisions.interface';
import logger from '../../lib/logger';

export class PermisionsService {

  // Crear un nuevo rol
  static async createPermisions(body: IPermisions) {
    try {
      const exists = await PermisionsDAO.findByName(body.name);
      if (exists) {
        return {
          ok: false,
          message: 'El rol con nombre "${body.name}" ya está registrado.',
          code: 409
        };
      }
console.log("2")
      const newPermisions = await PermisionsDAO.create(body);

      return {
        ok: true,
        message: 'Rol creado exitosamente.',
        data: newPermisions,
        code: 201
      };
    } catch (error) {
      logger.error('[Error/PermisionsService/createPermisions]: ' + error);
      return {
        ok: false,
        message: 'Error al crear el rol.',
        code: 500
      };
    }
  }

  // Obtener todos los permisionss
  static async getAllPermisionss() {
    try {
      const permisionss = await PermisionsDAO.findAll();
      return {
        ok: true,
        message: 'Permisionss obtenidos exitosamente.',
        data: permisionss,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/PermisionsService/getAllPermisionss]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener permisionss.',
        code: 500
      };
    }
  }

  // Obtener rol por UUID
  static async getPermisionsById(uuid: string) {
    try {
      const permisions = await PermisionsDAO.findById(uuid);
      if (!permisions) {
        return {
          ok: false,
          message: 'Rol no encontrado.',
          code: 404
        };
      }
      return {
        ok: true,
        message: 'Rol obtenido exitosamente.',
        data: permisions,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/PermisionsService/getPermisionsById]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener rol.',
        code: 500
      };
    }
  }

  // Actualizar rol
  static async updatePermisions(uuid: string, body: IPermisions) {
    try {
      const updated = await PermisionsDAO.update(uuid, body);
      if (!updated) {
        return {
          ok: false,
          message: 'No se pudo actualizar el rol.',
          code: 400
        };
      }
      return {
        ok: true,
        message: 'Rol actualizado exitosamente.',
        data: updated,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/PermisionsService/updatePermisions]: ${error}');
      return {
        ok: false,
        message: 'Error al actualizar rol.',
        code: 500
      };
    }
  }

  // Eliminar rol
  static async deletePermisions(uuid: string) {
    try {
      const deleted = await PermisionsDAO.delete(uuid);
      if (!deleted) {
        return {
          ok: false,
          message: 'No se pudo eliminar el rol.',
          code: 400
        };
      }
      return {
        ok: true,
        message: 'Rol eliminado exitosamente.',
        data: deleted,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/PermisionsService/deletePermisions]: ${error}');
      return {
        ok: false,
        message: 'Error al eliminar rol.',
        code: 500
      };
    }
  }

  // Obtener rol por nombre (útil para validar duplicados)
  static async getPermisionsByName(name: string) {
    try {
      const permisions = await PermisionsDAO.findByName(name);
      if (!permisions) {
        return { ok: false, message: 'Rol no encontrado.', code: 404 };
      }
      return { ok: true, data: permisions, message: 'Rol encontrado.', code: 200 };
    } catch (error) {
      logger.error('[Error/PermisionsService/getPermisionsByName]:'+ error);
      return { ok: false, message: 'Error al buscar rol.', code: 500 };
    }
  }
}