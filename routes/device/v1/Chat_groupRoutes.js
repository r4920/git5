/**
 * Chat_groupRoutes.js
 * @description :: CRUD API routes for Chat_group
 */

const express = require('express');
const router = express.Router();
const Chat_groupController = require('../../../controller/device/v1/Chat_groupController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/chat_group/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,Chat_groupController.addChat_group);
router.route('/device/api/v1/chat_group/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,Chat_groupController.findAllChat_group);
router.route('/device/api/v1/chat_group/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,Chat_groupController.getChat_groupCount);
router.route('/device/api/v1/chat_group/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,Chat_groupController.softDeleteManyChat_group);
router.route('/device/api/v1/chat_group/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,Chat_groupController.bulkInsertChat_group);
router.route('/device/api/v1/chat_group/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,Chat_groupController.bulkUpdateChat_group);
router.route('/device/api/v1/chat_group/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,Chat_groupController.deleteManyChat_group);
router.route('/device/api/v1/chat_group/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,Chat_groupController.softDeleteChat_group);
router.route('/device/api/v1/chat_group/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,Chat_groupController.partialUpdateChat_group);
router.route('/device/api/v1/chat_group/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,Chat_groupController.updateChat_group);    
router.route('/device/api/v1/chat_group/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,Chat_groupController.getChat_group);
router.route('/device/api/v1/chat_group/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,Chat_groupController.deleteChat_group);

module.exports = router;
