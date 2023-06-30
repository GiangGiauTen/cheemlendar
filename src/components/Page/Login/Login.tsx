import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import InputField from '@/components/InputField'
import './login.css'
import { AppleFilled, GoogleCircleFilled, KeyOutlined, MailOutlined, TwitterCircleFilled } from '@ant-design/icons'
import Link from 'next/link'
import Button from '@/components/Button'
import accountData from '../../../../public/accounts/account.json'
import { Divider } from 'antd'
import axios from 'axios'
import API_BASE_URL from '@/utils/config'
type Props = {}

const Login = (props: Props) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const handleLogin = async () => {
		const res = await axios.post(`${API_BASE_URL}/accounts/login`, { username: username, password: password })
		if (res.status == 200) {
			localStorage.setItem('uid', res.data.userId)
			localStorage.setItem('name', res.data.name)
			localStorage.setItem('username', res.data.username)
			return true
		}
		return false
	}
	return (
		<div>
			<div>
				<Navbar activeNav='home' />
			</div>
			<div className='page'>
				<Image className='center-logo' src='/logo.jpg' width={96} height={96} alt='Logo' />
				<div className='login-form'>
					<div className='login-text'>Login to access your account</div>
					<div className='login-icons'>
						<GoogleCircleFilled style={{ fontSize: '48px' }} />
						<AppleFilled style={{ fontSize: '48px' }} />
						<TwitterCircleFilled style={{ fontSize: '48px' }} />
					</div>
					<div style={{ width: '80%', margin: '0 auto 40px' }}>
						<Divider style={{ color: '#8D9298' }}>OR</Divider>
					</div>
					<div className='login-input-field'>
						<InputField
							icon={<MailOutlined style={{ fontSize: '16px' }} />}
							type={1}
							title={'Email'}
							text='monke@gmail.com'
							setInputValue={setUsername}
						/>
						<InputField
							icon={<KeyOutlined style={{ fontSize: '16px' }} />}
							type={1}
							title={'Password'}
							password={true}
							setInputValue={setPassword}
						/>
						<Link className={'forget-password'} href={'forgot-password'}>
							Forgot Password?
						</Link>
					</div>
					<div className='bottom-form-ctn'>
						<div className='login-button-ctn'>
							<Button
								type='primary'
								styles={{ borderRadius: '10px', width: '208px', height: '48px' }}
								onClick={async () => {
									if (await handleLogin()) window.location.replace('/')
								}}>
								Login
							</Button>
						</div>
						<div className='not-have-account' style={{ color: '#495059' }}>
							Don&apos;t have an account?{' '}
							<Link href='signup' style={{ color: 'black' }}>
								Sign up
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
