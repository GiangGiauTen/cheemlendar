const express = require('express')
const router = express.Router()

module.exports = (pool) => {
	// POST /api/events/getAllEvents
	router.post('/getAllEvents', (req, res) => {
		let { userId, start_date, end_date } = req.body
		end_date += ' 23:59:59:999'
		const query = `SELECT Events.* FROM Events inner JOIN Calendar on Events.calendar_id = Calendar.calendar_id inner JOIN User on User.user_id = Calendar.user_id 
      WHERE User.user_id = ? AND Events.start_datetime BETWEEN ? and  ?`
		pool.query(query, [userId, start_date, end_date], (error, result) => {
			if (error) {
				console.error('Fetching data:', error)
				res.status(500).json({ error: 'Internal server error' })
				return
			}
			res.status(200).json(result)
		})
	})

	// POST /api/events/
	router.post('/', (req, res) => {
		const { calendar_id, event_title, start_datetime, end_datetime, color_theme, description } = req.body
		const query =
			'INSERT INTO Events (calendar_id, event_title, start_datetime, end_datetime, color_theme, description) VALUES (?, ?, ?, ?, ?, ?)'
		const values = [calendar_id, event_title, start_datetime, end_datetime, color_theme, description]
		pool.query(query, values, (error, result) => {
			if (error) {
				console.error('Error creating event:', error)
				res.status(500).json({ error: 'Internal server error' })
				return
			}
			res.status(201).json({ message: 'Event created successfully' })
		})
	})

	router.delete('/:id', (req, res) => {
		const event_id = req.params.id
		const query = 'DELETE FROM Events WHERE event_id = ?'
		const values = [event_id]
		pool.query(query, values, (error, result) => {
			if (error) {
				console.error('Error delete event:', error)
				res.status(500).json({ error: 'Internal server error' })
				return
			}
			res.status(200).json({ message: 'Event delete successfully' })
		})
	})

	return router
}
