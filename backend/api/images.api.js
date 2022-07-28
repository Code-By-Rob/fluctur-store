const express = require('express');
const router = express.Router();

const { getFileStream } = require('../controllers/s3.images');

router.get('/:key', (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
})

module.exports = router;