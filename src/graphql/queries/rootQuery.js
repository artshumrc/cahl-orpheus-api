import { GraphQLObjectType } from 'graphql';

import projectQueryFields from './projects';
import userQueryFields from './users';


// Application-specific queries
import commentQueryFields from '../../modules/cahl/graphql/queries/comments';
import storyQueryFields from '../../modules/cahl/graphql/queries/stories';
import libraryItemQueryFields from '../../modules/library/graphql/queries/libraryItems';



/**
 * Root Queries
 * @type {GraphQLObjectType}
 */
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Root query object type',
	fields: {
		...commentQueryFields,
		...storyQueryFields,
		...libraryItemQueryFields,

		// ...projectQueryFields,
		...userQueryFields,
	},
});

export default RootQuery;
