//Format Text Editor Script File
//Date : 2013-3-25
//Author : ±Ë¿ÁºÆ


//Date : 2014-06
//Modifier : øÏ«˝¿± 

var FTE_Array = new Array();

//Key Board Event
var isENTER = false;
var isSHIFT = false;
var VK_ENTER=13;
var VK_SHIFT=16;


function initFTE() {
	if(!FTE_Array || FTE_Array.length < 1)
		return;
	
	for(var i=0; i<FTE_Array.length; i++) {
		try{
			var obj = document.getElementById(FTE_Array[i][0]);
			if(!obj) continue;
			FTE_Array[i][2] = new FormatTextEditor(obj);
			FTE_Array[i][2].init();
		} catch(e) {
			if(show_debug_msg && typeof show_debug_msg == 'function')
				show_debug_msg(e.message);
		}
	}
}

var colorPopupCB = null;
var selectedColor= null;
function colorCodeCB(obj) {

	if(!obj)
		return;
	if(colorPopupCB && typeof colorPopupCB == 'function') {
		colorPopupCB(obj.getAttribute('data'));
		selectedColor=obj.getAttribute('data');
	}
}


function GetObjOffset(obj, dir)
{
	if(!obj)
		return 0;
	
	if(dir == 'left') {
		if (obj.offsetParent == document.body)
			return obj.offsetLeft;
		else
			return obj.offsetLeft + GetObjOffset(obj.offsetParent, dir);
	} else if(dir == 'top') {
		if (obj.offsetParent == document.body)
			return obj.offsetTop;
		else
			return obj.offsetTop + GetObjOffset(obj.offsetParent, dir);
	} else
		return 0;
}

function FormatTextEditor(obj) {
	if(!obj)
		return;
		
	this.pId;
	this.width;
	this.height;
	this.pWidth;
	this.pHeight;
	this.offsetL;
	this.offsetT;
	
	this.imgUrl;
	this.defFontIdx;
	this.selFontType;
	this.fontTypeArr;
	this.defFontSizeIdx;
	
	this.ifrId;
	
	this.colorPopup;
	this.colorCodeArr;
	
	this.init = function() {
		this.colorPopup = null;
		this.colorCodeArr = new Array();
		this.colorCodeArr[0] = ["#FF0000", "#FF5E00", "#FFBB00", "#FFE400", "#ABF200", "#1DDB16", "#00D8FF"];
		this.colorCodeArr[1] = ["#0054FF", "#0100FF", "#5F00FF", "#FF00DD", "#FF007F", "#000000", "#FFFFFF"];
		
		this.width = 448;
		this.height = 100;
		
		this.offsetL = document.body.clientLeft + GetObjOffset(obj, 'left') -  document.body.scrollLeft;
		this.offsetT = document.body.clientTop + GetObjOffset(obj, 'top') - document.body.scrollTop;
		//alert(this.offsetL + ", " + this.offsetT);
		
		this.pId = obj.id;
		this.pWidth = obj.width ? parseInt(obj.width) : parseInt(obj.style.width);
		this.pHeight = obj.height ? parseInt(obj.height) : parseInt(obj.style.height);
		this.width = this.pWidth > this.width+2 ? this.pWidth-2 : this.width;
		this.height = this.pHeight;
		//alert(this.width + ", " + this.height);
		
		this.imgUrl = "../img/fte/";
		this.defFontIdx = 2;
		this.fontTypeArr = ["µ∏øÚ", "µ∏øÚ√º", "±º∏≤", "±º∏≤√º", "πŸ≈¡", "πŸ≈¡√º", "±√º≠", "Arial", "Tahoma", "Times New Roman", "Verdana"];
		this.selFontType = this.fontTypeArr[this.defFontIdx];
		this.defFontSizeIdx = 2;
		var inHtml = this.makeHtml();
		obj.innerHTML = inHtml;
		
		this.ifrId = this.pId+"_window";
		this.setIframe();
		this.eventMapping();
		
	}
	
	this.makeHtml = function() {
		var htmlStr = "";
		htmlStr += "<div id='"+this.pId+"_body' style='width:"+this.width+"px; height:"+this.height+"px; border:0px solid #cfcfcf;' onfocusin='ShowHide(this.id,1)' onfocusout='ShowHide(this.id,2)'>";
		
		//Icon Table
		htmlStr += "<table id='"+this.pId+"_Ptable' style='display:none' onmouseover=''><div id='properties'><tr>";
		//Font Type
		htmlStr += "<td><select id='"+this.pId+"_fontname' title='±€≤√' style='width:100px;height:26px; border:1px solid #cfcfcf; cursor:hand;' command='fontname'>";
		for(var i=0; i<this.fontTypeArr.length; i++) {
			htmlStr += "<option value='"+this.fontTypeArr[i]+"'";
			if(i == this.defFontIdx)
				htmlStr += " selected";
			htmlStr += ">"+this.fontTypeArr[i]+"</option>";
		}
		htmlStr += "</select></td>";
		//Font Size
		htmlStr += "<td><select id='"+this.pId+"_fontsize' title='±€¿⁄≈©±‚' style='width:43px;height:26px; border:1px solid #cfcfcf; cursor:hand;' command='fontsize'>";
		for(var i=0; i<7; i++) {
			htmlStr += "<option value='"+(i+1)+"'";
			if(i == this.defFontSizeIdx)
				htmlStr += " selected";
			htmlStr += ">"+(i+1)+"</option>";
		}
		htmlStr += "</select></td>";
		//Font Option
		htmlStr += "<td style='width:5px;'></td>";
		htmlStr += "<td>";
		htmlStr += "<img id='"+this.pId+"_fontbold' style='width:20px; vertical-align:middle; cursor:hand' title='±Ω∞‘' src='"+this.imgUrl+"fte_bold.png' command='bold' click='false' type='font'></img>";
		htmlStr += "<img id='"+this.pId+"_fontunderline' style='width:20px; vertical-align:middle; cursor:hand' title='πÿ¡Ÿ' src='"+this.imgUrl+"fte_underline.png' command='underline' click='false' type='font'></img>";
		htmlStr += "<img id='"+this.pId+"_fontitalic' style='width:20px; vertical-align:middle; cursor:hand' title='±‚øÔ¿”≤√' src='"+this.imgUrl+"fte_italic.png' command='italic' click='false' type='font'></img>";
		htmlStr += "</td>";
		//Font Color Option
		htmlStr += "<td><table>";
		htmlStr += "<tr><td><img id='"+this.pId+"_forecolor' style='width:15px; vertical-align:middle; cursor:hand' title='±€¿⁄ªˆ' src='"+this.imgUrl+"fte_forecolor_.png' command='forecolor' click='false' type='color'></img></td></tr>";
		htmlStr += "<tr><td id='"+this.pId+"_forecolor_td' style='width:15px; height:3px; background-color:#000000;'></td></tr>";
		htmlStr += "</table></td>";
		//Back Color Option
		htmlStr += "<td><table>";
		htmlStr += "<tr><td><img id='"+this.pId+"_backcolor' style='width:15px; vertical-align:middle; cursor:hand' title='πË∞Êªˆ' src='"+this.imgUrl+"fte_backcolor_.png' command='backcolor' click='false' type='color'></img></td></tr>";
		htmlStr += "<tr><td id='"+this.pId+"_backcolor_td' style='width:15px; height:3px; background-color:#ffffff;'></td></tr>";
		htmlStr += "</table></td>";
		
		//Indent, Outdent
		htmlStr += "<td style='width:10px;'></td>";
		htmlStr += "<td>";
		htmlStr += "<img id='"+this.pId+"_indent' style='width:20px; vertical-align:middle; cursor:hand' title='µÈø©æ≤±‚' src='"+this.imgUrl+"fte_indent.png' command='indent' click='false' type=''></img>";
		htmlStr += "<img id='"+this.pId+"_outdent' style='width:20px; vertical-align:middle; cursor:hand' title='≥ªæÓæ≤±‚' src='"+this.imgUrl+"fte_outdent.png' command='outdent' click='false' type=''></img>";
		htmlStr += "</td>";
		//Number List
		htmlStr += "<td><img id='"+this.pId+"_numberlist' style='width:20px; vertical-align:middle; cursor:hand' title='π¯»£ ∏≈±‚±‚' src='"+this.imgUrl+"fte_insertorderedlist.png' command='insertorderedlist' click='false' type='list'></img></td>";
		//Align
		htmlStr += "<td style='width:10px;'></td>";
		htmlStr += "<td>";
		htmlStr += "<img id='"+this.pId+"_lalign' style='width:20px; vertical-align:middle; cursor:hand' title='¡¬√¯¡§∑ƒ' src='"+this.imgUrl+"fte_justifyleft_click.jpg' type='align' command='justifyleft'></img>";
		htmlStr += "<img id='"+this.pId+"_calign' style='width:20px; vertical-align:middle; cursor:hand' title='∞°øÓµ•¡§∑ƒ' src='"+this.imgUrl+"fte_justifycenter.png' type='align' command='justifycenter'></img>";
		htmlStr += "<img id='"+this.pId+"_ralign' style='width:20px; vertical-align:middle; cursor:hand' title='øÏ√¯' src='"+this.imgUrl+"fte_justifyright.png' type='align' command='justifyright'></img>";
		htmlStr += "</td>";
		//Undo, Redo
		htmlStr += "<td style='width:10px;'></td>";
		htmlStr += "<td><img id='"+this.pId+"_undo' style='width:20px; vertical-align:middle; cursor:hand' title='Undo' command='undo' src='"+this.imgUrl+"fte_undo.jpg' onmouseover='this.src=\""+this.imgUrl+"fte_undo_mouseover.png\";' onmouseout='this.src=\""+this.imgUrl+"fte_undo.jpg\";'></img></td>";
		htmlStr += "<td><img id='"+this.pId+"_redo' style='width:20px; vertical-align:middle; cursor:hand' title='Redo' command='redo' src='"+this.imgUrl+"fte_redo.jpg' onmouseover='this.src=\""+this.imgUrl+"fte_redo_mouseover.png\";' onmouseout='this.src=\""+this.imgUrl+"fte_redo.jpg\";'></img></td>";
		htmlStr += "</tr>";
		htmlStr += "</div></table>";
		htmlStr += "<IFRAME id='"+this.pId+"_window' name='iframeNm' style='width:"+(this.width)+"px; height:"+(this.height-20)+"px; border:1px solid #cfcfcf;' onfocus=''  onfocusout='' ></IFRAME>";
		htmlStr += "</div>";				
		
		
		return htmlStr;
	}
	
	
	this.setIframe = function(mode) {		
		if(!this.ifrId)
			this.ifrId = this.pId + "_window";
		var ifr = document.getElementById(this.ifrId);
		
		
		var designMode = "on";
		if(mode == "off")
			designMode = "off";
		ifr.contentWindow.document.designMode = designMode;
	}
	

	
	/****************************************************************************************************/
	this.eventMapping = function() {

		this.evtBody();
		this.evtIframe();
		
		this.evtFontName();
		this.evtFontSize();
		this.evtFontBold();
		
		this.evtFontUnderline();
		this.evtFontItalic();
		
		this.evtFontColor();
		this.evtBackColor();
		
		this.evtIndent();
		this.evtOutdent();
		this.evtNumberList();
		
		this.evtLeftAlign();
		this.evtCenterAlign();
		this.evtRightAlign();
		
		this.evtUndo();
		this.evtRedo();
		
		
		
	}
	

	
	
	this.evtBody = function() {
		var obj = document.getElementById(this.pId+"_body");
		if(!obj)
			return;
		var tempThis = this;
		obj.onclick = function() {
			tempThis.closeColorPopup();
		}
	}
	
	this.evtIframe = function() {		
		var obj = document.getElementById(this.pId+"_window");
		if(!obj)
			return;
		var tempThis = this;
		obj.contentWindow.document.onclick = function() {
			tempThis.closeColorPopup();
		}
	}
	
	this.evtFontName = function(){
		var obj = document.getElementById(this.pId+"_fontname");
		if(!obj)
			return;
		var tempThis = this;
		obj.onchange = function() {
			var fontName = obj.options[obj.selectedIndex].value;
			tempThis.execCmd(obj.getAttribute('command'), fontName);
		}
	}
	
	this.evtFontSize = function() {
		var obj = document.getElementById(this.pId+"_fontsize");
		if(!obj)
			return;
		var tempThis = this;
		obj.onchange = function() {
			var fontSize = obj.options[obj.selectedIndex].value;
			tempThis.execCmd(obj.getAttribute('command'), fontSize);
		}
	}
	
	this.evtFontBold = function() {
		var obj = document.getElementById(this.pId+"_fontbold");
		if(!obj)
			return;
		var tempThis = this;
		obj.onclick = function() {
			tempThis.toggleImg(obj);
			tempThis.execCmd(obj.getAttribute('command'));
		}
	}
	
	this.evtFontUnderline = function() {
		var obj = document.getElementById(this.pId+"_fontunderline");
		if(!obj)
			return;
		var tempThis = this;
		obj.onclick = function() {
			tempThis.toggleImg(obj);
			tempThis.execCmd(obj.getAttribute('command'));
		}
	}
	
	this.evtFontItalic = function() {
		var obj = document.getElementById(this.pId+"_fontitalic");
		if(!obj)
			return;
		var tempThis = this;
		obj.onclick = function() {
			tempThis.toggleImg(obj);
			tempThis.execCmd(obj.getAttribute('command'));
		}
	}
	
	this.evtFontColor = function(event) {
		var obj = document.getElementById(this.pId+"_forecolor");		
		if(!obj)
			return;
		var tempThis = this;
			
		obj.onclick = function() {
		//	tempThis.execCmd(obj.getAttribute('command'), '#FF0000');
		//	return;
		if(!event)
				window.event.cancelBubble = true;
		if(event && event.stopPropagation)
				event.stopPropagation();
			
		tempThis.showColorPopup(this, function(colorCode) {
			tempThis.closeColorPopup();
			if(!colorCode)
					return;
			tempThis.execCmd(obj.getAttribute('command'), colorCode);
			
	
			});
			
	

		}
	}
	
	this.evtBackColor = function(event) {
		var obj = document.getElementById(this.pId+"_backcolor");
		if(!obj)
			return;
		var tempThis = this;
		obj.onclick = function() {
			if(!event)
				window.event.cancelBubble = true;
			if(event && event.stopPropagation)
				event.stopPropagation();
			
			tempThis.showColorPopup(this, function(colorCode) {
				tempThis.closeColorPopup();
				if(!colorCode)
					return;
				
				var td = document.getElementById(tempThis.pId+"_backcolor_td");
				td.style.backgroundColor = colorCode;
				tempThis.execCmd(obj.getAttribute('command'), colorCode);
			
			
				
			});
		}
	}
	
	this.evtIndent = function() {
		var obj = document.getElementById(this.pId+"_indent");
		if(!obj)
			return;
		var tempThis = this;
		obj.onclick = function() {
			tempThis.execCmd(obj.getAttribute('command'));
		}
	}
	
	this.evtOutdent = function() {
		var obj = document.getElementById(this.pId+"_outdent");
		if(!obj)
			return;
		var tempThis = this;
		obj.onclick = function() {
			tempThis.execCmd(obj.getAttribute('command'));
		}
	}
	
	this.evtNumberList = function() {
		var obj = document.getElementById(this.pId+"_numberlist");
		if(!obj)
			return;
		var tempThis = this;
		obj.onclick = function() {
			tempThis.toggleImg(obj);
			tempThis.execCmd(obj.getAttribute('command'));
		}
	}
	
	this.evtLeftAlign = function() {
		var obj = document.getElementById(this.pId+"_lalign");
		if(!obj)
			return;
		var tempThis = this;
		obj.onclick = function() {
			tempThis.toggleImg(obj);
			tempThis.execCmd(obj.getAttribute('command'));
		}
	}
	
	this.evtCenterAlign = function() {
		var obj = document.getElementById(this.pId+"_calign");
		if(!obj)
			return;
		var tempThis = this;
		obj.onclick = function() {
			tempThis.toggleImg(obj);
			tempThis.execCmd(obj.getAttribute('command'));
		}
	}
	
	this.evtRightAlign = function() {
		var obj = document.getElementById(this.pId+"_ralign");
		if(!obj)
			return;
		var tempThis = this;
		obj.onclick = function() {
			tempThis.toggleImg(obj);
			tempThis.execCmd(obj.getAttribute('command'));
		}
	}
	
	this.evtUndo = function() {
		var obj = document.getElementById(this.pId+"_undo");
		if(!obj)
			return;
		var tempThis = this;
		obj.onclick = function() {
			tempThis.execCmd(obj.getAttribute('command'));
		}
	}
	
	this.evtRedo = function() {
		var obj = document.getElementById(this.pId+"_redo");
		if(!obj)
			return;
		var tempThis = this;
		obj.onclick = function() {
			tempThis.execCmd(obj.getAttribute('command'));
		}
	}
	
	this.execCmd = function(cmd, opt) {
	
		var ifr = document.getElementById(this.ifrId);
		try{
			{	
				var sStr="";				
				
			    ifr.contentWindow.document.body.focus();
   			    ifr.contentWindow.document.execCommand(cmd, 0, opt);
			}
		} catch(e) {
			if(show_debug_msg && typeof show_debug_msg == 'function')
				show_debug_msg(e.message);
		}
		
	}
	/****************************************************************************************************/
	this.closeColorPopup = function() {
		this.colorPopup = null;
		this.removeElement(this.pId+"_colorcode");	
	
	}
	
	this.removeElement = function(id) {
		var elem = document.getElementById(id);
		if(!elem)
			return;
		return elem.parentNode.removeChild(elem);
	}
	
	this.showColorPopup = function(obj, cbFunc) {
		if(!obj)
			return;
		
		if(cbFunc && typeof cbFunc == 'function')
			colorPopupCB = cbFunc;
		
		if(this.colorPopup)
			this.closeColorPopup();
		
		this.colorPopup = document.createElement('DIV');
		this.colorPopup.setAttribute('id', this.pId+"_colorcode");
		this.colorPopup.style.position = 'absolute';
		this.colorPopup.style.display = 'block';
		
		var tempTop = this.offsetT+obj.parentNode.parentNode.parentNode.parentNode.parentNode.offsetTop+27;
		var tempLeft = this.offsetL+obj.parentNode.parentNode.parentNode.parentNode.parentNode.offsetLeft;
		this.colorPopup.style.top = tempTop + "px";
		this.colorPopup.style.left = tempLeft + "px";
		this.colorPopup.style.zIndex = 10000;
		this.colorPopup.style.paddingLeft = 3;
		this.colorPopup.style.paddingTop = 3;
		this.colorPopup.style.width = '105px';
		this.colorPopup.style.height = '40px';
		this.colorPopup.style.border = '1px solid #cfcfcf';
		this.colorPopup.style.backgroundColor = '#ffffff';
		
		var inHtml = "";
		inHtml += "<table cellspacing=1 cellpadding=0 id='colorTb'>";
		for(var i=0; i<this.colorCodeArr.length; i++) {
			inHtml += "<tr>";
			for(var j=0; j<this.colorCodeArr[i].length; j++) {
				inHtml += "<td>";		
				inHtml +="<input type='button' style='border:1x solid #747474 width:16px; height:15px; background-color:"+this.colorCodeArr[i][j]+"' data='"+this.colorCodeArr[i][j]+"'  onclick='colorCodeCB(this);'>";
				inHtml += "</td>";
			}
			inHtml += "</tr>";
		}
		inHtml += "</table>";
		this.colorPopup.innerHTML = inHtml;
		
		//show_debug_msg(this.colorPopup.innerHTML);
		document.body.appendChild(this.colorPopup);
		
	}
	
	this.toggleImg = function(obj) {
		if(!obj)
			return;
		
		var objCmd = obj.getAttribute('command');
		var objType = obj.getAttribute('type');
		if(objType == 'font' || objType == 'list') {
			if(obj.getAttribute('click') == 'false') {
				obj.setAttribute('click', 'true');
				obj.src = this.imgUrl+'fte_'+objCmd+'_click.jpg';
			} else {
				obj.setAttribute('click', 'false');
				obj.src = this.imgUrl+'fte_'+objCmd+'.png';
			}
		} else if(objType == 'align') {
			var td = obj.parentNode;
			for(var i=0; i<td.childNodes.length; i++) {
				var child = td.childNodes[i];
				if(child.nodeName == 'IMG')
					child.src = this.imgUrl+'fte_'+child.getAttribute('command')+'.png';
			}
			obj.src = this.imgUrl+'fte_'+objCmd+'_click.jpg';
		}
	}
	
	this.setHtmlData = function(htmlStr) {
		try {
			var ifr = document.getElementById(this.pId+"_window");
			ifr.contentWindow.document.body.innerHTML = htmlStr;
		} catch(e) {
			//show_debug_msg(e.message);
		}
	}
	
	this.getTextData = function() {		
		var retData = "";
		try {
			var ifr = document.getElementById(this.pId+"_window").contentWindow.document.body;
			retData = ifr.innerText;
		} catch(e) {
			//show_debug_msg(e.message);
		}
		return retData;
	}
	
	this.getHtmlData = function() {
		var retData = "";
		try {
			var ifr = document.getElementById(this.pId+"_window").contentWindow.document.body;			
			retData = ifr.innerHTML;
		} catch(e) {
			//show_debug_msg(e.message);
		}
		return retData;
	}
}
function 	frameFocus(id){
	id=id.split('_window');
		var obj=document.getElementById(id[0]+"_Ptable");
		
		if(!obj)
		{
			alert("return");
			return;
		}
	


}

this.SetCaretAtEnd= function(elem) {
        var elemLen = elem.contentWindow.document.body.innerText.length;
        // For IE Only
        if (elem.contentWindow.document.selection) {
            // Set focus
            elem.focus();
            // Use IE Ranges
            var oSel = elem.contentWindow.document.body.createTextRange();
            // Reset position to 0 & then set at end
            oSel.moveStart('character', -elemLen);
            oSel.moveStart('character', elemLen);
            oSel.moveEnd('character', 0);
            oSel.select();
        }
}



function ShowHide(id, flag){

	var newid=id.split('_body')[0];
	var propertyId=newid+"_Ptable";
	
	var fLen=document.iframeNm.length;
	
		
	if(flag==1)
	{	
		if(fLen==0)
		{
			document.getElementById(propertyId).style.display='block';			
		}
		else
		{			
			for(var i=0; i<fLen; i++)
			{
				var nmId=document.iframeNm[i].id.split('_window')[0]+"_Ptable";
				if(nmId==propertyId)
					document.getElementById(propertyId).style.display='block';
				else
					document.getElementById(nmId).style.display='none';					
			}
		}		
	}
	else if(flag==2)
	{
			document.getElementById(propertyId).style.display='none';
	}

}


