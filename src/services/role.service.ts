import { RoleDAO } from '../daos/role.dao';
import type IRole from '../interfaces/role.interface';
import logger from '../../lib/logger';

export class RoleService {

  // Crear un nuevo rol
  static async createRole(body: IRole) {
    try {
      const exists = await RoleDAO.findByName(body.name);
      if (exists) {
        return {
          ok: false,
          message: 'El rol con nombre "${body.name}" ya está registrado.',
          code: 409
        };
      }
console.log("2")
      const newRole = await RoleDAO.create(body);

      return {
        ok: true,
        message: 'Rol creado exitosamente.',
        data: newRole,
        code: 201
      };
    } catch (error) {
      logger.error('[Error/RoleService/createRole]: ' + error);
      return {
        ok: false,
        message: 'Error al crear el rol.',
        code: 500
      };
    }
  }

  // Obtener todos los roles
  static async getAllRoles() {
    try {
      const roles = await RoleDAO.findAll();
      return {
        ok: true,
        message: 'Roles obtenidos exitosamente.',
        data: roles,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/RoleService/getAllRoles]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener roles.',
        code: 500
      };
    }
  }

  // Obtener rol por UUID
  static async getRoleById(uuid: string) {
    try {
      const role = await RoleDAO.findById(uuid);
      if (!role) {
        return {
          ok: false,
          message: 'Rol no encontrado.',
          code: 404
        };
      }
      return {
        ok: true,
        message: 'Rol obtenido exitosamente.',
        data: role,
        code: 200
      };
    } catch (error) {
      logger.error('[Error/RoleService/getRoleById]: ${error}');
      return {
        ok: false,
        message: 'Error al obtener rol.',
        code: 500
      };
    }
  }

  // Actualizar rol
  static async updateRole(uuid: string, body: IRole) {
    try {
      const updated = await RoleDAO.update(uuid, body);
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
      logger.error('[Error/RoleService/updateRole]: ${error}');
      return {
        ok: false,
        message: 'Error al actualizar rol.',
        code: 500
      };
    }
  }

  // Eliminar rol
  static async deleteRole(uuid: string) {
    try {
      const deleted = await RoleDAO.delete(uuid);
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
      logger.error('[Error/RoleService/deleteRole]: ${error}');
      return {
        ok: false,
        message: 'Error al eliminar rol.',
        code: 500
      };
    }
  }

  // Obtener rol por nombre (útil para validar duplicados)
  static async getRoleByName(name: string) {
    try {
      const role = await RoleDAO.findByName(name);
      if (!role) {
        return { ok: false, message: 'Rol no encontrado.', code: 404 };
      }
      return { ok: true, data: role, message: 'Rol encontrado.', code: 200 };
    } catch (error) {
      logger.error('[Error/RoleService/getRoleByName]:'+ error);
      return { ok: false, message: 'Error al buscar rol.', code: 500 };
    }
  }
}