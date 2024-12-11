import express from 'express'
import { addlink } from '../controller/notes.js'

const router = express.Router()

router.post('/addlink', addlink)

export default router
