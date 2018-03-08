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
	async getItems({ textsearch, limit, skip, sort }) {
		const args = {};
		const order = {};

		if (textsearch) {
			args.$text = { $search: textsearch };
		}

		switch (sort) {
		case 'title':
			order['data.titleInfo.title'] = 1;
			break;

		case 'author':
			order['data.name.namePart'] = 1;
			break;

		case 'year_asc':
			order['data.name.namePart'] = 1;
			break;

		case 'year_desc':
			order['data.name.namePart'] = 1;
			break;

		default:
			order['data.titleInfo.title'] = 1;
		}

		const items = await Items.find(args)
			.sort(order)
			.skip(skip)
			.limit(limit);

		const total = await Items.count(args);

		return {
			items,
			total,
		};
	}

	/**
	 * Get items for a specific item
	 * @param {string} _id - id of item
	 * @param {string} recordIdentifier - library record id
	 * @returns {Object} array of items
	 */
	async getItem({ _id, recordIdentifier }) {
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
