$(document).ready(function(){

    
    var modelColor, 
        modelPrice,
        modelColorHolder,
        modelPriceHolder,
        modelPriceHolderUAH;
    
    modelColorHolder = $('#modelColor');
    modelPriceHolder = $('#modelPrice');
    modelPriceHolderUAH = $('#modelPriceUAH');
    
    modelPrice = 0;
    modelColor = '';
    
    //При запуску сайту
    calculatePrice();
    compileColor();
    
    // Після натискання радіо кнопок
    $('#autoForm input').on('change', function(){
        calculatePrice();
        compileColor();
        calculateUAH();
    });
    
    //Колір
    $('#colorsSelector .colorItem').on('click', function(){
    var imgPath = $(this).attr('data-img-path');
        $('.car_left img').attr('src', imgPath);     
        
    })

/* САЛОН, ЗМІНА КАРТИНКИ*/
    $('#interiorBlock .interiorItem').on('click', function(){
        var imgInterior = $(this).attr('data-img-interior');
        $('.interior_right img').attr('src', imgInterior);
    })
    
    
    function calculatePrice(){
        var modelPriceColor = $('input[name = color]:checked', '#autoForm').val();
        var modelPriceInterior = $('input[name = interior]:checked', '#autoForm').val();
        var modelPriceAutopilot = $('input[name = autopilot]:checked', '#autoForm').val();
        
        modelPriceColor = parseInt(modelPriceColor);
        modelPriceInterior = parseInt(modelPriceInterior);
        modelPriceAutopilot = parseInt(modelPriceAutopilot);
        
        modelPrice = modelPriceColor + modelPriceInterior + modelPriceAutopilot;
        
        //alert(modelPrice);
        
        modelPriceHolder.text('$ ' + modelPrice);
    };
    
    
    function compileColor(){
        modelColor = $('input[name = color]:checked + label', '#autoForm').text();
        modelColor = modelColor + ', ' + $('input[name = interior]:checked + label', '#autoForm').text();
        modelColor = modelColor + ', ' + $('input[name = autopilot]:checked + label', '#autoForm').text();
        
        //alert(modelColor);
        
        modelColorHolder.text(modelColor);
    }
    
    //Курс валют долари в гривні
    var currencyUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    var UsdUahRate = 0;
    $.ajax({
        url: currencyUrl,
        cache: false, //Не кешировать
        success: function(html){
            console.log(html[0].sale);
            UsdUahRate = html[0].sale;
            calculateUAH();
        }
    });
    
    function calculateUAH(){
        var modelPriceUAH = modelPrice * UsdUahRate;
        //alert(modelPriceUAH);
        
        modelPriceHolderUAH.text(Math.trunc(modelPriceUAH) + ' грн');
    }






    
    


});