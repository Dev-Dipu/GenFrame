const app = require('./src/app');
const connectDB = require('./src/db/db');


connectDB();

app.listen(4004, () => {
    console.log('server is running on port 4004')
})