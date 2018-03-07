import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

const LibraryCloudResponseType = new GraphQLObjectType({
	name: 'LibraryCloudResponse',
	description: 'Response from Library Cloud API',
	fields: () => ({
		pagination: {
			type: GraphQLJSON,
		},
		items: {
			type: GraphQLJSON,
		},
	}),
});

export default LibraryCloudResponseType;
