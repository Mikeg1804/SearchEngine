const {gql} = require('apollo-server-express');

const typeDefs = gql`
type Book {
    bookId: String,
    title: String!
    authors: [String]
    description: String
    image: String
    link: String
}
type User {
    _id: ID!
    username: String! 
    email: String
    savedbooks: [Book]
    bookCount: Int
}
type Auth{
    token: ID!
    user: User
}
input BookInput {
    bookId: String,
    title: String!
    authors: [String]
    description: String
    image: String
    link: String
}
type Query {
    me: User
}
type Mutation {
    addUser(username:String!, email:String!, password:String!):Auth
    saveBook (bookData:BookInput):User
    login(email:String!, password:String!): Auth
    removeBook(bookId:String!):User 
}
`;

module.exports = typeDefs;