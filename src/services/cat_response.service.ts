import { Cat_responseDAO } from '../daos/cat_response.dao';
import type ICat_response from '../interfaces/cat_response.interface';
import logger from '../../lib/logger';

export class Cat_responseService {

  // Crear un nuevo rol
  static async createCat_response(body: ICat_response) {
    try {
      const exists = await Cat_responseDAO.findByName(body.name);
      if (exists) {
        return {
          ok: false,
          message: 'El rol con nombre "${body.name}" ya está registrado.',
          code: 409
        };
      }
console.log("2")
      const newCat_response = await Cat_responseDAO.create(body);

      return {
        ok: true,
        message: 'Rol creado exitosamente.',
        data: newCat_response,
        code: 201
      };
    } catch (error) {
      logger.error('[Error/Cat_responseService/createCat_response]: ' + error);
      return {
        ok: false,
        message: 'Error al crear el rol.',
        code: 500
      };
    }
  }

  // Obtener todos los cat_response
  static async getAllCat_responses() {
    try {
      const cat_response = await Cat_responseDAO.findAll();
      return {
        ok: true,
        message: 'Cat_responses obtenidos exitosamente.',
        data: cat_response,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/Cat_responseService/getAllCat_responses]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener cat_response.',
        code: 500
      };
    }
  }

  // Obtener rol por UUID
  static async getCat_responseById(uuid: string) {
    try {
      const cat_response = await Cat_responseDAO.findById(uuid);
      if (!cat_response) {
        return {
          ok: false,
          message: 'Rol no encontrado.',
          code: 404
        };
      }
      return {
        ok: true,
        message: 'Rol obtenido exitosamente.',
        data: cat_response,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/Cat_responseService/getCat_responseById]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener rol.',
        code: 500
      };
    }
  }

  // Actualizar rol
  static async updateCat_response(uuid: string, body: ICat_response) {
    try {
      const updated = await Cat_responseDAO.update(uuid, body);
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
      logger.error('[Error/Cat_responseService/updateCat_response]: ${error}');
      return {
        ok: false,
        message: 'Error al actualizar rol.',
        code: 500
      };
    }
  }

  // Eliminar rol
  static async deleteCat_response(uuid: string) {
    try {
      const deleted = await Cat_responseDAO.delete(uuid);
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
      logger.error('[Error/Cat_responseService/deleteCat_response]: ${error}');
      return {
        ok: false,
        message: 'Error al eliminar rol.',
        code: 500
      };
    }
  }

  // Obtener rol por nombre (útil para validar duplicados)
  static async getCat_responseByName(name: string) {
    try {
      const cat_response = await Cat_responseDAO.findByName(name);
      if (!cat_response) {
        return { ok: false, message: 'Rol no encontrado.', code: 404 };
      }
      return { ok: true, data: cat_response, message: 'Rol encontrado.', code: 200 };
    } catch (error) {
      logger.error('[Error/Cat_responseService/getCat_responseByName]:'+ error);
      return { ok: false, message: 'Error al buscar rol.', code: 500 };
    }
  }
}