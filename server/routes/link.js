import express from 'express'
import { addlink, redirect } from '../controller/notes.js'

const router = express.Router()

router.post('/addlink', addlink)
router.get('/r/:key', redirect)

export default router
