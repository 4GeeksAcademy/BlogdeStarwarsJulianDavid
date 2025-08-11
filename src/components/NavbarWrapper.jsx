import useGlobalReducer from '../hooks/useGlobalReducer';
import Navbar from './Navbar';

export const NavbarWrapper = () => {
  const { store, dispatch } = useGlobalReducer();

	const removeFromFavorites = (uid, itemType) => {
		const newFavorites = store.favorites.filter(fav =>
			!(fav.uid === uid && fav.type === itemType)
		);
		dispatch({ type: 'update_favorites', payload: { newFavorites } });
	};
  return <Navbar removeFromFavorites={removeFromFavorites} />;
};