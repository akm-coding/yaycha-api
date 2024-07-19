const jwt = require("jsonwebtoken");
const secret = "s!c#1$G9";
const data = { name: "Alice", bio: "jwt bio" };
const token = jwt.sign(data, secret);
console.log(token);

const decode = jwt.verify(token, secret);
console.log(decode);
