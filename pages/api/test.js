// pages/api/index.js

export default function handler(req, res) {
  const { name, age, method } = req.query;

  res.status(200).json({message: `${name} u ${age} u ${method}`});
}
