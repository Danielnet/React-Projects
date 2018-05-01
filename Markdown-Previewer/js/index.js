var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createMarkup(x) {
  return { __html: x };
}

var Output = function (_React$Component) {
  _inherits(Output, _React$Component);

  function Output() {
    _classCallCheck(this, Output);

    return _possibleConstructorReturn(this, (Output.__proto__ || Object.getPrototypeOf(Output)).apply(this, arguments));
  }

  _createClass(Output, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "container outputWindow",
        dangerouslySetInnerHTML: createMarkup(marked(this.props.state.value))
      });
    }
  }]);

  return Output;
}(React.Component);

var Main = function (_React$Component2) {
  _inherits(Main, _React$Component2);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this2 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this2.state = {
      value: dummyText()
    };
    return _this2;
  }

  _createClass(Main, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: "inputWindow",
    value: function inputWindow() {
      return React.createElement("textarea", {
        rows: "20",
        className: "txt",
        value: this.state.value,
        onChange: this.handleChange.bind(this)
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-12" },
            React.createElement(
              "h1",
              null,
              React.createElement(
                "mark",
                null,
                "Markdown Previewer"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col-md-6" },
            this.inputWindow()
          ),
          React.createElement(
            "div",
            { className: "col-md-6" },
            React.createElement(Output, { state: this.state })
          )
        )
      );
    }
  }]);

  return Main;
}(React.Component);

function dummyText() {
  return "Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*";
}

ReactDOM.render(React.createElement(Main, null), document.getElementById("container"));