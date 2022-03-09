/**
 * orderItemRoutes.js
 * @description :: CRUD API routes for orderItem
 */

const express = require('express');
const router = express.Router();
const orderItemController = require('../../../controller/device/v1/orderItemController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/orderitem/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,orderItemController.addOrderItem);
router.route('/device/api/v1/orderitem/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,orderItemController.findAllOrderItem);
router.route('/device/api/v1/orderitem/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,orderItemController.getOrderItemCount);
router.route('/device/api/v1/orderitem/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,orderItemController.softDeleteManyOrderItem);
router.route('/device/api/v1/orderitem/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,orderItemController.bulkInsertOrderItem);
router.route('/device/api/v1/orderitem/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,orderItemController.bulkUpdateOrderItem);
router.route('/device/api/v1/orderitem/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,orderItemController.deleteManyOrderItem);
router.route('/device/api/v1/orderitem/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,orderItemController.softDeleteOrderItem);
router.route('/device/api/v1/orderitem/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,orderItemController.partialUpdateOrderItem);
router.route('/device/api/v1/orderitem/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,orderItemController.updateOrderItem);    
router.route('/device/api/v1/orderitem/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,orderItemController.getOrderItem);
router.route('/device/api/v1/orderitem/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,orderItemController.deleteOrderItem);

module.exports = router;
