/**
 * Mutations for stories
 */

import { GraphQLString, GraphQLNonNull } from 'graphql';

// types
import { StoryType } from '../types/stories';
import RemoveType from '../../../../graphql/types/remove';

// errors
import { AuthenticationError } from '../../../../graphql/errors';

// logic
import StoriesService from '../logic/stories';


const storyMutationFields = {
	storyCreate: {
		type: StoryType,
		description: 'Create new story',
		args: {
			content: {
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
		async resolve(_, { content, userDisplayName, userProfilePhotoURL, photoURL }, { token }) {
			const storiesService = new StoriesService({ token });
			return await storiesService.storyCreate(content, userDisplayName, userProfilePhotoURL, photoURL);
		}
	},
	storyRemove: {
		type: RemoveType,
		description: 'Remove a single story',
		args: {
			storyId: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		async resolve(parent, { storyId }, { token }) {
			const storiesService = new StoriesService({ token });
			return await storiesService.storyRemove(storyId);
		}
	}
};

export default storyMutationFields;
