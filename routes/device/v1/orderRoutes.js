/**
 * orderRoutes.js
 * @description :: CRUD API routes for order
 */

const express = require('express');
const router = express.Router();
const orderController = require('../../../controller/device/v1/orderController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/order/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,orderController.addOrder);
router.route('/device/api/v1/order/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,orderController.findAllOrder);
router.route('/device/api/v1/order/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,orderController.getOrderCount);
router.route('/device/api/v1/order/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,orderController.softDeleteManyOrder);
router.route('/device/api/v1/order/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,orderController.bulkInsertOrder);
router.route('/device/api/v1/order/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,orderController.bulkUpdateOrder);
router.route('/device/api/v1/order/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,orderController.deleteManyOrder);
router.route('/device/api/v1/order/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,orderController.softDeleteOrder);
router.route('/device/api/v1/order/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,orderController.partialUpdateOrder);
router.route('/device/api/v1/order/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,orderController.updateOrder);    
router.route('/device/api/v1/order/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,orderController.getOrder);
router.route('/device/api/v1/order/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,orderController.deleteOrder);

module.exports = router;
