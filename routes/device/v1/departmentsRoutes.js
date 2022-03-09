/**
 * departmentsRoutes.js
 * @description :: CRUD API routes for departments
 */

const express = require('express');
const router = express.Router();
const departmentsController = require('../../../controller/device/v1/departmentsController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/departments/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,departmentsController.addDepartments);
router.route('/device/api/v1/departments/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,departmentsController.findAllDepartments);
router.route('/device/api/v1/departments/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,departmentsController.getDepartmentsCount);
router.route('/device/api/v1/departments/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,departmentsController.softDeleteManyDepartments);
router.route('/device/api/v1/departments/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,departmentsController.bulkInsertDepartments);
router.route('/device/api/v1/departments/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,departmentsController.bulkUpdateDepartments);
router.route('/device/api/v1/departments/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,departmentsController.deleteManyDepartments);
router.route('/device/api/v1/departments/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,departmentsController.softDeleteDepartments);
router.route('/device/api/v1/departments/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,departmentsController.partialUpdateDepartments);
router.route('/device/api/v1/departments/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,departmentsController.updateDepartments);    
router.route('/device/api/v1/departments/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,departmentsController.getDepartments);
router.route('/device/api/v1/departments/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,departmentsController.deleteDepartments);

module.exports = router;
