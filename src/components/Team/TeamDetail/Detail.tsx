'use client'
import Return from '@/components/return'
import API_BASE_URL from '@/utils/config'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Tree } from 'antd'
import TaskCell from './TaskCell'
import Image from 'next/image'
import MoreInfoSVG from '@public/icons/MoreInfoSVG'
import Icon, { ClockCircleOutlined, FileProtectOutlined, TeamOutlined } from '@ant-design/icons'
import './detail.css'
type Props = {}
interface Team {
	public: boolean
	team_id: number
	team_name: string
	description: string
}

const Detail = (props: Props) => {
	const [imageUrl, setImageUrl] = useState('')
	const [teamId, setTeamId] = useState<string | undefined>('')
	const pathName = usePathname()
	const [tasks, setTasks] = useState([])
	const [teamInfo, setTeamInfo] = useState<Team | null>(null)
	useEffect(() => {
		const currentTeamId = pathName.split('/').pop()
		setImageUrl(`/teams/${currentTeamId}.jpg`)
		setTeamId(currentTeamId)
	}, [pathName])

	useEffect(() => {
		const fetchTaskData = async () => {
			try {
				const res = await axios.get(`${API_BASE_URL}/tasks/getAllTeamTask/${teamId}`)
				if (res.status === 200) {
					setTasks(
						res.data.map((e: { key: any; task_id: any; children: any; childTasks: any }) => {
							e.key = e.task_id
							if (e.childTasks) {
								e.children = e.childTasks
								e.children.map((subE: { key: any; task_id: any }) => {
									subE.key = subE.task_id
									return subE
								})
							}
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
		const fetchTeamData = async () => {
			try {
				const res = await axios.get(`${API_BASE_URL}/teams/getTeamInfo/${teamId}`)
				if (res.status === 200) {
					setTeamInfo(res.data[0])
				} else {
					console.log(res)
				}
			} catch (error) {
				console.error(error)
			}
		}

		if (teamId) {
			fetchTaskData()
			fetchTeamData()
		}
	}, [teamId])
	const [expandedKeys, setExpandedKey] = useState<string[]>([])
	const handleExpandedKey = (target: any) => {
		const key_id = expandedKeys.indexOf(target)
		if (key_id != -1) {
			setExpandedKey(expandedKeys.filter((e) => e != target))
		} else {
			setExpandedKey([...expandedKeys, target])
		}
	}
	return (
		<div>
			<div className='return-button'>
				<Return href='/team' text='Joined Team' />
			</div>
			<div className='team-detail-info-ctn'>
				<Image src={imageUrl} alt={'Team-image'} width={86} height={86} style={{ borderRadius: '50%' }} />
				<div style={{ fontSize: 52, fontFamily: 'Roboto-Bold', fontWeight: 'bolder' }}>{teamInfo?.team_name}</div>
				<Icon component={MoreInfoSVG} style={{ fontSize: 42 }} />
			</div>
			<div className='treeMenu'>
				<div className='menu-time-ctn'>
					<ClockCircleOutlined />
					<div>
						<div>Start date</div>
						<div>Due date</div>
					</div>
				</div>
				<FileProtectOutlined />
				<div className='tree-menu-name'>Name</div>
				<div className='tree-menu-description'>
					<Icon component={MoreInfoSVG} style={{ color: 'black' }} />
					<span>Description</span>
				</div>
				<div className='tree-menu-assign'>
					<TeamOutlined />
					<span>Assign to</span>
				</div>
			</div>
			<div className='tree-ctn'>
				<Tree
					showLine={true}
					style={{ backgroundColor: '#f6f6f6' }}
					expandedKeys={expandedKeys}
					switcherIcon={<></>}
					titleRender={(nodeData) => <TaskCell handleExpandedKey={handleExpandedKey} nodeData={nodeData} />}
					treeData={tasks}
				/>
			</div>
		</div>
	)
}

export default Detail
