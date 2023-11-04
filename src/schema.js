import {model, Schema} from 'mongoose';

const ProjectSchema = new Schema({
    title: {type: String, maxLength : 100},
    project_id: {type: String, maxLength :100},
    project_hash: {type: String, maxLength :80},
    owner: {type: String, maxLength : 100},
    address_owner : {type: String, maxLength : 100},
    pool: Number,
    raised: {
        type: Number,
        default: 0
    },
    category: String,
    description: {type : String, maxLength : 1000},
    img: String,
    create_at: {type: Date, default: Date.now},
    start_at: {type:Date, default: Date.now},
    end_at: {type: Date, default: Date.now},
});

const TxnSchema = new Schema({
    address: {type: String, maxLength : 100},
    amount: Number,
    project_id : String,
    create_at: {type: Date, default: Date.now},
    txn_id: String,
});

const Project = model('Project', ProjectSchema);
const Txn = model ('Txn', TxnSchema);

export {Project, Txn} ;