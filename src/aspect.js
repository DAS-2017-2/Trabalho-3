/* Framework frozen spot */

/**
 * Pointcut object for creating pointers to the pointcut
 * @param name the function name which has to be overwritten
 * @param context scope of the function
 * @constructor
 */
var Pointcut = function (name, context) {
    this.name = name
    this.context = context
    this.orig = context[name]
}

/**
 * Get the joinpoint for the Pointcut object
 * @returns {Function} joinpoint matching the Pointcut object
 */
Pointcut.prototype.joinpoint = function () {
    return this.context[this.name]
}

/**
 * Arguments being passed to the original function
 * @returns {Array} arguments being passed to original function
 */
Pointcut.prototype.arguments = function () {
    return Array.from(this.joinpoint().arguments)
}

/**
 * before advice for the Pointcut object
 * @param advice function to be executed before the main function
 */
Pointcut.prototype.before = function (advice) {
    /* allowProceed disabled for not allowing a call to proceed() */
    this.allowProceed = false
    let p = this.context[this.name]
    this.context[this.name] = function () {
        try {
            /* run the advice */
            advice()
        } catch (e) {
            console.log('Exception thrown from ' +
                'before advice: ' + e.message)
        }
        return p.apply(this, arguments)
    }
}

/**
 * after advice for the Pointcut object
 * @param advice function to be executed after the main function
 */
Pointcut.prototype.after = function (advice) {
    /* allowProceed disabled for not allowing a call to proceed() */
    this.allowProceed = false
    let p = this.context[this.name]
    this.context[this.name] = function () {
        let temp = p.apply(this, arguments)
        try {
            /* run the advice */
            advice(temp)
        } catch (e) {
            console.log('Exception thrown from ' +
                'after advice: ' + e.message)
            throw e
        }
        return temp
    }
}

/**
 * around advice for the Pointcut object
 * @param advice function to be executed in place of the main function
 */
Pointcut.prototype.around = function (advice) {
    /* allowProceed enabled for allowing proceed() to be called */
    this.allowProceed = true
    this.orig = this.context[this.name]
    /* replace the function with advice function */
    this.context[this.name] = advice
}

/**
 * Executes the main function
 * @returns {*}
 */
Pointcut.prototype.proceed = function () {
    if (this.allowProceed) {
        /* run the original function */
        return this.orig.apply(this, this.arguments())
    }
    throw {
        message: 'Proceed can only be called from around advice.'
    }
}

module.exports = Pointcut
