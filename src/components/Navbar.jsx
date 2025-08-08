import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const { store } = useGlobalReducer();
	 if (!store) return null;
	 console.log("Store en Navbar:", store);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/"
					className="navbar-brand" href="#">
						<img src="/src/assets/img/starWars.png" alt="" width="50" height="44"></img>
					
				</Link>
				<div className="ml-auto">
						<button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites ({store.favorites.length})
						</button>
						<ul className="dropdown-menu">
						{store.favorites.map(item => (
							<li key={`${item.type}-${item.uid}`} className="dropdown-item"> 
								{item.name}
							</li>
							))}
						</ul>
				</div>
			</div>
		</nav>
	);
};