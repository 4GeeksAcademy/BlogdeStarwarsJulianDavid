import { Link } from "react-router-dom";



export const CardsVehicle = ({ 
        vehicles = [],
        favorites = [],
        addToFavorites
    }) =>{

    return(

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
                                    <div className="d-flex justify-content-between">
                                        <Link to="" >
                                            <button type="button" className="btn btn-primary">
                                                Learn more
                                            </button>
                                        </Link>
                                        <button onClick={() => addToFavorites(vehicle, 'vehicle')}
													className="btn btn-outline-warning">
														{ favorites.some(fav => fav.uid === vehicle.uid && fav.type === 'vehicle') ? (
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


