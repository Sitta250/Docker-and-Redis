import express from 'express';
import mongoose from 'mongoose';
import {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
  REDIS_PORT,
  REDIS_URL,
  SESSION_SECRET,
} from './config/config.js';
import session from 'express-session';
import redis from 'redis';
import {RedisStore} from 'connect-redis';
import postRouter from './routes/postRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

// MongoDB Connection
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log('Successfully connected to DB'))
    .catch((err) => {
      console.error('DB connection error:', err);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};

connectWithRetry();

// Redis Client Setupk
let RedisClient = redis.createClient({
  socket: {
    host: REDIS_URL,
    port: REDIS_PORT,
  },
});

RedisClient.on('error', (err) => console.error('Redis Client Error:', err));

// Connect Redis
(async () => {
  try {
    await RedisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Could not connect to Redis:', err);
    process.exit(1); // Exit the app if Redis fails
  }
})();



app.use(
  session({
    store: new RedisStore({ 
      client: RedisClient 
    }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false, 
      resave: false,
      saveUninitialized: true,
      httpOnly: false, 
      maxAge: 30000, 
    },
  })
);

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('<h2>Hello</h2>');
});
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.get('/api/v1/session',(req,res)=>{
  if(req.session.user){
    res.json({ status: 'success', user: req.session.user });
  } else {
    res.status(401).json({ status: 'fail', message: 'No session found' });
  }
})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`));