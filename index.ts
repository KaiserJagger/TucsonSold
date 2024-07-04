import dotenv from 'dotenv'
import server from './src/server/index'
import { LogError, LogSuccess } from './src/utils/logger';

// Config the .env file
dotenv.config();

const port = process.env.PORT || 3000;

// *EXECUTE SERVER
server.listen(port, () => {
    LogSuccess(` [SERVER ON]: Running in http://localhost:${port}/api`)
});

server.on('error', (error) => {
    LogError(`SERVER ERROR: ${error} `);
});

