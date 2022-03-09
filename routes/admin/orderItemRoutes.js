/**
 * orderItemRoutes.js
 * @description :: CRUD API routes for orderItem
 */

const express = require('express');
const router = express.Router();
const orderItemController = require('../../controller/admin/orderItemController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/orderitem/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,orderItemController.addOrderItem);
router.route('/admin/orderitem/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,orderItemController.findAllOrderItem);
router.route('/admin/orderitem/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,orderItemController.getOrderItemCount);
router.route('/admin/orderitem/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,orderItemController.softDeleteManyOrderItem);
router.route('/admin/orderitem/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,orderItemController.bulkInsertOrderItem);
router.route('/admin/orderitem/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,orderItemController.bulkUpdateOrderItem);
router.route('/admin/orderitem/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,orderItemController.deleteManyOrderItem);
router.route('/admin/orderitem/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,orderItemController.softDeleteOrderItem);
router.route('/admin/orderitem/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,orderItemController.partialUpdateOrderItem);
router.route('/admin/orderitem/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,orderItemController.updateOrderItem);    
router.route('/admin/orderitem/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,orderItemController.getOrderItem);
router.route('/admin/orderitem/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,orderItemController.deleteOrderItem);

module.exports = router;
