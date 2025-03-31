import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token } from '../types/Token';

interface CryptoState {
    tokens: Token[];
    favorites: string[];
    balances: Record<string, number>;
    prices: Record<string, number>;
}

const storedTokens: Token[] = JSON.parse(localStorage.getItem('tokens') || 'null');

const initialState: CryptoState = {
    tokens: storedTokens || [],
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    balances: JSON.parse(localStorage.getItem('balances') || '{}'),
    prices: JSON.parse(localStorage.getItem('prices') || '{}'),
};

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const index = state.favorites.indexOf(action.payload);
            if (index === -1) {
                state.favorites.push(action.payload);
            } else {
                state.favorites.splice(index, 1);
            }
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        setBalance: (state, action: PayloadAction<{ id: string; balance: number }>) => {
            state.balances[action.payload.id] = action.payload.balance;
            localStorage.setItem('balances', JSON.stringify(state.balances));
        },
        updatePrices: (state) => {
            Object.keys(state.prices).forEach(id => {
                state.prices[id] += 1;
            });
            localStorage.setItem('prices', JSON.stringify(state.prices));
        }
    }
});

export const { toggleFavorite, setBalance, updatePrices } = cryptoSlice.actions;
export default cryptoSlice.reducer;