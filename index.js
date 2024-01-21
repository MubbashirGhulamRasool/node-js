const express = require("express");
const app = express();
const port = 3000;
// const { users, addUser, updateUser } = require("./users")
const User = require("./Models/users.js")
app.use(express.json())


const mongoose = require("mongoose");
const dbUrl = "mongodb+srv://admin:Admin1234@usersdb.uc15ugr.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbUrl).then((res) => console.log("Connected To DB")).catch((err) => console.log(err));



app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log("users"),
            res.send("Someting went wrong");
    }
});


app.post('/', async (req, res) => {
    try {
        const userr = await User.create(req.body);
        res.json(userr);
    } catch (error) {
        console.log("users"),
            res.send("Someting went wrong");
    }
});


app.delete('/:id', async (req, res) => {

    // const id = req.params.id;
    const { id } = req.params;

    try {
        const userr = await User.findByIdAndDelete(id);
        res.send("User Deleted Successfully");
    } catch (error) {
        console.log("users"),
            res.send("Someting went wrong");
    }
});


// app.put('/:id', async (req, res) => {

//     const id = req.params.id;
//     try {
//         const userupdate = await User.findOneAndUpdate(id, req.body);
//         res.json(userupdate);
//     } catch (error) {
//         console.log("users"),
//             res.send("Someting went wrong");
//     }

// });



app.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const userUpdate = await User.findByIdAndUpdate(id, req.body, { new: true });
        // The { new: true } option returns the modified document rather than the original

        if (!userUpdate) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(userUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});





// // Define a route for the root path
// app.get('/', (req, res) => {
//     res.send('Hello Express Js');
// });

// app.get('/users', (req, res) => {
//     res.send(JSON.stringify(users));
//     // res.json(users);
// });

// // meddel
// app.use(express.json());

// app.post('/users', (req, res) => {

//     addUser(req.body);

//     console.log(req.body);

//     res.send(JSON.stringify(users));
//     // res.json(users);
// });



// app.put('/users/:id', (req, res) => {

//     const id = req.params.id;

//     updateUser(id, req.body);

//     console.log(req.body);

//     res.send(JSON.stringify(users));
//     // res.json(users);
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
