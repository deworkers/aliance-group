$(document).ready(function() {
    
    $('#order').validate({ 
        rules:{
            phone:{
                required: true,
            },
            name : {
                required: true,
            },
            inn:{
                required: true,
            },
            kpp: {
                required: true,
            },
            companyname: {
                required: true,
            },
            adres: {
                required: true,
            }
        },

        messages:{
            phone:{
                required: "Обязательное поле",
            },
            name:{
                required: "Обязательное поле",
            },
            inn:{
                required: "Обязательное поле",
            },
            kpp:{
                required: "Обязательное поле",
            },
            companyname:{
                required: "Обязательное поле",
            },
            adres:{
                required: "Обязательное поле",
            }
       }
    });


    $('#login-form').validate({ 
        rules:{
            email:{
                required: true,
            },
            pass:{
                required: true,
            }
       },

       messages:{
            email:{
                required: "Обязательное поле",
            },
            pass:{
                required: "Обязательное поле",
            }
       }
    });

    $('#message').validate({ 
        rules:{
            name:{
                required: true,
            },
            phone:{
                required: true,
            }
       },

       messages:{
            name:{
                required: "Обязательное поле",
            },
            phone:{
                required: "Обязательное поле",
            }
       }
    });
    

});