import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const [planets, setPlanets] = useState([])
	const [peoples, setPeoples] = useState([])


	const apiUrlPlanet = 'https://www.swapi.tech/api/planets'
	const apiUrlPeople = 'https://www.swapi.tech/api/people'

	async function fetchPeoples() {
		try {
			const response = await fetch(apiUrlPeople);

			if(!response.ok){
				throw new Error(`HTTP Error! status: ${response.status}`)
			}
			const data = await response.json()
			setPeoples(data.results)
			console.log(data.results)
			return data.results
		}catch(error){
			console.error('Error fetching data: ', error);
			throw error;
		}
	}


	async function fetchPlanetDetails(url) {
		const response = await fetch(url);
		return await response.json();
	}

	async function fetchDataPlanets() {
		try {
			const response = await fetch(apiUrlPlanet);

			if (!response.ok) {
				throw new Error(`HTTP Error! status: ${response.status}`);
			}

			const data = await response.json();

			const planetsWithDetails = await Promise.all(
				data.results.map(async planet => {
					const details = await fetchPlanetDetails(planet.url);

					return {
						...planet,
						details: details.result.properties
					};
				})
			);

			setPlanets(planetsWithDetails);

		} catch (error) {
			console.error('Error fetching data: ', error);
			throw error;
		}
	}
	useEffect(() => {
		fetchDataPlanets();
		fetchPeoples()
	}, []);

	return (
		<div>
			<div className="text-start mt-5 container">
				<h1>People</h1>
				<div className="d-flex flex-row overflow-auto py-3">
					{peoples.map(people =>(

					<div key={people.uid} className=" my-3 me-3">
						<div className="card h-100 d-flex flex-column" style={{ width: '18rem' }}>
							<img src="https://i.pravatar.cc" className="card-img-top" alt="..."></img>
							<div className="card-body">
								<h5 className="card-title">{people.name}</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<Link to="" >
									<button type="button" className="btn btn-primary">Learn more</button>
								</Link>
							</div>
						</div>
					</div>
					))}
				
				</div>
			</div>
			
			<div className="text-start mt-5 container ">
				<h1>Star Wars Planet</h1>
				<div className="d-flex flex-row overflow-auto py-3">
					{planets.map(planet => (

						<div key={planet.uid} className=" my-3 me-3">
							<div className="card h-100 d-flex flex-column" style={{ width: '18rem' }}>
								<img src="https://i.pravatar.cc/300" className="card-img-top" alt={planet.name}></img>
								<div className="card-body h-100 d-flex flex-column">
									<div className="mt-auto">
										<h5 className="card-title">{planet.name}</h5>
										<h6> Population: {planet.details.population} </h6>
										<h6> Terrain: {planet.details.terrain} </h6>
										<h6> Climate: {planet.details.climate} </h6>
										<Link to="" >
											<button type="button" className="btn btn-primary">Learn more</button>
										</Link>
									</div>	
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>



	);
}; 