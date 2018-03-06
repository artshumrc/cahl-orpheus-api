import PermissionsService from '../../../../graphql/logic/PermissionsService';
import Comments from '../../models/comment';

/**
 * Logic-layer service for dealing with comments
 */
export default class CommentService extends PermissionsService {

	/**
	 * Get comments for a specific item
	 * @param {string} itemId - id of item that comments are created for
	 * @param {number} limit - mongo orm limit
	 * @param {number} skip - mongo orm skip
	 * @returns {Object[]} array of comments
	 */
	async commentsGet(itemId, limit = 100, skip = 0) {

		const comments = await Comments.find({
			itemId,
		}, {}, {
			limit,
			skip
		});

		comments.forEach((comment) => {
			comment.userIsOwner = this.userIsCommentOwner(comment._id);
		});

		return comments;
	}

	/**
	 * Create a comment
	 * @param {string} itemId - id of item that comment is created about
	 * @param {string} userDisplayName - display name of user that created the comment
	 * @param {string} content - content of comment (from draftjs)
	 * @param {string} photoURL - the url of the profile photo of the user
	 * @returns {boolean} result of mongo orm create
	 */
	commentCreate(itemId, userDisplayName, content, photoURL) {
		return Comments.create({
			userToken: this.token,
			itemId,
			userDisplayName,
			content,
			photoURL,
		});
	}

	/**
	 * Remove a comment
	 * @param {string} _id - comment id to remove
	 * @returns {boolean} result of mongo orm remove
	 */
	commentRemove(_id) {
		if (this.userIsCommentOwner(_id)) {
			return Comments.remove({ _id });
		}

		return null;
	}

	/**
	 * Check if a user is an owner of a specific comment
	 * @param {string} _id - comment of id to check
	 * @returns {boolean} result of mongo orm remove
	 */
	userIsCommentOwner(_id) {
		if (!this.token) {
			return false;
		}

		return !!(Comments.find({
			_id,
			userToken: this.token,
		}));
	}
}
