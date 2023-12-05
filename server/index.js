import { ApolloServer, gql } from "apollo-server-express";
import cors from "cors";
import express from "express";

import { getCountries } from "./service/countriesService.js";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    surename: String!
    yearOfBirth: String!
    country: String!
  }

  type Query {
    users: [User]
  }

  input UserInput {
    name: String!
    surename: String!
    yearOfBirth: String!
    country: String!
  }

  type Mutation {
    createUser(input: UserInput!): User
  }

  type Person {
    id: ID!
    name: String!
  }

  type Mutation {
    addNewPerson(name: String!): Person
  }
`;

const users = [];

const resolvers = {
  Query: {
    users: () => {
      return users;
    },
  },
  Mutation: {
    createUser: (_, { input }) => {
      users.push({ ...input, id: users.length + 1 });

      return input;
    },
  },
};

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Main route" });
});

app.get("/countries", async (req, res) => {
  try {
    const countriesList = await getCountries();
    res.json({ countries: countriesList });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Apollo
const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(8080, () => {
    console.log("*** Running App");
  });
};

startServer();
