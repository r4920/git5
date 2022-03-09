/**
 * departmentsRoutes.js
 * @description :: CRUD API routes for departments
 */

const express = require('express');
const router = express.Router();
const departmentsController = require('../../controller/admin/departmentsController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/departments/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,departmentsController.addDepartments);
router.route('/admin/departments/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,departmentsController.findAllDepartments);
router.route('/admin/departments/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,departmentsController.getDepartmentsCount);
router.route('/admin/departments/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,departmentsController.softDeleteManyDepartments);
router.route('/admin/departments/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,departmentsController.bulkInsertDepartments);
router.route('/admin/departments/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,departmentsController.bulkUpdateDepartments);
router.route('/admin/departments/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,departmentsController.deleteManyDepartments);
router.route('/admin/departments/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,departmentsController.softDeleteDepartments);
router.route('/admin/departments/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,departmentsController.partialUpdateDepartments);
router.route('/admin/departments/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,departmentsController.updateDepartments);    
router.route('/admin/departments/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,departmentsController.getDepartments);
router.route('/admin/departments/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,departmentsController.deleteDepartments);

module.exports = router;
