import Renderer from './Views/Renderer';
import ApiManager from './models/ApiManager';

const coinsManager = new ApiManager();
const viewManager = new Renderer();

const displayCoins = async () => {
  viewManager.renderCoinsLoading();
  let list: object[] = await coinsManager.getCoinsList();
  viewManager.renderCoinsList(list);
};
displayCoins();

const displayMoreData = async (id: string) => {
  let info: object = await coinsManager.getCoinInfo(id);
  viewManager.renderMoreInfo(id, info['data']);
};

$('.coins-container').on('click', '.btn', function () {
  let id = $(this).closest('.card').attr('id');

  displayMoreData(id);
});
