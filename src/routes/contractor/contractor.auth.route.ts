import { Router } from 'express';
const router: Router = Router();
import { ContractorAuthController } from '../../controllers';
import { container } from 'tsyringe';

const contractorAuthController = container.resolve(ContractorAuthController);
router.post('/register', contractorAuthController.createUser);
router.post('/login', contractorAuthController.loginUser);
router.post('/logout', contractorAuthController.logoutUser);
router.post(
    '/login-passwordless',
    contractorAuthController.loginWithAccessCode
);
// router.post('/verify-access-code', contractorAuthController.verifyAccessCode);

export { router as contractorAuthRouter };
