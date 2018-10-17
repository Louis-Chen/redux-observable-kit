import React from 'react'
import { Link } from 'react-router-dom'

import PageRouter from './routes'
const App = () => {
	return (
		<div>
			<header>
				<Link to="/">Home</Link>
				<Link to="/about-us">About</Link>
			</header>
			<main>
				<PageRouter />
			</main>
		</div>
	)
}

export default App
