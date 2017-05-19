$(document).ready(function() {
    
    /*
    сделать:
    1) аякс на каждый метод (добавление, уделение, изменение колисчества)
    2) все изменения DOM калбеками аяксов (обернуть в функции!)
    3) editItem - метод изменения данных в объекте
    */

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
                this.length = this.goods.length;
            }
        }
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

        
        // добавление в объект корзины
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

    $('.card-order').on('click', function() {

        RegEx=/\s/g;

        thisId = parseInt(
            $('.card-title').data('id')
        );
        thisTitle = $('.card-title').text();
        thisPrice = parseInt(
            $('.card-descr__price').text().replace(RegEx,"")
        );
        thisQuantity = parseInt($('.card-quantity__input').val());

        cart.addItem({
            id : thisId,
            title : thisTitle,
            price : thisPrice,
            quantity : thisQuantity
        });
        
        cartQuantity();

    });

});