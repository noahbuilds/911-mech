import { Router } from 'express';
import { ClientController } from '../../controllers/index';
import { container } from 'tsyringe';
const router: Router = Router();

const clientController = container.resolve(ClientController);
//get clients
router.get('/', clientController.getClients);
//book contractor for service
router.get('/service/book/:contractorId', clientController.bookContractor);
//get clientbyId
router.get('/:id', clientController.getClientById);
//request Service
router.post('/service', clientController.requestService);
//Client registration
router.post('/', clientController.registerClient);
export { router as clientRouter };
