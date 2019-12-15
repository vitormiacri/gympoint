import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/Models/User';
import Student from '../app/Models/Student';
import Plan from '../app/Models/Plan';
import Registration from '../app/Models/Registration';
import Checkin from '../app/Models/Checkin';
import HelpOrder from '../app/Models/HelpOrder';

import databaseConfig from '../config/database';

const models = [User, Student, Plan, Registration, Checkin, HelpOrder];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
