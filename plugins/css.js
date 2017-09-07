((root, factory) => {
    if (typeof define === 'function' && define.amd) define(['../gigi/gigi'], factory)
    else if (typeof module === 'object' && module.exports) module.exports = factory(root.gi)
    else factory(root.gi)
})(this, (gi) => {
    const prefixCss = (s, px) => {
              s = s.replace(/[{}\s]([^\{\}\@%]*)({[^{}]*})/g, (m1, m2, m3) => {
                  if(m2.indexOf(":this") != -1) return m1;
                  return m2.split(',').map((v) => px + " " + v.trim()).join(",") + m3
              })
              return s.replace(/:this\b/g, px)
          },
          computeCss = (props, s) =>  s = s.replace(/(\(\$([\w_-]+)\))(?!\1)/g, (a, b, key) => props[key]);
          randomId = () => {
              let text = "", a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
              for (var i = 0; i < 5; i++) text += a[Math.floor(Math.random() * a.length)];
              return "." + text
          };
          
    let rules = [],
        dom = gi.view(document.head, gi([ 
            gi("!", "gigi.js cssRules start"),
            () => gi(rules.map((rule) => gi("style", rule.compute))),
            gi("!", "gigi.js cssRules end")
        ])).init();

    const cssRule = (props, tmpl) => {
        let rule = {
            enabled: true, tmpl: tmpl, props: props,
            init: () => { rules.push(rule); gi.update(); return rule },
            compute: () => rule.enabled? computeCss(rule.props, rule.tmpl): "",
            bindTo: (el) => {
                let id = randomId()
                return Object.assign(
                    (...args) => gi({is: el(...args), "class": id}),
                    {cssRule: cssRule(props, prefixCss(tmpl, id))}
                )
            }
        }
        return rule
    }
    
    return (gi.css = cssRule)
})
