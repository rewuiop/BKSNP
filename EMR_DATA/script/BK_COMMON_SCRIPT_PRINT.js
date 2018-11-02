var G_PRNDATA=new Array();
var M_G_E = new Array();
var HtmlCanObjCheck = document.createElement('canvas');
//var HtmlCtxCheck = HtmlCanObjCheck.getContext;
//var AppletTagCheck=0;
var SERVERPORT = "";
document.write("<script src='../script/BK_COMMON_FUNC.js' type='text/javascript'></script>");
document.write("<script src='../script/BK_EXTEND_FUNC.js' type='text/javascript'></script>");
document.write("<script src='../script/user_defined_func.js' type='text/javascript'></script>");
document.write("<script src='../script/BK_PRINT_SCRIPT.js' type='text/javascript'></script>");
document.write("<script>document.oncontextmenu=function(){return false;}</script>");
document.body.oncontextmenu=function(){return false;}
document.onkeydown = keyboardEvent;
document.onkeyup = keyboardEvent;
function keyboardEvent(){
		if(event.keyCode==116 || event.keyCode==8){
			return false;
		}
	}
 
 function fn_alertPdfPath(p)
{
    alert(p);
}
 
function fn_gxtd(x0)
{
	if(x0!=null&&x0.firstChild)
		return x0.firstChild.data;
	return "";
}

 
function show_debug()
{
	var x1 = document.getElementById('bk_debug_area');
	if(x1)
	{
		x1.style.display='block';
	}
}
 
 
function fn_gsdfxd(x1)
{
	var x2=fn_fprbc(x1.getAttribute("controlId"));
	if(x2<0)
		return "";
	if(ParsingRule[x2][2] != 8)
		return "";
	if(ParsingRule[x2][3] != 6 && ParsingRule[x2][3] != 7)
		return "";
	var x3=x2+1;
	var x5=ParsingRule.length;
	var x6="";
	var x8="";
	var x7=ParsingRule[x2][4];
	while(x3<x5)
	{
		if(ParsingRule[x3][4] == x7 )
			break;
		if(ParsingRule[x3][4] == x7+1 && (ParsingRule[x3][2] ==5 || ParsingRule[x3][2] ==4))
		{
			var x11=CSX_X2.length;
			var x12=0;
			for(x12=0; x12<x11; x12++)
			{
				x6 = "";
				if(ParsingRule[x3][9] == CSX_X2[x12].getAttribute("controlId"))
				{
					var x21=CSX_X2[x12].getElementsByTagName("VALUE");
					var x22=x21.length;
					var x23=0;
					for(x23=0;x23<x22;x23++)
					{
						if(x23==0)
						{
							x6 += fn_gxtd(x21[x23]);
						}
						else
							x6 += ", " + fn_gxtd(x21[x23]);
						x6 += fn_gsdfxd(x21[x23]);
					}
					if(x6 != "")
					{
						var x24 = CSX_X2[x12].getElementsByTagName("UNIT");
						if(x24.length >0)
							x6 += " "+fn_gxtd(x24[0]);

						if(ParsingRule[x3][21])
						{
							if(ParsingRule[x3][21] == ":")
								x6 = " " + ParsingRule[x3][21] + " " + x6;
							else if(ParsingRule[x3][21] == "()")
								x6 = " (" + x6 + ") ";
						}
						if(x8 != "")
							x8 += ", "
						x8 += ParsingRule[x3][17] +" "+ x6 +" "+ ParsingRule[x3][18];
					}
				}
			}
		}
		x3++;
	}
	if(x8=="")
		return "";
	else
		return "("+x8+")";
}

function fn_panel(flag,x1,pXml) //우혜윤
{
	var x2=document.getElementById("IFRAME_"+x1).contentWindow;
	if(flag==1)//저장할때 
	{		
		if(x2 == null)
			return "";
			 
		var x3= x2.SaveValue();
		
		return x3;
	}
	else if(flag==2)//수정될때
	{
		if(x2==null)
			return "";
		
		var x3=x2.LoadValue(pXml);
	}
}

function fn_cvbax(pn, ax1, x10){
	var co1;
	var x11;
	var formText=ax1.getAttribute("FORMATTEXT");
	if(formText)
	{
		co1 = document.getElementById(ParsingRule[pn][0]+x10);
		if(co1)
		{
			co1.innerHTML=formText;
		}
		setOldValue(pn,ax1,x10);
		return 1;
	}
	var ch1 = ax1.getElementsByTagName("VALUE");
	if(ch1.length > 0)
		x11 =1;
	else
		x11 =0;
		
	var a=0;
	switch(ParsingRule[pn][3])
	{
		case 14:
			{
				var ch2 = ax1.getElementsByTagName("HTML_VALUE");
				if(ch2.length > 0) {
					co1 = document.getElementById("VAL_"+ParsingRule[pn][0]);
					co1.innerHTML = fn_gxtd(ch2[0])
				}
			}
			break;
		case 0:
		  if(ParsingRule[pn][2] == 9)
		  {
		  	if(ch1.length > 0)
			 {
				var x12 =fn_gxtd(ch1[0]);
				var x13 =x12.split(":");
				var x15=x13[1].split("|@|");

				if(x13.length>=1)
				{
					//var imgDiv = document.getElementById("IM_"+ParsingRule[pn][0]+x10);
					var x14 = document.getElementById("IMR_"+ParsingRule[pn][0]+x10);
					//x14.style.width = imgDiv.style.width;
					//x14.style.height = imgDiv.style.height;
					//x14.id = "IMR_"+ParsingRule[pn][0]+x10;
					//x14.src='';
					if(x14)
					{
				  	x14.src=SERVERPRO+SERVERIP+x13[0];
						x14.setAttribute('src', SERVERPRO+SERVERIP+x13[0]);
				  	//imgDiv.innerHTML = x14.outerHTML;
					}
				}
			}
		 }
		 else
		 { 
			co1 = document.getElementById("VAL_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				if(ch1.length > 0)
				{
					var x12,x13,x14;
					if(ParsingRule[pn][21])
					{
						x14 = ParsingRule[pn][21];
					}
					else
					{
						x14 = "";
					}

					if(x14=="(+)")
					{
						co1.innerText += "(+)";
					//	co1.setAttribute("value", co1.getAttribute("value")+"(+)");
						break;
					}

					x13="";
					var textAreaHeight = "";	
					for(x12=0; x12 <ch1.length; x12++)
					{
						var x15 = fn_gxtd(ch1[x12]);
						if(ch1[x12].attributes.length == 3)
						{
							if(ch1[x12].attributes[ch1[x12].attributes.length-1].nodeName.toUpperCase()=="HEIGHT")
							{
								textAreaHeight = ch1[x12].attributes[ch1[x12].attributes.length-1].value;
							}
						}
						if(x14==":")
						{
							if(x12==0)
								x15 = " : "+x15;
						}
						else if(x14=="()")
							x15 = " ("+x15+") ";
						
						
						// ny_0513_추가 // Dynamic일때
						var selChk = ch1[x12].getAttribute("selectChecked");
						if(selChk != null)
						{
							if(selChk==1)
							{
								if(x13!="")
								{
									x13 += ", "+x15;
								}
								else
								{
									//x13 = ParsingRule[pn][17]+x15;
									x13 = x15;
								}
							}
						}
						
						else //일반 옵션일때 
						{
							if(x12>0)
							{
								x13 += ", "+x15;
							}
							else
							{
								//x13 = ParsingRule[pn][17]+x15;
								x13 = x15;
							}
						}
						/*	ny_0513_원본주석
						if(x12>0)
						{
							x13 += ", "+x15;
						}
						else
						{
							//x13 = ParsingRule[pn][17]+x15;
							x13 = x15;
						}
							*/
						x13 += fn_gsdfxd(ch1[x12]);
					}

					var unitStr = "";
					ch1 = ax1.getElementsByTagName("UNIT");
					if(ch1.length >0)
					{
						//x13 += " "+fn_gxtd(ch1[0]);
						unitStr = fn_gxtd(ch1[0]);//"&nbsp;<span id='UNIT_"+ParsingRule[pn][0]+"' >"+fn_gxtd(ch1[0])+"</span>";
					}
					/*
					if(ParsingRule[pn][22] == 1)
						co1.innerText = ParsingRule[pn][17]+" "+x13+" "+ParsingRule[pn][18];
					else
					*/
					if(ParsingRule[pn][2] == 4 )
					{
						/*
						if(unitStr != "")
						{
							co1.innerText = ParsingRule[pn][17]+" "+x13+" ☆★※★☆ "+ParsingRule[pn][18];
							co1.innerHTML = co1.innerHTML.replace("☆★※★☆", "<span id='UNIT_"+ParsingRule[pn][0]+"'>"+unitStr+"</span>");
						}
						else
							co1.innerText = ParsingRule[pn][17]+" "+x13+" "+ParsingRule[pn][18];
						//co1.innerText = ParsingRule[pn][17]+" "+x13+" <span id='UNIT_"+ParsingRule[pn][0]+"'>"+unitStr+"</span> "+ParsingRule[pn][18];
						//co1.setAttribute("value", ParsingRule[pn][17]+" "+x13+" "+ParsingRule[pn][18]);
						*/
						var newHTML = "<span id='pre'>"+ParsingRule[pn][17]+"&nbsp;</span>";
						newHTML += "<span id='value' style='display:inline-block;word-break:break-all;'>"+x13+"</span>";
						if(unitStr)
							newHTML += "<span id='unit'>&nbsp;"+unitStr+"</span>";
						newHTML += "<span id='append'>&nbsp;"+ParsingRule[pn][18]+"</span>";
						co1.innerHTML = newHTML;
					}
					else
					{
						//if(ParsingRule[pn][9]=="1049146")
							//alert("최종 : "+x13);
						co1.innerText = x13;
						//alert(co1.style.height);
						/*if(x13.split('\n').length!=1)
							co1.style.height = parseInt(x13.split('\n').length+1)*20+'px';
						else
							co1.style.height = textAreaHeight;*/
						//co1.outerHTML += " "+unitStr;
						//co1.innerHTML = x13 + " " +unitStr;
					//	co1.setAttribute("value", x13);
					}
				}
				else
				{
					if(ParsingRule[pn][21])
					{
						var x14 = ParsingRule[pn][21];
					}
					else
					{
						x14 = "";
					}

					if(x14=="(+)")
					{
						co1.innerText = "(-)";
				//		co1.setAttribute("value", "(-)");
						break;
					}
					else
					{
						co1.innerText = "";
				//		co1.setAttribute("value", "");
					}
				}
			}
		}
			break;
		case 1:
		case 2:
			co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				if(ch1.length > 0) {
					co1.value = fn_gxtd(ch1[0]);
				//	co1.setAttribute('value', fn_gxtd(ch1[0]));
				}
				else {
					co1.value = "";
				//	co1.setAttribute('value', '');
				}
			}
			break;
		case 3:
			co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				if(ch1.length > 0)
				co1.innerText = fn_gxtd(ch1[0]);
					//co1.value = fn_gxtd(ch1[0]);
				else {
					co1.value = "";
				//	co1.setAttribute('value', '');
				}
			}
			break;
		case 4:
		case 9:
			co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				if(ch1.length > 0)
				{
					co1.innerText =fn_gxtd(ch1[0]);
				//	co1.setAttribute('value', fn_gxtd(ch1[0]));
					/*
					var dateStr = new Date(ch1[0].text);
					if(dateStr != NaN)
						co1.innerText = dateStr;
					else
						co1.innerText = "";
					}
					else
						co1.innerText = "";*/
				}
			}
			break;
		case 5:
			for(i=0; i < ch1.length; i++)
			{
				var pn1 = fn_fprbc(ch1[i].getAttribute("controlId"));
				if(pn1 <0) continue;
				co1 = document.getElementById(ParsingRule[pn1][0]+x10);
				if(co1 == null) continue;
				co1.selected = "selected";
				co1.setAttribute('selected', 'selected');
				/*
				var pNode = co1.parentElement;
				var selIndex = pNode.selectedIndex;
				pNode.onchange = function() {
					this.selectedIndex = selIndex;
				}
				*/
				var i=0;
				var pNode = co1.parentElement;
				while(i<pNode.options.length) {
					var selIndex = pNode.selectedIndex;
					if(i==selIndex) {
						i++;
						continue;
					}

					pNode.removeChild(pNode.options[i]);
					i=0;
				}
			}
			break;
		case 6:
		case 7:
			/*for(i=0; i < ch1.length; i++)
			{
				var pn1 = fn_fprbc(ch1[i].getAttribute("controlId"));
				if(pn1 <0) continue;
				co1 = document.getElementById(ParsingRule[pn1][0]+x10);
				if(co1 == null) continue;
				co1.checked = "checked";
				co1.setAttribute('checked', 'checked');
			}*/
				for(i=0; i < ch1.length; i++)
			{
				var pn1 = fn_fprbc(ch1[i].getAttribute("controlId"));
				if(pn1 <0) continue;
				co1 = document.getElementById(ParsingRule[pn1][0]+x10);
				if(co1 == null) continue;
				co1.checked = "checked";
				
				
				if(document.compatMode == 'CSS1Compat')
				{
				co1.style.backgroundColor = 'black';
			   }
				
			
			}
			break;
		case 8:
			co1 = document.getElementById("INPUTU1_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				if(ch1.length > 0)
					co1.innerText =fn_gxtd(ch1[0]);
				else
					co1.innerText = "";
			}
			ch1 = ax1.getElementsByTagName("UNIT");
			if(ch1.length <=0)
				break;
			var pn1 = fn_fprbc(ch1[0].getAttribute("controlId"));
			if(pn1 <0)
				break;
			co1 = document.getElementById(ParsingRule[pn1][0]+x10);
			if(co1 == null)
				break;
			co1.selected = "selected";
			co1.setAttribute('selected', 'selected');
			break;
		case 10:
			co1 = document.getElementById("VAL_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				if(ch1.length > 0 && fn_gxtd(ch1[0]) != "")
					co1.innerText += "(+)";
				else
					co1.innerText += "(-)";
			} 
			else
			{
				co1 = document.getElementById("CHECK_"+ParsingRule[pn][0]+x10+"_0");
				if(co1 != null)
				{
					if(ch1.length > 0 && fn_gxtd(ch1[0]) != "") {
						co1.checked = "checked";
						co1.setAttribute('checked', 'checked');
					}
					else {
						co1.checked = "";
						co1.setAttribute('checked', '');
					}
				}
			}
			break;
		case 11:
		case 12:
				if(ch1.length > 0)
				{
					var x12;
					var x13;
					x12 = BIR_INFO.length;
					for(x13=0;x13<x12;x13++)
					{
						if(BIR_INFO[x13][0] == ParsingRule[pn][0])
							break;
					}
					if(x13 == x12)
						break;
					for(x12=0; x12 <ch1.length; x12++)
					{
						fn_addImg(x13, fn_gxtd(ch1[x12]), 0);
					}
				}
			break;
		case 22:	//SignPad
		case 17:
				/*if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0)
				{
					var imgDiv = document.getElementById("SP_"+ParsingRule[pn][0]+x10);
					var x8;
					if(imgDiv)
					{
						x8 = document.createElement("img");
						x8.style.width = imgDiv.style.width;
						x8.style.height = imgDiv.style.height;
						x8.id = "IMG_"+ParsingRule[pn][0]+x10;
						x8.src='';
					}
					else
						x8 = document.getElementById("IMG_"+ParsingRule[pn][0]+x10);
					
					if(x8 !=null)
					{
				  		x8.src=fn_gxtd(ch1[0]);
				  		x8.setAttribute('src', fn_gxtd(ch1[0]));
				  		if(imgDiv)
				  			imgDiv.innerHTML = x8.outerHTML;
					}
					
				}
				else*/
				{
	  			x8 = document.getElementById("IMG_"+ParsingRule[pn][0]+x10);
		  		if(x8 !=null)
					{
				  		x8.src=fn_gxtd(ch1[0]);
				  		x8.setAttribute('src', fn_gxtd(ch1[0]));
					}
				}
  			break;
  		case 13:
	  		{
	  			var i=pn-1;
	  			while(i>=0)
	  			{
	  				if((ParsingRule[pn][4]-1) == ParsingRule[i][4])
	  					break;
	  				i--;
	  			}
	  			var x18 = document.getElementById("APP_"+ParsingRule[i][0]+x10);
		  		if(x18 == null)
		  		{
		  			return;
		  		}

		  		x18.setValueById(ParsingRule[x2][0], val1);
	  		}
	  		break;
		case 16:
			{
				var x13;
				var x14=ch1.length;
				var x15="", x16="", x17="", x18="";
				for(x13=0; x13<x14; x13++)
				{
					var x12 = ch1[x13].getAttribute("controlId");
					if(x12<7 || x12==28)
					{
						if(x15 != "")
							x15 += ",";
						if(x12<28)
							x15 += (7-x12);
						else
						{
							if(x15 != "")
								x15 = "8," + x15;
							else
								x15 = "8"
						}
					}
					else if(x12<14 || x12==29)
					{
						if(x16 != "")
							x16 += ",";
						if(x12<28)
							x16 += (x12-6);
						else
							x16 += "8";
					}
					else if(x12<21 || x12==30)
					{
						if(x17 != "")
							x17 += ",";

						if(x12<28)
							x17 += (21-x12);
						else
						{
							if(x17 != "")
								x17 = "8," + x17;
							else
								x17 = "8"
						}
					}
					else if(x12<28 || x12==31)
					{
						if(x18 != "")
							x18 += ",";
						if(x12<28)
							x18 += (x12-20);
						else
							x18 += "8";
					}
				}
				for(x13=1; x13<5; x13++)
				{
					var x12 = document.getElementById(ParsingRule[pn][0]+"_"+x13);
					if(x12 != null)
					{
						switch(x13)
						{
						case 1:
							x12.innerText = x15;
							break;
						case 2:
							x12.innerText = x16;
							break;
						case 3:
							x12.innerText = x17;
							break;
						case 4:
							x12.innerText = x18;
							break;
						}
					}
				}
			}
  			break;
  		case 18:
  		case 19:
	  		if(ch1.length > 0)
			{
				var x12 =fn_gxtd(ch1[0]);
				var x13 =x12.split(":");
				if(x13.length>=1)
				{
					var x14=document.getElementById("IMR_"+ParsingRule[pn][0]+x10);
					if(x14)
					{
						x14.src=SERVERPRO+SERVERIP+x13[0];
						x14.setAttribute('src', SERVERPRO+SERVERIP+x13[0]);
					}
				}
			}
	  		break;
	  		
	  		/*
	  	case 20:	
	  		if(ch1.length > 0)
				{					
			
					var pXml=ch1.context.firstChild.text;
					var pFrame = fn_panel(2,ParsingRule[pn][0],pXml);
					 
	 // 			if(pFrame != "")  			
		  			//pFrame.LoadValue(pXml);
		  		
				}
				
				break;
	  	*/
	  	case 20://Dynamic Dropdow
			{
				var x14=document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
				if(!x14)
					return;
				var x15 = fn_gxtd(ch1[0]);
				if(!x15)
					return;
				var opt = document.createElement("OPTION");
				opt.id = "OPTION_"+ParsingRule[pn][0];
				opt.value = x15;
				opt.setAttribute('value', x15);
				//opt.innerText = x15;
				opt.innerText = ch1[0].getAttribute('data');
				x14.appendChild(opt);
			}
		break;
	  		
	  	/************************************************************************************/
	  	
	 		  case 21: 
	  		{
		  		if(ch1.length > 0)
				{
			  		for(i=0; i < ch1.length; i++)
						{
							var pn1 = fn_fprbc(ch1[i].getAttribute("controlId"));
							var selChk = ch1[i].getAttribute("selectChecked");
							
							if(pn1 <0) continue;
							co1 = document.getElementById("INPUT_"+ParsingRule[pn1][0]+x10);
							if(co1) 						
								AddComponent(ParsingRule[pn1][9], '', fn_gxtd(ch1[i]),ch1[i].getAttribute("data"), selChk,2);					
						}
			  	}
			  }
				break; 

		  		case 23: //우혜윤 (다이나믹 체크박스)
		  		{  
			  		if(ch1.length > 0)
						{
				  		for(i=0; i < ch1.length; i++)
							{						
								var pn1 = fn_fprbc(ch1[i].getAttribute("controlId"));
								var selChk = ch1[i].getAttribute("selectChecked");
								
								if(pn1 <0) continue;
								co1 = document.getElementById("INPUT_"+ParsingRule[pn1][0]+x10);
								if(co1) 						
									AddComponent(ParsingRule[pn1][9], '',  fn_gxtd(ch1[i]), ch1[i].getAttribute("data"),selChk,2);		
							}
				  	}
			  }
					break;
	
	  	/*************************************************************************/
	  	

	  	
		}
		return x11;
}


/************************************************************************************/
var DYNAMIC_COM = new Array();
function AddComponent(conId, gridIndex, name, data, check, duplicate) {
	var i=0;
	var selChk = check;
	for(; i<ParsingRule.length; i++) {
		if(conId == ParsingRule[i][9])
			break;
	}
	if(i==ParsingRule.length)
		return;



	switch(ParsingRule[i][3]) {
		case 20: {
			var ele = document.getElementById("INPUT_"+ParsingRule[i][0]);
			if(!ele)	return;
			var opt = document.createElement('OPTION');
			opt.id = 'OPTION_'+ParsingRule[i][0];
			opt.value = data;
			opt.innerText = name;
			ele.appendChild(opt);
		}
		break;
		case 21: {
			
			var ele = document.getElementById("INPUT_"+ParsingRule[i][0]);
			//ele.innerText+=name;
			if(!ele) return;
			if(duplicate == 0)
			{
					var spOpt=document.createElement('SPAN');
					spOpt.style.width=ele.getAttribute("optWidth")+"px";
					spOpt.style.display = "inline-block";
										
					ele.appendChild(spOpt);
			
					
					var ropt = document.createElement('INPUT');
					
					ropt.type='radio';
//				ropt.name="RADIO_"+ParsingRule[i][0];			//"INPUT_"+ParsingRule[i][0]+"_SUB";		
					ropt.value=data;
					ropt.value2=name;
					ropt.onclick = function() {return false;}
					
					
							if(selChk == 1)
							{
								ropt.checked=1;
							}

					
					spOpt.appendChild(ropt);
					
					var spCap = document.createElement('SPAN');
					spCap.innerText = data;
					spOpt.appendChild(spCap);
			}
			else if(duplicate ==1)
			{	
				
				for(var k=0; k<DYNAMIC_COM.length; k++)
				{
					if(DYNAMIC_COM[K][0]==conId   && DYNAMIC_COM[k][3] == name && DYNAMIC_COM[k][4]==data)
					{	
						return;				
					}
				}
							var spOpt=document.createElement('SPAN');
							spOpt.style.width=ele.getAttribute("optWidth")+"px";
							spOpt.style.display = "inline-block";
														
							ele.appendChild(spOpt);
					
							
							var ropt = document.createElement('INPUT');
							
							ropt.type='radio';
//						ropt.name="RADIO_"+ParsingRule[i][0];			//"INPUT_"+ParsingRule[i][0]+"_SUB";		
							ropt.value=data;
							ropt.value2=name;
							ropt.onclick = function() {return false;}
							
							if(selChk == 1)
							{
								ropt.checked=1;
							}

								
							spOpt.appendChild(ropt);
							
							var spCap = document.createElement('SPAN');
							spCap.innerText = data;
							spOpt.appendChild(spCap);
						
			}
			else if( duplicate == 2  )
			{	
				 
				for(var k=0; k<DYNAMIC_COM.length; k++)
				{
					if(DYNAMIC_COM[k][0]==conId   && DYNAMIC_COM[k][3] == name && DYNAMIC_COM[k][4]==data)
					{	
						ele.removeChild(ele.firstChild);
						if(DYNAMIC_COM[k][5]=="1")
							selChk=1;						
													
					}
				}
							var spOpt=document.createElement('SPAN');
							spOpt.style.width=ele.getAttribute("optWidth")+"px";
							spOpt.style.display = "inline-block";
							
							ele.appendChild(spOpt);
					
							
							var ropt = document.createElement('INPUT');
							
							ropt.type='radio';
							//ropt.name="RADIO_"+ParsingRule[i][0];			//"INPUT_"+ParsingRule[i][0]+"_SUB";		
							ropt.value=data;
							ropt.value2=name;
							ropt.onclick = function() {return false;}
							
							if(selChk == 1)
							{
								ropt.checked=1;
							}
								
							spOpt.appendChild(ropt);
							
							var spCap = document.createElement('SPAN');
							spCap.innerText = data;							
							spOpt.appendChild(spCap);
							
						
			}
					
		}
		break;
		case 23: {
			var ele = document.getElementById("INPUT_"+ParsingRule[i][0]);
			if(!ele) return;
			
			if(duplicate == 0)
			{
				var spOpt = document.createElement('SPAN');
				spOpt.style.width=ele.getAttribute("optWidth")+"px";
				
				ele.appendChild(spOpt);
				
				var chpt = document.createElement('INPUT');
				
				chpt.type='checkbox';
//			chpt.name="CHECKBOX_"+ParsingRule[i][0];   //"INPUT_"+ParsingRule[i][0]+"_SUB";
				chpt.value=data;
				chpt.value2=name;
				chpt.onclick = function() {return false;}
				
				if(selChk == 1)
							{
								chpt.checked=1;
							}

				spOpt.appendChild(chpt);
				
				
				var spCap = document.createElement('SPAN');
				spCap.innerText = data;
				spOpt.appendChild(spCap);
		   }
		   else if(duplicate == 1)
		   	{
		   		
		   		for(var k=0; k<DYNAMIC_COM.length; k++)
				{
					if(DYNAMIC_COM[k][0]==conId  && DYNAMIC_COM[k][3] == name && DYNAMIC_COM[k][4]==data)					
					{
						return;					
					}
				}
				
							var spOpt = document.createElement('SPAN');
							spOpt.style.width=ele.getAttribute("optWidth")+"px";
							
							ele.appendChild(spOpt);
							
							var chpt = document.createElement('INPUT');
							
							chpt.type='checkbox';
//						chpt.name="CHECKBOX_"+ParsingRule[i][0];   //"INPUT_"+ParsingRule[i][0]+"_SUB";
							chpt.value=data;
							chpt.value2=name;
							chpt.onclick = function() {return false;}
							
							if(selChk == 1)
							{
								chpt.checked=1;
							}

							spOpt.appendChild(chpt);	
							
							var spCap = document.createElement('SPAN');
							spCap.innerText = data;
							spOpt.appendChild(spCap);	
					  		  
		   	}
		   else if(duplicate ==2)
		   	{
		   		
		   		for(var k=0; k<DYNAMIC_COM.length; k++)
				{
					if(DYNAMIC_COM[k][0]==conId  && DYNAMIC_COM[k][3] == name && DYNAMIC_COM[k][4]==data)					
					{
						ele.removeChild(ele.firstChild);
						if(DYNAMIC_COM[k][5]=="1")
							selChk=1;
					}
				}				
							var spOpt = document.createElement('SPAN');
							spOpt.style.width=ele.getAttribute("optWidth")+"px";
							
							ele.appendChild(spOpt);
							
							var chpt = document.createElement('INPUT');
							
							chpt.type='checkbox';
//						chpt.name="CHECKBOX_"+ParsingRule[i][0];   //"INPUT_"+ParsingRule[i][0]+"_SUB";
							chpt.value=data;
							chpt.value2=name;
							chpt.onclick = function() {return false;}
							
							/*ny_0512주석			
							if(check==1)
							chpt.checked=1;
							*/
							if(selChk == 1)
							{
								chpt.checked=1;
							}

							spOpt.appendChild(chpt);		
							
							
							var spCap = document.createElement('SPAN');
							spCap.innerText = data;
							spOpt.appendChild(spCap);
					  		  
		   	}
	
		 
		
		}
		break;
	}
	if(DYNAMIC_COM.length>0)
	{
		var k=0
		for(; k<DYNAMIC_COM.length; k++)
		{
			if(DYNAMIC_COM[k][0]==conId && DYNAMIC_COM[k][3] == name && DYNAMIC_COM[k][4]==data && DYNAMIC_COM[k][5]==check)
			 	break;			
		}
		if(k==DYNAMIC_COM.length)
			DYNAMIC_COM[DYNAMIC_COM.length]=[conId,ParsingRule[i][3],gridIndex,name,data,check,duplicate];		
	}
	else
		DYNAMIC_COM[DYNAMIC_COM.length]=[conId,ParsingRule[i][3],gridIndex,name,data,check,duplicate];
}

/************************************************************************************/

















function fn_svbdv(pn, ax1, x10){
	var col1;
	switch(ParsingRule[pn][3])
	{
		case 0:
			break;
		case 1:
		case 2:
			co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				co1.value = ax1;
			}
			break;
		case 3:
			co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				co1.innerText = ax1;
				//co1.value = ax1;
			}
			break;
		case 4:
		case 9:
			co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				co1.innerText = ax1;
			}
			break;
		case 5:
			break;
		case 6:
		case 7:
			break;
		case 8:
			break;
		case 10:
			break;
		case 11:
			break;
		case 12:
			{
				var x13=BIR_INFO.length;
				var x14;
				for(x14=0;x14<x13;x14++)
				{
					if(BIR_INFO[x14][0]== ParsingRule[pn][0])
					{
						fn_addImg(x14,ax1,1);
						return;
					}
				}
			}
			break;
			
			
		}
}

function fn_sgvbax(x1, x2, x201)
{
	if( x1.getAttribute("controlId") == null)
		return;
	var x3=fn_fprbc(x1.getAttribute("controlId"));
	if(x3 <0)
		return;

	var x33=G_V_Info.length;
	var x34;
	for(x34=0;x34<x33;x34++)
	{
		if(ParsingRule[x3][0]==G_V_Info[x34][0])
			break;
	}
	if(x34==x33)
		return;
	var x35=x34;
	x33=GD_Info.length;
	for(x34=0;x34<x33;x34++)
	{
		if(GD_Info[x34][0]==G_V_Info[x35][1])
			break;
	}
	if(x34==x33)
		return;
	//alert("전 : " + GD_Info[x34][1]);
	if(x2>=GD_Info[x34][1])
		AddLastRowInGrid(x34);
	//alert("후 : " + GD_Info[x34][1]);
	var x11= fn_cvbax(x3, x1, "_"+x2+"_"+x201);
	if(x11>0)
		fn_gshc("VAL_"+ParsingRule[x3][0]+"_"+x2+"_0");
}

function fn_sgvbgx(pn, x1)
{
	var x2 =  x1.getElementsByTagName("GRID_VALUESET");
	var x3;
	var x10 = x1.getAttribute("controlId");
	var x4 = GD_Info.length;
	var x13;
	var x14=fn_fprbc(x10);
	for(x13=0;x13<x4;x13++)
	{
		if(GD_Info[x13][0] == ParsingRule[x14][0])
			break;
	}
	if(x13 == x4)
		return;
	x4 = x2.length;
	for(x3=0;x3<x4;x3++)
	{
		var x6=x2[x3].getElementsByTagName("GRID_ATTRIBUTE");
		CSX_X2=x6;
		var x5;
		var x11 = fn_getGridRowIndexForOutput(x6, x13);
		var x12 = fn_getGridColumnIndexForOutput(x6, x13);

		if(x11 ==-1)
		 	x11 = parseInt(x2[x3].getAttribute("no")/GD_Info[x13][4]);
		if(x12 ==-1)
			x12 = parseInt(x2[x3].getAttribute("no")%GD_Info[x13][4]);

		//alert(x11 + ", " + x12);

		for(x5=0;x5<x6.length;x5++)
		{
			fn_sgvbax(x6[x5], x11, x12);
		}
	}


}


function fn_gsxtn(n)
{
	switch(n)
	{
		case 0:return "DOCUMENT";
		case 1:return "GROUP";
		case 2:return "ENTITY";
		case 3:return "GRID";
		case 4:return "GRID_ATTRIBUTE"
		case 5:return "ATTRIBUTE";
		case 6:return "VALUE";
		case 7:return "ENTITY";
	}
	return "";
}

function fn_gsx4a(x1, x2, x3)
{
	var x4;
	var x5 = ParsingRule.length;

	if(x1 >= x5)
		return "";

  var x7 = ParsingRule[x1][4]+1;

	x4 = "\r\n<ATTRIBUTE";
  x4 += " con_id='"+ParsingRule[x1][5]+"'";
  x4 += " con_term='"+fn_rpls4x(ParsingRule[x1][6])+"'";
  x4 += " path='"+fn_rpls4x(ParsingRule[x1][1])+"'";
  x4 += " controlId='"+ParsingRule[x1][9]+"'";
  x4 += " name='"+ParsingRule[x1][19]+"'>";

  var x8;
  switch(ParsingRule[x1][3])
  {
  	case 0:
  		x8 = document.getElementById("VAL_"+x2+x3);
  		if(x8 != null && x8.innerText != "")
  		{
  			x4 += "<VALUE con_id='' con_term=''>"+fn_rpls4x(x8.innerText)+"</VALUE>";
  		}
  		break;
  	case 1:
  	case 2:
  	case 3:
  	case 4:
  	case 9:
  		x8 = document.getElementById("INPUT_"+x2+x3);
  		if(x8 != null && x8.value != "")
  		{
  			x4 += "<VALUE con_id='' con_term=''>"+fn_rpls4x(x8.value)+"</VALUE>";
  		}
  		break;
  	case 5:
  	case 6:
  	case 7:
  		{
  			var i=x1+1;
  			while(i < x5)
  			{
  				if(x7 > ParsingRule[i][4])
  					break;
  				if( x7 != ParsingRule[i][4])
  				{
  					i++;
  					continue;
  				}

  				x8 = document.getElementById(ParsingRule[i][0]+x3);
  				if(x8)
  				{
  					if(x8.selected || x8.checked)
  					{
  						x4 += "<VALUE con_id='"+ParsingRule[i][5]+"' con_term='"+fn_rpls4x(ParsingRule[i][6])+"'"+" controlId='"+ParsingRule[i][9]+"'>";
  						x4 += fn_rpls4x(x8.value) +"</VALUE>";
  					}
  				}
  				i++;
  			}
  		}
  		break;
  	case 8:
  		{
  			var i=x1+1;
  			var x111=0;
  			x8 = document.getElementById("INPUTU1_"+x2+x3);
	  		if(x8 == null || x8.value==null || x8.value=="")
	  			break;
	  		x4 += "<VALUE con_id='' con_term=''>"+x8.value+"</VALUE>";
	  		while(i < x5)
  			{
  				if(x7 > ParsingRule[i][4])
  					break;
  				if( x7 != ParsingRule[i][4])
  				{
  					i++;
  					continue;
  				}
  				x8 = document.getElementById(ParsingRule[i][0]+x3);
	  			if(x8 != null)
	  			{
	  				if(x8.selected || x8.checked)
	  				{
	  					x4 += "<UNIT con_id='"+ParsingRule[i][5]+"' con_term='"+fn_rpls4x(ParsingRule[i][6])+"' controlId='"+ParsingRule[i][9]+"'>";
	  					x4 += x8.innerText +"</UNIT>";
	  					x111=1;
	  					break;
	  				}
	  			}
	  			i++;
  			}

  			if((x111==0) && (ParsingRule[x1][4]+1 ==ParsingRule[x1+1][4]))
  			{
  				i = x1+1;
  				x4 += "<UNIT con_id='"+ParsingRule[i][5]+"' con_term='"+fn_rpls4x(ParsingRule[i][6])+"' controlId='"+ParsingRule[i][9]+"'>";
	  			x4 += ParsingRule[i][12] +"</UNIT>";

  			}
  		}
  		break;
  	case 10:
  		x8 = document.getElementById("CHECK_"+x2+x3+"_0");
  		if(x8 != null && x8.checked)
  		{
  			x4 += "<VALUE con_id='' con_term=''>checked</VALUE>";/*(O)*/
  		}
  		break;
  	case 11:
  		if(ParsingRule[x1][13] != "")
			{
					x4 += "<VALUE con_id='' con_term='' controlId=''>";
  				x4 += ParsingRule[x1][13] +"</VALUE>";
			}
  		break;
  	case 12:
  		x4 += GetImageRegisterData(x1);
  		break;
  	case 13:
  		{
  			var i=x1-1;
  			while(i>=0)
  			{
  				if((ParsingRule[x1][4]-1) == ParsingRule[i][4])
  					break;
  			}
  			x8 = document.getElementById("APP_"+ParsingRule[i][0]+x3);
	  		if(x8 == null)
	  		{
	  			return "";
	  		}


	  		x4 += "<VALUE con_id='' con_term='' controlId='"+i+"'>";
	  		x4 += x8.getValueById(ParsingRule[x1][0])+"</VALUE>";
  		}
  		break;
  	case 16:
  		{
  			var i=0;
  			for(i=0; i<32; i++)
  			{
  				x8 = document.getElementById(ParsingRule[x1][0]+"_U_"+i);
  				if(x8 != null)
	  			{
	  				if(x8.checked)
	  				{
	  					x4 += "<VALUE con_id='' con_term='' controlId='"+i+"'>";
	  					x4 += "TEETH_NO_"+i+"</VALUE>";
	  				}
	  			}
  			}
  		}
  		break;
  }
  x4 += "</ATTRIBUTE>";
  return x4;
}


function fn_gx4g(x1)
{
	var x2;
	var x3 = ParsingRule.length;

	if(x1 >= x3)
		return "";

  var x4 = ParsingRule[x1][4]+1;

	x2 = "\r\n<GRID";
  x2 += " con_id='"+ParsingRule[x1][5]+"'";
  x2 += " con_term='"+ParsingRule[x1][6]+"'";
  x2 += " path='"+ParsingRule[x1][1]+"'";
  x2 += " controlId='"+ParsingRule[x1][9]+"'>";

  var x5, x6;
  var i, j;
  var x7 = GD_Info.length;

  for(i=0; i<x7; i++)
  {
  	if(GD_Info[i][0] == ParsingRule[x1][0])
  		break;
  }

  if( i== x7)
  	return "";
  x5 = GD_Info[i][1];
  x6 = GD_Info[i][4];

  for( i=0; i<x5; i++)
  {
  	for(j=0; j<x6; j++)
  	{
	  	var k=x1+1;
	  	x2 += "<GRID_VALUESET no='"+(i*x6+j) +"'>"
	  	while(k < x3)
	  	{
	  		if(x4 > ParsingRule[k][4])
	  				break;

	  		if(x4 == ParsingRule[k][4])
	  		{
	  			var innerXml = fn_gx4ga(k, i, j);
	  			if(innerXml)
	  			x2 += innerXml;
	  		}
	  		k++;
	  	}
	  	x2 += "</GRID_VALUESET>"
	  }
  }
  x2 += "</"+fn_gsxtn( ParsingRule[x1][2])+">";
  return x2;
}

function fn_gxel(x1)
{
	var x2;
	var x3=ParsingRule.length;

	if(x1 >= x3)
		return "";

	var x6 = "";
	var x4 = ParsingRule[x1][4]+1;

	if( 3 == ParsingRule[x1][2])
		return fn_gx4g(x1);
	else if(5 == ParsingRule[x1][2] || 10 == ParsingRule[x1][2])
		return fn_gsx4a(x1, ParsingRule[x1][0], "");

	for(i=x1+1; i<x3; i++)
	{
		if(x4 > ParsingRule[i][4])
			break;

		if(x4 == ParsingRule[i][4])
		{
			x6 += fn_gxel(i);
		}
	}

	if(x6 == "")
		return "";

	x2 = "\r\n<"+fn_gsxtn( ParsingRule[x1][2]);
  x2 += " con_id='"+ParsingRule[x1][5]+"'";
  x2 += " con_term='"+ParsingRule[x1][6]+"'";
  x2 += " path='"+ParsingRule[x1][1]+"'";

  if( 7 == ParsingRule[x1][2]) /* Empty Tag Empty */
  {
  	var x5 = document.getElementById("EMTAGTERM_"+ParsingRule[x1][0]);
  	if(x5 != null)
  	{
  		x2 += " em_term='"+x5.value+"'";
  		x5 = document.getElementById("EMTAGID_"+ParsingRule[x1][0]);
  		if(x5 != null)
  			x2 += " em_id='"+x5.value+"'";
  	}
  }

  x2 += " controlId='"+ParsingRule[x1][0]+"'>";
  x2 += x6 +"</"+fn_gsxtn( ParsingRule[x1][2])+">";
  return x2;
}

function GetGridStaticValue(calcType, idStr, rowNum, colNum)
{
	var realIdStr;
	var result=0;
	var rowCount=-1;
	var colCount=-1;
	var valType=-1;
	var gridId=-1;
	var i, j;
	for(i=0; i<G_V_Info.length; i++)
	{
		if(G_V_Info[i][0] == idStr)
		{
			valType = G_V_Info[i][2];
			colCount = G_V_Info[i][3];
			gridId = G_V_Info[i][1];
			break;
		}
	}
	if(valType == -1)
		return result;
	for(i=0; i<GD_Info.length; i++)
	{
		if(GD_Info[i][0] == gridId)
		{
			rowCount = GD_Info[i][1];
			break;
		}
	}
	if(rowCount <= 0)
		return result;

	if(colCount ==0)
		colCount=1;

	if(valType == 2)
	{
		rowCount = colCount;
		colCount=1;
	}

	if(rowNum >= (rowCount-1))
	{
		bMapContinue=2;
	}
	if(bMapContinue!=2)
		bMapContinue=1;


	var x30,x31,x32,x33;
	if(rowNum ==-1 && colNum==-1 )
	{
		if(calcType ==4)
			return rowCount*colCount;
		x30=rowCount-1;
		x31=colCount-1;
		x32=0;
		x33=0;
	}
	else if(rowNum ==-1)
	{
		if(calcType ==4)
			return colCount;
		x30=x32=rowNum;
		x31=colCount-1;
		x33=0;
	}
	else if(colNum==-1)
	{
		if(calcType ==4)
			return rowCount;
		x30=rowCount-1;
		x32=0;
		x31=x33=colNum;
	}
	else
	{
		if(calcType ==4)
			return 1;
		x30=x32=rowNum;
		x31=x33=colNum;
	}

	result=0;
	var x40;
	for(i=x30; i<=x32; i++)
	{
		for(j=x31; j<=x33; j++)
		{
			switch(calcType)
			{
				case 0:
					x40 = GetValue(idStr, "_"+i+"_"+j);
					if(x40 > result)
						result = x40;
					break;
				case 1:
					x40 = GetValue(idStr, "_"+i+"_"+j);
					if(x40 < result)
						result = x40;
					break;
				case 2:
				case 3:
					result += GetValue(idStr, "_"+i+"_"+j);
					break;
				case 4:
					result++;
					break;
				case 5:
					result = GetValue(idStr, "_"+i+"_"+j);;
					break;
			}
		}
	}
	if(calcType==3)
		result /= (x32*x33);
	return result;
}



function SetValue(idStr, val1, id2)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==idStr)
			break;
	if(x2==x1)
		return 0;

	if(ParsingRule[x2][2]==10)
	{
		x4 = x2-1;
		while(x4 >=0)
		{
			if( ParsingRule[x2][4] == (ParsingRule[x4][4]+1))
			{
				x8 = document.getElementById("APP_"+ParsingRule[x4][0]+id2);
				if(x8 != null)
				{
					return x8.setValueById(ParsingRule[x2][0], val1);
				}
				break;
			}
		}
		return 0;
	}

	var x8;
	switch(ParsingRule[x2][3])
  {
  	case 0:
  		x8 = document.getElementById("VAL_"+ParsingRule[x2][0]+id2);
  		if(x8 != null)
  		{
  			//x8.innerText = ParsingRule[x2][17]+val1+ParsingRule[x2][18];
  			x8.innerText = val1;
  		}
  		break;
  	case 1:
  	case 2:
  	case 3:
  	case 4:
  	case 9:
  		x8 = document.getElementById("INPUT_"+ParsingRule[x2][0]+id2);
  		if(x8 != null)
  		{
  			x8.value=val1;
  		}
  		break;
  	case 5:
  	case 6:
  	case 7:
  		{
  			var i=x2+1;
  			var x4=0;
  			var x5=ParsingRule.length;
  			while(i < x5)
  			{
  				if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
  					break;

  				x8 = document.getElementById(ParsingRule[i][0]+id2);
  				if(x8)
  				{
  					if((val1 != "") && (val1 == parseFloat(ParsingRule[i][13])))
  					{
  						if(ParsingRule[x2][3]==5)
  							x8.selected = "selected";
  						else
  							x8.checked = "checked";
  					}
  					else if((val1 != "") && (val1 == ParsingRule[i][12]))
  					{
  						if(ParsingRule[x2][3]==5)
  							x8.selected = "selected";
  						else
  							x8.checked = "checked";
  					}
  					else
  					{
  						if(ParsingRule[x2][3]==5)
  							x8.selected = null;
  						else
  							x8.checked = null;
  					}
  				}
  				i++;
  			}
  		}
  		return x4;
  		break;
  	case 8:
  			var i=x2+1;
  			var x4 ="";
  			var x5=ParsingRule.length;
	  		x8 = document.getElementById("INPUTU1_"+ParsingRule[x2][0]+id2);
	  		if(x8 != null )
	  		{
	  			x8.value=val1;
	  		}
	  		x4 = parseFloat(x8.value);
	  		while(i < x5)
  			{
  				if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
  					break;
  				x8 = document.getElementById(ParsingRule[i][0]+id2);
	  			if(x8 != null)
	  			{
	  				x8.selected="selected";
	  				break;
	  			}
	  			i++;
	  		}
  		break;
  	case 10:
  		x8 = document.getElementById("CHECK_"+ParsingRule[x2][0]+id2+"_0");
  		if(x8 != null)
  		{
  			if(val1)
  				x8.checked = "checked";
  			else
  				x8.checked = "";
  		}
  		return 0;
  		break;
  	case 17:
  		x8 = document.getElementById("IMG_"+ParsingRule[x2][0]+id2);
  		if(x8 !=null)
  		{
  			x8.src=val1;
  		}
  		break;
  	case 13:
  		{
  			var i=x2-1;
  			while(i>=0)
  			{
  				if((ParsingRule[x2][4]-1) == ParsingRule[i][4])
  					break;
  			}
  			x8 = document.getElementById("APP_"+ParsingRule[i][0]+aStr);
	  		if(x8 == null)
	  		{
	  			return;
	  		}

	  		x8.getValueById(ParsingRule[x2][0], val1);
  		}
  		break;
  }
	return 0;

}

function GetStringValue(idStr, aStr)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==idStr)
			break;
	if(x2==x1)
	{
		if(G_VT01<2)
			return 0;
		var y1=G_OutXml4Attr;
		if(y1==null)
			return 0;
		var y2=y1.length;
		var y3;
		for(y3=0;y3<y2;y3++)
		{
			if(idStr==y1[y3].getAttribute("controlId"))
			{
				break;
			}
		}
		if(y3>=y2)
			return 0;
		var y4=y1[y3].getElementsByTagName("VALUE");
		var y7=y3;
		var y2=y4.length;
		var y6="";
		for(y3=0;y3<y2;y3++)
		{
			if(y6 == "")
				y6 += fn_gxtd(y4[y3]);
			else
				y6 += ", "+fn_gxtd(y4[y3]);
		}

		y4=y1[y7].getElementsByTagName("UNIT");
		y2=y4.length;
		for(y3=0;y3<y2;y3++)
		{
			y6 += " "+fn_gxtd(y4[y3]);
		}
		return y6;
	}
	var x8;
	var x4;

	if(ParsingRule[x2][2]==8)
	{
		x8 = document.getElementById(ParsingRule[x2][0]+aStr);
  	if(x8 != null && (x8.selected  ||x8.checked))
  	{
  		return "true";
  	}
  	return "false";
	}


  switch(ParsingRule[x2][3])
  {
  	case 0:
  		x8 = document.getElementById("VAL_"+ParsingRule[x2][0]+aStr);
  		if(x8 != null && x8.innerText != "")
  		{
  			return x8.innerText;
  		}
  		break;
  	case 1:
  	case 2:
  	case 3:
  	case 4:
  	case 9:
  		x8 = document.getElementById("INPUT_"+ParsingRule[x2][0]+aStr);
  		if(x8 != null && x8.value != "")
  		{
  			return x8.value;
  		}
  		break;
  	case 5:
  	case 6:
  	case 7:
  		{
  			var i=x2+1;
  			var x4="";
  			var x5=ParsingRule.length;
  			while(i < x5)
  			{
  				if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
  					break;

  				x8 = document.getElementById(ParsingRule[i][0]+aStr);
  				if(x8)
  				{
  					if(x8.selected || x8.checked)
  					{
  						if(x4 =="")
  							x4 += ParsingRule[i][12];
  						else
  							x4 += "," + ParsingRule[i][12];
  					}
  				}
  				i++;
  			}
  		}
  		return x4;
  		break;
  	case 8:
  		{
  			var i=x2+1;
  			var x4 ="";
  			var x5=ParsingRule.length;
	  		x8 = document.getElementById("INPUTU1_"+ParsingRule[x2][0]+aStr);
	  		if(x8 == null || x8.value==null || x8.value=="")
	  		{
	  			return x4;
	  		}
	  		x4 = parseFloat(x8.value);
	  		while(i < x5)
  			{
  				if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
  					break;
  				x8 = document.getElementById(ParsingRule[i][0]);
	  			if(x8)
	  			{
	  				if(x8.selected || x8.checked)
	  				{
	  					x4 += " "+ParsingRule[i][12];
	  					return x4;
	  				}
	  			}

	  			if(ParsingRule[x2][4]+1 ==ParsingRule[x2+1][4])
	  			{
	  				x4 += " "+ParsingRule[x2+1][12];
	  				return x4;
	  			}
  			}
  		}
  		break;
  	case 10:
  		x8 = document.getElementById("CHECK_"+ParsingRule[x2][0]+aStr+"_0");
  		if(x8 != null && x8.checked)
  		{
  			return "true";
  		}
  		return "false";
  		break;
  }
	return "";
}


function GetValue(idStr, aStr)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==idStr)
			break;
	if(x2==x1)
	{
		if(G_VT01<2)
			return 0;
		var y1=G_OutXml4Attr;
		if(y1==null)
			return 0;
		var y2=y1.length;
		var y3;
		for(y3=0;y3<y2;y3++)
		{
			if(idStr==y1[y3].getAttribute("controlId"))
			{
				break;
			}
		}
		if(y3>=y2)
			return 0;
		var y4=y1[y3].getElementsByTagName("VALUE");
		var y2=y4.length;
		var y6="";
		for(y3=0;y3<y2;y3++)
		{
			y6 += fn_gxtd(y4[y3]);
		}
		return y6;
	}
	var x8;
	var x4;

	if(ParsingRule[x2][2]==8)
	{
		x8 = document.getElementById(ParsingRule[x2][0]+aStr);
  	if(x8 != null && (x8.selected || x8.checked))
  	{
  		return 1;
  	}
  	if(x8 == null & ParsingRule[x2][4] == 1)
  	{
  		var capName = ParsingRule[x2][12];
  		var y1 = ParsingRule[x2][0].split('_');
  		y1 = y1[1];
  		var y2;
  		for(y2=x2; y2>=0; y2--)
  		{
  			if(y1 == ParsingRule[y2][0])
  				break;
  		}
  		if(y2 < 0)
  			return 0;
  		x8 = document.getElementById("VAL_"+ParsingRule[y2][0] + aStr);
  		if(x8 != null && x8.innerText == capName)
  			return 1;
  	}
  	return 0;
	}

  switch(ParsingRule[x2][3])
  {
  	case 0:
  		x8 = document.getElementById("VAL_"+ParsingRule[x2][0]+aStr);
  		if(x8 != null && x8.innerText != "")
  		{
  			return parseFloat(x8.innerText);
  		}
  		break;
  	case 1:
  	case 2:
  	case 3:
  	case 4:
  	case 9:
  		x8 = document.getElementById("INPUT_"+ParsingRule[x2][0]+aStr);
  		if(x8 != null && x8.value != "")
  		{
  			return parseFloat(x8.value);
  		}
  		break;
  	case 5:
  	case 6:
  	case 7:
  		{
  			var i=x2+1;
  			var x4=0;
  			var x5=ParsingRule.length;
  			while(i < x5)
  			{
  				if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
  					break;

  				x8 = document.getElementById(ParsingRule[i][0]+aStr);
  				if(x8)
  				{
  					if(x8.selected || x8.checked)
  					{
  						x4 += parseFloat(ParsingRule[i][13]);
  					}
  				}
  				i++;
  			}
  		}
  		return x4;
  		break;
  	case 8:
  		{
  			var i=x2+1;
  			var x4 =0;
  			var x5=ParsingRule.length;
	  		x8 = document.getElementById("INPUTU1_"+ParsingRule[x2][0]+aStr);
	  		if(x8 == null || x8.value==null || x8.value=="")
	  		{
	  			return x4;
	  		}
	  		x4 = parseFloat(x8.value);
	  		while(i < x5)
  			{
  				if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
  					break;

  				x8 = document.getElementById(ParsingRule[i][0]);
	  			if(x8)
	  			{
	  				if(x8.selected || x8.checked)
	  				{
	  					x4 *= parseFloat(ParsingRule[i][13]);
	  					return x4;
	  				}
	  			}
	  			i++;
  			}
  			if(ParsingRule[x2][4]+1 ==ParsingRule[x2+1][4])
  			{
	  				x4 *= parseFloat(ParsingRule[x2+1][13]);
	  				return x4;
  			}

  		}
  		break;
  	case 10:
  		x8 = document.getElementById("CHECK_"+ParsingRule[x2][0]+aStr+"_0");
  		if(x8 != null && x8.checked)
  		{
  			return 1;
  		}
  		return 0;
  		break;
  	case 13:
  		{
  			var i=x2-1;
  			while(i>=0)
  			{
  				if((ParsingRule[x2][4]-1) == ParsingRule[i][4])
  					break;
  			}
  			x8 = document.getElementById("APP_"+ParsingRule[i][0]+aStr);
	  		if(x8 == null)
	  		{
	  			return "";
	  		}
	  		return x8.getValueById(ParsingRule[x2][0]);
  		}
  		break;
  }
	return 0;
}


function AutoCalculationAll()
{
	var i, j;
	if(G_VT01 >= 2)
		return;
	for(i=0; i<AUTOCALC_SCRIPT.length; i++)
	{
		if(AUTOCALC_SCRIPT[i][1]=="")
			continue;
		fn_ejs("resultData="+AUTOCALC_SCRIPT[i][1]);
		if(AUTOCALC_SCRIPT[i][2] ==0 || AUTOCALC_SCRIPT[i][3] != resultData)
		{
				AUTOCALC_SCRIPT[i][3] = resultData;
				SetValue(AUTOCALC_SCRIPT[i][0], resultData, "");
		}
	}
	for(i=0; i<AUTOCALC_SCRIPT_GRID.length; i++)
	{
		var idStr = AUTOCALC_SCRIPT_GRID[i][0];
		var gridId=0;
		var rowCount=0;
		var columnCount=0;
		var valueType=0;

		for(n=0; n< G_V_Info.length; n++)
		{
			if(G_V_Info[n][0] == idStr)
			{
				gridId = G_V_Info[n][1];
				valueType = G_V_Info[n][2];
				columnCount = G_V_Info[n][3];
				break;
			}
		}
		for(n=0; n<	GD_Info.length; n++)
		{
			if(GD_Info[n][0] == gridId)
			{
					rowCount = GD_Info[n][1];
					break;
			}
		}

		grid_rowCount = rowCount;
		if(valueType == 2)	/* Static Rotate */
		{
			for(n=0; n< G_V_Info.length; n++)
			{
				if(G_V_Info[n][1] != gridId || G_V_Info[n][2] != 4)
					continue;
				grid_idStr = G_V_Info[n][0];
				for(grid_col_idx=0; grid_col_idx < columnCount; grid_col_idx++)
				{
					if(AUTOCALC_SCRIPT_GRID[i][1]=="")
						continue;
					fn_ejs("resultData="+AUTOCALC_SCRIPT_GRID[i][1]);
					SetValue(idStr, resultData, "_"+grid_idStr+"_"+grid_col_idx);
				}
			}
		}
		else
		{
			for(grid_idx=0; grid_idx < rowCount; grid_idx++)
			{
				if(AUTOCALC_SCRIPT_GRID[i][1]=="")
						continue;
				fn_ejs("resultData="+AUTOCALC_SCRIPT_GRID[i][1]);
				SetValue(idStr, resultData, "_"+grid_idx+"_0");
			}
		}
	}
}


function ProcessThreshold()
{
	var i;
	for(i=0; i< THD_NUM.length; i++)
	{
		var el = document.getElementById(THD_NUM[i][0]);
		if(el == null) continue;

		var val;
		if( el.value.length > 0)
		{
			if(isNaN(parseFloat( el.value)))
		  	val =0;
		  else
		  	val = parseFloat( el.value);
		}
		else
		{
			val =0;
		}


		if(val < THD_NUM[i][1])
		{
			el.style.background = THD_NUM[i][4];
		}
		else if( val > THD_NUM[i][2])
		{
			el.style.background = THD_NUM[i][5];
		}
		else
		{
			el.style.background = THD_NUM[i][3];
		}
	}

	for(i=0; i< THD_TXT.length; i++)
	{
		var el = document.getElementById(THD_TXT[i][0]);
		if(el == null) continue;

		var val = el.value.length;
		if(val < THD_TXT[i][1])
		{
			el.style.background = THD_TXT[i][4];
		}
		else if( val > THD_TXT[i][2])
		{
			el.style.background = THD_TXT[i][5];
		}
		else
		{
			el.style.background = THD_TXT[i][3];
		}
	}
}


function timer_function()
{
	if(bLoadingMap==1)
	{
		ProcAllMap(0);
		bLoadingMap=2;
	}
	BK_setBodyEvent();
	fn_ttbd();
	if(G_VT01>=2)
		return;
	//fn_ttbd();
	fn_ttbd_g();
	AutoCalculationAll();
	ProcessThreshold();
	setTimeout("timer_function();", g_timeExpiration);
	
}

function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : -1;
}

function AddLastRowInGrid(x0)
{
	if(GD_Info[x0][3]=='')
		return;
	var tbObj=document.getElementById("GRIDTB_"+GD_Info[x0][0]);
	if(tbObj==null)
		return;
	
	var x1 = tbObj.getElementsByTagName("TR");
	for(x2=0; x2<x1.length; x2++)
	{
		var x3 = x1[x2].getAttribute("ID");
		//if(x3 == "" && x1[x2].innerHTML != "")
		if(!x3 && x1[x2].innerHTML != "")
			break;
	}
	
	try{
		
	  var newTr = tbObj.insertRow(GD_Info[x0][1]+x2);
   }
   catch(e){
   	//var newTr = tbObj.insertRow(GD_Info[x0][1]+1);
   	var newTr = tbObj.insertRow(tbObj.rows.length);
   }
	
	if(newTr ==null)
		return;
	
	GD_Info[x0][1]++;
	newTr.id = 'newid';
	var divObj = tbObj.parentElement;
	var orgStr = divObj.innerHTML;
	//divObj.innerHTML = orgStr.replace("<TR id=newid></TR>", ReplaceInsStr(GD_Info[x0][3], GD_Info[x0][1]-1));
	orgStr = orgStr.replace("<TR id=newid></TR>", ReplaceInsStr(GD_Info[x0][3], GD_Info[x0][1]-1));
	orgStr = orgStr.replace("<tr id=\"newid\"></tr>", ReplaceInsStr(GD_Info[x0][3], GD_Info[x0][1]-1));
	divObj.innerHTML = orgStr
	
}

function AddRowInGrid(imgObj, idStr, rowNum)
{
	var i;
	for(i=0; i<GD_Info.length;i++)
	{
		if(GD_Info[i][0] == idStr)
			break;
	}
	if(i==GD_Info.length)
		return;

	var trObj = imgObj.parentElement.parentElement;
	var tbObj = trObj.parentElement.parentElement;

	var x1 = tbObj.getElementsByTagName("TR");
	for(x2=0; x2<x1.length; x2++)
	{
		var x3 = x1[x2].getAttribute("ID");
		if(x3 == "")
			break;
	}

	var newTr = tbObj.insertRow(GD_Info[i][1]+x2);
	if(!newTr)
		return;
	
	GD_Info[i][1]++;
	if(isIE()>0 && isIE() < 10) {
		newTr.id = 'newid';
		var divObj = tbObj.parentElement;
		var orgStr = divObj.innerHTML;
		orgStr = orgStr.replace("<TR id=newid></TR>", ReplaceInsStr(GD_Info[i][3], GD_Info[i][1]-1));
		orgStr = orgStr.replace("<tr id=\"newid\"></tr>",ReplaceInsStr(GD_Info[i][3], GD_Info[i][1]-1));
		divObj.innerHTML = orgStr
		MoveUpDownGridData(GD_Info[i][0], rowNum, 1);
		SetGridInitValue(GD_Info[i][0], rowNum+1);
	}
	else {
		var rpsStr = ReplaceInsStr(GD_Info[i][3], GD_Info[i][1]-1);
		newTr.outerHTML = rpsStr;
		
		MoveUpDownGridData(GD_Info[i][0], rowNum, 1);
		SetGridInitValue(GD_Info[i][0], rowNum+1);
	}
}

function DeleteRowInGrid(imgObj, idStr, rowNum)
{
	var i;
	for(i=0; i<GD_Info.length;i++)
	{
		if(GD_Info[i][0] == idStr)
			break;
	}
	if(i==GD_Info.length)
		return;
	MoveUpDownGridData(GD_Info[i][0], rowNum, 0);
	var trObj = imgObj.parentElement.parentElement;
	var tbObj = trObj.parentElement.parentElement;
	if(1==GD_Info[i][1])
		return;

	var x1 = tbObj.getElementsByTagName("TR");
	for(x2=0; x2<x1.length; x2++)
	{
		var x3 = x1[x2].getAttribute("ID");
		if(x3 == "")
			break;
	}
	tbObj.deleteRow(GD_Info[i][1]+x2-1);
	GD_Info[i][1]--;

}


function GetMapVal(idx, cnt)
{
	var len;
	var i;

	if(DsIfInfo[idx][5]!='0')
	{
		fn_ejs("MAP_SET_VAL="+DsIfInfo[idx][7]);
		return MAP_SET_VAL;
	}

	switch(DsIfInfo[idx][3])
	{
		case 0:
			return DsIfInfo[idx][6];
		case 1:
			{
				var Pn = fn_fprbc(DsIfInfo[idx][6]);
				if(Pn < 0) break;
				if(ParsingRule[Pn][2]==5)
					return GetStringValue(ParsingRule[Pn][0],"");
				if(ParsingRule[Pn][2]==4)
				{
					return GetGridStaticValue(5, ParsingRule[Pn][0],cnt,0);
				}
			}
			break;
		case 2:
			break;
		case 3:
		case 4:
			var idx=parseInt(DsIfInfo[idx][6]);
			if(RVInfo.length > idx)
				return RVInfo[idx];
			else
				return "";
			break;
		case 5:
			return getCookie(DsIfInfo[idx][6]);
		case 6:
			break;
	}
	return "";
}





function fn_svbmx(x1,x20,x21)
{
	var x2=0;
	var x3=x1.getAttribute("Name");
	for(x2=0;x2<DsIfInfo.length;x2++)
	{
		if(DsIfInfo[x2][0]==x21&&DsIfInfo[x2][1]==x3)
		{
			if(DsIfInfo[x2][5]=='0')
			{
				var x5=fn_fprbc(DsIfInfo[x2][6]);
				if(x5>=0)
				{
					if(ParsingRule[x5][2] ==5)
					{
						fn_svbdv(x5,fn_gxtd(x1),"");
					}
					else if(ParsingRule[x5][2]==4)
					{
						fn_sgvbdv(x5, fn_gxtd(x1), x20);
					}
				}
			}
			else
			{
				MAP_RET_VAL=fn_gxtd(x1);
				fn_ejs(DsIfInfo[x2][7]);
			}
			return;
		}
	}
}

/*2015-06-19 기존 AjaxUpdate(x0)
function AjaxUpdate(x0)
{
	var x11=0;
	var xObj=new ActiveXObject("Microsoft.XMLDOM");
	xObj.async="false";
	xObj.loadXML(x0);
	if(xObj==null)
		return;
	var xDs = xObj.getElementsByTagName("OUTPUTSET");
	if(xDs == null)
		return;
	var i;
	for (i=0;i<xDs.length;i++)
  {
  	var x13 = xDs[i].getAttribute("ds_id");
  	var xOs = xDs[i].getElementsByTagName("OUTPUT");
  	var j;
    for( j=0; j<xOs.length; j++)
    {
    	fn_svbmx(xOs[j], x11, x13);
    }
    x11++;
  }
}
*/
function AjaxUpdate(x0) //2015-06-19 수정한 AjaxUpdate(x0)
{	
	var x11=0;
	

	var xObj=new ActiveXObject("Microsoft.XMLDOM");
	xObj.async="false";
	xObj.loadXML(x0);
	if(xObj==null)
	{
		return;
	}
	xGridIndex=0;
	
	var ds = xObj.getElementsByTagName("DATASET");
	
	if(ds && ds.length<1)
		return;
	var dsId = ds[0].getAttribute('id');
	var dsSeq = ds[0].getAttribute('seq');
	
	
	var xDs = xObj.getElementsByTagName("OUTPUTSET");
	
	if(xDs == null || xDs.length<=0)
	{
		var errorMsg="Mapper Error : "+x0;
		//alert(errorMsg);		
		/*if(parent.parent.showNotiBox2)
			parent.parent.showNotiBox2(errorMsg);
			
		if(parent.parent.showNotiBox)
			parent.parent.showNotiBox(errorMsg);
		*/
		var endScript = MapEndScript(dsId);
		if(endScript) {
			MAP_RET_VAL = false;
			fn_ejs(endScript);
		}
		return;
	}

	
	var i;
	var rowScript = getMapRowScript(dsId, dsSeq);
	for (i=0;i<xDs.length;i++) {
		var x13 = xDs[i].getAttribute("ds_id");
		var xOs = xDs[i].getElementsByTagName("OUTPUT");
		var j;
		for( j=0; j<xOs.length; j++)
			fn_svbmx(xOs[j], x11, x13);
			
		if(rowScript) {
			MAP_RET_VAL = new Array();
			for(var k=0; k<xOs.length; k++) {
				//MAP_RET_VAL[MAP_RET_VAL.length] = fn_gxtd(xOs[k]);
				MAP_RET_VAL[MAP_RET_VAL.length] = fn_gxtd2(xOs[k]);
			}
			fn_ejs(rowScript);
		}
		
		x11++;
		xGridIndex++;
	}
	
	var successMsg="SUCCESS!!";
	/*if(parent.parent.showNotiBox)
		parent.parent.showNotiBox(successMsg);
	*/
	var endScript = MapEndScript(dsId);
	if(endScript) {
		MAP_RET_VAL = true;
		fn_ejs(endScript);
	}
	MAP_RET_VAL = null;
}

var ptId, doctorId, docuId, recdFileName, extFileName;
var doc_version="";
var ext_connected_recd="";
function SaveProc(x1)
{
	if(x1 != null && x1.length >=3)
	{
		if(x1.substring(0, 3) == "OK^")
		{
			if(recordType=="99")
			{
				//fn_irdtd(docuId,ptId,doctorId, x1);
			}
			else
			{
				SeqNo =x1.substring(3, x1.length);
				RVInfo[10]=SeqNo;
				ProcAllMap(1);
			}
		}
	}
}


function fn_shc(x0)
{
	var x1;
	/*if(ParsingRule[x0][3]==17) {
		x1 =document.getElementById("IMG_"+ParsingRule[x0][0]);
		x1.style.display='block';
	}
	else*/
	 {	
		if(ParsingRule[x0][3]=='7' || ParsingRule[x0][3]=='6' )
		{
			if(ParsingRule[x0+1][2]=='8')
				x1=document.getElementById(ParsingRule[x0+1][0]);//x1=document.getElementById("CHECK_"+ParsingRule[x0][0]+"_0");
	   }
	   /*else if(ParsingRule[x0][3]=='11')
		{
				x1=document.getElementById("IMR_"+ParsingRule[x0][0]);
				//
	   }*/
	   else
	  {
			x1=document.getElementById(ParsingRule[x0][0]);
			if(x1 ==null)
				x1=document.getElementById("INPUT_"+ParsingRule[x0][0]);
			if(x1 ==null)
				x1=document.getElementById("VAL_"+ParsingRule[x0][0]);
			
	   }
		
	}
	
	while(x1 != null)
	{
		/*
		if(ParsingRule[x0][3]==17) 
		{
			if(x1.tagName == "TABLE" || x1.tagName == "SPAN" || x1.tagName == "TR")
			{
				//if(x1.style.display=='none')
					x1.style.display='block';
			}
		}
		else*/
		{
			if(x1.tagName == "TABLE" || x1.tagName == "SPAN" || x1.tagName == "TR")
			{
				if(x1.style.display=='none')
					x1.style.display='inline-block';
			}
			if(ParsingRule[x0][3]!='7' && ParsingRule[x0][3]!='6' )
			{
				if(x1.tagName == "TABLE" || x1.tagName == "SPAN")
				{
					if(x1.style.display=='inline-block')
						x1.style.display='block';
				}
			}
		}
		x1 = x1.parentElement;
	}
	
	/*
	while(x1 != null)
	{
		if(x1.tagName == "DIV" || x1.tagName == "TABLE" || x1.tagName == "SPAN" || x1.tagName == "TR" || x1.tagName == "TEXTAREA" || x1.tagName == "IMG")
		{
			if(x1.tagName == "DIV")
				x1.style.display='inline-block';
			else if(x1.tagName == "SPAN")
			{
				//if(ParsingRule[x0][3] == 6 || ParsingRule[x0][3] == 7)
					x1.style.display='inline-block'; //2016-05-12 강은미
				//else
				//	x1.style.display='block';
			}
			else
				x1.style.display='';
		}
		x1 = x1.parentElement;
	}
	*/
	
}

var CSX_X2=null;
function fn_loadSavedXml(x0)
{
	//alert("fn_loadSavedXml["+x0+"]");
	var x1;
	if(window.ActiveXObject)
	{
		x1=new ActiveXObject("Microsoft.XMLDOM");
		x1.async="false";
		G_ORGXML=x0.replace("encoding='UTF-16'", "encoding='euc-kr'");
		x1.loadXML(G_ORGXML);
	}
	else if(window.DOMParser)
	{
		var parser = new DOMParser();
		x1 = parser.parseFromString(x0.replace("encoding='UTF-16'", "encoding='euc-kr'"),"text/xml");
	}
	if(x1==null)
		return;
	
	var x2 = x1.getElementsByTagName("ATTRIBUTE");
	var x5 = x2.length;
	var i, j, k;
	var x4="";
	var x3;
	CSX_X2=x2;
	fn_cav();

	for(i =0; i<x5; i++)
	{
		x3 = x2[i];
		var pn = fn_fprbc(x3.getAttribute("controlId"));			
		if(pn < 0) continue;
		var x11 = fn_cvbax(pn, x3, "");
		if(x11 > 0) fn_shc(pn);
	}
	
	G_OutXml4Attr=x2;
	x2 = x1.getElementsByTagName("GRID");
	x5 = x2.length;
	for(i=0; i<x5; i++)
	{
		x3 = x2[i];
		var pn = fn_fprbc(x3.getAttribute("controlId"));
		if(pn<0) continue;
		fn_sgvbgx(pn, x3);
	}

	//Groups used Visible Condition must hide!!
	/*
	for(x6=0; x6<ConnectedItem.length; x6++)
	{
		//var x8;
		//for(x8=0; x8<InstItem.length; x8++)
		//	if(ConnectedItem[x6][0] == InstItem[x8][0])
		//if(x8 == InstItem.length)
		//	continue;

		fn_ejs("resultData = " + ConnectedItem[x6][1]);
		var x7 = document.getElementById(ConnectedItem[x6][0]);
		if(x7 == null)
			continue;
		if(resultData == 0 || resultData == 'false' || resultData == "")
			x7.style.display = 'none';
		else
			x7.style.display = 'block';
	}
	*/

	G_OutXml4Attr_Grid=x2;
	if(G_VT01>=2)
	{
		AutoCalc4Out();
	}
	G_OutXml4Attr=null;
	G_OutXml4Attr_Grid=null;
	G_ORGHTML=document.body.innerHTML;
	
	//alert(document.body.innerHTML);
	if(typeof(fn_SetMasking)=="function")
		fn_SetMasking();
		
	//if(typeof changeTextareaTag=='function')
		changeTextareaTag();
	
	/*
	if( parent != null && typeof(parent.calledChildDocument) == 'function'){
		parent.calledChildDocument();
	}*/

	/*BK_SetSpecId();
	if(typeof extFileName != "undefined" && extFileName!="")
		xmlhttpPost(SERVERPRO + SERVERIP + extFileName, "", 100);
		*/
	
	/*
	if(G_B_AutoSave==1)
	{
		post_to_url("");
	}
	else if(G_B_AutoSave==2)
	{
		post_to_temp("");
	}
	*/
}

function xmlhttpPost(strURL, postData, mode)
{
    var xmlHttpReq = false;
    var self = this;
    if (window.XMLHttpRequest) {
        self.xmlHttpReq = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    self.xmlHttpReq.onreadystatechange = function() {
        if (self.xmlHttpReq.readyState == 4) {
        		if(mode==0)
        		{
       			AjaxUpdate(self.xmlHttpReq.responseText);
        		}
        		else if(mode ==1)
        		{
        			fn_loadSavedXml(self.xmlHttpReq.responseText);
        		}
        		else if(mode==2)
        		{
        			SaveProc(self.xmlHttpReq.responseText);
        		}
        		else if(mode==3)
        		{
        		}
        		else if(mode==100)
      			{
      				//BK_loadHXml(self.xmlHttpReq.responseText);
      				LoadHighlightXML(self.xmlHttpReq.responseText);
      			}
        }
    }
    if(self.xmlHttpReq == null)
    {
    	alert("Can't get the XML HTTP");
    	return;
    }
    if(postData=="")
    	self.xmlHttpReq.open('GET', strURL, false);
    else
    	self.xmlHttpReq.open('POST', strURL, false);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    self.xmlHttpReq.send(postData);
}

var DI_ID = -1; //2015-06-19 변수추가


function ProcMap(idx)
{
	var strXml="";
	var len = DsIfInfo.length;
	var i;
	var x1=0;
	var idStr = DsMapInfo[idx][0];

	strXml = "xmlData=<?xml version='1.0' encoding='euc-kr'?>";
	strXml += "<DATASET id='"+idStr+"'>";
	strXml += "<NAME>"+DsMapInfo[idx][1]+"</NAME>";
	bMapContinue=1;
	while(bMapContinue != 0)
	{
		bMapContinue=0;
		strXml += "<INPUTSET id='1'>";
		for(i=0;i<len; i++)
		{
			if(DsIfInfo[i][0] != idStr)
				continue;
			if(DsIfInfo[i][2] ==2)
			{
				if(GetMapVal(i, x1)==0)
					return;
			}
			if(DsIfInfo[i][2] != 0)
				continue;
			strXml += "<INPUT Name='"+DsIfInfo[i][1]+"'>"+GetMapVal(i,x1)+"</INPUT>";
		}
		strXml += "</INPUTSET>";
		if(bMapContinue==2)
			break;
		x1++;
	}
	for(i=0; i<len; i++)
	{
		if(DsIfInfo[i][0]!=idStr)
			continue;
		if(DsIfInfo[i][2] != 1)
			continue;
		strXml += "<OUTPUT Name='"+DsIfInfo[i][1]+"'/>";
	}
	strXml += "</DATASET>";
	xmlhttpPost(SERVERPRO+SERVERIP+"/EMR_DATA/MAPPER_TEST_ORCL", strXml, 0);//xmlhttpPost(SERVERPRO+SERVERIP+"/medios/EMR/MAPPER_TEST_ORCL", strXml, 0);
}



function ProcAllMap( eventTime)
{
	//document.oncontextmenu=function(){return false;}
	var len = DsMapInfo.length;
	var i;
	var strXml;
	if(G_VT01 !=0)
		return;
	for(i=0; i<len; i++)
	{
		if(DsMapInfo[i][2] == eventTime)
		{
			strXml = ProcMap(i);
		}
	}
}


function fn_setFocus(x1)
{
	var x3 = document.getElementById("INPUT_"+ParsingRule[x1][0]);
	if(x3 != null)
	{
		x3.style.background='#ffff99';
		x3.focus();
	}
	return 1;
}


function SaveHtml() {
	var strHtml = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=euc-kr'>";
		strHtml += "<link href='"+SERVERPRO+SERVERIP+"/EMR_DATA/css/test2.css' type='text/css' rel='stylesheet'/>";
		strHtml += "<script src='"+SERVERPRO+SERVERIP+"/EMR_DATA/script/BK_COMMON_SCRIPT_PRINT.js'><";
		strHtml += "/script></head><body>";
		strHtml += document.body.innerHTML;
		strHtml += "</body></html>";
		recordType = "99";

		xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/eView2/SaveRecord_All",
			"doc_info="+SeqNo+"^"+docuId+"^"+ptId+"^"+doctorId+"^"+doc_version+"^"
			+Department+"^"+chos_no+"^"+paramType
			+"^3^"+ext_connected_recd+"^"+RVInfo[15]+"^"+RVInfo[16]+"^"+RVInfo[18]
			+"&xmlData="+ToHex4Unicode(strHtml), 2);
}


function fn_gdifv(x1, x2)
{
	ptId = x1[0];
	doctorId = x1[1];
	docuId = x1[2];
	recdFileName = x1[3];
	Department = x1[4];
	Cate1 = x1[5];
	Cate2 = x1[6];
	Cate3 = x1[7];
	paramType = x1[8];
	chos_no=x1[9];
	SeqNo = x1[10];
	G_RVIFV = x2;
	
	/*
	if(typeof x1[19] != "undefined")
		extFileName = x1[19];
	else
		extFileName = x1[18];
	*/
	if(SeqNo == null || SeqNo == "")
	{
		SeqNo = "0";
		B_SAVE_UPDATE=0;
	}
	else
	{
		B_SAVE_UPDATE=1;
	}

	var x2=0;
	for(x2=0;x2<x1.length;x2++)
		RVInfo[x2]=x1[x2];
	if(recdFileName != null && recdFileName != "0")
		fn_svfxf(recdFileName);
	if(G_RVIFV != "")
		VP_ChangeDiagnosisRecd();

	fn_ejs(G_DOCSCRIPT2);
	bLoadingMap=1;

	if(G_VT01 == '2' || G_VT01 == '3'){
		if(parent.onloadIframe)
			parent.onloadIframe();
	}
	//parent.dualViewFlag = true;
}

/*상용구*/
function fn_gpdfp(filename)
{
}


function fn_rfshImg(no)
{
	var strImgArr=BIR_INFO[no][2].split('?');
	var imgStr = "";
	for(i=0; i<strImgArr.length; i++)
	{
		var iif = strImgArr[i].split('*');
		if(iif[0] == '1')
		{
			var curUrl = SERVERIP+"/EMR_DATA";
			var y1 = iif[1];
			var y2 = y1.split(':');
			if(y2.length >= 2)
			{
				y1 = curUrl + y2[1];
				y1 = y1.replace(/\\/g, "/");

				if(imgStr != "")
					imgStr += "?";
				imgStr += SERVERPRO + y1;
			}
		}
	}

	var htmlStr="";
	var i, j=0;
	if(strImgArr.length >0)
	{
		htmlStr += "<TABLE>";
	}
	for(i=0; i<strImgArr.length; i++)
	{
		if(strImgArr[i]=="")
			continue;
		if( j == 0)
			htmlStr += "<TR>";
		j++;
		htmlStr += "<TD valign=top ";
		if((i == (strImgArr.length-1)) && (j < BIR_INFO[no][1]))
		{
			htmlStr += " colspan='"+(BIR_INFO[no][1]-j)+"'>";
		}
		else
		{
			htmlStr += ">";
		}
		if(BIR_INFO[no][3]!="-1")
		{
			if(imgStr != "")
				htmlStr += "<IMG style='border:1px solid black;' onclick=\"ShowMultiImagePopup('"+imgStr+"');\" width='"+BIR_INFO[no][3]+"px'";
			else
				htmlStr += "<IMG style='border:1px solid black;' width='"+BIR_INFO[no][3]+"px'";
		}
		else
		{
			htmlStr += "<IMG style='border:1px solid black;'  size=0 onclick='resizeImg(this);' pId='IMR_"+BIR_INFO[no][0]+"'";
		}
		{
			var iif = strImgArr[i].split('*');
			if(iif.length <= 1)
			{
				//htmlStr +=  "SRC='http://"+SERVERIP+strImgArr[i]+"'>"
				//htmlStr +=  "SRC='http://"+SERVERIP+strImgArr[i]+"' onclick='ShowImagePopup(\SERVERPRO+SERVERIP+iif[i]+"\");';>"
				//htmlStr +=  "SRC='http://"+SERVERIP+strImgArr[i]+"' onclick='ShowMultiImagePopup(\SERVERPRO+SERVERIP+iif[i]+"\");';>"
				htmlStr +=  "SRC='"+SERVERPRO+SERVERIP+strImgArr[i]+"'>"
			}
			else if( iif[0] =='0')
			{
				htmlStr += "SRC='"+SERVERPRO+SERVERIP+iif[1]+"'>";
			}
			else if( iif[0] =='1')
			{
				var curUrl = "";
				if(SERVERIP == "192.168.2.55")
					curUrl = "192.168.1.101/EMR_DATA";
				else
					curUrl = SERVERIP+"/EMR_DATA";
				var x12=iif[1];
				var x13 = x12.split(':');
				if(x13.length >= 2)
				{
					x12 = curUrl+x13[1];
					x12 = x12.replace(/\\/g, "/");

					htmlStr += "SRC='"+SERVERPRO+x12+"'>";
				}
			}
			else if( iif[0] =='2')
			{
				htmlStr += "SRC='"+iif[1]+"' onclick='ShowImagePopup("+iif[1]+");';>";
			}
			else if( iif[0] =='3')
			{
				htmlStr += "SRC='"+SERVERPRO+SERVERIP+"/sp/comNavi/RetrieveRsltImgForEmr.img?"+iif[1]+"' onclick='ShowImagePopup(\""+SERVERPRO+SERVERIP+"/sp/comNavi/RetrieveRsltImgForEmr.img?"+iif[1]+"\");';>";
			}
		}
		if(G_VT01<2)
			htmlStr += "<br><SPAN align='center'><INPUT TYPE=BUTTON VALUE='DEL' onClick='fn_clrImg("+no+","+i+");'></span></TD>";
		else
			htmlStr += "</TD>";
		if(j >= BIR_INFO[no][1] || i == (strImgArr.length-1))
		{
			j =0;
			htmlStr += "</TR>";
		}
	}
	if(strImgArr.length >0)
	{
		htmlStr += "</TABLE>";
	}
	obj = document.getElementById("IMR_"+BIR_INFO[no][0]);
	if(obj) {
		obj.style.border = "0px solid white";
		obj.style.display="inline-block";
		obj.innerHTML = htmlStr;
		//alert(htmlStr);
	}
}

function fn_addImg(no, urlStr, urlType)
{
	if(BIR_INFO[no][2] != "")
	{
		BIR_INFO[no][2] += "?";
	}

	var urlStr1=urlStr.split('*');
	if(urlStr1 <2 )
		BIR_INFO[no][2] += urlType+'*'+urlStr;
	else
		BIR_INFO[no][2] += urlStr;
	fn_rfshImg(no);
}


function fn_clrAllImg(no)
{
}


function GetImageRegisterData(pn)
{
	var x1 = BIR_INFO.length;
	var no;
	for(no=0;no<x1;no++)
	{
		if(ParsingRule[pn][0] == BIR_INFO[no][0])
		{
			break;
		}
	}
	if(no==x1)
		return "";

	var strImgArr=BIR_INFO[no][2].split('?');
	var xmlStr="";
	for(i=0; i<strImgArr.length; i++)
	{
		if(strImgArr != "")
		{
			xmlStr += "<VALUE con_id='' con_term=''>"+fn_rpls4x(strImgArr[i])+"</VALUE>";/*(O)*/
		}
	}
	return xmlStr;
}

var retPopup=new Array();

function callPopup(type, arg)
{
		retPopup[0]= new Array();
		retPopup[1]= new Array();
		retPopup[2]= new Array();
		retPopup[0][0] = 'chang1';
		retPopup[0][1] = 'chang2';
		retPopup[0][2] = 'chang3';
		retPopup[0][3] = 'chang4';
		retPopup[1][0] = 'jeom';
		retPopup[2][0] = 'kyoon';
}

function SetPopupValue(idStr, ar1)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==idStr)
			break;
	if(x2==x1)
		return 0;

	var x8;
	if(ParsingRule[x2][2]==4)
	{
		var x3=ar1.length;
		var x4;
		for(x4=0;x4<x3;x4++)
		{
			fn_sgvbdv(x2, ar1[x4], x4);
		}
	}
	else if(ParsingRule[x2][2]==5)
	{

		var x3=ar1.length;
		if(x3>0)
			SetValue(idStr, ar1[0], '');
		else
			SetValue(idStr, '0', '');
	}
	return 0;
}





function xmlhttpPost_Sync(strURL, postData, mode)
{
	
    var xmlHttpReq = false;
    var self = this;

    if (window.XMLHttpRequest) {
        self.xmlHttpReq = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if(self.xmlHttpReq == null)
    {
    	alert("Can't get the XML HTTP");
    	return;
    }

    if(postData=="")
    	self.xmlHttpReq.open('GET', strURL, false);
    else
    	self.xmlHttpReq.open('POST', strURL, false);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    self.xmlHttpReq.send(postData);

    if (self.xmlHttpReq.readyState == 4)
    {
    	if(mode==0) //2015-06-19 mode 추가
    		AjaxUpdate(self.xmlHttpReq.responseText);    	
    	else if(mode ==3)
    		return SaveProc_Img(self.xmlHttpReq.responseText);
    	else if(mode==1)
    		return fn_loadSavedXml(self.xmlHttpReq.responseText);
    	else if(mode==2)
    	{
    		SaveProc(self.xmlHttpReq.responseText);
    	}
    	else
    		return self.xmlHttpReq.responseText;
    }

}


function fn_GetPaintValue(pn)
{
	var x0=document.getElementById("APP_"+ParsingRule[pn][0]);
	if(x0 == null)
		return;
	var x1=x0.fna_gcifa();
	var x2;
	var x10="";
	for(x2=0;x2<x1;x2++)
	{
		var x3=x0.fna_siffa(x2);
		var sFileName="";
		if(G_VT02==0)
		{
			//var dateStr = GetDateString1();
			//var sfileName=docuId+"_"+doctorId+"_"+ptId+"_"+x2+"_"+dateStr+".jpg";
			//fn_svf(pathInfo+sfileName, x3);
			//sFileName = "http://localhost/"+xmlhttpPost_Sync(SERVERPRO+"localhost"+"/medios/EMR_DATA/save_image.jsp", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+ParsingRule[pn][0]+"_"+x2+"&imgData="+x3, 3);
			sFileName = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/medios/EMR/save_image", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+ParsingRule[pn][0]+"_"+x2+"&imgData="+x3, 3);
		}
		else
		{
			sFileName = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/medios/EMR/save_image", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+ParsingRule[pn][0]+"_"+x2+"&imgData="+x3, 3);
			//xmlhttpPost(SERVERPRO+SERVERIP+"/medios/EMR_DATA/save_image.jsp", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+ParsingRule[pn][0]+"_"+x2+"&imgData="+x3, 3);
		}
		if(x2 >0)
			 	x10 += '?';
		x10 += sFileName;
	}
	ParsingRule[pn][13]=x10;
}



/*
var popupInfo = new Array();
popupInfo[0] = ["phrasalSearching.jsp", 500, 700, "N"];					// 상용구
popupInfo[1] = ["studyContrastSearching.jsp", 600, 600, "N"];		// 판독결과조회
popupInfo[2] = ["userSearching.jsp", 300, 550, "D"];						// 부서조회
popupInfo[3] = ["userSearching.jsp", 300, 550, "U"];						// 사용자조회

function CallPopupWinFunc(controlID, popupNo)
{
	var conID = controlID.split('/');
	var popWin = popupInfo[popupNo];
	var ret_val1 = parent.openButtonPopup(popWin[0], popWin[1], popWin[2], popWin[3]);
	if(ret_val1 == null)
	{
		alert("ret_val1 == null");
		return;
	}

	var len = ret_val1.length;
	for(i=0; i<len; i++)
	{
		var ret_val2 = ret_val1[i];
		var len2 = ret_val2.length;

		for(j=0; j<len2; j++)
			SET_VAL(conID[j], ret_val2[j]);
	}
}
*/

function ShowEmrPopupView(docuId)
{
	var pid = GET_COOKIE_VAL(0);
	var doctorId = GET_COOKIE_VAL(1);
	var arrayFormId = docuId;
	var divisionId = GET_REQUEST_VAL('divisionId1');
	var eMRType = "E";
	var chosType = GET_REQUEST_VAL('chosType');
	var chosNo = GET_COOKIE_VAL(9);
	var arrTypeVar = "^extRecdCode|"+GET_COOKIE_VAL(10);
	//var pid = "10355264";
	//var doctorId = "110078";
	//var divisionId = "";
	//var chosType = "E";
	//var chosNo = "20110609O00142";
	var dialogWidth = 800;
	var dialogHeight = 1000;

	var urlStr = SERVERPRO + SERVERIP + ":" + SERVERPORT + "/eView/document_eView.jsp";
	//window.showModalDialog("http://192.168.2.55:80/eView/document_eView.jsp?eMRType=E&pid=10355264&doctorId=110078&chosType=E&chosNo=20110609O00142&madcrDate=&arrayFormId=28262&arrayRecordId=&exmn_rcpn_no=0&exmn_rslt_sqno=0&left=0&top=0&width=692&height=747&deptCd=12000&cpMode=N&DataSet=null&prscSqno=0", "",'dialogWidth='+width+'px; dialogHeight='+height+'px; center:yes; scroll=no; resizable=no; status:no; help:no; dialogHide:yes;');
	window.showModalDialog(urlStr + "?eMRType="+eMRType+"&pid="+pid+"&doctorId="+doctorId+"&chosType="+chosType+"&chosNo="+chosNo+"&arrayFormId="+arrayFormId+"&divisionId="+divisionId+"&left=0&top=0&iWidth="+dialogWidth+"&iHeight="+dialogHeight+"&arrayRecordId=+"+"&arrTypeVar="+arrTypeVar, "",'dialogWidth='+dialogWidth+'px; dialogHeight='+dialogHeight+'px; center:yes; scroll=no; resizable=no; status:no; help:no; dialogHide:yes;');
	return;
}


function GetGridStringValue(id, delimeter)
{
	var x1 = G_V_Info.length;
	var x2;
	var result;
	for(x2=0; x2<x1; x2++)
	{
		if(id == G_V_Info[x2][0])
		{
			var x3 = 0;
			for(x3=0; x3<GD_Info.length; x3++)
			{
				if(G_V_Info[x2][1] == GD_Info[x3][0])
				{
					var x4;
					result = new Array(GD_Info[x3][1]);
					for(x4=0; x4<GD_Info[x3][1]; x4++) //row count
					{
						var temp = "";
						var x5 = 0;
						for(x5=0; x5<G_V_Info[x2][3]; x5++) //column count
						{
							if(x5 != 0)
								temp += delimeter;
							temp += GetStringValue(G_V_Info[x2][0],"_"+x4+"_"+x5);
						}
						result[x4] = temp;
					}
				}
			}
			break;
		}
	}
	return result;
}


function GetGridStringValue(id, delimeter)
{
	var x1 = G_V_Info.length;
	var x2;
	var result;
	for(x2=0; x2<x1; x2++)
	{
		if(id == G_V_Info[x2][0])
		{
			var x3 = 0;
			for(x3=0; x3<GD_Info.length; x3++)
			{
				if(G_V_Info[x2][1] == GD_Info[x3][0])
				{
					var x4;
					result = new Array(GD_Info[x3][1]);
					for(x4=0; x4<GD_Info[x3][1]; x4++) //row count
					{
						var temp = "";
						var x5 = 0;
						for(x5=0; x5<G_V_Info[x2][3]; x5++) //column count
						{
							if(x5 != 0)
								temp += delimeter;
							temp += GetStringValue(G_V_Info[x2][0],"_"+x4+"_"+x5);
						}
						result[x4] = temp;
					}
				}
			}
			break;
		}
	}
	return result;
}

function ShowPopup(filePath)
{
	var pID = "";
	if(filePath == ""){
		pID = GET_COOKIE_VAL(0);
		filePath = "http://192.168.102.75/musescripts/museweb.dll?RetrieveTestlist?PatientID="+pID+"&Site=1";
	}
	window.open(filePath, '_blank', 'width=1200, height=1000 status:no');
}

function ShowImagePopup(filePath)
{
	var optionStr = "dialogwidth:1200px; dialogHeight:1000px; status:no; help:no; resizable:yes;";
	window.showModelessDialog(filePath, window, optionStr);
	//window.showModalDialog(filePath, window, optionStr);
	//window.open(filePath, window, optionStr);
}

function ShowMultiImagePopup(imgStr)
{
	if(imgStr == "")
		return "";
	var x1 = imgStr.split('?');
	if(x1.length < 1)
		return "";
	var popHtml = "";
	popHtml += "<TABLE>\n";
	for(x2=0; x2<x1.length; x2++)
	{
		popHtml += "<TR><TD valign=top>\n";
		popHtml += "<IMG style='border:1px solid black;' width='1200px' SRC='"+x1[x2]+"'>\n";
		popHtml += "</TD></TR>";
	}
	popHtml += "\n</TABLE>";


	var args = new Array();
	args["SOURCE"] = popHtml;
	var optionStr = "dialogwidth:1250px; dialogHeight:1000px; status:no; help:no; resizable:yes;";
	window.showModelessDialog('../img/popup/MultiImage.html', args, optionStr);
	//window.showModalDialog('../img/popup/MultiImage.html', args, optionStr);
	//window.open('../img/popup/MultiImage.html', args, optionStr);
	return;
}

function SetValueByConceptId(conceptId, valStr)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][5] == conceptId)
			break;
	if(x2==x1)
		return 0;

	SetValue(ParsingRule[x2][0],valStr,"");
}

function VP_ChangeDiagnosisRecd()
{
	var flag = GET_REQUEST_VAL('dStyle');
	if(flag == "" || flag == null || flag != 1)
		return;

	SetValueByConceptId(60594, GET_REQUEST_VAL('iChosNo')); // 등록번호
	SetValueByConceptId(60596, GET_REQUEST_VAL('ipName')); // 성명(이름, 장애인이름, 사망자성명)
	SetValueByConceptId(60612, GET_REQUEST_VAL('ipSex')); // 성별
	SetValueByConceptId(62381, GET_REQUEST_VAL('ipIdNum')); // 주민등록번호
	SetValueByConceptId(60616, GET_REQUEST_VAL('ipAddress')); // 주소
	SetValueByConceptId(62320, GET_REQUEST_VAL('ipAddNo')); // 우편번호
	SetValueByConceptId(60150, GET_REQUEST_VAL('ipAge')); // 연령(나이)
	SetValueByConceptId(7000012, GET_REQUEST_VAL('ipCreNo')); // 건강보험증 번호 (의료보험증번호,세대관리번호)
	SetValueByConceptId(7000013, GET_REQUEST_VAL('ipEmail')); // e-mail
	SetValueByConceptId(60640, GET_REQUEST_VAL('ipPhone1')); // 전화번호1(집전화)
	SetValueByConceptId(60642, GET_REQUEST_VAL('ipPhone2')); // 전화번호2, 휴대전화(이동전화번호)
	SetValueByConceptId(7000014, GET_REQUEST_VAL('ipParId')); // 세대주 주민등록번호
	SetValueByConceptId(7000015, GET_REQUEST_VAL('ipParName')); // 세대주 명
	SetValueByConceptId(7000016, GET_REQUEST_VAL('ipCountry')); // 국적
	SetValueByConceptId(2636, GET_REQUEST_VAL('ipDobr')); // 출생일 (생년월일,호적생년월일)
	SetValueByConceptId(7000018, GET_REQUEST_VAL('ipDotm')); // 출생시각
	SetValueByConceptId(7000020, GET_REQUEST_VAL('ipPoby')); // 출산아의 모
	SetValueByConceptId(7000022, GET_REQUEST_VAL('ipPoAddr')); // 산모의 주소

	var temp = "등록번호 : " + GET_REQUEST_VAL('iChosNo') +
						 "\n성명(이름, 장애인이름, 사망자성명) : " + GET_REQUEST_VAL('ipName') +
						 "\n성별 : " + GET_REQUEST_VAL('ipSex') +
						 "\n주민등록번호 : " + GET_REQUEST_VAL('ipIdNum') +
						 "\n주소 : " + GET_REQUEST_VAL('ipAddress') +
						 "\n우편번호 : " + GET_REQUEST_VAL('ipAddNo') +
						 "\n연령(나이) : " + GET_REQUEST_VAL('ipAge') +
						 "\n건강보험증 번호 (의료보험증번호,세대관리번호) : " + GET_REQUEST_VAL('ipCreNo') +
						 "\ne-mail : " + GET_REQUEST_VAL('ipEmail') +
						 "\n전화번호1(집전화) : " + GET_REQUEST_VAL('ipPhone1') +
						 "\n전화번호2, 휴대전화(이동전화번호) : " + GET_REQUEST_VAL('ipPhone2') +
						 "\n세대주 주민등록번호 : " + GET_REQUEST_VAL('ipParId') +
						 "\n세대주 명 : " + GET_REQUEST_VAL('ipParName') +
						 "\n국적 : " + GET_REQUEST_VAL('ipCountry') +
						 "\n출생일 (생년월일,호적생년월일) : " + GET_REQUEST_VAL('ipDobr') +
						 "\n출생시각 : " + GET_REQUEST_VAL('ipDotm') +
						 "\n출산아의 모 : " + GET_REQUEST_VAL('ipPoby') +
						 "\n산모의 주소 : " + GET_REQUEST_VAL('ipPoAddr');

	//alert(temp);
}

function ShowPdfPopup(pdfStr)
{
	if(pdfStr == "" || pdfStr == null)
		return;
	var curUrl = "";
	if(SERVERIP == "192.168.2.55")
		curUrl = "192.168.1.101/EMR_DATA";
	else
		curUrl = SERVERIP+"/EMR_DATA";

	var x1 = pdfStr;
	var x2 = x1.split(':');
	var x3 = "";
	if(x2.length >= 2)
	{
		x1 = curUrl+x2[1];
		x1 = x1.replace(/\\/g, "/");

		x3 += SERVERPRO+x1;
	}
	else
		return "";

	var args = new Array();
	args["SRC"] = x3;

	var optionStr = "dialogwidth:1250px; dialogHeight:1000px; status:no; help:no; resizable:yes;";
	window.showModalDialog('../img/popup/PdfPopup.html', args, optionStr);
	return;
}


function setOldValue(pn,x1,r,ft)
{
	return;
	var x=x1.getElementsByTagName("VALUE");
	if(x.length<=0)
		return;
	var i;
	var v="";
	for(i=0;i<x.length;i++)
	{
		v += x[i].text;
	}
	x=x1.getElementsByTagName("UNIT");
	if(x.length)
		v+=x[0].text;
	if(r=="")
	{
		G_OV[pn]=v;
		G_OFT[pn]=ft;
	}
}


function fn_getFormatText(x1)
{
	var x8=document.getElementById(x1);
	if(x8)
		return x8.innerHTML;
	return "";
}

function fn_printXml(x1)
{
	var j;
	if(x1.nodeTypeString=='text')
		return x1.text;
	var rStr= "<"+x1.tagName+" ";
	var x3 =x1.attributes;
	if(x3)
	{
		var x4=x3.length;
		for(j=0;j<x4;j++)
		{
			if(x3[j].text)
				rStr += x3[j].nodeName+"='"+x3[j].text+"' ";
			else
				rStr += x3[j].nodeName+"='' ";
		}
	}
	x3=x1.childNodes;
	if(x3==null)
	{
		return rStr+">";
	}
	x4 =x3.length;
	rStr += ">";

	for(j=0;j<x4;j++)
	{
		rStr += fn_printXml(x3[j]);
	}
	rStr += "</"+x1.tagName+">";
	return rStr;
}

function fn_saveFormatData()
{
	if(document.body.innerHTML == G_ORGHTML)
	{
		alert("Not changed!!");
		return;
	}
	var x1=new ActiveXObject("Microsoft.XMLDOM");
	x1.async="false";
	x1.loadXML(G_ORGXML);
	if(x1==null)
		return;
	var rStr="<?xml version='1.0' encoding='EUC-KR' ?>";

	var x2 = x1.getElementsByTagName("DOCUMENT");
	if(x2)
	{
		rStr += "<DOCUMENT docid='"+x2[0].getAttribute("docid")+"' version='"+x2[0].getAttribute("version")+"' name='"+x2[0].getAttribute("name")+"' Date='"+GetDateString()+"'>";
	}

	x2 = x1.getElementsByTagName("ATTRIBUTE");
	var x5=x2.length;
	var i;
	for(i=0;i<x5;i++)
	{
		var x3=x2[i];
		var pn = fn_fprbc(x3.getAttribute("controlId"));
		if(pn < 0) continue;
		var o=document.getElementById(ParsingRule[pn][0]);
		if(o == null) continue;

		rStr += "<ATTRIBUTE con_id='"+x3.getAttribute("docid")+"'"
  		+ " con_term='"+x3.getAttribute("con_term")+"'"
  		+ " path='"+x3.getAttribute("path")+"'"
  		+ " controlId='"+x3.getAttribute("controlId")+"'"
  		+ " name='"+x3.getAttribute("name")+"'"
  		+ " FORMATTEXT='"+fn_rpls4x(o.innerHTML)+"'>";

  		var x7=x3.getElementsByTagName("VALUE");
  		var x8;
  		for(x8=0;x8<x7.length;x8++)
  		{
  			rStr += fn_printXml(x7[x8]);
  		}
  		rStr += "</ATTRIBUTE>"
	}
	rStr+="<SIGN>No Sign</SIGN></DOCUMENT>";
	alert(rStr);
}

function resizeImg(obj) {
	if(!obj)
		return;
	
	var sTypeArr = [1, 1.5, 2, 2.5];
	var sType = parseInt(obj.getAttribute('size'));
	
	if(sType == 0) {
		obj.setAttribute('orgW', obj.getAttribute('width')?obj.getAttribute('width'):obj.width);
		obj.setAttribute('orgH', obj.getAttribute('height')?obj.getAttribute('height'):obj.height);
	}
	
	sType++;
	var w = parseInt(obj.getAttribute('orgW'))*sTypeArr[sType%sTypeArr.length];
	var h = parseInt(obj.getAttribute('orgH'))*sTypeArr[sType%sTypeArr.length];
	obj.style.width = w+'px';
	obj.style.height = h+'px';
	//alert(w + " : " + h);
	obj.setAttribute('size', sType);
}

function fn_bHideGrp(x1)
{
	var x2;
	for(x2=0; x2<InstItem.length; x2++)
		if(x1 == InstItem[x2][0])
			break;
	if(x2 == InstItem.length)
		return 0;

	var x3 = document.getElementById(InstItem[x2][0]);
	if(x3 == null)
	{
		alert("It's not exist Group!!");
		return 0;
	}
	if(x3.style.display == 'none')
		return 1;
	return 0;
}

//--------------------BKSNP HighLight--------------------------------//
function changedivTextarea(){
	return;
	if(event.keyCode == 13){
		this.blur();
		this.innerHTML = this.innerHTML.replace(/<P>/gi, "<BR>").replace(/<\/P>/gi, "").replace(/<BR>/, "");
		
		if(this.innerHTML.substring(this.innerHTML.length-5,this.innerHTML.length) == "nbsp;"){
			this.innerHTML = this.innerHTML.substring(0,this.innerHTML.length-6);
		}
		this.focus();
	}	
}
function changeDIV2(){
	return;
	var changeDivCase2 = new Array();//우혜윤_for SingleLine
	var INPUTTEXT = document.getElementsByTagName('INPUT');
	var InputTextlnength = INPUTTEXT.length -1;

	for(var highlighti =InputTextlnength ; highlighti >= 0 ; highlighti--){  	
		INPUTTEXT[highlighti].onkeyup = changedivTextarea;
		var DivStyle = INPUTTEXT[highlighti].style;
		var newIt = document.createElement('div');
		newIt.id =INPUTTEXT[highlighti].id;
		var textId = newIt.id.split('_')[0];
   
		if(newIt.id != ""&& textId =='INPUT' && INPUTTEXT[highlighti].type == 'text' ){
			newIt.style.cssText = DivStyle.cssText;
			newIt.style.width = DivStyle.width;
			newIt.style.height='20px'; 	
			newIt.style.borderBottom='solid';
			newIt.style.borderColor='#ababab';
			newIt.style.borderWidth = '1px';
			newIt.style.borderTop='none'; 
			newIt.style.borderLeft='none';
			newIt.style.borderRight='none';
			newIt.style.overflow='hidden';

			if(INPUTTEXT[highlighti].parentNode.childNodes.length > 1){
				newIt.style.float='left';
			}

			newIt.cssText = DivStyle.cssText;
			newIt.readOnly = INPUTTEXT[highlighti].readOnly;
			
			if(INPUTTEXT[highlighti].readOnly!=true)
				newIt.contenteditable = 'true';
			
			newIt.innerText = INPUTTEXT[highlighti].value;
			var pNode = INPUTTEXT[highlighti].parentNode;
			pNode.replaceChild(newIt, INPUTTEXT[highlighti]);
			var GETid = document.getElementById(newIt.id);
			GETid.outerHTML = GETid.outerHTML.replace(/contenteditable="true"/g, "contenteditable=true");
			changeDivCase2.push(newIt.id);
		}
	}
	
	for(i = 0; i < changeDivCase2.length ; i++){
		document.getElementById(changeDivCase2[i]).onkeyup =changedivTextarea;
	}
}

document.onmousedown = function(e){
	if(parent.parent){
		if(parent.parent.hlOpenFlag){
			checkmode = true;
			parent.parent.dragPointer = "RECORD_PAN";
			
			if(parent.parent.openFlag){
				parent.parent.document.getElementById(parent.parent.contextName).style.display = "none";
				
				parent.parent.openFlag = false;
				parent.parent.contextName = "";
			}
		}
	}
}

document.onmouseup = function(e){
	if(parent.parent){
		if(parent.parent.hlOpenFlag){
			if(document.selection.type == "None"){
				return false;
			}else{				
				if(document.selection.createRange){
					var range = document.selection.createRange();
					var node = range.commonAncestorContainer ? range.commonAncestorContainer : range.parentElement ? range.parentElement() : range.item(0);
					var bBtnObj = parent.parent.document.getElementById("bFontBtn");
					var uBtnObj = parent.parent.document.getElementById("uFontBtn");
					var pNodeName	= node.parentNode.tagName;
					var nTagName	= node.tagName;
					
					if(pNodeName == "FONT"){
						pNodeName = node.parentNode.parentNode.tagName;
					}
					
					//UnderLine Character
					if(nTagName.indexOf("U") != -1){
						parent.parent.downSelectButton(uBtnObj);
						
						//Bold Character
						if(pNodeName.indexOf("STRONG") != -1){
							parent.parent.downSelectButton(bBtnObj);
						}else if(pNodeName.indexOf("STRONG") == -1){
							parent.parent.unSelectButton(bBtnObj);
						}
					}else if(nTagName.indexOf("U") == -1){
						parent.parent.unSelectButton(uBtnObj);
					}
					
					if(nTagName.indexOf("STRONG") != -1){
						parent.parent.downSelectButton(bBtnObj);
					}else if(nTagName.indexOf("STRONG") == -1 && nTagName.indexOf("U") == -1){
						parent.parent.unSelectButton(bBtnObj);
					}
				}
			}
		}
	}
}

if(document.body){	
	document.body.onkeyup = function(){
		var kCode = event.keyCode;
		
		if(kCode == 37 || kCode == 38 || kCode == 39 || kCode == 40){
			if(parent.parent){
				if(parent.parent.hlOpenFlag){
					if(document.selection.createRange){
						var range = document.selection.createRange();
						var node = range.commonAncestorContainer ? range.commonAncestorContainer : range.parentElement ? range.parentElement() : range.item(0);
						var bBtnObj = parent.parent.document.getElementById("bFontBtn");
						var uBtnObj = parent.parent.document.getElementById("uFontBtn");
						var pNodeName	= node.parentNode.tagName;
						var nTagName	= node.tagName;
						
						if(pNodeName == "FONT"){
							pNodeName = node.parentNode.parentNode.tagName;
						}
						
						//UnderLine Checked
						if(nTagName.indexOf("U") != -1){
							parent.parent.downSelectButton(uBtnObj);
							
							if(pNodeName.indexOf("STRONG") != -1){
								parent.parent.downSelectButton(bBtnObj);
							}else if(pNodeName.indexOf("STRONG") == -1){
								parent.parent.unSelectButton(bBtnObj);
							}
						}else if(nTagName.indexOf("U") == -1){
							parent.parent.unSelectButton(uBtnObj);
						}
						
						if(nTagName.indexOf("STRONG") != -1){
							parent.parent.downSelectButton(bBtnObj);
						}else if(nTagName.indexOf("STRONG") == -1 && nTagName.indexOf("U") == -1){
							parent.parent.unSelectButton(bBtnObj);
						}
					}
				}
			}
		}
	}
}


function trim(a){
 return a.replace(/^\s+|\s+$/g,"");
}
//--------------------BKSNP HighLight--------------------------------//


function BK_SetLabelHData(item)
{
	var len = item.length;
	for(var i=0; i<len; i++)
	{
		if(item[i].r_type == "label")
		{
			var obj = document.getElementById(item[i].r_id);
			if(obj==null || obj.style.display == "none")
				continue;
			
			var cLen = item[i].r_child?item[i].r_child.length:0;
			var chList = item[i].r_child;
			var nArr = new Array();
			if(cLen == 0 && G_VT01 >= 2)
			{
				chList = BK_GetSubElement(null, obj);
				cLen = chList.length;
			}
			
			for(var j=0; j<cLen; j++)
			{
				var tObj = document.getElementById(chList[j]);
				if(tObj==null)
					tObj = document.getElementById("VAL_"+chList[j].split("_")[1]);
				if(tObj)
					nArr[j] =  [tObj.id, tObj.outerHTML];
				else
					nArr[j] = [chList[j], ""];
			}
			
			obj.innerHTML = item[i].r_value;
		
			if(!chList || chList.length==0)
				continue
			
			for(var j=0; j<cLen; j++)
			{
				var tObj = document.getElementById(chList[j]);
				if(tObj)
					tObj.outerHTML = nArr[j][1];
			}
		}
	}
}

function BK_SetHData(item)
{
	BK_SetLabelHData(item);
	
	var len = item.length;
	var newIt = null;
	var ex = 0;
	for(var i=0; i<len; i++)
	{
		if(item[i].r_type =="label" )
			continue;
			
		item[i].r_value = item[i].r_value.replace(/ style='0'/gi, "");
		var newIt = BK_GetComObj(item[i].r_id, item[i].r_type, item[i].r_mode, item[i].r_value, item[i].r_org);
		
		if(newIt == null)
			continue;
		if(item[i].r_id.indexOf("RADIO")!=-1 && newIt.type == "radio")
			newIt = newIt.nextSibling!=null?newIt.nextSibling:newIt.previousSibling;
		else if(item[i].r_id.indexOf("CHECK")!=-1 && newIt.type == "checkbox")
			newIt = newIt.nextSibling!=null?newIt.nextSibling:newIt.previousSibling;		
			
		var chList = new Array();
		if(item[i].r_type == "grid_caption")
		{
			var chList = item[i].r_value.split("※☆※");
			var ch = newIt.childNodes;
			var cLen = ch.length;
			for(var j=0; j<cLen; j++)
			{
				ch[j].innerHTML = chList[j];
			//	ch[j].innerText = " "+ch[j].innerText;
			}
		}
		else if(newIt.nodeName != "#text")
		{
			if(newIt.id.split("_").length>2)
				item[i].r_value = item[i].r_value.replace("&nbsp;", "");
			if(item[i].r_type == "8" )
			{
				var cid = item[i].r_id.split("_");
				var ch = newIt.childNodes;
				var cLen = ch.length;
				var isUnit = false;
				var orgHTML ="";
				for(var j=0; j<cLen; j++)
				{
					if(ch[j].nodeName == "SPAN" && ch[j].id.indexOf("UNIT_"+cid[1])!=-1)
						isUnit = true;
						
					if(!isUnit)
						continue;
						
					if(ch[j].nodeName == "#text")
						orgHTML += ch[j].data;
					else
						orgHTML += ch[j].outerHTML;
				}
				//item[i].r_org = item[i].r_org.replace(/ /gi, "&nbsp;");
				//var orgHTML = newIt.innerHTML.replace(/ /gi, "&nbsp;");
				newIt.innerHTML = item[i].r_value+" "+ orgHTML;
			}
			var tempStr = newIt.innerHTML;
			tempStr = tempStr.replace(/&nbsp;/gi, "");
			//else if(item[i].r_type == "next")
				newIt.innerHTML = tempStr.replace(item[i].r_org, item[i].r_value);
			//else
			//	newIt.innerHTML = item[i].r_value;
		}
		else
		{
			var org = newIt.data;
			if(trim(org) != trim(item[i].r_org))
				newIt.nodeValue = org.replace(item[i].r_org, "※★☆※");
			else
				newIt.nodeValue = "※★☆※";
			var pNode = newIt.parentNode;
			if(pNode)
			{
				pNode.innerHTML= pNode.innerHTML.replace("※★☆※", item[i].r_value);
				//pNode.innerText = " "+pNode.innerText;
			}
		}
	}
}


function BK_GetComObj(id, type, mode, value, org)
{
	var obj = null;
	switch(type)
	{
		case "grid_caption":
		case "caption":
		obj = document.getElementById(id);
		if(obj == null && G_VT01 == 2 )
		{
			obj = document.getElementById(id.replace("CAP_", ""));
			if(obj && obj.childNodes)
			{
				var ch = obj.childNodes;
				var len = ch.length;
				for(var i=0; i<len; i++)
				{
					if(ch[i].nodeName == "#text")
						continue;
					if(ch[i].id != "")
						continue;
					if(ch[i].childNodes && ch[i].childNodes[0].tagName == "B" && ch[i].childNodes[0].id != "")
						obj = ch[i].childNodes[0];
					else 
						obj = ch[i];
					
					obj.innerHTML = (value +(value.indexOf("&nbsp;")==-1?"&nbsp;":""));//obj.innerHTML.replace(org, value);
					obj = null;
					break;
				}
			}
		/*	obj = document.getElementById(id.replace("CAP", "VAL"));
			if(obj)
			{
				if(obj.nextSibling && obj.nextSibling.nodeName != "#text")
					obj = obj.nextSibling;
				else if(obj.previousSibling && obj.previousSibling.nodeName != "#text")
					obj = obj. previousSibling;
				else
					obj = null;
			}*/
				
			if(obj)
			{
				var idx = BK_FindParsingRule(id.split("_")[1]);
				if(ParsingRule[idx][12].toUpperCase() == value.toUpperCase())
					obj = null;
			}
		}
		break;
		case "next":
			obj = document.getElementById(id.replace("INPUT", "VAL"));
			if(!obj)
			{
				var cid = id.split("_");
				var tIdx = BK_FindParsingRule(cid[1]);
				if(tIdx != -1)
				{
					var tlen = ParsingRule.length;
					for(var j= tIdx+1; j<tlen; j++)
					{
						if(ParsingRule[j][2] != 8)
							break;
						if(ParsingRule[j][3] != 8)
							break;
						var sid = ParsingRule[j][0].split("_");
						if(sid.length <0 || sid[1] != ParsingRule[tIdx][0])
							break;
						obj = document.getElementById(id.replace("INPUTU1", "VAL"));
						break;
						//return obj;	
					}
				}
			}
			if(obj)
				obj = obj.nextSibling;			
		break;
		case "prevois":
			obj = document.getElementById(id.replace("INPUT", "VAL"));
			if(obj)
				obj = obj.previousSibling;
		break;
		case "1": case "2": case "4": case "8": case "3":
			obj = document.getElementById(id);
			if(type != 8 && obj == null)
				obj = document.getElementById(id.replace("INPUT", "VAL"));
			if(type == 8 || obj == null)
				obj = document.getElementById(id.replace("INPUTU1", "VAL"));
			
			if(obj && typeof obj.tagName != "undefined")
			{
				if(obj.tagName == "INPUT" )
					obj = BK_ChangeInput(obj);
				else if(obj.tagName == "TEXTAREA")
					obj = BK_ChangeTextarea(obj);
			}

		break;
		case "checkbox":
			obj = document.getElementById(id);
			if(obj)
				break;
			
			obj = document.getElementById("VAL_"+id.split("_")[1]);
			if(obj)
			{
				obj.innerHTML = obj.innerHTML.replace(org, value);
				return null;
			}
		break;
		case "radio":
			obj = document.getElementById(id);
			if(obj == null)
				obj = document.getElementById("VAL_"+id.split("_")[1]);
			if(obj && obj.tagName != "INPUT" && obj.innerText != org)
				obj = null;
			
		break;
		default:
			obj = document.getElementById(id);
			if(obj == null)
				obj = document.getElementById(id.replace("INPUT","VAL"));
			if(obj == null)
			{
				var cid = id.split("_");
				if(cid.length>1)
				{
					var tIdx = BK_FindParsingRule(cid[1]);
					if(tIdx == -1)
						obj = document.getElementById(id.replace("VAL","CAP"));
				}
			}
			if(obj && obj.tagName == "INPUT" )
				obj = BK_ChangeInput(obj);
			else if(obj && obj.tagName == "TEXTAREA")
				obj = BK_ChangeTextarea(obj);
			
			var idx = BK_FindParsingRule(id.split("_")[1]);
			if(idx != -1 && ParsingRule[idx][2] == 4)
			{
				var tStr = obj.innerHTML;
				var tempStr1 = "";
				var ch = obj.childNodes;
				var len = ch?ch.length:0;
				var isunit=false;
				for(var j=0; j<len; j++)
				{
					if(ch[j].nodeName.toUpperCase() == "SPAN" && ch[j].id.indexOf("UNIT_")!= -1)
						isunit = true;
						
					if(isunit==false)
						continue;
						
					if(ch[j].nodeName == "#text")
							tempStr1 += ch[j].data;
					else
							tempStr1 += ch[j].outerHTML;
				}
				obj.innerHTML = value + tempStr1;
				return null;
			}
		break;
	}
	return obj;
}


function BK_FindParsingRule(id)
{
	var len = ParsingRule.length;
	for(var i=0; i<len; i++)
	{
		if(id != ParsingRule[i][0])
			continue;
		return i;
	}
	return -1;
}


function BK_Hilight()
{
	this.r_id;
	this.r_type;
	this.r_conType;
	this.r_value;
	this.r_child;
	this.r_mode;
	this.r_org;
}
function BK_GetHData(x1, item)
{
	var id = x1.getAttribute("id");
	var idx = item.length;
	item[idx] = new BK_Hilight();
	item[idx].r_id = x1.getAttribute("id");
	item[idx].r_type = x1.getAttribute("type");
	if(item[idx].r_type == "caption")
		item[idx].r_conType = x1.getAttribute("conType");
	else
		item[idx].r_conType = "";
	item[idx].r_mode = x1.getAttribute("mode");
	item[idx].r_value = "";
	var r_data = x1.getElementsByTagName("H_DATA");
	if(typeof r_data[0].text != "undefined")
		item[idx].r_value = r_data[0].text;
	else if(typeof r_data[0].textContent != "undefined")
		item[idx].r_value = r_data[0].textContent;
	var len = r_data.length;
	if(len>1)
	{
		item[idx].r_type = "G_HEAD";
		item[idx].r_value = new Array();
		for(var i=0; i<len; i++)
			item[idx].r_value[i] = r_data[i].text?r_data[i].text:r_data[i].textContent;
	}
	
	
	item[idx].r_child = null;
	var ch = x1.getElementsByTagName("IN_ITEM");
	if(ch.length)
	{
		var temp = ch[0].text?ch[0].text:ch[0].textContent?ch[0].textContent:"";
		if(temp!= "")
			item[idx].r_child = temp.split("※");
	}
	var r_org = x1.getElementsByTagName("H_ORG_DATA");
	if(r_org.length)
		item[idx].r_org = r_org[0].text?r_org[0].text:r_org[0].textContent;
}

function BK_loadHXml(x0)
{
	var x1;
	if(window.ActiveXObject)
	{
		x1=new ActiveXObject("Microsoft.XMLDOM");
		x1.async="false";
		G_ORGXML=x0.replace("encoding='UTF-16'", "encoding='euc-kr'");
		x1.loadXML(G_ORGXML);
	}
	else if(window.DOMParser)
	{
		var parser = new DOMParser();
		x1 = parser.parseFromString(x0.replace("encoding='UTF-16'", "encoding='euc-kr'"),"text/xml");
	}
	if(x1==null)
		return;
	
	var BL_ITEM = new Array();
	var hlList = x1.getElementsByTagName("H_ATTR");
	var hLen = hlList.length;
	for(var j=0; j<hLen; j++)
		BK_GetHData(hlList[j], BL_ITEM);
	
	BK_SetHData(BL_ITEM);
}

var g_enEl = null;
var g_stEl = null;
function BK_setBodyEvent()
{
	if(!document.body)
		return;
	
	if(document.body.onmouseup==null || document.body.onmouseup=="")
		document.body.onmouseup = BK_onMouseUp;
	if(document.body.onmousedown==null|| document.body.onmousedown == "")
		document.body.onmousedown =BK_onMouseDown;
	if(document.body.onkeydown == null || document.body.onkeydown == "")
		document.body.onkeydown = BK_onKeyDown;

}

function BK_onMouseUp()
{
	g_enEl = window.event.srcElement;
	if(g_stEl == null || g_enEl == null)
		return;
	var obj = parent.parent.document.getElementById('hlFontSize');
	if(obj == null)
		return;
	if(g_stEl.currentStyle.fontSize == g_enEl.currentStyle.fontSize)
	{
		
		switch(g_stEl.currentStyle.fontSize)
		{
			case "2":
				obj.value = "2";
			break;
			case "3":
				obj.value = "3";
			break;
			case "4":
				obj.value = "4";
			break;
			default:
				obj.value = "0";
			break;
		}
		
	}
	else
	{
		obj.value = "0";
	}
}
function BK_onMouseDown()
{
	g_stEl = window.event.srcElement;
	if(parent.parent && parent.parent.hlOpenFlag)
	{
		checkmode = true;
		parent.parent.dragPointer = "RECORD_PAN";
	}
}

function BK_onKeyDown()
{
	var el = event.srcElement;
	var kCode = event.keyCode;
	if(kCode != "13")
		return true;
	while(el)
	{
 		var cId = el.id?el.id:"";
 		var tm = cId.split("_");
 		if(cId == "" || tm.length<2)
 			el = el.parentElement;
 		else
 		{
 			var tIdx = BK_FindParsingRule(tm[1]);
 			if(tIdx == -1)
 				return true;
 			if(ParsingRule[tIdx][3] != 3)
 				return false;
 			return true;
 		}
	}
	
	return true;
}


function CheckCurGridValRowCnt(gvId)
{
	var x1;
	var x2;
	for(x1=0; x1<G_V_Info.length; x1++)
		if(gvId == G_V_Info[x1][0])
			break;
	if(x1 == G_V_Info.length)
		return -1;

	for(x2=0; x2<GD_Info.length; x2++)
		if(G_V_Info[x1][1] == GD_Info[x2][0])
			break;
	if(x2 == GD_Info.length)
		return -1;

	var x3;
	var rowCnt = 0;
	for(x3=0; x3<GD_Info[x2][1]; x3++)
	{
		var temp = GetStringValue(G_V_Info[x1][0], "_"+x3+"_0");
		if(temp != "")
			rowCnt = x3 + 1;
	}
	return rowCnt;
}

function BK_DoHilight(mode, value)
{
	return BK_ExecuteHilight(mode, value);
	
	if(g_stEl == null)
		return;
	
	//if(g_stEl.tagName.toUpperCase() == "TR" || g_stEl.tagName.toUpperCase() == "TD")
		//return;
		
	checkhighlight = true;
	var newIt = g_stEl;
	if(g_stEl.tagName == "input" || g_stEl.tagName == "INPUT")
		newIt = BK_ChangeInput(g_stEl);
	else if(g_stEl.tagName == "textarea" || g_stEl.tagName == "TEXTAREA")
		newIt = BK_ChangeTextarea(g_stEl);
		
	g_stEl = newIt;
	
	if(mode == 1)
	{
		
		/*if(value == "#FFFFFF" || value == "#ffffff")
			document.execCommand("backcolor", false, " ");
		else*/
			document.execCommand("backcolor", false, value);
		var range;
		if(document.selection)
		{
			try
			{
				range = document.selection.createRange();
				range.collapse(false);
				range.select();
			}
			catch(e)
			{
			}
		}
		else
		{
			range = window.getSelection();
			range.collapseToEnd();
		}
	
	}
	else if(mode == 2)
		document.execCommand("FontSize", false, value);
	else if(mode == 3)
		document.execCommand("bold");
	else if(mode == 4)
		document.execCommand("underline");
	else if(mode == 5)
		document.execCommand("ForeColor", false, value);
		 
}

function BK_ChangeInput(tItem)
{
	var sCnt = 0;
	var eCnt = 0;
	var dvId = "";
	var rText = "";
	var tagType = false;
	
	var pos = -1;
	if(document.selection && document.selection.type != "None" && document.selection.createRange)
	{
		var range = document.selection.createRange();
		var node = range.commonAncestorContainer ? range.commonAncestorContainer : range.parentElement ? range.parentElement() : range.item(0);
		var nText = node.value;
		if(typeof nText != "undefined")
			rText = range.text;
			
		pos = BK_FindPos4Single(range, node, nText);
		
		dvId = node.id;
		tagType = true;
	}
	else if(window.getSelection)
	{
		var range = window.getSelection();
		var node = range.anchorNode;
		if(node != null && node.nodeName != "#text")
		{
			sCnt = node.innerText.indexOf(range.Text);
			eCnt = range.focusOffset;
		}
		dvId = tItem.id;
	}
	
	
	var newIt = document.createElement('SPAN');
	newIt.id = tItem.id;
	var textId = newIt.id.split('_')[0];
 
	if(newIt.id != ""&&  tItem.type == 'text' )
	{
		newIt.className = "editable_div";
		newIt.style.width = tItem.style.width;
		newIt.style.height='20px'; 	
		//newIt.style.borderStyle = 'solid'; 
		//newIt.style.borderWidth = '1px';
    //newIt.style.borderColor='#ababab';

		newIt.style.cssText = tItem.style.cssText;
		//newIt.style.borderTop='none'; 
		//newIt.style.borderLeft='none';
		//newIt.style.borderRight='none';
		//newIt.style.overflow='hidden';
		
		newIt.style.borderBottom = tItem.currentStyle.borderBottomStyle;;
		newIt.style.borderLeft = tItem.currentStyle.borderLeftStyle;;
		newIt.style.borderRight = tItem.currentStyle.borderRightStyle;;
		newIt.style.borderTop = tItem.currentStyle.borderTopStyle;;
		newIt.style.borderColor = tItem.currentStyle.borderColor;
		newIt.style.borderWidth = tItem.currentStyle.borderWidth;
		
		//newIt.style.overflow=tItem.style.overflow;
		//newIt.currentStyle = tItem.currentStyle;
		
		if(tItem.onclick)
			newIt.onclick = tItem.onclick;
		if(tItem.ondblclick)
			newIt.ondblclick = tItem.ondblclick;
		if(tItem.onkeyup)
			newIt.onkeyup = tItem.onkeyup;

		newIt.readOnly = tItem.readOnly;
		
		if(tItem.readOnly!=true)
			newIt.setAttribute("contentEditable", true);
		
		newIt.innerText = tItem.value;
		var pNode = tItem.parentNode;
		pNode.replaceChild(newIt, tItem);
	}
	
	newIt.focus();
	if(tagType)
	{
		var dRange = document.body.createTextRange();
		dRange.collapse(true);
		dRange.moveToElementText(newIt);
		
		rText = rText.replace(/\r\n/g, "\n");
		rText = rText.replace(/\t/g, " ");
		var inText = newIt.innerText.replace(/\r\n/g,"\n");
		
		if(pos != -1)
			sCnt = pos;
			
		eCnt = inText.length - (sCnt + rText.length);
		
		dRange.moveStart("character", sCnt);
		dRange.moveEnd("character", -eCnt);
		dRange.select();
	}
	
	return newIt;
}



function BK_ChangeTextarea(tItem)
{
	var sCnt = 0;
	var eCnt = 0;
	var dvId = "";
	var rText = "";
	var tagType = false;
	var pos = -1;
	if(document.selection && document.selection.type != "None" && document.selection.createRange)
	{
		var range = document.selection.createRange();
		var node = range.commonAncestorContainer ? range.commonAncestorContainer : range.parentElement ? range.parentElement() : range.item(0);
		var nText = node.innerText;
		if(typeof nText != "undefined")
			rText = range.text;
		pos = BK_FindPos(range, node, nText);
		
		dvId = node.id;
		tagType = true;
	}
	else if(window.getSelection)
	{
		var range = window.getSelection();
		var node = range.anchorNode;
		if(node != null && node.nodeName != "#text")
		{
			sCnt = node.innerText.indexOf(range.Text);
			eCnt = range.focusOffset;
		}
		dvId = tItem.id;
	}
	
	var newIt = document.createElement('div');
	newIt.id = tItem.id;
  
	if(newIt.id != "")
	{
	  newIt.className = "editable_div";
		newIt.style.cssText = tItem.style.cssText;
	//	newIt.style.borderStyle = 'solid'; 
	//	newIt.style.borderWidth = '1px';
   // newIt.style.borderColor='#ababab';
		newIt.cssText = tItem.style.cssText;
		newIt.readOnly =tItem.readOnly;
		newIt.style.borderBottom = tItem.currentStyle.borderBottomStyle;;
		newIt.style.borderLeft = tItem.currentStyle.borderLeftStyle;;
		newIt.style.borderRight = tItem.currentStyle.borderRightStyle;;
		newIt.style.borderTop = tItem.currentStyle.borderTopStyle;;
		newIt.style.borderColor = tItem.currentStyle.borderColor;
		newIt.style.borderWidth = tItem.currentStyle.borderWidth;
		
		
		if(tItem.readOnly!=true)
			newIt.setAttribute("contentEditable", true);
		newIt.innerText = tItem.innerText;	
		var pNode = tItem.parentNode;
  
		pNode.replaceChild(newIt, tItem);
		//newIt.innerText = nText;
	}
	
	newIt.focus();
	if(tagType)
	{
		var dRange = document.body.createTextRange();
		dRange.collapse(true);
		dRange.moveToElementText(newIt);
		
		rText = rText.replace(/\r\n/g, "\n");
		rText = rText.replace(/\t/g, " ");
		var inText = newIt.innerText.replace(/\r\n/g,"\n");
		for(var i=0; i<=pos; i++)
		{
			sCnt = inText.indexOf(rText, sCnt);
			if(sCnt>=0)
				sCnt++;
		}
		if(sCnt != -1)
			sCnt--;
			
		eCnt = inText.length - (sCnt + rText.length);
		
		dRange.moveStart("character", sCnt);
		dRange.moveEnd("character", -eCnt);
		
	
		dRange.select();
	}
	
	return newIt;
}

function BK_FindPos(range, node, nText)
{
	var x = range;
	var s1 = nText;
	var s = document.body.createTextRange();
	
	s1 = s1.replace(/\r\n/g, "\n");
	s.moveToElementText(node);
	s.moveEnd("character", (s1.length-x.text.length+1)*-1);
	
	var fT = x.text.replace(/\r\n/g, "\n");
	var len = s1.length;
	var pos = 0;
	var pos1 = 0;
	var out = "";
	var cnt = 0;
	while(pos <len)
	{
		pos = s1.indexOf(fT, pos);
		if(pos<0) break;
		
		s.moveEnd("character", pos-pos1);
		s.moveStart("character", pos-pos1);
		pos1 = pos;
		
		if(x.boundingTop == s.boundingTop && x.boundingLeft == s.boundingLeft)
			break;
		
		pos++;
		cnt++;
	}
	return cnt;
}


function BK_FindPos4Single(range, node, nText)
{
	var x = range;
	var s1 = nText;
	var s = node.createTextRange();
	
	s1 = s1.replace(/\r\n/g, "\n");
	//s.moveToElementText(node);
	s.moveEnd("character", (s1.length-x.text.length+1)*-1);
	
	var fT = x.text.replace(/\r\n/g, "\n");
	var len = s1.length;
	var pos = 0;
	var pos1 = 0;
	var out = "";
	var cnt = 0;
	var idx = 0;
	while(pos <len)
	{
		pos = s1.indexOf(fT, idx++);
		if(pos<0) break;
		
		s.moveEnd("character", pos-pos1);
		s.moveStart("character", pos-pos1);
		pos1 = pos;
		
		if(x.boundingLeft == s.boundingLeft || x.boundingLeft < s.boundingLeft) 
			break;
		
	//	pos++;
	}
	
	return pos;
}


function BK_GetGroupStr()
{
	var xmlStr = "";
	var len = InstItem.length;
	for(var i=0; i<len; i++)
	{
		if(InstItem[i][3] != "")
			continue;
		var obj = document.getElementById('DIV_'+InstItem[i][0]);
		
		if(obj==null)
			continue;
		var gLen = GD_Info.length;
		var isGrid = false;
		for(var j=0; j<gLen; j++)
		{
			if(GD_Info[j][0] != InstItem[i][0])
				continue;
			isGrid = true;
		}
		if(isGrid)
			continue;
			
		var ch = BK_GetSubElement(null, obj);
		xmlStr += ("<H_ATTR id='"+obj.id+"' type='label' mode='"+G_VT01+"'><H_DATA><![CDATA["+obj.innerHTML+"]]></H_DATA>");
		xmlStr += "<IN_ITEM><![CDATA[";
		var chLen = ch?ch.length:0;
		for(var j=0; j<chLen; j++)
			xmlStr += (ch[j]+"※");
		xmlStr += ("]]></IN_ITEM></H_ATTR>");
	}
	
	for(var i=0; i<len; i++)
	{
		if(InstItem[i][3] != "")
			continue;
		var gLen = GD_Info.length;
		var isGrid = false;
		for(var j=0; j<gLen; j++)
		{
			if(GD_Info[j][0] != InstItem[i][0])
				continue;
			isGrid = true;
		}
		if(isGrid)
			continue;
			
		var obj = document.getElementById("DIV_"+InstItem[i][0]);
		if(obj)
			continue;
		obj = document.getElementById("CON_"+InstItem[i][0]);
		if(obj)
			continue;
		obj = document.getElementById(InstItem[i][0]);
		if(obj==null)
			continue;
		var ch = BK_GetSubElement(null, obj);
		var clen = ch.length;
		for(var j=0; j<clen; j++)
		{
			var cid = ch[j].split("_");
			if(cid.length<2)
				continue;
			var tIdx = BK_FindParsingRule(cid[1]);
			if(tIdx != -1)
				continue;
			obj = document.getElementById(ch[j]);
			
			var comtype = ch[j].indexOf("CAP")!=-1?"caption":"0";
			var inHtml = obj.innerHTML;
			var inText = obj.innerText;
			inHtml = inHtml.replace(/&nbsp;/g, " ");
			inText = inText.replace(/\r\n/g, "<BR>");
			if(obj && typeof obj.innerHTML != "undefined" && inHtml != inText)
				xmlStr += BK_MakeStr(obj.id, comtype, obj.innerHTML, obj.innerText);//("<H_ATTR id='"+obj.id+"' type='"+comtype+"' mode='"+G_VT01+"'><H_DATA><![CDATA["+obj.innerHTML+"]]></H_DATA><H_ORG_DATA><![CDATA["+obj.innerText+"]]></H_ORG_DATA></H_ATTR>");
		}
	}
	
	return xmlStr;
}

function BK_GetHilightStr()
{
	var xmlStr = "<BK_HILIGHT>";
	
	xmlStr += BK_GetGroupStr();
	
	len = ParsingRule.length;
	for(var i=0; i<len; i++)
	{
		switch(ParsingRule[i][2])
		{
			case 5:
				xmlStr += BK_GetAttrStr(i, '');
			break;
			case 8:
				xmlStr += BK_GetOptionStr(i,  '');
			break;	
			case 3:
				xmlStr += BK_GetGridHeadStr(i);
			break;
			case 4:
				xmlStr += BK_GetGridValueStr(i);
			break;
		}
	}
	
	return xmlStr +"</BK_HILIGHT>";
}

function BK_GetGridHeadStr(idx)
{
	var str = "";
	var obj = document.getElementById(ParsingRule[idx][0]+"_H_1");
	if(obj == null)
		return str;
	var ch = obj.childNodes;
	var len = ch.length;
	if(len)
	{
		//str += ("<H_ATTR id='"+ParsingRule[idx][0]+"_H_1' type='grid_caption' mode='"+G_VT01+"'><H_DATA><![CDATA[");
		//str += ("<H_DATA><![CDATA["+obj.innerHTML+"]]></H_DATA>");
		for(var i=0; i<len; i++)
			str += (ch[i].innerHTML+"※☆※");
		//str += "]]></H_DATA></H_ATTR>";
		 str = BK_MakeStr(ParsingRule[idx][0]+'_H_1','grid_caption', str, '' );
	}
	return str;
}

function BK_GetGridValueStr(idx)
{
	var gridId = "";
	var str = "";
	var len = G_V_Info.length;
	for(var i=0; i<len; i++)
	{
		if(G_V_Info[i][0] != ParsingRule[idx][0])
			continue;
		gridId = G_V_Info[i][1];
	}
	if(gridId == "")
		return str;
	var cnt = CheckCurGridValRowCnt(ParsingRule[idx][0]);
	for(var i=0; i<cnt; i++)
		str += BK_GetAttrStr(idx, "_"+i+"_0");
	return str;
}

function BK_GetFontSubAttr(idx, subStr, fontTag, pNode)
{
	var str = "";
	switch(ParsingRule[idx][3])
	{
		case 0:
		var obj = document.getElementById('VAL_'+ParsingRule[idx][0]+subStr);
		if(obj)
		{
			if(obj.parentElement && obj.parentElement.tagName == "FONT")
			 fontTag = obj.parentElement.outerHTML.replace(obj.parentElement.innerHTML, "☆★○●");
			 
			var ch = obj.childNodes;
			var chLen = ch.length;
			inStr = "";
			for(var i=0; i<chLen; i++)
			{
				if(ch[i].nodeName == "FONT")
				{
					if(ch[i].style.getAttribute("backgroundColor") == "" && ch[i].style.getAttribute("fontSize") == "")
						inStr += ch[i].innerHTML;
					else
						inStr += ch[i].outerHTML;
				}
				else if(ch[i].nodeName == "#text")
					inStr += ch[i].data;
				else
					inStr += ch[i].outerHTML;
			}
			str += BK_MakeStr('VAL_'+ParsingRule[idx][0]+subStr,ParsingRule[idx][3], fontTag.replace("☆★○●", inStr), obj.innerText );//("<H_ATTR id='VAL_"+ParsingRule[idx][0]+subStr+"' type='"+ParsingRule[idx][3]+"' mode='"+G_VT01+"'><H_DATA><![CDATA["+fontTag.replace("☆★○●", obj.innerHTML)+"]]></H_DATA><H_ORG_DATA><![CDATA["+obj.innerText+"]]></H_ORG_DATA></H_ATTR>");
		}
		
		if(obj && ParsingRule[idx][18] != "")
		{
			obj = obj.nextSibling;
			if(obj)
				str += BK_MakeStr('VAL_'+ParsingRule[idx][0]+subStr, 'next', fontTag.replace("☆★○●", ParsingRule[idx][18]),  ParsingRule[idx][18]);//("<H_ATTR id='VAL_"+ParsingRule[idx][0]+subStr+"' type='next' mode='"+G_VT01+"'><H_DATA><![CDATA["+fontTag.replace("☆★○●", ParsingRule[idx][18])+"]]></H_DATA><H_ORG_DATA><![CDATA["+ParsingRule[idx][18]+"]]></H_ORG_DATA></H_ATTR>");
			else
			{
				if(pNode.tagName != "FONT" || !pNode.nextSibling)
					break;
				
				obj = pNode.nextSibling;
				var outStr = "";
				while(obj)
				{
					if(obj.id != "" || obj.nodeName == "#text")
					{
						obj = obj.nextSibling;
						continue;
					}
					if(obj.innerHTML != "")
						str += BK_MakeStr('VAL_'+ParsingRule[idx][0]+subStr, 'next',obj.outerHTML, obj.innerText);//("<H_ATTR id='VAL_"+ParsingRule[idx][0]+subStr+"' type='next' mode='"+G_VT01+"'><H_DATA><![CDATA["+obj.outerHTML+"]]></H_DATA><H_ORG_DATA><![CDATA["+obj.innerText+"]]></H_ORG_DATA></H_ATTR>");
					
					obj = obj.nextSibling;				
				}
			}
		}
		break;
		case 1: case 2: case 3: case 4: case 8:
		
		break;
	}
	return str;
}

function BK_MakeStr(id, type, value, org)
{
	if(value == org)
		return "";
	return "<H_ATTR id='"+id+"' type='"+type+"' mode='"+G_VT01+"'><H_DATA><![CDATA["+value+"]]></H_DATA><H_ORG_DATA><![CDATA["+org+"]]></H_ORG_DATA></H_ATTR>";
}


function BK_GetAttrStr(idx, subStr)
{
	var str = "";
	if(ParsingRule[idx][3] == 12 || ParsingRule[idx][3] == 11)
		return str;
	var isContinue = true;
	var obj = document.getElementById('CAP_'+ParsingRule[idx][0]+subStr);

	if(obj && ParsingRule[idx][12] != "")
	{
		var inHtml = obj.innerHTML.replace(/&nbsp;/gi, " ");
		var inText = obj.innerText;
		if(inHtml != inText)
			str += BK_MakeStr(obj.id, 'caption', obj.innerHTML, obj.innerText);//("<H_ATTR id='"+obj.id+"' type='caption' mode='"+G_VT01+"'><H_DATA><![CDATA["+obj.innerHTML+"]]></H_DATA></H_ATTR>");
	}
	if(obj == null && G_VT01 == 2 && ParsingRule[idx][12] != "")
	{
		obj = document.getElementById(ParsingRule[idx][0]);
		if(obj)
		{
			var ch = obj.childNodes;
			var chLen = ch?ch.length:0;
			for(var i=0; i<chLen; i++)
			{
				if(ch[i].nodeName == "FONT")
				{
					var subobj = ch[i];
					while(subobj && subobj.childNodes) 
					{
						if(subobj.childNodes.length >0 && subobj.childNodes[0].nodeName != "#text" && subobj.childNodes[0].tagName == "B" && subobj.childNodes[0].id != "")
						{
							subobj = subobj.childNodes[0];
							break;
						}
						subobj = typeof subobj.childNodes[0] != "undefined" ? subobj.childNodes[0]:null;
					}
					if(subobj==null)
						subobj = ch[i];
					
					var fontTag = ch[i].outerHTML.replace(ch[i].innerHTML, "☆★○●");
					str += BK_MakeStr('CAP_'+ParsingRule[idx][0]+subStr,'caption', fontTag.replace("☆★○●", ParsingRule[idx][12]), ParsingRule[idx][12] );
					//("<H_ATTR id='CAP_"+ParsingRule[idx][0]+subStr+"' type='caption' mode='"+G_VT01+"'><H_DATA><![CDATA["+fontTag.replace("☆★○●", subobj.innerHTML)+"]]></H_DATA><H_ORG_DATA><![CDATA["+subobj.innerText+"]]></H_ORG_DATA></H_ATTR>");
					str += BK_GetFontSubAttr(idx, subStr, fontTag, ch[i]);
					isContinue = false;
					break;
				}
				else if(ch[i].nodeName == "#text" || ParsingRule[idx][12]=="" || ch[i].id != "")
					continue;
				
				if(typeof ch[i].innerHTML != "undefined")
				{
					var subobj = ch[i];
					if(subobj.childNodes && subobj.childNodes[0].tagName == "B" && subobj.childNodes[0].id != "")
						subobj = subobj.childNodes[0];
					var inHtml = subobj.innerHTML.replace(/&nbsp;/gi, " ");
					var inText = subobj.innerText;
					if(inHtml != inText)
						str += BK_MakeStr('CAP_'+ParsingRule[idx][0]+subStr, 'caption', subobj.innerHTML, subobj.innerText);
					//("<H_ATTR id='CAP_"+ParsingRule[idx][0]+subStr+"' type='caption' mode='"+G_VT01+"'><H_DATA><![CDATA["+subobj.innerHTML+"]]></H_DATA><H_ORG_DATA><![CDATA["+subobj.innerText+"]]></H_ORG_DATA></H_ATTR>");
				}
				break;
			}
		}
	}
	
	if(!isContinue)
		return str;
		
	switch(ParsingRule[idx][3])
	{
		case 0:
			obj = document.getElementById('VAL_'+ParsingRule[idx][0]+subStr);
			if(G_VT01<2 && obj.childNodes )
			{
				var ch = obj.childNodes;
				var len = ch.length;
				for(var i=0; i<len; i++)
				{
					str += BK_MakeStr('VAL_'+ParsingRule[idx][0]+subStr, ParsingRule[idx][3], ch[i].innerHTML, ch[i].innerText);
					//("<H_ATTR id='VAL_"+ParsingRule[idx][0]+subStr+"' type='"+ParsingRule[idx][3]+"' mode='"+G_VT01+"'><H_DATA><![CDATA["+ch[i].innerHTML+"]]></H_DATA><H_ORG_DATA><![CDATA["+ch[i].innerText+"]]></H_ORG_DATA></H_ATTR>");
				}
			}
			else if(obj)
			{
				if(ParsingRule[idx][2] != 4)
				{
					var inStr = obj.innerHTML.replace(/&nbsp;/gi, " ");
					var isUnit = false;
					//var pNode = obj;
					/*if(inStr != obj.innerText)
					{
						var ch = obj.childNodes;
						var chLen = ch.length;
						inStr = "";
						for(var i=0; i<chLen; i++)
						{
							if(ch[i].nodeName == "FONT")
							{
								if(ch[i].style.getAttribute("backgroundColor") == "" && ch[i].style.getAttribute("fontSize") == "")
									inStr += ch[i].innerHTML;
								else
									inStr += ch[i].outerHTML;
							}
							else if(ch[i].nodeName == "#text")
								inStr += ch[i].data;
							else
								inStr += ch[i].outerHTML;
						}
						str += BK_MakeStr('VAL_'+ParsingRule[idx][0]+subStr,ParsingRule[idx][3], inStr, obj.innerText);
					}
					 else*/ 
					 if(obj.innerHTML != "")

					{
						var pNode = obj.parentElement;
						var fStr = "";
						if(pNode.tagName.toUpperCase() == "FONT" || pNode.tagName.toUpperCase()== "U" ||pNode.tagName.toUpperCase() == "B")
						{
							 fStr = pNode.outerHTML.replace(pNode.innerHTML, "☆★○●");
						}
							var ch = obj.childNodes;
							var chLen = ch.length;
							inStr = "";
							for(var i=0; i<chLen; i++)
							{
								if(ch[i].nodeName == "FONT")
								{
									if(ch[i].style.getAttribute("backgroundColor") == "" && ch[i].style.getAttribute("fontSize") == "")
										inStr += ch[i].innerHTML;
									else
										inStr += ch[i].outerHTML;
								}
								else if(ch[i].nodeName == "#text")
									inStr += ch[i].data;
								else
									inStr += ch[i].outerHTML;
							}
							if(ParsingRule[idx][21]!="")
								inStr  = inStr.replace(ParsingRule[idx][21]+" ", "");
								
							if(fStr != "")
								str += BK_MakeStr('VAL_'+ParsingRule[idx][0]+subStr, ParsingRule[idx][3], fStr.replace("☆★○●", inStr), obj.innerText.replace(ParsingRule[idx][21]+" ", ""));
							else
							  str += BK_MakeStr('VAL_'+ParsingRule[idx][0]+subStr,ParsingRule[idx][3], inStr, obj.innerText.replace(ParsingRule[idx][21]+" ", ""));
							  
							if(fStr!= "")
							{  
								var ch = pNode.childNodes;
								var cLen = ch.length;
								var isNext = true;
								for(var i=0; i<cLen; i++)
								{
									if(ch[i].id == obj.id)
									{
										if(i == cLen-1)
										 isNext = false;
										continue;
									}
									if(ch[i].nodeName == "#text")
										str += BK_MakeStr('VAL_'+ParsingRule[idx][0]+subStr,'next', fStr.replace("☆★○●", ch[i].data), ch[i].data);//("<H_ATTR id='VAL_"+ParsingRule[idx][0]+subStr+"' type='next' mode='"+G_VT01+"'><H_DATA><![CDATA["+fStr.replace("☆★○●", ch[i].data)+"]]></H_DATA><H_ORG_DATA><![CDATA["+ch[i].data+"]]></H_ORG_DATA></H_ATTR>");
									else if(ch[i].outerHTML != ParsingRule[idx][18])
									{
										if(ch[i].nodeName == "FONT")
										{
											if(ch[i].style.getAttribute("backgroundColor") == "" && ch[i].style.getAttribute("fontSize") == "")
												str += BK_MakeStr('VAL_'+ParsingRule[idx][0]+subStr, 'next', fStr.replace("☆★○●", ch[i].innerHTML), ch[i].innerText);//("<H_ATTR id='VAL_"+ParsingRule[idx][0]+subStr+"' type='next' mode='"+G_VT01+"'><H_DATA><![CDATA["+fStr.replace("☆★○●", obj.outerHTML)+"]]></H_DATA><H_ORG_DATA><![CDATA["+obj.innerText+"]]></H_ORG_DATA></H_ATTR>");
											else
												str += BK_MakeStr('VAL_'+ParsingRule[idx][0]+subStr, 'next', fStr.replace("☆★○●", ch[i].outerHTML), ch[i].innerText);//("<H_ATTR id='VAL_"+ParsingRule[idx][0]+subStr+"' type='next' mode='"+G_VT01+"'><H_DATA><![CDATA["+fStr.replace("☆★○●", obj.outerHTML)+"]]></H_DATA><H_ORG_DATA><![CDATA["+obj.innerText+"]]></H_ORG_DATA></H_ATTR>");
										}
										else
											str += BK_MakeStr('VAL_'+ParsingRule[idx][0]+subStr, 'next', fStr.replace("☆★○●", ch[i].outerHTML), ch[i].innerText);//("<H_ATTR id='VAL_"+ParsingRule[idx][0]+subStr+"' type='next' mode='"+G_VT01+"'><H_DATA><![CDATA["+fStr.replace("☆★○●", obj.outerHTML)+"]]></H_DATA><H_ORG_DATA><![CDATA["+obj.innerText+"]]></H_ORG_DATA></H_ATTR>");
									}
								}
								break;
							}	
					}
				}
				else
				{
					var tStr = obj.innerHTML;
					var tempStr1 = "";
					var ch = obj.childNodes;
					var len = ch?ch.length:0;
					for(var j=0; j<len; j++)
					{
						if(ch[j].nodeName == "#text")
							tempStr1 += ch[j].data;
						else if(ch[j].nodeName.toUpperCase() == "SPAN" && ch[j].id.indexOf("UNIT_")!= -1)
							tStr = tStr.replace(ch[j].outerHTML, "");
						else
							tempStr1 += ch[j].innerText;
					}
					
					str += BK_MakeStr('VAL_'+ParsingRule[idx][0]+subStr, ParsingRule[idx][3], tStr, tempStr1);
				}
				
				var isUnit = false;
				if(ParsingRule[idx][18] == "")
				{
					var plen = ParsingRule.length;
					for(var j=idx+1; j<plen; j++)
					{
						if(ParsingRule[j][2] != 8)
							break;
						if(ParsingRule[j][3] != 8)
							break;
						var sid = ParsingRule[j][0].split("_");
						if(sid.length<2 || sid[1] != ParsingRule[idx][0])
							break;
						isUnit = true;
						break;
					}
					if(isUnit == false)
						break;
				}
				
				var nObj = obj;

				var inhtml = "";
				var inText = "";
				while(nObj.nextSibling)
				{
					nObj = nObj.nextSibling;
					if(nObj.nodeName == "#text")
					{
						inhtml += nObj.data;
						inText += nObj.data;
					}
					else
					{
						inhtml += nObj.outerHTML;		
						inText += nObj.innerText;
					}
				}
				
				str += BK_MakeStr('VAL_'+ParsingRule[idx][0]+subStr,'next', inhtml, inText);//("<H_ATTR id='VAL_"+ParsingRule[idx][0]+subStr+"' type='next' mode='"+G_VT01+"'><H_DATA><![CDATA["+obj.outerHTML+"]]></H_DATA><H_ORG_DATA><![CDATA["+obj.innerText+"]]></H_ORG_DATA></H_ATTR>");
			}
		break;
		case 1: case 2: case 3: case 4: case 8:
			if(ParsingRule[idx][3] != 8)
				obj = document.getElementById('INPUT_'+ParsingRule[idx][0]+subStr);
			else
			{
				obj = document.getElementById('INPUT1_'+ParsingRule[idx][0]+subStr);
				if(obj == null)
					obj = document.getElementById('INPUTU1_'+ParsingRule[idx][0]+subStr);
			}
			
			if(obj==null)
				break;
			
			if(obj.tagName != "INPUT" && obj.innerText != "")// && ParsingRule[idx][3] != 8)
				str += BK_MakeStr(obj.id, ParsingRule[idx][3], obj.innerHTML, obj.innerText);//("<H_ATTR id='"+obj.id+"' type='"+ParsingRule[idx][3]+"' mode='"+G_VT01+"'><H_DATA><![CDATA["+obj.innerHTML+"]]></H_DATA></H_ATTR>");
			/*else
			{
				return BK_GetUnitStr(idx, subStr, obj);
			}*/
				
			if(ParsingRule[idx][18] != "")
			{
				var nObj = obj.nextSibling;
				while(nObj)
				{
					if(nObj && nObj.nodeName != "#text" && nObj.innerHTML != nObj.innerText)
						str += BK_MakeStr(obj.id, 'next', nObj.innerHTML, nObj.innerText);//("<H_ATTR id='"+obj.id+"' type='next' mode='"+G_VT01+"'><H_DATA><![CDATA["+nObj.innerHTML+"]]></H_DATA><H_ORG_DATA><![CDATA["+nObj.innerText+"]]></H_ORG_DATA></H_ATTR>");
					nObj = nObj.nextSibling;
				}
			}
			
			if(ParsingRule[idx][17] == 4 && ParsingRule[idx][17] != "")
			{
				var pObj = obj.previousSibling;
				while(pObj)
				{
					if(pObj && pObj.nodeName != "#text" &&  pObj.innerHTML != pObj.innerText)
						str += BK_MakeStr(obj.id, 'previos', pObj.innerHTML, pObj.innerText);//("<H_ATTR id='"+obj.id+"' type='previos' mode='"+G_VT01+"'><H_DATA><![CDATA["+pObj.innerHTML+"]]></H_DATA><H_ORG_DATA><![CDATA["+pObj.innerText+"]]></H_ORG_DATA></H_ATTR>");
					pObj = obj.previousSibling;
				}
			}
			
		break;
	}	
	return str;
}

function BK_GetUnitStr(idx, subStr, obj)
{
	var comStr = obj.innerText;
	var valStr = "";
	var opStr = "";
	var len = ParsingRule.length;
	for(var i = idx+1; i<len; i++)
	{
		if(ParsingRule[i][2] != 8)
			break;
		if(ParsingRule[i][3] != 8)
			break;
		var sId = ParsingRule[i][0].split("_");
		if(sId.length<2 || sId[1] != ParsingRule[idx][0])
			break;
		
	}
	return valStr + opStr;
}


function BK_GetOptionStr(idx, subStr)
{
	var str = "";
	switch(ParsingRule[idx][3])
	{
		case 6:
			var obj = document.getElementById(ParsingRule[idx][0]+subStr);
			if(obj)
			{
				var fontTag = "";
				if(obj.parentElement && (obj.parentElement.tagName.toUpperCase() == "FONT" || obj.parentElement.tagName.toUpperCase() == "U" || obj.parentElement.tagName.toUpperCase() == "B"))
					fontTag = obj.parentElement.outerHTML.replace(obj.parentElement.innerHTML, "☆★○●");
				
				var cObj = null;
				if(obj.tagName == "INPUT")
					cObj = obj.nextSibling?obj.nextSibling:obj.previousSibling?obj.previousSibling:null;
				if(cObj && cObj.nodeName != "#text")
				{
					var sStr = cObj.tagName=="SPAN"?cObj.innerHTML:cObj.outerHTML;
					var tStr = cObj.tagName=="SPAN"?cObj.innerText:cObj.outerText;
					if( subStr != tStr)
						str += BK_MakeStr(ParsingRule[idx][0]+subStr, 'radio', fontTag!=""?fontTag.replace("☆★○●", sStr):sStr, tStr);//("<H_ATTR id='"+ParsingRule[idx][0]+subStr+"' type='radio' mode='"+G_VT01+"'><H_DATA><![CDATA["+(fontTag!=""?fontTag.replace("☆★○●", sStr):sStr)+"]]></H_DATA><H_ORG_DATA><![CDATA["+tStr+"]]></H_ORG_DATA></H_ATTR>");
				}
				else if(fontTag != "" && cObj.nodeName == "#text")
				{
					var sStr = fontTag.replace("☆★○●", obj.data);
					var tStr = ParsingRule[idx][12];
					if(sStr != tStr)
						str += BK_MakeStr(ParsingRule[idx][0]+subStr, 'radio', sStr, tStr);//("<H_ATTR id='"+ParsingRule[idx][0]+subStr+"' type='radio' mode='"+G_VT01+"'><H_DATA><![CDATA["+sStr+"]]></H_DATA><H_ORG_DATA><![CDATA["+ParsingRule[idx][12]+"]]></H_ORG_DATA></H_ATTR>");
				}
			}
		break;
		case 7:
			var obj = document.getElementById(ParsingRule[idx][0]+subStr);
			if(obj)
			{
				var fontTag = "";
				if(obj.parentElement && (obj.parentElement.tagName.toUpperCase() == "FONT" ||obj.parentElement.tagName.toUpperCase() == "U" || obj.parentElement.tagName.toUpperCase() == "B"))
					fontTag = obj.parentElement.outerHTML.replace(obj.parentElement.innerHTML, "☆★○●");
				
				if(obj.tagName == "INPUT")
					obj = obj.nextSibling?obj.nextSibling:obj.previousSibling?obj.previousSibling:null;
					
				if(obj && obj.nodeName != "#text")
				{
					var sStr = obj.tagName=="SPAN"?obj.innerHTML:obj.outerHTML;
					var tStr = obj.tagName=="SPAN"?obj.innerText:obj.outerText;
					if(subStr!= tStr)
						str += BK_MakeStr(ParsingRule[idx][0]+subStr, 'checkbox', fontTag!=""?fontTag.replace("☆★○●", sStr):sStr, tStr);//("<H_ATTR id='"+ParsingRule[idx][0]+subStr+"' type='checkbox' mode='"+G_VT01+"'><H_DATA><![CDATA["+(fontTag!=""?fontTag.replace("☆★○●", sStr):sStr)+"]]></H_DATA><H_ORG_DATA><![CDATA["+tStr+"]]></H_ORG_DATA></H_ATTR>");
				}
				else if(fontTag != "")
				{
					var sStr = fontTag.replace("☆★○●", obj.data);
					var tStr = ParsingRule[idx][12];
					if(sStr != tStr)
						str += BK_MakeStr(ParsingRule[idx][0]+subStr, 'checkbox', sStr, tStr);//("<H_ATTR id='"+ParsingRule[idx][0]+subStr+"' type='checkbox' mode='"+G_VT01+"'><H_DATA><![CDATA["+sStr+"]]></H_DATA><H_ORG_DATA><![CDATA["+ParsingRule[idx][12]+"]]></H_ORG_DATA></H_ATTR>");
				}
			}
		break;
	}	
	return str;
}

function BK_GetSubElement(eArr, pNode)
{
	var nextTime = false;
	if(eArr == null)
		eArr = new Array();
	else
		nextTime = true;
		
	var ch = pNode.childNodes;
	var len = ch.length;
	for(var i=0; i<len; i++)
	{
		var item = ch[i];
		if(item.id && item.id != "")
		{
			var len2 = eArr.length;
			var j = 0;
			for(; j<len2; j++)
			{
				if(eArr[j] == item.id)
					break;
			}
			if(j >= len2 && item.id!="")
				eArr[eArr.length] = item.id;
		}
		
		BK_GetSubElement(eArr, item);
	}
	
	//if(nextTime && pNode.nextSibling)
		//BK_GetSubElement(eArr, pNode.nextSibling);
	
	return eArr;
}

function BK_SetSpecId()
{
	var bObj = document.getElementsByTagName("B");
	var len = bObj.length;
	for(var i=0; i<len; i++)
	{
		bObj[i].setAttribute("id", "BK_B_"+i);
	}
}



function BK_SaveHilight()
{
	//var hlStr = BK_GetHilightStr(); 
	var hlStr = MakeHighlightXML();
	if(!hlStr)
		return;	
	
	SeqNo = SeqNo.split("^")[0];
	hlStr = "<?xml version='1.0' encoding='UTF-16'?>"+hlStr;
	hlStr = hlStr.replace(/ style=\"\"/gi, "");
	hlStr = hlStr.replace(/ style=''/gi, "");
	
	var xr = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/Save_File.jsp",
	"doc_info="+SeqNo+"^"+docuId+"^"+ptId+"^"+doctorId+"^"+doc_version
	+"&xmlData="+ToHex4Unicode(hlStr), 100);
	xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/UpdateSql.jsp","param="+xr+"^"+SeqNo+"&SqlDec=UPDATE BERDMRECD SET MEMOFILENAME=? WHERE CODE=?",100);
}

//--------------------BKSNP HighLight--------------------------------//








/**************** NEW HIGHLIGHT ****************/

/** format.js **/
function BK_H_SUB(start, end, mode, value )
{
	this.r_start = start;
	this.r_end = end;
	this.r_type = mode;
	this.r_value = value;
}

function BK_H_DATA()
{
	this.r_text = "";
	this.r_arr = new Array();
	
	this.r_addFormat = function(start, end,  mode, value)
	{
		var len = this.r_arr.length;
		this.r_arr[len] = new BK_H_SUB(start, end, mode, value);
		
		for(var i=0; i<len; i++) ///Process..
		{
			var x1 = this.r_arr[i];
			//if(x1.r_type != mode || x1.r_start >end || end <x1.r_start)
			if(x1.r_type != mode || x1.r_start >end || start > x1.r_end)
				continue;
			
			if(start <= x1.r_start)
			{
				if(end < x1.r_end)
				{
					x1.r_start = end+1;
				}
				else
				{
					this.r_arr[i]=null;
				}
			}
			else
			{
				if(end < x1.r_end)
				{
					this.r_arr[this.r_arr.length]=new BK_H_SUB(end+1, x1.r_end,  x1.r_type, x1.r_value);
					x1.r_end=start-1;
				}
				else
				{
					x1.r_end = start-1;
				}
			}
		}
		
		// 연속데이터 합하기
		len = this.r_arr.length;
		for(var i=0;i<len;i++)
		{
			if(this.r_arr[i]==null) continue;
			for(var j=0;j<len;j++)
			{
				if(i==j || this.r_arr[j]==null || this.r_arr[j].r_type != this.r_arr[i].r_type || this.r_arr[j].r_value != this.r_arr[i].r_value)
					continue;
				if(this.r_arr[i].r_end+1==this.r_arr[j].r_start)
				{
					this.r_arr[i].r_end = this.r_arr[j].r_end;
					this.r_arr[j]=null;
				}
				else if(this.r_arr[i].r_start==this.r_arr[j].r_end+1)
				{
					this.r_arr[i].r_start = this.r_arr[j].r_start;
					this.r_arr[j]=null;
				}
			}
		}
		
		// Delete empty Array
		for(var i=0;i<len;i++)
		{
			if(this.r_arr[i] !=null) continue;
			len--;
			for(var n=i;n<len;n++)
			{
				this.r_arr[n]=this.r_arr[n+1];
			}
			this.r_arr.length=len;
			i--;
		}
	};
	
	this.r_getFormat=function(tStr)
	{
			if(this.r_arr.length==0)
				return tStr;
			var fA=new Array();
			var len=this.r_arr.length;
			
			for(var i=0;i<len;i++)
			{
				fA[i*2]=[this.r_arr[i].r_start/1000, 0, i];
				fA[i*2+1]=[this.r_arr[i].r_end/1000, 1, i];
			}
			fA = fA.sort();
			
			var aMode=new Array();
			var r_FM=new BK_H_FMAN();
			var ret='';
			var prePos=0;
			var spanStart=0;
			len = fA.length;
			var rF='';
			for(var i=0; i<len;i++)
			{
				var pos=0;
				if(fA[i][1]==0)
				{
					pos=fA[i][0]*1000;
					for(var n=i;n<len;n++)
					{
						if(fA[n][0]*1000 !=pos || fA[n][1] != 0)
						{
							i=n-1;
						 	break;
						 }
						r_FM.r_setFormat(this.r_arr[fA[n][2]].r_type, this.r_arr[fA[n][2]].r_value);
						
					}
				}
				else if(fA[i][1]==1)
				{
					pos=fA[i][0]*1000;
					for(var n=i;n<len;n++)
					{
						if(fA[n][0]*1000 !=pos)
						{
							i=n-1;
							break;
						}
						r_FM.r_removeFormat(this.r_arr[fA[n][2]].r_type, this.r_arr[fA[n][2]].r_value);
					}
					pos ++;
				}
				
				if(pos-prePos >0)
				{
					for(var x=prePos; x<pos; x++) {
						if(tStr.charAt(x)=='\r' && tStr.charAt(x+1)=='\n') {
							if(spanStart==1)
								ret += '</SPAN>';
							ret += '<BR>';
							if(spanStart==1)
								ret += rF;
							x++;
						}
						else
							ret += tStr.charAt(x);
					}
					//ret += tStr.substring(prePos,pos);
					prePos=pos;
				}
				if(spanStart==1)
					ret += "</SPAN>";
				rF=r_FM.r_getStyle();
				if(rF=='')
					spanStart=0;
				else
				{
					spanStart=1;
					ret += rF;
				}
			}
			if(tStr.length-prePos >0)
			{
				if(spanStart==1)
					ret += "</SPAN>";
				for(var x=prePos; x<tStr.length; x++) {
					if(tStr.charAt(x)=='\r' && tStr.charAt(x+1)=='\n') {
						ret += '<BR>';
						x++;
					}
					else
						ret += tStr.charAt(x);
				}
				//ret += tStr.substring(prePos);
				prePos=pos;
			}
			return ret;
		
	};
	
	this.r_compare=function(ndata, odata, fname, pos)
	{
		if(ndata==null || ndata=='')
		{
			if(odata != null)
			{
				this.r_addFormat(odata[1], pos-1, fname, odata[0]);
			}
			return null;
		}
		else
		{
			switch(fname)
			{
			case "SIZE":
				ndata = parseInt(ndata);
				break;
			}
			if(odata != null)
			{
				if(odata[0] != ndata)
				{
					this.r_addFormat(odata[1], pos-1, fname, odata[0]);
					return [ndata, pos];
				}
				else
				{
					return odata;
				}
			}
			else
			{
				return [ndata, pos];
			}
		}
	};

	this.r_setHtml=function(x)
		{
		this.r_arr=new Array();
		var pos=0;
		var ch=x.firstChild;
		var r_fontSize=null;
		var r_bold=null;
		var r_color=null;
		var r_back=null;
		
		while(ch)
		{
			if(ch.nodeName=='#text')
			{
				r_fontSize=this.r_compare(null, r_fontSize, "SIZE", pos);
				r_bold=this.r_compare(null, r_bold, "BOLD", pos);
				r_color=this.r_compare(null, r_color, "COLOR", pos);
				r_back=this.r_compare(null, r_back, "BACK", pos);
				pos += ch.nodeValue.length;
			}
			else if(ch.nodeName=="P")
			{
				ch=ch.firstChild;
				continue;
			}
			else if(ch.nodeName=="BR")
			{
				pos += 2;
			}
			else  if(ch.innerText != "")
			{
				if(ch.style !=null)
				{
					r_fontSize=this.r_compare(ch.style.fontSize, r_fontSize, "SIZE", pos);
					r_bold=this.r_compare(ch.style.fontWeight, r_bold, "BOLD", pos);
					r_color=this.r_compare(ch.style.color, r_color, "COLOR", pos);
					r_back=this.r_compare(ch.style.backgroundColor, r_back, "BACK", pos);
				}
				else
				{
					r_fontSize=this.r_compare(null, r_fontSize, "SIZE", pos);
					r_bold=this.r_compare(null, r_bold, "BOLD", pos);
					r_color=this.r_compare(null, r_color, "COLOR", pos);
					r_back=this.r_compare(null, r_back, "BACK", pos);
				}
				pos += ch.innerText.length;
				
			}
			
			if(ch.nextSibling ==null)
			{
				if(ch.parentNode == x)
					break;
				ch=ch.parentNode.nextSibling;
				pos += 4;
			}
			else
			{
				ch=ch.nextSibling;
			}
		}
		r_fontSize=this.r_compare(null, r_fontSize, "SIZE", pos);
		r_bold=this.r_compare(null, r_bold, "BOLD", pos);
		r_color=this.r_compare(null, r_color, "COLOR", pos);
		r_back=this.r_compare(null, r_back, "BACK", pos);
		return pos;
	};
}

function BK_H_FMAN()
{
	this.r_mode=new Array();
	this.r_setFormat=function(mode, value)
	{
			this.r_mode[this.r_mode.length]=[mode,value];
	};
	
	this.r_removeFormat=function(mode, value)
	{
			var len=this.r_mode.length;
			for(var i=0;i<len;i++)
			{
				if(this.r_mode[i][0] != mode) continue;
				len--;
				for(;i<len;i++)
				{
					this.r_mode[i]=this.r_mode[i+1];
				}
				this.r_mode.length=len;
				return;
			}
	};
	
	this.r_getStyle=function()
	{
			var ret="<SPAN style='";
			var len=this.r_mode.length;
			if(len<=0) return "";
			for(var i=0;i<len;i++)
			{
				switch(this.r_mode[i][0])
				{
				case "SIZE":
					ret += "font-size:"+this.r_mode[i][1]+"px;";
					break;
				case "COLOR":
					ret += "color:"+this.r_mode[i][1]+";";
					break;
				case "BACK":
					ret += "background-color:"+this.r_mode[i][1]+";";
					break;
				case "BOLD":
					ret += "font-weight:bold;";
					break;
				case "UNDERLINE":
					ret += "text-decoration: underline;";
					break;
				}
			}
			ret += "'>";
			return ret;
	};
}

function BK_HILIGHT(id)
{
	this.r_id = id;
	this.r_caption = new BK_H_DATA();
	this.r_prefix = new BK_H_DATA();
	//this.r_desin = new BK_H_DATA();
	this.r_unit = new BK_H_DATA();
	this.r_value = new BK_H_DATA();
	this.r_appendix = new BK_H_DATA();
	this.r_na = new BK_H_DATA();
	this.r_type = 0;
	
	this.r_addFormat=function(type, mode, value, start, end)
	{
		switch(type)
		{
		case "CAP":
			this.r_caption.r_addFormat(start, end, mode, value);
			break;
		case "PRE":
			this.r_prefix.r_addFormat(start, end, mode, value);
			break;
		case "UNIT":
			this.r_unit.r_addFormat(start, end, mode, value);
			break;
		case "VALUE":
			this.r_value.r_addFormat(start, end, mode, value);
			break;
		case "APPEND":
			this.r_appendix.r_addFormat(start, end, mode, value);
			break;
		case "NA":
			this.r_na.r_addFormat(start, end, mode, value);
			break;
		}
	};
	
	this.r_getFormat=function(type, tStr)
	{
		switch(type)
		{
		case "CAP":
			return this.r_caption.r_getFormat(tStr);
			break;
		case "PRE":
			return this.r_prefix.r_getFormat(tStr);
			break;
		case "UNIT":
			return this.r_unit.r_getFormat(tStr);
			break;
		case "VALUE":
			return this.r_value.r_getFormat(tStr);
			break;
		case "APPEND":
			return this.r_appendix.r_getFormat(tStr);
			break;
		case "NA":
			return this.r_na.r_getFormat(tStr);
			break;
		}
		return "";
	};
}

function test()
{
	var x=new BK_HILIGHT();
	x.r_addFormat("CAP", "SIZE", 35, 3, 15);
	x.r_addFormat("CAP", "COLOR", "#ff0000", 4, 10);
	x.r_addFormat("CAP", "SIZE", 25, 5, 8);
	
	var ret=x.r_getFormat("CAP","1234567890ABCDEFGHIJK");
	alert(ret);
	document.getElementById('output').innerHTML=ret;
}

/** test.js **/
var g_hSelId=null;
var g_hSelRange=null;


function BK_FindValueIdFromId(obj)
{
	var id = obj.id;
	var ids;
	if(obj.id=="") {
		if(obj.nextSibling && obj.nextSibling.id) {
			ids = obj.nextSibling.id.split('_');
			if(ids.length>=2 && ids[0]=='VAL')
				return 'CAP_'+ids[1];
		}
		return null;
	}
	else if(obj.id=="append") {
		var pObj = obj.parentNode;
		while(pObj) {
			if(pObj.id)
				break;
			pObj = pObj.parentNode;
		}
		ids=pObj.id.split('_');
		if(ids.length==1)
			return 'APP_'+pObj.id;
	}
	else {
		ids=id.split('_');
		if(ids.length>=2) {
			if(ids[0]=='VAL' || ids[0]=='CAP' || ids[0]=='INPUT' || ids[0]=='INPUTU1')
				return id;
		}
	}
	
	return null;
}



function BK_AddSelectionArray(id, appId, mode, obj, start, end)
{
	/*var len = g_hSelId.length;
	for(var i=0; i<len; i++)
	{
		if(g_hSelId[i][0] != id)
			continue;
		if(g_hSelId[i][2] == obj.nodeName && g_hSelId[i][3]==g_hSelId[i][4] && start == end)
		{
			if(g_hSelId[i][3] > start)
				g_hSelId[i][3] = start;
			if(g_hSelId[i][4] < end)
				g_hSelId[i][4] = end;
			return;
		}
	}*/
	g_hSelId[g_hSelId.length]=[id, appId, mode, obj.nodeName, start, end];
}

function BK_AddSelectionValue(id, obj, mode, start, end)
{

	var ids=id.split('_');
	var appId="";
	for(var i=2; i<ids.length; i++) {
		//if(appId!="")
			//appId+="_";
		appId += "_"+ids[i];
	}
	if(ids[0]=='CAP')
	{
		BK_AddSelectionArray(ids[1], appId, "CAP", obj, start, end);
		return;
	}
	
	if(ids[0]=="VAL")
	{
		BK_AddSelectionArray(ids[1], appId, "VAL", obj, start, end);
	}
	else if(ids[0]=='INPUT' || ids[0]=='INPUTU1')
	{
		BK_AddSelectionArray(ids[1], appId, "INPUT", obj, start, end);
	}
	else if(ids[0]=='CHECK')
	{
		BK_AddSelectionArray(ids[1], appId, "CHECK", obj, start, end);
	}
	else if(ids[0]=='RADIO')
	{
		BK_AddSelectionArray(ids[1], appId, "RADIO", obj, start, end);
	}
	
	else if(ids[0]=='APP')
	{
		BK_AddSelectionArray(ids[1], appId, "APP", obj, start, end);
	}
}


function BK_GetElementPos(ele)
{
	var c=ele.parentNode.firstChild;
	var len=0;
	while(c)
	{
		if(c==ele)
			return len;
		var iStr=c.innerText;
		if(iStr==null)
			iStr =c.nodeValue;
		len += iStr.length;
		c=c.nextSibling;
	}
	return len;
}

function BK_FindValueOuter(ele, s, e)
{
	var obj=ele;
	while(1)
	{
		if(ele==null) break;
		if(ele.tagName=='BODY') break;
		if(ele.id != null)
		{
			//var id=BK_FindValueIdFromId(ele.id);
			var id=BK_FindValueIdFromId(ele);
			if(id !=null)
			{
				BK_AddSelectionValue(id, obj, 'i', s, e);
				return id;
			}
		}
		var len=BK_GetElementPos(ele);
		s += len;
		e += len;
		ele = ele.parentNode;
	}
	return null;
}

function BK_FindValueInner(obj)
{
	if(obj.children==null)
		return;
	
	var ch=obj.children;
	var len =ch.length;
	for(var i=0;i< len;i++)
	{
		if(ch[i].id !=null)
		{
			//var id=BK_FindValueIdFromId(ch[i].id);
			var id=BK_FindValueIdFromId(ch[i]);
			if(id == null)
				BK_FindValueInner(ch[i]);
			else
				BK_AddSelectionValue(id, ch[i], 'a', -1, -1);
		}
	}
}

function BK_FindValueId(obj, mode, start, end)
{
	if(mode=='a')
	{
		start = 0;
		if(obj.nodeName=="#text")
			end=obj.nodeValue.length;
		else if(obj.value)
			end=obj.value.length;
		else
			end=obj.innerText.length;
		BK_FindValueInner(obj);
	}
	BK_FindValueOuter(obj, start, end);
}



function BK_GetElementTop(obj)
{
	var ret=0;
	while(1)
	{
		if(obj==null || obj.tagName=='BODY') return ret;
		if(obj.tagName!='TR' && obj.tagName !='TBODY')
			ret += obj.offsetTop;
		obj = obj.parentElement;
	}
	return ret;
}


function BK_GetStartPoint(x, s)
{
	var i=0;
	while(s.inRange(x))
	{
		x.moveStart("character", -1);
		i++;
	}
	return i;
}



function BK_GetStartPoint2(x, s)
{
	var i=0;
	var len=x.text.length;
	x.moveEnd("character", (len-s.text.length)*-1);
	
	for(i=0;i<len;i++)
	{
		if(s.inRange(x)) break;
		x.moveEnd("character", 1);
		x.moveStart("character", 1);
	}
	return i-1;
}

function BK_CreateTRange(obj)
{
	var x=null;
	if(obj.tagName !='INPUT' || obj.type !='text')
	{
		x=document.selection.createRange();
		x.moveToElementText(obj);
	}
	else
	{
		x= obj.createTextRange();
	}
	return x;
}

var g_hStart=0;
var g_hFirstText;
var g_hFirstId;
var g_hTextStr;
var g_hCurText;
var g_hCurTextPos;
var preTextNode=null;

function BK_ProcessItem(obj, mode, sPoint)
{
	if(sPoint !=null)
		g_hCurText='';
	else if(g_hCurTextPos==0)
	{
		g_hCurText='';
		if(g_hFirstText)
		{
				g_hCurText=g_hFirstText;
				g_hCurTextPos=g_hFirstText.length;
				if(preTextNode)
					BK_FindValueId(preTextNode, 't', preTextNode.nodeValue.length-g_hFirstText.length, preTextNode.nodeValue.length);
		}
	}
	
	var iStr=obj.innerText;
	if(iStr==null)
		iStr =obj.nodeValue;
	
	if(sPoint)
		iStr = iStr.substring(sPoint);
	else
		sPoint=0;
		
	var pos=g_hTextStr.indexOf(iStr.substring(0,1), g_hCurTextPos);
	if(pos >0)
	{
		g_hCurTextPos = pos;
	}
	
	var len=iStr.length;
	if(g_hCurTextPos+len < g_hTextStr.length)
	{
		g_hCurText += iStr;
		BK_FindValueId(obj, mode, sPoint, sPoint+iStr.length);
	}
	else
	{
		g_hCurText += iStr.substring(0, g_hTextStr.length-g_hCurTextPos);
		BK_FindValueId(obj, mode, sPoint, sPoint+g_hTextStr.length-g_hCurTextPos);
		g_hStart='E';
	}
	g_hCurTextPos += len;
}


function BK_GetSelection(obj)
{
	if(g_hStart=='E')
	{
		if(g_lastInput==1)
		{
		 	if(obj.nodeName=='INPUT') 
			{
				BK_ProcessItem(obj, 'a');
				g_lastInput=0;
				return;
			}
			var ch = obj.firstChild;
			if(ch !=null && (ch.nodeName != '#text' || ch.nextSibling !=null))
			{
				while(ch && g_lastInput==1 )
				{
					BK_GetSelection(ch);
					ch = ch.nextSibling;
				}
		 	}
		 }
	 	 return;
	}
	
	var x;
	if(g_hStart==0)
	{
		
		if(obj.nodeName =='#text')
		{
				preTextNode=obj;
				return;
		}
		if(g_hFirstId != null)
		{
			if(obj.id!=null && obj.id == g_hFirstId)
			{
				g_hStart='I';
				
				BK_ProcessItem(obj);
				return;
			}
		}
		else
		{
				x=BK_CreateTRange(obj);
			if(g_hSelRange.inRange(x))
			{
				if(x.inRange(g_hSelRange))
				{
					g_hStart='E';
				}
				else
				{
					g_hStart='I';
				}
				BK_ProcessItem(obj, 'a');
				
				return;
			}
			
			var top=BK_GetElementTop(obj)-document.body.scrollTop;
			if(top >= (g_hSelRange.offsetTop+g_hSelRange.boundingHeight) || (top+obj.offsetHeight) <= g_hSelRange.offsetTop)
			{
				return;
			}
		}
	
	}

	
	var ch = obj.firstChild;
	if(ch !=null && (ch.nodeName != '#text' || ch.nextSibling !=null))
	{
		while(ch)
		{
			BK_GetSelection(ch);
			ch = ch.nextSibling;
		}
		return;
	}
	
	
	
	
	
	if(g_hStart == 0)
	{
		if(g_hFirstId != null)
			return;
		if(x.inRange(g_hSelRange))
		{
			var sp=BK_GetStartPoint2(x, g_hSelRange);
		 	g_hStart='E';
			BK_ProcessItem(obj, 'i', sp);
			return;
		}
		var len=x.text.length;
		x.moveStart("character", (len-1));
		if(g_hSelRange.inRange(x))
		{
				var sp=len-BK_GetStartPoint(x, g_hSelRange);
				g_hStart='I';
				BK_ProcessItem(obj,'h', sp);
				return;
		}
	}
	else if(g_hCurTextPos < g_hTextStr.length)
	{
		BK_ProcessItem(obj, 'a');
		
	}
}


var g_hSelObj=null;

var g_lastInput=null;
function BK_FindLastInput(hStr)
{
	g_lastInput=0;
	var len=hStr.length;
	var ins=0;
	for(var i=len-1; i>=0; i--)
	{
		var c=hStr.charAt(i);
		if(c=='<')
		{
			if(hStr.charAt(i+1) != '/')
			{
				if(hStr.substring(i+1, i+7) == 'INPUT ')
				{
					g_lastInput=1;
					return;
				}
			}
			ins=0;
		}
		else if(c=='>')
		{
			ins=1;
		}
		else if(ins==0 && c != ' ' && c != '\t' && c != '\r' && c != '\n')
		{
			return;
		}
	}
}

function BK_ProcessHtmlString(hStr)
{
	var len=hStr.length;
	var ins=0;
	
	
	var prePos=0;
	for(var i=0;i<len;i++)
	{
		var c=hStr.charAt(i);
		if(c=='<')
		{
			ins=1;
			if(hStr.charAt(i+1)=='/')
				return;
			if((i-prePos)>0)
			{
				g_hFirstText=hStr.substring(prePos, i);
				if(g_hFirstText=='\r\n')
					g_hFirstText=null;
			}
			if(hStr.substring(i+1, i+7) == 'INPUT '  || hStr.substring(i+1, i+8) == 'SELECT ')
			{
				ins=2;
			}
			else if(g_hFirstText !=null)
			{
				return;
			}
			
		}
		else if(c=='>')
		{
			ins=0;
			prePos=i+1;
		}
		else if(ins==2)
		{
			if(c=='i' || c=='I')
			{
				var subS=hStr.substring(i, i+3);
				if(subS=='id=')
				{
					subS=hStr.substring(i+3,i+30);
					g_hFirstId=subS.split(' ')[0];
					return;
				}
			}
		}
		
	}
}


function BK_GetSelectionAll(obj)
{
//	FindValueInn(obj);
//	FindValueOut(obj);
}
/*
function BK_FindSelectionPos(obj)
{
	var x=BK_CreateTRange(obj);
	var len=x.text.length-g_hSelRange.text.length;
	var pos=x.htmlText.length;
	
//	x.moveEnd("character", len*-1);
	while(x.text.length != g_hSelRange.text.length && pos)
	{
		x.moveEnd("character", -1);
		pos--;
	}
	
	for(var i=0;i<=len;i++)
	{
		if(g_hSelRange.isEqual(x)) return i;
		x.moveStart("character",1); 
		x.moveEnd("character",1);
	}
	return -1;
}
*/

function BK_FindSelectionPos(obj)
{
	var x=BK_CreateTRange(obj);
	var len=x.text.length-g_hSelRange.text.length;
	var pos=x.htmlText.length;
	
//	x.moveEnd("character", len*-1);
	//while(x.text.length != g_hSelRange.text.length && pos)
	while(x.text.length > g_hSelRange.text.length && pos)
	{
		x.moveEnd("character", -1);
		pos--;
	}
	
	for(var i=0;i<=len;i++)
	{
		if(g_hSelRange.isEqual(x)) return i;
		x.moveStart("character",1); 
		x.moveEnd("character",1);
		while(1)
		{
			if(x.text.length==g_hSelRange.text.length)
				break;
			if(x.text.length<g_hSelRange.text.length)
			{
				x.moveEnd("character",1);
			}
			else if(x.text.length>g_hSelRange.text.length)
			{
				x.moveStart("character",1); 
			}
		}
	}
	return -1;
}

function BK_ExecuteHilight(mode, value)
{
	if(mode < 1 || mode >= MODE_ARR.length)
		return;
	
	g_hSelId=new Array();
	if(!document.selection)
		return;
	
	g_hFirstText=null;
	g_hFirstId=null;
	g_hStart=0;
	g_hSelRange = document.selection.createRange();
	if(g_hSelRange==null)
		return;
	g_hTextStr = g_hSelRange.text;
	g_hCurTextPos=0;
	preTextNode=null;
	var pNode =g_hSelRange.parentElement();

	if((g_hSelRange.text == pNode.innerText) || (pNode.value== g_hSelRange.text))
	{
		BK_ProcessItem(pNode, 'a');
	}
	else if(g_hSelRange.text == g_hSelRange.htmlText)
	{
		var sP=BK_FindSelectionPos(pNode);
		BK_FindValueOuter(pNode, sP, sP+g_hSelRange.text.length);
	}
	else
	{
		BK_ProcessHtmlString(g_hSelRange.htmlText);
		/*while(pNode.innerText.length < g_hSelRange.text.length)
		{
				pNode = pNode.parentElement;
		}*/
		BK_FindLastInput(g_hSelRange.htmlText);
		BK_GetSelection(pNode);
	}
	
	if(!g_hSelId || g_hSelId.length < 1)
		return;
	
	//alert(g_hTextStr+"::::::::::::"+g_hCurText);
	
	var out='';
	for(var i=0;i<g_hSelId.length;i++)
		out += g_hSelId[i]+"\r\n";
	
	alert(out);
	
	MakeHLStructure(mode, value);
	DrawHighlight();
}

var MODE_ARR = ["", "BACK", "SIZE", "BOLD", "UNDERLINE", "COLOR"];
function MakeHLStructure(mode, value) {
	if(!g_hSelObj)
		g_hSelObj = new Array();
	
	for(var i=0; i<g_hSelId.length; i++) {
		var idx = 0;
		var x;
		for(; idx<g_hSelObj.length; idx++) {
			if(g_hSelObj[idx].r_id==g_hSelId[i][0]) {
				x = g_hSelObj[idx];
				break;
			}
		}
		if(idx == g_hSelObj.length)
			x = new BK_HILIGHT(g_hSelId[i][0]);
		 
		var comId = g_hSelId[i][0];
		var pn = fn_fprbvi(comId);
		if(pn < 0)
			continue;
		var comAppId = g_hSelId[i][1];
		var comType = g_hSelId[i][2];
		var comNodeName = g_hSelId[i][3];
		var start = g_hSelId[i][4];
		var end = g_hSelId[i][5];
		var allFlag = (start<0&&end<0) ? true : false;
		
		switch(comType) { 
			case 'CAP':
				var comInfo = GetComInfo(comId, comAppId, comType, comNodeName, start, end);
				if(!comInfo)
					continue;
				for(var k=0; k<comInfo.length; k++) {
					if(comInfo[k][3]==comInfo[k][4])
						continue;
					x.r_addFormat(comInfo[k][0], MODE_ARR[mode], value, comInfo[k][3], comInfo[k][4]);
				}
				break;
			case 'INPUT':
			case 'VAL':
			case 'CHECK':
			case 'RADIO':
			case 'APP':
				var comInfo = GetComInfo(comId, comAppId, comType, comNodeName, start, end);
				if(!comInfo)
					continue;
				
				//Dynamic Grid Value
				if(ParsingRule[pn][2] == 4) {
					for(var x=0; x<comInfo.length; x++) {
						if(comInfo[x][3]==comInfo[x][4])
							continue;
									
						var idStr = comId+comAppId;
						var hlObj;
						for(z=0; z<g_hSelObj.length; z++) {
							if(idStr == g_hSelObj[z].r_id) {
								hlObj = g_hSelObj[z];
								hlObj.r_addFormat(comInfo[x][0], MODE_ARR[mode], value, comInfo[x][3], comInfo[x][4]);
								break;
							}
						}
						if(z != g_hSelObj.length) 
							continue;
						
						hlObj = new BK_HILIGHT(idStr);
						hlObj.r_addFormat(comInfo[x][0], MODE_ARR[mode], value, comInfo[x][3], comInfo[x][4]);
						g_hSelObj[g_hSelObj.length] = hlObj;
					}
					continue;
				}
				
				//Gemeral Value
				var pn = fn_fprbvi(comId);
				if(pn < 0)
					break;
				if(ParsingRule[pn+1] || (ParsingRule[pn+1][3]==6 || ParsingRule[pn+1][3]==7)) {
					for(var x=0; x<comInfo.length; x++) {
						var idStr = "";
						var k, z;
						for(k=pn+1; k<ParsingRule.length; k++) {
							if(ParsingRule[k][2] != 8)
								break;
							
							if(comInfo[x][1] == ParsingRule[k][12]) {
								idStr = ParsingRule[k][0];
								break;
							}
						}
						if(!idStr)
							idStr = comId;
						
						var hlObj;
						for(z=0; z<g_hSelObj.length; z++) {
							if(idStr == g_hSelObj[z].r_id) {
								if(comInfo[x][3]==comInfo[x][4])
									continue;
								hlObj = g_hSelObj[z];
								hlObj.r_addFormat(comInfo[x][0], MODE_ARR[mode], value, comInfo[x][3], comInfo[x][4]);
								break;
							}
						}
						if(z != g_hSelObj.length) 
							continue;
						
						if(comInfo[x][3]==comInfo[x][4])
							continue;
						
						hlObj = new BK_HILIGHT(idStr);
						hlObj.r_addFormat(comInfo[x][0], MODE_ARR[mode], value, comInfo[x][3], comInfo[x][4]);
						g_hSelObj[g_hSelObj.length] = hlObj;
					}
					continue;
				}
				
				switch(ParsingRule[pn][3]) {
					case 6:
					case 7:
						for(var x=0; x<comInfo.length; x++) {
							var idStr = "";
							var k, z;
							for(k=pn+1; k<ParsingRule.length; k++) {
								if(ParsingRule[k][2] != 8)
									break;
								if(ParsingRule[k][3] != ParsingRule[pn][3])
									break;
									
								if(comInfo[x][1] == ParsingRule[k][12]) {
									idStr = ParsingRule[k][0];
									break;
								}
							}
							if(!idStr)
								idStr = comId;
							
							var hlObj;
							for(z=0; z<g_hSelObj.length; z++) {
								if(idStr == g_hSelObj[z].r_id) {
									if(comInfo[x][3]==comInfo[x][4])
										continue;
									hlObj = g_hSelObj[z];
									hlObj.r_addFormat(comInfo[x][0], MODE_ARR[mode], value, comInfo[x][3], comInfo[x][4]);
									break;
								}
							}
							if(z != g_hSelObj.length) 
								continue;
							
							if(comInfo[x][3]==comInfo[x][4])
								continue;
							
							hlObj = new BK_HILIGHT(idStr);
							hlObj.r_addFormat(comInfo[x][0], MODE_ARR[mode], value, comInfo[x][3], comInfo[x][4]);
							g_hSelObj[g_hSelObj.length] = hlObj;
						}
						continue;
					default:
						for(var k=0; k<comInfo.length; k++) {
							if(comInfo[k][3]==comInfo[k][4])
								continue;
							x.r_addFormat(comInfo[k][0], MODE_ARR[mode], value, comInfo[k][3], comInfo[k][4]);
						}
						break;
				}
				break;
			default:
				break;
		}
		
		if(idx == g_hSelObj.length)
			g_hSelObj[g_hSelObj.length] = x;
	}
}

function IsStaticGrid(pn) {
	if(pn<0 || pn>=ParsingRule.length)
		return false;
	
	if(ParsingRule[pn][2]!=5)
		return false;
	
	var isSG = false;
	switch(ParsingRule[pn][3]) {
		default:
			var pNode = document.getElementById("VAL_"+ParsingRule[pn][0]);
			if(!pNode || !pNode.parentNode)
				break;
			var tempNode = pNode.parentNode;
			while(tempNode) {
				if(tempNode.nodeName=="TABLE") {
					if(tempNode.id==ParsingRule[pn][0] && tempNode.parentNode.nodeName=="TD" && tempNode.parentNode.className=="BK_STATICGRID") {
						isSG = true;
						break;
					}
					break;
				}
				tempNode = tempNode.parentNode;
			}
			break;
	}
	return isSG;
}

function GetComInfo(comId, comAppId, comType, nodeType, s, e) {
	var pn = fn_fprbvi(comId);
	if(pn < 0)
		return null;
	
	if(e==0)
		return null;
	var allFlag = (s<0&&e<0) ? true : false;
	
	switch(comType) {
		case 'CAP':
			if(!ParsingRule[pn][12])
				return null;
			
			var retVal = new Array();
			var cmdType = IsStaticGrid(pn) ? 'PRE' : 'CAP';
			if(allFlag)
				retVal[0] = [cmdType, ParsingRule[pn][12], ParsingRule[pn][12].length, 0, ParsingRule[pn][12].length];
			else {
				if(e>ParsingRule[pn][12].length)
					e = ParsingRule[pn][12].length;
				retVal[0] = [cmdType, ParsingRule[pn][12], ParsingRule[pn][12].length, s, e];
			}
			return retVal;
			
		case 'INPUT':
			switch(nodeType) {
				case 'INPUT':
				case 'TEXTAREA':
				case 'SPAN':
				case 'P':
						var valStr = GetStringValue(comId, comAppId);
						if(!valStr || valStr.length<=0)
							return null;
						
						var retVal = new Array();
						if(allFlag)
							retVal[0] = ['VALUE', valStr, valStr.length, 0, valStr.length];
						else
							retVal[0] = ['VALUE', valStr, valStr.length, s, e];
						return retVal;
				case 'OPTION':
					break;
				default:
					break;
			}
			return null;
		
		case 'APP':
			switch(nodeType) {
				case 'SPAN':
					if(!ParsingRule[pn][18])
						return null;
					
					var retVal = new Array();
					if(allFlag)
						retVal[retVal.length] = ['APPEND', ParsingRule[pn][18], ParsingRule[pn][18].length, 0, ParsingRule[pn][18].length];
					else {
						if(s>0)
							s--;
						e--;
						retVal[retVal.length] = ['APPEND', ParsingRule[pn][18], ParsingRule[pn][18].length, s, e];
					}
					return retVal;
			}
			break;
		case 'VAL':
			switch(nodeType) {
				case 'INPUT':
				case 'TEXTAREA':
					if(ParsingRule[pn][3]==6 || ParsingRule[pn][3]==7)
						break;
					
					var valStr = GetStringValue(comId, comAppId);
					if(!valStr || valStr.length<=0)
						return null;
					
					var retVal = new Array();
					if(allFlag)
						retVal[0] = ['VALUE', valStr, valStr.length, 0, valStr.length];
					else
						retVal[0] = ['VALUE', valStr, valStr.length, s, e];
					return retVal;
				case 'OPTION':
					break;
				
				case 'TD':
				case 'SPAN':
				case '#text':
				case 'DIV':
					if(ParsingRule[pn][2] == 4) {
						var pNode = document.getElementById("VAL_"+comId+comAppId);
						if(!pNode || !pNode.childNodes)
							return;
						switch(ParsingRule[pn][3]) {
							default:
								var retVal = new Array();
								var data = GetStringValue(comId, comAppId);
								if(!data)
									return;
								
								var valStr = data;
								if(ParsingRule[pn][17]) {
								  if(s<ParsingRule[pn][17].length) {
										if(e<ParsingRule[pn][17].length) {
											retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, e];
											return retVal;
										}
										retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, ParsingRule[pn][17].length];
										s=0;
									}
									else
										s -= ParsingRule[pn][17].length;
									e -= ParsingRule[pn][17].length;
									valStr = data.substring(ParsingRule[pn][17].length, data.length);
								}
								
								var appStr = "";
								var unitStr = "";
								if(ParsingRule[pn][18]) {
									appStr = valStr.substring(valStr.length-ParsingRule[pn][18].length, valStr.length);
									valStr = valStr.substring(0, valStr.length-ParsingRule[pn][18].length);
								}
								
								if(ParsingRule[pn+1] && ParsingRule[pn+1][3]==8 && ParsingRule[pn+1][12]) {
									if(!ParsingRule[pn+2] || ParsingRule[pn+2][3]!=8) {
										unitStr = valStr.substring(valStr.length-ParsingRule[pn+1][12].length, valStr.length);
										valStr = valStr.substring(0, valStr.length-ParsingRule[pn+1][12].length-1);
									}
								}
								
								if(s<valStr.length) {
									if(e<valStr.length) {
										retVal[retVal.length] = ['VALUE', valStr, valStr.length, s, e];
										return retVal;
									}
									else {
										retVal[retVal.length] = ['VALUE', valStr, valStr.length, s, valStr.length];
										s = 0;
										e -= valStr.length;
									}
								}
								else {
									s -= valStr.length;
									e -= valStr.length;
								}
								if(unitStr) {
									s -= 1;	//공백
									e -= 1; //공백
									if(s<unitStr.length) {
										if(e<unitStr.length) {
											retVal[retVal.length] = ['UNIT', unitStr, unitStr.length, s, e];
											return retVal;
										}
										retVal[retVal.length] = ['UNIT', unitStr, unitStr.length, s, unitStr.length];
										s=0;
									}
									else
										s-=unitStr.length;
									e-=unitStr.length;
								}
									
								if(appStr && s<=appStr.length) {
									if(e<=appStr.length) {
										retVal[retVal.length] = ['APPEND', appStr, appStr.length, s, e];
										return retVal;
									}
									retVal[retVal.length] = ['APPEND', appStr, appStr.length, s, appStr.length];
									return retVal;
								}
								return retVal;
						}
						return null;
					}
					else if(ParsingRule[pn][2] == 5) 
					{
						var pNode = document.getElementById("VAL_"+comId+comAppId);
						if(!pNode || !pNode.childNodes)
							return;
						
						switch(ParsingRule[pn][3]) {
							case 0:
								var isSG = IsStaticGrid(pn);
								var retVal = new Array();
								if(!isSG) {
									if(allFlag)
										retVal[0] = ["VALUE", pNode.innerText, pNode.innerText.length, 0, pNode.innerText.length];
									else
										retVal[0] = ["VALUE", pNode.innerText, pNode.innerText.length, s, e];
									return retVal;
								}
								else {
									if(allFlag) {
										var data = GetStringValue(comId, comAppId);
										if(data && data.length>0)
											retVal[retVal.length] = ['VALUE', data, data.length, 0, data.length];
										if(ParsingRule[pn][18])
											retVal[retVal.length] = ['APPEND', ParsingRule[pn][18], ParsingRule[pn][18].length, 0, ParsingRule[pn][18].length];
										return retVal;
									}
									
									var data = GetStringValue(comId, comAppId);
									if(data && data.length>0) {
										if(s<0)
											s = 0;
										if(e <= data.length) {
											retVal[0] = ['VALUE', data, data.length, 0, e];
											return retVal;
										}
										retVal[0] = ['VALUE', data, data.length, 0, data.length];
										s = 0;
										e -= data.length;
									}
									/*
									if(!ParsingRule[pn][18])
										return retVal;
								
									if(!retVal)
										retVal = new Array();
									
									if(!isSG) {
										if(s!=0)
											s--;
										e--;
									}
									retVal[retVal.length] = ['APPEND', ParsingRule[pn][18], ParsingRule[pn][18].length, s, e];
									*/
									return retVal;
								}
							case 6:
							case 7:
								var dataStr = "";
								var dataArr = new Array();
								for(var i=0; i<pNode.childNodes.length; i++) {
									var node = pNode.childNodes[i];
									if(node.nodeName=="SPAN") {
										if(node.id=="append") {
											dataArr[dataArr.length] = ["APPEND", node.innerText, dataStr.length, dataStr.length+node.innerText.length];
											dataStr += node.innerText;
											continue;
										}
										if(!node.childNodes || node.childNodes.length!=2)
											continue;
										if(node.childNodes[0].nodeName!="INPUT")
											continue;
										if(node.childNodes[1].nodeName!="SPAN" && node.childNodes[1].nodeName!="#text")
											continue;
										
										//N/A
										var isNA = false;
										for(var k=pn+1; k<ParsingRule.length; k++) {
											if(ParsingRule[k][2]!=8 || ParsingRule[k][3]!=ParsingRule[pn][3]) {
												isNA = true;
												break;
											}
											if(node.innerText == ParsingRule[k][12])
												break;
										}
										if(isNA)
											dataArr[dataArr.length] = ["NA", node.innerText, dataStr.length, dataStr.length+node.innerText.length];
										else
											dataArr[dataArr.length] = ["VALUE", node.innerText, dataStr.length, dataStr.length+node.innerText.length];
										dataStr += node.innerText;
									}
									else if(node.nodeName=="#text") {
										dataArr[dataArr.length] = ["APPEND", node.data, dataStr.length, dataStr.length+node.data.length];
										dataStr += node.data;
									}
								}
								if(!dataStr || dataArr.length<1)
									return null;
								if(allFlag) {
									s = 0;
									e = dataStr.length;
								}
								
								var retVal = new Array();
								for(var i=0; i<dataArr.length; i++) {
									if(s>dataArr[i][2] || e<dataArr[i][3])
										continue;
									retVal[retVal.length] = [dataArr[i][0], dataArr[i][1], dataArr[i][1].length, 0, dataArr[i][1].length];
								}
								return retVal;
							
							case 8:
								var isSG = IsStaticGrid(pn);
								var retVal = new Array();
								if(allFlag) {
									if(isSG && ParsingRule[pn][12]) {
										if(pNode.childNodes[0].nodeName == "#text")
											retVal[0] = ['PRE', ParsingRule[pn][12], ParsingRule[pn][12].length, 0, ParsingRule[pn][12].length];
										else if(pNode.childNodes[0].nodeName == "SPAN" && pNode.childNodes[0].id=="pre")
											retVal[0] = ['PRE', ParsingRule[pn][12], ParsingRule[pn][12].length, 0, ParsingRule[pn][12].length];
									}
									var data = GetStringValue(comId, comAppId);
									if(data && data.length>0)
										retVal[retVal.length] = ['VALUE', data, data.length, 0, data.length];
								}
								else {
									if(ParsingRule[pn][12]) {
										if(s < ParsingRule[pn][12].length) {
											if(e < ParsingRule[pn][12].length) {
												retVal[retVal.length] = ['PRE', ParsingRule[pn][12], ParsingRule[pn][12].length, s, e];
												return retVal;
											}
											else {
												retVal[retVal.length] = ['PRE', ParsingRule[pn][12], ParsingRule[pn][12].length, s, ParsingRule[pn][12].length];
											}
											s = 0;
										}
										else
											s -= ParsingRule[pn][12].length;
										e -= ParsingRule[pn][12].length;
									}
								}
								
								//UNIT, APPEND
								if(ParsingRule[pn+1] && ParsingRule[pn+1][2]==8) {
									if(!ParsingRule[pn+1][12])
										return retVal;
									if(!ParsingRule[pn+2] || (ParsingRule[pn+2] && ParsingRule[pn+2][2]!=8)) {
										if(allFlag) {
											s=0;
											e = ParsingRule[pn+1][12].length+ParsingRule[pn][18].length;
										}
										else {
											if(!isSG) {
												if(s!=0)
													s--;
												e--;
											}
										}
										if(e <= ParsingRule[pn+1][12].length)
											retVal[retVal.length] = ['UNIT', ParsingRule[pn+1][12], ParsingRule[pn+1][12].length, s, e];
										else {
											if(s <= ParsingRule[pn+1][12].length)
												retVal[retVal.length] = ['UNIT', ParsingRule[pn+1][12], ParsingRule[pn+1][12].length, s, ParsingRule[pn+1][12].length];
											
											e = e-(ParsingRule[pn+1][12].length);
											if(!isSG)
												e -= 1;	//appendix 怨듬갚
											retVal[retVal.length] = ['APPEND', ParsingRule[pn][18], ParsingRule[pn][18].length, 0, e];
										}
										return retVal;
									}
								}
								break;
								
							default:
								var isSG = IsStaticGrid(pn);
								var retVal = null;
								if(allFlag) {
									retVal = new Array();
									if(ParsingRule[pn][2]==5) {
										if(isSG && ParsingRule[pn][17]) {
											if(pNode.childNodes[0].nodeName == "#text")
												retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, ParsingRule[pn][17].length];
											else if(pNode.childNodes[0].nodeName == "SPAN" && pNode.childNodes[0].id == "pre")
												retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, ParsingRule[pn][17].length];
											
										}
									}
									else {
										if(ParsingRule[pn][17])
											retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, ParsingRule[pn][17].length];
									}
									
									if(ParsingRule[pn][3] != 5) {
										var data = GetStringValue(comId, comAppId);
										if(data && data.length>0)
											retVal[retVal.length] = ['VALUE', data, data.length, 0, data.length];
									}
									
									if(!ParsingRule[pn][18])
										return retVal;
									retVal[retVal.length] = ['APPEND', ParsingRule[pn][18], ParsingRule[pn][18].length, 0, ParsingRule[pn][18].length];
									return retVal;
								}
								
								if(ParsingRule[pn][2]==4 || isSG) {
									if(ParsingRule[pn][17]) {
										if(s < ParsingRule[pn][17].length) {
											retVal = new Array();
											if(s<0)
												s = 0;
											if(e <= ParsingRule[pn][17].length) {
												retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, e];
												return retVal;
											}
											retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, ParsingRule[pn][12].length];
										}
										else {
											s = 0;
											e -= ParsingRule[pn][12].length;
										}
									}
								}
								
								if(!ParsingRule[pn][18])
									return retVal;
								
								if(!retVal)
									retVal = new Array();
								
								if(!isSG) {
									if(s!=0)
										s--;
									e--;
								}
								retVal[retVal.length] = ['APPEND', ParsingRule[pn][18], ParsingRule[pn][18].length, s, e];
								return retVal;
						}
					}
					return null;
			}
			return null;
		
		case 'RADIO':
			switch(nodeType) {
				case 'INPUT':
					break;
			}
			return null;
		
		case 'CHECK':
			return null;
		
		default:
			break;
	}
	return null;
}

function GetComData(idStr, type) {
	var idArr = idStr.split("_");
	var comId = "";
	var comAppId = "";
	if(idArr[0]=='RADIO' || idArr[0]=='CHECK') {
		if(idArr.length>3) {
			comId = idArr[0]+"_"+idArr[1]+"_"+idArr[2];
			for(var x=3; x<idArr.length; x++)
				comAppId += "_"+idArr[x];
		}
		else
			comId = idStr;
	}
	else {
		comId = idArr[0];
		for(var x=1; x<idArr.length; x++)
			comAppId += "_"+idArr[x];
	}
			
	var pn = fn_fprbvi(comId);
	if(pn < 0)
		return '';
	
	var dataStr = '';
	switch(type) {
		case 'CAP':
			dataStr = ParsingRule[pn][12];
			break;
		case 'PRE':
			dataStr = ParsingRule[pn][17];
			break;
		case 'VALUE':
			switch(ParsingRule[pn][3]) {
				case 6:
				case 7:
					dataStr = ParsingRule[pn][12];
					break;
				default:
					if(ParsingRule[pn][2]==4) {
						var totData = GetStringValue(comId, comAppId);
						if(ParsingRule[pn][17]) {
							var tempArr = totData.split(ParsingRule[pn][17]);
							if(tempArr.length==1)
								totData = tempArr[0];
							else {
								totData = "";
								for(var i=1; i<tempArr.length; i++) {
									if(totData!="")
										totData += ParsingRule[pn][17];
									totData += tempArr[i];
								}
							}
						}
						if(ParsingRule[pn][18]) {
							var tempArr = totData.split(""+ParsingRule[pn][18]);
							if(tempArr.length==1)
								totData = tempArr[0];
							else {
								totData = "";
								for(var i=0; i<tempArr.length-1; i++) {
									if(totData!="")
										totData += ""+ParsingRule[pn][18];
									totData += tempArr[i];
								}
							}	
						}
						if(ParsingRule[pn+1] && ParsingRule[pn+1][3]==8) {
							if(!ParsingRule[pn+2] || ParsingRule[pn+2][3]!=8) {
								var tempArr = totData.split(ParsingRule[pn+1][12]);
								if(tempArr.length==1)
									totData = tempArr[0];
								else {
									totData = "";
									for(var i=0; i<tempArr.length-1; i++) {
										if(totData!="")
											totData += ""+ParsingRule[pn+1][12];
										totData += tempArr[i];
									}
								}
							}
						}
						dataStr = totData;
					}
					else if(ParsingRule[pn][2]==5)
						dataStr = GetStringValue(comId, comAppId);
					break;
			}
			break;
		case 'UNIT':
			if(ParsingRule[pn][2]==5) {
				switch(ParsingRule[pn][3]) {
					case 8:
						if(ParsingRule[pn+1] && ParsingRule[pn+1][2]==8) {
							if(!ParsingRule[pn+1][12])
								break;
							if(!ParsingRule[pn+2] || (ParsingRule[pn+2] && ParsingRule[pn+2][2]!=8))
								dataStr = ParsingRule[pn+1][12];
						}
						break;
					default:
						break;
				}
			}
			else if(ParsingRule[pn][2]==4) {
				if(ParsingRule[pn+1] && ParsingRule[pn+1][2]==8) {
					if(!ParsingRule[pn+2] || ParsingRule[pn+2][2]!=8)
						dataStr = ParsingRule[pn+1][12];
				}
			}
			break;
		case 'APPEND':
			dataStr = ParsingRule[pn][18];
			break;
		case 'NA':
			dataStr = "N/A";
			break;
		default:
			break;
	}
	return dataStr;
}

function DrawHighlight() {
	if(!g_hSelObj || g_hSelObj.length<1)
		return;
	
	for(var i=0; i<g_hSelObj.length; i++) {
		var BK_H_OBJ = g_hSelObj[i];
		if(!BK_H_OBJ || !BK_H_OBJ.r_id)
			continue;
		
		var idArr = BK_H_OBJ.r_id.split("_");
		var comId = "";
		var comAppId = "";
		if(idArr[0]=='RADIO' || idArr[0]=='CHECK') {
			if(idArr.length>3) {
				comId = idArr[0]+"_"+idArr[1]+"_"+idArr[2];
				for(var x=3; x<idArr.length; x++)
					comAppId += "_"+idArr[x];
			}
			else
				comId = BK_H_OBJ.r_id;
		}
		else
			comId = idArr[0];
		
		var pn = fn_fprbvi(comId);
		if(pn < 0)
			continue;
		
		try {
			var typeArr = ['CAP', 'PRE', 'VALUE', 'UNIT', 'APPEND', 'NA'];
			for(var j=0; j<typeArr.length; j++) {
				var tempArr = null;
				if(typeArr[j]=='CAP')					tempArr = BK_H_OBJ.r_caption.r_arr;
				else if(typeArr[j]=='PRE')		tempArr = BK_H_OBJ.r_prefix.r_arr;
				else if(typeArr[j]=='VALUE')	tempArr = BK_H_OBJ.r_value.r_arr;
				else if(typeArr[j]=='UNIT')		tempArr = BK_H_OBJ.r_unit.r_arr;
				else if(typeArr[j]=='APPEND')	tempArr = BK_H_OBJ.r_appendix.r_arr;
				else if(typeArr[j]=='NA')			tempArr = BK_H_OBJ.r_na.r_arr;
				
				if(!tempArr)
					continue;
				for(k=0; k<tempArr.length; k++) {
					var htmlStr = GetComData(BK_H_OBJ.r_id, typeArr[j]);
					if(!htmlStr)
						continue;
					
					var ret = BK_H_OBJ.r_getFormat(typeArr[j], htmlStr);
					if(!ret)
						continue;
					//alert(htmlStr+"::::::::::::::"+ret);
					
					switch(typeArr[j]) {
						case 'CAP':
							if(ParsingRule[pn][2] == 3) {				//Group
								var capNode = document.getElementById("CAP_"+BK_H_OBJ.r_id+"_1");
								if(!capNode)
									break;
								capNode.innerHTML = ret;
							}
							else if(ParsingRule[pn][2] == 4) {	//Grid
								
							}
							else if(ParsingRule[pn][2] == 5) {	//Value
								var node = document.getElementById("CAP_"+BK_H_OBJ.r_id);
								if(!node) {	//Value
									node = document.getElementById(BK_H_OBJ.r_id);
									if(!node || !node.childNodes)
										break;
									for(var z=0; z<node.childNodes.length; z++) {
										var chNode = node.childNodes[z];
										if(chNode.nodeName=="SPAN") {
											if(chNode.id == "VAL_"+BK_H_OBJ.r_id)
												break;
											if(chNode.childNodes) {
												if(chNode.childNodes[0].nodeName == "#text") {
													//chNode.removeChild(chNode.childNodes[0]);
													chNode.innerHTML = ret;
												}
												if(chNode.childNodes[0].nodeName == "B") {
													chNode.childNodes[0].innerHTML = ret;
												}
											}
											break;
										}
									}
								}
								else				//Static Grid
									node.innerHTML = ret;
							}
							break;
						case 'PRE':
							if(ParsingRule[pn][2]==4) {
								switch(ParsingRule[pn][3]) {
									case 6:
									case 7:
										break;
									default:
										var pNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
										if(!pNode || !pNode.childNodes)
											break;
										var chNode = pNode.childNodes[0];
										if(chNode.nodeName=="#text") {
											var dataStr = GetStringValue(comId, comAppId);
											var tempArr = dataStr.split(ParsingRule[pn][17]+" ");
											var newData = "";
											if(tempArr.length==1)
												newData = dataStr;
											else {
												for(var x=1; x<tempArr.length; x++) {
													if(newData!="")
														newData += ParsingRule[pn][17]+" ";
													newData += tempArr[x];
												}
											}
											
											pNode.removeChild(chNode);
											//pNode.innerHTML = "<span id='pre'>"+ret+"</span>" + pNode.innerHTML;
											pNode.innerHTML = "<span id='pre'>"+ret+"</span>" + newData;
										}
										else if(chNode.nodeName=="SPAN" && chNode.id=="pre")
											chNode.innerHTML = ret;
										break;
								}
							}
							else if(ParsingRule[pn][2]==5) {
								switch(ParsingRule[pn][3]) {
									case 0:
										var capNode = document.getElementById("CAP_"+BK_H_OBJ.r_id);
										if(!capNode)
											break;
										capNode.innerHTML = "<span id='pre'>"+ret+"</span>";
										break;
									
									case 6:
									case 7:
										break;
									default:
										var pNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
										if(!pNode || !pNode.childNodes)
											break;
										var chNode = pNode.childNodes[0];
										if(chNode.nodeName=="#text") {
											pNode.removeChild(chNode);
											pNode.innerHTML = "<span id='pre'>"+ret+"</span>" + pNode.innerHTML;
										}
										else if(chNode.nodeName=="SPAN" && chNode.id=="pre")
											chNode.innerHTML = ret;
										break;
								}
							}
													
							break;
						case 'VALUE':
							if(ParsingRule[pn][2]==4) {
								switch(ParsingRule[pn][3]) {
									case 0:
										var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
										if(!valNode || !valNode.childNodes)
											break;
										for(var z=0; z<valNode.childNodes.length; z++) {
											var chNode = valNode.childNodes[z];
											if(chNode.nodeName=='SPAN' && chNode.id=='value') {
												chNode.innerHTML = ret;
												break;
											}
										}
										break;
								}
								break;
							}
							else if(ParsingRule[pn][2]==8) {
								switch(ParsingRule[pn][3]) {
									case 6:
										var pId = BK_H_OBJ.r_id.split("_")[1];
										var pNode = document.getElementById("VAL_"+pId+comAppId);
										if(!pNode || !pNode.childNodes)
											break;
										
										if(comAppId) {
											for(var x=0; x<pNode.childNodes.length; x++) {
												var chNode = pNode.childNodes[x];
												if(chNode.nodeName=="SPAN" && chNode.id=='value') {
													if(chNode.innerText==htmlStr)
														chNode.innerHTML = ret;
													break;
												}
											}
										}
										else {
											if(pNode.innerText==htmlStr)
												pNode.innerHTML = ret;
										}
										break;
									case 7:
										break;
								}
							}
							else if(ParsingRule[pn][2]==5) {
								switch(ParsingRule[pn][3]) {
									case 0:
										var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
										if(!valNode)
											break;
										if(valNode.nodeName == "TEXTAREA") {
											var obj = BK_ChangeTextarea(valNode);
											obj.innerHTML = ret;
										}
										else
											valNode.innerHTML = ret;
										break;
									
									case 1:
									case 2:
									case 4:
									case 8:									
									case 9:
										var obj;
										if(ParsingRule[pn][3] == 8)
											obj = document.getElementById("INPUTU1_"+BK_H_OBJ.r_id);
										else
											obj = document.getElementById("INPUT_"+BK_H_OBJ.r_id);
										if(!obj)
											break;
										if(obj.nodeName == 'INPUT') {
											var newObj = BK_ChangeInput(obj);
											if(newObj)
												newObj.innerHTML = ret;
											break;
										}
										obj.innerHTML = ret;
										break;
									case 3:
										var obj = document.getElementById("INPUT_"+BK_H_OBJ.r_id);
										if(!obj)
											break;
										if(obj.nodeName == 'TEXTAREA') {
											var newObj = BK_ChangeTextarea(obj);
											if(newObj)
												newObj.innerHTML = ret;
											break;
										}
										obj.innerHTML = ret;
										break;
									case 6:
										if(ParsingRule[pn][2]!=8)
											break;
										
										var pId = BK_H_OBJ.r_id.split("_")[1];
										var pNode = document.getElementById("VAL_"+pId);
										if(!pNode)
											break;
										pNode.innerHTML = ret;
										break;
									case 7:
										if(ParsingRule[pn][2]!=8)
											break;
										
										var pId = BK_H_OBJ.r_id.split("_")[1];
										var pNode = document.getElementById("VAL_"+pId);
										if(!pNode || !pNode.childNodes)
											break;
										
										break;
								}
							}
							break;
						case 'UNIT':
							if(ParsingRule[pn][2]==5) {
								switch(ParsingRule[pn][3]) {
									case 0:
										var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
										if(!valNode || !valNode.parentNode)
											break;
										var pNode = valNode.parentNode;
										for(var z=0; z<pNode.childNodes.length; z++) {
											var chNode = pNode.childNodes[z];
											if(chNode.nodeName == "#text") {
												pNode.removeChild(chNode);
												pNode.innerHTML += "<span id='unit'>&nbsp;"+ret+"</span>";
												if(ParsingRule[pn][18])
													pNode.innerHTML += "&nbsp;"+ParsingRule[pn][18];
												break;
											}
										}
										break;
										
									case 8:
										var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
										if(!valNode || !valNode.childNodes)
											break;
										for(var z=valNode.childNodes.length-1; z>=0; z--) {
											var chNode = valNode.childNodes[z];
											if(chNode.nodeName == "INPUT")
												continue;
											else if(chNode.nodeName == "#text") {	
												var z1 = 0;
												for(; z1<valNode.childNodes.length; z1++) {
													if(valNode.childNodes[z1].nodeName=="SPAN" && valNode.childNodes[z1].id=="unit")
														break;
												}
												if(z1 == valNode.childNodes.length) {
													var newTextNode = chNode.cloneNode(true);
													valNode.removeChild(chNode);
													if(IsStaticGrid(pn))
														valNode.innerHTML += "<span id='unit'>"+ret+"</span>";
													else
														valNode.innerHTML += "<span id='unit'>&nbsp;"+ret+"</span>";
													if(ParsingRule[pn][18]) {
														newTextNode.data = " "+ParsingRule[pn][18];
														valNode.appendChild(newTextNode);
													}
													break;
												}
												chNode.innerHTML = ret;
												break;
											}
											else if(chNode.nodeName == "SPAN") {
												if(chNode.id=="unit") {
													if(IsStaticGrid(pn))
														chNode.innerHTML = ret;
													else
														chNode.innerHTML = "&nbsp;"+ret;
													break;
												}
											}
										}
										break;
									default:
										break;
								}
							}
							else if(ParsingRule[pn][2]==4) {
								switch(ParsingRule[pn][3]) {
									case 0:
										var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
										if(!valNode || !valNode.childNodes)
											break;
										for(var z=0; z<valNode.childNodes.length; z++) {
											var chNode = valNode.childNodes[z];
											if(chNode.nodeName=='SPAN' && chNode.id=='unit') {
												chNode.innerHTML = ret;
												break;
											}
										}
										break;
									default:
										break;
								}
							}
							break;
						case 'APPEND':
							if(ParsingRule[pn][2]==5) {
								switch(ParsingRule[pn][3]) {
									case 0:
										var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
										if(!valNode || !valNode.parentNode)
											break;
										var pNode = valNode.parentNode;
										while(pNode) {
											if(pNode.id==BK_H_OBJ.r_id || pNode.nodeName=="TD")
												break;
											pNode = pNode.parentNode;
										}
										for(var z=0; z<pNode.childNodes.length; z++) {
											var chNode = pNode.childNodes[z];
											if(chNode.nodeName == "#text") {
												pNode.removeChild(chNode);
												pNode.innerHTML += "<span id='append'>&nbsp;"+ret+"</span>";
												break;
											}
											else if(chNode.nodeName == "SPAN") {
												if(chNode.id == "append")
												 chNode.innerHTML = "&nbsp;"+ret;
												else if(!chNode.id) {
													if(chNode.childNodes && chNode.childNodes[0].nodeName=="#text") {
														chNode.innerHTML = "<span id='append'>&nbsp;"+ret+"</span>";
													}
													else if(chNode.childNodes && chNode.childNodes[0].nodeName=="SPAN" && chNode.childNodes[0].id=='append')
														chNode.childNodes[0].innerHTML = "&nbsp;"+ret;
												}
											}
										}
										break;
										
									case 8:
										var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
										if(!valNode || !valNode.childNodes)
											break;
										for(var z=valNode.childNodes.length-1; z>=0; z--) {
											var chNode = valNode.childNodes[z];
											if(chNode.nodeName == "INPUT")
												continue;
											else if(chNode.nodeName == "#text") {
												var z1 = 0;
												for(; z1<valNode.childNodes.length; z1++) {
													if(valNode.childNodes[z1].nodeName=="SPAN" && valNode.childNodes[z1].id=="unit")
														break;
												}
												if(z1 == valNode.childNodes.length) {
													if(ParsingRule[pn+1] && ParsingRule[pn+1][2]==8 && ParsingRule[pn+1][12]) {
														if(!ParsingRule[pn+2] || (ParsingRule[pn+2] && ParsingRule[pn+2][2]!=8))
															chNode.data = ParsingRule[pn+1][12];
													}
												}
												else
													valNode.removeChild(chNode);
												if(IsStaticGrid(pn))
													valNode.innerHTML += "<span id='append'>"+ret+"</span>";
												else
													valNode.innerHTML += "<span id='append'>&nbsp;"+ret+"</span>";
												break;											
											}
											else if(chNode.nodeName == "SPAN") {
												if(chNode.id=="append") {
													if(IsStaticGrid(pn))
														chNode.innerHTML = ret;
													else
														chNode.innerHTML = "&nbsp;"+ret;
													break;
												}
											}
										}
										break;
									case 1:
									case 2:
									case 3:
									case 4:
									case 5:									
									case 9:
										var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
										if(!valNode)
											break;
										
										var isSG = true;
										for(var z=0; z<valNode.childNodes.length; z++) {
											var chNode = valNode.childNodes[z];
											if(chNode.nodeName == "#text")
												break;
											else if(chNode.nodeName == "INPUT") {
												isSG = false;
												break;
											}
											else if(chNode.nodeName == "SPAN" && chNode.id == "pre")
												break;
										}
										
										var chNode = valNode.childNodes;
										for(var z=chNode.length-1; z>=0; z--) {
											if(chNode[z].nodeName == "#text" || chNode[z].nodeName == "SPAN") {
												if(!chNode[z].id || chNode[z].id=='append') {
													valNode.removeChild(chNode[z]);
													break;
												}
											}
										}
										if(isSG)
											valNode.innerHTML += "<span id='append'>"+ret+"</span>";
										else
											valNode.innerHTML += "<span id='append'>&nbsp;"+ret+"</span>";
										break;
									case 6:
									case 7:
										var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
										if(!valNode)
											break;
										
										for(var z=valNode.childNodes.length-1; z>=0; z--) {
											var chNode = valNode.childNodes[z];
											if(chNode.nodeName == "#text") {
												var newTextNode = chNode.cloneNode(true);
												valNode.removeChild(chNode);
												valNode.innerHTML += "<span id='append'>&nbsp;"+ret+"</span>";
											}
											else if(chNode.nodeName=="SPAN" && chNode.id=="append") {
												chNode.innerHTML = "&nbsp;"+ret;
											}
										}
										break;
									default:
										break;
								}
							}
							else if(ParsingRule[pn][2]==4) {
								switch(ParsingRule[pn][3]) {
									case 0:
										var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
										if(!valNode || !valNode.childNodes)
											break;
										for(var z=0; z<valNode.childNodes.length; z++) {
											var chNode = valNode.childNodes[z];
											if(chNode.nodeName=='SPAN' && chNode.id=='append') {
												chNode.innerHTML = ret;
												break;
											}
										}
										break;
									default:
										break;
								}
							}
							break;
						case 'NA':
							switch(ParsingRule[pn][3]) {
								case 6:
								case 7:
									var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
									if(!valNode)
										break;
									
									for(var z=0; z<valNode.childNodes.length; z++) {
										var chNode = valNode.childNodes[z];
										if(!chNode || chNode.childNodes.length!=2)
											continue;
										if(chNode.childNodes[0].nodeName != "INPUT")
											continue;
																				
										if(chNode.childNodes[1].nodeName=="SPAN") {
											chNode.childNodes[1].innerText = "";
											chNode.childNodes[1].innerHTML = ret;
										}
									}
									break;
							}
							break;
						default:
							break;
					}
				}
			}
		}
		catch(e) {}
	}
}

function MakeHighlightXML() {
	if(!g_hSelObj || g_hSelObj.length<1)
		return;
	
	var hlXml = "<BK_HL_COLLECTION>";
	for(var i=0; i<g_hSelObj.length; i++) {
		var hlObj = g_hSelObj[i];
		hlXml += "<BK_HL_ITEM id='"+hlObj.r_id+"'>";
		
		var typeArr = ['CAP', 'PRE', 'VALUE', 'UNIT', 'APPEND'];
		for(k=0; k<typeArr.length; k++) {
			var tempArr = null;
			if(typeArr[k]=='CAP')					tempArr = hlObj.r_caption.r_arr;
			else if(typeArr[k]=='PRE')		tempArr = hlObj.r_prefix.r_arr;
			else if(typeArr[k]=='VALUE')	tempArr = hlObj.r_value.r_arr;
			else if(typeArr[k]=='UNIT')		tempArr = hlObj.r_unit.r_arr;
			else if(typeArr[k]=='APPEND')	tempArr = hlObj.r_appendix.r_arr;
			else if(typeArr[k]=='NA')			tempArr = hlObj.r_na.r_arr;
				
			for(var j=0; j<tempArr.length; j++) {
				var tempObj = tempArr[j];
				hlXml += "<HL_DATA type='"+typeArr[k]+"'";
				hlXml += " mode='"+tempObj.r_type+"' value='"+tempObj.r_value+"' start='"+tempObj.r_start+"' end='"+tempObj.r_end+"'>";
				hlXml += "</HL_DATA>";
			}
		}
		
		hlXml += "</BK_HL_ITEM>";
	}
	hlXml += "</BK_HL_COLLECTION>";
	return hlXml;
}

function LoadHighlightXML(x0) {
	var x1;
	if(window.ActiveXObject)
	{
		x1=new ActiveXObject("Microsoft.XMLDOM");
		x1.async="false";
		G_ORGXML=x0.replace("encoding='UTF-16'", "encoding='euc-kr'");
		
		x1.loadXML(G_ORGXML);
	}
	else if(window.DOMParser)
	{
		var parser = new DOMParser();
		x1 = parser.parseFromString(x0.replace("encoding='UTF-16'", "encoding='euc-kr'"),"text/xml");
	}
	if(x1==null)
		return;
	
	g_hSelObj = null;
	var hlList = x1.getElementsByTagName("BK_HL_ITEM");
	if(!hlList || hlList.length<1)
		return;
	
	g_hSelObj = new Array();
	for(var i=0; i<hlList.length; i++) {
		var hlItem = hlList[i];
		var hlItemId = hlItem.getAttribute("id");
		if(!hlItemId)
			continue;
		var BK_H_OBJ = new BK_HILIGHT(hlItemId);
		var hlDataList = hlItem.getElementsByTagName("HL_DATA");
		for(var j=0; j<hlDataList.length; j++) {
			var type = hlDataList[j].getAttribute("type");
			var mode = hlDataList[j].getAttribute("mode");
			var val = hlDataList[j].getAttribute("value");
			var start = hlDataList[j].getAttribute("start");
			var end = hlDataList[j].getAttribute("end");
			
			BK_H_OBJ.r_addFormat(type, mode, val, start, end);
		}
		g_hSelObj[g_hSelObj.length] = BK_H_OBJ;
	}
	
	DrawHighlight();
}

function FindHilightObjById(id) {
	if(!g_hSelObj)
		return null;
	
	for(var i=0; i<g_hSelObj.length; i++) {
		if(g_hSelObj[i].r_id == id)
			return g_hSelObj[i];
	}
	return null;
}

function Replace4xml(x1)
{
	if(x1!=0 && (x1 == null || x1 ==""))
		return "";
	
	if(x1.replace == null)
		return x1;
	x1 = x1.replace(/</g, "&lt;");
	x1 = x1.replace(/>/g, "&gt;");
	x1 = x1.replace(/'/g,"&apos;");
	x1 = x1.replace(/&/g,"&amp;");
	
	
	return x1;
}

function GetAjaxRequestData(fname, name, data)
{
 var ret ="<REQUEST id='"+fname+"' >";
 var i;
 
 for(i=0;i<data.length;i++)
 {
  ret += "<PS>";
  for(var j=0; j<data[i].length; j++)
  {
   ret += "<D name='"+name[j]+"'>"+Replace4xml(data[i][j])+"</D>";  
  }
  ret += "</PS>";
 }
 ret +="</REQUEST>"
 
 return ret;
}

function SendServerCall2(fname, param, data, url, callBackFunc)
{
  var xmlHttpReq = false;
    if (window.XMLHttpRequest) 
    {
       xmlHttpReq = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
       xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    if(xmlHttpReq == null)
    {
     alert("Can't get the XML HTTP");
     return;
    }
    if(callBackFunc!=null)
    {
     xmlHttpReq.onreadystatechange=function (){
      if(xmlHttpReq.readyState==4)
      {
       callBackFunc(xmlHttpReq.responseText);
      }
     };
     xmlHttpReq.open('POST', url, true); 
    }
    else
      xmlHttpReq.open('POST', url, false);
    
    var ajaxParam = GetAjaxRequestData(fname, param, data);
    
    ajaxParam = ToHex4Unicode("<?xml version='1.0' encoding='euc-kr'?><REQUESTLIST>"+ajaxParam+"</REQUESTLIST>");
    xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpReq.send('reqData='+ajaxParam);
    if(callBackFunc==null)
    {
     return xmlHttpReq.responseText;
    }
}

function fn_loadDataXml(x0,colstr)
{
	var x1=null;
	if (window.ActiveXObject)
	{
		x1=new ActiveXObject("Microsoft.XMLDOM");
		x1.async="false";
		x1.loadXML(x0.replace("encoding='UTF-16'", "encoding='euc-kr'"));
	}
	else if(window.DOMParser)
	{
 		var parser=new DOMParser();
 		x1 = parser.parseFromString(x0, "text/xml");
	}
	else
	{
		x1 = document.implementation.createDocument("","",null);
		x1.load(x0);
	}
	
	if(x1==null)
		return;
	
	var x2 = x1.getElementsByTagName("VALUESET");
	var i,j,k;
	var colStrArr = colstr.split(',');
	var makeArray = Array();
	for(i =0; i<x2.length; i++)
	{
		var valueObj = x2[i].getElementsByTagName("VALUE");
		var valueArray = Array();
		for(k=0;k<colStrArr.length;k++)
		{
			for(j=0;j<valueObj.length;j++)
			{
				if(colStrArr[k]	== valueObj[j].getAttribute("name"))
				{
					if(valueObj[j].text==undefined)
						valueArray[k] = valueObj[j].textContent;
					else
						valueArray[k] = valueObj[j].text;
					break;
				}
			}
		}
		makeArray[i] = valueArray;
	}
	return makeArray;
}
var userDn = '';
/*
 KMI서버에서 사용자 인증서 다운로드
*/
function EMR_DownloadCert()
{
	var KMClientAX = parent.parent.KMClientAX;
  	var ret, ret_dn, ret1;
  	/* kmi 서버 접속 */
  	ret = KMClientAX.kmsConnect(document.domain, '7001');
  	if( ret == false)
	{
		alert("KMI 서버 접속 실패-[" + KMClientAX.Error_MSG() + "]");
		KMClientAX.kmsDisconnect();
		return false;
	}

	/* kmi 클라이언트 초기화 */
	ret = KMClientAX.kmsInit();
	if(ret == "")
	{
		alert("KMI 클라이언트 초기화 실패-[" + KMClientAX.Error_MSG() + "]");
		KMClientAX.kmsDisconnect();
    return false;
	}

	/* 인증서 다운로드 */
	//ret_dn = KMClientAX.GetKeyAndCert("ttttttest");
	//ret_dn = KMClientAX.GetKeyAndCert(doctorId); //kjk 테스트후 변경해야함
	ret_dn = KMClientAX.GetKeyAndCert('hytest');
	if(ret_dn == "")
	{
		alert("인증서 다운로드 실패 \n 의무기록팀에 문의하시기 바랍니다.");
		KMClientAX.kmsDisconnect();
    return false;
	}
	else
	{
		//alert("인증서 다운로드 완료-[" + ret_dn + "]");
		userDn = ret_dn;
		
		// 건양대병원 요청으로 패스워드 입력을 받도록 추가
		//ret1 = KMClientAX.IsCertNew2(doctorId, userDn, ''); //kjk 테스트후 변경해야함
		ret1 = KMClientAX.IsCertNew2('hytest', userDn, '');
		if(ret1 == 0)             // 유효한 인증서
		{
			//alert("인증서 갱신기간이 아닙니다.");
		}
		else if(ret1 == 1)        // 갱신 및 KMI 서버 등록 완료
		{
			alert("인증서 갱신 성공 및 KMI 서버 등록 성공");
		}
		else if(ret1 == 2)        // 갱신 실패
		{
			alert("인증서 갱신 실패-" + KMClientAX.Error_MSG());
		}
		else if(ret1 == 3)
		{
			alert("인증서 갱신 완료, KMI서버등록 실패, 인증서 로컬(c:\Cert_bakup)에 백업완료");
			// 인증서 재등록 시도
			//ret = KMClientAX.SetKeyAndCert(doctorId, "","","");//kjk 테스트후 변경해야함
			ret = KMClientAX.SetKeyAndCert('hytest', "","","");
	 		if(ret== "")
	   	{
	 			alert("KMI 서버에 인증서 재등록 실패-" + KMClientAX.Error_MSG());
	 		}
		}
		else if(ret1 == 4)
		{
			alert("인증서 갱신 완료, KMI서버등록 실패, 인증서 로컬(c:\Cert_bakup)에 백업 실패-" + KMClientAX.Error_MSG());
			// 인증서 재등록 시도
			//ret = KMClientAX.SetKeyAndCert(doctorId, "","",""); //kjk 테스트후 변경해야함
			ret = KMClientAX.SetKeyAndCert('hytest', "","","");
	 		if(ret== "")
	   	{
	 			alert("KMI 서버에 인증서 재등록 실패-" + KMClientAX.Error_MSG());
	 		}
		}
		else if(ret1 == 5)
		{
			alert("이미 만료된 인증서");
			return false;
		}
		else if(ret1 == 6)
		{
			alert("사용자 요청에 의해 인증서 갱신이 취소 되었습니다.");
		}
		else
		{
			alert("기타에러-" + KMClientAX.Error_MSG());
		}
	}

	/* 접속 종료 */
	KMClientAX.kmsDisconnect();
	return true;
}

/* 로컬 PC 인증서 삭제 */
function EMR_DeleteLocal()
{
		var KMClientAX = parent.parent.KMClientAX;
		
		returnMsg =KMClientAX.LocalDelKeyAndCert(userDn);
		if(returnMsg== "")
		{
			//alert("KMClientAX.Error_MSG() : "+KMClientAX.Error_MSG());
		}
		else
		{
			//alert("인증서 삭제 "+returnMsg);
		}
}

function makeSign(x1)
{
	try
	{
		//x1 = "전자서명용원문입니다.";
	
		var CertManX = parent.parent.CertManX;
	
		//인증서 선택정보 초기화
		//CertManX.UnSetMatchedContext();
		
		//하드디스크 인증서만 검색 (KMI에서 내려준 인증서검색)
		CertManX.SetDeviceOrder("H");
		
		//인증서 만료안내창 skip (갱신은 KMI에서 진행)
		CertManX.SetExipreCheckSkip(1);
		
		//인증서 선택 함수
		//var dn = CertManX.SetMatchedContextExt("","ou=EMR,ou=한양대학교병원,ou=의료,o=SignKorea,c=KR","", 256+0+1);
		var dn = CertManX.SetMatchedContextExt("","","", 256+0+1);
		if(dn == "")
		{
			alert("SetMatchedContextExt 실패 : ["+CertManX.GetLastErrorCode() +"]"+CertManX.GetLastErrorMsg());
			return;
		}

		//전자서명 함수
		var signdata = CertManX.SignDataB64("", x1, 0);
		if(signdata == "")
		{
			alert("SignDataB64 실패 : ["+CertManX.GetLastErrorCode() +"]"+CertManX.GetLastErrorMsg());
			return;
		}
		var signdataVal = CertManX.RemoveLF(signdata);
		
		var flag = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/signkorea/demon53.jsp", "t_signdata="+encodeURIComponent(signdataVal), 7);
		
		var SubjectDN = " SubjectDN='"+CertManX.GetToken(signdata, "dn")+"'";
		var attr = SubjectDN;
		var signStr = "<SIGN "+attr+">"+signdataVal+"</SIGN>";
		
		return signStr;
	}
	catch(e)
	{
		alert("인증서를 호출할 수 없습니다.");
		return '';
	}
}

function post_to_url(recXml,saveParam) {
	
		var strXmlStr = recXml;
		var signStr;
		var downFlag = EMR_DownloadCert();
		if(downFlag)
			signStr=makeSign(strXmlStr+"</DOCUMENT>");
		EMR_DeleteLocal();
		if(!downFlag)
			return false;
		if(signStr=="" || signStr=="null" || signStr==null)
			return false;
		strXmlStr += signStr;
		strXmlStr += "</DOCUMENT>";
		
		var xm=1;
		if(saveParam[8]==2)
			xm=4;
		var xr = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/SaveRecord_All",
		"doc_info="+saveParam[0]+"^"+saveParam[1]+"^"+saveParam[2]+"^"+saveParam[3]+"^"+saveParam[4]+"^"
		+saveParam[5]+"^"+saveParam[6]+"^"+saveParam[7]
		+"^"+xm+"^"+saveParam[9]+"^"+saveParam[10]+"^"+encodeURIComponent(saveParam[11])+"^"+saveParam[12]
		+"&xmlData="+ToHex4Unicode(strXmlStr), 2)
		+"&accumuFlag=0";
		
		if(xr==0)
			return false;
		else 
			result = xr;
	
		return result;
}

var tempXml;
function selectPrintCheck(pid,createDate,doctorId,useCd,recCode)
{
	tempXml=SendServerCall2('selectPrintCheck',['pid','createDate','doctorId','useCd','recCode'],[[pid,createDate,doctorId,useCd,recCode]], SERVERPRO+SERVERIP+'/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='CNT';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray[0];
}
function insertBermprint(pid,gubun,doctorId,recCode,chosNo,cDate,prtYn,prtNum,commentCode,commentValue,pName,docCode,dept,hSeq,pageCnt)
{
	tempXml=SendServerCall2('insertBermprint',['pid','gubun','doctorId','recCode','chosNo','cDate','prtYn','prtNum','commentCode','commentValue','pName','docCode','dept','hSeq','pageCnt'],[[pid,gubun,doctorId,recCode,chosNo,cDate,prtYn,prtNum,commentCode,commentValue,pName,docCode,dept,hSeq,pageCnt]], SERVERPRO+SERVERIP+'/EMR_DATA/CommonAjax.jsp', null);	
	return tempXml;	
}

function updateBermprint(pid,createDate,doctorId,prtNum,commentCode,commentValue,recCode,recSeq,pageCnt)
{
	tempXml=SendServerCall2('updateBermprint',['pid','createDate','doctorId','prtNum','commentCode','commentValue','recCode','recSeq','pageCnt'],[[pid,createDate,doctorId,prtNum,commentCode,commentValue,recCode,recSeq,pageCnt]], SERVERPRO+SERVERIP+'/EMR_DATA/CommonAjax.jsp', null);	
	return tempXml;
}
