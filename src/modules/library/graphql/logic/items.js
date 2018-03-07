import PermissionsService from '../../../../graphql/logic/PermissionsService';
import Items from '../../models/item';

/**
 * Logic-layer service for dealing with items
 */
class ItemService extends PermissionsService {

	/**
	 * Get items for a specific item
	 * @param {string} textsearch
	 * @param {number} limit - mongo orm limit
	 * @param {number} skip - mongo orm skip
	 * @returns {Object[]} array of items
	 */
	async itemsGet({ textsearch, limit, skip, }) {
		const args = {};

		if (textsearch) {
			args.$text = { $search: textsearch };
		}

		const items = await Items.find(args, {}, {
			limit,
			skip
		});

		return items;
	}

	/**
	 * Get items for a specific item
	 * @param {string} _id - id of item
	 * @param {string} recordIdentifier - library record id
	 * @returns {Object} array of items
	 */
	async itemGet({ _id, recordIdentifier }) {
		const args = {};

		if (!_id || !recordIdentifier) {
			return null;
		}

		if (_id) {
			args._id = _id;
		}

		if (recordIdentifier) {
			args.recordIdentifier = recordIdentifier;
		}

		const items = await Items.find(args);
		return items;
	}
}


export default ItemService;
