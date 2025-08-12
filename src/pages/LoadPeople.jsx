import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const LoadPeople = () => {


	const { uid } = useParams()
	const [peoples, setPeoples] = useState(null)
	
	
	async function fetchSpecificPeople() {
		try {
			
			const urlDetailsPeople = `https://www.swapi.tech/api/people/${uid}`;
			const response = await fetch(urlDetailsPeople);
			console.log('URL que se está consultando:', urlDetailsPeople);
			console.log('UID recibido:', uid);

			if (!response.ok) {
				throw new Error(`HTTP Error! status: ${response.status}`)
			}
			const data = await response.json();
			console.log('Datos recibidos de la API:', data);
			
			setPeoples({
				uid: uid,
				name: data.result.properties.name,
				url: data.result.properties.url,
				details: data.result.properties
			})
			console.log('Datos específicos de cada personaje: ', data.result.properties)
		} catch (error) {
			console.error('Error fetching data: ', error);
			throw error;
		}
	}

	useEffect(() => {

		if(uid){
			fetchSpecificPeople()
		}
	}, [uid])

	if (!peoples){
		return(             
		<div className="container text-white bg-dark text-center opacity-75 my-5">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="text-white mt-3">Cargando información del personaje...</p>
        </div>
        );
	}


	return (
		<div className="container card   text-white bg-dark text-start my-5 opacity-75"> 
		
			<div className="d-flex justify-content-center card my-5" >

			<div className=" row g-0">
				<div className="col-md-4">
					<img src="https://i.pravatar.cc" className="img-fluid rounded-start" alt="..."></img>
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">{peoples.name}</h5>
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
							<th>{peoples?.name}</th>
							<td>{peoples?.details.birth_year || 'N/A'}</td>
							<td>{peoples?.details.gender}</td>
							<td>{peoples?.details.height}</td>
							<td>{peoples?.details.skin_color}</td>
							<td>{peoples?.details.eye_color}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

		)

	}


