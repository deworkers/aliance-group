$(document).ready(function() {
    
    $('#order').validate({ 
        rules:{
            email:{
                name: true,
            },
            phone:{
                required: true,
            },
            inn:{
                required: true,
            },
            kpp: {
                required: true,
            },
            company: {
                required: true,
            },
            adres: {
                required: true,
            }
       },

       messages:{
            email:{
                required: "Обязательное поле",
            },
            phone:{
                required: "Обязательное поле",
            },
            inn:{
                required: "Обязательное поле",
            },
            kpp:{
                required: "Обязательное поле",
            },
            company:{
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
                name: true,
            },
            pass:{
                name: true,
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

    

});