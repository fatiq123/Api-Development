const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "API";

// const signup = async (req, res) => {

//     // Existing user check
//     // Hashed password
//     // User creation
//     // Token generate

//     const { username, email, password, role } = req.body;

//     try {

//         const existingUser = await userModel.findOne({ email: email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const result = await userModel.create({
//             email: email,
//             password: hashedPassword,
//             username: username,
//             role: role
//         });

//         // const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);    // 1. payload and 2. secret_key
//         // res.status(201).json({ user: result, token: token });

//         function GenerateToken(user) {
//             const payload = {
//                 role: user.role,
//                 id: user._id,
//             };
//             const token = jwt.sign(payload, SECRET_KEY);
//             return token;
//         };

//         const token = GenerateToken(existingUser);    // 1. payload and 2. secret_key
//         res.status(201).json({ user: result, token: token });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// }

const signup = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            // A user with the provided email already exists
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username,
            role: role
        });

        function GenerateToken(user) {
            const payload = {
                role: user.role, // Accessing 'role' property after ensuring 'user' is not null
                id: user._id,
            };
            const token = jwt.sign(payload, SECRET_KEY);
            return token;
        };

        const token = GenerateToken(result); // Use 'result' instead of 'existingUser'
        res.status(201).json({ user: result, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}


const signin = async (req, res) => {

    const { email, password } = req.body;

    try {

        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        // res.status(200).json({ user: existingUser, token: token });
        function GenerateToken(user) {
            const payload = {
                role: user.role,
                id: user._id,
            };
            const token = jwt.sign(payload, SECRET_KEY);
            return token;
        };

        const token = GenerateToken(existingUser);
        res.status(200).json({ user: existingUser, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = { signup, signin };