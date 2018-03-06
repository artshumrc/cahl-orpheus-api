import PermissionsService from '../../../../graphql/logic/PermissionsService';
import Stories from '../../models/story';

/**
 * Logic-layer service for dealing with stories
 */
export default class StoryService extends PermissionsService {

	/**
	 * Get stories for a specific item
	 * @param {string} itemId - id of item that stories are created for
	 * @param {number} limit - mongo orm limit
	 * @param {number} skip - mongo orm skip
	 * @returns {Object[]} array of stories
	 */
	async storiesGet(limit = 100, skip = 0) {

		const stories = await Stories.find({
		}, {}, {
			limit,
			skip,
		});

		stories.forEach((story) => {
			story.userIsOwner = this.userIsStoryOwner(story._id);
		});

		return stories;
	}

	/**
	 * Create a story
	 * @param {string} content - content of story (from draftjs)
	 * @param {string} userDisplayName - display name of user that created the story
	 * @param {string} userProfilePhotoURL - display photo of user that created the story
	 * @param {string} photoURL - url of the uploaded photo
	 * @returns {boolean} result of mongo orm create
	 */
	storyCreate(content, userDisplayName, userProfilePhotoURL, photoURL) {

		return Stories.create({
			userToken: this.token,
			content,
			userDisplayName,
			userProfilePhotoURL,
			photoURL,
		});
	}

	/**
	 * Remove a story
	 * @param {string} _id - story id to remove
	 * @returns {boolean} result of mongo orm remove
	 */
	storyRemove(_id) {
		if (this.userIsStoryOwner(_id)) {
			return Stories.remove({ _id });
		}

		return null;
	}

	/**
	 * Check if a user is an owner of a specific story
	 * @param {string} _id - story of id to check
	 * @returns {boolean} result of mongo orm remove
	 */
	userIsStoryOwner(_id) {
		if (!this.token) {
			return false;
		}
		
		return !!(Stories.find({
			_id,
			userToken: this.token,
		}));
	}
}
