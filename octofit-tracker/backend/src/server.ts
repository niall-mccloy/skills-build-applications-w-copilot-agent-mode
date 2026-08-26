import express from 'express';
import type { Model } from 'mongoose';
import './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

const models: Record<string, Model<any>> = {
  users: User,
  teams: Team,
  activities: Activity,
  leaderboard: Leaderboard,
  workouts: Workout,
};

const createResourceHandler = (model: Model<unknown>) => async (
  _request: express.Request,
  response: express.Response,
) => {
  try {
    response.json(await model.find().lean());
  } catch (error) {
    response.status(500).json({ error: 'Unable to load resources', details: String(error) });
  }
};

const createResource = (model: Model<unknown>) => async (
  request: express.Request,
  response: express.Response,
) => {
  try {
    response.status(201).json(await model.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Unable to create resource', details: String(error) });
  }
};

for (const [resource, model] of Object.entries(models)) {
  app.get(`/api/${resource}/`, createResourceHandler(model));
  app.post(`/api/${resource}/`, createResource(model));
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiUrl });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${apiUrl}`);
});
