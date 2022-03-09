/**
 * ToDoRoutes.js
 * @description :: CRUD API routes for ToDo
 */

const express = require('express');
const router = express.Router();
const ToDoController = require('../../controller/admin/ToDoController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/todo/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,ToDoController.addToDo);
router.route('/admin/todo/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,ToDoController.findAllToDo);
router.route('/admin/todo/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,ToDoController.getToDoCount);
router.route('/admin/todo/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,ToDoController.softDeleteManyToDo);
router.route('/admin/todo/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,ToDoController.bulkInsertToDo);
router.route('/admin/todo/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,ToDoController.bulkUpdateToDo);
router.route('/admin/todo/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,ToDoController.deleteManyToDo);
router.route('/admin/todo/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,ToDoController.softDeleteToDo);
router.route('/admin/todo/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,ToDoController.partialUpdateToDo);
router.route('/admin/todo/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,ToDoController.updateToDo);    
router.route('/admin/todo/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,ToDoController.getToDo);
router.route('/admin/todo/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,ToDoController.deleteToDo);

module.exports = router;
