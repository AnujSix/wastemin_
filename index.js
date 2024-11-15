const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000  // Reduce server selection timeout to 5 seconds
}).then(() => {console.log('Connected to MongoDB')}).catch((err) => {console.log('Failed to connect to MongoDB', err)});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
},{timestamps: true});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(cors()); 

app.post('/api/signup', async(req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

   const saveUser=await User.create({name,email,password});

    console.log('User data received:', { name, email, password });

    // Send a success response
    res.status(201).json({ message: 'Signup successful!', user: { name, email } });
});

// Sign-in route without password hashing
app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Sign-in successful', user: { name: user.name, email: user.email } });
    } catch (err) {
        console.error('Error during sign-in:', err);
        res.status(500).json({ error: 'Server error' });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
