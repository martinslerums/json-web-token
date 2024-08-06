const { BadRequestError } = require("../errors/index");

const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(`Username: ${username} Password: ${password}`);

  if (!username || !password) {
    throw new BadRequestError("Please provide email and passowrd!");
  }

  //Dummy ID (It sohuld be ID from some database)
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);

  const luckyNumber = Math.floor(Math.random() * 1000);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `You have been authorized, your lucky number is: ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
