/**
 * CustomerRoutes.js
 * @description :: CRUD API routes for Customer
 */

const express = require('express');
const router = express.Router();
const CustomerController = require('../../../controller/device/v1/CustomerController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/customer/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,CustomerController.addCustomer);
router.route('/device/api/v1/customer/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,CustomerController.findAllCustomer);
router.route('/device/api/v1/customer/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,CustomerController.getCustomerCount);
router.route('/device/api/v1/customer/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,CustomerController.softDeleteManyCustomer);
router.route('/device/api/v1/customer/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,CustomerController.bulkInsertCustomer);
router.route('/device/api/v1/customer/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,CustomerController.bulkUpdateCustomer);
router.route('/device/api/v1/customer/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,CustomerController.deleteManyCustomer);
router.route('/device/api/v1/customer/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,CustomerController.softDeleteCustomer);
router.route('/device/api/v1/customer/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,CustomerController.partialUpdateCustomer);
router.route('/device/api/v1/customer/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,CustomerController.updateCustomer);    
router.route('/device/api/v1/customer/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,CustomerController.getCustomer);
router.route('/device/api/v1/customer/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,CustomerController.deleteCustomer);

module.exports = router;
