const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    address: String
    city: String
    state: String
    zip: String
    dob: String
    hireDate: String
    department: Department
  }

  type Department {
    id: ID!
    name: String!
    description: String
  }

  input EmployeeInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    address: String
    city: String
    state: String
    zip: String
    dob: String
    hireDate: String
    departmentId: ID
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    address: String
    city: String
    state: String
    zip: String
    dob: String
    hireDate: String
    department: Department
  }

  type RootQuery {
    getUsers: [User!]!
    getUserById(id: ID!): User
  }

  type RootMutation {
    createEmployee(input: EmployeeInput!): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema;
