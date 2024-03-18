import express from 'express'
import cors from 'cors'
import colors from 'colors'
import dotenv from 'dotenv'
import router from './routes/todoItems.js'

dotenv.config()

const app=express()
app.use(express.json())
app.use(cors())

app.use('/', router)

const PORT=process.env.PORT || 5500

app.listen(PORT, ()=> console.log(`server is listening dude ${PORT}`.bgMagenta))