import { connect } from 'react-redux'
import { fetchData } from '../store/action'
import { HomeComponent } from '../components/home';


function mapStateToProps(state) {
	return {
		user: state.user
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchData: () => dispatch(fetchData())
	}
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
