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

// import Renderer from './Views/Renderer';
// import ApiManager from './models/ApiManager';

const coinsManager = new ApiManager();
const viewManager = new Renderer();

const displayCoins = async () => {
  viewManager.renderCoinsLoading();
  let list: Coin[] = await coinsManager.getCoinsList();
  viewManager.renderCoinsList(list);
};
displayCoins();

const displayMoreData = async (id: string) => {
  let info: Coin | undefined = await coinsManager.getCoinInfo(id);
  info ? viewManager.renderMoreInfo(id, info.data) : undefined;
};

$('.coins-container').on('click', '.btn', function () {
  let id = $(this).closest('.card').attr('id');
  id ? displayMoreData(id) : undefined;
});
