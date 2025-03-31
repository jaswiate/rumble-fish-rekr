import { useState } from 'react';
import { Token } from '../types/Token';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { toggleFavorite } from '../redux/cryptoSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useSwipeable } from 'react-swipeable';

const CryptoList = ({ tokens }: { tokens: Token[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const favorites = useSelector((state: RootState) => state.crypto.favorites);
    const dispatch = useDispatch();

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? tokens.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === tokens.length - 1 ? 0 : prevIndex + 1));
    }; 

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrev,
    });

    return (
        <div {...swipeHandlers} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '100%', 
            height: '100%', 
        }}>
            <div style={{ 
                display: 'flex',
                position: 'relative', 
                width: '100%',
                height: '70%',
                justifyContent: 'center', 
                alignItems: 'center' 
            }}>
                {tokens.map((token, index) => {
                    const offset = (index - currentIndex + tokens.length) % tokens.length;

                    const isCenter = offset === 0;
                    const isLeft = offset === tokens.length - 1;
                    const isRight = offset === 1;

                    return (
                        <div
                            key={token.id}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: isCenter
                                    ? '50%'
                                    : isLeft
                                    ? '0%'
                                    : isRight
                                    ? '90%'
                                    : '-9999px',
                                transform: 'translate(-50%, -50%)',
                                opacity: isCenter ? 1 : 0.5,
                                transformOrigin: 'center',
                                scale: isCenter ? 1 : 0.8,
                                transition: 'all 0.5s ease',
                                zIndex: isCenter ? 2 : 0,
                            }}
                        >
                            <Card sx={{ 
                                margin: 2, 
                                padding: 2,
                                paddingBottom: 7,
                                backgroundColor: '#332E2E',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '30vw',
                                color: 'white', 
                                borderRadius: '12px',
                                position: 'relative',
                            }}>
                                <CardContent sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                    }}>
                                    <img src={token.icon} alt={token.name} width={150} height={150}/>

                                    <Typography fontSize={25} fontWeight='bold' marginTop={2}>{`${token.name} (${token.id})`}</Typography>

                                    <Typography fontSize={15} marginTop={1}>{`Current price: $${token.price}`}</Typography>
                                    <Typography fontSize={15} marginTop={1}>{`Last check: 12/31/2024 8:20 p.m.`}</Typography>
                                    
                                </CardContent>

                                <IconButton
                                    onClick={() => dispatch(toggleFavorite(token.id))}
                                    sx={{
                                        position: 'absolute',
                                        bottom: 13,
                                        right: 16,
                                    }}
                                >
                                    {favorites.includes(token.id) ? (
                                        <FavoriteIcon fontSize="large" sx={{color: "red"}}/>
                                    ) : (
                                        <FavoriteBorderIcon fontSize="large" sx={{color: "red"}}/>
                                    )}
                                </IconButton>
                            </Card>
                        </div>
                    );
                })}
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '16px'}}>
                <IconButton onClick={handlePrev}>
                    <ArrowBackIcon style={{color: 'white'}} fontSize='large'/>
                </IconButton>
                <IconButton onClick={handleNext}>
                    <ArrowForwardIcon style={{color: 'white'}} fontSize='large'/>
                </IconButton>
            </div>
        </div>
    );
};

export default CryptoList;