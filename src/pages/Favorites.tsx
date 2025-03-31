import { useSelector } from 'react-redux';
import FavoriteList from '../components/FavoriteList';
import { RootState } from '../redux/store';

const Favorites = () => {
    const favorites = useSelector((state: RootState) => state.crypto.favorites);
    const tokens = useSelector((state: RootState) => state.crypto.tokens);

    const favoriteTokens = tokens.filter(t => favorites.includes(t.id));
    
    return (
        <div style={{width: '100%', height: '100%'}}>
            <FavoriteList tokens={favoriteTokens}/>
        </div>
    );
};

export default Favorites;