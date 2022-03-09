/**
 * enterpriseRoutes.js
 * @description :: CRUD API routes for enterprise
 */

const express = require('express');
const router = express.Router();
const enterpriseController = require('../../../controller/device/v1/enterpriseController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/enterprise/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,enterpriseController.addEnterprise);
router.route('/device/api/v1/enterprise/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,enterpriseController.findAllEnterprise);
router.route('/device/api/v1/enterprise/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,enterpriseController.getEnterpriseCount);
router.route('/device/api/v1/enterprise/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,enterpriseController.softDeleteManyEnterprise);
router.route('/device/api/v1/enterprise/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,enterpriseController.bulkInsertEnterprise);
router.route('/device/api/v1/enterprise/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,enterpriseController.bulkUpdateEnterprise);
router.route('/device/api/v1/enterprise/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,enterpriseController.deleteManyEnterprise);
router.route('/device/api/v1/enterprise/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,enterpriseController.softDeleteEnterprise);
router.route('/device/api/v1/enterprise/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,enterpriseController.partialUpdateEnterprise);
router.route('/device/api/v1/enterprise/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,enterpriseController.updateEnterprise);    
router.route('/device/api/v1/enterprise/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,enterpriseController.getEnterprise);
router.route('/device/api/v1/enterprise/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,enterpriseController.deleteEnterprise);

module.exports = router;
