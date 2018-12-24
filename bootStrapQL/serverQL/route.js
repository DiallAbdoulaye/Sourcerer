import expressGraphQL from 'express-graphql'
import { buildSchema } from 'graphql'
import dataModel from './dataModel.graphql'
import fs from 'fs'

const DB_JSON_PATH = 'db.json'
if (!fs.existsSync(DB_JSON_PATH)) {
	const json = {
		users: [],
		schools: []
	}
	fs.writeFileSync(DB_JSON_PATH, JSON.stringify(json, null, 2))
}
const schema = buildSchema(dataModel)

// resolver
const resolvers = {
	hello: () => {
		return 'hello world'
	},

	addStudent({ userInput, schoolInput }) {
		const data = JSON.parse(fs.readFileSync(DB_JSON_PATH))
		data.users.push(userInput)
		data.schools.push(schoolInput)
		fs.writeFileSync(DB_JSON_PATH, JSON.stringify(data))
		return userInput
	},

	getUsers() {
		const data = JSON.parse(fs.readFileSync(DB_JSON_PATH))
		return data.users
	}
}

export default expressGraphQL({
	schema,
	rootValue: resolvers,
	graphiql: true
})
