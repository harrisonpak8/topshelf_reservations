// pages/api/index.js
export default function handler(req, res) {
  const { name } = req.query;

  if (name) {
    res.status(200).json({ message: `Hello, ${name}!` });
  } else {
    res.status(400).json({ message: 'Name parameter is required' });
  }
}
