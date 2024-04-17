import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  let token = req.cookies.key;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    let decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return;
    } else {
      req.user = decode;
      res.status(200);
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export default isAuthenticated;
