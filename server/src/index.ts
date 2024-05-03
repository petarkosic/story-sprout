import express, { Request, Response } from 'express';
import cors from 'cors';

import storyRoute from './routes/storyRoute';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.json({ message: 'Hello from server!' });
});

app.use('/api/v1', storyRoute);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
