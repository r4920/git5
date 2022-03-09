/**
 * Appointment_scheduleRoutes.js
 * @description :: CRUD API routes for Appointment_schedule
 */

const express = require('express');
const router = express.Router();
const Appointment_scheduleController = require('../../controller/admin/Appointment_scheduleController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/appointment_schedule/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,Appointment_scheduleController.addAppointment_schedule);
router.route('/admin/appointment_schedule/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,Appointment_scheduleController.findAllAppointment_schedule);
router.route('/admin/appointment_schedule/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,Appointment_scheduleController.getAppointment_scheduleCount);
router.route('/admin/appointment_schedule/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,Appointment_scheduleController.softDeleteManyAppointment_schedule);
router.route('/admin/appointment_schedule/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,Appointment_scheduleController.bulkInsertAppointment_schedule);
router.route('/admin/appointment_schedule/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,Appointment_scheduleController.bulkUpdateAppointment_schedule);
router.route('/admin/appointment_schedule/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,Appointment_scheduleController.deleteManyAppointment_schedule);
router.route('/admin/appointment_schedule/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,Appointment_scheduleController.softDeleteAppointment_schedule);
router.route('/admin/appointment_schedule/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,Appointment_scheduleController.partialUpdateAppointment_schedule);
router.route('/admin/appointment_schedule/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,Appointment_scheduleController.updateAppointment_schedule);    
router.route('/admin/appointment_schedule/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,Appointment_scheduleController.getAppointment_schedule);
router.route('/admin/appointment_schedule/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,Appointment_scheduleController.deleteAppointment_schedule);

module.exports = router;
