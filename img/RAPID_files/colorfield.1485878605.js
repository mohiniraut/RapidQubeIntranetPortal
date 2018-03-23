var ColorPatternComponentDescriptions = {
	"horizontal": ["Left", "Right"], 
	"horizontalcycle": ["Outer", "Inner"], 
	"vertical": ["Top", "Bottom"], 
	"verticalcycle": ["Outer", "Inner"], 
	"diagup": ["Lower Left", "Upper Right"], 
	"diagupcycle": ["Outer", "Inner"], 
	"diagdown": ["Upper Left", "Lower Right"], 
	"diagdowncycle": ["Outer", "Inner"], 
	"radial": ["Inner", "Outer"], 
	"radialcycle": ["Ring", "Background"],
	"stripehor1by1": ["Background", "Stripe"],
	"stripehor1by2": ["Background", "Stripe"],
	"stripehor2by2": ["Background", "Stripe"],
	"stripehor2by4": ["Background", "Stripe"],
	"stripehor4by4": ["Background", "Stripe"],
	"stripehor4by8": ["Background", "Stripe"],
	"stripever1by1": ["Background", "Stripe"],
	"stripever1by2": ["Background", "Stripe"],
	"stripever2by2": ["Background", "Stripe"],
	"stripever2by4": ["Background", "Stripe"],
	"stripever4by4": ["Background", "Stripe"],
	"stripever4by8": ["Background", "Stripe"],
	"stripediagup1by1": ["Background", "Stripe"],
	"stripediagup1by2": ["Background", "Stripe"],
	"stripediagup2by2": ["Background", "Stripe"],
	"stripediagup2by4": ["Background", "Stripe"],
	"stripediagup4by4": ["Background", "Stripe"],
	"stripediagup4by8": ["Background", "Stripe"],
	"stripediagdown1by1": ["Background", "Stripe"],
	"stripediagdown1by2": ["Background", "Stripe"],
	"stripediagdown2by2": ["Background", "Stripe"],
	"stripediagdown2by4": ["Background", "Stripe"],
	"stripediagdown4by4": ["Background", "Stripe"],
	"stripediagdown4by8": ["Background", "Stripe"],
	"dots1by1": ["Background", "Dot"],
	"dots1by2": ["Background", "Dot"],
	"dots2by2": ["Background", "Dot"],
	"dots2by4": ["Background", "Dot"],
	"dots4by4": ["Background", "Dot"],
	"dots4by8": ["Background", "Dot"]
};

var ColorPatternDescriptions = {
	"none": "Plain Color",
	"horizontal": "Horizontal Gradient", 
	"horizontalcycle": "Horizontal Cycle Gradient", 
	"vertical": "Vertical Gradient", 
	"verticalcycle": "Vertical Cycle Gradient", 
	"diagup": "Diagonal Up Gradient", 
	"diagupcycle": "Diagonal Up Cycle Gradient", 
	"diagdown": "Diagonal Down Gradient", 
	"diagdowncycle": "Diagonal Down Cycle Gradient", 
	"radial": "Radial Gradient", 
	"radialcycle": "Radial Cycle Gradient",
	"stripehor1by1": "Horizontal Stripes - Thin",
	"stripehor1by2": "Horizontal Stripes - Thin Spaced",
	"stripehor2by2": "Horizontal Stripes - Medium",
	"stripehor2by4": "Horizontal Stripes - Medium Spaced",
	"stripehor4by4": "Horizontal Stripes - Thick",
	"stripehor4by8": "Horizontal Stripes - Thick Spaced",
	"stripever1by1": "Vertical Stripes - Thin",
	"stripever1by2": "Vertical Stripes - Thin Spaced",
	"stripever2by2": "Vertical Stripes - Medium",
	"stripever2by4": "Vertical Stripes - Medium Spaced",
	"stripever4by4": "Vertical Stripes - Thick",
	"stripever4by8": "Vertical Stripes - Thick Spaced",
	"stripediagup1by1": "Diag Up Stripes - Thin",
	"stripediagup1by2": "Diag Up Stripes - Thin Spaced",
	"stripediagup2by2": "Diag Up Stripes - Medium",
	"stripediagup2by4": "Diag Up Stripes - Medium Spaced",
	"stripediagup4by4": "Diag Up Stripes - Thick",
	"stripediagup4by8": "Diag Up Stripes - Thick Spaced",
	"stripediagdown1by1": "Diag Down Stripes - Thin",
	"stripediagdown1by2": "Diag Down Stripes - Thin Spaced",
	"stripediagdown2by2": "Diag Down Stripes - Medium",
	"stripediagdown2by4": "Diag Down Stripes - Medium Spaced",
	"stripediagdown4by4": "Diag Down Stripes - Thick",
	"stripediagdown4by8": "Diag Down Stripes - Thick Spaced",
	"dots1by1": "Small Dots",
	"dots1by2": "Small Dots Spaced",
	"dots2by2": "Medium Dots",
	"dots2by4": "Medium Dots Spaced",
	"dots4by4": "Large Dots",
	"dots4by8": "Large Dots Spaced"
};

var spritei = 0;

function getpatternoption(ColorPatternField, option, selectedOption) {
	var selectedTag = ((option == selectedOption) && "SELECTED") || "";
	var s = "<option class='colorpattern colorpattern-"+option+"' value='"+option+"' "+selectedTag+" onmouseover=\"gpu('"+ColorPatternField+"', '"+option+"');\">"+ColorPatternDescriptions[option]+"</option>";
	spriteIdx[ColorPatternField][option] = spritei;
	spritei++;
	return s;
}

function gpu (ColorPatternField, option) {
	var im = document.getElementById(ColorPatternField + "prev");
	// spriteIdx[ColorPatternField][option] sometimes null in IE, as well as when initializing (?)
	if (spriteIdx[ColorPatternField][option] !== undefined) { im.style.backgroundPosition = -parseInt(spriteIdx[ColorPatternField][option])*50 + "px 0px"; } 
}

function printpatternselect(ColorField, ColorPatternField, selectedOption, MustTileHorizontal, MustTileVertical, PatternsOnly, OrphanedSelector) {
	var textlines = [];
	var onchange = OrphanedSelector ? "" : "toggleColorType('"+ColorField+"', '"+ColorPatternField+"', this.selectedIndex);";
	textlines.push("<select name='"+ColorPatternField+"' id='"+ColorPatternField+"' onchange=\"gpu('"+ColorPatternField+"', this.options[this.selectedIndex].value); "+onchange+"\" style='width: 325px;'>");
	if (!PatternsOnly) {
		textlines.push(getpatternoption(ColorPatternField, "none", selectedOption));
		textlines.push('<optgroup label="Gradients">');
		if (MustTileHorizontal != "yes") {
			textlines.push(getpatternoption(ColorPatternField, "horizontal", selectedOption));
		} else { spritei++; }
		textlines.push(getpatternoption(ColorPatternField, "horizontalcycle", selectedOption));
		if (MustTileVertical != "yes") {
			textlines.push(getpatternoption(ColorPatternField, "vertical", selectedOption));
		} else { spritei++; }
		textlines.push(getpatternoption(ColorPatternField, "verticalcycle", selectedOption));
		if (MustTileVertical != "yes" && MustTileHorizontal != "yes") {
			textlines.push(getpatternoption(ColorPatternField, "diagup", selectedOption));
			textlines.push(getpatternoption(ColorPatternField, "diagupcycle", selectedOption));
			textlines.push(getpatternoption(ColorPatternField, "diagdown", selectedOption));
			textlines.push(getpatternoption(ColorPatternField, "diagdowncycle", selectedOption));
		} else { spritei=spritei+4; }
		textlines.push(getpatternoption(ColorPatternField, "radial", selectedOption));
		textlines.push(getpatternoption(ColorPatternField, "radialcycle", selectedOption));
		textlines.push('</optgroup>');
	} else { spritei = spritei + 11; }
	textlines.push('<optgroup label="Stripes">');
	textlines.push(getpatternoption(ColorPatternField, "stripehor1by1", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripehor1by2", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripehor2by2", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripehor2by4", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripehor4by4", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripehor4by8", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripever1by1", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripever1by2", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripever2by2", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripever2by4", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripever4by4", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripever4by8", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripediagup1by1", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripediagup1by2", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripediagup2by2", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripediagup2by4", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripediagup4by4", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripediagup4by8", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripediagdown1by1", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripediagdown1by2", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripediagdown2by2", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripediagdown2by4", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripediagdown4by4", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "stripediagdown4by8", selectedOption));
	textlines.push('</optgroup>');
	textlines.push('<optgroup label="Dots">');
	textlines.push(getpatternoption(ColorPatternField, "dots1by1", selectedOption));	
	textlines.push(getpatternoption(ColorPatternField, "dots1by2", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "dots2by2", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "dots2by4", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "dots4by4", selectedOption));
	textlines.push(getpatternoption(ColorPatternField, "dots4by8", selectedOption));
	textlines.push('</optgroup>');
	textlines.push('</select>');
	document.write(textlines.join("")); 

	$(function(){
		$('select#'+ColorPatternField).selectmenu({
			menuWidth: 325
		});
		$("li.colorpattern").bind('mouseover', function() {
			var arr = /colorpattern-([A-Za-z0-9-_]+)\s/.exec(this.className);
			gpu(ColorPatternField, arr[1]);
		});
	});    
}

function printmaincolors(mainColorField) {
	var output = '<table bgcolor="white" cellspacing="0" cellpadding="0"><tr>';
	var slen = shade.length;
	for (var i=1; i<=(slen-1); i++) {
		output += "<td class='pointer' ";
		if (shade[i] == "transp") { 
			output += 'colspan="5" '; 
		} else { 
			output += 'bgcolor="#' + shade[i] + '" ';		
		}
		 
		output += "onclick=\"clickmain('" + mainColorField + "', 'm" + shade[i] + "');\">";
		output += '<div id="m' + shade[i] + mainColorField + '" ';
		if (shade[i] == "transp") {
			output += 'class="lgcboxtranspwide s6 b" ';
		} else {
			output += 'class="lgcbox" ';
		}
		output += '>';
		if (shade[i] == "transp") { output += 'TRANSPARENT'; }
		output += '</div></td>';
		if ((i % colperline) == 0) { output += "</tr><tr>"; }
	}
	output += '</tr></table>';
	document.write(output);
}

function updatergb (mainColorField, colorField) {
	var enteredcolor = document.getElementById(colorField+"field").value;
	var pattern = /([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i;
	var resultent = enteredcolor.match(pattern);
	if (resultent != null) {
		document.getElementById("selected"+mainColorField+"-"+colorField).style.backgroundColor = "#" + enteredcolor;
		clickmain(mainColorField, enteredcolor);
		updateTinyMCEBackgroundColor(colorField, enteredcolor);
	}
}

function updateColorSlot (colorfield, slotfield) {
	var slotFieldId = slotfield + "field";
	var slotSpanId = "selected" + colorfield + "-" + slotfield;
	var enteredcolor = document.getElementById(slotFieldId).value;
	if (enteredcolor == "transp") {
		document.getElementById(slotSpanId).style.backgroundImage = "url("+MEDIA_URL+"images/transpcheck.png)";	
	} else {
		var pattern = /([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i;
		var resultent = enteredcolor.match(pattern);
		if (resultent != null) {
			document.getElementById(slotSpanId).style.backgroundColor = "#" + enteredcolor;
			document.getElementById(slotSpanId).style.backgroundImage = "";
			updateTinyMCEBackgroundColor(slotfield, enteredcolor);
		}
	}
}

function clickmain(mainColorField, clickedmaincolor) {
	var grey=0;
	var currmaincol = document.getElementById(currentmaincolor[mainColorField]+mainColorField);
	var clickedmaincol = document.getElementById(clickedmaincolor+mainColorField); 
	
	if (currmaincol) { currmaincol.style.borderColor = "#FFFFFF"; }
	if (clickedmaincol) { clickedmaincol.style.borderColor = "#000000"; }
	currentmaincolor[mainColorField] = clickedmaincolor;
	
	if (clickedmaincolor == 'mtransp' || clickedmaincolor == 'otransp' || clickedmaincolor == 'transp') {
		document.getElementById("subcolor"+mainColorField).innerHTML = "<div style='height: 106px; visibility: hidden;'></div";
		document.getElementById("step2"+mainColorField).innerHTML = "";
		document.getElementById(mainColorField+"field").value = "transp";
		document.getElementById("selected"+mainColorField+"-"+mainColorField).style.backgroundImage = "url("+MEDIA_URL+"images/transpcheck.png)";
		updateTinyMCEBackgroundColor(mainColorField, "transp");
		return;
	}
	
	var pattern = /([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i;
	var result = clickedmaincolor.match(pattern);	
	
	if (! result) { return; }
	
	var thecolor = result[1]+result[2]+result[3];
	
	var red = "0x"+result[1];
	var green = "0x"+result[2];
	var blue = "0x"+result[3];
	var red = parseInt(red,16);
	var green = parseInt(green,16);
	var blue = parseInt(blue,16);

	var redmin=0;var redmax=0;var greenmin=0;var greenmax=0;var bluemin=0;var bluemax=0;

	redmin = red - (step * numstep);
	redmax = red + (step * numstep);
	greenmin = green - (step * numstep);
	greenmax = green + (step * numstep);
	bluemin = blue - (step * numstep);
	bluemax = blue + (step * numstep);
	
	while (redmin < 0) {
		redmax = redmax + step; 
		redmin = redmin + step;
	}
	while (greenmin < 0) {
		greenmax = greenmax + step; 
		greenmin = greenmin + step;
	}
	while (bluemin < 0) {
		bluemax = bluemax + step; 
		bluemin = bluemin + step;
	}
	while (redmax > 255) {
		redmax = redmax - step; 
		redmin = redmin - step;
	}
	while (greenmax > 255) {
		greenmax = greenmax - step; 
		greenmin = greenmin - step;
	}
	while (bluemax > 255) {
		bluemax = bluemax - step; 
		bluemin = bluemin - step;
	}
	
	if ((red == green) && (red == blue)) { grey = 1; }
	if (grey == 1) { 
		redmin = red; 
		redmax = red; 
	}
	
	var divcontent = new Array();
	divcontent.push( "<table id=\"colorchoice" + mainColorField + "\" bgcolor=\"white\" cellpadding=\"7\" style=\"border: 1px solid black;\"><tr>" );

	var hexred = "00";
	var hexgreen = "00";
	var hexblue = "00";
	var hexcol = "000000";
	var ired = 0; var igreen = 0; var iblue = 0; 
	for (ired = redmin; ired <= redmax; ired=ired+step) {
		hexred = ired.toString(16); if (ired<16) { hexred = "0"+hexred; } 
		divcontent.push("<td><table bgcolor='white' cellspacing='1' cellpadding='0'>");
		for (igreen = greenmin; igreen <= greenmax; igreen=igreen+step) {
			hexgreen = igreen.toString(16); if (igreen<16) { hexgreen = "0"+hexgreen; } 
			divcontent.push("<tr>");
			for (iblue = bluemin; iblue <= bluemax; iblue=iblue+step) {
				hexblue = iblue.toString(16); if (iblue<16) { hexblue = "0"+hexblue; } 
				if (grey == 1) { 
					avg = (igreen + iblue)/2; 
					avg = avg + (igreen - iblue)/3;
					avg = parseInt(avg);
					if (avg<16) { avg = "0"+avg.toString(16); } else { avg = avg.toString(16); }
					hexcol = avg+avg+avg;
				} else {
					hexcol = hexred+hexgreen+hexblue;
				}
				
				divcontent.push("<td class='pointer' bgcolor=\"#"+hexcol+"\" onclick='clicksub(\""+mainColorField+"\", \""+hexcol+"\");'><img id=\""+hexcol+mainColorField+"\" src=\"" + MEDIA_URL + "images/18.gif\" width=\"18\" height=\"18\"></td>");
			}
			divcontent.push("</tr>");
		}	
		divcontent.push("</table></td>");
	}

	divcontent.push("</table>");
	document.getElementById("subcolor"+mainColorField).innerHTML = divcontent.join("");
	document.getElementById("step2"+mainColorField).innerHTML = "<span class='b s5'>2) Choose a specific one: &nbsp;&nbsp;&nbsp;&nbsp;</span>";
	clicksub(mainColorField, thecolor);
}

function clicksub(mainColorField, clickedsubcolor) {
	var currsubcol = document.getElementById(currentsubcolor[mainColorField]+mainColorField);
	var clicksubcol = document.getElementById(clickedsubcolor+mainColorField);
	 
	if (currsubcol) { currsubcol.src = MEDIA_URL + "images/18.gif";	}
	if (clicksubcol) { clicksubcol.src = MEDIA_URL + "images/18anim.gif"; }
	
	document.getElementById("colorchoice"+mainColorField).style.backgroundColor = "#" + clickedsubcolor;
	document.getElementById(mainColorField+"field").value = clickedsubcolor;
	document.getElementById("selected"+mainColorField+"-"+mainColorField).style.backgroundColor = "#" + clickedsubcolor;
	document.getElementById("selected"+mainColorField+"-"+mainColorField).style.backgroundImage = "";
	currentsubcolor[mainColorField] = clickedsubcolor;
	updateTinyMCEBackgroundColor(mainColorField, clickedsubcolor);
}

function toslot (mainColorField, slot) {
	selectedColor = document.getElementById(mainColorField+'field').value;
	document.getElementById(slot + 'field').value = selectedColor; 
	if (selectedColor == "transp") {
		document.getElementById("selected"+mainColorField+'-'+slot).style.backgroundImage = "url("+MEDIA_URL+"images/transpcheck.png)";
	} else {
		document.getElementById('selected'+mainColorField+'-'+slot).style.backgroundColor = '#' + selectedColor;
		document.getElementById('selected'+mainColorField+'-'+slot).style.backgroundImage = "";
	}
	updateTinyMCEBackgroundColor(slot, selectedColor);
}

function toggleColorAndGradient (mainColorField, fieldType) {
	var slotareaEl = document.getElementById(mainColorField+'-slotarea');
	var slotareaMessageEl = document.getElementById(mainColorField+'-slotarea-message');
	var slotareaArrowEl = document.getElementById(mainColorField+'-slotarea-arrow');
	if (slotareaEl && slotareaMessageEl && slotareaArrowEl) {
		if (fieldType == "color") {
			slotareaEl.style.display = "none";
			slotareaArrowEl.style.display = "none";
			slotareaMessageEl.style.display = "none";
		} else if (fieldType == "gradient") {
			slotareaEl.style.display = "block";
			slotareaArrowEl.style.display = "block";
			slotareaMessageEl.style.display = "block";
		}
	}
}

function toggleGradientDir (mainColorField, toggleField, direction) {
	if (typeof(colorFieldArray) == 'object' && ColorPatternComponentDescriptions[direction]) {
		for (var i=1; i<=colorFieldArray[mainColorField].length; i++) {
			document.getElementById(colorFieldArray[mainColorField][i-1]+"name").innerHTML = ColorPatternComponentDescriptions[direction][i-1];
		}
	}
}

function toggleColorType (mainColorField, ColorPatternField, colorTypeIndex) {
	if (colorTypeIndex == 0) {
		toggleColorAndGradient(mainColorField, 'color');
	} else {
		toggleColorAndGradient(mainColorField, 'gradient');
		toggleGradientDir(mainColorField, ColorPatternField + 'field', document.getElementById(ColorPatternField).options[colorTypeIndex].value );
	}
	document.getElementById(ColorPatternField).selectedIndex = colorTypeIndex;
}

function swapslots(ColorField, slot1, slot2) {
	var temp = document.getElementById(slot1+"field").value;
	document.getElementById(slot1+"field").value = document.getElementById(slot2+"field").value;
	document.getElementById(slot2+"field").value = temp;
	updateAllColorSlots(ColorField);
}

function updateAllColorSlots(ColorField) {
	if (colorFieldArray[ColorField].length > 0) {
		for (var i = 0; i < colorFieldArray[ColorField].length; i++) {
			updateColorSlot(ColorField, colorFieldArray[ColorField][i]);
		}
	}
}

function updateTinyMCEBackgroundColor (colorfield, color) {
	for (i in updateTinyMCEBoxFieldToColorField) { 
		if (updateTinyMCEBoxFieldToColorField[i] == colorfield) {
			var bx = document.getElementById(i+"_ifr");
			if (color == "transp") color = "ffffff";
			if (bx) bx.contentWindow.document.body.style.backgroundColor = "#"+color;
			var hi = document.getElementById(i+"_bgcolor");
			if (hi) { hi.value = color; }			
		}  
	}
}

function updateTinyMCEBackgroundColorFromField (editor_id, field) {
	if (!editor_id || !field) return;
	var bx = document.getElementById(editor_id+"_ifr");
	var f = document.getElementById(field+"field");
	if (!bx || !f) return;
	color = f.value;
	if (color == "transp") color = "ffffff";
	bx.contentWindow.document.body.style.backgroundColor = "#"+color;
	return color;
}
