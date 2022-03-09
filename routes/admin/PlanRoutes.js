/**
 * PlanRoutes.js
 * @description :: CRUD API routes for Plan
 */

const express = require('express');
const router = express.Router();
const PlanController = require('../../controller/admin/PlanController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/plan/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,PlanController.addPlan);
router.route('/admin/plan/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,PlanController.findAllPlan);
router.route('/admin/plan/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,PlanController.getPlanCount);
router.route('/admin/plan/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,PlanController.softDeleteManyPlan);
router.route('/admin/plan/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,PlanController.bulkInsertPlan);
router.route('/admin/plan/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,PlanController.bulkUpdatePlan);
router.route('/admin/plan/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,PlanController.deleteManyPlan);
router.route('/admin/plan/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,PlanController.softDeletePlan);
router.route('/admin/plan/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,PlanController.partialUpdatePlan);
router.route('/admin/plan/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,PlanController.updatePlan);    
router.route('/admin/plan/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,PlanController.getPlan);
router.route('/admin/plan/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,PlanController.deletePlan);

module.exports = router;
