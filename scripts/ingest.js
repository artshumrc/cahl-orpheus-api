import winston from 'winston';
import dotenv from 'dotenv';

import libraryCloudIngest from '../src/modules/library/ingest/libraryCloud';
import setupDB, { closeDB } from '../src/mongoose';

dotenv.config();
const db = setupDB();

const ingest = async () => {
	try {
		return await libraryCloudIngest();
	} catch (e) {
		winston.error(e);
		return 'Error with ingest. Aborting.';
	}
};

db.on('error', winston.error)
	.on('disconnected', setupDB)
	.once('open', async () => {
		winston.info(`Connected to mongodb ( host: ${db.host}, port: ${db.port}, name: ${db.name} )`);

		// run ingest
		winston.info('Beginning ingest of library cloud');
		const ingestResult = await ingest();
		winston.info(ingestResult);

		db.close(() => {
			winston.info('Connection closed');
			process.exit(0);
		});
	});
