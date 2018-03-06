/**
 * Mutations for comments
 */

import { GraphQLString, GraphQLNonNull } from 'graphql';

// types
import { CommentType } from '../types/comments';
import RemoveType from '../../../../graphql/types/remove';

// errors
import { AuthenticationError } from '../../../../graphql/errors';

// logic
import CommentsService from '../logic/comments';


const commentMutationFields = {
	commentCreate: {
		type: CommentType,
		description: 'Create new comment',
		args: {
			itemId: {
				type: new GraphQLNonNull(GraphQLString),
			},
			userDisplayName: {
				type: new GraphQLNonNull(GraphQLString),
			},
			content: {
				type: new GraphQLNonNull(GraphQLString),
			},
			photoURL: {
				type: new GraphQLNonNull(GraphQLString),
			},
		},
		async resolve(_, { itemId, userDisplayName, content, photoURL }, { token }) {
			const commentsService = new CommentsService({ token });
			return await commentsService.commentCreate(itemId, userDisplayName, content, photoURL);
		}
	},
	commentRemove: {
		type: RemoveType,
		description: 'Remove a single comment',
		args: {
			commentId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		async resolve(parent, { commentId }, { token }) {
			const commentsService = new CommentsService({ token });
			return await commentsService.commentRemove(commentId);
		}
	}
};

export default commentMutationFields;
