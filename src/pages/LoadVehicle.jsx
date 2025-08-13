import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const LoadVehicle = () => {


    const { uid } = useParams()
    const [vehicles, setVehicles] = useState(null)
    
    
    async function fetchSpecificVehicle() {
        try {
            
            const urlDetailsVehicle = `https://www.swapi.tech/api/vehicles/${uid}`;
            const response = await fetch(urlDetailsVehicle);
            console.log('URL que se está consultando:', urlDetailsVehicle);
            console.log('UID recibido:', uid);

            if (!response.ok) {
                throw new Error(`HTTP Error! status: ${response.status}`)
            }
            const data = await response.json();
            
            setVehicles({
                uid: uid,
                name: data.result.properties.name,
                url: data.result.properties.url,
                details: data.result.properties
            })
        } catch (error) {
            console.error('Error fetching data: ', error);
            throw error;
        }
    }

    useEffect(() => {

        if(uid){
            fetchSpecificVehicle()
        }
    }, [uid])

    if (!vehicles){
        return(             
        <div className="container text-white bg-dark text-center opacity-75 my-5">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="text-white mt-3">Cargando información del vehículo...</p>
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
                        <h5 className="card-title">{vehicles.name}</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Cargo Capacity</th>
                            <th scope="col">Passengers</th>
                            <th scope="col">Model</th>
                            <th scope="col">Vehicle Class</th>
                            <th scope="col">Manufacturer</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        <tr>
                            <th>{vehicles?.name}</th>
                            <td>{vehicles?.details.cargo_capacity || 'N/A'}</td>
                            <td>{vehicles?.details.passengers}</td>
                            <td>{vehicles?.details.model}</td>
                            <td>{vehicles?.details.vehicle_class}</td>
                            <td>{vehicles?.details.manufacturer}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

        )

    }


