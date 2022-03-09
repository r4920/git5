/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Patient = require('../model/patient');
let OrderItem = require('../model/orderItem');
let Order = require('../model/order');
let Medication = require('../model/medication');
let Note = require('../model/note');
let Encounter = require('../model/encounter');
let Enterprise = require('../model/enterprise');
let Departments = require('../model/departments');
let Customer = require('../model/Customer');
let Task = require('../model/Task');
let Plan = require('../model/Plan');
let Chat_message = require('../model/Chat_message');
let Comment = require('../model/Comment');
let Chat_group = require('../model/Chat_group');
let ToDo = require('../model/ToDo');
let Appointment_schedule = require('../model/Appointment_schedule');
let Event = require('../model/Event');
let Appointment_slot = require('../model/Appointment_slot');
let Master = require('../model/Master');
let Blog = require('../model/Blog');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deletePatient = async (filter) =>{
  try {
    let patient = await Patient.find(filter, { _id:1 });
    if (patient.length){
      patient = patient.map((obj) => obj._id);
      const orderFilter8582 = { 'patientId': { '$in': patient } };
      const order1633 = await deleteOrder(orderFilter8582);
      return await Patient.deleteMany(filter);
    } else {
      return 'No patient found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOrderItem = async (filter) =>{
  try {
    return await OrderItem.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOrder = async (filter) =>{
  try {
    return await Order.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMedication = async (filter) =>{
  try {
    return await Medication.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteNote = async (filter) =>{
  try {
    return await Note.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEncounter = async (filter) =>{
  try {
    let encounter = await Encounter.find(filter, { _id:1 });
    if (encounter.length){
      encounter = encounter.map((obj) => obj._id);
      const noteFilter6748 = { 'encounterId': { '$in': encounter } };
      const note5534 = await deleteNote(noteFilter6748);
      return await Encounter.deleteMany(filter);
    } else {
      return 'No encounter found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEnterprise = async (filter) =>{
  try {
    let enterprise = await Enterprise.find(filter, { _id:1 });
    if (enterprise.length){
      enterprise = enterprise.map((obj) => obj._id);
      const departmentsFilter6885 = { 'enterprises': { '$in': enterprise } };
      const departments4390 = await deleteDepartments(departmentsFilter6885);
      return await Enterprise.deleteMany(filter);
    } else {
      return 'No enterprise found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteDepartments = async (filter) =>{
  try {
    return await Departments.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCustomer = async (filter) =>{
  try {
    return await Customer.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTask = async (filter) =>{
  try {
    return await Task.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePlan = async (filter) =>{
  try {
    return await Plan.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_message = async (filter) =>{
  try {
    return await Chat_message.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteComment = async (filter) =>{
  try {
    let comment = await Comment.find(filter, { _id:1 });
    if (comment.length){
      comment = comment.map((obj) => obj._id);
      const CommentFilter6868 = { 'parentItem': { '$in': comment } };
      const Comment5280 = await deleteComment(CommentFilter6868);
      return await Comment.deleteMany(filter);
    } else {
      return 'No Comment found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_group = async (filter) =>{
  try {
    let chat_group = await Chat_group.find(filter, { _id:1 });
    if (chat_group.length){
      chat_group = chat_group.map((obj) => obj._id);
      const Chat_messageFilter8012 = { 'groupId': { '$in': chat_group } };
      const Chat_message7628 = await deleteChat_message(Chat_messageFilter8012);
      return await Chat_group.deleteMany(filter);
    } else {
      return 'No Chat_group found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteToDo = async (filter) =>{
  try {
    return await ToDo.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAppointment_schedule = async (filter) =>{
  try {
    return await Appointment_schedule.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEvent = async (filter) =>{
  try {
    return await Event.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAppointment_slot = async (filter) =>{
  try {
    let appointment_slot = await Appointment_slot.find(filter, { _id:1 });
    if (appointment_slot.length){
      appointment_slot = appointment_slot.map((obj) => obj._id);
      const Appointment_scheduleFilter7775 = { 'slot': { '$in': appointment_slot } };
      const Appointment_schedule9714 = await deleteAppointment_schedule(Appointment_scheduleFilter7775);
      return await Appointment_slot.deleteMany(filter);
    } else {
      return 'No Appointment_slot found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMaster = async (filter) =>{
  try {
    let master = await Master.find(filter, { _id:1 });
    if (master.length){
      master = master.map((obj) => obj._id);
      const MasterFilter5087 = { 'parentId': { '$in': master } };
      const Master6321 = await deleteMaster(MasterFilter5087);
      return await Master.deleteMany(filter);
    } else {
      return 'No Master found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBlog = async (filter) =>{
  try {
    return await Blog.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const patientFilter9773 = { 'addedBy': { '$in': user } };
      const patient3809 = await deletePatient(patientFilter9773);
      const patientFilter9486 = { 'updatedBy': { '$in': user } };
      const patient5460 = await deletePatient(patientFilter9486);
      const orderItemFilter8036 = { 'addedBy': { '$in': user } };
      const orderItem5081 = await deleteOrderItem(orderItemFilter8036);
      const orderItemFilter6092 = { 'updatedBy': { '$in': user } };
      const orderItem9089 = await deleteOrderItem(orderItemFilter6092);
      const orderFilter3025 = { 'orderBy': { '$in': user } };
      const order4982 = await deleteOrder(orderFilter3025);
      const orderFilter9980 = { 'addedBy': { '$in': user } };
      const order1666 = await deleteOrder(orderFilter9980);
      const orderFilter4691 = { 'updatedBy': { '$in': user } };
      const order3007 = await deleteOrder(orderFilter4691);
      const medicationFilter4432 = { 'addedBy': { '$in': user } };
      const medication5222 = await deleteMedication(medicationFilter4432);
      const medicationFilter3117 = { 'updatedBy': { '$in': user } };
      const medication7689 = await deleteMedication(medicationFilter3117);
      const noteFilter7607 = { 'provider': { '$in': user } };
      const note6597 = await deleteNote(noteFilter7607);
      const noteFilter3093 = { 'addedBy': { '$in': user } };
      const note5478 = await deleteNote(noteFilter3093);
      const noteFilter5486 = { 'updatedBy': { '$in': user } };
      const note7570 = await deleteNote(noteFilter5486);
      const encounterFilter5832 = { 'addedBy': { '$in': user } };
      const encounter8317 = await deleteEncounter(encounterFilter5832);
      const encounterFilter9719 = { 'updatedBy': { '$in': user } };
      const encounter3608 = await deleteEncounter(encounterFilter9719);
      const enterpriseFilter6361 = { 'addedBy': { '$in': user } };
      const enterprise8009 = await deleteEnterprise(enterpriseFilter6361);
      const enterpriseFilter8183 = { 'updatedBy': { '$in': user } };
      const enterprise8711 = await deleteEnterprise(enterpriseFilter8183);
      const departmentsFilter3545 = { 'addedBy': { '$in': user } };
      const departments4322 = await deleteDepartments(departmentsFilter3545);
      const departmentsFilter8759 = { 'updatedBy': { '$in': user } };
      const departments2032 = await deleteDepartments(departmentsFilter8759);
      const CustomerFilter9068 = { 'addedBy': { '$in': user } };
      const Customer3081 = await deleteCustomer(CustomerFilter9068);
      const CustomerFilter3681 = { 'updatedBy': { '$in': user } };
      const Customer9895 = await deleteCustomer(CustomerFilter3681);
      const TaskFilter9403 = { 'completedBy': { '$in': user } };
      const Task2188 = await deleteTask(TaskFilter9403);
      const TaskFilter9681 = { 'updatedBy': { '$in': user } };
      const Task1082 = await deleteTask(TaskFilter9681);
      const TaskFilter2158 = { 'addedBy': { '$in': user } };
      const Task6584 = await deleteTask(TaskFilter2158);
      const PlanFilter3481 = { 'updatedBy': { '$in': user } };
      const Plan4813 = await deletePlan(PlanFilter3481);
      const PlanFilter1979 = { 'addedBy': { '$in': user } };
      const Plan9732 = await deletePlan(PlanFilter1979);
      const Chat_messageFilter3329 = { 'updatedBy': { '$in': user } };
      const Chat_message6597 = await deleteChat_message(Chat_messageFilter3329);
      const Chat_messageFilter6839 = { 'addedBy': { '$in': user } };
      const Chat_message6279 = await deleteChat_message(Chat_messageFilter6839);
      const CommentFilter2913 = { 'updatedBy': { '$in': user } };
      const Comment4698 = await deleteComment(CommentFilter2913);
      const CommentFilter2606 = { 'addedBy': { '$in': user } };
      const Comment1576 = await deleteComment(CommentFilter2606);
      const Chat_groupFilter8762 = { 'updatedBy': { '$in': user } };
      const Chat_group0750 = await deleteChat_group(Chat_groupFilter8762);
      const Chat_groupFilter2271 = { 'addedBy': { '$in': user } };
      const Chat_group2223 = await deleteChat_group(Chat_groupFilter2271);
      const ToDoFilter4030 = { 'addedBy': { '$in': user } };
      const ToDo5483 = await deleteToDo(ToDoFilter4030);
      const ToDoFilter0269 = { 'updatedBy': { '$in': user } };
      const ToDo5097 = await deleteToDo(ToDoFilter0269);
      const Appointment_scheduleFilter5615 = { 'host': { '$in': user } };
      const Appointment_schedule1932 = await deleteAppointment_schedule(Appointment_scheduleFilter5615);
      const Appointment_scheduleFilter7962 = { 'updatedBy': { '$in': user } };
      const Appointment_schedule2937 = await deleteAppointment_schedule(Appointment_scheduleFilter7962);
      const Appointment_scheduleFilter2962 = { 'addedBy': { '$in': user } };
      const Appointment_schedule1335 = await deleteAppointment_schedule(Appointment_scheduleFilter2962);
      const EventFilter9522 = { 'updatedBy': { '$in': user } };
      const Event2227 = await deleteEvent(EventFilter9522);
      const EventFilter7948 = { 'addedBy': { '$in': user } };
      const Event7055 = await deleteEvent(EventFilter7948);
      const Appointment_slotFilter8672 = { 'userId': { '$in': user } };
      const Appointment_slot4584 = await deleteAppointment_slot(Appointment_slotFilter8672);
      const Appointment_slotFilter7243 = { 'updatedBy': { '$in': user } };
      const Appointment_slot7695 = await deleteAppointment_slot(Appointment_slotFilter7243);
      const Appointment_slotFilter0551 = { 'addedBy': { '$in': user } };
      const Appointment_slot6321 = await deleteAppointment_slot(Appointment_slotFilter0551);
      const MasterFilter3520 = { 'updatedBy': { '$in': user } };
      const Master9524 = await deleteMaster(MasterFilter3520);
      const MasterFilter3219 = { 'addedBy': { '$in': user } };
      const Master3319 = await deleteMaster(MasterFilter3219);
      const BlogFilter2311 = { 'updatedBy': { '$in': user } };
      const Blog1237 = await deleteBlog(BlogFilter2311);
      const BlogFilter5578 = { 'addedBy': { '$in': user } };
      const Blog3077 = await deleteBlog(BlogFilter5578);
      const userFilter4556 = { 'addedBy': { '$in': user } };
      const user7844 = await deleteUser(userFilter4556);
      const userFilter5346 = { 'updatedBy': { '$in': user } };
      const user9120 = await deleteUser(userFilter5346);
      const userTokensFilter7713 = { 'userId': { '$in': user } };
      const userTokens1956 = await deleteUserTokens(userTokensFilter7713);
      const userTokensFilter4768 = { 'addedBy': { '$in': user } };
      const userTokens7896 = await deleteUserTokens(userTokensFilter4768);
      const userTokensFilter8439 = { 'updatedBy': { '$in': user } };
      const userTokens8951 = await deleteUserTokens(userTokensFilter8439);
      const roleFilter8107 = { 'addedBy': { '$in': user } };
      const role4372 = await deleteRole(roleFilter8107);
      const roleFilter5314 = { 'updatedBy': { '$in': user } };
      const role5267 = await deleteRole(roleFilter5314);
      const projectRouteFilter6228 = { 'addedBy': { '$in': user } };
      const projectRoute1580 = await deleteProjectRoute(projectRouteFilter6228);
      const projectRouteFilter8793 = { 'updatedBy': { '$in': user } };
      const projectRoute7713 = await deleteProjectRoute(projectRouteFilter8793);
      const routeRoleFilter8678 = { 'addedBy': { '$in': user } };
      const routeRole2632 = await deleteRouteRole(routeRoleFilter8678);
      const routeRoleFilter5277 = { 'updatedBy': { '$in': user } };
      const routeRole7637 = await deleteRouteRole(routeRoleFilter5277);
      const userRoleFilter1544 = { 'userId': { '$in': user } };
      const userRole8543 = await deleteUserRole(userRoleFilter1544);
      const userRoleFilter9139 = { 'addedBy': { '$in': user } };
      const userRole9328 = await deleteUserRole(userRoleFilter9139);
      const userRoleFilter1098 = { 'updatedBy': { '$in': user } };
      const userRole7795 = await deleteUserRole(userRoleFilter1098);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter9360 = { 'roleId': { '$in': role } };
      const routeRole8793 = await deleteRouteRole(routeRoleFilter9360);
      const userRoleFilter0715 = { 'roleId': { '$in': role } };
      const userRole6604 = await deleteUserRole(userRoleFilter0715);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter9424 = { 'routeId': { '$in': projectroute } };
      const routeRole1575 = await deleteRouteRole(routeRoleFilter9424);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countPatient = async (filter) =>{
  try {
        
    let patient = await Patient.find(filter, { _id:1 });
    if (patient.length){
      patient = patient.map((obj) => obj._id);

      const orderFilter = { '$or': [{                    patientId : { '$in' : patient } }] };
      const orderCnt =  await dbService.countDocument(Order,orderFilter);

      let response = { order : orderCnt, };
      return response;
    } else {
      return {  patient : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrderItem = async (filter) =>{
  try {
        
    const orderItemCnt =  await OrderItem.countDocuments(filter);
    return { orderItem : orderItemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrder = async (filter) =>{
  try {
        
    const orderCnt =  await Order.countDocuments(filter);
    return { order : orderCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countMedication = async (filter) =>{
  try {
        
    const medicationCnt =  await Medication.countDocuments(filter);
    return { medication : medicationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countNote = async (filter) =>{
  try {
        
    const noteCnt =  await Note.countDocuments(filter);
    return { note : noteCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countEncounter = async (filter) =>{
  try {
        
    let encounter = await Encounter.find(filter, { _id:1 });
    if (encounter.length){
      encounter = encounter.map((obj) => obj._id);

      const noteFilter = { '$or': [{                    encounterId : { '$in' : encounter } }] };
      const noteCnt =  await dbService.countDocument(Note,noteFilter);

      let response = { note : noteCnt, };
      return response;
    } else {
      return {  encounter : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countEnterprise = async (filter) =>{
  try {
        
    let enterprise = await Enterprise.find(filter, { _id:1 });
    if (enterprise.length){
      enterprise = enterprise.map((obj) => obj._id);

      const departmentsFilter = { '$or': [{                    enterprises : { '$in' : enterprise } }] };
      const departmentsCnt =  await dbService.countDocument(Departments,departmentsFilter);

      let response = { departments : departmentsCnt, };
      return response;
    } else {
      return {  enterprise : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countDepartments = async (filter) =>{
  try {
        
    const departmentsCnt =  await Departments.countDocuments(filter);
    return { departments : departmentsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCustomer = async (filter) =>{
  try {
        
    const CustomerCnt =  await Customer.countDocuments(filter);
    return { Customer : CustomerCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTask = async (filter) =>{
  try {
        
    const TaskCnt =  await Task.countDocuments(filter);
    return { Task : TaskCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPlan = async (filter) =>{
  try {
        
    const PlanCnt =  await Plan.countDocuments(filter);
    return { Plan : PlanCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_message = async (filter) =>{
  try {
        
    const Chat_messageCnt =  await Chat_message.countDocuments(filter);
    return { Chat_message : Chat_messageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countComment = async (filter) =>{
  try {
        
    let comment = await Comment.find(filter, { _id:1 });
    if (comment.length){
      comment = comment.map((obj) => obj._id);

      const CommentFilter = { '$or': [{                    parentItem : { '$in' : comment } }] };
      const CommentCnt =  await dbService.countDocument(Comment,CommentFilter);

      let response = { Comment : CommentCnt, };
      return response;
    } else {
      return {  comment : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_group = async (filter) =>{
  try {
        
    let chat_group = await Chat_group.find(filter, { _id:1 });
    if (chat_group.length){
      chat_group = chat_group.map((obj) => obj._id);

      const Chat_messageFilter = { '$or': [{                    groupId : { '$in' : chat_group } }] };
      const Chat_messageCnt =  await dbService.countDocument(Chat_message,Chat_messageFilter);

      let response = { Chat_message : Chat_messageCnt, };
      return response;
    } else {
      return {  chat_group : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countToDo = async (filter) =>{
  try {
        
    const ToDoCnt =  await ToDo.countDocuments(filter);
    return { ToDo : ToDoCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAppointment_schedule = async (filter) =>{
  try {
        
    const Appointment_scheduleCnt =  await Appointment_schedule.countDocuments(filter);
    return { Appointment_schedule : Appointment_scheduleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countEvent = async (filter) =>{
  try {
        
    const EventCnt =  await Event.countDocuments(filter);
    return { Event : EventCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAppointment_slot = async (filter) =>{
  try {
        
    let appointment_slot = await Appointment_slot.find(filter, { _id:1 });
    if (appointment_slot.length){
      appointment_slot = appointment_slot.map((obj) => obj._id);

      const Appointment_scheduleFilter = { '$or': [{                    slot : { '$in' : appointment_slot } }] };
      const Appointment_scheduleCnt =  await dbService.countDocument(Appointment_schedule,Appointment_scheduleFilter);

      let response = { Appointment_schedule : Appointment_scheduleCnt, };
      return response;
    } else {
      return {  appointment_slot : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countMaster = async (filter) =>{
  try {
        
    let master = await Master.find(filter, { _id:1 });
    if (master.length){
      master = master.map((obj) => obj._id);

      const MasterFilter = { '$or': [{                    parentId : { '$in' : master } }] };
      const MasterCnt =  await dbService.countDocument(Master,MasterFilter);

      let response = { Master : MasterCnt, };
      return response;
    } else {
      return {  master : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
        
    const BlogCnt =  await Blog.countDocuments(filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const patientFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const patientCnt =  await dbService.countDocument(Patient,patientFilter);

      const orderItemFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const orderItemCnt =  await dbService.countDocument(OrderItem,orderItemFilter);

      const orderFilter = { '$or': [{                    orderBy : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const orderCnt =  await dbService.countDocument(Order,orderFilter);

      const medicationFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const medicationCnt =  await dbService.countDocument(Medication,medicationFilter);

      const noteFilter = { '$or': [{                    provider : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const noteCnt =  await dbService.countDocument(Note,noteFilter);

      const encounterFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const encounterCnt =  await dbService.countDocument(Encounter,encounterFilter);

      const enterpriseFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const enterpriseCnt =  await dbService.countDocument(Enterprise,enterpriseFilter);

      const departmentsFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const departmentsCnt =  await dbService.countDocument(Departments,departmentsFilter);

      const CustomerFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const CustomerCnt =  await dbService.countDocument(Customer,CustomerFilter);

      const TaskFilter = { '$or': [{                    completedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const TaskCnt =  await dbService.countDocument(Task,TaskFilter);

      const PlanFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const PlanCnt =  await dbService.countDocument(Plan,PlanFilter);

      const Chat_messageFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const Chat_messageCnt =  await dbService.countDocument(Chat_message,Chat_messageFilter);

      const CommentFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const CommentCnt =  await dbService.countDocument(Comment,CommentFilter);

      const Chat_groupFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const Chat_groupCnt =  await dbService.countDocument(Chat_group,Chat_groupFilter);

      const ToDoFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const ToDoCnt =  await dbService.countDocument(ToDo,ToDoFilter);

      const Appointment_scheduleFilter = { '$or': [{                    host : { '$in' : user } },{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const Appointment_scheduleCnt =  await dbService.countDocument(Appointment_schedule,Appointment_scheduleFilter);

      const EventFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const EventCnt =  await dbService.countDocument(Event,EventFilter);

      const Appointment_slotFilter = { '$or': [{                    userId : { '$in' : user } },{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const Appointment_slotCnt =  await dbService.countDocument(Appointment_slot,Appointment_slotFilter);

      const MasterFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const MasterCnt =  await dbService.countDocument(Master,MasterFilter);

      const BlogFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const BlogCnt =  await dbService.countDocument(Blog,BlogFilter);

      const userFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const roleCnt =  await dbService.countDocument(Role,roleFilter);

      const projectRouteFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const projectRouteCnt =  await dbService.countDocument(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        patient : patientCnt,
        orderItem : orderItemCnt,
        order : orderCnt,
        medication : medicationCnt,
        note : noteCnt,
        encounter : encounterCnt,
        enterprise : enterpriseCnt,
        departments : departmentsCnt,
        Customer : CustomerCnt,
        Task : TaskCnt,
        Plan : PlanCnt,
        Chat_message : Chat_messageCnt,
        Comment : CommentCnt,
        Chat_group : Chat_groupCnt,
        ToDo : ToDoCnt,
        Appointment_schedule : Appointment_scheduleCnt,
        Event : EventCnt,
        Appointment_slot : Appointment_slotCnt,
        Master : MasterCnt,
        Blog : BlogCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePatient = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let patient = await Patient.find(filter, { _id:1 });
    if (patient.length){
      patient = patient.map((obj) => obj._id);
      const orderFilter0845 = { 'patientId': { '$in': patient } };
      const order7693 = await softDeleteOrder(orderFilter0845, updateBody);
      return await Patient.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No patient found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrderItem = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await OrderItem.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrder = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Order.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMedication = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Medication.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteNote = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Note.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEncounter = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let encounter = await Encounter.find(filter, { _id:1 });
    if (encounter.length){
      encounter = encounter.map((obj) => obj._id);
      const noteFilter8586 = { 'encounterId': { '$in': encounter } };
      const note6878 = await softDeleteNote(noteFilter8586, updateBody);
      return await Encounter.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No encounter found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEnterprise = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let enterprise = await Enterprise.find(filter, { _id:1 });
    if (enterprise.length){
      enterprise = enterprise.map((obj) => obj._id);
      const departmentsFilter3395 = { 'enterprises': { '$in': enterprise } };
      const departments2608 = await softDeleteDepartments(departmentsFilter3395, updateBody);
      return await Enterprise.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No enterprise found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteDepartments = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Departments.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCustomer = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Customer.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTask = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Task.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePlan = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Plan.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_message = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Chat_message.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteComment = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let comment = await Comment.find(filter, { _id:1 });
    if (comment.length){
      comment = comment.map((obj) => obj._id);
      const CommentFilter0635 = { 'parentItem': { '$in': comment } };
      const Comment2348 = await softDeleteComment(CommentFilter0635, updateBody);
      return await Comment.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No Comment found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_group = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let chat_group = await Chat_group.find(filter, { _id:1 });
    if (chat_group.length){
      chat_group = chat_group.map((obj) => obj._id);
      const Chat_messageFilter7757 = { 'groupId': { '$in': chat_group } };
      const Chat_message2190 = await softDeleteChat_message(Chat_messageFilter7757, updateBody);
      return await Chat_group.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No Chat_group found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteToDo = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await ToDo.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAppointment_schedule = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Appointment_schedule.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEvent = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Event.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAppointment_slot = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let appointment_slot = await Appointment_slot.find(filter, { _id:1 });
    if (appointment_slot.length){
      appointment_slot = appointment_slot.map((obj) => obj._id);
      const Appointment_scheduleFilter3800 = { 'slot': { '$in': appointment_slot } };
      const Appointment_schedule8212 = await softDeleteAppointment_schedule(Appointment_scheduleFilter3800, updateBody);
      return await Appointment_slot.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No Appointment_slot found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMaster = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let master = await Master.find(filter, { _id:1 });
    if (master.length){
      master = master.map((obj) => obj._id);
      const MasterFilter3817 = { 'parentId': { '$in': master } };
      const Master5847 = await softDeleteMaster(MasterFilter3817, updateBody);
      return await Master.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No Master found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Blog.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const patientFilter6154 = { 'addedBy': { '$in': user } };
      const patient3959 = await softDeletePatient(patientFilter6154, updateBody);
      const patientFilter8816 = { 'updatedBy': { '$in': user } };
      const patient0784 = await softDeletePatient(patientFilter8816, updateBody);
      const orderItemFilter6346 = { 'addedBy': { '$in': user } };
      const orderItem9563 = await softDeleteOrderItem(orderItemFilter6346, updateBody);
      const orderItemFilter9679 = { 'updatedBy': { '$in': user } };
      const orderItem3707 = await softDeleteOrderItem(orderItemFilter9679, updateBody);
      const orderFilter9646 = { 'orderBy': { '$in': user } };
      const order1773 = await softDeleteOrder(orderFilter9646, updateBody);
      const orderFilter0154 = { 'addedBy': { '$in': user } };
      const order2567 = await softDeleteOrder(orderFilter0154, updateBody);
      const orderFilter5835 = { 'updatedBy': { '$in': user } };
      const order8387 = await softDeleteOrder(orderFilter5835, updateBody);
      const medicationFilter8415 = { 'addedBy': { '$in': user } };
      const medication4622 = await softDeleteMedication(medicationFilter8415, updateBody);
      const medicationFilter5609 = { 'updatedBy': { '$in': user } };
      const medication2683 = await softDeleteMedication(medicationFilter5609, updateBody);
      const noteFilter1573 = { 'provider': { '$in': user } };
      const note1515 = await softDeleteNote(noteFilter1573, updateBody);
      const noteFilter9518 = { 'addedBy': { '$in': user } };
      const note5062 = await softDeleteNote(noteFilter9518, updateBody);
      const noteFilter3047 = { 'updatedBy': { '$in': user } };
      const note1354 = await softDeleteNote(noteFilter3047, updateBody);
      const encounterFilter2958 = { 'addedBy': { '$in': user } };
      const encounter7333 = await softDeleteEncounter(encounterFilter2958, updateBody);
      const encounterFilter8505 = { 'updatedBy': { '$in': user } };
      const encounter7753 = await softDeleteEncounter(encounterFilter8505, updateBody);
      const enterpriseFilter7538 = { 'addedBy': { '$in': user } };
      const enterprise3296 = await softDeleteEnterprise(enterpriseFilter7538, updateBody);
      const enterpriseFilter6275 = { 'updatedBy': { '$in': user } };
      const enterprise8278 = await softDeleteEnterprise(enterpriseFilter6275, updateBody);
      const departmentsFilter4725 = { 'addedBy': { '$in': user } };
      const departments5711 = await softDeleteDepartments(departmentsFilter4725, updateBody);
      const departmentsFilter3237 = { 'updatedBy': { '$in': user } };
      const departments7254 = await softDeleteDepartments(departmentsFilter3237, updateBody);
      const CustomerFilter2881 = { 'addedBy': { '$in': user } };
      const Customer5661 = await softDeleteCustomer(CustomerFilter2881, updateBody);
      const CustomerFilter9108 = { 'updatedBy': { '$in': user } };
      const Customer2341 = await softDeleteCustomer(CustomerFilter9108, updateBody);
      const TaskFilter6583 = { 'completedBy': { '$in': user } };
      const Task9834 = await softDeleteTask(TaskFilter6583, updateBody);
      const TaskFilter5616 = { 'updatedBy': { '$in': user } };
      const Task8783 = await softDeleteTask(TaskFilter5616, updateBody);
      const TaskFilter4857 = { 'addedBy': { '$in': user } };
      const Task9506 = await softDeleteTask(TaskFilter4857, updateBody);
      const PlanFilter9711 = { 'updatedBy': { '$in': user } };
      const Plan4741 = await softDeletePlan(PlanFilter9711, updateBody);
      const PlanFilter7481 = { 'addedBy': { '$in': user } };
      const Plan0659 = await softDeletePlan(PlanFilter7481, updateBody);
      const Chat_messageFilter3152 = { 'updatedBy': { '$in': user } };
      const Chat_message7738 = await softDeleteChat_message(Chat_messageFilter3152, updateBody);
      const Chat_messageFilter2190 = { 'addedBy': { '$in': user } };
      const Chat_message0720 = await softDeleteChat_message(Chat_messageFilter2190, updateBody);
      const CommentFilter2277 = { 'updatedBy': { '$in': user } };
      const Comment0179 = await softDeleteComment(CommentFilter2277, updateBody);
      const CommentFilter2204 = { 'addedBy': { '$in': user } };
      const Comment3011 = await softDeleteComment(CommentFilter2204, updateBody);
      const Chat_groupFilter8354 = { 'updatedBy': { '$in': user } };
      const Chat_group6478 = await softDeleteChat_group(Chat_groupFilter8354, updateBody);
      const Chat_groupFilter5396 = { 'addedBy': { '$in': user } };
      const Chat_group8118 = await softDeleteChat_group(Chat_groupFilter5396, updateBody);
      const ToDoFilter2590 = { 'addedBy': { '$in': user } };
      const ToDo4345 = await softDeleteToDo(ToDoFilter2590, updateBody);
      const ToDoFilter2106 = { 'updatedBy': { '$in': user } };
      const ToDo6755 = await softDeleteToDo(ToDoFilter2106, updateBody);
      const Appointment_scheduleFilter3376 = { 'host': { '$in': user } };
      const Appointment_schedule7659 = await softDeleteAppointment_schedule(Appointment_scheduleFilter3376, updateBody);
      const Appointment_scheduleFilter5786 = { 'updatedBy': { '$in': user } };
      const Appointment_schedule4585 = await softDeleteAppointment_schedule(Appointment_scheduleFilter5786, updateBody);
      const Appointment_scheduleFilter8578 = { 'addedBy': { '$in': user } };
      const Appointment_schedule7981 = await softDeleteAppointment_schedule(Appointment_scheduleFilter8578, updateBody);
      const EventFilter2642 = { 'updatedBy': { '$in': user } };
      const Event0755 = await softDeleteEvent(EventFilter2642, updateBody);
      const EventFilter9184 = { 'addedBy': { '$in': user } };
      const Event3854 = await softDeleteEvent(EventFilter9184, updateBody);
      const Appointment_slotFilter0578 = { 'userId': { '$in': user } };
      const Appointment_slot0766 = await softDeleteAppointment_slot(Appointment_slotFilter0578, updateBody);
      const Appointment_slotFilter2262 = { 'updatedBy': { '$in': user } };
      const Appointment_slot3293 = await softDeleteAppointment_slot(Appointment_slotFilter2262, updateBody);
      const Appointment_slotFilter5571 = { 'addedBy': { '$in': user } };
      const Appointment_slot2712 = await softDeleteAppointment_slot(Appointment_slotFilter5571, updateBody);
      const MasterFilter5855 = { 'updatedBy': { '$in': user } };
      const Master2720 = await softDeleteMaster(MasterFilter5855, updateBody);
      const MasterFilter7080 = { 'addedBy': { '$in': user } };
      const Master7222 = await softDeleteMaster(MasterFilter7080, updateBody);
      const BlogFilter3121 = { 'updatedBy': { '$in': user } };
      const Blog8233 = await softDeleteBlog(BlogFilter3121, updateBody);
      const BlogFilter2274 = { 'addedBy': { '$in': user } };
      const Blog7819 = await softDeleteBlog(BlogFilter2274, updateBody);
      const userFilter6282 = { 'addedBy': { '$in': user } };
      const user9366 = await softDeleteUser(userFilter6282, updateBody);
      const userFilter7654 = { 'updatedBy': { '$in': user } };
      const user3889 = await softDeleteUser(userFilter7654, updateBody);
      const userTokensFilter7925 = { 'userId': { '$in': user } };
      const userTokens8810 = await softDeleteUserTokens(userTokensFilter7925, updateBody);
      const userTokensFilter4224 = { 'addedBy': { '$in': user } };
      const userTokens4358 = await softDeleteUserTokens(userTokensFilter4224, updateBody);
      const userTokensFilter8859 = { 'updatedBy': { '$in': user } };
      const userTokens4469 = await softDeleteUserTokens(userTokensFilter8859, updateBody);
      const roleFilter8493 = { 'addedBy': { '$in': user } };
      const role2859 = await softDeleteRole(roleFilter8493, updateBody);
      const roleFilter8137 = { 'updatedBy': { '$in': user } };
      const role1427 = await softDeleteRole(roleFilter8137, updateBody);
      const projectRouteFilter4899 = { 'addedBy': { '$in': user } };
      const projectRoute5454 = await softDeleteProjectRoute(projectRouteFilter4899, updateBody);
      const projectRouteFilter7298 = { 'updatedBy': { '$in': user } };
      const projectRoute0677 = await softDeleteProjectRoute(projectRouteFilter7298, updateBody);
      const routeRoleFilter4551 = { 'addedBy': { '$in': user } };
      const routeRole6087 = await softDeleteRouteRole(routeRoleFilter4551, updateBody);
      const routeRoleFilter8602 = { 'updatedBy': { '$in': user } };
      const routeRole4285 = await softDeleteRouteRole(routeRoleFilter8602, updateBody);
      const userRoleFilter3548 = { 'userId': { '$in': user } };
      const userRole1882 = await softDeleteUserRole(userRoleFilter3548, updateBody);
      const userRoleFilter2400 = { 'addedBy': { '$in': user } };
      const userRole8806 = await softDeleteUserRole(userRoleFilter2400, updateBody);
      const userRoleFilter8987 = { 'updatedBy': { '$in': user } };
      const userRole6842 = await softDeleteUserRole(userRoleFilter8987, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter9326 = { 'roleId': { '$in': role } };
      const routeRole7009 = await softDeleteRouteRole(routeRoleFilter9326, updateBody);
      const userRoleFilter6322 = { 'roleId': { '$in': role } };
      const userRole6669 = await softDeleteUserRole(userRoleFilter6322, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter3968 = { 'routeId': { '$in': projectroute } };
      const routeRole4776 = await softDeleteRouteRole(routeRoleFilter3968, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deletePatient,
  deleteOrderItem,
  deleteOrder,
  deleteMedication,
  deleteNote,
  deleteEncounter,
  deleteEnterprise,
  deleteDepartments,
  deleteCustomer,
  deleteTask,
  deletePlan,
  deleteChat_message,
  deleteComment,
  deleteChat_group,
  deleteToDo,
  deleteAppointment_schedule,
  deleteEvent,
  deleteAppointment_slot,
  deleteMaster,
  deleteBlog,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countPatient,
  countOrderItem,
  countOrder,
  countMedication,
  countNote,
  countEncounter,
  countEnterprise,
  countDepartments,
  countCustomer,
  countTask,
  countPlan,
  countChat_message,
  countComment,
  countChat_group,
  countToDo,
  countAppointment_schedule,
  countEvent,
  countAppointment_slot,
  countMaster,
  countBlog,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeletePatient,
  softDeleteOrderItem,
  softDeleteOrder,
  softDeleteMedication,
  softDeleteNote,
  softDeleteEncounter,
  softDeleteEnterprise,
  softDeleteDepartments,
  softDeleteCustomer,
  softDeleteTask,
  softDeletePlan,
  softDeleteChat_message,
  softDeleteComment,
  softDeleteChat_group,
  softDeleteToDo,
  softDeleteAppointment_schedule,
  softDeleteEvent,
  softDeleteAppointment_slot,
  softDeleteMaster,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
