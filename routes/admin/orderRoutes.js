/**
 * orderRoutes.js
 * @description :: CRUD API routes for order
 */

const express = require('express');
const router = express.Router();
const orderController = require('../../controller/admin/orderController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/order/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,orderController.addOrder);
router.route('/admin/order/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,orderController.findAllOrder);
router.route('/admin/order/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,orderController.getOrderCount);
router.route('/admin/order/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,orderController.softDeleteManyOrder);
router.route('/admin/order/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,orderController.bulkInsertOrder);
router.route('/admin/order/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,orderController.bulkUpdateOrder);
router.route('/admin/order/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,orderController.deleteManyOrder);
router.route('/admin/order/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,orderController.softDeleteOrder);
router.route('/admin/order/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,orderController.partialUpdateOrder);
router.route('/admin/order/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,orderController.updateOrder);    
router.route('/admin/order/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,orderController.getOrder);
router.route('/admin/order/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,orderController.deleteOrder);

module.exports = router;
