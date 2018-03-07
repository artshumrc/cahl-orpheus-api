import winston from 'winston';
import axios from 'axios';
import queryString from 'query-string';
import _ from 'underscore';

import Item from '../models/item';


// Example query https://api.lib.harvard.edu/v2/items.json?subject_exact=Charlie%20Hebdo%20Attack,%20Paris,%20France,%202015

const saveLibraryItem = async (data) => {
	const item = new Item({ data });
	const result = await item.save();
};


// get a single page of library items
const getLibraryItems = async (limit, start) => {
	let url = 'https://api.lib.harvard.edu/v2/items.json?';
	const urlParams = [];

  // Query for the CAHL Collection subject
	urlParams.push('subject_exact=Charlie%20Hebdo%20Attack,%20Paris,%20France,%202015');

  // Pass search query to title to prevent conflict with subject_exact query to collection
	urlParams.push(`start=${start}`);
	urlParams.push(`limit=${limit}`);
	url += urlParams.join('&');

  // Get items from api
	const response = await axios.get(url);
	const items = response.data.items.mods;

  // Save items
	const saveResults = [];
	for (let i = 0; i < items.length; i += 1) {
		saveResults.push(saveLibraryItem(items[i]));
	}
	await Promise.all(saveResults);
};

// Crawl Library Cloud API and save all items locally in Mongo
const libraryCloudIngest = async () => {
	const limit = 50;
	let total = 0;

  // Get pagination information:
	const res = await axios.get('https://api.lib.harvard.edu/v2/items.json?subject_exact=Charlie%20Hebdo%20Attack,%20Paris,%20France,%202015');
	total = res.data.pagination.numFound;

  // Get paginated data
	const getLibraryItemsResults = [];
	for (let i = 0; i < (total / limit); i += 1) {
		getLibraryItemsResults.push(getLibraryItems(limit, i * limit));
	}

  // Do async promises
	await Promise.all(getLibraryItemsResults);

  // Return success message
	return 'Ingest successful';
};


export default libraryCloudIngest;
