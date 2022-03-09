/**
 * TaskRoutes.js
 * @description :: CRUD API routes for Task
 */

const express = require('express');
const router = express.Router();
const TaskController = require('../../../controller/device/v1/TaskController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/task/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,TaskController.addTask);
router.route('/device/api/v1/task/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,TaskController.findAllTask);
router.route('/device/api/v1/task/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,TaskController.getTaskCount);
router.route('/device/api/v1/task/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,TaskController.softDeleteManyTask);
router.route('/device/api/v1/task/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,TaskController.bulkInsertTask);
router.route('/device/api/v1/task/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,TaskController.bulkUpdateTask);
router.route('/device/api/v1/task/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,TaskController.deleteManyTask);
router.route('/device/api/v1/task/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,TaskController.softDeleteTask);
router.route('/device/api/v1/task/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,TaskController.partialUpdateTask);
router.route('/device/api/v1/task/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,TaskController.updateTask);    
router.route('/device/api/v1/task/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,TaskController.getTask);
router.route('/device/api/v1/task/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,TaskController.deleteTask);

module.exports = router;
