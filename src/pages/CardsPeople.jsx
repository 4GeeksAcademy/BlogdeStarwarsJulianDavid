import { Link } from "react-router-dom";

export const CardsPeople = ({peoples=[]})=>{

    return(
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
    )
}