export default class ApiManager {
  data: { [key: string]: object[] };
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
      success: (data: object[]) =>
        data.splice(100, data.length).map((coin) => (coin['isSaved'] = false)),
      error: (error) => error,
    });
    this.data.coins = result;
    return this.data.coins;
  };

  getCoinInfo = async (id) => {
    const data = await $.ajax({
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

    let coin: object = this.data.coins.find((coin) => coin['id'] === id);
    coin['data'] = coinData;

    return coin;
  };

  toggleSave(id: string) {
    let coin = this.data.coins.find((coin) => coin['id'] === id);
    coin['isSaved'] = !coin['isSaved'];
  }
}
