/**
 * patientController.js
 * @description : exports action methods for patient.
 */

const Patient = require('../../../model/patient');
const patientSchemaKey = require('../../../utils/validation/patientValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectID = require('mongodb').ObjectID;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common.js');
   
/**
 * @description : create document of Patient in mongodb collection.
 * @param {obj} req : request including body for creating document.
 * @param {obj} res : response of created document
 * @return {obj} : created Patient. {status, message, data}
 */ 
const addPatient = async (req, res) => {
  try {
    let validateRequest = validation.validateParamsWithJoi(
      req.body,
      patientSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.inValidParam({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    let data = new Patient({
      ...req.body
      ,addedBy:req.user.id
    });
    let result = await dbService.createDocument(Patient,data);
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
 * @description : find all documents of Patient from collection based on query and options.
 * @param {obj} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {obj} res : response contains data found from collection.
 * @return {obj} : found Patient(s). {status, message, data}
 */
const findAllPatient = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      patientSchemaKey.findFilterKeys,
      Patient.schema.obj
    );

    if (!validateRequest.isValid) {
      return res.inValidParam({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.countDocument(Patient, query);
      return res.ok({ data: { totalRecords } });
    }
        
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let result = await dbService.getAllDocuments( Patient,query,options);
    if (result && result.data && result.data.length){
      return res.ok({ data :result });   
    }
    return res.recordNotFound();
  } catch (error){
    return res.failureResponse({ data:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Patient.
 * @param {obj} req : request including where object to apply filters in req body 
 * @param {obj} res : response that returns total number of documents.
 * @return {obj} : number of documents. {status, message, data}
 */
const getPatientCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      patientSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.inValidParam({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let result = await dbService.countDocument(Patient,where);
    result = { totalRecords: result };
    return res.ok({ data : result });
  } catch (error){
    return res.failureResponse({ data:error.message });
  }
};
    
/**
 * @description : deactivate multiple documents of Patient from table by ids;
 * @param {obj} req : request including array of ids in request body.
 * @param {obj} res : response contains updated documents of Patient.
 * @return {obj} : number of deactivated documents of Patient. {status, message, data}
 */
const softDeleteManyPatient = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await deleteDependentService.softDeletePatient(query, updateBody);
    if (!result) {
      return res.recordNotFound();
    }
    return  res.ok({ data:result });
  } catch (error){
    return res.failureResponse({ data:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Patient in mongodb collection.
 * @param {obj} req : request including body for creating documents.
 * @param {obj} res : response of created documents.
 * @return {obj} : created Patients. {status, message, data}
 */
const bulkInsertPatient = async (req,res)=>{
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
    let result = await dbService.bulkInsert(Patient,data);
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
 * @description : update multiple records of Patient with data by filter.
 * @param {obj} req : request including filter and data in request body.
 * @param {obj} res : response of updated Patients.
 * @return {obj} : updated Patients. {status, message, data}
 */
const bulkUpdatePatient = async (req,res)=>{
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
        
      let result = await dbService.bulkUpdate(Patient,filter,data);
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
 * @description : delete documents of Patient in table by using ids.
 * @param {obj} req : request including array of ids in request body.
 * @param {obj} res : response contains no of documents deleted.
 * @return {obj} : no of documents deleted. {status, message, data}
 */
const deleteManyPatient = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    let query = { _id:{ '$in':ids } };
    if (req.body.isWarning) {
      let result = await deleteDependentService.countPatient(query);
      return res.ok({ data :result }); 
    }
    else {
      let result = await deleteDependentService.deletePatient(query);
      return res.ok({ data :result });
    }
  } catch (error){
    return res.failureResponse({ data:error.message }); 
  }
};
    
/**
 * @description : deactivate document of Patient from table by id;
 * @param {obj} req : request including id in request params.
 * @param {obj} res : response contains updated document of Patient.
 * @return {obj} : deactivated Patient. {status, message, data}
 */
const softDeletePatient = async (req,res) => {
  try {
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await deleteDependentService.softDeletePatient(query, updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.ok({ data:result });
  } catch (error){
    return res.failureResponse({ data:error.message }); 
  }
};
    
/**
 * @description : partially update document of Patient with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Patient.
 * @return {obj} : updated Patient. {status, message, data}
 */
const partialUpdatePatient = async (req,res) => {
  try {
    delete req.body['addedBy'];
    delete req.body['updatedBy'];            
    let data = {
      updatedBy:req.user.id,
      ...req.body
    };
    let validateRequest = validation.validateParamsWithJoi(
      data,
      patientSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.inValidParam({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let result = await dbService.findOneAndUpdateDocument(Patient, query, data,{ new:true });
    if (!result) {
      return res.recordNotFound();
    }
    return res.ok({ data:result });
  } catch (error){
    return res.failureResponse({ data:error.message });
  }
};
    
/**
 * @description : update document of Patient with data by id.
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Patient.
 * @return {obj} : updated Patient. {status, message, data}
 */
const updatePatient = async (req,res) => {
  try {
    delete req.body['addedBy'];
    delete req.body['updatedBy'];            
    let data = {
      updatedBy:req.user.id,
      ...req.body,
    };
    let validateRequest = validation.validateParamsWithJoi(
      data,
      patientSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.inValidParam({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    let query = { _id:req.params.id };
    let result = await dbService.findOneAndUpdateDocument(Patient,query,data,{ new:true });
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
 * @description : find document of Patient from table by id;
 * @param {obj} req : request including id in request params.
 * @param {obj} res : response contains document retrieved from table.
 * @return {obj} : found Patient. {status, message, data}
 */
const getPatient = async (req,res) => {
  try {
    let query = {};
    if (!ObjectID.isValid(req.params.id)) {
      return res.invalidObjectId();
    }
    query._id = req.params.id;
    let options = {};
    let result = await dbService.getSingleDocument(Patient,query, options);
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
 * @description : delete document of Patient from table.
 * @param {obj} req : request including id as req param.
 * @param {obj} res : response contains deleted document.
 * @return {obj} : deleted Patient. {status, message, data}
 */
const deletePatient = async (req,res) => {
  try {
    if (req.params.id){
      let query = { _id:req.params.id };
      if (req.body.isWarning) {
        let result = await deleteDependentService.countPatient(query);
        return res.ok({ data :result });
         
      } else {
        let result = await deleteDependentService.deletePatient(query);
        if (!result){
          return res.recordNotFound();
        }
        return  res.ok({ data :result });    
      }
    } else {
      return res.badRequest();
    }
  }
  catch (error){
    return res.failureResponse({ data:error.message }); 
  }
};

module.exports = {
  addPatient,
  findAllPatient,
  getPatientCount,
  softDeleteManyPatient,
  bulkInsertPatient,
  bulkUpdatePatient,
  deleteManyPatient,
  softDeletePatient,
  partialUpdatePatient,
  updatePatient,
  getPatient,
  deletePatient,
};