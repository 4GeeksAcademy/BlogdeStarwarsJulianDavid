import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const LoadPlanet = () => {


    const { uid } = useParams()
    const [planets, setPlanets] = useState(null)
    
    
    async function fetchSpecificPlanet() {
        try {
            
            const urlDetailsPlanet = `https://www.swapi.tech/api/planets/${uid}`;
            const response = await fetch(urlDetailsPlanet);

            if (!response.ok) {
                throw new Error(`HTTP Error! status: ${response.status}`)
            }
            const data = await response.json();
            
            setPlanets({
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
            fetchSpecificPlanet()
        }
    }, [uid])

    if (!planets){
        return(             
        <div className="container text-white bg-dark text-center opacity-75 my-5">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">loading...</span>
                </div>
                <p className="text-white mt-3">Cargando información del planeta...</p>
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
                        <h5 className="card-title">{planets.name}</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Climate</th>
                            <th scope="col">Surface Water</th>
                            <th scope="col">Diameter</th>
                            <th scope="col">Terrain</th>
                            <th scope="col">Gravity</th>
                            <th scope="col">Population</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        <tr>
                            <th>{planets?.name}</th>
                            <td>{planets?.details?.climate || 'N/A'}</td>
                            <td>{planets?.details?.surface_water}</td>
                            <td>{planets?.details?.diameter}</td>
                            <td>{planets?.details?.terrain}</td>
                            <td>{planets?.details?.gravity}</td>
                            <td>{planets?.details?.population}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

        )

    }


