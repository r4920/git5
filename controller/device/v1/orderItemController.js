/**
 * orderItemController.js
 * @description : exports action methods for orderItem.
 */

const OrderItem = require('../../../model/orderItem');
const orderItemSchemaKey = require('../../../utils/validation/orderItemValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectID = require('mongodb').ObjectID;
const utils = require('../../../utils/common.js');
   
/**
 * @description : create document of OrderItem in mongodb collection.
 * @param {obj} req : request including body for creating document.
 * @param {obj} res : response of created document
 * @return {obj} : created OrderItem. {status, message, data}
 */ 
const addOrderItem = async (req, res) => {
  try {
    let validateRequest = validation.validateParamsWithJoi(
      req.body,
      orderItemSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.inValidParam({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    let data = new OrderItem({
      ...req.body
      ,addedBy:req.user.id
    });
    let result = await dbService.createDocument(OrderItem,data);
    return  res.ok({ data : result });
  } catch (error) {
    if (error.name === 'ValidationError'){
      return res.validationError({ message : `Invalid Data, Validation Failed at ${ error.message}` });
    }
    if (error.code && error.code == 11000){
      return res.isDuplicate();
    }
    return res.failureResponse({ data:error.message }); 
  }
};
    
/**
 * @description : find all documents of OrderItem from collection based on query and options.
 * @param {obj} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {obj} res : response contains data found from collection.
 * @return {obj} : found OrderItem(s). {status, message, data}
 */
const findAllOrderItem = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      orderItemSchemaKey.findFilterKeys,
      OrderItem.schema.obj
    );

    if (!validateRequest.isValid) {
      return res.inValidParam({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.countDocument(OrderItem, query);
      return res.ok({ data: { totalRecords } });
    }
        
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let result = await dbService.getAllDocuments( OrderItem,query,options);
    if (result && result.data && result.data.length){
      return res.ok({ data :result });   
    }
    return res.recordNotFound();
  } catch (error){
    return res.failureResponse({ data:error.message });
  }
};
    
/**
 * @description : returns total number of documents of OrderItem.
 * @param {obj} req : request including where object to apply filters in req body 
 * @param {obj} res : response that returns total number of documents.
 * @return {obj} : number of documents. {status, message, data}
 */
const getOrderItemCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      orderItemSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.inValidParam({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let result = await dbService.countDocument(OrderItem,where);
    result = { totalRecords: result };
    return res.ok({ data : result });
  } catch (error){
    return res.failureResponse({ data:error.message });
  }
};

/**
 * @description : deactivate multiple documents of OrderItem from table by ids;
 * @param {obj} req : request including array of ids in request body.
 * @param {obj} res : response contains updated documents of OrderItem.
 * @return {obj} : number of deactivated documents of OrderItem. {status, message, data}
 */
const softDeleteManyOrderItem = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let data = await dbService.bulkUpdate(OrderItem,query, updateBody);
    if (!data) {
      return res.recordNotFound();
    }
    return res.ok({ data:data });
        
  } catch (error){
    return res.failureResponse(); 
  }
};
    
/**
 * @description : create multiple documents of OrderItem in mongodb collection.
 * @param {obj} req : request including body for creating documents.
 * @param {obj} res : response of created documents.
 * @return {obj} : created OrderItems. {status, message, data}
 */
const bulkInsertOrderItem = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let data = req.body.data; 
    if (req.user.id){
      for (let i = 0;i < data.length;i++){
        data[i].addedBy = req.user.id;
      }
    }
    let result = await dbService.bulkInsert(OrderItem,data);
    return  res.ok({ data :result });
  } catch (error){
    if (error.name === 'ValidationError'){
      return res.validationError({ message : `Invalid Data, Validation Failed at ${ error.message}` });
    }
    else if (error.code && error.code == 11000){
      return res.isDuplicate();
    }
    return res.failureResponse({ data:error.message });
  }
};
   
/**
 * @description : update multiple records of OrderItem with data by filter.
 * @param {obj} req : request including filter and data in request body.
 * @param {obj} res : response of updated OrderItems.
 * @return {obj} : updated OrderItems. {status, message, data}
 */
const bulkUpdateOrderItem = async (req,res)=>{
  try {
    let filter = {};
    let data;
    if (req.body && typeof req.body.filter === 'object' && req.body.filter !== null) {
      filter = { ...req.body.filter };
    }
    if ( typeof req.body.data === 'object' && req.body.data !== null) {
      data = { ...req.body.data, };
      delete data['addedBy'];
      delete data['updatedBy'];            
      data.updatedBy = req.user.id;
        
      let result = await dbService.bulkUpdate(OrderItem,filter,data);
      if (!result){
        return res.recordNotFound();
      }
      return  res.ok({ data :result });
    } else {
      return res.badRequest();
    }
  } catch (error){
    return res.failureResponse({ data:error.message }); 
  }
};
    
/**
 * @description : delete documents of OrderItem in table by using ids.
 * @param {obj} req : request including array of ids in request body.
 * @param {obj} res : response contains no of documents deleted.
 * @return {obj} : no of documents deleted. {status, message, data}
 */
const deleteManyOrderItem = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { '_id':{ '$in':ids } };
    let result = await dbService.deleteMany(OrderItem,query);
    return res.ok({ data :result });
  } catch (error){
    return res.failureResponse(); 
  }
};
/**
 * @description : deactivate document of OrderItem from table by id;
 * @param {obj} req : request including id in request params.
 * @param {obj} res : response contains updated document of OrderItem.
 * @return {obj} : deactivated OrderItem. {status, message, data}
 */
const softDeleteOrderItem = async (req,res) => {
  try {
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let result = await dbService.findOneAndUpdateDocument(OrderItem, query, updateBody,{ new:true });
    if (!result){
      return res.recordNotFound();
    }
    return  res.ok({ data:result });
  } catch (error){
    return res.failureResponse(); 
  }
};
    
/**
 * @description : partially update document of OrderItem with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated OrderItem.
 * @return {obj} : updated OrderItem. {status, message, data}
 */
const partialUpdateOrderItem = async (req,res) => {
  try {
    delete req.body['addedBy'];
    delete req.body['updatedBy'];            
    let data = {
      updatedBy:req.user.id,
      ...req.body
    };
    let validateRequest = validation.validateParamsWithJoi(
      data,
      orderItemSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.inValidParam({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let result = await dbService.findOneAndUpdateDocument(OrderItem, query, data,{ new:true });
    if (!result) {
      return res.recordNotFound();
    }
    return res.ok({ data:result });
  } catch (error){
    return res.failureResponse({ data:error.message });
  }
};
    
/**
 * @description : update document of OrderItem with data by id.
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated OrderItem.
 * @return {obj} : updated OrderItem. {status, message, data}
 */
const updateOrderItem = async (req,res) => {
  try {
    delete req.body['addedBy'];
    delete req.body['updatedBy'];            
    let data = {
      updatedBy:req.user.id,
      ...req.body,
    };
    let validateRequest = validation.validateParamsWithJoi(
      data,
      orderItemSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.inValidParam({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    let query = { _id:req.params.id };
    let result = await dbService.findOneAndUpdateDocument(OrderItem,query,data,{ new:true });
    if (!result){
      return res.recordNotFound();
    }
    return  res.ok({ data:result });
  } catch (error){
    if (error.name === 'ValidationError'){
      return res.validationError({ message : `Invalid Data, Validation Failed at ${ error.message}` });
    }
    else if (error.code && error.code == 11000){
      return res.isDuplicate();
    }
    return res.failureResponse({ data:error.message });
  }
};
        
/**
 * @description : find document of OrderItem from table by id;
 * @param {obj} req : request including id in request params.
 * @param {obj} res : response contains document retrieved from table.
 * @return {obj} : found OrderItem. {status, message, data}
 */
const getOrderItem = async (req,res) => {
  try {
    let query = {};
    if (!ObjectID.isValid(req.params.id)) {
      return res.invalidObjectId();
    }
    query._id = req.params.id;
    let options = {};
    let result = await dbService.getSingleDocument(OrderItem,query, options);
    if (result){
            
      return  res.ok({ data :result });
    }
    return res.recordNotFound();
  }
  catch (error){
    return res.failureResponse({ data:error.message });
  }
};
    
/**
 * @description : delete document of OrderItem from table.
 * @param {obj} req : request including id as req param.
 * @param {obj} res : response contains deleted document.
 * @return {obj} : deleted OrderItem. {status, message, data}
 */
const deleteOrderItem = async (req,res) => {
  try {
    let query = { _id:req.params.id };
    const result = await dbService.findOneAndDeleteDocument(OrderItem, query);
    if (result){
      return  res.ok({ data :result });
    }
    return res.recordNotFound();
  }
  catch (error){
    return res.failureResponse();
  }
};

module.exports = {
  addOrderItem,
  findAllOrderItem,
  getOrderItemCount,
  softDeleteManyOrderItem,
  bulkInsertOrderItem,
  bulkUpdateOrderItem,
  deleteManyOrderItem,
  softDeleteOrderItem,
  partialUpdateOrderItem,
  updateOrderItem,
  getOrderItem,
  deleteOrderItem,
};