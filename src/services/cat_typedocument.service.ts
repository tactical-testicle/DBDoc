import { Cat_typedocumentDAO } from '../daos/cat_typedocument.dao';
import type ICat_typedocument from '../interfaces/cat_typedocument.interface';
import logger from '../../lib/logger';

export class Cat_typedocumentService {

  // Crear un nuevo Cat_typedocument
  static async createCat_typedocument(body: ICat_typedocument) {
    try {
      const exists = await Cat_typedocumentDAO.findByName(body.name);
      if (exists) {
        return {
          ok: false,
          message: 'El Cat_typedocument con nombre "${body.name}" ya está registrado.',
          code: 409
        };
      }

      const newCat_typedocument = await Cat_typedocumentDAO.create(body);

      return {
        ok: true,
        message: 'Cat_typedocument creado exitosamente.',
        data: newCat_typedocument,
        code: 201
      };
    } catch (error) {
      logger.error('[Error/Cat_typedocumentService/createCat_typedocument]: ' + error);
      return {
        ok: false,
        message: 'Error al crear el Cat_typedocument.',
        code: 500
      };
    }
  }

  // Obtener todos los cat_typedocuments
  static async getAllCat_typedocuments() {
    try {
      const cat_typedocuments = await Cat_typedocumentDAO.findAll();
      return {
        ok: true,
        message: 'Cat_typedocuments obtenidos exitosamente.',
        data: cat_typedocuments,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/Cat_typedocumentService/getAllCat_typedocuments]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener cat_typedocuments.',
        code: 500
      };
    }
  }

  // Obtener rol por UUID
  static async getCat_typedocumentById(uuid: string) {
    try {
      const cat_typedocument = await Cat_typedocumentDAO.findById(uuid);
      if (!cat_typedocument) {
        return {
          ok: false,
          message: 'Cat_typedocument no encontrado.',
          code: 404
        };
      }
      return {
        ok: true,
        message: 'Cat_typedocument obtenido exitosamente.',
        data: cat_typedocument,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/Cat_typedocumentService/getCat_typedocumentById]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener Cat_typedocument.',
        code: 500
      };
    }
  }

  // Actualizar rol
  static async updateCat_typedocument(uuid: string, body: ICat_typedocument) {
    try {
      const updated = await Cat_typedocumentDAO.update(uuid, body);
      if (!updated) {
        return {
          ok: false,
          message: 'No se pudo actualizar el Cat_typedocument.',
          code: 400
        };
      }
      return {
        ok: true,
        message: 'Cat_typedocument actualizado exitosamente.',
        data: updated,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/Cat_typedocumentService/updateCat_typedocument]: ${error}');
      return {
        ok: false,
        message: 'Error al actualizar Cat_typedocument.',
        code: 500
      };
    }
  }

  // Eliminar rol
  static async deleteCat_typedocument(uuid: string) {
    try {
      const deleted = await Cat_typedocumentDAO.delete(uuid);
      if (!deleted) {
        return {
          ok: false,
          message: 'No se pudo eliminar el Cat_typedocument.',
          code: 400
        };
      }
      return {
        ok: true,
        message: 'Cat_typedocument eliminado exitosamente.',
        data: deleted,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/Cat_typedocumentService/deleteCat_typedocument]: ${error}');
      return {
        ok: false,
        message: 'Error al eliminar Cat_typedocument.',
        code: 500
      };
    }
  }

  // Obtener rol por nombre (útil para validar duplicados)
  static async getCat_typedocumentByName(name: string) {
    try {
      const cat_typedocument = await Cat_typedocumentDAO.findByName(name);
      if (!cat_typedocument) {
        return { ok: false, message: 'Cat_typedocument no encontrado.', code: 404 };
      }
      return { ok: true, data: cat_typedocument, message: 'Cat_typedocument encontrado.', code: 200 };
    } catch (error) {
      logger.error('[Error/Cat_typedocumentService/getCat_typedocumentByName]:'+ error);
      return { ok: false, message: 'Error al buscar Cat_typedocument.', code: 500 };
    }
  }
}
