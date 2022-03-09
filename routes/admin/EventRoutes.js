/**
 * EventRoutes.js
 * @description :: CRUD API routes for Event
 */

const express = require('express');
const router = express.Router();
const EventController = require('../../controller/admin/EventController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/event/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,EventController.addEvent);
router.route('/admin/event/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,EventController.findAllEvent);
router.route('/admin/event/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,EventController.getEventCount);
router.route('/admin/event/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,EventController.softDeleteManyEvent);
router.route('/admin/event/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,EventController.bulkInsertEvent);
router.route('/admin/event/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,EventController.bulkUpdateEvent);
router.route('/admin/event/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,EventController.deleteManyEvent);
router.route('/admin/event/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,EventController.softDeleteEvent);
router.route('/admin/event/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,EventController.partialUpdateEvent);
router.route('/admin/event/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,EventController.updateEvent);    
router.route('/admin/event/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,EventController.getEvent);
router.route('/admin/event/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,EventController.deleteEvent);

module.exports = router;
