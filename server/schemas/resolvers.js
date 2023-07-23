const { AuthenticationError } = require('apollo-server-express');
const { User} = require('../models');
const {signToken} = require('../utils/auth.js');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            return context.user ? await User.findOne({_id: context.user._id}).select('-__v -password'):
            new AuthenticationError('Are you sure you are logged in?')
        }
},

Mutation: {
        
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};

        },

        login: async (parent, {email,password}) => {
            const user = await User.findOne({email});
            const bannaPassword = await user.isCorrectPassword(password);
            if(!user) throw new AuthenticationError('are you sure you are logged in?')
            if(!bannaPassword) throw new AuthenticationError('are you sure you are logged in?')
            const token = signToken(user);
            return {token, user}
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookData } },
                { new: true }
              );
      
              return updatedUser;
            } throw new AuthenticationError('User not found');
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
              );
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
 },
};

module.exports = resolvers;