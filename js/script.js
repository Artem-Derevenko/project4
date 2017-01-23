$(document).ready(function() {

    // фиксирование header при скролинге
    $(window).scroll(function()
    {
        if ($(window).width() >= 753) {
            if ($(this).scrollTop() >= 600) 
            {
                $('.header-menu-wrap, .catalog-menu').slideUp(300);
                $('.logo-img').addClass("scroll-menu");
                $('.toogle').show().removeClass('click');
                $('.button-search').addClass('active');
            }

            if ($(this).scrollTop() < 600) 
            {
               $('.header-menu-wrap').slideDown(300);
               $('.logo-img').removeClass("scroll-menu");
               $('.toogle').hide();
               $('.button-search').removeClass('active');
            }
        }
    });

    // показ/скрытие поисковой строки
    $('.button-search').on('click', function() {
        $(".wrap-search").slideToggle(300);
        $(".button-search").toggleClass('hover');
        return false;
    });

    // показ/скрытие меню при скроле
    $('.toogle').on('click', function() {
        $(".header-menu-wrap").slideToggle(300);
        $(".catalog-menu").slideUp(300);
        $('.button-search').toggleClass('active');
        $(this).toggleClass('click');
        return false;
    });

    // показ/скрытие пунктов меню КАТАЛОГ
    $('#catalog-show').on('click', function() {
        $(".catalog-menu").slideToggle(300);

        if ( $('#catalog-show').hasClass('active') ) {
            $('#catalog-show').removeClass('active');
        }
        else { $('#catalog-show').addClass('active'); }
        
        return false;
    });

    // скрытие при клике вне его области
    $(document).on('click', function(event) {
        // пунктов меню КАТАЛОГ
        if( $(event.target).closest(".catalog-menu").length )
        return;
        $(".catalog-menu").slideUp(300);
        $('#catalog-show').removeClass('active');
        event.stopPropagation();
        
        // поисковой строки
        if( $(event.target).closest(".wrap-search").length ) 
        return;
        $(".wrap-search").slideUp(300);
        $(".button-search").removeClass('hover');
        event.stopPropagation();
 
    });


    // подключение табов
    $("ul.tabs").jTabs(
    {
        content: ".tabs-catalog-tabs",
        animate: true,
        speed: 300,
        effect: "fade"
    });

    //настройки слайдера
    $(".carousel-1, .carousel-2").owlCarousel({
        paginationSpeed : 1000,
        items: 1,
        autoPlay: 6500,
        singleItem: true,
        navigation: true,
        navigationText: false,
        //transitionStyle: "fade",
        slideSpeed: 1000,
        addClassActive: true
 
        // "singleItem:true" is a shortcut for: 
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false
 
    });
    $(".owl-product").owlCarousel({
        paginationSpeed : 1000,
        items: 4,
        autoPlay: 6500,
        navigation: true,
        navigationText: false,
        slideSpeed: 1000,
        itemsCustom:  [[300, 1], [505, 2], [755, 3], [1303, 4]],
        addClassActive: true
    });

    //скрипт показа галереи товара
    $('#thumblist li img').on('click', function() {
        
        var thisImg = $(this).attr('src');
        $('#img-product img').attr('src', thisImg);
        $('#thumblist li').removeClass('zoomThumbActive');
        $(this).parent().addClass('zoomThumbActive');

    });

    //показ фильтров при клике в каталоге
    $('.filter > li').on('click', function() {

        var elementId = $(this).data('selector');
        var element = $('#' + elementId + '');


        if ( !element.hasClass('visible') ) {
            $('.filter > li').removeClass('active');
            $(this).addClass('active');
            $('.subfilter').removeClass('visible');
            element.addClass('visible');

        }

        else {
            $('.filter > li').removeClass('active');
            $(this).removeClass('active');
            $('.subfilter').removeClass('visible');
            element.removeClass('visible');

        }

    });

    //скрыть фыльтры при клике вне области
      $(document).click(function(event) {
        if ($(event.target).closest(".subfilter, .filter").length) return;
        $('.subfilter').removeClass('visible');
        $('.filter > li').removeClass('active');
        event.stopPropagation();
      });

    //добавляем выбранные фильтры в набор фильтров
    $('.subfilter :checkbox').change(function() {

        var div = $('<div class="active-filter" data-id=""><img src="img/delete.png"></div>');
        var idClass = $(this).attr('id');
  
        if (this.checked) { 

            var textCheckbox = $(this).parent().children('span').text();
            div.append(textCheckbox);
            div.addClass(idClass);
            div.attr('data-id', idClass);
            $('.selected-filters').append(div);

            console.log(textCheckbox);

        } else {

            $('.' + idClass + '').remove();

        }
    });

    $('.selected-filters').on('click', 'img', function() {

        var parent = $(this).parent().data('id');
        $(this).parent().remove();
        $('.subfilter input#' + parent + '').removeAttr("checked");

    });

    //показ всплывающего перечня коллекций в направлениях
    $('.directions-item .show-collections').on('click', function(e) {
        e.preventDefault();
        $('.directions-overlap').fadeOut();
        $(".directions-collection").fadeOut();
        $('.directions-overlap-close').fadeOut();
        var left = $(this).parent().position().left;
        var marginLeft = left; console.log(top);

        if ( !left == 0 )  {
            var marginLeft = -left;
        }

        $(this).siblings(".directions-collection").css('margin-left', marginLeft);
        $(this).siblings(".directions-block").children('.directions-overlap').fadeIn(300);
        $(this).siblings(".directions-collection").fadeIn(300);
        $(this).siblings(".directions-block").children('.directions-overlap').children('.directions-overlap-close').fadeIn(300);


    });

    //скрытие всплывающего перечня коллекций в направлениях
    $('.directions-overlap-close').on('click', function() {
        $(this).parent().fadeOut(300);
        $(this).parent().parent().siblings(".directions-collection").fadeOut(300);

    });

    //переключение вкладок
    $("ul.tabs").jTabs({
        content: ".tabs_content", 
        animate: true
    }); 

    // показ формы заказа обратного звонка
    $('.button-call, .consultation').on('click', function() {
        $('.form-call').toggleClass('active');
    });

    // скрывать формы заказа обратного звонка
    $('.close-form').on('click', function() {
        $('.form-call').removeClass('active');
    });




});