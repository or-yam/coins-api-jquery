"use strict";
exports.__esModule = true;
var Renderer = /** @class */ (function () {
    function Renderer() {
    }
    Renderer.prototype.renderCoinCard = function (coinData) {
        $('.coins-container').append("\n    <div id=" + coinData.id + "  class=\"card m-4\" style=\"width: 18rem;\">\n        <div class=\"card-body\">\n            <h5 class=\"card-title\">" + coinData.id + "</h5>\n            <p class=\"card-text\">" + coinData.name + "</p>\n            <a  href=\"#\" class=\"btn btn-primary\">More Info</a>\n            <p  class=\"card-text more-info\"></p>\n            <div class=\"custom-control custom-switch\">\n                <input type=\"checkbox\" class=\"custom-control-input\" id=\"customSwitch1\">\n                <label class=\"custom-control-label\" for=\"customSwitch1\">Toggle</label>\n            </div>\n        </div>\n    </div>\n    ");
    };
    Renderer.prototype.renderCoinsList = function (list) {
        $('.coins-container').empty();
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var coinData = list_1[_i];
            this.renderCoinCard(coinData);
        }
    };
    Renderer.prototype.renderCoinsLoading = function () {
        $('.coins-container').empty();
        $('.coins-container').append("<div>Loading Coins Data...</div>");
    };
    Renderer.prototype.renderMoreInfo = function (id, info) {
        var infoContainer = $("#" + id).find('.more-info');
        infoContainer.empty().append("\n    <span>\n    " + info.name + "\n    </span>");
    };
    return Renderer;
}());
exports["default"] = Renderer;
