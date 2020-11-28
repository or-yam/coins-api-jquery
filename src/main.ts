//TS types
interface Coin {
  id: string;
  name: string;
  symbol: string;
  isSaved: boolean;
  data: {
    marketData: number[];
    image: string;
    dateIssued: Date;
  };
}

interface GraphCoin {
  x: Date;
  y: number;
}

interface GraphCoins {
  [key: string]: [GraphCoin];
}

interface ChartData {
  type: 'line';
  showInLegend: true;
  name: string;
  markerType: 'square';
  dataPoints: GraphCoin[];
}

//global variables
const apiManager = new ApiManager();
const renderManager = new Renderer();
let chart: any = {};
let interval: any;

//search box function
const onSearchSubmit = () => {
  let text = $('#search').val()?.toString().toLocaleLowerCase();
  const filteredCoins = apiManager.data.coins.filter(
    (coin) => coin.symbol === text
  );

  text === ''
    ? alert('Enter Coin Symbol')
    : filteredCoins.length === 0
    ? alert('Did not find Coin Symbol')
    : null;

  filteredCoins.length && renderManager.renderCoinsList(filteredCoins);
};

// call display coins from API to Render
const displayCoins = async () => {
  renderManager.renderCoinsLoading();
  let list: Coin[] = await apiManager.getCoinsList();
  renderManager.renderCoinsList(list);
};

//display coin-info by ID from button
const displayMoreData = async (id: string) => {
  renderManager.renderCoinDataLoading(id);
  let coin: Coin | undefined = await apiManager.getCoinInfo(id);
  coin ? renderManager.renderMoreInfo(id, coin.data) : undefined;
};

//call function to load modal for more than 5 coins selected by ID
const handelSelectedCoins = (id: any, value: any) => {
  let selectedCoins = apiManager.toggleSave(id, value);
  if (selectedCoins.favorites.length === 6) {
    renderManager.renderSelectedCoinsList(selectedCoins);
    selectedCoins.coin.isSaved = false;
  }
};

//handel the state of More Info (display and set time after first click API call)
const handleMoreInfoData = async (id: string) => {
  let coin: Coin | undefined = apiManager.data.coins.find((c) => c.id === id);
  if (coin?.data) {
    let issuedDate = coin.data.dateIssued.getTime();
    let currentDate = new Date().getTime();
    let delay = currentDate - issuedDate;
    if (delay > 12000) {
      let coin = await apiManager.getCoinInfo(id);
      return coin.data;
    } else {
      return coin.data;
    }
  } else {
    coin = await apiManager.getCoinInfo(id);
    return coin.data;
  }
};

const onCloseModal = () => {
  $('#myModal').css('display', 'none');
  let coinsData = apiManager.data.coins;
  renderManager.renderCoinsList(coinsData);
};

const showCoinsScreen = () => {
  $('.coins-container').empty();
  $('.about-container').empty();
  $('#reports-container').empty();
  let coinsData = apiManager.data.coins;
  renderManager.renderCoinsList(coinsData);
  clearInterval(interval);
};

const showAboutScreen = () => {
  $('.coins-container').empty();
  $('.about-container').empty();
  $('#reports-container').empty();
  renderManager.renderAboutPage();
  clearInterval(interval);
};

const updateChart = async () => {
  await apiManager.getDataToCanvas();
  chart.render();
};

const showRealTimeScreen = async () => {
  $('.coins-container').empty();
  $('.about-container').empty();
  $('#reports-container').empty();
  console.log('before clear :', apiManager.data.chartOptions);
  apiManager.data.chartOptions.data = [];
  console.log('after clear :', apiManager.data.chartOptions);
  await apiManager.getDataToCanvas();
  chart = new CanvasJS.Chart('reports-container', apiManager.data.chartOptions);
  chart.render();
  interval = setInterval(updateChart, 2000);
};

// on click "Main selected coin toggle" and send data-id from btn(actually from main div coin-card) and value from toggle to handelSelectedCoins
$('.coins-container').on(
  'click',
  '.custom-control-input',
  function (event): void {
    let id: string = $(this).closest('.card').attr('data-id')!;
    let value: boolean = event.currentTarget.checked;
    handelSelectedCoins(id, value);
  }
);

//on click "More info" send id from btn(actually from main div coin-card) to displayMoreData(id) & saveToLocalStorage(id)
$('.coins-container').on('click', '.btn', async function () {
  let id = $(this).closest('.card').attr('data-id')!;
  if ($(this).next('.more-info').css('display') === 'none') {
    renderManager.renderCoinDataLoading(id);
    let coinData: Coin['data'] = await handleMoreInfoData(id!);
    renderManager.clearLoading(id);
    id && renderManager.renderMoreInfo(id, coinData);
    $(this).next('.more-info').css('display', 'block');
  } else {
    $(this).next('.more-info').css('display', 'none');
  }
});

// on click "Modal selected coin toggle" and change Coin.isSaved value in main coin array by id
$('.coins-container').on(
  'click',
  '.modal-custom-control-input',
  function (event): void {
    let id: string = $(this).closest('.modal-card').attr('data-id')!;
    let value: boolean = event.target.checked ? true : false;
    let coin: Coin = apiManager.data.coins.find(
      (coin: Coin) => coin.id === id
    )!;
    coin.isSaved = value;
  }
);

$('.navbar').on('click', '.search-btn', onSearchSubmit);
$('.coins-container').on('click', '.close', onCloseModal);
$('#coins-tab').on('click', showCoinsScreen);
$('#about-tab').on('click', showAboutScreen);
$('#realTime-tab').on('click', showRealTimeScreen);

displayCoins();
