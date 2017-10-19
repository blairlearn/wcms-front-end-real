define(function(require) {
    var $ = require('jquery');
    require('UX/Common/Plugins/Widgets/jquery.ui.imagecarousel')
    //require('slick-carousel');
    //require('Modules/carousel/slick-patch');
    //var flexVideo = require('Modules/videoPlayer/flexVideo');
    //var AdobeAnalytics = require('Patches/AdobeAnalytics');

    

    function _initialize() {    

        //Iterate over each carousel on the page.
        $('.ic-carousel').each(function(i, el) {
            $(this).imagecarousel({
                //Attach on analytics handlers here
            });
        });



        //custom function showing current slide
//        var $status = $('.pagingInfo');
//        var $slickElement = $('.slider');

//        $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
//            var i = (currentSlide ? currentSlide : 0) + 1;
//            $status.text(i + '/' + slick.slideCount);
//        });

        // Script for carousel
        // $(function() {
        //     $('.slider').each(function(i, el) {
        //         var $slickEl = $(this).slick({
        //             lazyLoad: 'ondemand',
        //             arrows: true,
        //             slidesToShow: 1,
        //             previewMode: true,
        //             centerItems: true,
        //             slidesToScroll: 1,
        //             speed: 500,
        //             dots: false,
        //             //customPaging: function(slider,index){return index + ' of ' + slider.slideCount;},
        //             customPaging : function(slider, i) {
        //                 var thumb = $(slider.$slides[i]).data();
        //                 return '<a>'+i+'</a>'; },
        //             responsive: [
        //                 //alter breakpoint settings for image carousel
        //                 {
        //                     breakpoint: 1024,
        //                     settings: {
        //                         slidesToShow: 1,
        //                         speed: 1000,
        //                         slidesToScroll: 1
        //                     }
        //                 },
    
        //                 {
        //                     breakpoint: 768,
        //                     settings: {
        //                         slidesToShow: 1,
        //                         speed: 700,
        //                         slidesToScroll: 1
        //                     }
        //                 },
        //                 {
        //                     breakpoint: 576,
        //                     settings: {
        //                         slidesToShow: 1,
        //                         speed: 500,
        //                         slidesToScroll: 1
        //                     }
        //                 }
        //             ]
        //         });
                
                /*.on('beforeChange', function(event, slick, currentSlide, nextSlide){
                    console.log("Before change, ", currentSlide, nextSlide);
                }).on('afterChange', function(event, slick, currentSlide) {
                    console.log("After change, " + currentSlide);
                });*/
    
//                $('slider').on('swipe', function(event, slick, direction) {
//                    console.log($('slider').slick('slickCurrentSlide'));
//                });
    
//                $('.arrows-for-ic-carousel button').on('click', function() {
//                    console.log("Arrow click");
//                });
    

                
//            });
//        });

//        $('.slider').closest('section').click(function() {
//			$('.slider').slick('setPosition');
//        });

        /*// Set variable for analytics functions
        var pageName = 'www.cancer.gov/';
		var s = AdobeAnalytics.getSObject();
        if(typeof(s) !== 'undefined') {
            pageName = s.pageName;
        }

        var imgNum = $('.slider').find('.slick-active').data('slick-index');
        console.log("before click/swipe index: " + imgNum);

        // Record analytics on clicks of arrows in carousel
        $('.arrows-for-ic-carousel button').on('click', (function() {
            var $this = $(this);
            var title = $this.closest('#ic').find('.ic-carousel-title h4').text();
            var direction = $this.attr('class');
            imgNum = $('.slider').find('.slick-active').data('slick-index');
            console.log("after click/swipe index: " + imgNum);
            
            NCIAnalytics.ImageCarouselClickSwipe($this, title, "click", direction, imgNum, pageName);
            })
        );

        // Record analytics on left or right swipes on carousel
        $('.slider').on('swipe', function(event, slick, direction) {
            var $this = $(this);
            var title = $this.closest('#ic').find('.ic-carousel-title h4').text();
            imgNum = $('.slider').find('.slick-active').data('slick-index');
            console.log("after click/swipe index: " + imgNum);
            NCIAnalytics.ImageCarouselClickSwipe($this, title, "swipe", direction, imgNum, pageName);
        });*/
    }

    /**
     * Identifies if this enhancement has been initialized or not.
     * @type {Boolean}
     */
    var initialized = false;
    
    /**
     * Exposed functions available to this module.
     */
    return {
        init: function() {
            if (initialized) {
                return;
            }

            _initialize();
            initialized = true;
        }
    };
});