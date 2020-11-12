class ApiManager {
  constructor() {
    this.data =  {
      coins: [],
    };
  }

  getCoinsList = async () => {
    let result = await $.ajax({
      method: 'GET',
      url: 'https://api.coingecko.com/api/v3/coins/list',
      dataType: 'json',
      success: (data) =>
        data.splice(100, data.length).map((coin) => (coin.isSaved = false)),
      error: (error) => error,
    });

    this.data.coins = result;

    return this.data.coins;
  };

  getCoinInfo = async (id) => {
    let data = await $.ajax({
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/${id}`,
      dataType: 'json',
      success: (data) => data,
      error: (xhr, text, error) => text,
    });

    let coinData = {
      name: data.name,
      marketData: [
        data.market_data.current_price.usd,
        data.market_data.current_price.ils,
        data.market_data.current_price.eur,
      ],
      image: data.image.small,
      dateIssued: new Date(),
    };

    let coin = this.data.coins.find((coin) => coin.id === id);
    coin.data = coinData;

    return coin;
  };

  toggleSave(id) {
    let coin = this.data.coins.find((coin) => coin.id === id);
    coin.isSaved = !coin.isSaved;
  }
}
