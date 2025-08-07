import { Link } from "react-router-dom";
import { Home } from "../pages/Home";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/"
					className="navbar-brand" href="#">
						<img src="/src/assets/img/starWars.png" alt="" width="50" height="44"></img>
					
				</Link>
				<div className="ml-auto">
						<button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
							Favorite
						</button>
						{/* <ul className="dropdown-menu">
						{favorites.map(item => <li key={item.uid}> 
								<p className="dropdown-item">{item.name}</p>	
							</li>)}
						</ul> */}
				</div>
			</div>
		</nav>
	);
};