$(document).ready(function() {
    
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
        /**
        values = {id: 1, name: 'name', price: 30.0}
        */
        addItem: function(values) {
            cart.list.add(values.id, values);
        },
        removeItem: function(id) {
            cart.list.remove(id);
        },
        editItem: function(id, values) {

        },
        list : {
            length: 0,
            goods: [],
            assoc: {},
            add: function (id, values) {
                if (id in this.assoc) {
                    this.goods[this.assoc[id]].quantity += values.quantity;
                    return;
                }
                var index = this.goods.push(values) - 1;
                this.assoc[id] = index;
                this.length = this.goods.length;
            },
            remove: function(id) {
                delete this.goods[this.assoc[id]];
                delete this.assoc[id];
                this.length -= 1;
            },
            edit: function(id, values) {

            }
        }
    }




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
        moveImage();
        
        // добавление в объект корзины
        thisParent = $(this).parents('.catalog-one__row');
        RegEx=/\s/g;

        thisId = parseInt(thisParent.find('a').data('id'));
        thisTitle = thisParent.find('a').text();
        thisPrice = parseInt(thisParent.find('.catalog-one__price').text().replace(RegEx,""));
        thisQuantity = parseInt(thisParent.find('.catalog-one__quantity').val());

        $.ajax({
            type: 'POST',
            url: '/ajax/addToCart.php',
            data: {
                'itemId': thisId,
                'quantity': thisQuantity
            }, // передача ID и количества
            success: function() {
                getItem();
                cartQuantity();
            }
        });

    });

    $('.card-order').on('click', function() {

        RegEx=/\s/g;

        thisId = parseInt($('.card-title').data('id'));
        thisTitle = $('.card-title').text();
        thisPrice = parseInt($('.card-descr__price').text().replace(RegEx,""));
        thisQuantity = parseInt($('.card-quantity__input').val());

        $.ajax({
            type: 'POST',
            url: '/ajax/addToCart.php',
            data: {
                'itemId': thisId,
                'quantity': thisQuantity
            }, // передача ID и количества
            success: function() {
                getItem();
                cartQuantity();
            }
        });

    });

    $('.cart-list__delete').on('click', function() {
        parent = $(this).parents('.catalog-one__row');

        thisId = parent.find('.cart-list__title').data('id');

        $.ajax({
            type: 'POST',
            url: '/ajax/deleteItem.php',
            data: {
                'itemId': thisId,
                'quantity': thisQuantity
            }, // передача ID и количества
            success: function() {
                cart.removeItem(thisId);
                parent.remove();
                recount();
                cartQuantity();
                console.log(cart.list);

                if ( $('.catalog-one__row').length == 0 ) {
                    $('.cart-list').hide();
                    $('.cart-empty').show();   
                } else {
                    $('.cart-list').show();
                    $('.cart-empty').hide();  
                }
            }
        });

    });



    var getItem = function() { // парсинг объекта для добаления
        cart.addItem({
            id : thisId,
            title : thisTitle,
            price : thisPrice,
            quantity : thisQuantity
        });
    }

    var moveImage = function() { // перемещение картинки визуальнае
        block = $(this).parents('.catalog-one__row').find('.catalog-one-img');

        html = block.html();
        block.append(html); // клонируем картинку
        block.find('img').eq(1).addClass('clone');
        
        position = $(".head-cart").offset()
        
        $(this).parents('.catalog-one__row').find('.clone').offset(position);

        setTimeout(function() { // десторим через таймер
            $('.catalog-one-img .clone').remove();
        }, 500);
    }

    var cartQuantity = function() { // отрисовка состояния корзины
        var quantity = cart.totalQuantity();

        if ( quantity > 0 ) {
            $('.head-cart span').fadeIn().text(quantity);
        } else {
            $('.head-cart span').fadeOut()
        }
    }

    var getCartList = function() { // парсим корзину
        if ( $('div').hasClass('cart-list') ) {
            RegEx=/\s/g;

            $('.catalog-one__row').each(function() {
                thisId = parseInt($(this).find('.cart-list__title').data('id'));
                thisTitle = $(this).find('.cart-list__title').text();
                thisPrice = parseInt($(this).find('.catalog-one__price').text().replace(RegEx,""));
                thisQuantity = parseInt($(this).find('.card-quantity__input').val())

                getItem();
                
            });
        }
    }

    var recount = function() {
        var summ = 0;
        RegEx=/\s/g;
        $('.catalog-one__row').each(function() {
            thisPrice = parseInt($(this).find('.catalog-one__price').text().replace(RegEx,""));
            thisQuantity = parseInt($(this).find('.catalog-one__quantity').val());

            thisSumm = thisPrice * thisQuantity;
            $(this).find('.catalog-one__summ b').text(thisSumm.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
            summ += thisSumm;

        });

        $('.total-summ').text(summ.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+' руб.');
    }

    getCartList();
    cartQuantity();
    recount();

    $('.catalog-one__minus, .catalog-one__plus, .catalog-one__quantity').on('click', function() {
        recount();
    });

    $('.catalog-one__quantity').on('keyup', function() {
        recount();
    });

    

});