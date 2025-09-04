import { Cat_statusDAO } from '../daos/cat_status.dao';
import type ICat_status from '../interfaces/cat_status.interface';
import logger from '../../lib/logger';

export class Cat_statusService {

  // Crear un nuevo rol
  static async createCat_status(body: ICat_status) {
    try {
      const exists = await Cat_statusDAO.findByName(body.name);
      if (exists) {
        return {
          ok: false,
          message: 'El rol con nombre "${body.name}" ya está registrado.',
          code: 409
        };
      }
console.log("2")
      const newCat_status = await Cat_statusDAO.create(body);

      return {
        ok: true,
        message: 'Rol creado exitosamente.',
        data: newCat_status,
        code: 201
      };
    } catch (error) {
      logger.error('[Error/Cat_statusService/createCat_status]: ' + error);
      return {
        ok: false,
        message: 'Error al crear el rol.',
        code: 500
      };
    }
  }

  // Obtener todos los cat_status
  static async getAllCat_statuss() {
    try {
      const cat_status = await Cat_statusDAO.findAll();
      return {
        ok: true,
        message: 'Cat_statuss obtenidos exitosamente.',
        data: cat_status,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/Cat_statusService/getAllCat_statuss]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener cat_status.',
        code: 500
      };
    }
  }

  // Obtener rol por UUID
  static async getCat_statusById(uuid: string) {
    try {
      const cat_status = await Cat_statusDAO.findById(uuid);
      if (!cat_status) {
        return {
          ok: false,
          message: 'Rol no encontrado.',
          code: 404
        };
      }
      return {
        ok: true,
        message: 'Rol obtenido exitosamente.',
        data: cat_status,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/Cat_statusService/getCat_statusById]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener rol.',
        code: 500
      };
    }
  }

  // Actualizar rol
  static async updateCat_status(uuid: string, body: ICat_status) {
    try {
      const updated = await Cat_statusDAO.update(uuid, body);
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
      logger.error('[Error/Cat_statusService/updateCat_status]: ${error}');
      return {
        ok: false,
        message: 'Error al actualizar rol.',
        code: 500
      };
    }
  }

  // Eliminar rol
  static async deleteCat_status(uuid: string) {
    try {
      const deleted = await Cat_statusDAO.delete(uuid);
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
      logger.error('[Error/Cat_statusService/deleteCat_status]: ${error}');
      return {
        ok: false,
        message: 'Error al eliminar rol.',
        code: 500
      };
    }
  }

  // Obtener rol por nombre (útil para validar duplicados)
  static async getCat_statusByName(name: string) {
    try {
      const cat_status = await Cat_statusDAO.findByName(name);
      if (!cat_status) {
        return { ok: false, message: 'Rol no encontrado.', code: 404 };
      }
      return { ok: true, data: cat_status, message: 'Rol encontrado.', code: 200 };
    } catch (error) {
      logger.error('[Error/Cat_statusService/getCat_statusByName]:'+ error);
      return { ok: false, message: 'Error al buscar rol.', code: 500 };
    }
  }
}