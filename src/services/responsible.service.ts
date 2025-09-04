import { ResponsibleDAO } from '../daos/responsible.dao';
import type IResponsible from '../interfaces/responsible.interface';
import logger from '../../lib/logger';

export class ResponsibleService {

  // Crear un nuevo rol
  static async createResponsible(body: IResponsible) {
    try {
      const exists = await ResponsibleDAO.findByName(body.name);
      if (exists) {
        return {
          ok: false,
          message: 'El rol con nombre "${body.name}" ya está registrado.',
          code: 409
        };
      }
console.log("2")
      const newResponsible = await ResponsibleDAO.create(body);

      return {
        ok: true,
        message: 'Rol creado exitosamente.',
        data: newResponsible,
        code: 201
      };
    } catch (error) {
      logger.error('[Error/ResponsibleService/createResponsible]: ' + error);
      return {
        ok: false,
        message: 'Error al crear el rol.',
        code: 500
      };
    }
  }

  // Obtener todos los responsible
  static async getAllResponsibles() {
    try {
      const responsible = await ResponsibleDAO.findAll();
      return {
        ok: true,
        message: 'Responsibles obtenidos exitosamente.',
        data: responsible,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/ResponsibleService/getAllResponsibles]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener responsible.',
        code: 500
      };
    }
  }

  // Obtener rol por UUID
  static async getResponsibleById(uuid: string) {
    try {
      const responsible = await ResponsibleDAO.findById(uuid);
      if (!responsible) {
        return {
          ok: false,
          message: 'Rol no encontrado.',
          code: 404
        };
      }
      return {
        ok: true,
        message: 'Rol obtenido exitosamente.',
        data: responsible,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/ResponsibleService/getResponsibleById]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener rol.',
        code: 500
      };
    }
  }

  // Actualizar rol
  static async updateResponsible(uuid: string, body: IResponsible) {
    try {
      const updated = await ResponsibleDAO.update(uuid, body);
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
      logger.error('[Error/ResponsibleService/updateResponsible]: ${error}');
      return {
        ok: false,
        message: 'Error al actualizar rol.',
        code: 500
      };
    }
  }

  // Eliminar rol
  static async deleteResponsible(uuid: string) {
    try {
      const deleted = await ResponsibleDAO.delete(uuid);
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
      logger.error('[Error/ResponsibleService/deleteResponsible]: ${error}');
      return {
        ok: false,
        message: 'Error al eliminar rol.',
        code: 500
      };
    }
  }

  // Obtener rol por nombre (útil para validar duplicados)
  static async getResponsibleByName(name: string) {
    try {
      const responsible = await ResponsibleDAO.findByName(name);
      if (!responsible) {
        return { ok: false, message: 'Rol no encontrado.', code: 404 };
      }
      return { ok: true, data: responsible, message: 'Rol encontrado.', code: 200 };
    } catch (error) {
      logger.error('[Error/ResponsibleService/getResponsibleByName]:'+ error);
      return { ok: false, message: 'Error al buscar rol.', code: 500 };
    }
  }
}