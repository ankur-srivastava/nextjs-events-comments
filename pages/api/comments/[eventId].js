import { MongoClient } from 'mongodb'
import { DB_URI } from '../../../helpers/api-util'

// const initDb = () => {
//     const database = client.db('test');
//     const commentsDb = database.collection('comments');
//     return commentsDb
// }

let client

async function getComments(eventId) {
    try {
        const database = client.db('test');
        const commentsDb = database.collection('comments');
        return await commentsDb.find().sort({_id: -1}).toArray()
    } catch(e) {
        console.log(e)
    }
}

async function storeComments(data) {
    try {
        const database = client.db('test');
        const commentsDb = database.collection('comments');
        const newRecord = await commentsDb.insertOne(data)
        return newRecord
    } catch(e) {
        console.log(e)
    }
}

const handler = async (req, res) => {
    client = new MongoClient(DB_URI);
    // get event id and pull comments for that
    const eventId = req.query.eventId
    if(req.method === 'POST') {
        console.log(req.body)
        const { email, name, text } = JSON.parse(req.body)
        console.log('In Save Comment and email = ', email)
        // validate data
        // save in db
        const commentObj = {
            eventId,
            email,
            name,
            text
        }
        console.log('Going to store ', email, name, text)
        const record = await storeComments(commentObj)
        res.status(201).json({
            message: 'Comment Added',
            commentId: record.id
        })
    }
    if(req.method === 'GET') {
        console.log('GET Comments')
        const comments = await getComments(eventId)

        res.status(200).json({
            message: 'GET Success',
            comments
        })
    }

    // To use connection pooling comment below code
    await client.close()
}

export default handler
