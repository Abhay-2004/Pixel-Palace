const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 8081;
const host = "localhost";
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319";
const collectionName = "laptops";

const client = new MongoClient(url);
let db;

async function connectToMongo() {
    if (!db) {
        await client.connect();
        db = client.db(dbName);
        console.log("Connected to MongoDB");
    }
}

connectToMongo().catch(err => console.error("Failed to connect to MongoDB:", err));

// Fetch all laptops
app.get("/laptops", async (req, res) => {
    try {
        await connectToMongo();
        const laptops = await db.collection(collectionName).find({}).toArray();
        res.status(200).send(laptops);
    } catch (error) {
        console.error("Failed to fetch laptops", error);
        res.status(500).send({ error: "An internal server error occurred while fetching laptops." });
    }
});

// Fetch a single laptop by integer ID
app.get("/laptops/:id", async (req, res) => {
    try {
        await connectToMongo();
        const laptopId = parseInt(req.params.id);  // Ensure ID is correctly parsed as an integer
        const laptop = await db.collection("laptops").findOne({ id: laptopId });
        if (laptop) {
            res.status(200).send(laptop);
        } else {
            res.status(404).send({ message: "Laptop not found." });
        }
    } catch (error) {
        console.error("Error fetching laptop:", error);
        res.status(500).send({ error: "An internal server error occurred while fetching the laptop." });
    }
});

// Add a new laptop with auto-generated ID
app.post("/laptops", async (req, res) => {
    try {
        await connectToMongo();
        const lastLaptop = await db.collection("laptops").find().sort({ id: -1 }).limit(1).toArray();
        const nextId = lastLaptop.length === 0 ? 1 : parseInt(lastLaptop[0].id) + 1;

        const newLaptop = {
            id: nextId, // Auto-increment ID
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.body.imageUrl // Use 'image' as the key
        };

        const result = await db.collection("laptops").insertOne(newLaptop);
        if (result.acknowledged) {
            res.status(201).send(newLaptop);
        } else {
            throw new Error('Insert failed');
        }
    } catch (error) {
        console.error("Error adding new laptop:", error);
        res.status(500).send({ error: "An internal server error occurred while adding a new laptop." });
    }
});


// Update a laptop by integer ID
app.put("/laptops/:id", async (req, res) => {
    try {
        await connectToMongo();
        const laptopId = parseInt(req.params.id);
        const updateData = { $set: req.body };
        const result = await db.collection("laptops").updateOne({ id: laptopId }, updateData);
        if (result.matchedCount === 0) {
            res.status(404).send("Laptop not found.");
        } else {
            res.status(200).send({ message: "Laptop updated successfully" });
        }
    } catch (error) {
        console.error("Error updating laptop:", error);
        res.status(500).send({ error: "An internal server error occurred while updating the laptop." });
    }
});

// Delete a laptop by integer ID
app.delete("/laptops/:id", async (req, res) => {
    try {
        await connectToMongo();
        const laptopId = parseInt(req.params.id);
        const result = await db.collection("laptops").deleteOne({ id: laptopId });
        if (result.deletedCount === 0) {
            res.status(404).send("Laptop not found.");
        } else {
            res.status(200).send({ message: "Laptop deleted successfully" });
        }
    } catch (error) {
        console.error("Error deleting laptop:", error);
        res.status(500).send({ error: "An internal server error occurred while deleting the laptop." });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`App listening at http://${host}:${port}`);
});

// Fetch all phones
app.get("/phones", async (req, res) => {
    try {
        await connectToMongo();
        const phones = await db.collection("phones").find({}).toArray();
        res.status(200).send(phones);
    } catch (error) {
        console.error("Failed to fetch phones", error);
        res.status(500).send({ error: "An internal server error occurred while fetching phones." });
    }
});

// Add a new phone with auto-generated ID
app.post("/phones", async (req, res) => {
    try {
        await connectToMongo();
        const lastPhone = await db.collection("phones").find().sort({ id: -1 }).limit(1).toArray();
        const nextId = lastPhone.length === 0 ? 1 : parseInt(lastPhone[0].id) + 1;

        const newPhone = {
            id: nextId, // Auto-increment ID
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.body.imageUrl // Use 'image' as the key
        };

        const result = await db.collection("phones").insertOne(newPhone);
        if (result.acknowledged) {
            res.status(201).send(newPhone);
        } else {
            throw new Error('Insert failed');
        }
    } catch (error) {
        console.error("Error adding new phone:", error);
        res.status(500).send({ error: "An internal server error occurred while adding a new phone." });
    }
});

// Fetch a single phone by integer ID
app.get("/phones/:id", async (req, res) => {
    try {
        await connectToMongo();
        const phoneId = parseInt(req.params.id);  // Ensure ID is correctly parsed as an integer
        const phone = await db.collection("phones").findOne({ id: phoneId });
        if (phone) {
            res.status(200).send(phone);
        } else {
            res.status(404).send({ message: "Phone not found." });
        }
    } catch (error) {
        console.error("Error fetching phone:", error);
        res.status(500).send({ error: "An internal server error occurred while fetching the phone." });
    }
});

// Update a phone by integer ID
app.put("/phones/:id", async (req, res) => {
    try {
        await connectToMongo();
        const phoneId = parseInt(req.params.id);
        const updateData = { $set: req.body };
        const result = await db.collection("phones").updateOne({ id: phoneId }, updateData);
        if (result.matchedCount === 0) {
            res.status(404).send("Phone not found.");
        } else {
            res.status(200).send({ message: "Phone updated successfully" });
        }
    } catch (error) {
        console.error("Error updating phone:", error);
        res.status(500).send({ error: "An internal server error occurred while updating the phone." });
    }
});

// Delete a phone by integer ID
app.delete("/phones/:id", async (req, res) => {
    try {
        await connectToMongo();
        const phoneId = parseInt(req.params.id);
        const result = await db.collection("phones").deleteOne({ id: phoneId });
        if (result.deletedCount === 0) {
            res.status(404).send("Phone not found.");
        } else {
            res.status(200).send({ message: "Phone deleted successfully" });
        }
    } catch (error) {
        console.error("Error deleting phone:", error);
        res.status(500).send({ error: "An internal server error occurred while deleting the phone." });
    }
});


app.post("/register", async (req, res) => {
    try {
        await connectToMongo();
        const lastUser = await db.collection("users").find().sort({ id: -1 }).limit(1).toArray();
        const nextId = lastUser.length === 0 ? 1 : parseInt(lastUser[0].id) + 1;

        const newUser = {
            id: nextId.toString(),
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password // directly using the plain text password
        };

        const existingUser = await db.collection("users").findOne({ email: newUser.email });
        if (existingUser) {
            return res.status(409).send({ message: "Email already in use" });
        }

        const result = await db.collection("users").insertOne(newUser);
        if (result.acknowledged) {
            res.status(201).send({ message: "User registered successfully", userId: newUser.id });
        } else {
            throw new Error('Registration failed');
        }
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send({ error: "An internal server error occurred while registering the user." });
    }
});




// Fetch all users
app.get("/users", async (req, res) => {
    try {
        await connectToMongo();
        const users = await db.collection("users").find({}).toArray();
        res.status(200).send(users);
    } catch (error) {
        console.error("Failed to fetch users", error);
        res.status(500).send({ error: "An internal server error occurred while fetching users." });
    }
});

app.post("/login", async (req, res) => {
    try {
        await connectToMongo();
        const { email, password } = req.body;
        const user = await db.collection("users").findOne({ email: email });

        if (!user) {
            res.status(401).send({ message: "User not found. Please register." });
        } else if (user.password !== password) {
            res.status(401).send({ message: "Incorrect password. Please try again." });
        } else {
            res.status(200).send({ message: "Login successful", user: { fullName: user.fullName, email: user.email } });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ error: "An internal server error occurred during login." });
    }
});

