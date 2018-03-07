import mongoose from 'mongoose';

// plug-ins
import timestamp from 'mongoose-timestamp';
import URLSlugs from 'mongoose-url-slugs';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

/**
 * Comment base schema
 * @type {Schema}
 */
const ItemSchema = new Schema({
	data: {
		type: Schema.Types.Mixed,
	},
});

ItemSchema.index({'$**': 'text'}, {language_override: 'default_language_override'});

/**
 * Comment mongoose model
 * @type {Object}
 */
const Item = mongoose.model('item', ItemSchema);

export default Item;
export { ItemSchema };
