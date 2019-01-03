"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.running = false;
        _this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: []
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: "reset",
        value: function reset() {
            this.setState({
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        }
    }, {
        key: "format",
        value: function format(times) {
            return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            if (!this.running) {
                this.running = true;
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: "step",
        value: function step() {
            if (!this.running) return;
            this.calculate();
        }
    }, {
        key: "calculate",
        value: function calculate() {
            var times = Object.assign({}, this.state.times);

            times.miliseconds = this.state.times.miliseconds + 1;

            if (this.state.times.miliseconds >= 100) {
                times.seconds = this.state.times.seconds + 1;
                times.miliseconds = 0;
            }

            if (this.state.times.seconds >= 60) {
                times.minutes = this.state.times.minutes + 1;
                times.seconds = 0;
            }

            this.setState({ times: times });
        }
    }, {
        key: "stop",
        value: function stop() {
            this.running = false;
            clearInterval(this.watch);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "nav",
                    { className: "controls" },
                    React.createElement(
                        "button",
                        { onClick: this.start.bind(this) },
                        "Start"
                    ),
                    React.createElement(
                        "button",
                        { onClick: this.stop.bind(this) },
                        "Stop"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "stopwatch" },
                    this.format(this.state.times)
                ),
                React.createElement(
                    "ul",
                    { id: "results" },
                    this.state.results.map(function (result, index) {
                        return React.createElement(
                            "li",
                            { key: index },
                            result
                        );
                    })
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

var button = function button(props) {
    return React.createElement(
        "button",
        { onClick: props.onClick },
        " ",
        props.children,
        " "
    );
};

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

var appRoot = document.getElementById('app');
ReactDOM.render(React.createElement(Stopwatch, null), appRoot);
