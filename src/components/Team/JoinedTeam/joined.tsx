import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import './joined.css'
import { Avatar, Card, Image, Skeleton, Switch } from 'antd'
import { Select } from 'antd'
import type { SelectProps } from 'antd'
import Button from '@/components/Button'
import axios from 'axios'
import API_BASE_URL from '@/utils/config'
const { Meta } = Card
type Props = {}
interface Team {
	avatar: any
	public: boolean
	team_id: number
	team_name: string
	description: string
	member_count: number
}
const JoinedTeam = (props: Props) => {
	const [selected, setSelected] = useState('')
	const [teams, setTeams] = useState<Team[]>([])
	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get(`${API_BASE_URL}/teams/getAllJoinedTeam/${localStorage.getItem('uid')}`)
			if (res.status == 200) {
				setTeams(
					res.data.map((e: { avatar: string; team_id: any }) => {
						e.avatar = `teams/${e.team_id}.jpg`
						return e
					}),
				)
			}
		}
		fetchData()
	}, [])

	let selectedValue: string
	return (
		<div className='page'>
			<Navbar activeNav={'home'} />
			<div className='joined-team'>
				<div className='joined-header'>
					<div className='joined-text'>Joined Team</div>
					<div className='joined-input'>
						<div className='joined-seaerch'>
							<Select
								showSearch
								onChange={(value) => {
									setSelected(value)
								}}
								style={{ width: 400 }}
								placeholder='Search to Select'
								optionFilterProp='children'
								filterOption={(input, option) => (option?.team_name ?? '').includes(input)}
								filterSort={(optionA, optionB) =>
									(optionA?.team_name ?? '').toLowerCase().localeCompare((optionB?.team_name ?? '').toLowerCase())
								}
								options={teams}
							/>
						</div>
						<Button
							type='primary'
							styles={{
								borderRadius: '10px',
								width: '208px',
								height: '48px',
							}}
							onClick={() => {
								console.log(selectedValue)
							}}>
							<a className={'joined-button-ctn'} href={'create-team'}>
								Join or create a team
							</a>
						</Button>
					</div>
				</div>
				<div className='joined-body'>
					{teams.map((item) => (
						<div
							key={item.team_id}
							className={`team-infor-${selected == '' || item.team_name.includes(selected) ? '' : 'hidden'}`}>
							<Card style={{ width: 804, height: 'auto', borderRadius: 20 }} className='Card-team'>
								<Meta
									avatar={<Image alt='team-image' width={60} height={60} src={item.avatar} />}
									title={item.team_name}
									description={
										<div className='team-info-ctn'>
											<div>
												{item.public ? 'Công khai' : 'Bí mật'} - {item.member_count} thành viên
											</div>
											<div>{item.description}</div>
										</div>
									}
								/>
								<Link href={`team/${item.team_id}`}>
									<Button
										type='primary'
										styles={{
											borderRadius: '10px',
											width: '131px',
											height: '48px',
											padding: '10px',
											cursor: 'pointer',
										}}>
										View Detail
									</Button>
								</Link>
							</Card>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
export default JoinedTeam
