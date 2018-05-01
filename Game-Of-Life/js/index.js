var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//****************************************************
//  Conway's Game of Life
//***************************************************

var t = 0;
var myVar = void 0;

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

    _this.handleClick = function (id) {
      var boardcopy = cloneArray(_this.state.boardArr);
      if (_this.state.boardArr[id].props.className === "black-cell") {
        boardcopy[id] = _this.createcell(id, "red-cell", id + 684684);
        _this.setState({
          boardArr: boardcopy
        });
      } else {
        boardcopy[id] = _this.createcell(id, "black-cell", id + 684468684468);
        _this.setState({
          boardArr: boardcopy
        });
      }
    };

    _this.createcell = function (i, c, z) {
      if (z === undefined) {
        z = i;
      }
      return React.createElement(Cell, {
        key: z,
        cellid: i,
        className: c,
        handleClick: _this.handleClick,
        coordX: _this.getX(i),
        coordY: _this.getY(i)
      });
    };

    _this.play = function () {
      if (t % 2 === 0) {
        myVar = setInterval(_this.playLogic, 10);
        document.getElementById("play").innerHTML = "Stop";
      } else {
        clearInterval(myVar);
        document.getElementById("play").innerHTML = "Play";
      }
      t++;
    };

    _this.playLogic = function () {
      var g = _this.state.boardArr;
      var g2 = cloneArray(_this.state.boardArr);
      var cols = 80;
      for (var z = 0; z < g2.length; z++) {
        var cellStatus = g[z].props.className;
        var amount = 0;
        var neighbors = [];
        neighbors = [g[z + 1] === undefined ? false : g[z + 1].props.className === "red-cell", //right
        g[z - 1] === undefined ? false : g[z - 1].props.className === "red-cell", //left
        g[z - cols] === undefined ? false : g[z - cols].props.className === "red-cell", //up
        g[z - (cols - 1)] === undefined ? false : g[z - (cols - 1)].props.className === "red-cell", //up-left
        g[z - (cols + 1)] === undefined ? false : g[z - (cols + 1)].props.className === "red-cell", //up-right
        g[z + cols] === undefined ? false : g[z + cols].props.className === "red-cell", //down
        g[z + cols - 1] === undefined ? false : g[z + cols - 1].props.className === "red-cell", //down-left
        g[z + cols + 1] === undefined ? false : g[z + cols + 1].props.className === "red-cell" //down-right
        ];

        for (var c in neighbors) {
          if (neighbors[c] === true) {
            amount++;
          }
        }

        //****************************************************
        // the rules of Conways Game of Life
        //***************************************************

        if (cellStatus === "red-cell") {
          if (amount < 2 || amount > 3) {
            g2[z] = _this.createcell(z, "black-cell", z + 68454884);
          }
        }

        if (cellStatus === "black-cell") {
          if (amount === 3) {
            g2[z] = _this.createcell(z, "red-cell", z + 32486343484);
          }
        }
      }

      _this.setState({
        boardArr: g2,
        generations: _this.state.generations + 1
      });
    };

    _this.state = {
      cellAmount: 2640,
      generations: 0
    };
    return _this;
  }

  _createClass(Board, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.reset();
    }
  }, {
    key: "getI",
    value: function getI(y, x) {
      return this.getY(y) * 8 * 10 + this.getX(x);
    }
  }, {
    key: "getX",
    value: function getX(i) {
      return i % 80;
    }
  }, {
    key: "getY",
    value: function getY(i) {
      return Math.floor(i / 80);
    }
  }, {
    key: "reset",
    value: function reset() {
      console.log("reset");
      var arr = [];
      for (var i = 0; i < this.state.cellAmount; i++) {
        arr.push(React.createElement(Cell, {
          key: i,
          cellid: i,
          className: "black-cell",
          handleClick: this.handleClick,
          coordX: this.getX(i),
          coordY: this.getY(i)
        }));
      }
      this.setState(function (prevState) {
        return {
          boardArr: arr,
          generations: 0
        };
      });
    }
  }, {
    key: "seed",
    value: function seed() {
      console.log("seed");
      var arr = [];
      for (var i = 0; i < this.state.cellAmount; i++) {
        if (Math.floor(Math.random() * 5) === 1) {
          arr.push(React.createElement(Cell, {
            key: i,
            cellid: i,
            className: "red-cell",
            handleClick: this.handleClick,
            coordX: this.getX(i),
            coordY: this.getY(i)
          }));
        } else arr.push(React.createElement(Cell, {
          key: i,
          cellid: i,
          className: "black-cell",
          handleClick: this.handleClick,
          coordX: this.getX(i),
          coordY: this.getY(i)
        }));
      }
      this.setState(function (prevState) {
        return { boardArr: arr };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          "John Conway's ",
          React.createElement(
            "strong",
            null,
            "Game of life"
          )
        ),
        React.createElement(
          "div",
          { className: "board" },
          this.state.boardArr
        ),
        React.createElement(
          "div",
          { className: "text-center" },
          React.createElement(
            "h2",
            null,
            "Generations : ",
            this.state.generations
          ),
          React.createElement(
            "button",
            { onClick: function onClick(e) {
                return _this2.reset(e);
              } },
            "Clear"
          ),
          React.createElement(
            "button",
            { onClick: function onClick(e) {
                return _this2.seed(e);
              } },
            "Seed"
          ),
          React.createElement(
            "button",
            { id: "play", onClick: function onClick(e) {
                return _this2.play(e);
              } },
            "play"
          )
        )
      );
    }
  }]);

  return Board;
}(React.Component);

var Cell = function (_React$Component2) {
  _inherits(Cell, _React$Component2);

  function Cell(props) {
    _classCallCheck(this, Cell);

    var _this3 = _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this, props));

    _this3.selectCell = function () {
      _this3.props.handleClick(_this3.props.cellid);
    };

    _this3.state = {
      id: _this3.props.cellid
    };
    return _this3;
  }

  _createClass(Cell, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        cellid: this.props.cellid,
        color: this.props.color,
        className: this.props.className,
        x: this.props.coordX,
        y: this.props.coordY,
        onClick: this.selectCell
      });
    }
  }]);

  return Cell;
}(React.Component);

function cloneArray(arr) {
  return arr.slice();

  //  return JSON.parse(JSON.stringify(arr))
}

ReactDOM.render(React.createElement(Board, null), document.getElementById("container"));