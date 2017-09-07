((root, factory) => {
    if (typeof define === 'function' && define.amd) define(['./cito'], factory)
    else if (typeof module === 'object' && module.exports) module.exports = factory(root.cito)
    else root.gi = factory(root.cito)
})(this, (cito) => {
    const fval = (v) => { while(typeof v == "function") v = v(); return v }
    const parseChild = (el) => {
        if(Array.isArray(el)) return {children: el.map(parseChild), events: {}, attrs: {}}
        if(typeof el == "function") return parseChild(fval(el))
        return (typeof el == "object")? el: String(el)
    }
    const parseGi = ({is='', ...props}, childs=[]) => {
        const idPatt = /#([^\s#.]+)/gi,
              classPatt = /\.([^\s#.]+)/gi,
              tagPatt = /^([^\s#.]+?)([.#]|$)/gi;          
        is = fval(is)
        let id = (idPatt.exec(is) || [])[1] || "",
            tag = (tagPatt.exec(is) || [])[1] || "div",
            classes = [], attrs = {}, events = {};
        { let m; while(m = classPatt.exec(is)) classes.push(m[1].trim()) }      
        let result = { tag: tag, attrs: attrs, events: events, children: childs.map(parseChild) }
        Object.entries(props).forEach(([key, val]) => {
            if(key.slice(0, 2) == "on") events[key.slice(2)] = Array.isArray(val)? val: [val]
            else {
                let vval = fval(val)
                if(key == "$key") result[key] = vval
                else if(vval != undefined && key != "$changes") attrs[key] = vval
            }
        })
        if(classes.length > 0) attrs["class"] = classes.concat((attrs["class"] || "").split(' ')).join(' ').trim()
        if(id.length > 0) attrs.id = id
        return result
    }
    
    const styleToString = (s) => (typeof s == "string"? s: (s == undefined? "":
        Object.entries(s).map(([key, val]) => `${key}:${fval(val)};`)).join(""))
    const modifyGi = (el1, el2) => {
        const uniqueWords = /(\w+\b)(?!.*\1\b)/gi
        el1.children = el1.children.concat(el2.children)
        Object.entries(el2.events).forEach(([key, list]) => el1.events[key] = (el1.events[key] || []).concat(list))
        if(el2.attrs["class"])
            el1.attrs["class"] = ((el1.attrs["class"] || "") + " " + el2.attrs["class"]).match(uniqueWords).join(" ")
        el1.attrs.style = styleToString(el1.attrs.style || {}) + styleToString(el2.attrs.style || {})
        if(el2.attrs.id) el1.attrs.id = el2.attrs.id
        Object.entries(el2.attrs).forEach(([key, val]) => {
            if(key != "style" && key != "class" && key != "id") el1.attrs[key] = val})
        return el1
    }
    
    const gi = (elem, ...childs) => () => {
        let result
        if(typeof elem == "string") return parseGi({is: elem}, childs)
        else if(Array.isArray(elem)) return { children: elem.concat(childs).map(parseChild) }
        else if(typeof elem.is == "function") result = modifyGi(fval(elem.is), parseGi(elem, childs))
        else result = parseGi(elem, childs)
        if(elem.$changes) result = modifyGi(result, parseGi(elem.$changes))
        return result
    }
    
    const Val = (v) => ({ get: () => v, set: (vv) => v = vv })
    const Ref = (obj, prop) => ({
        get: () => obj[prop], 
        set: (vv) => obj[prop] = vv
    })
    
    const view = (container, content) => {
        let parsed = () => parseChild(content)
        let vdom,
            update = () => cito.vdom.update(vdom, parsed),
            init = () => { vdom = cito.vdom.append(container, parsed); return self }
            self = { update, container, content, init }
        gi.onUpdate(update)
        return self
    }
    let updateHandlers = []
    const update = () => updateHandlers.forEach((v) => v())
    const onUpdate = (h) => updateHandlers.push(h)
    return Object.assign(gi, { Val, Ref, view, update, onUpdate, updateHandlers })
})
