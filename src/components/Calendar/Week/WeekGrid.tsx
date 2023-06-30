'use client'
import React, { useEffect, useRef, useState } from 'react'
import './weekgrid.css'
import Event from './Event'
import axios from 'axios'
import { Modal } from 'antd'
import EventModal from '@/components/Modal/EventModal'
import API_BASE_URL from '../../../utils/config'

type Props = {
	weekStart: Date
	calendarCategory: any
}
const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
	'Content-Type': 'application/json',
}
const [minX, maxX, minY, maxY] = [50, 1035, 0, 1490]
const Line = (hour: number) => {
	return (
		<>
			<div className='hour-display'>{`${((hour - 1) % 12) + 1} ${hour > 11 ? 'PM' : 'AM'}`}</div>
			<div className='hour-line'>
				{Array.from(Array(7).keys()).map((e, id) => (
					<div key={id} className='cell'></div>
				))}
			</div>
		</>
	)
}

const calculateTimeOnPosition = (x: number, y: number, weekStart: Date): Date => {
	let tmpDate = weekStart.getDate() + Math.floor((7 * (x - minX)) / (maxX - minX))
	let calculatedDate = new Date(weekStart)
	calculatedDate.setDate(tmpDate)
	calculatedDate.setMinutes(15 * Math.round((96 * (y - minY)) / (maxY - minY)))
	return calculatedDate
}
const WeekGrid = (props: Props) => {
	const [events, setEvents] = useState([])
	const [newEventData, setNewEventData] = useState<
		| {
				color_theme: number
				weekStart: Date
				timeStart: Date
				timeEnd: Date
				category: number | null
				name: string
				description: string
		  }
		| undefined
	>(undefined)
	const [modalData, setModalData] = useState<any>({})
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
	const gridRef = useRef<HTMLDivElement>(null)
	const [onClickCreateEvent, setOnClickCreateEvent] = useState(false)
	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (gridRef.current && ['cell', 'hour-line'].includes((event.target as HTMLDivElement).className)) {
			event.preventDefault()
			const { left, top } = gridRef.current.getBoundingClientRect()
			const mousePosX = event.clientX - left
			const mousePosY = event.clientY - top + gridRef.current.scrollTop
			setMousePos({ x: mousePosX, y: mousePosY })
			setOnClickCreateEvent(true)
		}
	}

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.preventDefault()
		if (gridRef.current) {
			const { left, top } = gridRef.current.getBoundingClientRect()
			const mousePosX = event.clientX - left
			const mousePosY = event.clientY - top + gridRef.current.scrollTop
			if (onClickCreateEvent) {
				setNewEventData({
					color_theme: 0,
					weekStart: props.weekStart,
					timeStart: calculateTimeOnPosition(mousePos.x, mousePos.y, props.weekStart),
					timeEnd: calculateTimeOnPosition(mousePosX, mousePosY, props.weekStart),
					category: null,
					name: '',
					description: '',
				})
			}
		}
	}

	const handleMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.preventDefault()
		if (gridRef.current) {
			const { left, top } = gridRef.current.getBoundingClientRect()
			const mousePosX = event.clientX - left
			const mousePosY = event.clientY - top + gridRef.current.scrollTop
			if (onClickCreateEvent) {
				const timeStart = calculateTimeOnPosition(mousePos.x, mousePos.y, props.weekStart)
				const timeEnd = calculateTimeOnPosition(mousePosX, mousePosY, props.weekStart)
				setModalData({
					mode: 'create',
					title: '',
					timeStart: timeStart,
					timeEnd: timeEnd,
					category: 0,
					colorTheme: 0,
					description: '',
				})
				setNewEventData({
					color_theme: 0,
					weekStart: props.weekStart,
					timeStart: timeStart,
					timeEnd: timeEnd,
					category: null,
					name: '',
					description: '',
				})
				setIsModalOpen(true)
				setOnClickCreateEvent(false)
			}
		}
	}

	useEffect(() => {
		const getEvents = async (weekStart: Date) => {
			try {
				let tmpDate = weekStart.getDate() + 7
				let endDate = new Date(weekStart)
				endDate.setDate(tmpDate)
				const response = await axios.post(
					`${API_BASE_URL}/events/getAllEvents`,
					{
						userId: '1',
						start_date: weekStart.toISOString().split('T')[0],
						end_date: endDate.toISOString().split('T')[0],
					},
					{ headers },
				)
				setEvents(response.data)
			} catch (error) {
				throw new Error('Error retrieving data')
			}
		}
		getEvents(props.weekStart)
	}, [])

	const onDataChange = (newData: any) => {
		setModalData(Object.assign({}, modalData, newData))
	}

	const handleSubmit = async () => {
		try {
			if (modalData.mode == 'create') {
				const submitRes = await axios.post(`${API_BASE_URL}/events/`, {
					calendar_id: modalData.category,
					event_title: modalData.title,
					start_datetime: new Date(modalData.timeStart.getTime() + 25200000).toISOString(),
					end_datetime: new Date(modalData.timeEnd.getTime() + 25200000).toISOString(),
					color_theme: modalData.colorTheme,
					description: modalData.description,
				})
				if (submitRes.status == 201) {
					window.location.reload()
				}
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div
			className='grid-view'
			ref={gridRef}
			onMouseDown={(event) => {
				handleMouseDown(event)
			}}
			onMouseUp={(events) => {
				handleMouseUp(events)
			}}
			onMouseMove={(events) => {
				handleMouseMove(events)
			}}>
			{Array.from(Array(24).keys()).map((e, id) => (
				<div key={id} className='line'>
					{Line(id)}
				</div>
			))}
			{events &&
				events.map((e: any) => {
					return (
						<Event
							key={e.event_id}
							event_id={e.event_id}
							weekStart={props.weekStart}
							timeStart={new Date(e['start_datetime'])}
							timeEnd={new Date(e['end_datetime'])}
							category={e['color_theme']}
							name={e['event_title']}
							description={e['description']}
							colorTheme={e['color_theme']}
							setIsModalOpen={setIsModalOpen}
							setModalData={setModalData}></Event>
					)
				})}
			{newEventData && (
				<Event
					colorTheme={newEventData.color_theme}
					weekStart={newEventData.weekStart}
					timeStart={newEventData.timeStart}
					timeEnd={newEventData.timeEnd}
					category={newEventData.category}
					name={newEventData.name}
					description={newEventData.description}
					setIsModalOpen={false}
					setModalData={null}
				/>
			)}
			<Modal
				style={{ zIndex: 1000 }}
				open={isModalOpen}
				onCancel={() => {
					setModalData({})
					setNewEventData(undefined)
					setIsModalOpen(false)
				}}
				onOk={handleSubmit}>
				<EventModal data={modalData} calendarCategory={props.calendarCategory} onDataChange={onDataChange}></EventModal>
			</Modal>
		</div>
	)
}

export default WeekGrid
