import { Router } from 'express';
import bodyParser from 'body-parser';
import * as controller from './controller.js'

const router = Router();

// router.use(bodyParser.json() );
// router.use(bodyParser.urlencoded({extended : true}));

router.get('/project', controller.getProjectsByField);
router.put('/project/update-txn', controller.updatePoolAndAddTxn);
router.get('/projects', controller.getAllProjects);
router.post('/project/add', controller.addProject);
router.get('/transactions', controller.getTxnsByField);

export {router};
