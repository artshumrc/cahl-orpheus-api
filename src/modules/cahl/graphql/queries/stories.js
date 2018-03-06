/**
 * Queries for stories
 */

import { GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql';

// types
import { StoryType } from '../types/stories';

// logic
import StoryService from '../logic/stories';

const storyQueryFields = {
	stories: {
		type: new GraphQLList(StoryType),
		description: 'Get list of all stories',
		args: {
			limit: {
				type: GraphQLInt,
			},
			skip: {
				type: GraphQLInt,
			}
		},
		async resolve(parent, { limit, skip }, { token }) {
			const storyService = new StoryService({ token });
			return await storyService.storiesGet(limit, skip);
		}
	},
};

export default storyQueryFields;
