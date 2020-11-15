class Renderer {
  renderCoinCard(coinData: Coin) {
    $('.coins-container').append(`
    <div id=${coinData.id}  class="card m-4" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${coinData.id}</h5>
            <p class="card-text">${coinData.name}</p>
            <a  href="#" class="btn btn-primary">More Info</a>
            <p  class="card-text more-info"></p>
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="customSwitch1">
                <label class="custom-control-label" for="customSwitch1">Toggle</label>
            </div>
        </div>
    </div>
    `);
  }

  renderCoinsList(list: Coin[]) {
    $('.coins-container').empty();
    for (const coinData of list) {
      this.renderCoinCard(coinData);
    }
  }

  renderCoinsLoading() {
    $('.coins-container').empty();
    $('.coins-container').append(`<div>Loading Coins Data...</div>`);
  }

  renderMoreInfo(id: Coin['id'], info: Coin['data']) {
    const infoContainer = $(`#${id}`).find('.more-info');
    infoContainer.empty().append(`
    <span>
    ${info.name}
    </span>`);
  } //make a real template
}