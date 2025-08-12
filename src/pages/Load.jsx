import { useState } from "react";
// import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const Load = () => {


	// const { uid } = useParams()
	const [peoples, setPeoples] = useState([])
	
	const urlDetailsPeople = 'https://www.swapi.tech/api/people/'

	async function fetchPeopleDetails(url) {
		const response = await fetch(url);
		return await response.json();
	}

	async function Load() {
		try {
			const response = await fetch(urlDetailsPeople);

			if (!response.ok) {
				throw new Error(`HTTP Error! status: ${response.status}`)
			}
			const data = await response.json()
			 const limitedPeoples = data.results.slice(0, 1);

			const peoplesWithDetails = await Promise.all(
				limitedPeoples.map(async people => {
					const details = await fetchPeopleDetails(people.url);

					return {
						...people,
						details: details.result.properties
					};
				})
			);

			setPeoples(peoplesWithDetails)
			console.log(data.results.properties)
		} catch (error) {
			console.error('Error fetching data: ', error);
			throw error;
		}
	}

	useEffect(() => {
		Load()
	}, [])


	return (
		<div className="container card   text-white bg-dark text-start my-5 opacity-75"> 
		{peoples.map(people => (
			<div key={people.uid} className="d-flex justify-content-center card my-5" >

			<div className=" row g-0">
				<div className="col-md-4">
					<img src="https://i.pravatar.cc" className="img-fluid rounded-start" alt="..."></img>
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">{people.name}</h5>
						<p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
						<p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
					</div>
				</div>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Birth Year</th>
							<th scope="col">Gender</th>
							<th scope="col">Height</th>
							<th scope="col">Skin Color</th>
							<th scope="col">Eye Color</th>
						</tr>
					</thead>
					<tbody className="table-group-divider">
						<tr>
							<th>{people?.name}</th>
							<td>{people?.details.birth_year || 'N/A'}</td>
							<td>{people?.details.gender}</td>
							<td>{people?.details.height}</td>
							<td>{people?.details.skin_color}</td>
							<td>{people?.details.eye_color}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

)) }
</div>

)

}


