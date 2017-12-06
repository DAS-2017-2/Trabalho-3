/* Framework hot spot */

var Pointcut = require('./aspect')

/**
 * FraMat object for creating pointer to the framat
 *
 * @param  {Array}  dimensions polygon dimensions
 * @param  {String} type       polygon name
 * @constructor
 */
var FraMat = function (dimensions, type) {
  this.dimensions = dimensions
  this.type = type
}

/**
 * Calculate area. Default Square area
 *
 * @return {Number} Area value
 */
FraMat.prototype.calculateArea = function () {
  return this.dimensions[0] * this.dimensions[1]
}

/**
 * Apply AOP
 */
var area = []
let pFraMat = new Pointcut('calculateArea', console)
pFraMat.before(function () {
  console.log('Before calculating area with arguments' + pFraMat.arguments())
})
pFraMat.after(function () {
  console.log('After calculating area with arguments' + pFraMat.arguments())
})
pFraMat.around(function () {
  console.log('Calculating area with arguments' + pFraMat.arguments())
  let pos = pFraMat.arguments();
  if (area && area[pos]){
      return area[pos];
  } else {
      area[pos] = pFraMat.proceed();
      return area[pos];
  }
})

module.exports = FraMat
