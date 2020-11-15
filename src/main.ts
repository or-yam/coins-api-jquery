type Coin = {
  id: string;
  name: string;
  symbol: string;
  isSaved: boolean;
  data: {
    marketData: number[];
    image: string;
    dateIssued: {};
  };
};

const coinsManager = new ApiManager();
const viewManager = new Renderer();

const displayCoins = async () => {
  viewManager.renderCoinsLoading();
  let list: Coin[] = await coinsManager.getCoinsList();
  viewManager.renderCoinsList(list);
};
displayCoins();

const displayMoreData = async (id: string) => {
  let coin: Coin | undefined = await coinsManager.getCoinInfo(id);
  coin ? viewManager.renderMoreInfo(id, coin.data) : undefined;
};

$('.coins-container').on('click', '.btn', function () {
  let id = $(this).closest('.card').attr('id');
  id ? displayMoreData(id) : undefined;
});
