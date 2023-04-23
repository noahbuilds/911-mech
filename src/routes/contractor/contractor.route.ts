import { Router } from 'express';
import { ContractorController } from '../../controllers/index';
import { container } from 'tsyringe';
const router: Router = Router();

const contractorController = container.resolve(ContractorController);
//get contractors
router.get('/', contractorController.getContractors);

//get contractorsbyId
router.get('/:contractorId', contractorController.getContractorById);
router.put(
    '/:contractorId/:status',
    contractorController.updateAvailablilityStatus
);

export { router as contractorRouter };
