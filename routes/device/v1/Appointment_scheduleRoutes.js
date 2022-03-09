/**
 * Appointment_scheduleRoutes.js
 * @description :: CRUD API routes for Appointment_schedule
 */

const express = require('express');
const router = express.Router();
const Appointment_scheduleController = require('../../../controller/device/v1/Appointment_scheduleController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/appointment_schedule/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,Appointment_scheduleController.addAppointment_schedule);
router.route('/device/api/v1/appointment_schedule/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,Appointment_scheduleController.findAllAppointment_schedule);
router.route('/device/api/v1/appointment_schedule/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,Appointment_scheduleController.getAppointment_scheduleCount);
router.route('/device/api/v1/appointment_schedule/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,Appointment_scheduleController.softDeleteManyAppointment_schedule);
router.route('/device/api/v1/appointment_schedule/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,Appointment_scheduleController.bulkInsertAppointment_schedule);
router.route('/device/api/v1/appointment_schedule/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,Appointment_scheduleController.bulkUpdateAppointment_schedule);
router.route('/device/api/v1/appointment_schedule/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,Appointment_scheduleController.deleteManyAppointment_schedule);
router.route('/device/api/v1/appointment_schedule/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,Appointment_scheduleController.softDeleteAppointment_schedule);
router.route('/device/api/v1/appointment_schedule/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,Appointment_scheduleController.partialUpdateAppointment_schedule);
router.route('/device/api/v1/appointment_schedule/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,Appointment_scheduleController.updateAppointment_schedule);    
router.route('/device/api/v1/appointment_schedule/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,Appointment_scheduleController.getAppointment_schedule);
router.route('/device/api/v1/appointment_schedule/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,Appointment_scheduleController.deleteAppointment_schedule);

module.exports = router;
