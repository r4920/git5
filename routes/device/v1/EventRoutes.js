/**
 * EventRoutes.js
 * @description :: CRUD API routes for Event
 */

const express = require('express');
const router = express.Router();
const EventController = require('../../../controller/device/v1/EventController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/event/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,EventController.addEvent);
router.route('/device/api/v1/event/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,EventController.findAllEvent);
router.route('/device/api/v1/event/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,EventController.getEventCount);
router.route('/device/api/v1/event/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,EventController.softDeleteManyEvent);
router.route('/device/api/v1/event/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,EventController.bulkInsertEvent);
router.route('/device/api/v1/event/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,EventController.bulkUpdateEvent);
router.route('/device/api/v1/event/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,EventController.deleteManyEvent);
router.route('/device/api/v1/event/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,EventController.softDeleteEvent);
router.route('/device/api/v1/event/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,EventController.partialUpdateEvent);
router.route('/device/api/v1/event/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,EventController.updateEvent);    
router.route('/device/api/v1/event/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,EventController.getEvent);
router.route('/device/api/v1/event/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,EventController.deleteEvent);

module.exports = router;
