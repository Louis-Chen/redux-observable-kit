import React from 'react'

export const HomeComponent = props => {
	return (
		<div>
			<div>Redux Examples</div>
			<button onClick={() => props.fetchData()}>
				<h2>Load Data</h2>
			</button>
			{props.appData.isFetching && <h1>Loading</h1>}
			{props.appData.data.length
				? props.appData.data.map((person, i) => {
						return (
							<ul key={i}>
								<li>Name: {person.name}</li>
								<li>Age: {person.age}</li>
							</ul>
						)
					})
				: null}
		</div>
	)
}

