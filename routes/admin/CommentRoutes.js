/**
 * CommentRoutes.js
 * @description :: CRUD API routes for Comment
 */

const express = require('express');
const router = express.Router();
const CommentController = require('../../controller/admin/CommentController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/comment/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,CommentController.addComment);
router.route('/admin/comment/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,CommentController.findAllComment);
router.route('/admin/comment/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,CommentController.getCommentCount);
router.route('/admin/comment/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,CommentController.softDeleteManyComment);
router.route('/admin/comment/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,CommentController.bulkInsertComment);
router.route('/admin/comment/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,CommentController.bulkUpdateComment);
router.route('/admin/comment/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,CommentController.deleteManyComment);
router.route('/admin/comment/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,CommentController.softDeleteComment);
router.route('/admin/comment/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,CommentController.partialUpdateComment);
router.route('/admin/comment/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,CommentController.updateComment);    
router.route('/admin/comment/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,CommentController.getComment);
router.route('/admin/comment/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,CommentController.deleteComment);

module.exports = router;
