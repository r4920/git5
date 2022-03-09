/**
 * PlanRoutes.js
 * @description :: CRUD API routes for Plan
 */

const express = require('express');
const router = express.Router();
const PlanController = require('../../../controller/device/v1/PlanController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/plan/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,PlanController.addPlan);
router.route('/device/api/v1/plan/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,PlanController.findAllPlan);
router.route('/device/api/v1/plan/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,PlanController.getPlanCount);
router.route('/device/api/v1/plan/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,PlanController.softDeleteManyPlan);
router.route('/device/api/v1/plan/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,PlanController.bulkInsertPlan);
router.route('/device/api/v1/plan/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,PlanController.bulkUpdatePlan);
router.route('/device/api/v1/plan/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,PlanController.deleteManyPlan);
router.route('/device/api/v1/plan/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,PlanController.softDeletePlan);
router.route('/device/api/v1/plan/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,PlanController.partialUpdatePlan);
router.route('/device/api/v1/plan/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,PlanController.updatePlan);    
router.route('/device/api/v1/plan/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,PlanController.getPlan);
router.route('/device/api/v1/plan/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,PlanController.deletePlan);

module.exports = router;
