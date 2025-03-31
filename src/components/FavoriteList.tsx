import { Button, Card, CardContent, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Token } from '../types/Token';
import { useState } from 'react';
import { setBalance, toggleFavorite } from '../redux/cryptoSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useSwipeable } from 'react-swipeable';

const FavoriteList = ({ tokens }: { tokens: Token[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [amount, setAmount] = useState('');
    const dispatch = useDispatch();
    const [unit, setUnit] = useState('');

    const balances = useSelector((state: RootState) => state.crypto.balances);
    
    const handleUnitChange = (event: SelectChangeEvent) => {
        setUnit(event.target.value as string);
    };
    
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? tokens.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === tokens.length - 1 ? 0 : prevIndex + 1));
    };

    const handleSubmit = (tokenId: string) => {
        const parsedAmount = parseFloat(amount);
        if (!isNaN(parsedAmount) && parsedAmount > 0) {
            dispatch(setBalance({ id: tokenId, balance: parsedAmount }));
            setAmount('');
        }
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
              height: '80%',
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
                                  <Typography fontSize={15} marginTop={1}>{`Value in USD: $${token.price * balances[token.id]}`}</Typography>

                                  <div style={{color: 'white'}}>
                                      <TextField
                                          label="Amount"
                                          variant="outlined"
                                          size="small"
                                          margin="normal"
                                          fullWidth
                                          value={amount}
                                          onChange={(e) => setAmount(e.target.value)}
                                          InputLabelProps={{
                                              style: { color: 'white' },
                                          }}
                                          InputProps={{
                                              style: { color: 'white', borderColor: 'white' },
                                          }}
                                          sx={{
                                              '& .MuiOutlinedInput-root': {
                                                  '& fieldset': {
                                                      borderColor: 'white',
                                                  },
                                                  '&:hover fieldset': {
                                                      borderColor: 'white',
                                                  },
                                                  '&.Mui-focused fieldset': {
                                                      borderColor: 'white',
                                                  },
                                              },
                                          }}
                                      />
                                      <FormControl
                                          fullWidth
                                          margin="normal"
                                          size="small"
                                          variant="outlined"
                                          sx={{
                                              '& .MuiOutlinedInput-root': {
                                                  '& fieldset': {
                                                      borderColor: 'white',
                                                  },
                                                  '&:hover fieldset': {
                                                      borderColor: 'white',
                                                  },
                                                  '&.Mui-focused fieldset': {
                                                      borderColor: 'white',
                                                  },
                                              },
                                              '& .MuiInputLabel-root': {
                                                  color: 'white',
                                              },
                                              '& .MuiSelect-icon': {
                                                  color: 'white',
                                              },
                                          }}
                                      >
                                          <InputLabel id="unit-label">Unit</InputLabel>
                                              <Select
                                                  labelId="unit-label"
                                                  value={unit}
                                                  label="Unit"
                                                  onChange={handleUnitChange}
                                                  sx={{
                                                      color: 'white',
                                                  }}
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
                                          InputLabelProps={{
                                              style: { color: 'white' },
                                          }}
                                          InputProps={{
                                              style: { color: 'white', borderColor: 'white' },
                                          }}
                                          sx={{
                                              '& .MuiOutlinedInput-root': {
                                                  '& fieldset': {
                                                      borderColor: 'white',
                                                  },
                                                  '&:hover fieldset': {
                                                      borderColor: 'white',
                                                  },
                                                  '&.Mui-focused fieldset': {
                                                      borderColor: 'white',
                                                  },
                                              },
                                          }}
                                      />

                                      <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: 'green',
                                                color: 'white',
                                                marginTop: '16px',
                                                '&:hover': {
                                                    backgroundColor: 'darkgreen',
                                                },
                                            }}
                                            onClick={() => handleSubmit(token.id)}
                                      >
                                            Submit
                                      </Button>
                                  </div>
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

export default FavoriteList;