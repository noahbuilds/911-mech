import { Router } from "express";
import { ContractorController } from "../controllers/index";
import { container } from "tsyringe";
const router: Router = Router();

const contractorController = container.resolve(ContractorController);
//get contractors
router.get("/", contractorController.getContractors);

//get contractorsbyId
router.get("/:id", contractorController.getContractorById);


export { router as contractorRouter };
