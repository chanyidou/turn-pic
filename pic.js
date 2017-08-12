var oImgArr = [];
		var newImgArr;
		var oImgLen = $('img').length;
		var page = 0;
		var timer = null;
		var key = true;
		// 获取当前每个图片的位置与样式
		var getArr = function(){
			for (var i = 0; i < oImgLen ; i ++ ){
				// console.log(i)
				oImgArr.push([$('img').eq(i).css('top'),
				$('img').eq(i).css('width'),
				$('img').eq(i).css('height'),
				$('img').eq(i).css('opacity'),
				$('img').eq(i).css('left'),
				$('img').eq(i).css('z-index')]);
			}
		}
		
		// 每个图片更改样式
		var move = function(time){
			for(var i = 0; i < oImgLen; i ++){

				$('img').eq(i).css('zIndex',oImgArr[i][5]);
				$('img').eq(i).animate({'top':oImgArr[i][0],
					'width':oImgArr[i][1],'height':oImgArr[i][2],'opacity':oImgArr[i][3],'left':oImgArr[i][4],
				},time,'swing',function(){
					key = true;
				})
		   	}
		}	

		var imgMove = function(direction){
			if(direction > 0 ){
				oImgArr.unshift(oImgArr[oImgLen - 1]);
				oImgArr.pop(oImgArr[oImgLen - 1]);
				move(1000);
				sliderMove(1);
			}else{
				oImgArr.push(oImgArr[0]);
				oImgArr.shift(oImgArr[0]);
				move(1000);
				sliderMove(-1);
			}
		}	
		// 两个按钮	
		$('button').eq(0).on('click',function(){
			clearInterval(timer);
			if(key){
				key = false;
				getArr();
				imgMove(-1);				
			}
			auto();			
		})
		$('button').eq(1).on('click',function(){
			clearInterval(timer);
			if(key){
				key = false;
				getArr();
				imgMove(1)
			}	
			auto();
		})
		// 小圆点移动样式
		var sliderPage = function(page){
			$('.active').removeClass();
			$('.slider>li').eq(page).addClass('active');
		}
		// 小圆点移动
		var sliderMove = function(direction){
			// console.log(key)
			if(direction > 0){
				page ++;
				if(page > 5){
					page = 0;
				}
				sliderPage(page);
			}else{
				page --;
				if(page < 0){
					page = 5;
				}
				sliderPage(page);
			}
		}
		//小圆点点击跳转
		$('.slider>li').on('click',function(){
			clearInterval(timer);	
			if(key){
				key = false;
				$(this).each(function(index){
				sliderPage($(this).index());
				getArr();
				if($(this).index() > page){
				 	var a = oImgArr.splice(oImgLen - 1 - ($(this).index()-page-1), ($(this).index() - page));
					oImgArr = a.concat(oImgArr);
				}else if($(this).index() < page){
					var a = oImgArr.splice(0, page - $(this).index());
					oImgArr = oImgArr.concat(a);
				}
				move(1000);	
				oImgArr.splice(0,oImgArr.length);
				page = $(this).index();
				});	
			}	 
			key	= true;	
			auto();
		})
					

		// 自动移动轮播
		function auto() {			
			timer = window.setInterval(function(){
			key = false;
			getArr();
			imgMove(1);				
			},3000)
		}
		auto();