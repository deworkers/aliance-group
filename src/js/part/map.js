ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [56.83171856787374,60.6625664999999],
            zoom: 16,
            controls: []
        }, {
        }),
     

        myPlacemark = new ymaps.Placemark([
            56.83171856787374,60.6625664999999
        ], {
            iconCaption: 'Комсомольская, 72а — 4 офис; 2 этаж'
        }, {
            preset: 'islands#blueCircleDotIconWithCaption',
            iconCaptionMaxWidth: '240'
        });

    myMap.geoObjects.add(myPlacemark);
});