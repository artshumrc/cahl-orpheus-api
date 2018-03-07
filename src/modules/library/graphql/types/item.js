import {
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';


/**
 * Item model type
 * @type {GraphQLObjectType}
 */
const ItemType = new GraphQLObjectType({
	name: 'ItemType',
	description: 'An item saved to a local database from the Library Cloud API',
	fields: {
		_id: {
			type: GraphQLString,
		},
		data: {
			type: GraphQLJSON,
		}
	},
});

export default ItemType;
