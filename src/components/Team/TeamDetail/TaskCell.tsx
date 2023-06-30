import Icon, { CheckCircleFilled } from '@ant-design/icons'
import { TreeNode } from 'antd/es/tree-select'
import React, { useState } from 'react'
import CheckSVG from '@public/icons/CheckSVG'
import FailSVG from '@public/icons/FailSVG'
import OverdueSVG from '@public/icons/OverdueSVG'
import ProgressSVG from '@public/icons/ProgressSVG'
import ExpandSVG from '@public/icons/ExpandSVG'
import CollapseSVG from '@public/icons/CollapseSVG'
import MoreOptionSVG from '@public/icons/MoreOptionSVG'
import './taskcell.css'

type Props = {
	nodeData: any
	handleExpandedKey: any
}
const TaskCell = (props: Props) => {
	const [isCollapse, setIsCollapse] = useState(false)
	const [name, setName] = useState(localStorage.getItem('name'))
	return (
		<>
			{
				<div className={props.nodeData.parent_task_id ? 'childTask' : 'parentTask'}>
					<div className='time-ctn'>
						<div>
							{new Date(props.nodeData.start_date).toLocaleDateString('en-EN', {
								day: '2-digit',
								month: '2-digit',
								year: 'numeric',
							})}
						</div>
						<div>
							{new Date(props.nodeData.due_date).toLocaleDateString('en-EN', {
								day: '2-digit',
								month: '2-digit',
								year: 'numeric',
							})}
						</div>
					</div>

					<div className='progress'>
						{props.nodeData.progress == 100 && <Icon component={CheckSVG} />}
						{props.nodeData.progress < 100 &&
							props.nodeData.progress >= 0 &&
							new Date(props.nodeData.due_date) >= new Date() && <Icon component={ProgressSVG} />}
						{props.nodeData.progress < 100 &&
							props.nodeData.progress >= 0 &&
							new Date(props.nodeData.due_date) < new Date() && <Icon component={OverdueSVG} />}
						{props.nodeData.progress == -1 && <Icon component={FailSVG} />}
					</div>
					<div className='task-name'>{props.nodeData.task_name}</div>
					<div className='task-description'>{props.nodeData.description}</div>
					<div className='assign'>
						{[...props.nodeData.memberAssign].find((e) => e == name) ? (
							<div>
								<strong style={{ color: '#0500FF' }}>Bạn</strong>
								{[...props.nodeData.memberAssign].length < 4 ? (
									<span>
										{[...props.nodeData.memberAssign].length != 1 && <>, </>}
										{[...props.nodeData.memberAssign].filter((e) => e != name).join(', ')}
									</span>
								) : (
									<span> và {props.nodeData.memberAssign.length - 1} người khác</span>
								)}
							</div>
						) : (
							<div>
								{props.nodeData.memberAssign.length == 1 && <>{props.nodeData.memberAssign[0]}</>}
								{props.nodeData.memberAssign.length == 2 && (
									<>
										{props.nodeData.memberAssign[0]} và {props.nodeData.memberAssign[1]}
									</>
								)}
								{props.nodeData.memberAssign.length == 3 && (
									<>
										{props.nodeData.memberAssign[0]}, {props.nodeData.memberAssign[1]} và{' '}
										{props.nodeData.memberAssign[1]}
									</>
								)}
								{props.nodeData.memberAssign.length == 3 && (
									<>
										{props.nodeData.memberAssign[0]} và {props.nodeData.memberAssign.length} người khác
									</>
								)}
							</div>
						)}
					</div>
					<div
						onClick={() => {
							setIsCollapse(!isCollapse)
							props.handleExpandedKey(props.nodeData.key)
						}}>
						{props.nodeData.children?.length ? isCollapse ? <CollapseSVG /> : <ExpandSVG /> : <MoreOptionSVG />}
					</div>
				</div>
			}
		</>
	)
}

export default TaskCell
