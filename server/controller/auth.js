import { getUser, createUser } from '../db.js';

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Email and password are required.');
        }
        const user = await getUser(email);
        if (!user) {
            return res.status(404).send('User not found.');
        }
        if (user.password === password) {
            res.status(200).send('Login successful.');
        } else {
            res.status(401).send('Invalid password.');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
};

export const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send('All fields are required.');
        }
        const user = await getUser(email);
        if (user) {
            return res.status(409).send('User already exists.');
        }
        await createUser(username, email, password);
        res.status(201).send('User created successfully.');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
};
