import {ConnectionOptions} from 'typeorm'

export default function config(): ConnectionOptions {
	const port = Number(process.env.DB_PORT.split('"').join(''))
	return {
		type: 'mysql',
		host: process.env.DB_HOST,
		port: port,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		synchronize: process.env.DB_SYNCHRONIZE.trim().toLowerCase() === 'true',
		logging: process.env.DB_LOGGING.trim().toLowerCase() === 'true',
		dropSchema: process.env.DB_DROP_SCHEMA.trim().toLowerCase() === 'true',
		// Uncomment for SSL
		entities: ['src/entities/**/*.ts', 'entities/**/*.js'],
		migrations: ['src/migration/**/*.ts', 'src/migration/**/*.js'],
		subscribers: ['src/subscriber/**/*.ts', 'src/subscriber/**/*.js'],
		cli: {
			entitiesDir: 'src/entities',
			migrationsDir: 'src/migration',
			subscribersDir: 'src/subscriber',
		},
	}
}
