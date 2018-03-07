import {
	GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLString
} from 'graphql';

// types
import ItemType from '../types/item';



const itemQueryFields = {
	items: {
		type: ItemType,
		description: 'Get library items from the cached copy of the Library Cloud API',
		args: {
			textsearch: {
				type: GraphQLString,
			},
			limit: {
				type: GraphQLInt,
			},
			skip: {
				type: GraphQLInt,
			},
		},
		resolve(_, { textsearch, limit = 30, skip = 0, }, { token }) {
			const itemService = new ItemService(token);
			const items = itemService.getItems({ textsearch, limit, skip });
			return items;
		}
	},
	item: {
		type: ItemType,
		description: 'Get a single library item from the cached copy of the Library Cloud API',
		args: {
			_id: {
				type: GraphQLString,
			},
			recordIdentifier: {
				type: GraphQLString,
			},
		},
		resolve(_, { _id, recordIdentifier }, { token }) {

			const itemService = new ItemService(token);
			const item = itemService.getItem({ _id, recordIdentifier });
			return item;
		}
	},
};

export default itemQueryFields;
