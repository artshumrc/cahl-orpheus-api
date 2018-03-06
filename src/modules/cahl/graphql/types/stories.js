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
 * Story input type
 * @type {GraphQLInputObjectType}
 */
const StoryInputType = new GraphQLInputObjectType({
	name: 'StoryInputType',
	description: 'A story related to the event and exhibition generally',
	fields: {
		content: {
			type: GraphQLString,
		},
		userToken: {
			type: GraphQLString,
		},
		userDisplayName: {
			type: GraphQLString,
		},
		userProfilePhotoURL: {
			type: GraphQLString,
		},
		photoURL: {
			type: GraphQLString
		},
	},
});

/**
 * Story model type
 * @type {GraphQLObjectType}
 */
const StoryType = new GraphQLObjectType({
	name: 'StoryType',
	description: 'A story related to the event and exhibition generally',
	fields: {
		_id: {
			type: GraphQLString,
		},
		content: {
			type: GraphQLString,
		},
		userDisplayName: {
			type: GraphQLString,
		},
		userProfilePhotoURL: {
			type: GraphQLString,
		},
		createdAt: {
			type: GraphQLDate,
		},
		photoURL: {
			type: GraphQLString
		},
		userIsOwner: {
			type: GraphQLBoolean,
		}
	},
});

export { StoryType, StoryInputType };
