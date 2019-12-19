import "./calculator.css";
var Calculator = (function () {
    function Calculator(rootElement) {
        this.rootElement = rootElement;
        this.KEYS = [
            ["AC", "÷"],
            [7, 8, 9, "×"],
            [4, 5, 6, "-"],
            [1, 2, 3, "+"],
            [0, ".", "="],
        ];
        this.NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
        this.OPERATORS = ["÷", "×", "+", "-"];
        this.EXECUTE_FLAG = "=";
        this.CLEAR_FLAG = "AC";
        this.x = "";
        this.y = "";
        this.operator = "";
        this.result = "";
    }
    Calculator.prototype.create = function () {
        this.createCalculatorContainer();
        this.createDecorator();
        this.createResultDisplayContainer();
        this.createResultDisplayElement();
        this.createButtons();
        this.addEventListener();
    };
    Calculator.prototype.createCalculatorContainer = function () {
        this.calculator = this.createElement("div");
        this.addClass(this.calculator, "calculator");
        this.rootElement.prepend(this.calculator);
    };
    Calculator.prototype.createDecorator = function () {
        var dot = this.createElement("div");
        var container = this.createElement("div");
        this.addClass(dot, "dot");
        this.addClass(container, "decorator");
        container.appendChild(dot);
        this.calculator.appendChild(container);
    };
    Calculator.prototype.createResultDisplayContainer = function () {
        this.displayContainer = this.createElement("div");
        this.addClass(this.displayContainer, "display");
        this.calculator.appendChild(this.displayContainer);
    };
    Calculator.prototype.createResultDisplayElement = function () {
        this.resultElement = this.createElement("div");
        this.addClass(this.resultElement, "result");
        this.resultElement.textContent = "0";
        this.displayContainer.appendChild(this.resultElement);
    };
    Calculator.prototype.createButtons = function () {
        var _this = this;
        this.KEYS.forEach(function (rowKeys) {
            var row = _this.createElement("div");
            _this.addClass(row, "row");
            _this.calculator.appendChild(row);
            rowKeys.forEach(function (key) {
                var button = _this.createElement("div");
                _this.addClass(button, "button");
                button.textContent = "" + key;
                row.appendChild(button);
            });
        });
    };
    Calculator.prototype.addEventListener = function () {
        var _this = this;
        this.calculator.addEventListener("click", function (event) {
            var target = event.target;
            var className = target.className;
            if (className === "button") {
                var key = target.textContent;
                if (_this.NUMBERS.indexOf(key) > -1) {
                    if (!_this.operator) {
                        _this.x += key;
                        _this.updateResult(_this.x);
                    }
                    else {
                        _this.y += key;
                        _this.updateResult(_this.y);
                    }
                }
                else if (_this.OPERATORS.indexOf(key) > -1) {
                    if (_this.x === "" && _this.y === "") {
                        _this.x = "0";
                        _this.operator = key;
                    }
                    else if (_this.x !== "" && _this.y === "") {
                        _this.operator = key;
                    }
                    else if (_this.x !== "" && _this.y !== "") {
                        _this.result = _this.excuteAlgorithm();
                        _this.updateResult(_this.result);
                        _this.x = _this.result;
                        _this.y = "";
                        _this.operator = key;
                    }
                }
                else if (_this.EXECUTE_FLAG === key) {
                    if (_this.x !== "" && _this.y === "") {
                        _this.result = _this.x;
                        _this.updateResult(_this.result);
                    }
                    else if (_this.x === "" && _this.y === "") {
                        _this.result = "0";
                        _this.updateResult(_this.result);
                    }
                    else if (_this.x !== "" && _this.y !== "") {
                        _this.result = _this.excuteAlgorithm();
                        _this.updateResult(_this.result);
                        _this.x = _this.result;
                        _this.y = "";
                        _this.operator = "";
                    }
                }
                else if (_this.CLEAR_FLAG === key) {
                    _this.x = "";
                    _this.y = "";
                    _this.operator = "";
                    _this.result = "";
                    _this.updateResult("0");
                }
            }
        });
    };
    Calculator.prototype.updateResult = function (result) {
        this.resultElement.textContent = result;
    };
    Calculator.prototype.excuteAlgorithm = function () {
        switch (this.operator) {
            case "+":
                return "" + (Number(this.x) + Number(this.y));
            case "-":
                return "" + (Number(this.x) - Number(this.y));
            case "×":
                return "" + Number(this.x) * Number(this.y);
            case "÷":
                return "" + Number(this.x) / Number(this.y);
        }
    };
    Calculator.prototype.createElement = function (tag) {
        return document.createElement(tag);
    };
    Calculator.prototype.addClass = function (target, className) {
        target.classList.add(className);
    };
    return Calculator;
}());
var root = document.getElementById("root");
var calculator = new Calculator(root);
calculator.create();
