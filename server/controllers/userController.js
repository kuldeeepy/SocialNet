import User from "../modals/userModal.js";

const signup = async (req, res, next) => {
  let { uname, email, pwd } = req.body;
  if (!uname || !pwd || !email)
    return res.status(400).json({ message: "Provide all the details!" });

  try {
    //if user exist
    let user = await User.findOne({ uname });
    if (user) return res.status(400).send("User already exist, please login");

    //create user
    let newUser = await User.create({
      uname: uname.toLowerCase(),
      pwd: pwd,
      email: email,
    });

    //generate token
    let tkn = newUser.genToken();
    res.status(200).json({ message: "Registration Successful", token: tkn });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  let { uname, pwd } = req.body;

  try {
    //if user exists
    let user = await User.findOne({ uname });
    if (!user) return res.status(404).send("User not found");

    //Comparing pwd
    let isMatch = await user.comparePwd(pwd);

    if (!isMatch) return res.status(401).send("Incorrect password");

    //saving /sending token
    let tkn = user.genToken();

    res.status(200).json({ message: "Login Successful", token: tkn });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  let { username } = req.params;
  let user = await User.findOne({ uname: username }).populate("posts");
  if (!user) return res.status(404).json({ message: "No user found" });
  user.pwd = null;
  res.status(200).send(user);
};

const updateDp = async (req, res, next) => {
  let { id } = req.params;
  if (req.file?.path === undefined) return;
  let user = await User.findByIdAndUpdate(id, { picture: req.file.path });
  res.send(user);
};

export { signup, login, profile, updateDp };
