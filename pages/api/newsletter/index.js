import { MongoClient } from 'mongodb'
import { DB_URI } from '../../../helpers/api-util'

const client = new MongoClient(DB_URI);

async function runDb(userEmail) {
    try {
        const database = client.db('test');
        const newsletterDb = database.collection('newsletter');
        await newsletterDb.insertOne({email: userEmail})
        console.log('Record Inserted')
    } catch(e) {
        console.log(e)
    } finally {
        await client.close()
    }
}

const handler = async (req, res) => {
    // get email from req body
    const email = req.body.email
    console.log('Email on Server = ', email)

    // Store in DB
    await runDb(email)

    res.status(200).json({
        message: 'Success'
    })
}

export default handler
