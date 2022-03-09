/**
 * noteRoutes.js
 * @description :: CRUD API routes for note
 */

const express = require('express');
const router = express.Router();
const noteController = require('../../../controller/device/v1/noteController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/note/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,noteController.addNote);
router.route('/device/api/v1/note/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,noteController.findAllNote);
router.route('/device/api/v1/note/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,noteController.getNoteCount);
router.route('/device/api/v1/note/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,noteController.softDeleteManyNote);
router.route('/device/api/v1/note/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,noteController.bulkInsertNote);
router.route('/device/api/v1/note/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,noteController.bulkUpdateNote);
router.route('/device/api/v1/note/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,noteController.deleteManyNote);
router.route('/device/api/v1/note/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,noteController.softDeleteNote);
router.route('/device/api/v1/note/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,noteController.partialUpdateNote);
router.route('/device/api/v1/note/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,noteController.updateNote);    
router.route('/device/api/v1/note/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,noteController.getNote);
router.route('/device/api/v1/note/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,noteController.deleteNote);

module.exports = router;
