const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// 🔹  MongoDB Connection
const MONGO_URI =
  "mongodb+srv://surya01:surya123@cluster0.ttizluy.mongodb.net/testdb?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 🔹  Schema (same as your users table)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

app.post("/add-user", async (req, res) => {
  try {
    const { name, email } = req.body;
    console.log(name, email);
    const newUser = new User({ name, email });
    await newUser.save();

    res.send({ message: "User added successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// 🔹  API: Get users (same logic)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/", "index.html"));
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
