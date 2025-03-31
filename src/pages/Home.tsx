import { useSelector } from 'react-redux';
import CryptoList from '../components/CryptoList';
import { RootState } from '../redux/store';

const Home = () => {
    const tokens = useSelector((state: RootState) => state.crypto.tokens);

    return (
        <div style={{width: '100%', height: '100%'}}>
            <CryptoList tokens={tokens} />
        </div>
    );
};

export default Home;