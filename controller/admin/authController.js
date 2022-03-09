/**
 * authController.js
 * @description :: exports authentication methods
 */

const authService =  require('../../services/auth');
const User = require('../../model/user');
const dbService = require('../../utils/dbService');
const userTokens = require('../../model/userTokens');
const dayjs = require('dayjs');
const userSchemaKey = require('../../utils/validation/userValidation');
const validation = require('../../utils/validateRequest');
const authConstant = require('../../constants/authConstant');
const { uniqueValidation } = require('../../utils/common');
const {
  sendPasswordBySMS, sendPasswordByEmail 
} = require('../../services/auth');

/**
 * @description : user registration 
 * @param {obj} req : request for register
 * @param {obj} res : response for register
 * @return {obj} : response for register {status, message, data}
 */
const register = async (req,res) =>{
  try {
    let validateRequest = validation.validateParamsWithJoi(
      req.body,
      userSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.inValidParam({ message :  `Invalid values in parameters, ${validateRequest.message}` });
    } 
    let isEmptyPassword = false;
    if (!req.body.password){
      isEmptyPassword = true;
      req.body.password = Math.random().toString(36).slice(2);
    }
    let unique = await uniqueValidation(User,req.body);   
    if (!unique){ 
      return res.inValidParam({ message : 'User Registration Failed, Duplicate Data found' });
    } 
    const data = new User({
      ...req.body,
      userType: authConstant.USER_TYPES.Admin
    });
    const result = await dbService.createDocument(User,data);
    if (isEmptyPassword && req.body.email){
      await sendPasswordByEmail({
        email: req.body.email,
        password: req.body.password
      });
    }
    if (isEmptyPassword && req.body.mobileNo){
      await sendPasswordBySMS({
        mobileNo: req.body.mobileNo,
        password: req.body.password
      });
    }
    return res.ok({ data :result });
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
 * @description : login with username and password
 * @param {obj} req : request for login 
 * @param {obj} res : response for login
 * @return {obj} : response for login {status, message, data}
 */

const login = async (req,res)=>{
  try {
    let {
      username,password
    } = req.body;
    let url = req.originalUrl;
    if (username && password){
      let roleAccess = false;
      if (req.body.includeRoleAccess){
        roleAccess = req.body.includeRoleAccess;
      }
      let result = await authService.loginUser(username, password, url, roleAccess);
      if (!result.flag){
        return res.loginSuccess({ data: result.data });
      }
      return res.loginFailed({ message :result.data });
    } else {
      return res.insufficientParameters();
    }
  } catch (error) {
    return res.failureResponse({ data:error.message }); 
  }
};

/**
 * @description : send email or sms to user with OTP on forgot password
 * @param {obj} req : request for forgotPassword
 * @param {obj} res : response for forgotPassword
 * @return {obj} : response for forgotPassword {status, message, data}
 */ 
const forgotPassword = async (req,res) => {
  const params = req.body;
  try {
    if (!params.email) {
      return res.insufficientParameters();
    }
    let where = { email: params.email };
    params.email = params.email.toString().toLowerCase();
    let isUser = await dbService.getDocumentByQuery(User,where);
    if (isUser) {
      let {
        resultOfEmail,resultOfSMS
      } = await authService.sendResetPasswordNotification(isUser);
      if (resultOfEmail && resultOfSMS){
        return res.requestValidated({ message :'otp successfully send.' });
      } else if (resultOfEmail && !resultOfSMS) {
        return res.requestValidated({ message : 'otp successfully send to your email.' });
      } else if (!resultOfEmail && resultOfSMS) { 
        return res.requestValidated({ message : 'otp successfully send to your mobile number.' });
      } else {
        return res.failureResponse({ data:error.message }); 
      }
    } else {
      return res.recordNotFound();
    }
  } catch (error) {
    return res.failureResponse({ data:error.message }); 
  }
};

/**
 * @description : validate OTP
 * @param {obj} req : request for validateResetPasswordOtp
 * @param {obj} res : response for validateResetPasswordOtp
 * @return {obj} : response for validateResetPasswordOtp  {status, message, data}
 */
const validateResetPasswordOtp = async (req,res) =>{
  const params = req.body;
  try {
    if (!params || !params.otp) {
      return res.insufficientParameters();
    }
    let isUser = await dbService.getDocumentByQuery(User, { 'resetPasswordLink.code': params.otp });
    if (!isUser || !isUser.resetPasswordLink.expireTime) {
      return res.invalidRequest({ message :'Invalid OTP' });
    }
    // link expire
    if (dayjs(new Date()).isAfter(dayjs(isUser.resetPasswordLink.expireTime))) {
      return res.invalidRequest( { message :'Your reset password link is expired or invalid' });
    }
    await dbService.updateDocument(User, isUser.id, { resetPasswordLink: {} });
    return res.requestValidated({ message :'Otp verified' });
  } catch (error) {
    return res.failureResponse({ data:error.message }); 
  }
};
    
/**
 * @description : reset password with code and new password
 * @param {obj} req : request for resetPassword
 * @param {obj} res : response for resetPassword
 * @return {obj} : response for resetPassword {status, message, data}
 */ 
const resetPassword = async (req,res) => {
  const params = req.body;
  try {
    if (!params.code || !params.newPassword) {
      return res.insufficientParameters();
    }
    let isUser = await dbService.getDocumentByQuery(User, { 'resetPasswordLink.code': params.code });
    if (isUser && isUser.resetPasswordLink.expireTime) {
      if (dayjs(new Date()).isAfter(dayjs(isUser.resetPasswordLink.expireTime))) {// link expire
        return res.invalidRequest({ message :'Your reset password link is expired or invalid' });
      }
    } else {
      // invalid code
      return res.invalidRequest({ message :'Invalid Code' });
    }
    let response = await authService.resetPassword(isUser, params.newPassword);
    if (response && !response.flag){
      return res.requestValidated({ message :response.data });
    }
    return res.invalidRequest({ message: response.data });
  } catch (error) {
    return res.failureResponse({ data:error.message }); 
  }
};

/**
 * @description : logout user
 * @param {obj} req : request for logout
 * @param {obj} res : response for logout
 * @return {obj} : response for logout {status, message, data}
 */
const logout = async (req, res) => {
  try {
    if (req.user) {
      let userToken = await dbService.getDocumentByQuery(userTokens, {
        token: (req.headers.authorization).replace('Bearer ', '') ,
        userId:req.user.id
      });
      let updatedDocument = { isTokenExpired: true };
      await dbService.updateDocument(userTokens,userToken.id, updatedDocument);
      return res.requestValidated({ message :'Logged Out Successfully' });
    }
    return res.badRequest();
  } catch (error) {
    return res.failureResponse({ data:error.message }); 
  }
};

module.exports = {
  register,
  forgotPassword,
  validateResetPasswordOtp,
  resetPassword,
  login,
  logout,
};
