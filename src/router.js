import { Router } from 'express';
import * as controller from './controller.js'

const router = Router();

// router.use(bodyParser.json() );
// router.use(bodyParser.urlencoded({extended : true}));

router.get('/projects', controller.getAllProjects);
router.get('/project', controller.getProjectsByField);
router.post('/project/add', controller.addProject);
router.put('/project/update-txn', controller.updatePoolAndAddTxn);
router.get('/transactions', controller.getTxnsByField);

export {router};
