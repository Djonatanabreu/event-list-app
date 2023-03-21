function handler(req, res) {

  const eventId = req.query.eventId;

  if (req.method === 'POST') {
    const { email, name, text } = req.body

    if (!email.includes('@') || !name || name.trim() === '') {
      res.status(422).json({ message: 'Invalid Input.' })
      return;
    }
    console.log(email, name, text)
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    }
    res.status(201).json({ message: 'Added Coment.', comment: newComment })
  }


  if (req.method === 'GET') {
    const dummyList = [
      { id: 'c1', name: 'Max', text: 'A first comment!' },
      { id: 'c2', name: 'Djohn', text: 'A Second comment!' },

      res.status(200).json({ comments: dummyList })
    ]
  }

}

export default handler;