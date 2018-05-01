var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var recent = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
var alltime = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
var fccUrl = "https://www.freecodecamp.org/";

var Main = function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this._getRecent = function () {
      _this.getData(recent);
    };

    _this._getAlltime = function () {
      _this.getData(alltime);
    };

    _this.state = {
      obj: [],
      isLoading: false,
      dataReady: false
    };
    return _this;
  }

  _createClass(Main, [{
    key: "getData",
    value: function getData(url) {
      var _this2 = this;

      this.setState({ isLoading: true });
      fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        return _this2.setState({ obj: data, isLoading: false, dataReady: true });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getData(recent);
    }
  }, {
    key: "_renderObject",
    value: function _renderObject() {
      if (this.state.obj !== undefined) {
        return Object.entries(this.state.obj).map(function (_ref, i) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          return React.createElement(
            "tr",
            { key: key },
            React.createElement(
              "th",
              { scope: "row" },
              React.createElement(
                "strong",
                null,
                i + 1
              )
            ),
            React.createElement(
              "td",
              null,
              React.createElement("img", { className: "pics", src: value.img })
            ),
            React.createElement(
              "td",
              null,
              React.createElement(
                "a",
                { href: fccUrl + value.username },
                value.username
              )
            ),
            React.createElement(
              "td",
              null,
              value.recent
            ),
            React.createElement(
              "td",
              null,
              value.alltime
            )
          );
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var arr = [];
      for (var prop in this.state.obj) {
        arr.push(this.state.obj[prop]);
      }

      if (this.state.isLoading || !this.state.dataReady) {
        return React.createElement(
          "p",
          null,
          "Loading ..."
        );
      } else return React.createElement(
        "div",
        { className: "container mainContainer" },
        React.createElement(
          "h1",
          null,
          "FCC Leaderboards"
        ),
        React.createElement(
          "table",
          { className: "table table-striped" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              { className: "firstCol" },
              React.createElement(
                "th",
                { scope: "col" },
                React.createElement(
                  "strong",
                  null,
                  "#"
                )
              ),
              React.createElement("th", { scope: "col" }),
              React.createElement(
                "th",
                { scope: "col" },
                React.createElement(
                  "strong",
                  null,
                  "Username"
                )
              ),
              React.createElement(
                "th",
                { scope: "col" },
                React.createElement(
                  "strong",
                  { className: "underlined" },
                  React.createElement(
                    "div",
                    { onClick: this._getRecent },
                    "Points Last 30 days"
                  )
                )
              ),
              React.createElement(
                "th",
                { scope: "col" },
                React.createElement(
                  "strong",
                  { className: "underlined" },
                  React.createElement(
                    "div",
                    { onClick: this._getAlltime },
                    "Points Alltime"
                  )
                )
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            this._renderObject()
          )
        )
      );
    }
  }]);

  return Main;
}(React.Component);

ReactDOM.render(React.createElement(Main, null), document.getElementById("container"));