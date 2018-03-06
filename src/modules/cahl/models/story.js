import mongoose from 'mongoose';

// plug-ins
import timestamp from 'mongoose-timestamp';
import URLSlugs from 'mongoose-url-slugs';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

/**
 * Story base schema
 * @type {Schema}
 */
const StorySchema = new Schema({
	content: {
		type: String,
		required: true,
	},
	userDisplayName: {
		type: String,
	},
	userProfilePhotoURL: {
		type: String,
	},
	photoURL: {
		type: String,
	},
	userToken: {
		type: String,
	}
});


// add timestamps (createdAt, updatedAt)
StorySchema.plugin(timestamp);

/**
 * Story mongoose model
 * @type {Object}
 */
const Story = mongoose.model('Story', StorySchema);

export default Story;
export { StorySchema };
