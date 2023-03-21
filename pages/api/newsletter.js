function handler(req, res) {
  if (req.method === 'POST') {
    const registerEmail = req.body.email

    if (!registerEmail || !registerEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' })
      return;
    }

    console.log(registerEmail);
    res.status(201).json({ message: 'signed up!' })
  }
  res.status(200).json({ message: 'reached up!!' })
}

export default handler;