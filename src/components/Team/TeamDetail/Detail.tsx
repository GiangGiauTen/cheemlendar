'use client'
import Return from '@/components/return'
import API_BASE_URL from '@/utils/config'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Tree } from 'antd'
import TaskCell from './TaskCell'
import { TreeNode } from 'antd/es/tree-select'

type Props = {}

const Detail = (props: Props) => {
	const [imageUrl, setImageUrl] = useState('')
	const [teamId, setTeamId] = useState<string | undefined>('')
	const pathName = usePathname()
	const [tasks, setTasks] = useState([])
	useEffect(() => {
		const currentTeamId = pathName.split('/').pop()
		setTeamId(currentTeamId)
	}, [pathName])

	useEffect(() => {
		setImageUrl(`teams/${teamId}.jpg`)

		const fetchTaskData = async () => {
			try {
				const res = await axios.get(`${API_BASE_URL}/tasks/getAllTeamTask/${teamId}`)
				if (res.status === 200) {
					setTasks(
						res.data.map((e: { key: any; task_id: any; children: any; childTasks: any }) => {
							e.key = e.task_id
							e.children = e.childTasks
							e.children.map((subE: { key: any; task_id: any }) => {
								subE.key = subE.task_id
								return subE
							})
							return e
						}),
					)
				} else {
					console.log(res)
				}
			} catch (error) {
				console.error(error)
			}
		}

		if (teamId) {
			fetchTaskData()
		}
	}, [teamId])

	return (
		<div>
			<div className='return-button'>
				<Return href='./team' text='Joined Team' />
			</div>
			<div className='team-header-ctn'></div>
			<div className='tree-ctn'>
				<Tree switcherIcon={<></>} titleRender={(nodeData) => <TaskCell nodeData={nodeData} />} treeData={tasks} />
			</div>
		</div>
	)
}

export default Detail
