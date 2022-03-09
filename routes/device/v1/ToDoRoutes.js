/**
 * ToDoRoutes.js
 * @description :: CRUD API routes for ToDo
 */

const express = require('express');
const router = express.Router();
const ToDoController = require('../../../controller/device/v1/ToDoController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/todo/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,ToDoController.addToDo);
router.route('/device/api/v1/todo/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,ToDoController.findAllToDo);
router.route('/device/api/v1/todo/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,ToDoController.getToDoCount);
router.route('/device/api/v1/todo/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,ToDoController.softDeleteManyToDo);
router.route('/device/api/v1/todo/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,ToDoController.bulkInsertToDo);
router.route('/device/api/v1/todo/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,ToDoController.bulkUpdateToDo);
router.route('/device/api/v1/todo/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,ToDoController.deleteManyToDo);
router.route('/device/api/v1/todo/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,ToDoController.softDeleteToDo);
router.route('/device/api/v1/todo/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,ToDoController.partialUpdateToDo);
router.route('/device/api/v1/todo/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,ToDoController.updateToDo);    
router.route('/device/api/v1/todo/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,ToDoController.getToDo);
router.route('/device/api/v1/todo/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,ToDoController.deleteToDo);

module.exports = router;
