var login_dialog = function(props) {
    var loginform_data = {};
    var regform_data = {};        
    var dialogStyle = {
        width: "100%",
        "max-width": "350px"
    };
    
    var main_dialog = gigi_dialog({
        content: gigi_form({
            fields: {"email": "Адрес электронной почты", "password": "Пароль"}, 
            data: loginform_data
        }).node,
        actions: [
            gigi_button({
                content: "Войти",
                events: {
                    click: function() {
                        document.write(JSON.stringify(loginform_data))
                    }
                },
                attrs: {
                    class: " gigi__action--continue"
                },
                shadowed: true
            }).node,
            gigi_button({
                content: "Зарегистрироваться",
                events: {
                    click: function() {
                        reg_dialog.open();
                    }
                },
                raised: true
            }).node
        ],
        attrs: {style: dialogStyle},
        debug: true,
        title: "Вход",
        backdrop: true
    });

    var reg_dialog = gigi_dialog({
        content: gigi_form({
            fields: {
                "name": "Имя", 
                "surname": "Фамилия", 
                "dob": "Дата рождения", 
                "email": "Адрес электронной почты", 
                "password": "Пароль"
            }, 
            data: regform_data
        }).node,
        actions: [
            gigi_button({
                content: "Зарегистрироваться",
                events: {
                    click: function() {
                        document.write(JSON.stringify(regform_data))
                    }
                },
                attrs: {
                    class: " gigi__action--continue"
                },
                shadowed: true
            }).node,
            gigi_button({
                content: "Отмена",
                events: {
                    click: function() {
                        reg_dialog.close();
                    }
                },
                attrs: {
                    class: " gigi__action--cancel"
                },
                shadowed: true
            }).node
        ],
        backdrop: true,
        attrs: {style: dialogStyle},
        title: "Регистрация"
    });
    console.log(main_dialog);
    var self = gigi_component({
        root: function(self) {
            return {
                self: self,
                children: [
                    main_dialog.node,
                    reg_dialog.node,
                ]
            };
        },
        methods: {
            open: main_dialog.open
        },
        props: props
    });
    
    return self;
}
