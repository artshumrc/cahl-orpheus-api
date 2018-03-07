import { GraphQLObjectType } from 'graphql';

import projectQueryFields from './projects';
import userQueryFields from './users';


// Application-specific queries
import commentQueryFields from '../../modules/cahl/graphql/queries/comments';
import storyQueryFields from '../../modules/cahl/graphql/queries/stories';
import libraryCloudQueryFields from '../../modules/library/graphql/queries/libraryCloud';
import itemQueryFields from '../../modules/library/graphql/queries/items';



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
		...libraryCloudQueryFields,
		...itemQueryFields,

		// ...projectQueryFields,
		...userQueryFields,
	},
});

export default RootQuery;
