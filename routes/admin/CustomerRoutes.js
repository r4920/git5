/**
 * CustomerRoutes.js
 * @description :: CRUD API routes for Customer
 */

const express = require('express');
const router = express.Router();
const CustomerController = require('../../controller/admin/CustomerController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/customer/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,CustomerController.addCustomer);
router.route('/admin/customer/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,CustomerController.findAllCustomer);
router.route('/admin/customer/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,CustomerController.getCustomerCount);
router.route('/admin/customer/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,CustomerController.softDeleteManyCustomer);
router.route('/admin/customer/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,CustomerController.bulkInsertCustomer);
router.route('/admin/customer/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,CustomerController.bulkUpdateCustomer);
router.route('/admin/customer/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,CustomerController.deleteManyCustomer);
router.route('/admin/customer/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,CustomerController.softDeleteCustomer);
router.route('/admin/customer/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,CustomerController.partialUpdateCustomer);
router.route('/admin/customer/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,CustomerController.updateCustomer);    
router.route('/admin/customer/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,CustomerController.getCustomer);
router.route('/admin/customer/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,CustomerController.deleteCustomer);

module.exports = router;
