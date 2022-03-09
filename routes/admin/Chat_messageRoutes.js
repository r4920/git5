/**
 * Chat_messageRoutes.js
 * @description :: CRUD API routes for Chat_message
 */

const express = require('express');
const router = express.Router();
const Chat_messageController = require('../../controller/admin/Chat_messageController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/chat_message/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,Chat_messageController.addChat_message);
router.route('/admin/chat_message/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,Chat_messageController.findAllChat_message);
router.route('/admin/chat_message/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,Chat_messageController.getChat_messageCount);
router.route('/admin/chat_message/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,Chat_messageController.softDeleteManyChat_message);
router.route('/admin/chat_message/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,Chat_messageController.bulkInsertChat_message);
router.route('/admin/chat_message/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,Chat_messageController.bulkUpdateChat_message);
router.route('/admin/chat_message/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,Chat_messageController.deleteManyChat_message);
router.route('/admin/chat_message/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,Chat_messageController.softDeleteChat_message);
router.route('/admin/chat_message/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,Chat_messageController.partialUpdateChat_message);
router.route('/admin/chat_message/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,Chat_messageController.updateChat_message);    
router.route('/admin/chat_message/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,Chat_messageController.getChat_message);
router.route('/admin/chat_message/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,Chat_messageController.deleteChat_message);

module.exports = router;
