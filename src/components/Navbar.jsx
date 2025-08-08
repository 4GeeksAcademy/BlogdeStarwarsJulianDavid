import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = ({ removeFromFavorites }) => {
	const { store } = useGlobalReducer();

	return (
		<nav className="navbar navbar-dark bg-dark">
			<div className="container">
				<Link to="/"
					className="navbar-brand" href="#">
					<img src="/src/assets/img/starWars.png" alt="" width="50" height="44"></img>

				</Link>
				<div className="btn-group dropstart">
					<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites ({store.favorites.length})
					</button>
					<ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
						{store.favorites.map(item => (
							<li key={`${item.type}-${item.uid}`}> 
								<button className="dropdown-item" type="button"  >
									{item.name}
								<span className="text-muted"> /Type: {item.type}</span> 
									<i onClick={(e) => { 
										e.stopPropagation(), removeFromFavorites(item.uid, item.type) }} 
										className="fa-regular fa-trash-can ms-2"></i> 
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};