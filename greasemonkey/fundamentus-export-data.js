//Includes

/**
 * Looks for elements wich match the specified selector within the given parent. 
 * @param {string} selector dom selector to look for
 * @param {HTMLElement || string} [parent] an element, or a DOM selector
 */
const _S = (selector,parent) => Array.prototype.slice.apply(parent ?
    (typeof(parent) == 'string' ? _S(parent).map(x=>_S(selector,x)).flat() : parent.querySelectorAll(selector)) :
    document.querySelectorAll(selector));

/**
 * Iterates through object keys and return them
 * @param {any} object object to inspect
 * @param {(key:string,value:any) => any} mapper function to apply to each key/value pair
 * @returns {Array<any> | Array<string>} array containing keys or mapper applied keys collection
 */
const _P = (object, mapper) => {
    var ret = [];
    for (var key in object)
    {
        if (mapper)
            ret.push(mapper(key,object[key]));
        else
            ret.push(key);
    }
    return ret;
}

/**
 * Create DOM element
 * @param {string} tagName Element tag name
 * @param {any} attributes Dictionary of the element attributes
 * @param {Element[]} children Array of children elements
 */
const _B = (tagName,attributes,children) => {
    let e = document.createElement(tagName);
    if (attributes) {
        for (var key in attributes)
        {
            if (key == 'style') {
                for (var cssProp in attributes[key])
                    e.style[cssProp] = attributes[key][cssProp];
            }
            else if (key == '_class' || key == '@class' || key == 'classname')
            {
                var s = attributes[key];
                if (typeof(s) == 'string')
                    e.className = s;
                else if (typeof(s) == 'object' && s.constructor == Array)
                    e.className = s.join(' ');
                else if (typeof(s) == 'object')
                    e.className = _P(s,(key,value)=>[key,value]).filter(a=>a[1]).map(a=>a[0]).join(' ');
            }
            else if (key.indexOf('on') == 0 && typeof(attributes[key]) == 'function')
                e.addEventListener(key.substr(2), attributes[key]);
            else
                e[key] = attributes[key];
        }
    }
    if (children)
    {
        children.forEach(element => {
            e.appendChild(element);
        });
    }
    return e;
}

/**
 * Copy a given content to clipboard
 * @param {string} str content to be copied to clipboard
 */
const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

/**
 * Extract the prices of the current table
 */
let extractPrices = () => {
    var tableID = 'resultado';
    let ths  = _S(`table#${tableID} > thead > tr > th`);
    let trs = _S(`table#${tableID} > tbody > tr`);
    let ret = [ths.map(col => col.textContent)].concat(
        trs.map(row => _S('td', row).map(cell => cell.textContent.replace(/\./gi,'')))
    );
    return ret.map(row=>row.join('\t')).join('\n');
}

/**
 * Copy prices to clipboard
 */
let copyPricesToClipboard = ()=>{
    copyToClipboard(extractPrices());
}

/**
 * Add button to page
 */
let addButtonToPage = () => {
    var btn = _B('button', {innerHTML: 'Copiar para clipboard', onclick: (e)=>{
        copyPricesToClipboard();
        alert('Copiado!');
    }});
    _S('.topo')[0].appendChild(btn);
}

addButtonToPage();