import { Cat_agreementDAO } from '../daos/cat_agreement.dao';
import type ICat_agreement from '../interfaces/cat_agreement.interface';
import logger from '../../lib/logger';

export class Cat_agreementService {

  // Crear un nuevo Cat_agreement
  static async createCat_agreement(body: ICat_agreement) {
    try {
      const exists = await Cat_agreementDAO.findByName(body.name);
      if (exists) {
        return {
          ok: false,
          message: 'El Cat_agreement con nombre "${body.name}" ya está registrado.',
          code: 409
        };
      }

      const newCat_agreement = await Cat_agreementDAO.create(body);

      return {
        ok: true,
        message: 'Cat_agreement creado exitosamente.',
        data: newCat_agreement,
        code: 201
      };
    } catch (error) {
      logger.error('[Error/Cat_agreementService/createCat_agreement]: ' + error);
      return {
        ok: false,
        message: 'Error al crear el Cat_agreement.',
        code: 500
      };
    }
  }

  // Obtener todos los cat_agreements
  static async getAllCat_agreements() {
    try {
      const cat_agreements = await Cat_agreementDAO.findAll();
      return {
        ok: true,
        message: 'Cat_agreements obtenidos exitosamente.',
        data: cat_agreements,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/Cat_agreementService/getAllCat_agreements]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener cat_agreements.',
        code: 500
      };
    }
  }

  // Obtener rol por UUID
  static async getCat_agreementById(uuid: string) {
    try {
      const cat_agreement = await Cat_agreementDAO.findById(uuid);
      if (!cat_agreement) {
        return {
          ok: false,
          message: 'Cat_agreement no encontrado.',
          code: 404
        };
      }
      return {
        ok: true,
        message: 'Cat_agreement obtenido exitosamente.',
        data: cat_agreement,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/Cat_agreementService/getCat_agreementById]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener Cat_agreement.',
        code: 500
      };
    }
  }

  // Actualizar rol
  static async updateCat_agreement(uuid: string, body: ICat_agreement) {
    try {
      const updated = await Cat_agreementDAO.update(uuid, body);
      if (!updated) {
        return {
          ok: false,
          message: 'No se pudo actualizar el Cat_agreement.',
          code: 400
        };
      }
      return {
        ok: true,
        message: 'Cat_agreement actualizado exitosamente.',
        data: updated,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/Cat_agreementService/updateCat_agreement]: ${error}');
      return {
        ok: false,
        message: 'Error al actualizar Cat_agreement.',
        code: 500
      };
    }
  }

  // Eliminar rol
  static async deleteCat_agreement(uuid: string) {
    try {
      const deleted = await Cat_agreementDAO.delete(uuid);
      if (!deleted) {
        return {
          ok: false,
          message: 'No se pudo eliminar el Cat_agreement.',
          code: 400
        };
      }
      return {
        ok: true,
        message: 'Cat_agreement eliminado exitosamente.',
        data: deleted,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/Cat_agreementService/deleteCat_agreement]: ${error}');
      return {
        ok: false,
        message: 'Error al eliminar Cat_agreement.',
        code: 500
      };
    }
  }

  // Obtener rol por nombre (útil para validar duplicados)
  static async getCat_agreementByName(name: string) {
    try {
      const cat_agreement = await Cat_agreementDAO.findByName(name);
      if (!cat_agreement) {
        return { ok: false, message: 'Cat_agreement no encontrado.', code: 404 };
      }
      return { ok: true, data: cat_agreement, message: 'Cat_agreement encontrado.', code: 200 };
    } catch (error) {
      logger.error('[Error/Cat_agreementService/getCat_agreementByName]:'+ error);
      return { ok: false, message: 'Error al buscar Cat_agreement.', code: 500 };
    }
  }
}
