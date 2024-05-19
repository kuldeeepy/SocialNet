import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).json({ message: "Unauthorized user" });

  let tkn = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(tkn, process.env.JWT_SECRET, (error, decoded) => {
      if (error || !decoded)
        return res.status(401).send("Access denied to unauthorized user");
      req.user = decoded.id;
      next();
    });
  } catch (err) {
    next(err);
  }
};

export default isAuthenticated;
