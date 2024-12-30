import express from 'express'
import cors from 'cors'
import linkRoute from './routes/link.js'
import { redirect } from './controller/notes.js'
import contributorRoute from './routes/contributors.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/links', linkRoute)
app.use('/contributors', contributorRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/r/:key', redirect)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
