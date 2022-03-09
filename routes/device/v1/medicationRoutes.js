/**
 * medicationRoutes.js
 * @description :: CRUD API routes for medication
 */

const express = require('express');
const router = express.Router();
const medicationController = require('../../../controller/device/v1/medicationController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/medication/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,medicationController.addMedication);
router.route('/device/api/v1/medication/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,medicationController.findAllMedication);
router.route('/device/api/v1/medication/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,medicationController.getMedicationCount);
router.route('/device/api/v1/medication/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,medicationController.softDeleteManyMedication);
router.route('/device/api/v1/medication/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,medicationController.bulkInsertMedication);
router.route('/device/api/v1/medication/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,medicationController.bulkUpdateMedication);
router.route('/device/api/v1/medication/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,medicationController.deleteManyMedication);
router.route('/device/api/v1/medication/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,medicationController.softDeleteMedication);
router.route('/device/api/v1/medication/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,medicationController.partialUpdateMedication);
router.route('/device/api/v1/medication/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,medicationController.updateMedication);    
router.route('/device/api/v1/medication/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,medicationController.getMedication);
router.route('/device/api/v1/medication/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,medicationController.deleteMedication);

module.exports = router;
