import tokensData from '../data/tokens.json';
import { Token } from '../types/Token';

export const loadTokens = (): Token[] => {
    const storedTokens = localStorage.getItem('tokens');

    if (!storedTokens) {
        const parsedTokens: Token[] = tokensData.map(t => ({
            id: t.id,
            name: t.name,
            price: t.price,
            icon: t.icon
        }));

        localStorage.setItem('tokens', JSON.stringify(parsedTokens));
        return parsedTokens;
    }

    return JSON.parse(storedTokens) as Token[];
};