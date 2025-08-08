import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CardsVehicle } from "./CardsVehicle.jsx";
import { CardsPlanet } from "./CardsPlanet.jsx";
import { CardsPeople } from "./CardsPeople.jsx";
import { Navbar } from "../components/Navbar.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const [planets, setPlanets] = useState([])
	const [peoples, setPeoples] = useState([])
	const [vehicles, setVehicles] = useState([])


	const apiUrlPlanet = 'https://www.swapi.tech/api/planets'
	const apiUrlPeople = 'https://www.swapi.tech/api/people'
	const apiUrlVehicle = 'https://www.swapi.tech/api/vehicles'


	const addToFavorites = (item, itemType) => {
		const isAlreadyFavorite = store.favorites.some(fav => fav.uid === item.uid && fav.type === itemType);

		if (!isAlreadyFavorite) {
			const newFavorites = [...store.favorites, { ...item, type: itemType }];
			dispatch({ type: 'update_favorites', payload: { newFavorites } });
		}
	};

	const removeFromFavorites = (uid, itemType) => {
		const newFavorites = store.favorites.filter(fav =>
			!(fav.uid === uid && fav.type === itemType)
		);
		dispatch({ type: 'update_favorites', payload: { newFavorites } });
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
			<Navbar removeFromFavorites={removeFromFavorites} />
			<CardsPeople
				peoples={peoples}
				favorites={store.favorites}
				addToFavorites={addToFavorites}
			/>
			<CardsPlanet
				planets={planets}
				favorites={store.favorites}
				addToFavorites={addToFavorites}
			/>
			<CardsVehicle 
			vehicles={vehicles}
			favorites={store.favorites}
			addToFavorites={addToFavorites}
			/>
		</div>



	);
}; 