/**
 * Looks for elements wich match the specified selector within the given parent. 
 * @param {string} selector dom selector to look for
 * @param {HTMLElement || string} [parent] an element, or a dom selector
 */
const _S = (selector,parent) => Array.prototype.slice.apply(parent ?
    (typeof(parent) == 'string' ? _S(parent).map(x=>_S(selector,x)).flat() : parent.querySelectorAll(selector)) :
    document.querySelectorAll(selector));