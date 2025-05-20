import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connectDB } from "./services/db/db.service";
import mongoose, { Query } from "mongoose";
import { userSchema } from "./services/db/schema.service";

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
    getUsers: () => {
      return UserModel.find({});
    },
    getUserById: (parent, args) => {
      const id = args.id;

      return UserModel.findById(id).exec();
    },
  },
  Mutation: {},
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("server running on port: ", url);
