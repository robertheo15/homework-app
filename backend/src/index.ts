import express from 'express';
import cors from 'cors';
import router from './routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger/swagger';

const app = express();
app.use(cors());
app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use routes
app.use('/api', router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});