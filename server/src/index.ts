import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import storyRoute from './routes/storyRoute';
import authRoute from './routes/authRoute';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
	res.json({ message: 'Hello from server!' });
});

app.use('/api/v1', storyRoute);
app.use('/api/v1/auth', authRoute);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
