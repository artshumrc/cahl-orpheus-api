/**
 * Queries for comments
 */

import { GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql';

// types
import { CommentType } from '../types/comments';

// logic
import CommentService from '../logic/comments';

const commentQueryFields = {
	comments: {
		type: new GraphQLList(CommentType),
		description: 'Get list of all comments',
		args: {
			itemId: {
				type: GraphQLID,
			},
			limit: {
				type: GraphQLInt,
			},
			skip: {
				type: GraphQLInt,
			},
			photoURL: {
				type: GraphQLString,
			}
		},
		async resolve(parent, { itemId, limit, skip }, { token }) {
			const commentService = new CommentService({ token });
			return await commentService.commentsGet(itemId, limit, skip);
		}
	},
};

export default commentQueryFields;
