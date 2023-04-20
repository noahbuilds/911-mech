import { Router } from 'express';
const router: Router = Router();
import { ClientAuthController } from '../../controllers';
import { container } from 'tsyringe';

const clientAuthController = container.resolve(ClientAuthController);
router.post('/register', clientAuthController.createUser);
router.post('/login', clientAuthController.loginUser);
router.post('/logout', clientAuthController.logoutUser);
router.post('/login-passwordless', clientAuthController.loginWithAccessCode);
// router.post('/verify-access-code', clientAuthController.verifyAccessCode);

export { router as clientAuthRouter };
