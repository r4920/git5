/**
 * medicationRoutes.js
 * @description :: CRUD API routes for medication
 */

const express = require('express');
const router = express.Router();
const medicationController = require('../../controller/admin/medicationController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/medication/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,medicationController.addMedication);
router.route('/admin/medication/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,medicationController.findAllMedication);
router.route('/admin/medication/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,medicationController.getMedicationCount);
router.route('/admin/medication/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,medicationController.softDeleteManyMedication);
router.route('/admin/medication/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,medicationController.bulkInsertMedication);
router.route('/admin/medication/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,medicationController.bulkUpdateMedication);
router.route('/admin/medication/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,medicationController.deleteManyMedication);
router.route('/admin/medication/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,medicationController.softDeleteMedication);
router.route('/admin/medication/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,medicationController.partialUpdateMedication);
router.route('/admin/medication/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,medicationController.updateMedication);    
router.route('/admin/medication/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,medicationController.getMedication);
router.route('/admin/medication/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,medicationController.deleteMedication);

module.exports = router;
