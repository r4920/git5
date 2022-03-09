/**
 * encounterRoutes.js
 * @description :: CRUD API routes for encounter
 */

const express = require('express');
const router = express.Router();
const encounterController = require('../../controller/admin/encounterController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/encounter/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,encounterController.addEncounter);
router.route('/admin/encounter/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,encounterController.findAllEncounter);
router.route('/admin/encounter/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,encounterController.getEncounterCount);
router.route('/admin/encounter/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,encounterController.softDeleteManyEncounter);
router.route('/admin/encounter/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,encounterController.bulkInsertEncounter);
router.route('/admin/encounter/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,encounterController.bulkUpdateEncounter);
router.route('/admin/encounter/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,encounterController.deleteManyEncounter);
router.route('/admin/encounter/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,encounterController.softDeleteEncounter);
router.route('/admin/encounter/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,encounterController.partialUpdateEncounter);
router.route('/admin/encounter/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,encounterController.updateEncounter);    
router.route('/admin/encounter/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,encounterController.getEncounter);
router.route('/admin/encounter/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,encounterController.deleteEncounter);

module.exports = router;
