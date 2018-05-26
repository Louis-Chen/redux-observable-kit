import { connect } from 'react-redux'
import { fetchData } from '..store/action'
import { HomeComponent } from '../components/home';


function mapStateToProps(state) {
	return {
		appData: state.appData
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchData: () => dispatch(fetchData())
	}
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
