import mongoose from '../models/DbConnect.js'

const todoSchema=new mongoose.Schema({
    item:{
        type:String,
        required:true
    }
},
{versionkey:false}
)

const todoModel=mongoose.model('data', todoSchema)

export default todoModel