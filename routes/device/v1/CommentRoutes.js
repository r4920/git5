/**
 * CommentRoutes.js
 * @description :: CRUD API routes for Comment
 */

const express = require('express');
const router = express.Router();
const CommentController = require('../../../controller/device/v1/CommentController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/comment/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,CommentController.addComment);
router.route('/device/api/v1/comment/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,CommentController.findAllComment);
router.route('/device/api/v1/comment/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,CommentController.getCommentCount);
router.route('/device/api/v1/comment/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,CommentController.softDeleteManyComment);
router.route('/device/api/v1/comment/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,CommentController.bulkInsertComment);
router.route('/device/api/v1/comment/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,CommentController.bulkUpdateComment);
router.route('/device/api/v1/comment/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,CommentController.deleteManyComment);
router.route('/device/api/v1/comment/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,CommentController.softDeleteComment);
router.route('/device/api/v1/comment/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,CommentController.partialUpdateComment);
router.route('/device/api/v1/comment/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,CommentController.updateComment);    
router.route('/device/api/v1/comment/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,CommentController.getComment);
router.route('/device/api/v1/comment/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,CommentController.deleteComment);

module.exports = router;
