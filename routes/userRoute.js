const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const router = express.Router();

//  creating api to send data to database
router.post("/", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const userData = await User.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json(userData);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// read
router.get("/", async (req, res) => {
  try {
    const showAllusers = await User.find();
    res.status(201).json(showAllusers);
  } catch (error) {
    return res.sendStatus(400).json({ error: error.message });
  }
});

//get singlle user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findById({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    return res.sendStatus(500).json({ error: error.message });
  }
});
//delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // console.log(id);
    //first id is db id and another one is sended by user
    const singleUserDel = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(singleUserDel);
    // console.log("delete successfully");
  } catch (error) {
    return res.sendStatus(500).json({ error: error.message });
  }
});

// patch Update
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    //first id is db id and another one is sended by user
    res.status(200).json(updateUser);
    // console.log("delete successfully");
  } catch (error) {
    return res.sendStatus(500).json({ error: error.message });
  }
});

module.exports = router;
