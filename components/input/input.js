function input(label, value, props) {
    var inputDOM;
    if(!props) props = {};
    var isvalid = true;
    var c = value.get() || props.forceValidate;
    var valid = () => {if(props.validation) props.isvalid = props.validation(value.get())};
    valid();
    if(props.isvalid !== undefined && props.touched) isvalid = props.isvalid;
    var inputClass = () => "input"
     + (props.disabled? " disabled": "")
     + (props.animated? " animated": "")
     + (props.focused? " focused": "")
     + (props.touched? " touched": "")
     + (value.get()? " dirty": "")
     + (isvalid? "": " invalid");
    return () => gi({is: ".cols", class: inputClass, $changes: props.self},
        props.prefix? props.prefix: "",
        gi(".fill",
            gi({is: "div.label", onclick: () => inputDOM.focus()}, label),
            gi(".cols.textfield-container",
                gi({is: "input", $changes: props.input,
                    value: value.get() || "",
                    type: props.type || "text",
                    readonly: props.readonly || props.disabled || false,
                    on$created: function(e) {
                        inputDOM = e.target;
                        console.log(e);
                        if(props.focused) setTimeout(()=>e.target.focus(), 100);
                    },
                    onfocus: function(e) {
                        props.focused = true && !props.disabled;
                        gi.update();
                    },
                    onblur: function(e) {
                        props.focused = false;
                        props.touched = true;
                        gi.update();
                    },
                    oninput: function(e) {
                        value.set(e.target.value);
                        valid();
                        props.touched = true;
                        gi.update();
                    }
                }),
                props.postfix? props.postfix: ""
            ),
            gi("div.border"),
            gi("div.error-message", !isvalid? props.errorMessage || "": "")));
}
