import { GraphQLObjectType } from 'graphql';

import articleMutationFields from './articles';
import projectMutationFields from './projects';
import collectionMutationFields from './collections';
import itemMutationFields from './items';
import textMutationFields from './texts';
import userMutationFields from './users';


// Application-specific queries
import commentMutationFields from '../../modules/cahl/graphql/mutations/comments';
import storyMutationFields from '../../modules/cahl/graphql/mutations/stories';


/**
 * Root mutations
 * @type {GraphQLObjectType}
 */
const RootMutations = new GraphQLObjectType({
	name: 'RootMutationType',
	description: 'Root mutation object type',
	fields: {
		...commentMutationFields,
		...storyMutationFields,

		// ...projectMutationFields,
		// ...articleMutationFields,
		// ...collectionMutationFields,
		// ...itemMutationFields,
		// ...textMutationFields,
		...userMutationFields,
	},
});

export default RootMutations;
