$(document).ready(function(){
	var switchState = 1, currentClick=0, lastClick=-1;
	var valid = true;
	var pxls = [18, 48, 78];
	$(".left-button").addClass("left-button-initial-state");
	$(".menu-link").first().addClass('menu-link-current');
	$(".menu-link").click(function(){
		$(this).addClass('menu-link-current');
		$(".menu-link").not($(this)).removeClass('menu-link-current');
	});
	$(".harta-oamenilor-content, .local-info, .popup-container-2-content, .about-content, .account-content, .pin").hide();
    
    $('.bonul-tau, .inner-popup-container .second-part-contact:eq(1), .inner-popup-container-2 .second-part-contact:eq(1)').keypress(function(event){
    	this.value = this.value.replace(/[^0-9\.]/g,'');
       if(event.which != 8 && isNaN(String.fromCharCode(event.which))){
           event.preventDefault(); //stop character from entering input
       }
    });

    $('.inner-popup-container .second-part-contact:eq(2), .inner-popup-container-2 .second-part-contact:eq(2)').focusout(function(){
    	checkEmail($(this));
    });

    $( ".nume-oras" ).hide();
 	$( ".nume-oras" ).parent().parent().click(function(){
 		$( ".nume-oras" ).fadeToggle('slow');	
 	})

	$(".menu-link").click(function(){
		var clickedIndex = $(this).parent().index();
		$(".page-container").fadeOut("fast", function(){
			$(".harta-oamenilor-content").hide().animate({top : "310px"},'fast');
			if( clickedIndex == 0 || clickedIndex == 4 ) { //navigate to 'acasa'
					switchState = 1;
					currentClick=0;
					lastClick=-1;
					$(".home-content, .regulament").show();
					$(".local-info, .popup-container-2-content, .about-content, .account-content, .pin").hide();
					$(".content-container").removeClass("content-container-3");
					$(".page-container").removeClass('second-state').removeClass('third-state').addClass('first-state').fadeIn("fast");
				}
			if( clickedIndex == 1 ) { //navigate to 'harta'
					switchState = 1;
					currentClick=0;
					lastClick=-1;
					
					$(".popup-container").modal();
					$(".popup-pin").show();
					$(".top-div").css({'top':'20px'});
					$("#simplemodal-container").addClass('good-people-simplemodal-container');
					$(".home-content, .regulament, .popup-container-2-content, .checkbox-filter, .about-content, .inner-popup-container, .inner-popup-container-2, .local-info, .account-content, .pin").hide();
					$(".footer").css({ bottom:'30px' });
					$("#simplemodal-container a.modalCloseImg").click(function(){
						$(".local-info, .pin").show();						
					})
					$(".content-container").removeClass("content-container-3");
					$(".page-container").removeClass('first-state').removeClass('third-state').addClass('second-state').fadeIn("fast", function(){
						$(".harta-oamenilor-content").fadeIn("slow").animate({top : "795px"},'slow');
					});
				}
			if( clickedIndex == 2 ) { //navigate to 'despre'
					switchState = 1;
					currentClick=0;
					lastClick=-1;
					$(".home-content, .regulament, .popup-container-2-content, .checkbox-filter, .local-info, .account-content, .pin").hide();
					$(".footer").css({ bottom:'30px' });
					$(".page-container").removeClass('first-state').removeClass('second-state').addClass('third-state').fadeIn("fast");
					$(".content-container").addClass("content-container-3");
					$(".about-content").show();
				}

			if( clickedIndex == 3 ) { //navigate to 'contul tau'
					switchState = 1;
					currentClick=0;
					lastClick=-1;
					$(".home-content, .about-content, .regulament, .popup-container-2-content, .checkbox-filter, .local-info, .pin").hide();
					$(".footer").css({ bottom:'30px' });
					$(".page-container").removeClass('second-state').removeClass('third-state').addClass('first-state').fadeIn("fast");
					$(".content-container").removeClass("content-container-3");
					$(".account-content").show();
				}
		});
	});


	$(".left-button").click(function (e) {
		$(".popup-container").modal();
		$(".inner-popup-container").show();
		$(".inner-popup-container-2, .inner-popup-container-3").hide();
		$(".left-button").removeClass("left-button-initial-state");
		$(".remaining-chars").val(400-($(".second-part-textarea").val().length));
		$(".bonul-tau, .second-part-text, .second-part-textarea, .second-part-contact").val("");
		switchState = 1;
		currentClick=0;
		lastClick=-1;
		return false;
	});

	$(".right-button").click(function (e) {
		$(".popup-container").modal();
		$(".inner-popup-container, .inner-popup-container-3").hide();
		$(".inner-popup-container-2").show();
		$(".left-button").removeClass("left-button-initial-state");
		$(".remaining-chars").val(400-($(".second-part-textarea").val().length));
		$(".bonul-tau, .second-part-text, .second-part-textarea, .second-part-contact").val("");
		$(".inner-popup-container-2 .left-button").click(function(){
			$(".inner-popup-container").show();
			$(".inner-popup-container-2").hide();
		});
		switchState = 1;
		currentClick=0;
		lastClick=-1;
		return false;
	});


	$(".rec-button").click(function(){
		currentClick = $(this).index();
		$("a.modalCloseImg").css({'visibility':'visible'});
		$(this).addClass('rec-button-focus');
		$(".rec-button").not($(this)).removeClass('rec-button-focus');
		$(".arrow").animate({margin:'-9px '+pxls[currentClick]+'%'},'fast');
		if( switchState == 1 ) {
			$(".stick-to-bottom").animate({'bottom':'-3%'},'slow');
			$("div#simplemodal-container").animate({'top':'50px','height':'1100px'},'slow', function(){
				$(".remaining-chars").val(400-($(".second-part-textarea").val().length));
				$(".second-part, .div-line").fadeIn('slow');
			});
			
			switchState=0;
			lastClick = currentClick;
		}else{
			if(currentClick != lastClick){
				$(".second-part").fadeOut('fast', function(){
					$(".second-part-text, .second-part-textarea, .second-part-contact").val("");
					$(".remaining-chars").val(400-($(".second-part-textarea").val().length));
					$(".second-part, .div-line").fadeIn('slow');
				});
				lastClick = currentClick;
			}
		}

	});

	$(".remaining-chars").val(400-($(".second-part-textarea").val().length));
	$(".second-part-textarea").keyup(function(){
		$(".remaining-chars").val(400-($(this).val().length));
	});

	$(".add-to-map").click(function(){
		var x=$(this).parent().parent();
		checkEmail($(x).find('.second-part-contact:eq(2)'));
		validateForm($(this).parent().parent());		
	});

	$(".goto-map-button, .account-goto-map").click(function(){
		$("#simplemodal-container a.modalCloseImg").click();
		$(".home-content, .regulament, .checkbox-filter, .account-content").hide();
		$(".footer").css({ bottom:'30px' });
		$(".menu-link").removeClass('menu-link-current');
		$(".menu-link:eq(1)").addClass('menu-link-current');
		$(".local-info, .pin").show();
		$(".page-container").removeClass('first-state').addClass('second-state').fadeIn("fast", function(){
			$(".harta-oamenilor-content").fadeIn("slow").animate({top : "795px"},'slow');
		});
	});



	$(".search-filter").click(function (e) {
		$(this).hide();
		$(".checkbox-filter").show();

		$(".local-info").css({
			'box-shadow':'none'
		});
		getUsers();
		$("div.checkbox-filter input").prop('checked', false);
		$(".popup-container-2").modal();
		$("#simplemodal-container").css({
			'position':'absolute',
			'top':'58px',
			'left':'246px',
			'width':'760px',
			'height':'720px'
		});
		$(".popup-container-2-content, .div-line-2").fadeIn('slow');

		$(".popup-container-2-content").on('click', '.user-left-button', function(){
			$(".user-likes span").text(parseInt($(".user-likes span").text())+1);
		})


	    $('.popup-container-2-search').keyup(function(){
	       var valThis = $(this).val().toLowerCase();
	        $('.user-list>li').each(function(){
	         var text = $(this).text().toLowerCase();
	            (text.indexOf(valThis) == 0) ? $(this).show() : $(this).hide();         
	       });
	    });

		$("#simplemodal-container .user-list a").click(function(e){
			$('.popup-container-2-search').val("");
			$(this).css({'border-bottom':'2px solid #000', 'font-weight':'900'});
			$("#simplemodal-container .user-list a").not($(this)).css({'border-bottom':'none', 'font-weight':'100'});
			setUserInfo($(this).parent().index());
		});



		$("#simplemodal-container a.modalCloseImg").click(function(){
			$('.popup-container-2-search').val("");
			$(".search-filter").show();
			$(".checkbox-filter").hide();
			$(".local-info").css({
				'box-shadow':'4px 4px 0 #bbb'
			});
		});
		return false;
	});

});

/*data coming from backend*/
var dataArr = ["Franklin Covert","Timmy Weld","Marcy Grizzard","Joellen Limberg","Britt Wadkins","Micki Shupe","Chau Finkbeiner","Gonzalo Siqueiros","Nicola Trudeau","Beatriz Mcspadden","Franklin Covert","Timmy Weld","Marcy rizzard","Joellen Limberg","Britt Wadkins","Micki Shupe","Chau Finkbeiner","Gonzalo Siqueiros","Nicola Trudeau","Beatriz Mcspadden","Franklin Covert","Timmy Weld","Marcy Grizzard","Joellen Limberg","Britt Wadkins","Micki Shupe","Chau Finkbeiner","Gonzalo Siqueiros","Nicola Trudeau","Beatriz Mcspadden","Franklin Covert","Timmy Weld","Marcy Grizzard","Joellen Limberg","Britt Wadkins","Micki Shupe","Chau Finkbeiner","Gonzalo Siqueiros","Nicola Trudeau","Beatriz Mcspadden","Franklin Covert","Timmy Weld","Marcy rizzard","Joellen Limberg","Britt Wadkins","Micki Shupe","Chau Finkbeiner","Gonzalo Siqueiros","Nicola Trudeau","Beatriz Mcspadden","Franklin Covert","Timmy Weld","Marcy Grizzard","Joellen Limberg","Britt Wadkins","Micki Shupe","Chau Finkbeiner","Gonzalo Siqueiros","Nicola Trudeau","Beatriz Mcspadden"];
var locationArr = ["Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj","Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj", "Bucuresti", "Iasi", "Cluj"];
	
function getUsers(){

/*users coming from backend are being returned inside this function*/

	var theHTML='<ul class="user-list">';
	
		for(var i=0; i<dataArr.length; i++){
			theHTML = theHTML + '<li><a href="#">' + dataArr[i] + '</a></li>';
		}

	thHTML = theHTML + '</ul>';

	$(".user-list").remove();
	$(".users-list-container").html(theHTML);

}

function setUserInfo(indx){
$(".user-left-button").css({'z-index':1111});
	$(".user-info").html("<p class='user-title'>"+dataArr[indx]+" - "+locationArr[indx]+"</p><br/><br/><p class='user-desc'>"+userDescription()+"</p><input type='button' class='user-left-button' value='Sustine Fapta Buna'/><div class='user-likes'><div class='arrow'></div><span>"+clickCounter()+"</span> Sustinatori</div><div class='user-share-button'><input type='button'></input></div>");

}

function userDescription(){
	/*will return data from backend*/
	return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis pretium venenatis. Aenean ornare sapien sit arnet orci porta, sit amet porttitor dui euismod. phasellus rhoncus leo nec lorem vestibulum cursus. Vivamus sit amet viverra lectus. Donec feugiat sapien in ipsum feugiat euismod. Aenean id ex eu metus sodales suscipit. Pellentesque dictum ut quam quis facilis. Pellentesque volutpat.";
}

function clickCounter(){
	/*will return data from backend*/
	return Math.floor((Math.random() * 100000) + 1); 
}

function validateForm(param){

	
	$(param).find("input[type='text'], textarea").not(".remaining-chars").each(function(){
		if( $(this).val() == "" ) valid = false;
	});

	if( valid ){
		$(".bottom-note").css({'font-weight':'100'});
			$(param).fadeOut('slow',function(){
				$(".simplemodal-container").animate({'top':'450px','height':'370px'},'slow', function(){
					$(".inner-popup-goto-map-container").fadeIn('slow');
				});
			});

	}else{
		$(param).find("input[type='text'], textarea").not(".remaining-chars").addClass('pinky');
		$(".bottom-note").css({'font-weight':'900'});
	}


}

function checkEmail(param) {
    $(param).filter(function(){
        var email=$(this).val();
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if( !emailReg.test( email ) ) {
        alert('Please enter a valid email');
        valid = false;
        }else{
        	valid = true;
        }
    });
};