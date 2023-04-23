import { Router } from 'express';
import { ContractorController } from '../../controllers/index';
import { container } from 'tsyringe';
const router: Router = Router();

const contractorController = container.resolve(ContractorController);
//get contractors
router.get('/', contractorController.getContractors);

//get contractorsbyId
router.get('/:contractorId', contractorController.getContractorById);
router.patch(
    '/:contractorId/edit/status/:status',
    contractorController.updateAvailablilityStatus
);
router.patch(
    '/:contractorId/edit/phoneNumber/:phoneNumber',
    contractorController.updateContractorPhoneNumber
);

export { router as contractorRouter };
