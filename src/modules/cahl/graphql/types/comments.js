import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLList,
	GraphQLInputObjectType
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import GraphQLDate from 'graphql-date';


/**
 * Comment input type
 * @type {GraphQLInputObjectType}
 */
const CommentInputType = new GraphQLInputObjectType({
	name: 'CommentInputType',
	description: 'A comment in the commentary',
	fields: {
		itemId: {
			type: GraphQLString,
		},
		userToken: {
			type: GraphQLString,
		},
		userDisplayName: {
			type: GraphQLString,
		},
		content: {
			type: GraphQLString,
		},
		photoURL: {
			type: GraphQLString
		},
	},
});

/**
 * Comment model type
 * @type {GraphQLObjectType}
 */
const CommentType = new GraphQLObjectType({
	name: 'CommentType',
	description: 'A comment in the commentary',
	fields: {
		_id: {
			type: GraphQLString,
		},
		itemId: {
			type: GraphQLString,
		},
		userDisplayName: {
			type: GraphQLString,
		},
		content: {
			type: GraphQLString,
		},
		createdAt: {
			type: GraphQLDate,
		},
		updatedAt: {
			type: GraphQLDate,
		},
		photoURL: {
			type: GraphQLString,
		},
		userIsOwner: {
			type: GraphQLBoolean,
		}
	},
});

export { CommentType, CommentInputType };
