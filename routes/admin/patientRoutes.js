/**
 * patientRoutes.js
 * @description :: CRUD API routes for patient
 */

const express = require('express');
const router = express.Router();
const patientController = require('../../controller/admin/patientController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/patient/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,patientController.addPatient);
router.route('/admin/patient/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,patientController.findAllPatient);
router.route('/admin/patient/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,patientController.getPatientCount);
router.route('/admin/patient/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,patientController.softDeleteManyPatient);
router.route('/admin/patient/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,patientController.bulkInsertPatient);
router.route('/admin/patient/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,patientController.bulkUpdatePatient);
router.route('/admin/patient/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,patientController.deleteManyPatient);
router.route('/admin/patient/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,patientController.softDeletePatient);
router.route('/admin/patient/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,patientController.partialUpdatePatient);
router.route('/admin/patient/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,patientController.updatePatient);    
router.route('/admin/patient/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,patientController.getPatient);
router.route('/admin/patient/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,patientController.deletePatient);

module.exports = router;
