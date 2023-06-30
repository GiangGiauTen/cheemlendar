import React, { useRef, useState } from 'react'
import { Popover, Divider, Button } from 'antd'
import './event.css'
import { ClockCircleTwoTone, DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import EventModal from '@/components/Modal/EventModal'
import colorStyles from '@/utils/eventColor'
import axios from 'axios'
import API_BASE_URL from '@/utils/config'
type Props = {
	colorTheme: number
	key?: any
	event_id?: number
	weekStart: Date
	timeStart: Date
	timeEnd: Date
	category: number | null
	name: string
	description: string
	setIsModalOpen: any
	setModalData: any
}

const formatTime = (date: Date): string => {
	return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}
const Event = (props: Props) => {
	const [show, setShow] = useState(true)
	function event_content(props: Props) {
		return (
			<div className='custom-pop-over'>
				<div className='popover-title' style={{ color: colorStyles[props.colorTheme].text }}>
					{props.name}
				</div>
				<Divider style={{ backgroundColor: colorStyles[props.colorTheme].line, margin: '0' }} />
				<div className='pop-over-info'>
					<div className='popover-time' style={{ color: colorStyles[props.colorTheme].text }}>
						<ClockCircleTwoTone /> {formatTime(props.timeStart)} - {formatTime(props.timeEnd)}
					</div>
				</div>
				<div className='description'>{props.description}</div>
				<div className='popover-btn-ctn'>
					<DeleteTwoTone
						twoToneColor={'#FF4545'}
						style={{ cursor: 'pointer' }}
						onClick={async () => {
							const delRes = await axios.delete(`${API_BASE_URL}/events/${props.event_id}`)
							if (delRes.status == 200) {
								setTimeout(() => {
									setShow(false)
								}, 500)
							}
						}}
					/>
					<EditTwoTone
						style={{ cursor: 'pointer' }}
						onClick={() => {
							props.setIsModalOpen(true)
							props.setModalData({
								mode: 'edit',
								title: props.name,
								timeStart: props.timeStart,
								timeEnd: props.timeEnd,
								description: props.description,
								category: props.category,
								colorTheme: props.colorTheme,
							})
						}}
					/>
				</div>
			</div>
		)
	}

	return (
		<>
			{show && (
				<Popover content={event_content(props)} trigger={'click'} color={'#F5F5F5'} zIndex={998}>
					<div
						key={props.key}
						className='event'
						style={{
							top: `${62 * props.timeStart.getHours() + (62 / 60) * props.timeStart.getMinutes()}px`,
							height: `${(62 * (props.timeEnd.getTime() - props.timeStart.getTime())) / 3600000}px`,
							left: `${50 + 141 * (props.timeStart.getDate() - props.weekStart.getDate())}px`,
							background: colorStyles[props.colorTheme].bg,
							color: colorStyles[props.colorTheme].text,
							borderLeftColor: colorStyles[props.colorTheme].line,
						}}>
						<div className='task-time'>
							{formatTime(props.timeStart)} - {formatTime(props.timeEnd)}
						</div>
						<div className='task-name'>{props.name}</div>
					</div>
				</Popover>
			)}
		</>
	)
}

export default Event
