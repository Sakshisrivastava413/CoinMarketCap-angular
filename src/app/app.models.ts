export interface Currency {
    circulating_supply: number,
    name: string,
    quote: {
        USD: {
            market_cap: number,
            price: number,
            volume_24h: number
        }
    }
    symbol: string,
    slug: string
}