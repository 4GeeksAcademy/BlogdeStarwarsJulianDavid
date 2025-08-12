import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const Load = () => {

	
	const { uid } = useParams()
	const [peoples, setPeoples] = useState([])
	const urlDetailsPeople = `https://www.swapi.tech/api/people/${uid}`

	async function Load() {
		
		try {
			const response = await fetch(urlDetailsPeople);
			if (!response.ok){
				throw new Error (`HTTP Error! Status: {response.status}`)
			}
			const data = await response.json()
			setPeoples(data.result.properties)
		} catch (error) {
			console.error(error.message);
			throw error;
		}
	}
	useEffect(() => {
		Load()
	}, [])

	return (
		<div className="card mb-3" style={{width: '540px'}}>
			<div className="row g-0">
				<div className="col-md-4">
					<img src="..." className="img-fluid rounded-start" alt="..."></img>
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">Card title {peoples.name}</h5>
						<p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
						<p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
					</div>
				</div>
			</div>
		</div>
	)
}


