$(document).ready(function() {
    

    var scrollTo = function(pos) {
        var pos;
        $('html,body').animate({scrollTop:pos}, 1000);
        return false;
    }

    $('.j-scroll-to').click(function(event) {
        event.preventDefault(); 
        var div = $(this).attr('href');
        var toPos = $(div).offset().top;
        scrollTo(toPos);
    });

    /*Модальные окна*/
    var overlay = $('#overlay'); 
    var open_modal = $('.open_modal'); 
    var close = $('.modal__close'); 
    var modal = $('.modal'); 

    // для открытия модалки нужна ссылка вида <a href="#name"></a> и класс "open_modal"
    // будет открыта модалка с id="name"
    open_modal.click( function(event){
        modal.fadeOut(200);
        event.preventDefault(); 
        var div = $(this).attr('href'); 
        overlay.fadeIn(400);
        $(div).fadeIn(400);
        $('html, body').addClass('j-noScroll');
        baseBoxHeight = $('.mobile-menu__right').height();
    });

    close.click(function() {
        modal.fadeOut(200);
        overlay.fadeOut(200);
        $('html, body').removeClass('j-noScroll');
    });

    overlay.click(function(event) {
        if ( $( event.target ).attr('id') == 'overlay' ) {
            $(this).fadeOut(200);
            modal.fadeOut(200);
            $('html, body').removeClass('j-noScroll');
        }
    });

    /*селект*/
    $('.select').click(function(e) {
        if ( !$(this).hasClass('j-open') ) {
            e.stopPropagation();
            $(this).addClass('j-open');
            $('.select-list').hide();
            $('.select').not(this).removeClass('j-open');
            $(this).find('.select-list').slideDown(200);
        } else {
            $(this).find('.select-list').slideUp(200);
            $(this).removeClass('j-open');
        }
    });

    $('body').click(function() {
        $('.select-list').slideUp(200);
        $('.select').removeClass('j-open');
    });

    $('.select-list__one').click(function(e) {
        e.stopPropagation();
        var val = $(this).text();
        $('.select').removeClass('j-open');
        $(this).parents('.select').find('input').val(val);
        $(this).parents('.select').find('.select-list').slideUp(200);
    });

    /*календарь*/
    $( ".date input" ).datepicker( $.datepicker.regional[ "ru" ] );

    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: '&#x3c;Пред',
        nextText: 'След&#x3e;',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
        'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
        'Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Нед',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);

    
    $('.slider-inn').owlCarousel({
        loop:true,
        margin:20,
        nav:true,
        items:4,
        navText:['','']
    });

    $('.side-one > a').on('click', function(event) {

        event.stopPropagation();

        if ( $(this).parents('.side-one').hasClass('active') ) {
            $(this).parents('.side-one').removeClass('active');
            $(this).next().slideUp();
        } else {
            $('.side-one').removeClass('active').find('ul').slideUp();
            $(this).parents('.side-one').addClass('active');
            $(this).next().slideDown();
        }

    });

    var cart = {
        totalQuantity: function() {
            return cart.list.length;
        },
        totalPrice: function() {
            var q = this.totalQuantity(),p=0;
            while(q--){
                p+= cart.list[q].price*cart.list[q].quantity; 
            }
            return p;
        },
        addItem: function(values) {
            cart.list.push(values);
        },
        removeItem: function(id) {
            delete cart.list[id];
        },
        list : [
            
        ]
    }

    var cartQuantity = function() {
        var quantity = cart.totalQuantity();

        if ( quantity > 0 ) {
            $('.head-cart span').fadeIn().text(quantity);
        } else {
            $('.head-cart span').fadeOut()
        }
    }

    cartQuantity();



    var x = cart.totalPrice();
    

    // количество товара
    $('.catalog-one__minus').on('click', function() {
        n = $(this).next().val();
        if ( n > 1 ) {
            n--;
            $(this).next().val(n);
        }
    });

    $('.catalog-one__plus').on('click', function() {
        n = $(this).prev().val();
        n++;
        $(this).prev().val(n);
    });

     // отправка в корзину
    $('.catalog-one__buy').on('click', function() {
        //копия картинки в корзину
        block = $(this).parents('.catalog-one__row').find('.catalog-one-img');

        html = block.html();
        block.append(html); // клонируем картинку
        block.find('img').eq(1).addClass('clone');
        
        position = $(".head-cart").offset()
        
        $(this).parents('.catalog-one__row').find('.clone').offset(position);

        setTimeout(function() { // десторим через таймер
            $('.catalog-one-img .clone').remove();
        }, 500);

        
        // добавление в объеки корзины
        thisParent = $(this).parents('.catalog-one__row');
        RegEx=/\s/g;

        thisId = parseInt(thisParent.find('a').data('id'));
        thisTitle = thisParent.find('a').text();
        thisPrice = parseInt(
            thisParent.find('.catalog-one__price').text().replace(RegEx,"")
        );

        thisQuantity = parseInt(thisParent.find('.catalog-one__quantity').val());

        cart.addItem({
            id : thisId,
            title : thisTitle,
            price : thisPrice,
            quantity : thisQuantity
        });

        cartQuantity();

        console.log(cart.list);

    });

    $('.card-slider-main').owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        items:1,
        navText:['',''],
        URLhashListener:true,
    });

    $('.card-slider-nav').owlCarousel({
        loop:false,
        margin:20,
        nav:true,
        items:3,
        navText:['',''],
        URLhashListener:true,
    });

});