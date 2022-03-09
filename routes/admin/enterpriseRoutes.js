/**
 * enterpriseRoutes.js
 * @description :: CRUD API routes for enterprise
 */

const express = require('express');
const router = express.Router();
const enterpriseController = require('../../controller/admin/enterpriseController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/enterprise/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,enterpriseController.addEnterprise);
router.route('/admin/enterprise/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,enterpriseController.findAllEnterprise);
router.route('/admin/enterprise/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,enterpriseController.getEnterpriseCount);
router.route('/admin/enterprise/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,enterpriseController.softDeleteManyEnterprise);
router.route('/admin/enterprise/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,enterpriseController.bulkInsertEnterprise);
router.route('/admin/enterprise/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,enterpriseController.bulkUpdateEnterprise);
router.route('/admin/enterprise/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,enterpriseController.deleteManyEnterprise);
router.route('/admin/enterprise/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,enterpriseController.softDeleteEnterprise);
router.route('/admin/enterprise/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,enterpriseController.partialUpdateEnterprise);
router.route('/admin/enterprise/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,enterpriseController.updateEnterprise);    
router.route('/admin/enterprise/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,enterpriseController.getEnterprise);
router.route('/admin/enterprise/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,enterpriseController.deleteEnterprise);

module.exports = router;
