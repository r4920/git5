/**
 * Appointment_slotRoutes.js
 * @description :: CRUD API routes for Appointment_slot
 */

const express = require('express');
const router = express.Router();
const Appointment_slotController = require('../../../controller/device/v1/Appointment_slotController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/appointment_slot/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,Appointment_slotController.addAppointment_slot);
router.route('/device/api/v1/appointment_slot/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,Appointment_slotController.findAllAppointment_slot);
router.route('/device/api/v1/appointment_slot/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,Appointment_slotController.getAppointment_slotCount);
router.route('/device/api/v1/appointment_slot/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,Appointment_slotController.softDeleteManyAppointment_slot);
router.route('/device/api/v1/appointment_slot/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,Appointment_slotController.bulkInsertAppointment_slot);
router.route('/device/api/v1/appointment_slot/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,Appointment_slotController.bulkUpdateAppointment_slot);
router.route('/device/api/v1/appointment_slot/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,Appointment_slotController.deleteManyAppointment_slot);
router.route('/device/api/v1/appointment_slot/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,Appointment_slotController.softDeleteAppointment_slot);
router.route('/device/api/v1/appointment_slot/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,Appointment_slotController.partialUpdateAppointment_slot);
router.route('/device/api/v1/appointment_slot/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,Appointment_slotController.updateAppointment_slot);    
router.route('/device/api/v1/appointment_slot/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,Appointment_slotController.getAppointment_slot);
router.route('/device/api/v1/appointment_slot/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,Appointment_slotController.deleteAppointment_slot);

module.exports = router;
