import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

const LibraryAPIResponseType = new GraphQLObjectType({
	name: 'LibraryAPIResponse',
	description: 'Response from HUL API',
	fields: () => ({
		pagination: {
			type: GraphQLJSON,
		},
		items: {
			type: GraphQLJSON,
		},
	}),
});

export default LibraryAPIResponseType;
