import express from 'express'
import { addlink, getLink, redirect } from '../controller/notes.js'

const router = express.Router()

router.post('/addlink', addlink)
router.post('/getlink', getLink)
router.get('/r/:key', redirect)

export default router
