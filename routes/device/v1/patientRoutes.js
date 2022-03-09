/**
 * patientRoutes.js
 * @description :: CRUD API routes for patient
 */

const express = require('express');
const router = express.Router();
const patientController = require('../../../controller/device/v1/patientController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/patient/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,patientController.addPatient);
router.route('/device/api/v1/patient/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,patientController.findAllPatient);
router.route('/device/api/v1/patient/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,patientController.getPatientCount);
router.route('/device/api/v1/patient/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,patientController.softDeleteManyPatient);
router.route('/device/api/v1/patient/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,patientController.bulkInsertPatient);
router.route('/device/api/v1/patient/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,patientController.bulkUpdatePatient);
router.route('/device/api/v1/patient/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,patientController.deleteManyPatient);
router.route('/device/api/v1/patient/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,patientController.softDeletePatient);
router.route('/device/api/v1/patient/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,patientController.partialUpdatePatient);
router.route('/device/api/v1/patient/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,patientController.updatePatient);    
router.route('/device/api/v1/patient/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,patientController.getPatient);
router.route('/device/api/v1/patient/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,patientController.deletePatient);

module.exports = router;
