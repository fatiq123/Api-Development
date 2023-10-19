const express = require('express');
const Port = process.env.Port | 4000;
const app = express();

app.use(express.json());



let users = [
    {
        id: 1, name: "ali"
    },
    {
        id: 2, name: "fatiq"
    },
];


// app.get('/', (req, res) => {
//     res.send("Hello World");
// });

// Endpoint to retrieve all users
app.get('/api/users', (req, res) => {
    res.json(users);
});


//-----------------------------------------------------------------------
// Endpoint to create a new user
app.post('/api/users', (req, res) => {
    // const newUser = {
    //     id: users.length + 1,
    //     name: req.body.name,
    // };

    // users.push(newUser);
    // res.status(201).json(newUser);

    const { id, name } = req.body;

    // Check if a user with the same ID already exists
    const userExists = users.some(user => user.id === id);

    if (userExists) {
        res.status(400).json({ error: 'User with the same ID already exists' });
        return;
    }

    const newUser = {
        id,
        name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
});




//------------------------------------------------------------------------
// Endpoint to retrieve a user by ID
app.get('/api/users/id/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id == userId);

    if (!user) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.json(user);
    }

});




// Endpoint to retrieve a user by name
// Option 1: Retrieve a user by name using a path parameter
app.get('/api/users/:name', (req, res) => {
    const userName = req.params.name;

    // Find the user with the specified name
    const user = users.find(user => user.name === userName);

    if (user) {
        res.status(200).json(user); // Respond with the user's information
    } else {
        res.status(404).json({ error: `${userName} not found` });
    }
});

// Option 2: Retrieve a user by name using a query parameter
app.get('/api/users/search', (req, res) => {
    const userName = req.query.name;

    if (!userName) {
        res.status(400).json({ error: 'Name parameter is required' });
        return;
    }

    const user = users.find(user => user.name === userName);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: `${userName} not found` });
    }
});





//------------------------------------------------------------------------
// Endpoint to delete all users
app.delete('/api/users', (req, res) => {
    // clear the array to delete all users
    users = [];

    res.status(204).send(); // Respond with a "No Content" status   indicating a successful deletion

});

// Endpoint to delete a specific user by ID
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    // Find the index of the user with the specified ID
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
        res.status(404).json({ error: 'User not found' });
    } else {
        // Remove the user form the array
        users.splice(userIndex, 1);
        res.send(204).send();   // Respond with a "No Content" status
    }

});

// Endpoint to delete a specific user by name
app.delete('/api/users/:name', (req, res) => {
    const userName = req.params.name;

    // Filter the users array to find users with the specified name
    const userToDelete = users.find((user) => user.name === userName);

    if (!userToDelete) {
        res.status(404).json({ error: 'User with the specific name not found' });
    } else {
        // Remove the found user from the array
        users = users.filter((user) => user.name !== userName);
        res.status(204).send();
    }
});



// // Endpoint to update a specific resourse by ID
// app.put('/api/users/:id', (req, res) => {
//     const userId = parseInt(req.params.id);

//     // check if the resource with specific ID exists
//     const existingResource = users.find((user) => user.id === userId);

//     if (!existingResource) {
//         res.status(404).json({ error: 'User not found' });
//     } else {
//         // Update the resource with the data from the request body
//         existingResource.id = req.body.id;
//         existingResource.name = req.body.name;
//         // Update other fields...

//         res.status(200).json(existingResource); // Respond with the updated resource
//     }
// });


app.listen(Port, () => {
    console.log(`App running on port ${Port}`);
});













// let users = {
//     1: {
//         id: '1',
//         username: 'Robin Wieruch',
//     },
//     2: {
//         id: '2',
//         username: 'Dave Davids',
//     },
// };

// let messages = {
//     1: {
//         id: '1',
//         text: 'Hello World',
//         userId: '1',
//     },
//     2: {
//         id: '2',
//         text: 'By World',
//         userId: '2',
//     },
// };


// app.get('/users', (req, res) => {
//     return res.send(Object.values(users));
// });

// app.get('/users/:userId', (req, res) => {
//     return res.send(users[req.params.userId]);
// });

// app.listen(process.env.PORT, () =>
//     console.log(`Example app listening on port ${process.env.PORT}!`),
// );