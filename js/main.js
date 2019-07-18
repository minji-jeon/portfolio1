$(document).ready(function() {

	$(window).resize(function (){
		var width_size = $(window).outerWidth();

		  if (width_size > 1025) {
			  $('h1 img').attr({'src':'img/main/header_logo.jpg'}); 
		  }else {
			  $('h1 img').attr({'src':'img/main/m-logo.jpg'});
		  }
		
		
		
		//pc 메뉴열기
		$('header .gnb nav ul.menu_list>li>a').on('mouseenter focus', function() {
			if ($(window).width() > 1025) {
				$('header .gnb nav ul.menu_list>li>ul').addClass('on');
				$('header').addClass('on');
			}
			
			$('header').on('mouseleave', function() {
				$('header .gnb nav ul.menu_list>li>ul').removeClass('on');
				$('header').removeClass('on');
			});
			
			
			
		});
		

		
	}).resize();
   
	
//	모바일 메뉴열기
    $('header article.gnb a.menu_open').click(function() {
		$(this).toggleClass('on');
		$('nav').toggleClass('on'); 

		$('header article.gnb nav ul.menu_list>li>ul').removeClass('on');
		
		$('header article.gnb nav ul.menu_list>li>a').on('click', function(e) {
			e.preventDefault();
			$(this).next('ul').toggleClass('on');
		});
    });
    

	
	
//footer select 
	$('#footer .foot_btn .select>a').on('click', function() {
		$('#footer .foot_btn .select ul').toggleClass('on');
	});
	
	

	//	비주얼 슬라이드
	setImageSlide('#visual .image-slide');
	
	function setImageSlide(selector) {
		var numSlide = $(selector).find('ul.slide li').length;
		var slideNow = 0;
		var slideNext = 0;
		var slidePrev = 0;
		var timerId = null;
		var timerSpeed = 3000;
		var isTimerOn = true;
		var lineHeight = $(selector).find('.indicator li').height();
		
		
		if (isTimerOn === true) {
			$(selector).find('div.control a.play').addClass('on');
		} else {
			$(selector).find('div.control a.play').removeClass('on');
		}
		
		$(selector).find('ul.slide li').each(function(i) {
			$(selector).find('.indicator').append('<li><a href="#">'+ (i + 1) +' 번 이미지</a></li>')
		})
		
		setSlide(1)

		$(selector).find('div.control a.prev').on('click', function() {
			setSlide(slidePrev);
		});
		$(selector).find('div.control a.next').on('click', function() {
			setSlide(slideNext);
		});
		 $(selector).find('ul.indicator li a').on('click', function() {
			var index = $(selector).find('ul.indicator li').index($(this).parent());
			setSlide(index + 1);
		});
		$(selector).find('div.control a.play').on('click', function() {
			if (isTimerOn === true) {
				clearTimeout(timerId);
				$(this).removeClass('on');
				isTimerOn = false;
			} else {
				timerId = setTimeout(function() {setSlide(slideNext);}, timerSpeed);
				$(this).addClass('on');
				isTimerOn = true;
			}
		});

		function setSlide(n) {
			clearTimeout(timerId);
			
			if (slideNow !== 0) $(selector).find('ul.slide li').css({'transition':'left 0.3s'});
			
			$(selector).find('ul.indicator li a').on('click', function() {
				$(selector).find('ul.slide li').css({'transition':'none'});
			});
			
			slideNow = n;
			slidePrev = (n - 1) < 1 ? numSlide : n - 1;
			slideNext = (n + 1) > numSlide ? 1 : n + 1;

			$(selector).find('ul.slide li').removeClass('on').css({'display':'none'});
			$(selector).find('.indicator li').removeClass('on');
			
			$(selector).find('ul.slide li:eq('+ (slideNow - 1) +')').addClass('on').css({'left':0,'display':'block'});
			$(selector).find('ul.slide li:eq('+ (slidePrev - 1) +')').css({'left':'-100%','display':'block'});
			$(selector).find('ul.slide li:eq('+ (slideNext - 1) +')').css({'left':'100%','display':'block'});
			$(selector).find('.indicator li:eq('+ (slideNow - 1) +')').addClass('on');
			
			
			
			if (isTimerOn === true) {
				timerId = setTimeout(function() {setSlide(slideNext);}, timerSpeed);
			}
		}
	}

	setBannerSlide('#sns .inner_s');
	function setBannerSlide(seletor) {
		var numSlide = $('#sns .inner_s ul li').length; 
		var imgWidth = $('#sns .inner_s li a').outerWidth(true);
		
		$('#sns .inner_s ul').css({'width':(imgWidth * numSlide) + 'px'});
		
		console.log(numSlide + '/' + imgWidth);
		
	}
	
	
});