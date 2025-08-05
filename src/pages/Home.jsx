import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()


	



	return (
		<div>
			<div className="text-start mt-5 container">
				<h1>Characters</h1>
				<div className="container d-flex justify-content-start">
					<div className=" my-3 me-3">
						<div className="card" style={{ width: '18rem' }}>
							<img src="https://i.pravatar.cc" className="card-img-top" alt="..."></img>
							<div className="card-body">
								<h5 className="card-title">Card title</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<Link to="" >
									<button	type="button" className="btn btn-primary">Learn more</button>
								</Link>
							</div>
						</div>
					</div>
				</div>		
			</div>
			<div className="text-start mt-5 container">
				<h1>Planet</h1>
				<div className="container d-flex justify-content-start">
					<div className=" my-3 me-3">
						<div className="card" style={{ width: '18rem' }}>
							<img src="https://i.pravatar.cc/300" className="card-img-top" alt="..."></img>
							<div className="card-body">
								<h5 className="card-title">Card title</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<Link to="" >
									<button	type="button" className="btn btn-primary">Learn more</button>
								</Link>
							</div>
						</div>
					</div>
				</div>		
			</div>


		</div>
		
		
		
	);
}; 