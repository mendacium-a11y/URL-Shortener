import express from 'express'
import { addlink, getLink } from '../controller/notes.js'

const router = express.Router()

router.post('/addlink', addlink)
router.post('/getlink', getLink)

export default router
