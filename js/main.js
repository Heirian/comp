"use strict";

function pieChart() {
	//circle progress bar
	if ((jQuery().easyPieChart) && (jQuery.support.leadingWhitespace)) {
		var count = 0 ;
		var colors = ['#f36639'];
		jQuery('.chart').each(function(){

			var imagePos = jQuery(this).offset().top;
			var topOfWindow = jQuery(window).scrollTop();
			if (imagePos < topOfWindow+900) {

				jQuery(this).easyPieChart({
			        barColor: colors[count],
					trackColor: '#e4e4e4',
					scaleColor: false,
					scaleLength: false,
					lineCap: 'butt',
					lineWidth: 3,
					size: 160,
					rotate: 0,
					animate: 3000,
					onStep: function(from, to, percent) {
							jQuery(this.el).find('.percent').text(Math.round(percent));
						}
			    });
			}
			count++;
			if (count >= colors.length) { count = 0};
		});
	}
}


jQuery(document).ready(function() {
	///////////
	//Plugins//
	///////////
		//highlight
		var number_of_pages = 7;
		for (var highlight_position = 0; highlight_position < number_of_pages; highlight_position++){
			if ($('#highlight_page_id').text() == highlight_position){
				$('#highlight_index'+highlight_position).addClass('active');
			}
		};

    //contact form processing
    jQuery('form.contact-form').on('submit', function( e ){

        var $form = jQuery(this);
        jQuery($form).find('span.contact-form-respond').remove();
        //checking on empty values
        var formFields = $form.serializeArray();
        for (var i = formFields.length - 1; i >= 0; i--) {
        	if (!formFields[i].value.length) {
        		$form.find('[name="' + formFields[i].name + '"]').addClass('invalid').on('focus', function(){jQuery(this).removeClass('invalid')});
        	};
        };
        //if one of form fields is empty - exit
        if ($form.find('[name]').hasClass('invalid')) {
        	return;
        };

    });

		//get url Parameter to show e-mail was sending
		function getParameterByName(name, url) {
		    if (!url) url = window.location.href;
		    name = name.replace(/[\[\]]/g, "\\$&");
		    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		        results = regex.exec(url);
		    if (!results) return null;
		    if (!results[2]) return '';
		    return decodeURIComponent(results[2].replace(/\+/g, " "));
		}

		var emailSucess = getParameterByName('emailSucess');

		if (emailSucess == 'true'){
				$('#email-condition').removeClass('hidden');
				$('#mainslider').addClass('change_distance_mainslider')
		}

		//refineURI
		var myNewURI = refineURI();

		window.history.pushState("object or string", "Title", "/" + myNewURI );

   	function refineURI() {
    //get full URI
    	var currURI= window.location.href; //get current address
    // ****** get the URI between what's after '/' and befor '?'
    //1- get URI after'/'
    	var afterDomain= currURI.substring(currURI.lastIndexOf('/') + 1);
    //2- get the part before '?'
    	var beforeQueryString= afterDomain.split("?")[0];

    	return beforeQueryString;
		}


    //mailchimp subscribe form processing
    jQuery('#signup').on('submit', function( e ) {
        e.preventDefault();
        // update user interface
        jQuery('#response').html('Adding email address...');
        // Prepare query string and send AJAX request
        jQuery.ajax({
            url: 'mailchimp/store-address.php',
            data: 'ajax=true&email=' + escape(jQuery('#mailchimp_email').val()),
            success: function(msg) {
                jQuery('#response').html(msg);
            }
        });
    });

	//twitter
	//slide tweets
	jQuery('#tweets .twitter').bind('loaded', function(){
		jQuery(this).addClass('flexslider').find('ul').addClass('slides');
	});
	if (jQuery().tweet) {
		jQuery('.twitter').tweet({
			modpath: "./twitter/",
		    count: 2,
		    avatar_size: 48,
		    loading_text: 'loading twitter feed...',
		    join_text: 'auto',
		    username: 'ThemeForest',
		    template: "{avatar}<div class=\"tweet_right\">{time}{join}<span class=\"tweet_text\">{tweet_text}</span></div>"
		});
	}


	//mainmenu

	if (jQuery().superfish) {
		jQuery('ul.sf-menu').superfish({
			delay:       300,
			animation:   {opacity:'show'},
			animationOut: {opacity: 'hide'},
			speed:       'fast',
			disableHI:   false,
			cssArrows:   true,
			autoArrows:  true
		});
	}
	jQuery('#toggle_mobile_menu, #mainmenu a').on('click', function(){
		jQuery('#header').toggleClass('mobile-active');
	});

	//parallax
	if (jQuery().parallax) {
		jQuery('#testimonials').parallax("50% 50%", 0.001);
		jQuery('#skills').parallax("50%", 0.01);
		jQuery('#mail_us').parallax("50%", 0.01);
	}

    //prettyPhoto
    if (jQuery().prettyPhoto) {
	   	jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({
	   		hook: 'data-gal',
			theme: 'light_rounded' /* light_rounded / dark_rounded / light_square / dark_square / facebook / pp_default*/
	  	});
	}

   	//tooltip
   	if (jQuery().tooltip) {
		jQuery('[data-toggle="tooltip"]').tooltip();
	}

   	//carousel
   	if (jQuery().carousel) {
		jQuery('.carousel').carousel();
	}

	//owl carousel
	if (jQuery().owlCarousel) {
		jQuery("#testimonials-carousel").owlCarousel({
	    	navigation : true,
	    	pagination : false,
	    	items: 1,
	    	autoPlay:3000,
	    	addClassActive:true,
	    	itemsDesktop: [1199,1],
	    	itemsDesktopSmall: [991,1],
	    	itemsTablet: [768,1],
	    	itemsMobile: [479,1]

	    });
	    jQuery("#partners-carousel").owlCarousel({
	    	navigation : false,
	    	// navigationText : true,
	    	pagination : false,
	    	items: 5,
	    	autoPlay:5000,
	    });

	}



	//single page localscroll and scrollspy
	var navHeight = jQuery('#header').outerHeight(true);
	jQuery('body').scrollspy({
		target: '#mainmenu_wrapper',
		offset: navHeight
	});
	if (jQuery().localScroll) {
		jQuery('#mainmenu').localScroll({
			duration:900,
			easing:'easeInOutQuart',
			offset: -navHeight+10
		});

	}

});


jQuery(window).load(function(){

	//chart
	pieChart();

	 // Detect Safari

    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    if (isSafari) $('html').addClass('is-safari');


    //flexslider
	if (jQuery().flexslider) {
		//var $mainSlider = jQuery('#mainslider');
		jQuery("#mainslider .flexslider").flexslider({
			animation: "fade",
			useCSS: true,
			controlNav: true,
			directionNav: false,
		    prevText: "",
		    nextText: "",
			smoothHeight: true,
			slideshowSpeed:8000,
			animationSpeed:300,
			start: function( slider ) {
				slider.find('.slide_description').children().css({'visibility': 'hidden'});
				slider.find('.flex-active-slide .slide_description').children().each(function(index){
				var self = jQuery(this);
				var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
				setTimeout(function(){
						self.addClass("animated "+animationClass);
					}, index*200);
				});
			},
			after :function( slider ){
				slider.find('.flex-active-slide .slide_description').children().each(function(index){
				var self = jQuery(this);
				var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
				setTimeout(function(){
						self.addClass("animated "+animationClass);
					}, index*200);
				});
			},
			end :function( slider ){
				slider.find('.slide_description').children().each(function() {
					jQuery(this).attr('class', '');
				});
			}
		});

		jQuery(".flexslider").flexslider({
			animation: "fade",
			useCSS: true,
			controlNav: true,
			directionNav: false,
		    prevText: "",
		    nextText: "",
			//animationLoop: false,
			smoothHeight: true,
			slideshowSpeed:5000,
			animationSpeed:800,
			after :function( slider ){
				//console.log(slider.find('.slide_description').children());
			  	//bg-color1 - class for #mainslider
			  	//var currentClass = $mainSlider.find('.flex-active-slide').attr('data-bg');
			  	//$mainSlider.attr('class', currentClass);
			}
		});
	}




	//stick header to top
	var affixHeader = jQuery('#header');
	var headerOffset = jQuery('#topline').outerHeight(true)
	var headerHeight = affixHeader.outerHeight(true);
	affixHeader.wrap('<div id="header_wrapper"></div>').parent().css({height: headerHeight}); //wrap header for smooth stick and unstick
	jQuery(affixHeader).affix({
		offset: {
			top: headerOffset,
			bottom: 0
		}
	});







	//animation to elements on scroll
	if (jQuery().appear) {
		// jQuery('.to_animate').appear().css({opacity: 0});
		jQuery('.to_animate').appear().css({'visibility': 'hidden'});
		jQuery('.to_animate').filter(':appeared').each(function(index){
			var self = jQuery(this);
			var animationClass = !self.data('animation') ? 'fadeInUp' : self.data('animation');
			var animationDelay = !self.data('delay') ? 270 : self.data('delay');
			setTimeout(function(){
				self.addClass("animated " + animationClass);
			}, index * animationDelay);
		});

		jQuery('body').on('appear', '.to_animate', function(e, $affected ) {
			jQuery($affected).each(function(index){
				var self = jQuery(this);
				var animationClass = !self.data('animation') ? 'fadeInUp' : self.data('animation');
				var animationDelay = !self.data('delay') ? 270 : self.data('delay');
				setTimeout(function(){
					self.addClass("animated " + animationClass);
				}, index * animationDelay);
			});
		});
	}

	//counters init on scroll
	if (jQuery().appear) {
		jQuery('.counter').appear();
		jQuery('.counter').filter(':appeared').each(function(index){
			if (jQuery(this).hasClass('counted')) {
				return;
			} else {
				jQuery(this).countTo().addClass('counted');
			}
		});
		jQuery('body').on('appear', '.counter', function(e, $affected ) {
			jQuery($affected).each(function(index){
				if (jQuery(this).hasClass('counted')) {
					return;
				} else {
					jQuery(this).countTo().addClass('counted');
				}

			});
		});
	}


	//flickr
	// use http://idgettr.com/ to find your ID
	if (jQuery().jflickrfeed) {
		jQuery("#flickr").jflickrfeed({
			flickrbase: "https://api.flickr.com/services/feeds/",
			limit: 9,
			qstrings: {
				id: "63512867@N07"
			},
			itemTemplate: '<a href="{{image_b}}" data-gal="prettyPhoto[pp_gal]"><li><img alt="{{title}}" src="{{image_s}}" /></li></a>'
		}, function(data) {
			jQuery("#flickr a").prettyPhoto({
				hook: 'data-gal',
				theme: 'facebook'
	   		});
	   		jQuery("#flickr li").hover(function () {
			   jQuery(this).find("img").stop().animate({ opacity: 0.5 }, 200);
		    }, function() {
			   jQuery(this).find("img").stop().animate({ opacity: 1.0 }, 400);
		    });
		});
	}

});

jQuery(window).resize(function(){

	jQuery('body').scrollspy('refresh');
	jQuery("#header_wrapper").css({height: jQuery('#header').outerHeight(true)}); //editing header wrapper height for smooth stick and unstick

});

jQuery(window).scroll(function() {

	//circle progress bar
	pieChart();


});
