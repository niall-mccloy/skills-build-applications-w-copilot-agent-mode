import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { username: 'maya-chen', email: 'maya.chen@example.com', displayName: 'Maya Chen', avatar: 'MC' },
      { username: 'alex-rivera', email: 'alex.rivera@example.com', displayName: 'Alex Rivera', avatar: 'AR' },
      { username: 'jordan-lee', email: 'jordan.lee@example.com', displayName: 'Jordan Lee', avatar: 'JL' },
    ]);
    const teams = await Team.insertMany([
      { name: 'Trail Blazers', description: 'Outdoor miles and steady progress.', members: [users[0]._id, users[1]._id] },
      { name: 'Core Collective', description: 'Strength, mobility, and accountability.', members: [users[2]._id] },
    ]);
    await Activity.insertMany([
      { user: users[0]._id, team: teams[0]._id, type: 'running', durationMinutes: 42, distanceKm: 6.4, calories: 480, points: 64, completedAt: new Date('2026-08-20') },
      { user: users[1]._id, team: teams[0]._id, type: 'cycling', durationMinutes: 55, distanceKm: 18.2, calories: 610, points: 82, completedAt: new Date('2026-08-21') },
      { user: users[2]._id, team: teams[1]._id, type: 'strength', durationMinutes: 35, calories: 290, points: 52, completedAt: new Date('2026-08-22') },
    ]);
    await Leaderboard.insertMany([
      { user: users[1]._id, team: teams[0]._id, points: 382, rank: 1, period: 'August 2026' },
      { user: users[0]._id, team: teams[0]._id, points: 344, rank: 2, period: 'August 2026' },
      { user: users[2]._id, team: teams[1]._id, points: 291, rank: 3, period: 'August 2026' },
    ]);
    await Workout.insertMany([
      { title: 'Tempo Run Builder', description: 'A progressive cardio session for building running pace.', type: 'cardio', difficulty: 'intermediate', durationMinutes: 35, exercises: [{ name: 'Easy warm-up', sets: 1, reps: 1, restSeconds: 60 }, { name: 'Tempo intervals', sets: 4, reps: 1, restSeconds: 90 }] },
      { title: 'Desk Reset', description: 'A short mobility flow for hips, shoulders, and spine.', type: 'flexibility', difficulty: 'beginner', durationMinutes: 15, exercises: [{ name: 'Cat-cow', sets: 2, reps: 8, restSeconds: 20 }, { name: 'Worlds greatest stretch', sets: 2, reps: 5, restSeconds: 30 }] },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
