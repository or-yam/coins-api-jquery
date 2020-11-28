class Renderer {
  //insert coin info into card from coin API data-Coin
  renderCoinCard(coinData: Coin) {
    let checked = coinData.isSaved ? 'checked' : null;
    $('.coins-container').append(`
    <div data-id="${coinData.id}" id="${
      coinData.id
    }" class="card m-4" style="width: 18rem;">
        <div class="card-body main-card">
            <h5 class="card-title">${coinData.symbol.toUpperCase()}</h5>
            <p class="card-text">${coinData.name}</p>
            <a   href="#<?php echo("a".$cntr); ? class="btn-moreInfo btn btn-primary"><?php echo($cntr); ?>More Info</a>
            <p  class="card-text more-info"></p>
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input " id="customSwitch${
                  coinData.id
                }" ${checked}>
                <label class="custom-control-label" for="customSwitch${
                  coinData.id
                }">Select Coin</label>
            </div>
        </div>
    </div>
    `);
  }

  //render coins into cards
  renderCoinsList(CoinsList: Coin[]) {
    $('.coins-container').empty();
    for (const coinData of CoinsList) {
      this.renderCoinCard(coinData);
    }
  }

  //loading while waiting for API to respond
  renderCoinsLoading() {
    $('.coins-container').empty();
    $('.coins-container').append(`
            <div class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        `);
  }
  //loading while waiting for API to respond
  renderCoinDataLoading(id: string) {
    const infoButton = $(`#${id}`).find('.btn-moreInfo');
    infoButton.empty();
    infoButton.append(`
        <span class="spinner-border spinner-border-sm"></span>
        Loading..
        `);
  }
  //loading while waiting for API to respond
  clearLoading(id: string) {
    const infoContainer = $(`#${id}`).find('.more-info');
    infoContainer.empty();
    const infoButton = $(`#${id}`).find('.btn-moreInfo');
    infoButton.empty();
    infoButton.append(`
        <a  href="#" class="btn-moreInfo btn btn-primary">More Info</a>
        `);
  }
  // render more info into collapse card
  renderMoreInfo(id: Coin['id'], coin: Coin['data']) {
    const infoContainer = $(`#${id}`).find('.more-info');
    infoContainer.empty().append(`
            <div>
                <center><img class="coin-img"src=${coin.image}  alt="icon"></center>  
            <table id="coin-table">
                <tr>
                    <th>Dollar</th>
                    <th>Shekel</th> 
                    <th>Euro</th>
                </tr>
                <tr>
                    <td> $ ${coin.marketData[0]} &nbsp</td>
                    <td> &#8362 ${coin.marketData[1]} &nbsp</td>
                    <td> &#8364 ${coin.marketData[2]} &nbsp</td>
                </tr>
            </table>
            </div>
        `);
  }
  //render popup-modal for selected coins and  call render selected coins and last coin
  renderSelectedCoinsList(selectedList: any) {
    $('.modal-content').empty();
    $('.coins-container').append(`
        <div id="myModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>You have to remove one coin from the list </h2>
                    <p class='modal-message'>The maximum amount of coins to compare is 5</p>
                        <div class="modal-buttons">
                    <button class="close">Cancel</button>
                        </div>
                </div>  
                    </div class="modal-coins">  </div>    
               
            </div>
        </div>
    `);
    selectedList.favorites.map((coin: Coin) => {
      selectedList.coin.id === coin.id
        ? this.renderLastAdded(coin)
        : this.renderSelectedCoinsCard(coin);
    });
  }
  // Render the last coin
  renderLastAdded(coin: Coin) {
    $('.modal-message').append(`<span> ${coin.name} was just selected </span>`);
  }

  // Render selected coins from main-coins-page into selected pop-up modal
  renderSelectedCoinsCard(selectedCoinData: Coin) {
    $('.modal-content').append(`
            <div class="modal-card" data-id="${selectedCoinData.id}">
                <div class="modal-card-body">
                    <h5 class="modal-card-title">${selectedCoinData.symbol.toUpperCase()}</h5>
                    <p class="modal-card-text">${selectedCoinData.name}</p>
                    <div class="modal-custom-control modal-custom-switch">
                        <input type="checkbox" class="modal-custom-control-input " id="customSwitch2${
                          selectedCoinData.id
                        }" checked>
                        <label class="modal-custom-control-label" for="customSwitch2${
                          selectedCoinData.id
                        }">Select Coin</label>
                    </div>
                </div>
            </div>
        `);
    this.displayTooMuchCoins();
  }
  //Display Selected coin modal
  displayTooMuchCoins() {
    $('#myModal').css('display', 'block');
  }
  //Render about page
  renderAboutPage() {
    $('.about-container').append(`
        <div class="selfi-container">
            <img src="../assets/images/selfi.jpg"  width="300" height="400" class="d-inline-block align-top" alt="">
        </div>
        <div class="siteDescription-container">
            <p>My name is Lev Berger I'm the developer of this single page crypto coin App </p>
            <p>This App is build using TypeScript, JavaScript, Jquery, Bootstrap, CSS and HTML </p>
        </div>
 `);
  }
} //End
