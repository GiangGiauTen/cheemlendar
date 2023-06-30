const express = require('express')
const router = express.Router()

module.exports = (pool) => {
	router.post('/login', (req, res) => {
		const { username, password } = req.body
		pool.query('SELECT * FROM User WHERE username = ? AND password = ?', [username, password], (error, results) => {
			if (error) {
				console.error('Error retrieving users:', error)
				res.status(500).json({ error: 'Internal server error' })
				return
			}
			if (results.length !== 0) {
				res.status(200).json({
					userId: results[0].user_id,
					username: results[0].username,
					name: results[0].name,
				})
			} else {
				res.status(401).json({
					error: 'Invalid username or password',
				})
			}
		})
	})

	return router
}
