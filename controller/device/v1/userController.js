/**
 * userController.js
 * @description : exports action methods for user.
 */

const User = require('../../../model/user');
const userSchemaKey = require('../../../utils/validation/userValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectID = require('mongodb').ObjectID;
const auth = require('../../../services/auth');
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common.js');

/**
 * @description : get information of logged-in User.
 * @param {obj} req : authentication token is required
 * @param {obj} res : Logged-in user information
 * @return {obj} : Logged-in user information {status, message, data}
 */
const getLoggedInUserInfo = async (req, res) => {
  try {
    if (!req.user && !req.user.id){
      return res.unAuthorizedRequest();
    }
    const query = {
      _id: req.user.id,
      isDeleted: false 
    };
    query.isActive = true;
    let result = await dbService.getSingleDocument(User, query);
    if (result) {
      return res.ok({ data: result });
    }
    return res.recordNotFound();
  } catch (error){
    return res.failureResponse({ data:error.message });
  }
};
   
/**
 * @description : create document of User in mongodb collection.
 * @param {obj} req : request including body for creating document.
 * @param {obj} res : response of created document
 * @return {obj} : created User. {status, message, data}
 */ 
const addUser = async (req, res) => {
  try {
    let validateRequest = validation.validateParamsWithJoi(
      req.body,
      userSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.inValidParam({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    let data = new User({
      ...req.body
      ,addedBy:req.user.id
    });
    let result = await dbService.createDocument(User,data);
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
 * @description : find all documents of User from collection based on query and options.
 * @param {obj} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {obj} res : response contains data found from collection.
 * @return {obj} : found User(s). {status, message, data}
 */
const findAllUser = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      userSchemaKey.findFilterKeys,
      User.schema.obj
    );

    if (!validateRequest.isValid) {
      return res.inValidParam({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.user && req.user.id) {
      query._id = { $ne: req.user.id };
      if (req.body && req.body.query && req.body.query._id) {
        query._id.$in = [req.body.query._id];
      }
    } else {
      return res.badRequest();
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.countDocument(User, query);
      return res.ok({ data: { totalRecords } });
    }
        
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let result = await dbService.getAllDocuments( User,query,options);
    if (result && result.data && result.data.length){
      return res.ok({ data :result });   
    }
    return res.recordNotFound();
  } catch (error){
    return res.failureResponse({ data:error.message });
  }
};
    
/**
 * @description : returns total number of documents of User.
 * @param {obj} req : request including where object to apply filters in req body 
 * @param {obj} res : response that returns total number of documents.
 * @return {obj} : number of documents. {status, message, data}
 */
const getUserCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      userSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.inValidParam({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let result = await dbService.countDocument(User,where);
    result = { totalRecords: result };
    return res.ok({ data : result });
  } catch (error){
    return res.failureResponse({ data:error.message });
  }
};
    
/**
 * @description : deactivate multiple documents of User from table by ids;
 * @param {obj} req : request including array of ids in request body.
 * @param {obj} res : response contains updated documents of User.
 * @return {obj} : number of deactivated documents of User. {status, message, data}
 */
const softDeleteManyUser = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    let query = {};
    if (req.user){
      query = {
        '_id': {
          '$in': ids,
          '$ne': req.user.id
        }
      };
    } else {
      return res.badRequest();
    }
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await deleteDependentService.softDeleteUser(query, updateBody);
    if (!result) {
      return res.recordNotFound();
    }
    return  res.ok({ data:result });
  } catch (error){
    return res.failureResponse({ data:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of User in mongodb collection.
 * @param {obj} req : request including body for creating documents.
 * @param {obj} res : response of created documents.
 * @return {obj} : created Users. {status, message, data}
 */
const bulkInsertUser = async (req,res)=>{
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
    let result = await dbService.bulkInsert(User,data);
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
 * @description : update multiple records of User with data by filter.
 * @param {obj} req : request including filter and data in request body.
 * @param {obj} res : response of updated Users.
 * @return {obj} : updated Users. {status, message, data}
 */
const bulkUpdateUser = async (req,res)=>{
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
        
      let result = await dbService.bulkUpdate(User,filter,data);
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
 * @description : delete documents of User in table by using ids.
 * @param {obj} req : request including array of ids in request body.
 * @param {obj} res : response contains no of documents deleted.
 * @return {obj} : no of documents deleted. {status, message, data}
 */
const deleteManyUser = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    let query = {};
    if (req.user){
      query = {
        '_id': {
          '$in': ids,
          '$ne': req.user.id
        }
      };
    } 
    else {
      return res.badRequest();
    } 
    if (req.body.isWarning) {
      let result = await deleteDependentService.countUser(query);
      return res.ok({ data :result }); 
    }
    else {
      let result = await deleteDependentService.deleteUser(query);
      return res.ok({ data :result });
    }
  } catch (error){
    return res.failureResponse({ data:error.message }); 
  }
};
    
/**
 * @description : deactivate document of User from table by id;
 * @param {obj} req : request including id in request params.
 * @param {obj} res : response contains updated document of User.
 * @return {obj} : deactivated User. {status, message, data}
 */
const softDeleteUser = async (req,res) => {
  try {
    let query = {};
    if (req.user){
      query = {
        '_id': {
          '$eq': req.params.id,
          '$ne': req.user.id
        }
      };
    } else {
      return res.badRequest();
    }
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await deleteDependentService.softDeleteUser(query, updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.ok({ data:result });
  } catch (error){
    return res.failureResponse({ data:error.message }); 
  }
};
    
/**
 * @description : partially update document of User with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated User.
 * @return {obj} : updated User. {status, message, data}
 */
const partialUpdateUser = async (req,res) => {
  try {
    delete req.body['addedBy'];
    delete req.body['updatedBy'];            
    let data = {
      updatedBy:req.user.id,
      ...req.body
    };
    let validateRequest = validation.validateParamsWithJoi(
      data,
      userSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.inValidParam({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    let query = {};
    if (req.user){
      query = {
        '_id': {
          '$eq': req.params.id,
          '$ne': req.user.id
        }
      };
    } else {
      return res.badRequest();
    } 
    let result = await dbService.findOneAndUpdateDocument(User, query, data,{ new:true });
    if (!result) {
      return res.recordNotFound();
    }
    return res.ok({ data:result });
  } catch (error){
    return res.failureResponse({ data:error.message });
  }
};
    
/**
 * @description : update document of User with data by id.
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated User.
 * @return {obj} : updated User. {status, message, data}
 */
const updateUser = async (req,res) => {
  try {
    delete req.body['addedBy'];
    delete req.body['updatedBy'];            
    let data = {
      updatedBy:req.user.id,
      ...req.body,
    };
    let validateRequest = validation.validateParamsWithJoi(
      data,
      userSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.inValidParam({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    let query = {};
    if (req.user){
      query = {
        '_id': {
          '$eq': req.params.id,
          '$ne': req.user.id
        }
      };
    } else {
      return res.badRequest();
    }
    let result = await dbService.findOneAndUpdateDocument(User,query,data,{ new:true });
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
 * @description : find document of User from table by id;
 * @param {obj} req : request including id in request params.
 * @param {obj} res : response contains document retrieved from table.
 * @return {obj} : found User. {status, message, data}
 */
const getUser = async (req,res) => {
  try {
    let query = {};
    if (!ObjectID.isValid(req.params.id)) {
      return res.invalidObjectId();
    }
    query._id = req.params.id;
    let options = {};
    let result = await dbService.getSingleDocument(User,query, options);
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
 * @description : delete document of User from table.
 * @param {obj} req : request including id as req param.
 * @param {obj} res : response contains deleted document.
 * @return {obj} : deleted User. {status, message, data}
 */
const deleteUser = async (req,res) => {
  try {
    if (req.params.id){
      let query = {};
      if (req.user){
        query = {
          '_id': {
            '$eq': req.params.id,
            '$ne': req.user.id
          }
        };
      } 
      else {
        return res.badRequest();
      } 
      if (req.body.isWarning) {
        let result = await deleteDependentService.countUser(query);
        return res.ok({ data :result });
         
      } else {
        let result = await deleteDependentService.deleteUser(query);
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
    
/**
 * @description : change password
 * @param {obj} req : request including user credentials.
 * @param {obj} res : response contains updated user document.
 * @return {obj} : updated user document {status, message, data}
 */
const changePassword = async (req, res) => {
  try {
    let params = req.body;
    if (!params.newPassword || !req.user.id || !params.oldPassword) {
      return res.inValidParam({ message : 'Please Provide userId and new Password and Old password' });
    }
    let result = await auth.changePassword({
      ...params,
      userId:req.user.id
    });
    if (result.flag){
      return res.invalidRequest({ message :result.data });
    }
    return res.requestValidated({ message : result.data });
  } catch (error) {
    return res.failureResponse({ data:error.message });
  }
};
    
/**
 * @description : update user profile.
 * @param {obj} req : request including user profile details to update in request body.
 * @param {obj} res : updated user document.
 * @return {obj} : updated user document. {status, message, data}
 */
const updateProfile = async (req, res) => {
  try {
    let data = { ...req.body };
    let validateRequest = validation.validateParamsWithJoi(
      data,
      userSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.inValidParam({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    delete data.password;
    delete data.createdAt;
    delete data.updatedAt;
    if (data.id) delete data.id;
    let result = await dbService.findOneAndUpdateDocument(User,{ _id:req.user.id },data,{ new:true });
    if (!result){
      return res.failureResponse();
    }            
    return  res.ok({ data :result });
  } catch (error){
    if (error.name === 'ValidationError'){
      return res.isDuplicate();
    }
    if (error.code && error.code == 11000){
      return res.isDuplicate();
    }
    return res.failureResponse({ data:error.message });
  }
};
module.exports = {
  getLoggedInUserInfo,
  addUser,
  findAllUser,
  getUserCount,
  softDeleteManyUser,
  bulkInsertUser,
  bulkUpdateUser,
  deleteManyUser,
  softDeleteUser,
  partialUpdateUser,
  updateUser,
  getUser,
  deleteUser,
  changePassword,
  updateProfile,
};