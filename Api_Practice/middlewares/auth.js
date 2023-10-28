// const jwt = require('jsonwebtoken');
const SECRET_KEY = "API";

// const auth = (req, res, next) => {

//     try {

//         let token = req.headers.authorization;
//         if (token) {
//             token = token.split(' ')[1];
//             let user = jwt.verify(token, SECRET_KEY);
//             req.userId = user.id;
//         } else {
//             return res.status(401).json({ message: 'Unauthorized User' });

//         }

//         next();

//     } catch (error) {
//         console.log(error);
//         res.status(401).json({ message: 'Unauthorized User' });
//     }
// }

// module.exports = auth;











const jwt = require('jsonwebtoken');
// Middleware function to validate JWT tokens

function validateToken(req, res, next) {

    var token = req.headers.authorization

    if (!token) {

        return res.status(401).json({ message: 'No token provided' });

    }

    token = token.split(' ')[1]; //it is good to write such codes in try catch to handle proper exceptions
    jwt.verify(token, SECRET_KEY, (err, decoded) => {

        if (err) {

            return res.status(403).json({ message: 'Failed to authenticate token' });

        }

        // If the token is valid, save the decoded information for later use

        req.user = decoded;

        next();

    });

}

module.exports = validateToken;