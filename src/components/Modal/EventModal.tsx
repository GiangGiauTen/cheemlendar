import { ClockCircleOutlined, MenuOutlined, TeamOutlined, CalendarOutlined } from '@ant-design/icons'
import { Divider, Input, Select, TimePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import './event_modal.css'
import dayjs, { Dayjs } from 'dayjs'
import colorStyles from '@/utils/eventColor'
const { Option } = Select
type Props = {
	calendarCategory: any
	data: any
	onDataChange: any
}

const EventModal = (props: Props) => {
	const onChangeStart = (value: Dayjs | null) => {
		props.onDataChange({ timeStart: value })
	}

	const onChangeEnd = (value: Dayjs | null) => {
		props.onDataChange({ timeEnd: value })
	}

	return (
		<div>
			<Input
				className='modalTitle'
				placeholder='Add Title'
				defaultValue={props.data.title}
				onChange={(e) => props.onDataChange({ title: e.target.value })}
			/>
			<Divider className='title-divider' />
			<div className='time-ctn'>
				<ClockCircleOutlined />
				<div className='date-str'>
					{props.data.timeStart.toLocaleString('en-US', { weekday: 'short', day: 'numeric' })}
				</div>
				<div className='time-picker'>
					<TimePicker
						className='tp'
						value={dayjs(props.data.timeStart)}
						onChange={onChangeStart}
						format={'HH:mm'}
						minuteStep={5}
					/>
					<div>ー</div>
					<TimePicker
						className='tp'
						value={dayjs(props.data.timeEnd)}
						onChange={onChangeEnd}
						format={'HH:mm'}
						minuteStep={5}
					/>
				</div>
				<div className='color-picker'>
					<div>Color</div>
					<Select
						style={{
							width: '100px',
						}}
						placeholder='select event color'
						defaultValue={props.data.colorTheme}
						onChange={(value) => {
							props.onDataChange({ colorTheme: value })
						}}>
						{colorStyles.map((e) => (
							<Option value={e.value} key={e.value}>
								<div style={{ backgroundColor: e.bg, width: '100%' }}>
									<div style={{ width: '10px', borderRadius: '50%', color: e.text, paddingLeft: '40%' }}>〇</div>
								</div>
							</Option>
						))}
					</Select>
				</div>
			</div>
			<div className='team-ctn'>
				<TeamOutlined />
				<Input placeholder='Add guests' />
			</div>
			<div className='calendar-select-ctn'>
				<CalendarOutlined />
				<Select
					showSearch
					placeholder='Select Calendar'
					defaultValue={props.data.category}
					onChange={(value) => {
						props.onDataChange({ category: value })
					}}
					options={[
						{ value: 0, label: 'Add new' },
						...props.calendarCategory?.map((e: any) => {
							e.value = e.calendar_id
							e.label = e.calendar_name
							return e
						}),
					]}
				/>
				{props.data.category === 0 && <Input placeholder='New category Name' />}
			</div>
			<div className='description-ctn'>
				<MenuOutlined style={{ paddingTop: '5px' }} />
				<Input.TextArea
					rows={3}
					placeholder='Add description'
					defaultValue={props.data.description}
					value={props.data.description}
					onChange={(e) => {
						props.onDataChange({ description: e.target.value })
					}}
				/>
			</div>
		</div>
	)
}

export default EventModal
