const argon = require("argon2");
const UserModel = require("../users/userModel");

class AuthController {
  async register(req, res) {
    const { email, password } = req.body;
    const hashedPassword = await argon.hash(password);
    const user = await UserModel.create({ email, password: hashedPassword });
    res.status(201).send({
      status: "success",
      data: {
        email: user.email,
        message: "User register successful",
      },
    });
  }

  async login(req, res) {
    res.status(200).send({
      status: "success",
      data: {
        user: req.user,
        message: "User login successful",
      },
    });
  }

  logout(req, res, next) {
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).clearCookie(process.env.SESSION_NAME).send({
        status: "Logged out",
        data: null,
      });
    });
  }
}

module.exports = new AuthController();
