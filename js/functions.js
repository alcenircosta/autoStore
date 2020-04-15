$(function(){
	var currentValue = 0;
	var isDrag = false;
	var precoMaximo = 70000;
	var preco_atual = 0;

	$('.pointer-barra').mousedown(function(){
		isDrag = true;
	})
	$(document).mouseup(function(){
		isDrag = false;
		enableTextSelection();
	})
	$('.barra-preco').mousemove(function(e){
		if(isDrag == true){
			disableTextSelection();
			var elBase = $(this);
			var mouseX = e.pageX - elBase.offset().left;
			if(mouseX < 0)
				mouseX=0
			if(mouseX > elBase.width())
				mouseX = elBase.width();
			$('.pointer-barra').css('left',(mouseX -'13'+'px'));

			currentValue = (mouseX / elBase.width())*100;
			$('.barra-preco-fill').css('width',currentValue+'%');

			preco_atual = currentValue/100 * precoMaximo;
			preco_atual = fPreco(preco_atual);
			$('.preco_pesquisa').html('R$'+preco_atual);
		}
	})

	function fPreco(preco_atual){
		preco_atual = preco_atual.toFixed(2);
		preco_arr = preco_atual.split('.');

		var novo_preco = fTotal(preco_arr);

		return novo_preco;
	}

	function fTotal(preco_arr){
		if(preco_arr[0] < 1000){
			return preco_arr[0]+','+preco_arr[1];
		}else if(preco_arr[0]< 10000){
			return preco_arr[0][0]+'.'+preco_arr[0].substr(1,preco_arr[0].length)+
			','+preco_arr[1];
		}else{
			return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2,preco_arr[0].length)+
			','+preco_arr[1];
		}	
	}

	function disableTextSelection(){
		$("body").css("-webkit-user-select","none");
		$("body").css("-moz-user-select","none");
		$("body").css("-ms-user-select","none");
		$("body").css("-o-user-select","none");
		$("body").css("user-select","none");
	}

	function enableTextSelection(){
		$("body").css("-webkit-user-select","auto");
		$("body").css("-moz-user-select","auto");
		$("body").css("-ms-user-select","auto");
		$("body").css("-o-user-select","auto");
		$("body").css("user-select","auto");
	}

	// Sistema de Slider da pagina de vendas
	var imgShow = 3;
	var minIndex = imgShow-1;
	var maxIndex = Math.ceil($('.mini-img-wraper').length/3) -1;
	var curIndex = 0;
	initSlider();
	navigateSlider();
	clickSlider();

	function initSlider(){
		var amt = $('.mini-img-wraper').length *33.3;
		var elScroll = $('.nav-galeria-wraper');
		var elSingle = $('.mini-img-wraper');

		elScroll.css('width',amt+'%');
		elSingle.css('width',33.3 * (100/amt)+'%');
	}

	function navigateSlider(){
		$('.arrow-right-nav').click(function(){
			if(curIndex < maxIndex){
				curIndex++;
				var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
				$('.nav-galeria').animate({'scrollLeft':elOff+'px'})
			}else{
			}
		});
		$('.arrow-left-nav').click(function(){
			if(curIndex > 0){
				curIndex--;
				var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
				$('.nav-galeria').animate({'scrollLeft':elOff+'px'})
			}else{
				console.log("Chegamos ao inicio da apresentação!")	
			}
		});
	}

	function clickSlider(){
		$('.mini-img-wraper').click(function(){
			$('.mini-img-wraper').css('background-color','transparent');
			$(this).css('background-color','rgb(210,210,210)');
			var img = $(this).children().css('background-image');
			$('.foto-destaque').css('background-image',img);
		})
		$('.mini-img-wraper').eq(0).click();
	}

	$('[goto=contato]').click(function(){
		$('nav a').css('color','black');
		$(this).css('color','#EB2D2D');
		$('html,body').animate({'scrollTop':$('#contato').offset().top});
		return false;
	});

	$('.mobile').click(function(){
		$(this).find('ul').slideToggle();
	})

	var amtdepoimento = $('.depoimento-single p').length;
	var crIndex = 0;
	navegarSlides();
	iniciarDepoimentos();

	function iniciarDepoimentos(){
		$('.depoimento-single p').hide();
		$('.depoimento-single p').eq(0).show();
	}

	function navegarSlides(){
		$('[next]').click(function(){
			crIndex++;
			if(crIndex>=amtdepoimento-1)
				crIndex=0
			$('.depoimento-single p').hide();
			$('.depoimento-single p').eq(crIndex).show();			
			
		});
		$('[prev]').click(function(){
			crIndex--;
			if(crIndex<0)
				crIndex = amtdepoimento-1;
			$('.depoimento-single p').hide();
			$('.depoimento-single p').eq(crIndex).show();			

		});
	}
});