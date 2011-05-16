/**
 * @author beihe
 */
(function(){
	if(!window.bh){window.bh={}};
	function bh() {
	    var elements = new Array();
	    for (var i = 0; i < arguments.length; i++) {
	        var element = arguments[i];
	        if (typeof element == 'string') {
	            element = document.getElementById(element);
	        }
	        if (arguments.length == 1) {
	            return element;
	        }
	        elements.push(element);
	    }
	    return elements;
	};
	window.bh = bh;
	function create(prop){
		function F(){
			this.init.apply(this,arguments)
		}
		for(var name in prop){
			F.prototype[name] = prop[name];
		}
		return F;
	}
	window.bh.create = create;
	function extend(baseClass,prop){
		function F(){
			this.init.apply(this,arguments)
		}
		var middleClass = function() {};
		middleClass.prototype = baseClass.prototype;
		F.prototype = new middleClass();
		F.prototype.constructor = F;
		for(var name in prop){
			if(prop.hasOwnProperty(name)){
				if(baseClass&&typeof (prop[name])==="function"&&typeof(F.prototype[name]) ==="function" &&/\b_super\b/.test(prop[name])){
					F.prototype[name] = (function(name,fn){
						return function(){
							this._super = baseClass.prototype[name];
							return fn.apply(this,arguments);
						}
					})(name,prop[name]);
				}else{
					F.prototype[name] = prop[name];
				}
			}
		}
		return F;
	}
	window.bh.extend = extend;
	//通过类名获取对象
	function getElementsByClassName(searchClass,parent,tag){
		var classElements = [];
		if(parent == null){
			node = document;
		}
		if(tag == null){
			tag = "*";
		}
		var els = parent.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp('(^|\\\\s)'+searchClass+'(\\\\s|$)');
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	}
	window.bh.getElementsByClassName = getElementsByClassName;
	
	function eventBridge(object, fun) { 
		return function(event) { 
			return fun.call(object, (event || window.event)); 
		} 
	}
	window.bh.eventBridge = eventBridge;
	//给对象添加行为
	function addEvent(eventType,obj,fn,capture){
		if(capture == null){capture = false}
		if(obj.addEventListener){
			obj.addEventListener(eventType,fn,capture);
			
			return true;
		}else if(obj.attachEvent){
			var r = obj.attachEvent('on'+eventType,fn);
			return true;
		}else{
			obj['on'+eventType] = fn;
		}	
	}
	window.bh.addEvent = addEvent;
	//解除行为绑定
	function removeEvent(eventType,obj,fn,capture){
		if(capture == null){capture = false}
		if (obj.removeEventListener) { 
			obj.removeEventListener(eventType,fn, capture); 
		} else if (obj.detachEvent) { 
			obj.detachEvent("on" + eventType,fn); 
		} else { 
			obj["on" + eventType] = null; 
		} 
	}
	window.bh.removeEvent = removeEvent;
	//阻止默认行为
	function preventDefault(event){
		if(event.preventDefault){
			event.preventDefault()
		}else{
			event.returnValue = false;
		}
	}
	window.bh.preventDefault = preventDefault;
	//取消冒泡
	function stopPropagation(event){
		if(event.stopPropagation){
			event.stopPropagation();
			console.log("true")
		}else{
			event.cancelBubble =true;
		}
	} 
	window.bh.stopPropagation = stopPropagation;
	function getEvent(event){
		return event?event:window.event;
	}
	window.bh.getEvent = getEvent;
	function getTarget(event){
		return event.target||eventsrcElement;
	}
	window.bh.getTarget = getTarget;
	//图片预加载
	function loadImage(url,callback){
		var img=new Image();
		img.onload = function(){
			img.onload = null;
			callback(img);
		}
		img.src = url;
	}
	//getRelatedTarget
	function getRelatedTarget(event){
		if(event.relatedTarget){
			return event.relatedTarget;
		}else if(event.toElement){
			return event.toElement;
		}else if(event.fromElement){
			return event.fromElement;
		}else{
			return null;
		}
	}
	window.bh.getRelatedTarget = getRelatedTarget;
	//getButton绑定mousedown或者mouseup事件
	function getButton(event){
		if(document.implementation.hasFeature("MouseEvents","2.0")){  
			return event.button;
		}else{
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7: return 0;
				case 2:
				case 6: return 2;
				case 4: return 1;
			}
		}
	}
	window.bh.getButton = getButton;
	function getCharCode(event){
		if(typeof event.charCode == "number"){
			return event.charCode;
		}else{
			return event.keyCode;
		}
	}
	window.bh.getCharCode = getCharCode;
	
	//css行为
	function addClassName(obj,newclass){  
		var classArray = newclass.split(/\s+/),
			result = obj.className,
			classMatch = " " + result + " ",
			i = 0,
			l = classArray.length;
		for (; i < l; i++){
			 if ( classMatch.indexOf( " " + classArray[i] + " " ) < 0 ) {
				 result += (result ? ' ' : '') + classArray[i];
			 }
		}
		obj.className = result;
	}
	window.bh.addClassName = addClassName;
	function removeClassName(obj,reclass){
		var oldClasses = obj.className.split(/\s+/),
			newClasses = reclass.split(/\s+/),
			lenOld,
			lenDel = newClasses.length,
			i,
			j;
			for(i=0;i<lenDel;++i){
				for(j=0,lenOld=oldClasses.length;j<lenOld;++j){
					if(oldClasses[j] == newClasses[i]){
						oldClasses.splice(j,1);
						break;
					}
				}
			}
		obj.className = oldClasses.join(" ");
	}
	window.bh.removeClassName = removeClassName;
	
})(window,undefined)
