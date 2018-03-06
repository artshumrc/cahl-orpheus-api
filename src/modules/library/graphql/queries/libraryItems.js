import https from 'https';
import rp from 'request-promise';
import { GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLString } from 'graphql';

// types
import LibraryAPIResponseType from '../types/libraryAPIResponse';


// Example query: https://api.lib.harvard.edu/v2/items.json?subject_exact=Charlie%20Hebdo%20Attack,%20Paris,%20France,%202015


const libraryItemQueryFields = {
	HULItems: {
		type: LibraryAPIResponseType,
		description: 'Get library items from HUL',
		args: {
			start: {
				type: GraphQLInt
			},
			limit: {
				type: GraphQLInt
			},
			sortBy: {
				type: GraphQLString
			},
			search: {
				type: GraphQLString
			}
		},
		resolve(libraryAPIResponse, { start = 0, limit = 30, search = '', sortBy = '' }, context) {

			let url = 'https://api.lib.harvard.edu/v2/items.json?';

			const urlParams = [];

			// Query for the CAHL Collection subject
			urlParams.push('subject_exact=Charlie%20Hebdo%20Attack,%20Paris,%20France,%202015');

			// Pass search query to title to prevent conflict with subject_exact query to collection
			if (search !== '') {
				urlParams.push(`title=${search}`);
			}

			urlParams.push(`start=${start}`);
			urlParams.push(`limit=${limit}`);

			if (sortBy && sortBy.length) {
				urlParams.push(`sort.asc=${sortBy}`);
			}

			url += urlParams.join('&');

			const options = {
				url,
				strictSSL: false,
			};
			return rp.get(options)
				.then(res => JSON.parse(res))
				.catch((err) => {
					console.log(err);
				});

		}
	},
	HULItem: {
		type: LibraryAPIResponseType,
		description: 'Get a single library item from HUL',
		args: {
			recordIdentifier: {
				type: GraphQLString
			}
		},
		resolve(libraryAPIResponse, { recordIdentifier = '' }, context) {

			// https://api.lib.harvard.edu/v2/items.json?recordIdentifier=8001252932_16787538
			let url = 'https://api.lib.harvard.edu/v2/items.json?';

			const urlParams = [];
			urlParams.push(`recordIdentifier=${recordIdentifier}`);

			url += urlParams.join('&');

			const options = {
				url,
				strictSSL: false,
			};
			return rp.get(options)
				.then(res => JSON.parse(res))
				.catch((err) => {
					console.log(err);
				});

		}
	},
};

export default libraryItemQueryFields;
