import _s from 'underscore.string';

// services
import PermissionsService from './PermissionsService';

// models
import Collection from '../../models/collection';
import Project from '../../models/project';

// errors
import { AuthenticationError, PermissionError } from '../errors';


/**
 * Logic-layer service for dealing with collections
 */

export default class CollectionService extends PermissionsService {
	/**
	 * Count collections
	 * @returns {number} count of collections
	 */
	async count() {
		return await Collection.count();
	}

	/**
	 * Get a list of collections
	 * @param {string} projectId
	 * @param {string} textsearch
	 * @param {number} offset
	 * @param {number} limit
	 * @returns {Object[]} array of collections
	 */
	async getCollections({ projectId, textsearch, offset, limit }) {
		const args = { projectId };

		if (textsearch) {
			args.title = /.*${textsearch}.*/;
		}

		return await Collection.find(args)
			.sort({ slug: 1})
			.skip(offset)
			.limit(limit);
	}

	/**
	 * Get collection
	 * @param {string} projectId - id of the parent project for the collection
	 * @param {number} _id - id of collection
	 * @param {string} slug - slug of collection
	 * @returns {Object[]} array of collections
	 */
	async getCollection({ projectId, _id, slug, }) {
		const where = { projectId };

		if (!_id && !slug) {
			return null;
		}

		if (_id) {
			where._id = _id;
		}

		if (slug) {
			where.slug = slug;
		}

		return await Collection.findOne(where);
	}

	/**
	 * Create a new collection
	 * @param {string} hostname - hostname of the collection for the project
	 * @param {Object} collection - collection candidate
	 * @returns {Object} created collection
	 */
	async create(hostname, collection) {
		// if user is not logged in
		if (!this.userId) throw new AuthenticationError();

		const collectionProject = await Project.findOne({ hostname });

		// Initiate project
		if (!collectionProject) throw new ArgumentError({ data: { field: 'project._id' } });

		// validate permissions
		const userIsAdmin = this.userIsProjectAdmin(collectionProject);
		if (!userIsAdmin) throw new PermissionError();

		// set collection projectid and slug
		collection.projectId = collectionProject._id;
		collection.slug = _s.slugify(collection.title);

		// Initiate new collection
		const newCollection = new Collection(collection);

		// save new collection and return result
		return await newCollection.save();
	}

	/**
	 * Update a collection
	 * @param {Object} collection - collection candidate
	 * @returns {Object} updated collection
	 */
	async update(collection) {
		// if user is not logged in
		if (!this.userId) throw new AuthenticationError();

		// Initiate collection
		const foundCollection = await Collection.findById(collection._id);
		if (!foundCollection) throw new ArgumentError({ data: { field: 'collection._id' } });

		// validate permissions
		const userIsAdmin = this.userIsCollectionAdmin(foundCollection);
		if (!userIsAdmin) throw new PermissionError();

		// perform action
		Collection.update({ _id: collection._id }, { $set: collection });

		// TODO
		// error handling

		// return updated collection
		return await Collection.findById(collection._id);
	}

	/**
	 * Remove a collection
	 * @param {string} _id - id of collection to Remove
	 * @returns {boolean} remove result
	 */
	async remove(_id) {
		// if user is not logged in
		if (!this.userId) throw new AuthenticationError();

		// initiate collection
		const foundCollection = await Collection.findById(collectionId);
		if (!foundCollection) throw new ArgumentError({ data: { field: 'collectionId' } });

		// validate permissions
		const userIsAdmin = this.userIsCollectionAdmin(foundCollection);
		if (!userIsAdmin) throw new PermissionError();

		// perform action
		const result = await Collection.remove({ _id });

		// TODO
		// error handling

		// respond with result
		return {
			result,
		};
	}

	/**
	 * Get collection items
	 * @param {string} collectionId - id of collection
	 * @param {number} limit - mongoose orm limit
	 * @param {number} offset - mongoose orm offset
	 * @returns {Object[]} collections for collection
	 */
	async getItems({ collectionId, limit, offset }) {
		// TODO:
		// get paginated item by collection Id
		return [];
	}

	/**
	 * Get collection activity feed
	 * @param {number} collectionId - collection id for activity
	 * @param {number} limit - mongoose orm limit
	 * @param {number} offset - mongoose orm offset
	 * @returns {Object[]} activity feed items
	 */
	async getActivityFeed({ collectionId, limit, offset }) {

		// TODO:
		// get activity feed from collections, items, articles, texts, and comments

		return [];
	}
}
