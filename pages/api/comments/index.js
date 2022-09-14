const handler = (req, res) => {
    if(req.method === 'POST') {
        res.status(200).json({
            message: 'POST Success'
        })
    } else {
        res.status(200).json({
            message: 'GET Success'
        })
    }
}

export default handler
