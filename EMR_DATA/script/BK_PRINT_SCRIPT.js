var gp_pH=550;var gp_pS=0;var gp_pE=gp_pH;var gp_pN=0;
var gp_pW=800;
var gp_pEl=new Array();
var gp_pES=new Array();
var gp_pEE=new Array();
var gp_pED=new Array();
var gp_nE=0;
var gp_pEA=new Array();
var gp_pTD=new Array();
var const_gp_pH3 = 885;
var gp_nE=0;
var totalH=0;
var totalPN=0;
var totalE=0;
var t_pEl=new Array();
var t_pES=new Array();
var t_pEE=new Array();
var getScroll=new Array();
var wonmutp=0;
var G_DOCSCRIPT="";
var G_DOCSCRIPT2="";
var G_RVIFV = "";
var doc_code = "";
document.write("<script src='../script/user_defined_func.js' type='text/javascript'></script>");


function fn_gdifv3(x1)
{
	doc_code = x1;
	G_RVIFV = x1.replace(/#/g, "\^");
}
function changediv(x1){
}
function findTextPosition(e, t, bs)
{
	var len=t.length;
	var df=len/2;
	var i=len;
	var pbs;
	bs += e.offsetTop;
	while(1)
	{
		e.innerText = t.substring(0, i);
		
		var h = e.offsetHeight;
		if(h>bs)
		{
			i -= parseInt(df);
		}
		else if(h<bs)
		{
			i += parseInt(df);
		}
		df /= 2;
		if(df < 2)
		{
			pbs = bs;
			break;
		}	
	}
	
	var step=8;
	while(i)
	{
		if(i>=step)
			i-=5;
		else
			i--;
		e.innerText = t.substring(0, i);
		var h = e.offsetHeight;
		if(h < (pbs-20))
		{
			if(step==1)
				break;
			i += step;
			step=1;
		}
	}
	return i;		
}
function resize_control(n, pn)
{

	var t = gp_pED[n];
	var e = gp_pEl[n];
	if(t==null)
		return;
	if(pn==(gp_pEE[n]-gp_pES[n]))
	{
		e.innerText=gp_pED[n].substring(gp_pTD[n][pn-1],gp_pED[n].length);
			
		return;
	}
	else if(pn==0)
	{
		e.innerText=t.substring(0,gp_pTD[n][pn]);
	
	}
	else
	{
		e.innerText=t.substring(gp_pTD[n][pn-1],gp_pTD[n][pn]);
	}
}
function getPageNo()
{
	return gp_pN+1;
}
function out_ele(col, depth, oL, oT)
{
	var const_gp_pH = 820;
	var chCol=col.children;
	if(chCol==null)
	{
		chCol=col.all;
		if(chCol==null)
			return;
	}
	var len = chCol.length;
	var i;

	var outObj = document.getElementById('output');	
	for(i=0;i<len;i++)
	{
		
		var t,l,b,r;
		var el=chCol[i];

		if(el.style.display =="none")
			 continue;		
		if(el.tagName == "SCRIPT")
			continue;
		t=el.offsetTop+oT;
		l=el.offsetLeft+oL;
		b=el.offsetHeight+t;
		r=el.offsetWidth+l;
		
		var tNE=gp_nE;
		gp_pEl[gp_nE]=el;
		gp_pES[gp_nE]=gp_pN;
		gp_nE++;
		if(t <=gp_pE && b>gp_pE) // In the Page border
		{
			var oL2=oL;
			var oT2=oT;
			if(el.tagName == "TABLE" || el.tagName == "TD" || el.tagName == "DIV")
			{
				oL2+= el.offsetLeft;
				oT2 += el.offsetTop;
			}
			if(el.tagName == "TABLE" || el.tagName == "TBODY" || el.tagName == "TR" || el.tagName == "TD" || el.tagName == "DIV")
			{
				if( el.children.length >0)
				{
					out_ele(el, depth+1, oL2,oT2);
				}
				else
				{
					gp_pN++;
					gp_pES[tNE]=gp_pN;
					gp_pE = t+const_gp_pH ;
				}
			}
			else
			{
				gp_pN++;
				gp_pES[tNE]=gp_pN;
				gp_pE = t+const_gp_pH; 
			}
		}
		gp_pEE[tNE]=gp_pN;
	}
}
function out_ele2(col, depth, oL, oT)
{
	var chCol=col.children;
	if(chCol==null)
	{
		chCol=col.all;
		if(chCol==null)
			return;
	}
	var len = chCol.length;
	var i;
	var t,l,b,r;
	var top1=0;
	var outObj = document.getElementById('output');	
	
	for(i=0;i<len;i++)
	{
		var el=chCol[i];
		
		if(el.style.display =="none")
			 continue;		
		if(el.tagName == "SCRIPT")
			continue;

			t=(el.offsetTop+oT);
			l=el.offsetLeft+oL;
			b=(el.offsetHeight+t);
			r=el.offsetWidth+l;

		var tNE=gp_nE;
		gp_pEl[gp_nE]=el;
		gp_pES[gp_nE]=gp_pN;
		gp_nE++;
		
		var oL2=oL;
		var oT2=oT;
		
		if(el.tagName=='IFRAME')
		{
					if( el.contentWindow.document.body.children.length >0 )
					{
						totalH += out_ele2(el.contentWindow.document.body, depth+1, oL2,oT2);
						if((totalH%gp_pH) <= gp_pH )
	 	 					gp_pE = gp_pH -(totalH%gp_pH);
					}
		} 
		else if( t <= gp_pE && gp_pE < b ) // In the Page border
		{
			if(el.tagName == "TABLE" || el.tagName == "TD" || el.tagName == "DIV" || el.tagName=='IFRAME'|| el.tagName == "BODY"|| el.tagName == "BR")
			{
				oL2+= el.offsetLeft;
				oT2 += el.offsetTop;
			}
			if(el.tagName == "TABLE" ||el.tagName == "TBODY" || el.tagName == "TR" || el.tagName == "TD" || el.tagName == "DIV"||el.tagName=='IFRAME'||el.tagName == "BODY")
			{
				if( el.children.length >0 )
				{
					out_ele2(el, depth+1, oL2,oT2);
				}
				else
				{
					gp_pN++;
					gp_pES[tNE]=gp_pN;
					gp_pE = t+gp_pH;
				}
			}
			else
			{
				gp_pN++;
			  gp_pES[tNE]=gp_pN;
				gp_pE = t+gp_pH;
			}
		}
		gp_pEE[tNE]=gp_pN;
	}
	return b;
}

function fn_procPrint2()
{	
	alert("fn_procPrint2");
	var x = proc_Page2();
	return x;
}

function fn_procPrint_com(x1)
{	
	//alert("fn_procPrint_com["+x1+"]");
	//changeTextareaTag();
	var x2=x1.split("^");
	if(x2.length < 3)
		return;
	
	
	gp_pH=parseInt(x2[0]);
	gp_pE = gp_pH;
	gp_pW=parseInt(x2[1]);
	if(x2.length >= 4 && x2[3]=='0' && typeof(G_PRNDATA) !="undefined")
	{
		var x11=G_PRNDATA.length;
		var x12=0;
		for(x12=0;x12<x11;x12++)
		{
			if(G_PRNDATA[x12][0]==0)
			{
				var x13=document.getElementById(G_PRNDATA[x12][1]);
				if(x13 != null)
					x13.style.display='none';
			}
		}
	}
	
	if(x2[2] != "")
		xmlhttpPost_Sync(SERVERPRO+x2[2], "", 1);
	/*
	var changeHtml = document.body.innerHTML;
	changeHtml = changeHtml.replace(/<SCRIPT\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/SCRIPT>/gi,"");
	changeHtml = changeHtml.replace(/<table\b[^<]*(?:(?!VAL_1425)<[^<]*)*VAL_1425/gi,"");
	changeHtml = changeHtml.replace(/\">02697327\b[^<]*(?:(?!VAL_1429)<[^<]*)*VAL_1429/gi,"");
	changeHtml = changeHtml.replace(/1432\b[^<]*(?:(?!VAL_1435)<[^<]*)*VAL_1435/gi,"");
	changeHtml = changeHtml.replace(/]<\/span\b[^<]*(?:(?!VAL_1441)<[^<]*)*VAL_1441/gi,"");
	changeHtml = changeHtml.replace(/[\b[^<]*(?:(?!VAL_1413)<[^<]*)*VAL_1413/gi,"");
	changeHtml = changeHtml.replace(/\"1605\b[^<]*(?:(?!VAL_884)<[^<]*)*VAL_884/gi,"");
	changeHtml = changeHtml.replace(/\r\n/g,"");
	changeHtml = changeHtml.replace(/\n/g,"");
	alert("changeHtml : "+changeHtml);
	*/
	if(x2.length >=5 && x2[4] !="")
	{
		var x12 = ParsingRule.length;
		var x11;
		for(x11=0;x11<x12;x11++)
		{
			if(ParsingRule[x11][5]=='161594') //병리번호 넣는 부분
			{
				var diagStr1 = x2[4].split('$');
				if(diagStr1[0] == null || diagStr1[0] == "undefined")
				{}
				else
				{
					SetValue(ParsingRule[x11][0], diagStr1[0],"");
				}
				fn_shc(x11);
			}

			if(ParsingRule[x11][5]=='161548') // 처방일자
			{
				var diagStr1 = x2[4].split('$');
				if(diagStr1[2] == null || diagStr1[2] == "undefined")
				{}
				else
				{
					SetValue(ParsingRule[x11][0], diagStr1[2],"");
				}
				fn_shc(x11);
			}

			if(ParsingRule[x11][5]=='161592') // 접수일자
			{
				var diagStr1 = x2[4].split('$');
				if(diagStr1[2] == null || diagStr1[2] == "undefined")
				{}
				else
				{
					SetValue(ParsingRule[x11][0], diagStr1[2],"");
				}
				fn_shc(x11);
				break;
			}
			
			var diagStr = x2[4].split('$');
			if(diagStr.length < 1)
				break;
			if(ParsingRule[x11][5]=='7000006')
			{
				SetValue(ParsingRule[x11][0], diagStr[0],"");
				fn_shc(x11);
				continue;
			}
			if(ParsingRule[x11][5] == '60594' || ParsingRule[x11][5] == '60596' || ParsingRule[x11][5] == '60612' || ParsingRule[x11][5] == '62381' || 
				ParsingRule[x11][5] == '60616' || ParsingRule[x11][5] == '62320' || ParsingRule[x11][5] == '60150' || ParsingRule[x11][5] == '7000012' || 
				ParsingRule[x11][5] == '7000013' || ParsingRule[x11][5] == '60640' || ParsingRule[x11][5] == '60642' || ParsingRule[x11][5] == '7000014' || 
				ParsingRule[x11][5] == '7000015' || ParsingRule[x11][5] == '7000016' || ParsingRule[x11][5] == '2636' || ParsingRule[x11][5] == '7000018' ||
				ParsingRule[x11][5] == '7000020' || ParsingRule[x11][5] == '7000022')
			{
				var retVal = P_ChangeDiagnosisRecd(x2[4], ParsingRule[x11][5]);
				SetValue(ParsingRule[x11][0], retVal, "");
				fn_shc(x11);
			}
		}
	}
	
	if( x2[3]=='0' )
	{
		
		if(x2.length >= 13)
		{
			var x11;
			if(x2[5]!='' && x2[6]!='')
			{
				x11=document.getElementById("SIGN_1_2");
				if(x11)
				{
			
					x11.style.width = 500;
					x11.innerText=x2[6]+" "+x2[5];
					fn_shc2(x11);
				}
			}
			
			if(x2[7]!='' && x2[8]!='')
			{
				x11=document.getElementById("SIGN_1_2");
				if(x11)
				{
			
					x11.innerText=x11.innerText +"        "+x2[8]+" "+x2[7] ;
					fn_shc2(x11);
				}
			}
			
			
			if(x2[9]!='' && x2[10]!='')
			{
				x11=document.getElementById("SIGN_1_1");
				if(x11)
				{
				
					x11.innerText=x2[9]+" "+x2[10]+"(전자 서명함)";
					fn_shc2(x11);
				}
			}
			
			if(x2[11]!='' && x2[12]!='')
			{
				x11=document.getElementById("SIGN_2_1");
				if(x11)
				{
			
					x11.innerText=x2[11]+" "+x2[12]+"(전자 서명함)";
					fn_shc2(x11);
				}
			}
		}
	}
}

function fn_ejs(x1)
{
	if(x1==null || x1=="")
		 return 1;
	x1=x1.replace(/@U1@/g, "\"");
	x1=x1.replace(/@U2@/g, "\'");
	x1=x1.replace(/@U3@/g, "\n");
	try{
		window.execScript(x1);
	}
	catch(e)
	{
		fn_outdebug(x1);
	}
}

function fn_outdebug(x13)
{
	if(G_VT02 !=0)
		return;
	if(g_bError >10)
		return;
	var x5=document.getElementById("bk_debug_area");
	if(x5 != null)
	{
		x5.style.display='block';
		if(g_bError>0)
			x5.innerText += "\r\n--------------\r\n[Error: ##"+g_bError+"]"+g_emsg1+":"+x13;
		else
			x5.innerText =  "[Error: ##"+g_bError+"]"+g_emsg1+":"+x13;
		g_bError++;
	}
	
}
function fn_sii(x1, x2)
{
	var x3 = document.getElementById(x1);
	if (x2)
		x3.style.display = "x3";
	else
		x3.style.display = "none";
}



function fn_procPrint3(x1)
{
	//alert("fn_procPrint3["+x1+"]");
	
	var x2=x1.split("^");
	if(x2.length < 3)
		return;
	
	var ret =fn_procPrint_com(x1);
	/*alert(x2.length +" / "+x2[3]);
	if(x2.length >= 4 && (x2[3]=='0' || x2[3]=='2' || x2[3]=='3' ))
	{
		proc_Page3();
		show_page3(0);
	}*/
	
	fn_ejs(G_DOCSCRIPT2);
	return gp_pN+1;
}

function show_page3(no)
{
 
	var i;
	for(i=0;i<gp_nE; i++)
	{
		if(gp_pES[i] <= no && gp_pEE[i] >= no)
		{
			gp_pEl[i].style.display="";
			if(gp_pES[i] != gp_pEE[i])
			{
				resize_control(i, no-gp_pES[i]);
			}
		}
		else
		{
			gp_pEl[i].style.display="none";
		}
	}
	
	var x1=document.getElementById('BKPAGENO');
	if(x1)
	{
		x1.innerText = (no+1)+"/"+(gp_pN+1);
	}
}
function proc_Page3()
{

	gp_pEA[0]=const_gp_pH3;
	out_ele3(document.body, 0, 0,0,0)
}
var changedivtextarea = false;
function proc_Page4()
{
	gp_pEA[0]=const_gp_pH3;
	out_ele4(document.body, 0, 0,0,0);
	document.body.innerHTML = document.body.innerHTML.replace(/none/gi,"block");		
  if(changedivtextarea == true){ //라벨 원무서식때문에                  
		document.body.innerHTML = document.body.innerHTML.replace(/TEXTAREA/gi,"div");
		document.body.innerHTML = document.body.innerHTML.replace(/DIV style="/gi,'DIV style="FONT-SIZE: 10pt; ');
		document.body.innerHTML = document.body.innerHTML.replace(/&lt;br&gt;/gi,"<br>");
		document.body.innerHTML = document.body.innerHTML.replace(/&amp;nbsp;/gi,"&nbsp;");
	}
}
var first=1;
function out_ele3(col, depth, oL, oT, pn)
{
	var chCol=col.children;
	if(chCol==null)
	{
		chCol=col.all;
		if(chCol==null)
			return;
	}
	var len = chCol.length;
	var i;
	for(i=0;i<len;i++)
	{
		var t,l,b,r;
		var el=chCol[i];
		if(el.style.display =="none")
			 continue;		
		if(el.tagName == "SCRIPT")
			continue;
		t=el.offsetTop+oT;
		l=el.offsetLeft+oL;
		b=el.offsetHeight+t;
		r=el.offsetWidth+l;
		var tNE=gp_nE;
		gp_pEl[tNE]=el;
		gp_nE++;
		var tp=pn;//숨길번호
		while(1)
		{
			if(tp > gp_pN)
			{
				gp_pN = tp;
				gp_pEA[tp] = gp_pEA[tp-1]+const_gp_pH3;
			}
			if(t <= gp_pEA[tp])
			{
			    wonmutp = tp;
				gp_pES[tNE]=tp;
				if(el.tagName == "IMG")
			   {
			   	gp_pES[tNE]=tp+1;
			   }
				break; 
			}
			tp++;
		}
		if(b<=gp_pEA[tp])
		{
			gp_pEE[tNE]=tp;
			continue;
		}
		{
			var oL2=oL;
			var oT2=oT;
			if(el.tagName != "IMG")
			{
				if(el.tagName != "TR" && el.tagName != "TBODY" )
				{
					oL2 += el.offsetLeft;
					oT2 += el.offsetTop;
				}
				if( el.children.length >0)
				{
					
					out_ele3(el, depth+1, oL2, oT2, tp);
				}
				else if(el.tagName != "TR" || el.tagName != "TBODY" )
				{
					if(el.innerText)
					{
						gp_pED[tNE]=el.innerText;
					  
						processInnerText(tNE, el, b, el.innerText,t);
					}
				}
				
				while(b >gp_pEA[tp])
				{
					tp++;
					if(tp > gp_pN)
					{
						gp_pN=tp;
						gp_pEA[tp] = gp_pEA[tp-1]+const_gp_pH3;
					}
				}
				gp_pEE[tNE]=tp;
			}
			else
			{
				do
				{
					tp++;
					if(tp > gp_pN)
					{
						gp_pN=tp;
						if(first)
						{
						
							gp_pEA[tp] = t+const_gp_pH3;
							first=0;
						}
						else
						{
							gp_pEA[tp] = gp_pEA[tp-1]+const_gp_pH3;
							first=0;
						}
					}
					first=0;
				}while(b >gp_pEA[tp]);
				gp_pEE[tNE]=tp;
			}		
		}
	}
}

function out_ele4(col, depth, oL, oT, pn)
{

	var chCol=col.children;
	if(chCol==null)
	{
		chCol=col.all;
		if(chCol==null)
			return;
	}
	var len = chCol.length;
	var i;

	for(i=0;i<len;i++)
	{
		
		var t,l,b,r;
		var el=chCol[i];

		if(el.style.display =="none")
			 continue;		
		if(el.tagName == "SCRIPT")
			continue;
		t=el.offsetTop+oT;
		l=el.offsetLeft+oL;
		b=el.offsetHeight+t;
		r=el.offsetWidth+l;
		
		var tNE=gp_nE;
		gp_pEl[tNE]=el;
		
		gp_nE++;
		
		var tp=pn;//숨길번호
		while(1)
		{
			if(tp > gp_pN)
			{
			
				gp_pN = tp;
				gp_pEA[tp] = gp_pEA[tp-1]+const_gp_pH3;
			}
			if(t <= gp_pEA[tp])
			{
			    wonmutp = tp;
				gp_pES[tNE]=tp;
				if(el.tagName == "IMG")
			   {
			   	gp_pES[tNE]=tp+1;
			   }
				break; 
			}
			tp++;
		}
		if(b<=gp_pEA[tp])
		{
			gp_pEE[tNE]=tp;
			continue;
		}
		
		{
			var oL2=oL;
			var oT2=oT;
			if(el.tagName != "IMG")
			{
				var tmpVal = el.innerText;
                    
				if(el.tagName != "TR" && el.tagName != "TBODY" )
				{
					oL2 += el.offsetLeft;
					oT2 += el.offsetTop;
				}
				if( el.children.length >0)
				{
					out_ele4(el, depth+1, oL2, oT2, tp);
				}
				else if(el.tagName != "TR" || el.tagName != "TBODY" )
				{
					 if(el.tagName == "TEXTAREA"){
					if(el.innerText)
					{	
								var tmpVal = el.innerText;
                if (el.style.display == "") {
                         tmpVal = tmpVal.replace(/\r\n/gi,"<br>");
                         tmpVal = tmpVal.replace(/\r\n/gi,"<br>");
                         changedivtextarea = true;
                         el.innerText = tmpVal;
                       if(el.parentNode.tagName == "SPAN"){
                      		el.parentNode.style.width = "";
                     	} 
      					} 
					}
				}
			}
			else{
				var tmpVal = el.innerText;
			}
				while(b >gp_pEA[tp])
				{
					tp++;
					if(tp > gp_pN)
					{
						gp_pN=tp;
						gp_pEA[tp] = gp_pEA[tp-1]+const_gp_pH3;
					}
				}
				gp_pEE[tNE]=tp;
			}
			else
			{
				var first=1;
				do
				{
					tp++;
					if(tp > gp_pN)
					{
						gp_pN=tp;
						if(first)
						{
							gp_pEA[tp] = t+const_gp_pH3;
						}
						else
						{
							gp_pEA[tp] = gp_pEA[tp-1]+const_gp_pH3;
						}
					}
					first=0;
				}while(b >gp_pEA[tp]);
				gp_pEE[tNE]=tp;
			}		
		}
	}
}



function processInnerText(nE, el, b, s,t)
{
	
	var start=gp_pES[nE];
	var count=0;
	var len=s.length;
	
	while(b > gp_pEA[start])
	{
		if(count==0)
		{
			gp_pTD[nE]=new Array();
			gp_pTD[nE][count]=findTextPosition(el, s, gp_pEA[start]-t);
		}
		else
		{
			gp_pTD[nE][count]= gp_pTD[nE][count-1]+findTextPosition(el, s.substring( gp_pTD[nE][count-1], len), gp_pEA[start]-gp_pEA[start-1]);
		}
		count++;
		start++;
		if(start > gp_pN)
		{
			gp_pN=start;
			if(count==0)
			{
				gp_pEA[start] = t+const_gp_pH3;
			}
			else
			{
				gp_pEA[start] = gp_pEA[start-1]+const_gp_pH3;
			}
		}
	}
	el.innerText = s;

}

function proc_Page2()
{
	out_ele2(document.body, 0, 0,0); 
}
function show_page2(no)
{
	var i;
	for(i=0;i<gp_nE; i++)
	{
		if(gp_pES[i] <= no && gp_pEE[i] >= no)
		{
 			gp_pEl[i].style.display="block";
		}
		else
		{
			gp_pEl[i].style.marginheight='0px';
			gp_pEl[i].style.display="none";
		}
	}
	
	for(var j=0;j<gp_nE;j++)
	{
		if(gp_pEl[j].tagName=='IFRAME')
		{
			if(gp_pEl[j].style.display=='block')
			{
				gp_pEl[j].height=gp_pEl[j].contentWindow.document.body.scrollHeight+25;
			}
		}
	}
}
function show_page(no)
{
	var i;
	for(i=0;i<gp_nE; i++)
	{
		if(gp_pES[i] <= no && gp_pEE[i] >= no)
		{
			gp_pEl[i].style.display="block";
		}
		else
		{
			gp_pEl[i].style.display="none";
		}
	}
	var x1=document.getElementById('BKPAGENO');
	if(x1)
	{
		x1.innerText = (no+1)+"/"+(gp_pN+1);
	}
}

function proc_Page()
{
	out_ele(document.body, 0, 0,0)
}


function fn_shc2(x1)
{
	while(x1 != null)
	{
		if(x1.style.display)
		{
			x1.style.display='block';
		}
		x1 = x1.parentElement;
	}
}

function fn_hideTitle()
{
	var x11=G_PRNDATA.length;
	var x12=0;
	for(x12=0;x12<x11;x12++)
	{
		if(G_PRNDATA[x12][0]==0)
		{
			var x13=document.getElementById(G_PRNDATA[x12][1]);
			if(x13 != null)
				x13.style.display='none';
		}
	}
}

function fn_procPrint(x1)
{
	var x2=x1.split("^");
	if(x2.length < 3)
		return;
	gp_pH=parseInt(x2[0]);
	gp_pE = gp_pH;
	gp_pW=parseInt(x2[1]);
	
	if(x2.length >= 4 && x2[3]=='0' && typeof(G_PRNDATA) !="undefined")
	{
		var x11=G_PRNDATA.length;
		var x12=0;
		for(x12=0;x12<x11;x12++)
		{
			if(G_PRNDATA[x12][0]==0)
			{
				var x13=document.getElementById(G_PRNDATA[x12][1]);
				if(x13 != null)
					x13.style.display='none';
			}
		}
	}

	if(x2[2] != "")
		xmlhttpPost_Sync(SERVERPRO+x2[2], "", 1);
	
	if(x2.length >=5 && x2[4] !="")
	{
		var x12 = ParsingRule.length;
		var x11;
		for(x11=0;x11<x12;x11++)
		{
			if(ParsingRule[x11][5]=='161594')
			{
				SetValue(ParsingRule[x11][0], x2[4],"");
				
				fn_shc(x11);
				break;
			}
			
			var diagStr = x2[4].split('$');
			if(diagStr.length < 1)
				break;
			if(ParsingRule[x11][5]=='7000006')
			{
				SetValue(ParsingRule[x11][0], diagStr[0],"");
				fn_shc(x11);
				continue;
			}
			if(ParsingRule[x11][5] == '60594' || ParsingRule[x11][5] == '60596' || ParsingRule[x11][5] == '60612' || ParsingRule[x11][5] == '62381' || 
				ParsingRule[x11][5] == '60616' || ParsingRule[x11][5] == '62320' || ParsingRule[x11][5] == '60150' || ParsingRule[x11][5] == '7000012' || 
				ParsingRule[x11][5] == '7000013' || ParsingRule[x11][5] == '60640' || ParsingRule[x11][5] == '60642' || ParsingRule[x11][5] == '7000014' || 
				ParsingRule[x11][5] == '7000015' || ParsingRule[x11][5] == '7000016' || ParsingRule[x11][5] == '2636' || ParsingRule[x11][5] == '7000018' ||
				ParsingRule[x11][5] == '7000020' || ParsingRule[x11][5] == '7000022')
			{
				var retVal = P_ChangeDiagnosisRecd(x2[4], ParsingRule[x11][5]);
				SetValue(ParsingRule[x11][0], retVal, "");
				fn_shc(x11);
			}
		}
	}
	
	
	
	if( x2[3]=='0' )
	{
		
		if(x2.length >= 13)
		{
			var x11;
			if(x2[5]!='' && x2[6]!='')
			{
				x11=document.getElementById("SIGN_1_2");
				if(x11)
				{
			
					x11.style.width = 500;
					x11.innerText=x2[6]+" "+x2[5]+"(전자 서명함)";
					fn_shc2(x11);
				}
			}
			
			if(x2[7]!='' && x2[8]!='')
			{
				x11=document.getElementById("SIGN_1_2");
				if(x11)
				{
				
					x11.innerText=x2[8]+" "+x2[7]+"(전자 서명함)" +"          "+x11.innerText ;
					fn_shc2(x11);
				}
			}
			
			
			if(x2[9]!='' && x2[10]!='')
			{
				x11=document.getElementById("SIGN_1_1");
				if(x11)
				{
				
					x11.innerText=x2[9]+" "+x2[10]+"(전자 서명함)";
					fn_shc2(x11);
				}
			}
			
			if(x2[11]!='' && x2[12]!='')
			{
				x11=document.getElementById("SIGN_2_1");
				if(x11)
				{
				
					x11.innerText=x2[11]+" "+x2[12]+"(전자 서명함)";
					fn_shc2(x11);
				}
			}
		}
	}
		
	if(x2.length >= 4 && (x2[3]=='0' || x2[3]=='2' || x2[3]=='3'))
	{
		proc_Page3();
		show_page(0);
	}
	return gp_pN+1;
}
function fn_setHeader(x1)
{
	if(document.getElementById('BkPrintHeader') ==null)
	{
		var fchild = document.body.children[0];
		fchild.insertAdjacentHTML("beforeBegin", x1);
	}
}

function P_ChangeDiagnosisRecd(diagStr, conceptId)
{
	if(diagStr == "" || diagStr == null)
		return "";
	if(conceptId == "" || conceptId == null)
		return "";
	
	var x3 = diagStr.split('$');
	if(x3.length < 1)
		return "";
	var conceptStr = "60594|iChosNo^60596|ipName^60612|ipSex^62381|ipIdNum^60616|ipAddress^62320|ipAddNo^60150|ipAge^7000012|ipCreNo^7000013|ipEmail";
	conceptStr += "60640|ipPhone1^60642|ipPhone2^7000014|ipParId^7000015|ipParName^7000016|ipCountry^2636|ipDobr^7000018|ipDotm^7000020|ipPoby^7000022|ipPoAddr";
	
	var x1 = conceptStr.split('^');
	var x2;
	var x4;
	for(x2=0; x2<x1.length; x2++)
	{
		x4 = x1[x2].split('|');
		if(conceptId == x4[0])
			break;
	}
	if(x2 == x1.length)
		return "";
	
	for(x5=0; x5<x3.length; x5++)
	{
		var retItem = x3[x5].split('|');
		if(x4[1] == retItem[0])
			break;
	}
	if(x5 == x3.length)
		return "";
		
	return retItem[1];
} 

var strParam="";
var bPrint="";
var printType="";
var titleStr="";
var chosType="";
var regNo="";
var ptName="";
var birthDate="";
var sex="";
var age="";
var printTime="";
var printDept="";
var printPerson="";
var ipStr="";
var printAim="";
var issueNumber="";
var signer="";
var signTime="";
var cosigner="";
var cosignTime="";
var signer2="";
var signTime2="";
var cosigner2="";
var cosignTime2="";
var ocrCode="";
var deptAndTreatDate="";
var treateDate="";
var docParam="";
var recordType="";
var tempStr="";
var pdfPrint=""
var pageHeight=1000;
var pageWidth=700;

//alert("Bk_PRINT_SCRIPT.js");
function fn_setPrintParam(p)
{  
		
		p=p.split('#$#');
		pageWidth=parseInt(p[0]);
		pageHeight=parseInt(p[1]);
		p=p[2].split('^');
		strParam=p[0];
		bPrint=p[1];
		printType=p[2];
		titleStr=p[3];
		chosType=p[4];
		regNo=p[5];
		ptName=p[6];
		birthDate=p[7];
		sex=p[8];
		age=p[9];
		printTime=p[10];
		printDept=p[11];
		printPerson=p[12];
		ipStr=p[13];
		printAim=p[14];
		issueNumber=p[15];
		signer=p[16];
		signTime=p[17];
		cosigner=p[18];
		cosignTime=p[19];
		signer2=p[20];
		signTime2=p[21];
		cosigner2=p[22];
		cosignTime2=p[23];
		ocrCode=p[24];
		deptAndTreatDate=p[25];
		treateDate=p[26];
		docParam=p[27];
		recordType=p[28];
		tempStr=p[29];
		pdfPrint=p[30];
		
		
		var tStr=pageHeight+"^"+pageWidth+"^"+strParam+"^"+printType+"^"+issueNumber
			+"^"+signer+"^"+signTime+"^"+cosigner+"^"+cosignTime+"^"+signer2
			+"^"+signTime2+"^"+cosigner2+"^"+cosignTime2;
		var ret=0;
		
		if(recordType=='90')
			ret=fn_procPrint(tStr);
		else
			ret=fn_procPrint3(tStr);
	         
		document.title=titleStr+"^"+chosType+"^"+regNo+"^"+ptName+"^"+birthDate
         +"^"+deptAndTreatDate+"^"+treateDate+"^"+printAim+"^"+printTime+"^"+ipStr
         +"^"+printDept+"^"+printPerson+"^"+sex+"^"+recordType+"^"+age+"^"+printType+"^"+ocrCode;
   
         var itsimg = document.getElementsByTagName('IMG');
   
   //그림 짤리는 거 때문에
   
		for(i = 0; i < itsimg.length ; i++)
		{
	       itsimg[i].height = itsimg[i].height;
	       if( itsimg[i].height  > 780)
		   {
		        	 itsimg[i].width = itsimg[i].width*(780/itsimg[i].height);
		        	 itsimg[i].height = 780;
		       
		   }
		   var parentitsimg = itsimg[i].parentNode.parentNode.parentNode;
		   itsimg[i].style.display = "inline-block";
		   itsimg[i].style.border="1px solid gray";
		   parentitsimg.style.display = "inline-block";
		   parentitsimg.style.border="0px solid white";
		   parentitsimg.parentNode.style.display = "inline-block";
		   parentitsimg.parentNode.style.border="0px solid white";
		   itsimg[i].parentNode.style.display = "inline-block";
		   itsimg[i].parentNode.style.border="0px solid white";
		   itsimg[i].parentNode.parentNode.style.display = "inline-block";
		   itsimg[i].parentNode.parentNode.style.border="0px solid white";
		   var temptag = itsimg[i].parentNode.parentNode;
		   var newtemptag = document.createElement('DIV');
		   newtemptag.style.border="0px solid white";
	     	newtemptag.appendChild(itsimg[i]);
		   parentitsimg.replaceChild(newtemptag,temptag);
		   
		}
         
		//alert("changeTextareaTag");
		changeTextareaTag();
		
	//	SetHeader_Str();
		return ret;
}

function changeTextareaTag() {
	var its = document.getElementsByTagName('TEXTAREA');
	if(!its || its.length < 1)
		return;
	try{
		var pNode = its[0].parentNode;
		var newIt = document.createElement('DIV');
		newIt.id = its[0].id;
		newIt.style.cssText = its[0].style.cssText;
		newIt.style.overflowX='hidden';
		//newIt.style.overflowX='visible';
		newIt.style.overflowY='visible';
		//newIt.style.wordWrap='break-word';
		
		//newIt.style.fontSize='10pt';
		//newIt.style.fontFamily='monospace';
		newIt.innerText = its[0].innerText;
		
		pNode.replaceChild(newIt, its[0]);
		
		var pNode2 = pNode; 
		while(pNode2 && pNode2.tagName=="SPAN") {
			pNode2.style.width="";
			pNode2 = pNode2.parentNode;
		}
		
	} catch(e) {
		alert("Error : " + e.message);
		return;
	}
	changeTextareaTag();
}

function ShowEle(obj)
{
	while(obj != null)
	{
		obj.style.display='block';
		obj = obj.parentElement;
	}
}

var ChosType_Str=["입원","외래","응급"];
function SetHeader_Str()
{
	if(typeof(G_PRNDATA) !="undefined")
		ShowEle(document.getElementById(G_PRNDATA[0][1]));
	var tStr="";
	if(1)
	{
		tStr += "<div id='BkPrintHeader'><table width='710px' height='0px' style='border:0px none black;'><tr height='48px' align=center>";
		tStr +="<td style='font:18pt 굴림;' align='center' valign='middle'  style='border:0px none black;'><img src='/EMR_DATA/img/logo.gif' width='48px'></td><td align='left'  style='border:0px none black;'>"
		+"&nbsp;&nbsp;<b>EHWA UNIVERSITY MOKDONG HOSPITAL</b></td></tr>" 
		tStr +="<tr><td style='height:5px' colspan='2' align='center'  style='border:0px none black;'><HR></td></tr>" 
		tStr += "</table></div>";
		if(pageWidth>pageHeight)
		{
			tStr +="<div id='BkPrintFooter' style='position:absolute;top:670;left:0;'>";
			const_gp_pH3=650;
		}
		else
		{
			tStr +="<div id='BkPrintFooter' style='position:absolute;top:1000;left:0;'>";
		}
		tStr +="<table width='710px' height='60px' cellpadding='0px' style='font:9pt 굴림;border:0px solid #8CBDED;'  style='border:0px none black;'>";
		tStr +="<TR><TD colspan=2  style='border:0px none black;'><HR></TD></TR>";
		tStr +="<TR><TD colspan=2  style='border:0px none black;'>출력된 사본은 의무기록 원본과 틀림없음을 증명합니다.</TD></TR>"
					+"<TR><TD  style='border:0px none black;'>출력자 : "+printPerson+" &nbsp&nbsp&nbsp 부서 : "+printDept+"</td><td id='BKPAGENO'  width='40' align='right'  style='border:0px none black;'></td></tr>";
		tStr +="</table></div>";
	}
	else	if(recordType=='90')
	{
		tStr += "<div id='BkPrintHeader'><table width='710px' height='0px'  style='border:0px none black;'><tr height='48px' align=center  style='border:0px none black;'>";
		tStr +="<td style='font:20pt 굴림;border:0px none black;' >"+titleStr+"</td></tr>" 
		tStr +="<tr width=100%% style='font:9pt 굴림;' ><td width='900px'  style='border:0px none black;'>["+ChosType_Str[chosType]+"] 등록번호:"+regNo+" &nbsp&nbsp ";
		tStr += "환자명:"+ptName+"("+sex+"/"+age+") &nbsp&nbsp";
		tStr +="생년월일:"+birthDate+" &nbsp&nbsp 진료과:"+deptAndTreatDate+" &nbsp&nbsp 진료일:"+treateDate+"</td></tr>";
		tstr += "<tr><td  style='border:0px none black;'><hr></td></table> </div>";
	
		tStr +="<div id='BkPrintFooter' style='position:absolute;top:850;left:0;'>";
		tStr +="<table width='700px' height='60px' cellpadding='0px' style='font:9pt 굴림;border:0px solid #8CBDED;'>";
		tStr +="<TR><TD colspan=3  style='border:0px none black;'><HR></TD></TR>";
		tStr +="<tr style='margin:0px;padding:0px;'><td rowspan=2 width='120px' valign='top' align='center'><img src='/EMR_DATA/img/logo.gif' border='0px' style='width:100px;height:35px;'/></td>";
		tStr +="<td colspan align=left width='80px'   style='border:0px none black;'>"+((printAim=="")?(""):("용도 : "+printAim))
					+"<b>출력</b>: "+printTime+" &nbsp&nbsp&nbsp "+ipStr+" "+printDept+" "+printPerson+"</td><td id='BKPAGENO'  width='40'></td></tr>";
		tStr +="<tr><th colspan=2 valign=top align=left style='font:9pt 굴림;'  style='border:0px none black;'>"
					+(printAim==""?"":" 첨부한 사본은 의무기록의 원본과 틀림없음을 증명합니다.")+" </th></tr> </table></div>";
	}
	else
	{
		tStr += "<div id='BkPrintHeader'><table width='710px' >";
		tStr +="<tr align=center><td style='font:20pt 굴림;' >"+titleStr+"</td></tr>";
		tStr +="<tr style='font:9pt 굴림;' ><td width=900>["+ChosType_Str[chosType]+"] 등록번호:"+regNo+" &nbsp&nbsp 환자명:"+ptName+"("+sex+"/"+age+") &nbsp&nbsp";
		tStr +="생년월일:"+birthDate+" &nbsp&nbsp 진료과:"+deptAndTreatDate+" &nbsp&nbsp 진료일:"+treateDate+"</td></tr><tr><td><hr></td></tr></table></div>";

		tStr +="<div id='BkPrintFooter' style='position:absolute;top:850;left:0;z-index:1'>";
		tStr +="<table width='700px' height='60px' cellpadding='0' style='font:9pt 굴림;border:0px solid #8CBDED;'>";
		tStr +="<TR><TD colspan=3><hr></TD></TR>";
		tStr +="<tr style='margin:0;padding:0;'>";
		tStr +="<td rowspan=2 width='120px' valign='top' align='center'><img src='/EMR_DATA/img/logo.gif' border='0' style='width:100;'/></td>";
		tStr +="<td align='left' >"+((printAim=="")?(""):("용도 : "+printAim))+"<b>출력</b> : "+printTime+" &nbsp&nbsp&nbsp "
					+ipStr+"&nbsp&nbsp&nbsp "+printDept+" "+printPerson+"</td><td id='BKPAGENO' width='40px'></td></tr>";
		tStr +="<tr><td colspan=2 valign=top align=left style='font:9pt 굴림;'>"+(printAim==""?"":" 첨부한 사본은 의무기록의 원본과 틀림없음을 증명합니다.")+" </td></tr>";
		tStr +="</table></div>";
	}
	fn_setHeader(tStr);
}

function fn_printData(param)
{
	var pArr = param.split('^');
	//(pid,createDate,doctorId,useCd,recCode)
	var printDataCheck = selectPrintCheck(pArr[5],pArr[14],pArr[11],pArr[17],pArr[12]);
	
	if(printDataCheck=="0")
	{
		//(pid,gubun,doctorId,recCode,chosNo,cDate,prtYn,prtNum,commentCode,commentValue,pName,docCode,dept,hSeq,pageCnt)
		insertBermprint(pArr[5],'1',pArr[11],pArr[12],pArr[13],pArr[14],'N',pArr[16],pArr[17],pArr[18],pArr[19],pArr[20],pArr[21],pArr[22],pArr[28]);
	}
	else
	{
		//(pid,createDate,doctorId,prtNum,commentCode,commentValue,recCode,recSeq,pageCnt)
		updateBermprint(pArr[5],pArr[14],pArr[11],pArr[16],pArr[17],pArr[18],pArr[12],pArr[22],pArr[28]);
	}
}
/*
emr.hyumc.com:8081/EMR_DATA/xml/2018/2_1/1950_1500069_00056589_1517451126276.XML,
1,
9,
,
1,
00056589,
,
,
,
,
,
1500069,
366,
00056589CM20170530,
20180201,
N,
4,
1,
타병원진료용,
김*순,
1950,
CM,
681,
,
,
,
,
0,
1

*/