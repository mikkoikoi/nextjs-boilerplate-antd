import '@/styles/globals.css'
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import LayoutComponent from '@/components/Layout'
import PUBLIC_PAGE_URL from '@/configs/public-page-url'
// import axios from 'axios'
// import { getIronSession } from 'iron-session'
// import { has } from 'lodash'
// import sessionOptions from '@/utils/sessionOptions'
// import globalStore from '@/utils/global-store'
// require('@/utils/mock-adapter')
if (!process.browser) React.useLayoutEffect = React.useEffect
const App = ({ Component, pageProps }) => {
	const router = useRouter()
	return (
		<StyleProvider hashPriority="high">
			<ConfigProvider
				theme={{
					token: {
						fontFamily: 'verdana'
					}
				}}>
				{PUBLIC_PAGE_URL.includes(router.pathname) ? (
					<div
						style={{
							minHeight: '100vh', // minHeight = heigh of screen - (margin top + margin bottom)
							display: 'flex',
							justifyContent: 'center'
						}}>
						<Component {...pageProps} />
					</div>
				) : (
					<LayoutComponent>
						<Component {...pageProps} />
					</LayoutComponent>
				)}
			</ConfigProvider>
		</StyleProvider>
	)
}

// App.getInitialProps = async ({ Component, ctx }) => {
// 	let session = {}
// 	let url = {}
// 	try {
// 		session = await getIronSession(ctx.req, ctx.res, sessionOptions)
// 		const nextRequestMeta = ctx.req[Reflect.ownKeys(ctx.req).find((s) => String(s) === 'Symbol(NextRequestMeta)')]
// 		url = new URL(nextRequestMeta.__NEXT_INIT_URL)
// 	} catch (error) {
// 		//
// 	}
// 	if (has(session, 'auth.role.role_id')) {
// 		await axios
// 			.request({
// 				method: 'get',
// 				baseURL: url?.origin,
// 				headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
// 				url: '/api/auth/get-menu-permissions/' + session.auth.role.role_id
// 			})
// 			.then((res) => {
// 				globalStore.set('authMenu', res.data.data.permission)
// 			})
// 	}
// 	let pageProps = {}
// 	if (Component.getInitialProps) {
// 		pageProps = await Component.getInitialProps(ctx)
// 	}
// 	return { pageProps }
// }

export default App
