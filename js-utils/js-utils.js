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
 * Creates a Random ID formatted as a GUID (12fa12fa-58fa-45af-45af-12af58af12fa)
 */
const fakeGuid = ()=>[2,1,1,1,3].map(c=>[...Array(c)].reduce(a => a+=(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1), '')).join('-');


/**
 * Parses args array as an object (--x 1 --y 'a b' --s1 --s2) => {x:1,y'a b',s1,s2}
 */
const getCmdArgs = ()=> ((scriptArgs,tr) => scriptArgs.reduce((a,c)=> (c[0] == '-' ? (a[0][tr(c)]=undefined,a[1]=tr(c)) : (a[0][a[1]] = (a[0][a[1]] ? [a[0][a[1]],c].flat() : c) ,a) , [{},''])))(process.argv.slice(2),s=>s.replace(/^\-+/gi,''));