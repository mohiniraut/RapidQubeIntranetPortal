 
var oldimgid = "";
var defaultFontXOffset = {"REGULAR": 0, "DISPLAY": -640, "SCRIPT": -1120, "SPECIAL": -1600 };
var lastMyFontsIndex = 0;

function updateFontSelection (fontname, readBI) {
	var myFontPrev = document.getElementById("favpreview");
	var ftype = "";
	var fnum = "";
	var fb = "";
	var fi = "";
	pattern = /(REGULAR|DISPLAY|SCRIPT|SPECIAL)(\d{1,2})(b*)(i*)\.ttf/i;
	var result = "";
	result = fontname.match(pattern); 
	if ( result != null ) {
		ftype = result[1];
		fnum = result[2];
		fb = result[3];
		fi = result[4];
		fontBoldCheck = document.getElementById(ftype+fnum+"b");
		fontItalicCheck = document.getElementById(ftype+fnum+"i");
		if ( fontBoldCheck ) {
			if (readBI) {
				if (fb) { 
					fontBoldCheck.checked = true;
					boldX = -160;
				} else {
					fontBoldCheck.checked = false;
					boldX = 0;
				}
			} else {
				if (fontBoldCheck.checked) {
					boldX = -160;
				} else {
					boldX = 0;
				}
			}
		} else {
			boldX = 0;
		}
		if ( fontItalicCheck ) {
			if (readBI) {
				if (fi) { 
					fontItalicCheck.checked = true;
					italicX = -320;
				} else {
					fontItalicCheck.checked = false;
					italicX = 0;
				}
			} else {
				if (fontItalicCheck.checked) {
					italicX = -320;
				} else {
					italicX = 0;
				}
			}
		} else {
			italicX = 0;
		}
		fontname = ftype + fnum + (fontBoldCheck && fontBoldCheck.checked ? "b":"") + (fontItalicCheck && fontItalicCheck.checked ? "i":"") + ".TTF";
		
		var imgX = boldX + italicX;
		var imgY = defaultFontXOffset[ftype] - (40*(fnum-1));	
		defFontBGPosition = imgX + "px " + imgY + "px";
		var defaultFontImage = document.getElementById("img"+ftype+fnum);
		var defaultFontButton = document.getElementById("button"+ftype+fnum);
		var oldDefaultFontImage;
		if (oldimgid) oldDefaultFontImage = document.getElementById(oldimgid);
	 	if (defaultFontImage) {
	 		if (oldDefaultFontImage) { oldDefaultFontImage.style.borderColor = "#ffffff"; }
	 		defaultFontImage.style.borderColor = "#000000";
	 		defaultFontImage.style.backgroundPosition = defFontBGPosition;
	 		oldimgid = "img"+ftype+fnum;
		 	document.form.font.value = fontname;
	 	}
	 	if (defaultFontButton) { defaultFontButton.checked = true; }
		// Update the preview graphic
		myFontPrev.style.background = "url(" + MEDIA_URL + "generate/previews/generators/Generator-300000-main.png)";
		myFontPrev.style.backgroundPosition = defFontBGPosition;
	} else {
		var oldDefaultFontImage;
		if (oldimgid) oldDefaultFontImage = document.getElementById(oldimgid);
		if (oldDefaultFontImage) { oldDefaultFontImage.style.borderColor = "#ffffff"; }
		oldimgid = "";		
	}
	
	// Check if fontname is in "MyFonts"
	if (myFonts[fontname]) {
		prevPath = myFonts[fontname]["previewpath"];
		prevFilename = myFonts[fontname]["previewfilename"];
		try {  // craches IE6 !!
			document.getElementById("myf-"+fontname).selected = true;
		}
		catch (ex) {}
		if (prevPath != "def") {
			var url = MEDIA_URL + prevPath + prevFilename;
			myFontPrev.style.background = "url(" + url + ")";
			myFontPrev.style.backgroundPosition = "0px 0px";
		}
		document.form.font.value = fontname;
		document.getElementById("fontdellink").onclick = function() { sendReq("/generate/removefrom/?font="+document.form.font.value, reqFontList ); return false; };
		lastMyFontsIndex = document.form.cfonts.selectedIndex;
	} else {
		document.getElementById("myFontsNone").selected = true;
		lastMyFontsIndex = 0;
	}
	
}

function updateMyFonts() {
	var i = document.getElementById("fonthidden");
	if (i.contentDocument) {
		var d = i.contentDocument;
	} else if (i.contentWindow) {
		var d = i.contentWindow.document;
	} else {
		var d = window.frames["fonthidden"].document;
	}
	if (d.location.href == "about:blank") {
		return;
	}

	fontList = eval(d.body.innerHTML);
	try {
		fontList = fontList.reverse();
	}
	catch (e) {}

	if (fontList == "none") { return true; }
	if (fontList == null) { return true; }
	var myf = document.getElementById("cfonts");
	while (myf.options.length) { myf.options[0] = null; }
	var newOp = document.createElement('option');
	newOp.id = "myFontsNone";
	newOp.value = "";
	newOp.innerHTML = " ";
	myf.appendChild(newOp);
	for (i=0; i<fontList.length; i++) {
		previewpath = fontList[i][0];
		previewfilename = fontList[i][1];
		fontfilename = fontList[i][2];
		var newOp = document.createElement('option');
		newOp.id = "myf-" + fontfilename;
		newOp.value = fontfilename;
		newOp.innerHTML = fontfilename;
		myf.appendChild(newOp);
		if (i == 0) { newOp.selected = true; }
		myFonts[fontfilename] = {"previewpath": previewpath, "previewfilename": previewfilename};
	}
	document.form.font.value=document.form.cfonts.value;
	if (document.form.cfonts[lastMyFontsIndex]) {
		document.form.cfonts[lastMyFontsIndex].selected = true;
	} else {
		document.form.cfonts[lastMyFontsIndex-1].selected = true;
	}
	updateFontSelection(document.form.cfonts.value, true);
	return true;
}

function toggleCheckbox(el_id) {
	var el = document.getElementById(el_id);
	if (el.checked == true)  { el.checked = false; }
	else { el.checked = true; }
}

function printdefaultfonts() {
	var numFonts = {"REGULAR": 16, "DISPLAY": 12, "SCRIPT": 12, "SPECIAL": 12 };
	var categs = ["REGULAR", "DISPLAY", "SCRIPT", "SPECIAL"];
	var fontsperrow = 4;
	var subtext = "";
	var regbold = new Array ("null","1","0","1","1","0","1","1","1","1","1","1","1","1","1","1","1");
	var regital = new Array ("null","1","0","1","0","1","1","1","1","1","1","1","1","1","1","1","1");
	var output = "<table border=0 cellspacing=0 cellpadding=2>";
	var totalfonts=0;
	for (var ci=0; ci<4; ci++) {
		categ = categs[ci];
		output += "<tr>";
		for (var i=1; i<=numFonts[categ]; i++) {
			
			var bufInt = "";
			subtext = "";
			if (categ == "REGULAR") {
				if (regbold[i] == 1) { 
					subtext += "<input type=checkbox ID=REGULAR"+i+"b onclick=\"updateFontSelection('REGULAR"+i+".TTF');\"><span class='b pointer' onclick='toggleCheckbox(\"REGULAR"+i+"b\");'><a href='#' onclick='return false;'>Bold</a></span>";
				}
				if (regital[i] == 1) { 
					subtext += "<input type=checkbox ID=REGULAR"+i+"i onclick=\"updateFontSelection('REGULAR"+i+".TTF');\"><span class='i pointer' onclick='toggleCheckbox(\"REGULAR"+i+"i\");'><a href='#' onclick='return false;'>Italic</a></span>";
				}
			}
			bufInt += "<td align=center onclick=\"updateFontSelection('"+categ+i+".TTF');\"><input type=radio ID=button"+categ+i+" name=fontselect value="+categ+i+"><br></td>";
			bufInt += "<td valign=top class='pointer' onclick=\"updateFontSelection('"+categ+i+".TTF');\"><a href='#' onclick='return false;'><div id=img"+categ+i+" class=fontsel style='background-position: 0px -"+( totalfonts*40 )+"px' onclick=\"updateFontSelection('"+categ+i+".TTF');\"></div></a>"+subtext+"</td>";
			if (i % fontsperrow == 0) { bufInt += "</tr>"; }
			output += bufInt;
			totalfonts += 1;
		}
		
		output = output + "</tr><tr><td colspan="+(fontsperrow*2)+"><hr></td></tr>";
	}
	output = output + "</table>";
	document.write(output);

}

function reqFontList() {
	var i = document.getElementById("fonthidden");
	if (i.contentDocument) { 
		var d = i.contentDocument;
	} else if (i.contentWindow) {
		var d = i.contentWindow.document;
	} else {
		var d = window.frames["fonthidden"].document;
	}
	d.location.href = "/generate/returncookieitemlist/fonts/";
	return true;	
}
