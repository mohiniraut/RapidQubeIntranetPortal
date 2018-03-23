var req=null;
var READY_STATE_COMPLETE=4;
var POPUP_BOX_IDS = [];
var POPUP_BOX_CALLBACKS = [];

var inFrameset = false;
for (var i = 0; i < parent.frames.length; i++) {
    if (parent.frames[i].name == "editheader") {
    	inFrameset = true;    
    }
}
var inIframe = (!inFrameset && window.parent.location != window.parent.parent.location);
var root_parent = inIframe ? parent.parent : parent; 

function sendReq(url, callback, method) {
	if (method == null) { method = "GET"; }
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (req) {
		req.onreadystatechange = callback;
		req.open(method, url, true);
		req.send(null);
    }
}

function ajaxSubmitForm(formid, callback) {
	f =  document.getElementById(formid);
	url = f.action + "?";
	for (i = 0; i < f.elements.length; i++) {
		if (f.elements[i].type == "checkbox") {
			if (f.elements[i].checked) {
				n = f.elements[i].name;
				v = f.elements[i].value;
				url += "&" + n + "=" + v;
			}
		} else {
			n = f.elements[i].name;
			v = f.elements[i].value;
			url += "&" + n + "=" + v;			
		}
	}
	sendReq(url, callback, "POST");
}

function GRTip (string) {
	Tip(string , FONTSIZE, '1em', WIDTH, 225, SHADOW, true, SHADOWWIDTH, 3, SHADOWCOLOR, '#606060', BGCOLOR, '#ffffee', PADDING, 8, FOLLOWMOUSE, false, FADEIN, 80, FADEOUT, 60);
}

function toggleBox(boxid) {
	box = document.getElementById(boxid);
	if (box.style.display == "none") {
		box.style.display = "block";
	} else {
		box.style.display = "none";
	}
}

function move_box(box, boxWidth, boxHeight, deltax, deltay) {  
    var w, h;
    var win = window;
    var doc = document;
    if (win.innerHeight) {
        w = win.innerWidth;
        h = win.innerHeight;
    } else {
	    if (doc.documentElement && doc.documentElement.clientHeight) {
	        w = doc.documentElement.clientWidth;
	        h = doc.documentElement.clientHeight;
	    } else {
	        if (doc.body) {
	            w = doc.body.clientWidth;
	            h = doc.body.clientHeight;
	        }
	    }
	}
	var t;
    if (doc.documentElement && doc.documentElement.scrollTop) {
        t = doc.documentElement.scrollTop;
    } else {
        if (doc.body) { t = doc.body.scrollTop; }
    }
	var ctop = (h - parseInt(boxHeight))/2 - 20 + parseInt(t);
	var cleft = (w - parseInt(boxWidth))/2 - 13;
	if (deltax) { cleft += deltax; }
	if (deltay) { ctop += deltay; }
	box.style.top = ctop + "px"; 
	box.style.left = cleft + "px";
}  

function closePopups() {
	var p = POPUP_BOX_IDS.pop();
	var cb = POPUP_BOX_CALLBACKS.pop();
	if (cb && typeof(cb) == 'function') { cb();	}
	var boxdiv = document.getElementById('popup-'+p);
	if (boxdiv) { boxdiv.parentNode.removeChild(boxdiv);	}
	if (POPUP_BOX_IDS.length == 0) { LightenPage(); }
}

function show_hide_box(caption, href, height, width, callback, deltax, deltay, iframename) {
	deltax = parseInt(deltax);
	deltay = parseInt(deltay);
	var doc = document;
 
    var boxdiv = document.createElement('div');
    boxdiv.style.display = 'block';  
    boxdiv.style.border = "2px #888 solid";   
    boxdiv.style.padding = '3px';  
    boxdiv.style.background = '#eee';
    boxdiv.style.width = width + 'px';  
    boxdiv.style.height = height + 'px';
    boxdiv.style.position = 'absolute';
    boxdiv.style.zIndex = 500000;
    boxdiv.setAttribute('id', 'popup-'+href);
	boxdiv.setAttribute("className", "popupwin pie");
	boxdiv.setAttribute("class", "popupwin pie");
    doc.body.appendChild(boxdiv);  
  
    var boxtitle = document.createElement('div');
	boxtitle.style.cssText = "float: left; padding-left: 5px; width: "+(width-40)+"px; text-align: left;";
	boxtitle.setAttribute("className", "s5 b black");
	boxtitle.setAttribute("class", "s5 b black");
	boxtitle.innerHTML = caption;
    boxdiv.appendChild(boxtitle);

    var offset = 0; 
    var close_href = document.createElement('a');  
    close_href.href = 'javascript:void(0);';  
	close_href.style.cssText = "float: right; width: 19px; height: 19px; text-align: left; display: block; margin: 0 0 3px;";
	close_href.innerHTML = "<img style='margin: 0 0 3px; border:0;padding: 0;' src='/static/images/win_close.gif'>";
   	close_href.onclick = closePopups; 
    boxdiv.appendChild(close_href);
	offset = 22;
  
    var contents = document.createElement('iframe');
    contents.setAttribute('id', href);  
    contents.overflowX = 'hidden';
    contents.overflowY = 'scroll';
    contents.frameBorder = '0';
	contents.setAttribute("className", "s5 b black");
	contents.setAttribute("class", "s5 b black");
    if (iframename) { contents.name = iframename; }
    contents.style.width = width + 'px';
    contents.style.height = (height - offset) + 'px';
    boxdiv.contents = contents;
    boxdiv.appendChild(contents);
    
    move_box(boxdiv, width, height, deltax, deltay);
    
    DarkenPage(doc);
	
    if (contents.contentWindow)
        contents.contentWindow.document.location.replace(href);
    else
        contents.src = href;
		
	POPUP_BOX_IDS.push(href);
	POPUP_BOX_CALLBACKS.push(callback);
	
	if (doc.body.addEventListener) { 
		document.body.addEventListener('mousedown', closePopups, false);
		document.body.addEventListener('keydown', function(event){
			if (event.keyCode == 27) {
				closePopups();
			}
		}, false);
	}
	
	if (doc.attachEvent) { 
		document.body.attachEvent('onmousedown', closePopups);
		document.body.attachEvent('onkeydown', function(event){
			if (event.keyCode == 27) {
				closePopups();
			}
		}, false); 
	}
    return false;
}  
  
function GB_showCenter(caption, href, height, width, callback, deltax, deltay, iframename){
	deltax = deltax || 0;
	deltay = deltay || 0;
	return show_hide_box(caption, href, height, width, callback, deltax, deltay, iframename);
} 

function DarkenPage(doc) {
    var page_screen = doc.getElementById('page_screen');
	if (page_screen && page_screen.style.display != 'block') {
		var wi = window.innerHeight || 0;
		var sh = doc.documentElement.scrollHeight || 0;
		var screen_height = Math.max(wi, sh);
		if (navigator.userAgent.indexOf("MSIE") > -1) {
			var oh = doc.getElementsByTagName('html')[0].offsetHeight;
			screen_height = Math.max(oh, sh);
		}
		page_screen.style.height = screen_height + 'px';
		page_screen.style.display = 'block';
	}
}

function LightenPage() {
	var page_screen = document.getElementById('page_screen');
	if (page_screen) page_screen.style.display = 'none';
}

var timeout = 500, ct, ddmenuitem;
function mopen(id) {
	mcancelclosetime();
	if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
	ddmenuitem = document.getElementById(id);
	ddmenuitem.style.visibility = 'visible';
}
function mclose() { if (ddmenuitem) { ddmenuitem.style.visibility = 'hidden'; } }
function mclosetime() { ct = window.setTimeout(mclose, timeout); }
function mcancelclosetime() { if (ct) { window.clearTimeout(ct); ct = null; } }


// Utility Functions

function makerandstring(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function include(arr, obj) {
	for(var i=0; i<arr.length; i++) {
		if (arr[i] == obj) return true;
	}
}

function startsWith(str1, str2){
	return (str1.substr(0, str2.length) === str2);
}

function arrayMax(ar) {
	var max = 0;
	for (i=0; i<ar.length; i++) {
		if (ar[i] > max) { max = ar[i]; }
	}
	return max;
}

function hashMax(ha) {
	var max = 0;
	for (i in ha) {
		if (ha[i] > max) { max = ha[i]; }
	}
	return max;
}

if(!Array.indexOf){  // For IE!
	    Array.prototype.indexOf = function(obj){
	        for(var i=0; i<this.length; i++){
	            if(this[i]==obj){
	                return i;
	            }
	        }
	        return -1;
	    };
	}

Array.prototype.unique =
  function() {
    var a = [];
    var l = this.length;
    for(var i=0; i<l; i++) {
      for(var j=i+1; j<l; j++) {
        // If this[i] is found later in the array
        if (this[i] === this[j])
          j = ++i;
      }
      a.push(this[i]);
    }
    return a;
  };
  
Array.prototype.diff =
  function() {
    var a1 = this;
    var a = a2 = null;
    var n = 0;
    while(n < arguments.length) {
      a = [];
      a2 = arguments[n];
      var l = a1.length;
      var l2 = a2.length;
      var diff = true;
      for(var i=0; i<l; i++) {
        for(var j=0; j<l2; j++) {
          if (a1[i] === a2[j]) {
            diff = false;
            break;
          }
        }
        diff ? a.push(a1[i]) : diff = true;
      }
      a1 = a;
      n++;
    }
    return a.unique();
  };
