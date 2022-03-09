/**
 * Appointment_slotRoutes.js
 * @description :: CRUD API routes for Appointment_slot
 */

const express = require('express');
const router = express.Router();
const Appointment_slotController = require('../../controller/admin/Appointment_slotController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/appointment_slot/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,Appointment_slotController.addAppointment_slot);
router.route('/admin/appointment_slot/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,Appointment_slotController.findAllAppointment_slot);
router.route('/admin/appointment_slot/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,Appointment_slotController.getAppointment_slotCount);
router.route('/admin/appointment_slot/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,Appointment_slotController.softDeleteManyAppointment_slot);
router.route('/admin/appointment_slot/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,Appointment_slotController.bulkInsertAppointment_slot);
router.route('/admin/appointment_slot/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,Appointment_slotController.bulkUpdateAppointment_slot);
router.route('/admin/appointment_slot/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,Appointment_slotController.deleteManyAppointment_slot);
router.route('/admin/appointment_slot/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,Appointment_slotController.softDeleteAppointment_slot);
router.route('/admin/appointment_slot/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,Appointment_slotController.partialUpdateAppointment_slot);
router.route('/admin/appointment_slot/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,Appointment_slotController.updateAppointment_slot);    
router.route('/admin/appointment_slot/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,Appointment_slotController.getAppointment_slot);
router.route('/admin/appointment_slot/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,Appointment_slotController.deleteAppointment_slot);

module.exports = router;
