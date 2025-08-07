import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const [favorites, setFavorites] = useState([])
	const [planets, setPlanets] = useState([])
	const [peoples, setPeoples] = useState([])
	const [vehicles, setVehicles] = useState([])


	const apiUrlPlanet = 'https://www.swapi.tech/api/planets'
	const apiUrlPeople = 'https://www.swapi.tech/api/people'
	const apiUrlVehicle = 'https://www.swapi.tech/api/vehicles'


	const addToFavorites = (item, itemType) => {
		const isAlreadyFavorite = favorites.some(fav => fav.uid === item.uid && fav.type === itemType);

		if (!isAlreadyFavorite) {
			setFavorites(prev => [...prev, { ...item, type: itemType }]);
			console.log(`${item.name} (${itemType}) añadido!`);
		}
	};

	const removeFromFavotites = (uid, itempType) => {
		setFavorites(prev =>
			prev.filter(fav => !(fav.uid === uid && fav.type === itempType))
		);
	};

	async function fetchVehicleDetails(url) {
		const response = await fetch(url);
		return await response.json()
	}

	async function fetchVehicles() {
		try {
			const response = await fetch(apiUrlVehicle);

			if (!response.ok) {
				throw new Error(`HTTP Error! status: ${response.status}`)
			}
			const data = await response.json()

			const vehiclesWithDetails = await Promise.all(
				data.results.map(async vehicle => {
					const details = await fetchVehicleDetails(vehicle.url);

					return {
						...vehicle,
						details: details.result.properties
					};
				})
			);

			setVehicles(vehiclesWithDetails);

		} catch (error) {
			console.error('Error fetching data: ', error);
			throw error;
		}
	}

	async function fetchPeopleDetails(url) {
		const response = await fetch(url);
		return await response.json();
	}

	async function fetchPeoples() {
		try {
			const response = await fetch(apiUrlPeople);

			if (!response.ok) {
				throw new Error(`HTTP Error! status: ${response.status}`)
			}
			const data = await response.json()

			const peoplesWithDetails = await Promise.all(
				data.results.map(async people => {
					const details = await fetchPeopleDetails(people.url);

					return {
						...people,
						details: details.result.properties
					};
				})
			);

			setPeoples(peoplesWithDetails)

		} catch (error) {
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
		fetchPeoples();
		fetchVehicles();
	}, []);

	return (
		<div>
			<div className="text-start mt-5 container">
				<h1>Star Wars People</h1>
				<div className="d-flex flex-row overflow-auto py-3">
					{peoples.map(people => (

						<div key={people.uid} className=" my-3 me-3">
							<div className="card h-100 d-flex flex-column" style={{ width: '18rem' }}>
								<img src="https://i.pravatar.cc" className="card-img-top" alt="..."></img>
								<div className="card-body">
									<h5 className="card-title">{people.name}</h5>
									<h6> Gender: {people.details.gender}</h6>
									<h6> Hair color: {people.details.hair_color} </h6>
									<h6> Eye color {people.details.eye_color} </h6>
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
										<div className="d-flex justify-content-between">
											<Link to="" >
												<button type="button" className="btn btn-primary">Learn more</button>
											</Link>
												<button onClick={() => addToFavorites(planet, 'planet')}
													className="btn btn-outline-warning">
														{ favorites.some(fav => fav.uid === planet.uid && fav.type === 'planet') ? (
															<i className="fas fa-star text-warning"></i>) : (
															<i className="far fa-star"></i>)
														}
												</button>											
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="text-start mt-5 container ">
				<h1>Star Wars Vehicles</h1>
				<div className="d-flex flex-row overflow-auto py-3">
					{vehicles.map(vehicle => (

						<div key={vehicle.uid} className=" my-3 me-3">
							<div className="card h-100 d-flex flex-column" style={{ width: '18rem' }}>
								<img src="https://i.pravatar.cc/300" className="card-img-top" alt={vehicle.name}></img>
								<div className="card-body h-100 d-flex flex-column">
									<div className="mt-auto">
										<h5 className="card-title">{vehicle.name}</h5>
										<h6> Cargo capacity: {vehicle.details.cargo_capacity} </h6>
										<h6> Passengers: {vehicle.details.passengers} </h6>
										<h6> Model: {vehicle.details.model} </h6>
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