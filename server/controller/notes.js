import { insertLinkIfNotExists, query } from '../db.js'

export const addlink = async (req, res) => {
    try {
        const url = req.body.url
        const key = await insertLinkIfNotExists(url)
        if (key) {
            res.status(200).send({ key })
        } else {
            res.send(400)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const redirect = async (req, res) => {
    try {
        const key = req.params.key
        console.log('REQUEST for ', key)
        if (key.length !== 6) {
            res.status(400).send('Invalid key')
            throw new Error('invalid key')
        }
        const url = await query(key)
        if (!url) {
            res.status(404).send('No URL found for the provided key')
            throw new Error('No URL found for the provided key')
        }
        res.redirect(url)
    } catch (error) {
        console.error(error)
    }
}
