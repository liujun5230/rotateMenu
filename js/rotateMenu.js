$(function(){
    var supportedCSS, styles = document.getElementsByTagName("head")[0].style, toCheck = "transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
    for (var a = 0; a < toCheck.length; a++) if (styles[toCheck[a]] !== undefined) supportedCSS = toCheck[a];
// Bad eval to preven google closure to remove it from code o_O
// After compresion replace it back to var IE = 'v' == '\v'
    var IE = eval('"v"=="\v"');

    jQuery.fn.extend({
		
		arc:{
				orginW:0,
				orginH:0,
				menuItem:null,
				rBox:null
		},
		
		drag: function(){
			
			var o = {}, rotateAngle = 0, _that = this,flag = false;
				
			
			$(document).mousedown(function(e){
				flag = true;
				_that.arc["rBox"].css("transition-duration","0s");
				_that.arc["rBox"].css("transform","rotateZ(" + rotateAngle + "deg)");
				console.log("我-----了");
				o.ex = e.clientX;
				o.ey = e.clientY;
				o.et = e.timeStamp;
				/*console.log(e);
				console.log("et:"+ e.timeStamp);
				console.log("ey:"+ ex);
				console.log("ey:"+ ey);*/
				console.log(o);
				
				
				
			});
			
			$(document).mousemove(function(e){
				if(!flag){return}
				var uo = {},co = {},angle = 0,lastAngle = rotateAngle;
				
				co.x = e.clientX;
				co.y = e.clientY;
				co.t = e.timeStamp;
				
				
				uo.x = co.x - o.ex + _that.arc["orginW"];
				uo.y = co.y - o.ey + _that.arc["orginH"];
				uo.t = co.t - o.et;
				
				
				var dtan = Math.atan(o.ey/o.ex),
					utan = Math.atan(co.y/co.x);
				
				angle = (utan - dtan)/(Math.PI/180) + lastAngle;
				
				console.log("dtan:"+dtan+"---utan:"+utan + "----etan:" + angle);
				_that.arc["rBox"].css("transform","rotateZ(" + angle + "deg)");
				
				
				console.log("ox:"+_that.arc["orginW"]+"-----oy:"+_that.arc["orginH"]);
				
				console.log(co);
				console.log(uo);
				console.log("我UP了");
				
				rotateAngle = angle;	
			});
			
			$(document).mouseup(function(e){
				//rotateAngle = rotateAngle%360;
				rotateAngle = rotateAngle + 100;
				_that.arc["rBox"].css("transform","rotateZ(" + rotateAngle + "deg)");
				_that.arc["rBox"].css("transition-duration","1s");
				
				flag = false;
			});
			
		},
		
		rotate: function(){
			
			$(document).mousemove(function(e){
				var o = null;
				
				
				
				
			});
			
		},
		
		/*
			统计图标数量，
			根据图标数量等分圆，得到每等分圆的弧度，
			然后按Y等于0，X等于r开始重置第一个图标的top和left，
			然后从第一个圆开始，每隔等分圆弧度重置第二个图标的top和left，
			直到所有图标排成一个圆
		*/
		resetSite: function(){
			var menuLi    = $(".item li"),          //菜单项元素
			    rBox      = $(this);                //圆盘元素
			var len       = menuLi.length;          //有多少个菜单项
			var perArc    = (360/len)*(Math.PI/180), //两个相邻菜单项相隔的角度
				r         = 220,                    //菜单项距离圆心的距离
				lihalfW  = menuLi.width()/2,       //菜单项元素宽度的一半，用于计算菜单项元素的圆心
				lihalfH  = menuLi.height()/2,      //菜单项元素高度的一半，用于计算菜单项元素的圆心
				countArc  = 0,                      //相邻菜单角度累计
				top       = 0,                      //用于暂存每个菜单项的top
				left      = 0,                      //用于暂存每个菜单项的left
				orginX   = rBox.width()/2,         //原点x坐标
				orginY   = rBox.height()/2;        //原点y坐标
			
			this.arc["menuItem"] = menuLi;
			this.arc["rBox"] = rBox;
			this.arc["orginW"] = rBox.offset().left + orginX;
			this.arc["orginH"] = rBox.offset().top +  orginY;
			
			for(var i=0;i<len;i++){
				top = Math.sin(countArc) * r + orginX - lihalfH;
				left = Math.cos(countArc) * r + orginY - lihalfH;
				menuLi.eq(i).css({"top":top+"px","left":left+"px"});
				countArc += perArc;
			}
			
			this.drag();
			
		},
		

		
		
		circle: function (parameters) {
            if (this.length === 0 || typeof parameters == "undefined") return;
            if (typeof parameters == "number") parameters = {angle: parameters};


        }
    });
	

	$(".rotateBox").resetSite();
});




/*
    jQuery.fn.extend({
        rotate: function (parameters) {
            if (this.length === 0 || typeof parameters == "undefined") return;
            if (typeof parameters == "number") parameters = {angle: parameters};
            var returned = [];
            for (var i = 0, i0 = this.length; i < i0; i++) {
                var element = this.get(i);
                if (!element.Wilq32 || !element.Wilq32.PhotoEffect) {

                    var paramClone = $.extend(true, {}, parameters);
                    var newRotObject = new Wilq32.PhotoEffect(element, paramClone)._rootObj;

                    returned.push($(newRotObject));
                }
                else {
                    element.Wilq32.PhotoEffect._handleRotation(parameters);
                }
            }
            return returned;
        },
        getRotateAngle: function () {
            var ret = [];
            for (var i = 0, i0 = this.length; i < i0; i++) {
                var element = this.get(i);
                if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                    ret[i] = element.Wilq32.PhotoEffect._angle;
                }
            }
            return ret;
        },
        stopRotate: function () {
            for (var i = 0, i0 = this.length; i < i0; i++) {
                var element = this.get(i);
                if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                    clearTimeout(element.Wilq32.PhotoEffect._timer);
                }
            }
        }
    });*/
