import { PrismaClient } from '@prisma/client';
import { ZenStackMiddleware } from '@zenstackhq/server/express';
import { RestApiHandler } from '@zenstackhq/server/api/rest';
import express, { Request, Response } from 'express';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import { enhance } from '@zenstackhq/runtime';
import bcrypt from 'bcrypt';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

// create a RESTful-style API handler
const apiHandler = RestApiHandler({ endpoint: 'http://localhost:3000/api' });

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const specPath = path.join(__dirname, '../resy-api.json');

const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));


const options = { customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.css' };
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(spec, options));

app.post('/api/login', async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Sign a JWT token and return it in the response
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.json({ id: user.id, email: user.email, token });
});

app.use(
    '/api',
    ZenStackMiddleware({
        getPrisma: () => enhance(prisma),
        handler: apiHandler,
    })
);

export default app;