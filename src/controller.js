import {Project, Txn} from "./schema.js";
import { imgUpload } from "./cloudinary_config.js";
import {hashStringToDigits} from "./crypto.js";

const getAllProjects = async (req, res) => {
    try {
        let projects = await Project.find({});
        res.json({"data": projects});
    } catch (e) {
        return res.status(400).json({"error": e.toString()});
    };
};

const getProjectsByField = async (req, res) => {
    try {
        let project;
        if (req.query.id) {
            project = await Project.findById(req.query.id);
        } else if (req.query.address_owner) {
            project = await Project.find({'address_owner': req.query.address_owner});
        } else if (req.query.project_id) {
            project = await Project.findOne({'project_id': req.query.project_id});
        } else 
            return res.status(400).json({error: `Query must be required.`});

        return res.json({"data": project});
    } catch (e) {
        return res.status(400).json({"error": e.toString()});
    };
};

// PUT : id, deposit_amount, deposit_address, txn_id
const updatePoolAndAddTxn = async (req, res) => {
    try {
        let project_find = {
            project_id : req.body.project_id,
        }
        let project_update = {
            $inc: {
                raised: parseFloat(req.body.deposit_amount)
            },
        };
        let project = await Project.findOneAndUpdate(project_find, project_update, {new: true});
        if (project == null) 
            return res.status(400).json({"error": "Fail to update project"});
 
        let txn = new Txn({
            address : req.body.deposit_address,
            amount: req.body.deposit_amount,
            project_id: req.body.project_id,
            txn_id: req.body.txn_id
        })
        let insert_txn = await txn.save();
        return res.status(200).json({
            "project_data": project,
            "txn_data" : insert_txn,
        });
    } catch (e) {
        return res.status(400).json({"error": e.toString()});
    };
};

const addProject = async (req, res) => {
    try {
        if (!(req.body.title && req.body.project_id && req.body.address_owner && req.body.pool)) 
            return res.status(400).json({error: `Must require title, address owner, pool.`});

        if (!(req.body.end_at))
            return res.status(400).json({error: `Must require end date.`});

        let startDate = Date.parse(req.body.start_at) || Date.now();
        let endDate = Date.parse(req.body.end_at);
        if (endDate < startDate) 
            return res.status(400).json({error: `Invalid startAt or endAt.`});
        
        let exited_project = await Project.findOne({'project_id': req.body.project_id});
        if (exited_project) {
            return res.status(400).json({error: `Project name is exited.`});
        }
        let imgUrl = '';
        if (req.files.img) {
            const allowedMimeTypes = ['image/png', 'image/jpeg'];
            let mimeType = req.files.img.mimetype;
            if (allowedMimeTypes.includes(mimeType)) {
                imgUrl = await imgUpload(req.files.img);
            }
        }
        
        let projectHash = hashStringToDigits(req.body.project_id);

        let project = new Project({
            title: req.body.title,
            project_id: req.body.project_id || '',
            project_hash: projectHash,
            owner: req.body.owner || '',
            address_owner: req.body.address_owner,
            pool: parseFloat(req.body.pool),
            description : req.body.description || '',
            img : imgUrl,
            category: req.body.category || '',
            start_at: startDate,
            end_at : endDate,
        })
        let result = await project.save();
        return res.json({"data": result});
    } catch (e) {
        return res.status(400).json({"error": e.toString()});
    };
};

const getTxnsByField = async (req, res) => {
    try {   
        let txns; 
        if (req.query.project_id) {
            txns = await Txn.find({'projectId': req.query.project_id});
        } else if (req.query.address) {
            txns = await Txn.find({'address' : req.query.address});   
        } else 
            return res.status(400).json({error: `Query must be required.`});
        return res.json({"data": txns});
    } catch (e) {
        return res.status(400).json({"error": e.toString()});
    };
};

export {
    getAllProjects,
    updatePoolAndAddTxn,
    addProject,
    getProjectsByField,
    getTxnsByField
}
