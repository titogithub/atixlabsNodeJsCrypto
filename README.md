# atixlabsNodeJsCrypto
A simple api service with nodeJs and Express. A nonce is generated in every request to link the next request with the previous.

GET /api/files get the hash file
POST /api/files {message} add a new entry to the hash file
GET /api/validateFile validate if the entire file is correct

