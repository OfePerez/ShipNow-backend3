const DeliveryService = require("../services/deliveries.service");

class DeliveryController {
  static async create(req,res,next){ try { const d=await DeliveryService.create(req.body); res.status(201).json({status:"success",message:"Entrega creada correctamente",payload:d}); } catch(e){next(e);} }
  static async getAll(req,res,next){ try { const {deliveries,pagination}=await DeliveryService.getAll(req.query); res.json({status:"success",payload:deliveries,pagination}); } catch(e){next(e);} }
  static async getById(req,res,next){ try { res.json({status:"success",payload:await DeliveryService.getById(req.params.id)}); } catch(e){next(e);} }
  static async updateStatus(req,res,next){ try { const d=await DeliveryService.updateStatus(req.params.id,req.body.status); res.json({status:"success",message:"Estado de la entrega actualizado",payload:d}); } catch(e){next(e);} }
  static async addProof(req,res,next){ try { const d=await DeliveryService.addProof(req.params.id,req.file); res.status(201).json({status:"success",message:"Comprobante cargado correctamente",payload:d}); } catch(e){next(e);} }
}
module.exports = DeliveryController;
