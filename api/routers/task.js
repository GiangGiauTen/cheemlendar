const express = require('express')
const router = express.Router()

module.exports = (pool) => {
	// GET /api/tasks/getAllTeamTask/:teamId
	router.get('/getAllTeamTask/:id', (req, res) => {
		const teamId = req.params.id
		const query = `SELECT * FROM task WHERE team_id = ?`
		pool.query(query, [teamId], (error, resData) => {
			if (error) {
				console.error('Fetching data:', error)
				res.status(500).json({ error: 'Internal server error' })
				return
			}

			const promises = resData.map((element) => {
				const taskId = element['task_id']
				return new Promise((resolve, reject) => {
					pool.query(
						'SELECT name FROM user join task_assign on task_assign.user_id = user.user_id WHERE task_id = ?',
						[taskId],
						(error2, result2) => {
							if (error2) {
								reject(error2)
							} else {
								element['memberAssign'] = result2.map((e) => e.name)
								resolve(element)
							}
						},
					)
				})
			})

			Promise.all(promises).then((resData) => {
				const groupedTasks = resData.reduce((result, task) => {
					if (task.parent_task_id === null) {
						result.push({ ...task, childTasks: [] })
					} else {
						const parentTask = result.find((parent) => parent.task_id === task.parent_task_id)
						if (parentTask) {
							parentTask.childTasks = parentTask.childTasks || []
							parentTask.childTasks.push(task)
						}
					}
					return result
				}, [])
				res.status(200).json(groupedTasks)
			})
		})
	})

	return router
}
