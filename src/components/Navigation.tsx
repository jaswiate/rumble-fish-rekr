import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const balances = useSelector((state: RootState) => state.crypto.balances);
    const tokens = useSelector((state: RootState) => state.crypto.tokens);

    const totalBalance = tokens.reduce((sum, token) => {
        const balance = balances[token.id] || 0;
        return sum + balance * token.price;
    }, 0);

    return (
        <Box sx={{ zIndex: 1 }}>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100px',
                    background: '#332E2E',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                }}
            >
                <Typography marginLeft={5} color="white" fontFamily="Jersey" fontSize={64}>
                    CryptoWatcher
                </Typography>
                <Typography marginRight={6} color="lightgray" fontSize={17}>
                    {`My wallet USD value: $${totalBalance.toFixed(2)}`}
                </Typography>
            </Box>

            <Box
                sx={{
                    position: 'fixed',
                    top: '100px',
                    left: 0,
                    height: 'calc(100% - 100px)',
                    width: '220px',
                    background: 'linear-gradient(to right, #332E2E, #515151)',
                    display: { xs: 'none', md: 'flex' }, 
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    boxSizing: 'border-box',
                }}
            >
                <Button
                    onClick={() => navigate('/')}
                    startIcon={<AttachMoneyIcon />}
                    sx={{
                        width: '100%',
                        padding: '16px',
                        background: isActive('/') ? 'linear-gradient(to right, #8A8A8A, #E0E0E0)' : 'transparent',
                        color: isActive('/') ? '#000' : '#FFF',
                        textTransform: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    Pick favorites
                </Button>
                <Button
                    onClick={() => navigate('/favorites')}
                    startIcon={<FavoriteIcon />}
                    sx={{
                        width: '100%',
                        padding: '16px',
                        background: isActive('/favorites') ? 'linear-gradient(to right, #8A8A8A, #E0E0E0)' : 'transparent',
                        color: isActive('/favorites') ? '#000' : '#FFF',
                        textTransform: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    My cryptocurrencies
                </Button>
            </Box>

            <Box
                sx={{
                    position: 'fixed',
                    top: '100px',
                    left: 0,
                    width: '100vw',
                    height: '60px',
                    background: 'linear-gradient(to right, #332E2E, #515151)',
                    display: { xs: 'flex', md: 'none' },
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    boxSizing: 'border-box',
                }}
            >
                <Button
                    onClick={() => navigate('/')}
                    startIcon={<AttachMoneyIcon />}
                    sx={{
                        padding: '8px 16px',
                        background: isActive('/') ? 'linear-gradient(to right, #8A8A8A, #E0E0E0)' : 'transparent',
                        color: isActive('/') ? '#000' : '#FFF',
                        textTransform: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    Pick favorites
                </Button>
                <Button
                    onClick={() => navigate('/favorites')}
                    startIcon={<FavoriteIcon />}
                    sx={{
                        padding: '8px 16px',
                        background: isActive('/favorites') ? 'linear-gradient(to right, #8A8A8A, #E0E0E0)' : 'transparent',
                        color: isActive('/favorites') ? '#000' : '#FFF',
                        textTransform: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    My cryptocurrencies
                </Button>
            </Box>
        </Box>
    );
};

export default Navigation;