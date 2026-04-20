const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve static files from the SAME directory as server.js
app.use(express.static(__dirname));

const MONGO_URI =
  "mongodb+srv://surya01:surya123@cluster0.ttizluy.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model("User", userSchema);

app.post("/add-user", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.send({ message: "User added successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// ✅ Serve index.html from same directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, '0.0.0.0', () => {
  console.log("Server running on port 3000");
});
