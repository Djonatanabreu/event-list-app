import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const registerEmail = req.body.email;

    if (!registerEmail || !registerEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const client = await MongoClient.connect(
      'mongodb+srv://develuppers:BmQUBJRbdzUViLAM@cluster0.fh1osex.mongodb.net/events?retryWrites=true&w=majority'
    );
    const db = client.db();

    await db.collection('emails').insertOne({
      email: registerEmail,
    });

    client.close();

    res.status(201).json({ message: 'signed up!' });
  }
}

export default handler;
