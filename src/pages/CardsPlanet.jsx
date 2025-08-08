import { Link } from "react-router-dom";



export const CardsPlanet = ({ 
	planets = [],
	favorites = [],
	addToFavorites
 }) =>{
	  const isFavorite = (uid, type) => {
    if (!Array.isArray(favorites)) return false;
    return favorites.some(fav => fav?.uid === uid && fav?.type === type);
  };

    return(
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
    )
}