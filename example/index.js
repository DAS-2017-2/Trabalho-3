var framat = require('framat')

var Triangle = function (dimensions, type, height) {
  framat.call(this, dimensions, type)
  this.height = height
}

Triangle.prototype = new framat()
Triangle.prototype.constructor = Triangle
Triangle.prototype.calculateArea = function() {
  return this.dimensions[0] * this.height / 2
}

console.log(new Triangle([1, 3], 'triangle', 2).calculateArea())
