class ApiManager {
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
    let coinData = await $.ajax({
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/${id}`,
      dataType: 'json',
      error: (xhr, text, error) => ({ error: text }),
      success: (data) => data,
    });

    let coin: Coin | undefined = this.data.coins.find((coin) => coin.id === id);
    coin
      ? (coin.data = {
          marketData: [
            coinData.market_data.current_price.usd,
            coinData.market_data.current_price.ils,
            coinData.market_data.current_price.eur,
          ],
          image: coinData.image.small,
          dateIssued: new Date(),
        })
      : undefined;
    return coin;
  };

  toggleSave(id: Coin['id']) {
    let coin: Coin | undefined = this.data.coins.find((coin) => coin.id === id);
    coin ? (coin.isSaved = !coin.isSaved) : undefined;
  }
}
