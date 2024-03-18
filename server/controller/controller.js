import todoModel from "../models/todoSchema.js";

//ADD DATA
// const creatController=async(req,res)=>{
//     try {
//         // console.log("hello");
//         // let date=req.body
//         // console.log(date);
//         let itemAdd= await todoModel.create(req.body)
//         // console.log('itemAdd',itemAdd);
//         // let saveItem=await itemAdd.save()

//         res.status(200).json(itemAdd)
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             message:"Internel Server error"
//         })
//     }
// }
const creatController = async (req, res) => {
    try {
      if (!req.body.item) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid todo item",
        });
      }
  
      let itemAdd = await todoModel.create(req.body);
      res.status(200).json(itemAdd);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Internal Server error",
      });
    }
  };
  

//GET DATA
const getDataController=async(req,res)=>{
    try {
        let itemAdd= await todoModel.find({})

        res.status(200).send({
            success:true,
            message:"Successfully fetched your Todo Data",
            data:itemAdd
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Internel Server error"
        })
    }
}

//EDIT DATA
const editDataController=async(req,res)=>{
    try {
        let updateItem= await todoModel.findByIdAndUpdate(req.params.id, {$set: req.body})

        res.status(200).send({
            success:true,
            message:"Successfully Edited your Todo Data",
            data:updateItem
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Internel Server error"
        })
    }
}

//DELETE DATA
const deleteDataController=async(req,res)=>{
    try {
        let deleteItem= await todoModel.findByIdAndDelete(req.params.id)

        res.status(200).send({
            success:true,
            message:"Successfully Deleted your Todo Data",
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Internel Server error"
        })
    }
}





export default{
    creatController,
    getDataController,
    editDataController,
    deleteDataController
}