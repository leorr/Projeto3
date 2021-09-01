import express from 'express';
import userController from './controller/userController.js';
import postController from './controller/postController.js'
import InitiateMongoServer from './config/db.js';
import cors from 'cors';

InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

app.use(cors())
app.use(express.json());

app.use("/user", userController);
app.use("/post", postController);


app.listen(PORT, () => {
  console.log(`Node server started at ${PORT}`);
});
