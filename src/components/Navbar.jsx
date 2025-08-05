import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/"
					className="navbar-brand" href="#">
						<img src="/src/assets/img/starWars.png" alt="" width="50" height="44"></img>
					
				</Link>
				<div className="ml-auto">
					<Link to="">
						<button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
							Favorite
						</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};