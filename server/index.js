import express from 'express'
import cors from 'cors'
import linkRoute from './routes/link.js'
import authRoute from './routes/auth.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/auth', authRoute)
app.use('/links', linkRoute)

app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
