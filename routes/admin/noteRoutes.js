/**
 * noteRoutes.js
 * @description :: CRUD API routes for note
 */

const express = require('express');
const router = express.Router();
const noteController = require('../../controller/admin/noteController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/note/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,noteController.addNote);
router.route('/admin/note/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,noteController.findAllNote);
router.route('/admin/note/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,noteController.getNoteCount);
router.route('/admin/note/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,noteController.softDeleteManyNote);
router.route('/admin/note/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,noteController.bulkInsertNote);
router.route('/admin/note/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,noteController.bulkUpdateNote);
router.route('/admin/note/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,noteController.deleteManyNote);
router.route('/admin/note/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,noteController.softDeleteNote);
router.route('/admin/note/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,noteController.partialUpdateNote);
router.route('/admin/note/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,noteController.updateNote);    
router.route('/admin/note/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,noteController.getNote);
router.route('/admin/note/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,noteController.deleteNote);

module.exports = router;
