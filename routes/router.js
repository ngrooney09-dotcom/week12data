const router = require("express").Router();

const database = require("../databaseConnection");
const User = require("../models/user");
const Pet = require("../models/pet");
const Joi = require("joi");

router.get("/", async (req, res) => {
  console.log("page hit");
  try {
    const result = await User.find({})
      .select("first_name last_name email id")
      .exec();

    console.log(result);
    res.render("index", { allUsers: result });
  } catch (ex) {
    res.render("error", { message: "Error" });
    console.log("Error");
    console.log(ex);
  }
});

router.get("/populateData", async (req, res) => {
  console.log("populate Data");
  try {
    let pet1 = new Pet({
      name: "Fido",
    });

    let pet2 = new Pet({
      name: "Rex",
    });

    await pet1.save();
    console.log(pet1.id);

    await pet2.save();
    console.log(pet2.id);

    let user = new User({
      first_name: "Me",
      last_name: "Awesome",
      email: "a@b.ca",
      password_hash: "thisisnotreallyahash",
      password_salt: "notagreatsalt",
      pets: [pet1.id, pet2.id],
    });

    await user.save();
    console.log(user.id);

    res.redirect("/");
  } catch (ex) {
    res.render("error", { message: "Error" });
    console.log("Error");
    console.log(ex);
  }
});

router.get("/showPets", async (req, res) => {
  console.log("page hit");
  try {
    const schema = Joi.string().max(25).required();
    const validationResult = schema.validate(req.query.id);

    if (validationResult.error != null) {
      console.log(validationResult.error);
      throw validationResult.error;
    }

    const userResult = await User.findOne({ _id: req.query.id })
      .select("first_name id name")
      .populate("pets")
      .exec();

    console.log(userResult);
    res.render("pet", { userAndPets: userResult });
  } catch (ex) {
    res.render("error", { message: "Error" });
    console.log("Error");
    console.log(ex);
  }
});

router.post("/addUser", async (req, res) => {
  console.log("add user");
  try {
    const schema = Joi.object({
      first_name: Joi.string().max(50).required(),
      last_name: Joi.string().max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().max(50).required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error != null) {
      console.log(validationResult.error);
      throw validationResult.error;
    }

    let newUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password_hash: req.body.password,
      password_salt: "notagreatsalt",
      pets: [],
    });

    await newUser.save();

    res.redirect("/");
  } catch (ex) {
    res.render("error", { message: "Error" });
    console.log("Error");
    console.log(ex);
  }
});

router.get("/deleteUser", async (req, res) => {
  console.log("delete user");
  try {
    const schema = Joi.string().max(25).required();
    const validationResult = schema.validate(req.query.id);

    if (validationResult.error != null) {
      console.log(validationResult.error);
      throw validationResult.error;
    }

    await User.deleteOne({ _id: req.query.id });

    res.redirect("/");
  } catch (ex) {
    res.render("error", { message: "Error" });
    console.log("Error");
    console.log(ex);
  }
});

module.exports = router;