import express from 'express'
import graphQLRoute from './route'

const app = express()

app.get('/', (req, res) => {
	res.send('hello world')
})

app.use('/graphql', graphQLRoute)

app.listen(5000, () => {
	console.log(`Server running on port 5000`)
})
