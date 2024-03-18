import express from 'express'
import Controller from '../controller/controller.js'


const router=express.Router()


//ADD TODO
router.post('/api/add',Controller.creatController )

//GET DATA
router.get('/get-data',Controller.getDataController)

//EDIT DATA
router.put('/edit-data/:id', Controller.editDataController)

//DELETE DATA
router.delete('/delete-data/:id', Controller.deleteDataController)

export default router
