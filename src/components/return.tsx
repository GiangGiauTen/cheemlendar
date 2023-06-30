import React from 'react'
import Link from 'next/link'
import './return.css'
import { LeftOutlined } from '@ant-design/icons'
type Props = {
	text: string
	href: string
}
const Return = (props: Props) => {
	return (
		<div className='return'>
			<a className={'return-button-ctn'} href={props.href}>
				<LeftOutlined />
				{props.text}
			</a>
		</div>
	)
}

export default Return
