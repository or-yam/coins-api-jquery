type Coin = {
  id: string;
  name: string;
  symbol: string;
  isSaved: boolean;
  data: {
    name: string;
    marketData: number[];
    image: string;
    dateIssued: {};
  };
};

export = class ApiManager {
  data: { coins: Coin[] };
  constructor() {
    this.data = {
      coins: [],
    };
  }

  getCoinsList = async () => {
    const result = await $.ajax({
      method: 'GET',
      url: 'https://api.coingecko.com/api/v3/coins/list',
      dataType: 'json',
      error: (error) => error,
      success: (data: Coin[]) =>
        data.splice(100, data.length).map((coin) => (coin.isSaved = false)),
    });
    this.data.coins = result;
    return this.data.coins;
  };

  getCoinInfo = async (id: Coin['id']) => {
    const coinData = await $.ajax({
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/${id}`,
      dataType: 'json',
      error: (xhr, text, error) => text,
      success: (data) =>
        data.map(
          (coin: {
            name: string;
            market_data: {
              current_price: { usd: number; ils: number; eur: number };
            };
            image: string;
          }) => ({
            name: coin.name,
            marketData: [
              coin.market_data.current_price.usd,
              coin.market_data.current_price.ils,
              coin.market_data.current_price.eur,
            ],
            image: coin.image.small,
            dateIssued: new Date(),
          })
        ),
    });

    const coin: Coin = this.data.coins.find((coin: Coin) => coin.id === id);
    coin.data = coinData;

    return coin;
  };

  toggleSave(id: Coin['id']) {
    let coin = this.data.coins.find((coin: Coin) => coin.id === id);
    coin.isSaved = !coin.isSaved;
  }
};
