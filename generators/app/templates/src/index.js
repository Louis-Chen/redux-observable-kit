import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// 沒有加 /es 會undefined 程式跑不出來
import { ConnectedRouter } from 'react-router-redux/es'
import store, { history } from './store/configureStore'

import App from './app'
import registerServiceWorker from './registerServiceWorker'

const Root = () => (
	<div>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>
	</div>
)

ReactDOM.render(<Root />, document.getElementById('root'))

registerServiceWorker()
