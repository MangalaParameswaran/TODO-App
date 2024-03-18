import express from 'express'
import Controller from '../controller/controller.js'


const router=express.Router()

router.get('*', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Back-end Application</title>
            <!-- Bootstrap CSS -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
            </style>
        </head>
        <body>
            <div class="container">
                <div class="row justify-content-center mt-5">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h1 class="card-title text-center">Back-end Application Is Running Successfully</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bootstrap JS (optional, if needed) -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `);
});

//ADD TODO
router.post('/api/add',Controller.creatController )

//GET DATA
router.get('/get-data',Controller.getDataController)

//EDIT DATA
router.put('/edit-data/:id', Controller.editDataController)

//DELETE DATA
router.delete('/delete-data/:id', Controller.deleteDataController)

export default router
