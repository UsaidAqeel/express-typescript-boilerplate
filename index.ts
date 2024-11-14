import app from './src/config/app';
import { PORT } from './src/constant';



app.get('/', (req, res) => res.send('Welcome to NodeJs App TypeScript'));


app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});