import { Router } from 'express';
import { ClientController } from '../../controllers/index';
import { container } from 'tsyringe';
const router: Router = Router();

const clientController = container.resolve(ClientController);
//get users
router.get('/', clientController.getClients);
router.post('/', clientController.registerClient);
//get userbyId
router.get('/:id', clientController.getClientById);

export { router as clientRouter };
