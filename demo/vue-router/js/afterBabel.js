'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
	function Point(x, y) {
		_classCallCheck(this, Point);

		this.x = x;
		this.y = y;
	}

	_createClass(Point, [{
		key: 'sayHello',
		value: function sayHello() {
			console.log('x:' + this.x + ',y:' + this.y);
		}
	}]);

	return Point;
}();

var ColorPoint = function (_Point) {
	_inherits(ColorPoint, _Point);

	function ColorPoint(x, y, color) {
		_classCallCheck(this, ColorPoint);

		var _this = _possibleConstructorReturn(this, (ColorPoint.__proto__ || Object.getPrototypeOf(ColorPoint)).call(this, x, y));

		_this.color = color;
		return _this;
	}

	_createClass(ColorPoint, [{
		key: 'sayHello',
		value: function sayHello() {
			console.log('x:' + this.x + ',y:' + this.y + ',Color:' + this.color);
		}
	}]);

	return ColorPoint;
}(Point);

var test = function test() {
	var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;

	console.log(a);
};
test();