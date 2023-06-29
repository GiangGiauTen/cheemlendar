const express = require('express')
const router = express.Router()

module.exports = (pool) => {
	// GET /api/teams/getAllJoinedTeam/:id
	router.get('/getAllJoinedTeam/:id', (req, res) => {
		const userId = req.params.id
		const query = `SELECT team.team_id, team_name, description, public, team_member_count.member_count
    FROM team INNER JOIN (
        SELECT team_id, COUNT(user_id) AS member_count FROM team_member GROUP BY team_id
    ) AS team_member_count ON team.team_id = team_member_count.team_id
    INNER JOIN team_member ON team.team_id = team_member.team_id
    WHERE team_member.user_id = ?`
		pool.query(query, [userId], (error, result) => {
			if (error) {
				console.error('Fetching data:', error)
				res.status(500).json({ error: 'Internal server error' })
				return
			}
			res.status(200).json(result)
		})
	})

	// GET /api/teams/getTeamInfo/:id
	router.get('/getTeamInfo/:id', (req, res) => {
		const teamId = req.params.id
		const query = `SELECT * FROM team WHERE team.team_id = ?`
		pool.query(query, [teamId], (error, result) => {
			if (error) {
				console.error('Fetching data:', error)
				res.status(500).json({ error: 'Internal server error' })
				return
			}
			res.status(200).json(result)
		})
	})
	return router
}
