import { Request, Response } from "express";
import { DocumentService } from "../services/document.service";
import { ResponseHelper } from "../helpers/response.helper";

export class DocumentController {
    static async create(req: Request, res: Response) {
        try {
            const result = await DocumentService.create(req.body);
            return ResponseHelper.success(res, "Document created successfully", result);
        } catch (error) {
            return ResponseHelper.error(res, "Error creating document", error);
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const result = await DocumentService.findAll();
            return ResponseHelper.success(res, "Documents retrieved successfully", result);
        } catch (error) {
            return ResponseHelper.error(res, "Error fetching documents", error);
        }
    }

    static async findById(req: Request, res: Response) {
        try {
            const { uuid } = req.params;
            if (!uuid) {
                return res.status(400).json({ ok: false, message: "UUID requerido" });
            }
            const result = await DocumentService.findById(uuid);
            if (!result) {
                return ResponseHelper.error(res, "Document not found", null, 404);
            }
            return ResponseHelper.success(res, "Document found", result);
        } catch (error) {
            return ResponseHelper.error(res, "Error fetching document", error);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { uuid } = req.params;
            if (!uuid) {
                return res.status(400).json({ ok: false, message: "UUID requerido" });
            }
            const result = await DocumentService.update(uuid, req.body);
            return ResponseHelper.success(res, "Document updated successfully", result);
        } catch (error) {
            return ResponseHelper.error(res, "Error updating document", error);
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { uuid } = req.params;
            if (!uuid) {
                return res.status(400).json({ ok: false, message: "UUID requerido" });
            }
            const result = await DocumentService.delete(uuid);
            if (!result) {
                return ResponseHelper.error(res, "Document not found", null, 404);
            }
            return ResponseHelper.success(res, "Document deleted successfully", null);
        } catch (error) {
            return ResponseHelper.error(res, "Error deleting document", error);
        }
    }
}