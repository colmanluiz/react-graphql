import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connectDB } from "./services/db/db.service.js";
import mongoose from "mongoose";
import { userSchema } from "./services/db/schema.service.js";

connectDB();

const UserModel = mongoose.model("User", userSchema);

const typeDefs = `
    type Query {
        getUsers: [User]
        getUserById(id: ID!): User 
    }

    type Mutation {
        createUser(name: String!, age: Int!, isMarried: Boolean!): User
    }

    type User {
        id: ID
        name: String
        age: Int
        isMarried: Boolean
    }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      return await UserModel.find({});
    },
    getUserById: async (parent, args) => {
      const id = args.id;

      return await UserModel.findById(id).exec();
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const { name, age, isMarried } = args;
      const userData = {
        id: mongoose.Types.ObjectId,
        name,
        age,
        isMarried,
      };
      const newUser = new UserModel(userData);
      const savedUser = await newUser.save();
      return savedUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("server running on port: ", url);
