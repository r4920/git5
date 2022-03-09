/**
 * encounterRoutes.js
 * @description :: CRUD API routes for encounter
 */

const express = require('express');
const router = express.Router();
const encounterController = require('../../../controller/device/v1/encounterController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/encounter/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,encounterController.addEncounter);
router.route('/device/api/v1/encounter/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,encounterController.findAllEncounter);
router.route('/device/api/v1/encounter/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,encounterController.getEncounterCount);
router.route('/device/api/v1/encounter/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,encounterController.softDeleteManyEncounter);
router.route('/device/api/v1/encounter/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,encounterController.bulkInsertEncounter);
router.route('/device/api/v1/encounter/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,encounterController.bulkUpdateEncounter);
router.route('/device/api/v1/encounter/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,encounterController.deleteManyEncounter);
router.route('/device/api/v1/encounter/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,encounterController.softDeleteEncounter);
router.route('/device/api/v1/encounter/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,encounterController.partialUpdateEncounter);
router.route('/device/api/v1/encounter/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,encounterController.updateEncounter);    
router.route('/device/api/v1/encounter/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,encounterController.getEncounter);
router.route('/device/api/v1/encounter/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,encounterController.deleteEncounter);

module.exports = router;
