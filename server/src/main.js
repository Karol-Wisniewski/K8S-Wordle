import dotenv from 'dotenv';
dotenv.config();
// Changed import to this because of async import problem (mongo was always first before config)
// TODO: Move all configs to config.js

const config = (await import('./config/config.js')).default;
const express = (await import('express')).default;
const wordsRouter = (await import('./features/words/wordsRouter.js')).default;
const cors = (await import('cors')).default;
const {keycloakClient} = await import('./utils/keycloakClient.js');



const app = express();

app.use(keycloakClient.middleware());

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://project.baw";

app.use(cors({
	origin: FRONTEND_ORIGIN,
	// origin: "http://localhost:3000",
	credentials: true,
	AccessControlAllowCredentials: true,
	AccessControlAllowHeaders: "Content-Type, Authorization",
	AccessControlAllowMethods: "GET, POST, PUT, DELETE, OPTIONS"
}));

app.use((req, res, next) => {
	console.log(req.method, req.url);
	console.log(req.headers);
	next();
});


app.use("/words", wordsRouter);

app.get('/', (req, res) => {
    res.send('API for Wordle app');
});

app.listen(config.apiServer.port, () => {
	console.log(`Wordle API server is running on port ${config.apiServer.port}!`)
});