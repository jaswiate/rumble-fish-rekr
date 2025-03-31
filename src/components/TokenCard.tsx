import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../redux/cryptoSlice';
import { IconButton, Card, CardContent, Typography, TextField, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Token } from '../types/Token';
import { useState } from 'react';

const TokenCard = ({ token, isFavorite }: { token: Token; isFavorite: boolean }) => {
    const dispatch = useDispatch();
    const [unit, setUnit] = useState('');

    const handleUnitChange = (event: SelectChangeEvent) => {
        setUnit(event.target.value as string);
    };

    return (
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
                
                {isFavorite && (
                    <div>
                        <TextField
                            label="Amount"
                            variant="outlined"
                            size="small"
                            margin="normal"
                            fullWidth
                        />
                        <FormControl fullWidth margin="normal" size="small" variant="outlined">
                            <InputLabel id="unit-label">Unit</InputLabel>
                            <Select
                                labelId='unit-label'
                                value={unit}
                                label="Unit"
                                onChange={handleUnitChange}
                            >
                                <MenuItem value={token.id}>{token.id}</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label="Comment"
                            variant="outlined"
                            size="small"
                            margin="normal"
                            fullWidth
                        />
                    </div>
                )}
            </CardContent>

            <IconButton
                onClick={() => dispatch(toggleFavorite(token.id))}
                sx={{
                    position: 'absolute',
                    bottom: 13,
                    right: 16,
                }}
            >
                <FavoriteIcon fontSize="large" sx={{color: "red"}}/>
            </IconButton>
        </Card>
    );
};

export default TokenCard;