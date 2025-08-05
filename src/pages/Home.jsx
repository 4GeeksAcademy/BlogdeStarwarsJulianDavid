import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const [planets, setPlanets] = useState([])

	const apiUrlBase = 'https://www.swapi.tech/api/'
	const apiUrlPlanet = 'https://www.swapi.tech/api/planets'

	async function fetchDataPlanets() {
		try{
			const response = await fetch(apiUrlPlanet);

		if(!response.ok) {
			throw new Error(`HTTP Error! status: ${response.status}`);
		}

		const data = await response.json();
		setPlanets(data.results)
		console.log(data.results)
		return data.results;
		}catch(error){
			console.error('Error fetching data: ', error);
			throw error;
		}
	}
	useEffect(()=>{
		fetchDataPlanets();
	}, []);

	return (
		<div>
			<div className="text-start mt-5 container">
				<h1>Characters</h1>
				<div className="container d-flex justify-content-start">
					<div className=" my-3 me-3">
						<div className="card" style={{ width: '18rem' }}>
							<img src="https://i.pravatar.cc" className="card-img-top" alt="..."></img>
							<div className="card-body">
								<h5 className="card-title">Card title</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<Link to="" >
									<button type="button" className="btn btn-primary">Learn more</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="text-start mt-5 container">
				<h1>Star Wars Planet</h1>
				<div className="container d-flex justify-content-start flex-wrap">
					{planets.map(planet => (

					<div key={planet.uid} className=" my-3 me-3">
						<div className="card" style={{ width: '18rem' }}>
							<img src="https://i.pravatar.cc/300" className="card-img-top" alt={planet.name}></img>
							<div className="card-body">
								<h5 className="card-title">{planet.name}</h5>
								<h6> Population: {planet.properties}</h6>
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
		</div>



	);
}; 