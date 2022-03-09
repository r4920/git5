/**
 * TaskRoutes.js
 * @description :: CRUD API routes for Task
 */

const express = require('express');
const router = express.Router();
const TaskController = require('../../controller/admin/TaskController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/task/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,TaskController.addTask);
router.route('/admin/task/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,TaskController.findAllTask);
router.route('/admin/task/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,TaskController.getTaskCount);
router.route('/admin/task/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,TaskController.softDeleteManyTask);
router.route('/admin/task/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,TaskController.bulkInsertTask);
router.route('/admin/task/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,TaskController.bulkUpdateTask);
router.route('/admin/task/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,TaskController.deleteManyTask);
router.route('/admin/task/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,TaskController.softDeleteTask);
router.route('/admin/task/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,TaskController.partialUpdateTask);
router.route('/admin/task/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,TaskController.updateTask);    
router.route('/admin/task/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,TaskController.getTask);
router.route('/admin/task/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,TaskController.deleteTask);

module.exports = router;
