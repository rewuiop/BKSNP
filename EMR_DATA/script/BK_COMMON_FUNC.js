var SERVERIP=document.location.host;var SERVERPRO=document.location.protocol+"//";var G_VT01=0;var G_VT02=1; 
var ParsingRule = new Array();var InstItem = new Array();var ConnectedItem = new Array();var ConnectedItem_GRID = new Array();var CollapableItem = new Array();var GridItem = new Array();var PaintItem = new Array();var AUTOCALC_SCRIPT = new Array();var AUTOCALC_SCRIPT_GRID = new Array();var AUTOCALC_CON=new Array();var THD_NUM = new Array();var THD_TXT= new Array();var GD_Info = new Array();var G_V_Info = new Array();var G_FV_Info = new Array();var BIR_INFO = new Array();var G_teethflag = new Array();var pathInfo="";var AppletInfo = new Array();
var g_timeExpiration=1000;var bLoadingMap=0;var G_OutXml4Attr=null;var G_OutXml4Attr_Grid=null;var G_DOCSCRIPT="";var G_DOCSCRIPT2="";var C_D_Info = new Array();var C_V_Info = new Array();var G_RVIFV = "";var G_ORGXML="";var G_ORGHTML="";var DsMapInfo = new Array();var DsIfInfo = new Array();var RVInfo = new Array();var REPGRP = new Array();var bMapContinue=0;
var GDsMapInfo=new Array();var GDsIfInfo=new Array();
var A_RCT=[['<', 20],['>', 21],['\'', 23],['\"', 24]];
var A_RCT1=[['<', "&lt;"],['>', "&gt;"],['\"', "&quot;"],['\'', "&apos;"],['&', "&amp;"]];
var Cate1, Cate2, Cate3, Department;var SeqNo="0";var recordType="0";var paramType, chos_no;
function fn_change_teeth(idstr, loc,fs,fc,se,ee){var i;var x1;var bf=0;for(x1=0;x1<G_teethflag.length;x1++){if(G_teethflag[x1][0]==idstr)break;}if(x1>G_teethflag.length)return;var flags=G_teethflag[x1][1].split(',');for(i=fs;i<fs+fc;i++){if(flags[i]=='1'){bf=1;}}if(bf==0){for(i=0;i<11;i++)flags[i]='0';for(i=0;i<28;i++){var con = document.getElementById(idstr+"_u_" + i);if(con)con.checked=null;}}if(flags[loc]=='0'){flags[loc]='1';for(i=se;i<se+ee;i++){var con = document.getElementById(idstr+"_u_" + i);if(con)con.checked='checked';}}else{flags[loc]='0';for(i=se;i<se+ee;i++){var con = document.getElementById(idstr+"_u_" + i);if(con)con.checked=null;}}G_teethflag[x1][1] ="";for(i=0;i<10;i++)G_teethflag[x1][1] += flags[i]+',';G_teethflag[x1][1] += flags[10]+',';}
function fn_ejs(x1){if(x1==null || x1=="") return 1;x1=x1.replace(/@U1@/g, "\"");x1=x1.replace(/@U2@/g, "\'");x1=x1.replace(/@U3@/g, "\n");
	/*var temp_AUTOCALC =  x1.split('+');
	if(temp_AUTOCALC.length>1){
    for(var z=0; z<temp_AUTOCALC.length; z++){
    	if(z==0){temp_AUTOCALC[z]=temp_AUTOCALC[z].split("=")[1];}
    	if(eval(temp_AUTOCALC[z]) == "" ){
					x1 = x1.replace(temp_AUTOCALC[z]+"+","");
			}
    }}*/
    try{window.eval(x1);}catch(e){window.execScript(x1);fn_outdebug(x1);}}
var g_emsg1=0;var g_emsg2=0;var g_bError=0;
function fn_outdebug_info(x1){if(g_bError >10)return;g_emsg1=x1;}
function fn_outdebug(x13){if(G_VT02 !=0)return;if(g_bError >10)return;var x5=document.getElementById("bk_debug_area");if(x5 != null){x5.style.display='block';if(g_bError>0)x5.innerText += "\r\n--------------\r\n[Error: ##"+g_bError+"]"+g_emsg1+":"+x13;else x5.innerText =  "[Error: ##"+g_bError+"]"+g_emsg1+":"+x13;g_bError++;}}
function fn_rpls4x(x1){if(x1 == null || x1 =="")return "";x1 = x1.replace(/<br>/g, "");x1 = x1.replace(/&nbsp;/g, "");var x2=x1.length;var x3=A_RCT1.length;var x4,i;var r="";for(i=0;i<x2;i++){x5= x1.charAt(i);for(x4=0;x4<x3;x4++){if(x5==A_RCT1[x4][0]){r += A_RCT1[x4][1];break;}}if(x4 >=x3)r += x5;}return r;}
function fn_rpls4h(x1){var temp = x1;for(x2=0; x2<A_RCT1.length; x2++)temp.replace('/'+A_RCT1[x2][1]+'/g', A_RCT1[x2][0]);return temp;}
function fn_inc(fn){var body = document.getElementsByTagName('body').item(0);script = document.createElement('script');script.src = fn;script.type = 'text/javascript';body.appendChild(script);}
function fn_svf(x1, x2){var f1, s;f1 = new ActiveXObject("Scripting.FileSystemObject");s = f1.CreateTextFile(x1);s.writeline(x2);s.Close();}
function fn_llf(x1){var f1, s,ds;f1 = new ActiveXObject("Scripting.FileSystemObject");s = f1.OpenTextFile(x1);ds = s.ReadAll();s.Close();return ds;}
function fn_fprbc(x1){var c = ParsingRule.length;var i;for(i=0; i<c; i++){if(ParsingRule[i][9] == x1)return i;}return -1;}
function fn_fprbvi(x1){var c = ParsingRule.length;var i;for(i=0; i<c; i++){if(ParsingRule[i][0] == x1)return i;}return -1;}
function fn_getGridRowIndexForOutput(x1, x2){var x3=x1.length;var x4;var x5=0;var x200=0;for(x4=0;x4<x3;x4++){var x6=x1[x4].getAttribute("controlId");if(x6==null)continue;var x16=fn_fprbc(x6);if(x16 <0)continue;x6=ParsingRule[x16][0];var x11=x1[x4].getAttribute("con_id");var x12= fn_gxtd(x1[x4]);var x7=G_V_Info.length;var x8;for(x8=0;x8<x7;x8++){if(G_V_Info[x8][0]==x6 &&G_V_Info[x8][1]==GD_Info[x2][0]){if(G_V_Info[x8][2]==0){var x9;var x20=0;var x10=G_FV_Info.length;for(x9=0;x9<x10;x9++){if(G_FV_Info[x9][0]==G_V_Info[x8][0]){if((x12==G_FV_Info[x9][1])||(x11 != "" && (x11==G_FV_Info[x9][3]))){x5=1;x200 += G_V_Info[x8][6]*x20;break;}x20++;}}}break;}}}if(x5==0)return -1;else return x200;}
function fn_getGridColumnIndexForOutput(x1, x2){var x3=x1.length;var x4;var x5=0;var x200=0;for(x4=0;x4<x3;x4++){var x6=x1[x4].getAttribute("controlId");if(x6==null)continue;var x16=fn_fprbc(x6);if(x16 <0)continue;x6=ParsingRule[x16][0];var x11=x1[x4].getAttribute("con_id");var x12= fn_gxtd(x1[x4]);var x7=G_V_Info.length;var x8;for(x8=0;x8<x7;x8++){if(G_V_Info[x8][0]==x6 &&G_V_Info[x8][1]==GD_Info[x2][0]){if(G_V_Info[x8][2]==1){var x9;var x20=0;var x10=G_FV_Info.length;for(x9=0;x9<x10;x9++){if(G_FV_Info[x9][0]==G_V_Info[x8][0]){if((x12==G_FV_Info[x9][1])||(x11 != "" && (x11==G_FV_Info[x9][3]))){x5=1;x200 += G_V_Info[x8][6]*x20;break;}x20++;}}}break;}}}if(x5==0)return -1;else return x200;}
function fn_cav(){var c1 = ParsingRule.length; var c2;for(i=0; i< c1; i++){if(ParsingRule[i][2] ==5){switch(ParsingRule[i][3]){case 0:case 1:case 2:case 3:case 4:case 9:c2 = document.getElementById("INPUT_"+ParsingRule[i][0]);if(c2 != null)c2.value = "";break;case 8:c2 = document.getElementById("INPUTU1_"+ParsingRule[i][0]);if(c2 != null)c2.value = "";break;case 10:c2 = document.getElementById("CHECK_"+ParsingRule[i][0]+"_0");if(c2 != null)c2.value = "";break;}}else if(ParsingRule[i][2] ==8){switch(ParsingRule[i][3]){case 5: case 8:c2 = document.getElementById(ParsingRule[i][0]);if(c2 != null){c2.selected = "";}break;case 6: case 7:c2 = document.getElementById(ParsingRule[i][0]);if(c2 != null)c2.checked = "";break;}}}}
function fn_rhcs(x3){var x2="";var x1 = x3.length;for(k=0; k<x1; k++){for(i=0; i<A_RCT.length; i++){if(x3.charCodeAt(k) == A_RCT[i][1]){x2 += A_RCT[i][0];break;}}if(i == A_RCT.length){x2 += x3.substring(k,k+1);}}return x2;}function fn_gfov(x1, x3, xp1){var i;var x2 = G_FV_Info.length;for(i=0; i<x2; i++){if(G_FV_Info[i][0] == x1){if(x3 ==0){return "<GRID_ATTRIBUTE con_id='"+ParsingRule[xp1][5]+"'"+ " con_term='"+fn_rpls4x(ParsingRule[xp1][6])+"'"+ " path='"+fn_rpls4x(ParsingRule[xp1][1])+"'"+ " controlId='"+ParsingRule[xp1][9]+"'>"+ "<VALUE con_id='"+G_FV_Info[i][2]+"' con_term='"+fn_rpls4x(G_FV_Info[i][3])+"'>"+fn_rpls4x(G_FV_Info[i][1])+"</VALUE>"+ "</GRID_ATTRIBUTE>";}x3--;}}return "";}
function fn_gx4ga(x1, x2, x3){var x4;var x5 = G_V_Info.length;var i;for(i=0; i < x5; i++){if(G_V_Info[i][0] == ParsingRule[x1][0])break;}if( i >= x5)return "";switch(G_V_Info[i][2]){case 0:x2 = parseInt(x2/G_V_Info[i][6]);x2 %= G_V_Info[i][7];return fn_gfov(G_V_Info[i][0], x2,x1);break;case 1:x3 = parseInt(x3/G_V_Info[i][6]);x3 %= G_V_Info[i][7];return fn_gfov(G_V_Info[i][0], x3, x1);break;case 2:return "";case 3:return "";case 4:return fn_gsx4a(x1, ParsingRule[x1][0], "_"+x2+"_"+x3);break;}return x4;}
function fn_ttrd( x1 ) {var x2 = x1.parentElement;x2 = x2.parentElement;var x4 = x2.children;for (i=1; i<x4.length; i++) {var x5 = x4.item(i);if (x5.style.display == "none")x5.style.display = "x5";else x5.style.display = "none";}}
function fn_ttbd_g(){var i;for(i=0; i<ConnectedItem_GRID.length; i++){var n,rowCount;for(n=0; n<GD_Info.length; n++){if(GD_Info[n][0] == ConnectedItem_GRID[i][2]){rowCount = GD_Info[n][1];break;}}for(grid_idx=0; grid_idx < rowCount; grid_idx++){if(ConnectedItem_GRID[i][1]=="")continue;resultData=0;fn_ejs("resultData="+ConnectedItem_GRID[i][1]);var x3 = document.getElementById(ConnectedItem_GRID[i][0]+"_"+grid_idx+"_0");if(x3==null)continue;if(resultData ==0){x3.style.display = "none";}else{x3.style.display = "block";}}}}
function fn_ttbd(){var i;for(i=0; i<ConnectedItem.length; i++){if(ConnectedItem[i][1]=="")continue;resultData=0;fn_outdebug_info(ConnectedItem[i][2]+"("+ConnectedItem[i][0]+")\r\nVisble Condition Operation : Start ");fn_ejs("resultData="+ConnectedItem[i][1]);var x3 = document.getElementById(ConnectedItem[i][0]);if(x3==null)continue;if(resultData ==0){x3.style.display = "none";}else{x3.style.display = "block";}}}
function fn_2h(x){var x1="0123456789ABCDEF";var r="";var i;var x3;var x2;for(i=0;i<x.length;i++){x2 = "";x3= x.charCodeAt(i);x2 += x1.charAt(x3&0x0F);x3 >>= 4;x2 += x1.charAt(x3&0x0F);x3 >>= 4;x2 += x1.charAt(x3&0x0F);x3 >>= 4;x2 += x1.charAt(x3&0x0F);x3 >>= 4;r += x2.split('').reverse().join('');}return r;}
function fn_sii(x1, x2){var x3 = document.getElementById(x1);if (x2)x3.style.display = "x3";else x3.style.display = "none";}
function fn_iiiv(obj_id){var block = document.getElementById(obj_id);if(block.style.display == "none")return false;else return true;}
function fn_exa(x3){var i;for(i=0; i < CollapableItem.length; i++){var x1 = document.getElementById(CollapableItem[i]);x1 = x1.children.item(0);var x2 = x1.children;for (j=1; j<x2.length; j++) {var block = x2.item(j);if (x3)block.style.display = "block";else block.style.display = "none";}}}
function GetGridValue(idStr){var i;var tdEle = document.getElementById(idStr);if(tdEle == null)return 0;var childCol = tdEle.children;if(childCol.length==0){return tdEle.innerText;}for (i=0; i<childCol.length; i++) {var block = childCol.item(i);if (block.tagName == "INPUT")return block.value;else if (block.tagName == "SELECT"){return block.value;}}return 0;}
function SetGridValue(idStr, val){var i;var tdEle = document.getElementById(idStr);if(tdEle == null)return;var childCol = tdEle.children;if(childCol.length==0){tdEle.innerText = val;return;}for (i=0; i<childCol.length; i++) {var block = childCol.item(i);if (block.tagName == "INPUT"){block.value = val;}else if (block.tagName == "SELECT"){block.value = val;}}}
function CalcGridValue(idStr, preVal, calcType){var val = parseFloat(GetGridValue(idStr));if(calcType ==0){if(val > preVal)preVal = val;}else if(calcType ==1){if(val < preVal)preVal = val;}else if(calcType ==2 || calcType ==3){preVal += val;}else if(calcType==4){preVal++;}else if(calcType==5){preVal = val;}return preVal;}
function fn_ttbd_g(){var i;for(i=0; i<ConnectedItem_GRID.length; i++){var n,rowCount;for(n=0; n<GD_Info.length; n++){if(GD_Info[n][0] == ConnectedItem_GRID[i][2]){rowCount = GD_Info[n][1];break;}}for(grid_idx=0; grid_idx < rowCount; grid_idx++){if(ConnectedItem_GRID[i][1]=="")continue;resultData=0;for(grid_col_idx=0; grid_col_idx < GD_Info[n][4]; grid_col_idx++){fn_ejs("resultData="+ConnectedItem_GRID[i][1]);var x3 = document.getElementById(ConnectedItem_GRID[i][0]+"_"+grid_idx+"_"+grid_col_idx);if(x3==null)continue;if(resultData ==0){x3.style.display = "none";}else{x3.style.display = "block";}}}}}
function fn_ttbd(){var i;for(i=0; i<ConnectedItem.length; i++){if(ConnectedItem[i][1]=="")continue;resultData=0;fn_outdebug_info(ConnectedItem[i][2]+"("+ConnectedItem[i][0]+")\r\nVisble Condition Operation : Start ");fn_ejs("resultData="+ConnectedItem[i][1]);var x3 = document.getElementById(ConnectedItem[i][0]);if(x3==null)continue;if(resultData ==0){x3.style.display = "none";}else{x3.style.display = "block";}}}
function GetGridBottomValue(idStr, colNum, calcType, rowCount){var i;var realIdStr;var result =0;var x40;for(i=0; i<rowCount; i++){switch(calcType){case 0:x40 = GetValue(idStr, "_"+i+"_"+colNum);if(x40 > result)result = x40;break;case 1:x40 = GetValue(idStr, "_"+i+"_"+colNum);if(x40 < result)result = x40;break;case 2:case 3:result += GetValue(idStr, "_"+i+"_"+colNum);break;case 4:result++;break;case 5:result = GetValue(idStr, "_"+i+"_"+colNum);break;}}if(calcType==3)result /= rowCount;return result;}
function GetIntValue(idStr, aStr){return parseInt(GetValue(idStr, aStr));}
function GET_COND(valDataTrue, valDataFalse,  condition){if(condition)return valDataTrue;else return valDataFalse;}
function AutoCalculation(idStr){var i, n, gridId;if(G_VT01 >= 2)return;for(i=0; i<AUTOCALC_SCRIPT.length; i++){if(AUTOCALC_SCRIPT[i][0] == idStr){fn_ejs("resultData="+AUTOCALC_SCRIPT[i][1]);if(AUTOCALC_SCRIPT[i][2] ==0 || AUTOCALC_SCRIPT[i][3] != resultData){AUTOCALC_SCRIPT[i][3] = resultData;SetValue(AUTOCALC_SCRIPT[i][0], result, "");}break;}}}
var grid_idx;var grid_rowCount;var grid_col_idx;var grid_idStr;
function AutoCalc4Out(){return;var i, j;if(G_VT01 < 2)return;var x0=G_OutXml4Attr;var x1=x0.length;var x2;for(i=0; i<AUTOCALC_SCRIPT.length; i++){for(x2=0; x2<x1;x2++){if(AUTOCALC_SCRIPT[i][0]==x0[x2].getAttribute("controlId"))break;}if(x2<x1)continue;if(AUTOCALC_SCRIPT[i][1]=="")continue;fn_ejs("resultData="+AUTOCALC_SCRIPT[i][1]);if(AUTOCALC_SCRIPT[i][2] ==0 || AUTOCALC_SCRIPT[i][3] != resultData){var pn=fn_fprbvi(AUTOCALC_SCRIPT[i][0]);SetValue(ParsingRule[pn][0], resultData, "");if(resultData != "" && resultData != 0){if(pn >=0)fn_shc(pn)}}}for(i=0; i<AUTOCALC_SCRIPT_GRID.length; i++){for(x2=0; x2<x1;x2++){if(AUTOCALC_SCRIPT_GRID[i][0]==x0[x2].getAttribute("controlId"))break;}if(x2<x1)continue;var idStr = AUTOCALC_SCRIPT_GRID[i][0];var gridId=0;var rowCount=0;var columnCount=0;var valueType=0;for(n=0; n< G_V_Info.length; n++){if(G_V_Info[n][0] == idStr){gridId = G_V_Info[n][1];valueType = G_V_Info[n][2];columnCount = G_V_Info[n][3];break;}}for(n=0; n<GD_Info.length; n++){if(GD_Info[n][0] == gridId){rowCount = GD_Info[n][1];break;}}grid_rowCount = rowCount;if(valueType == 2)/* Static Rotate */{for(n=0; n< G_V_Info.length; n++){if(G_V_Info[n][1] != gridId || G_V_Info[n][2] != 4)continue;grid_idStr = G_V_Info[n][0];for(grid_col_idx=0; grid_col_idx < columnCount; grid_col_idx++){if(AUTOCALC_SCRIPT_GRID[i][1]=="")continue;fn_ejs("resultData="+AUTOCALC_SCRIPT_GRID[i][1]);SetValue(idStr, resultData, "_"+grid_idStr+"_"+grid_col_idx); }}}else{for(grid_idx=0; grid_idx < rowCount; grid_idx++){if(AUTOCALC_SCRIPT_GRID[i][1]=="")continue;fn_ejs("resultData="+AUTOCALC_SCRIPT_GRID[i][1]);SetValue(idStr, resultData, "_"+grid_idx+"_0");}}}}
function Check_AutoCalcFunction(idStr){var i, j;for(i=0; i<AUTOCALC_CON.length; i++){if(AUTOCALC_CON[i][0] == idStr){AutoCalculation(AUTOCALC_CON[i][1]);}}}
function ProcessChangeEvent(idStr){ var ele = document.getElementById(idStr);  var TableEle = Ele; while(tableEle) { if(tableEle.tagName == "TABLE") { Check_AutoCalcFunction(tableEle.id); break; } tableEle = tableEle.parentElement; }}

function ReplaceInsStr(inStr, newIdStr){
	inStr = fn_rpls4h(inStr);
	var outStr="";
	var len = inStr.length;
	var i;
	for(i=0; i<len; i++){
		if( inStr.charCodeAt(i) == 20){
			outStr += '\'';
		}
		else if( inStr.charCodeAt(i) == 21){
			outStr += '\\\\';
		}
		else{
			outStr += inStr.substring(i, i+1);
		}
	}
	return outStr.replace(/#FOR#_#NEW#_#COUNT#/g, newIdStr);
}

function CopyGridValue(x10,x11,x12,x13)
{var x5 = fn_fprbvi(x10);
if(x5 <0) return;
var x6=ParsingRule.length;
var x7=ParsingRule[x5][4]+1;
var x8;
switch(ParsingRule[x5][3]){
	case 0: case 3:
		document.getElementById("INPUT_"+x10+"_"+x11+"_"+x13).innerText = document.getElementById("INPUT_"+x10+"_"+x12+"_"+x13).innerText;
		break;
	case 1: case 2: case 4: case 9:
		document.getElementById("INPUT_"+x10+"_"+x11+"_"+x13).value = document.getElementById("INPUT_"+x10+"_"+x12+"_"+x13).value;
		break;
	case 5:
		{var i=x5+1;  while(i < x6)  {  if(x7 > ParsingRule[i][4])  break;  if( x7 != ParsingRule[i][4])  {  i++;  continue;  }  x8 = document.getElementById(ParsingRule[i][0]+"_"+x11+"_"+x13); 
		if(x8)  {  x8.selected = document.getElementById(ParsingRule[i][0]+"_"+x12+"_"+x13).selected;  }  i++;  }}break;
	case 6: case 7:{var i=x5+1;  while(i < x6)  {  if(x7 > ParsingRule[i][4])  break;  if( x7 != ParsingRule[i][4])  {  i++;  continue;  }  x8 = document.getElementById(ParsingRule[i][0]+"_"+x11+"_"+x13);  if(x8)  {  x8.checked = document.getElementById(ParsingRule[i][0]+"_"+x12+"_"+x13).checked;  }  i++;  }}break;case 8:document.getElementById("INPUTU1_"+x10+"_"+x11+"_"+x13).value= document.getElementById("INPUTU1_"+x10+"_"+x12+"_"+x13).value;{var i=x5+1;  while(i < x6)  {  if(x7 > ParsingRule[i][4])  break;  if( x7 != ParsingRule[i][4])  {  i++;  continue;  }  x8 = document.getElementById(ParsingRule[i][0]+"_"+x11+"_"+x13);  if(x8)  {  x8.selected = document.getElementById(ParsingRule[i][0]+"_"+x12+"_"+x13).selected;  }  i++;  }}break;case 10:document.getElementById("CHECK_"+x10+"_"+x11+"_"+x13+"_0").checked = document.getElementById("CHECK_"+x10+"_"+x12+"_"+x13+"_0").checked; break;}}
function MoveUpDownGridData(idStr, start, dir){
	var i;
	for(i=0; i<GD_Info.length;i++){
		if(GD_Info[i][0] == idStr)
			break;
	}
	if(i==GD_Info.length)
		return;
	if(GD_Info[i][1]<=start)
		return;
	var x1;
	var x2 = G_V_Info.length;
	var x3,x4;
	for(x1=0;x1<x2;x1++){
		if(G_V_Info[x1][1]!=idStr)
			continue;
		if(G_V_Info[x1][2] == 2)
			continue;
		if(dir==0){
			for(x3=start;x3<(GD_Info[i][1]-1);x3++)
				for(x4=0;x4<GD_Info[i][4];x4++){
					CopyGridValue(G_V_Info[x1][0],x3,x3+1,x4);
				}
		}
		else{
			for(x3=GD_Info[i][1]-1;x3>start;x3--)
				for(x4=0;x4<GD_Info[i][4];x4++){
					CopyGridValue(G_V_Info[x1][0],x3,x3-1,x4);
				}
		}
	}
}
function SetGridInitValue(idStr, start){var i;for(i=0; i<GD_Info.length;i++){if(GD_Info[i][0] == idStr)break;}if(i==GD_Info.length)return;if(GD_Info[i][1]<=start)return;var x1;var x2 = G_V_Info.length;var x4;for(x1=0;x1<x2;x1++){if(G_V_Info[x1][1]!=idStr)continue;if(G_V_Info[x1][2] == 2)continue;for(x4=0;x4<GD_Info[i][4];x4++){SetValue(G_V_Info[x1][0], "", "_"+start+"_"+x4); }}}
function fn_sgvbdv(x0, x1, x2){
	var x3=G_V_Info.length;
	var x4;
	for(x4=0;x4<x3;x4++){
		if(ParsingRule[x0][0]==G_V_Info[x4][0])
			break;
	}
	if(x4==x3)
		return;
	var x5=x4;
	x3=GD_Info.length;
	for(x4=0;x4<x3;x4++){
		if(GD_Info[x4][0]==G_V_Info[x5][1])
			break;
	}
	if(x4==x3)
		return;
	if(x2>=GD_Info[x4][1])
		AddLastRowInGrid(x4);
	fn_svbdv(x0,x1,"_"+x2+"_0");
}

function fn_gshc(x0){var x1=document.getElementById(x0);while(x1 != null){if(x1.tagName == "TABLE" || x1.tagName == "SPAN" || x1.tagName == "TR"){x1.style.display='block';}x1 = x1.parentElement;}}
function CallMapFun(mapName){
	var len = DsMapInfo.length;
	var i;
	var strXml=null;
	for(i=0; i<len; i++)
	{
		if(DsMapInfo[i][1] == mapName)
		{
			strXml = ProcMap(i);
		}
	}
	if(strXml==null)
	{
		for(var k=0; k<GDsMapInfo.length; k++)
		{
			if(GDsMapInfo[k][1]==mapName)
			{
				strXml=ProcMapGlobal(k);
			}
		}
	}
}

function GlobalCallMapFun(mapName)
{
		for(var k=0; k<GDsMapInfo.length; k++)
		{
			if(GDsMapInfo[k][1]==mapName)
			{
				strXml=ProcMapGlobal(k);
			}
		}
}

function CallMapFun(mapName)
{
	var len = DsMapInfo.length;
	var i;
	var strXml;
	for(i=0; i<len; i++)
	{
		if(DsMapInfo[i][1] == mapName)
		{
			strXml = ProcMap(i);
		}
	}
}


var g_pGroup = new Array();
function ToHex4Unicode(x){var hex="0123456789ABCDEF";var r="FFFE";var i, j;var let;var tempStr;for(i=0;i<x.length;i++){tempStr = "";let= x.charCodeAt(i);tempStr += hex.charAt((let >> 4) & 0xF);tempStr += hex.charAt((let) & 0xF);tempStr += hex.charAt((let >> 12) & 0xF);tempStr += hex.charAt((let >> 8) & 0xF);r += tempStr;}return r;}
function ToHex4UnicodeOnly(x){var hex="0123456789ABCDEF";var r="";var i, j;var let;var tempStr;for(i=0;i<x.length;i++){tempStr = "";let= x.charCodeAt(i);tempStr += hex.charAt((let >> 4) & 0xF);tempStr += hex.charAt((let) & 0xF);tempStr += hex.charAt((let >> 12) & 0xF);tempStr += hex.charAt((let >> 8) & 0xF);r += tempStr;}return r;}
function fn_bHide(x1){var x3 = document.getElementById(ParsingRule[x1][0]);if(x3==null)return 0;while(x3 != null){if(x3.style.display == 'none')return 1;x3 = x3.parentElement;}return 0;}
function fn_svfxf(fn){if(G_VT02==0){var i;for(j=0; j<REPGRP.length; j++){REPGRP[j][1] = '';}{var x1 = fn_llf(fn);fn_loadSavedXml(x1);var j;for(j=0; j<REPGRP.length; j++){var x11 = document.getElementById(REPGRP[j][0]);if(x11 != null)REPGRP[j][1] += x11.innerHTML;}}for(j=0; j<REPGRP.length; j++){var x11 = document.getElementById(REPGRP[j][0]);if(x11 != null){x11.innerHTML = REPGRP[j][1];x11.style.display='block';REPGRP[j][1] ='';}}}else{xmlhttpPost(SERVERPRO+SERVERIP+fn, "", 1);}}
function fn_gdifv2(x1){var x3=0;var aStr="";for(x3=0;x3<x1.length;x3++){aStr += x3+":"+x1[x3]+";\n";RVInfo[14+x3]=x1[x3];}if(RVInfo[17])ext_connected_recd=RVInfo[17];}
function toggle_display( td_obj ) {if(G_VT01 >= 2)return;  var table_obj = td_obj.parentElement; table_obj = table_obj.parentElement;var childCol = table_obj.children;for (i=1; i<childCol.length; i++) {var block = childCol.item(i);if (block.style.display == "none")block.style.display = "block";else{ var len = g_pGroup.length; for(var j = 0; j<len; j++){ var idArr = td_obj.id.split("_"); if(idArr[0] == "CAP" && idArr[1] == g_pGroup[j]) return;} block.style.display = "none";}}}
function hide_table(control_id){var control = document.getElementById(control_id);var bChecked = control.checked;var i;for(i=0; i<ConnectedItem.length; i++){if(ConnectedItem[i][0] != control_id)continue;var block = document.getElementById(ConnectedItem[i][1]);if(bChecked){if(ConnectedItem[i][2]==1)block.style.display = "block";elseblock.style.display = "none";}else{if(ConnectedItem[i][2]==1)block.style.display = "none";elseblock.style.display = "block";}}}
function fn_clrImg(no,idx){var strImgArr=BIR_INFO[no][2].split('?');var htmlStr="";var i=0;BIR_INFO[no][2]="";for(i=0; i<strImgArr.length; i++){if(i == idx)continue;if(BIR_INFO[no][2] != "") BIR_INFO[no][2] += "?";BIR_INFO[no][2] += strImgArr[i];}fn_rfshImg(no);}
function toggleElementByCId(x1){x2 = fn_fprbc(x1);if(x2 <0)return;var x3=document.getElementById(ParsingRule[x2][0]);if (x3.style.display == "none")x3.style.display = "block"; else x3.style.display = "none";}
function SaveProc_Img(x1){if(x1 != null && x1.length >=3){if( x1.substring(0, 3) == "OK^"){return x1.substring(3, x1.length);}}return "";}

/*function makeSign(x1){ 
	return ''; 
	var strCertID = doctorId+"@eumc.ac.kr";
	var strOriginalMessage = x1;	
	var strSignCert = getUserSignCert(strCertID); 
	if( strSignCert == "" )	{	
		var strErr = getErrorString(); 
		if(strErr == "")	{
			alert( "인증서 선택을 취소하였습니다");
			return "";
		}	
		else{
			alert( strErr );
		}	return "";	
	}	
	var strSignValue = generateDigitalSignature(strCertID, strOriginalMessage );	
	if ( strSignValue == "" )	{	
		alert(getErrorString());
		return "";	
	}	
	return "<SIGN Algorithm='DigestAlgorithm:"+strMsgDigestAlg+",EncAlgorithm:"+strEncryptAlg+",KeyLen:"+szEncryptKeyLen+",SerialNo:"+getCertSerialNumber( strSignCert )+",CertSubjectDN:"+getCertSubjectDN( strSignCert )+"'>"+strSignValue+"</SIGN>";
}
*/

function fn_GetStructString(){return StructXmlString;}
function GetGridStringValue(id, delimeter){var x1 = G_V_Info.length;var x2;var result;for(x2=0; x2<x1; x2++){if(id == G_V_Info[x2][0]){var x3 = 0;for(x3=0; x3<GD_Info.length; x3++){if(G_V_Info[x2][1] == GD_Info[x3][0]) {var x4;result = new Array(GD_Info[x3][1]);for(x4=0; x4<GD_Info[x3][1]; x4++){var temp = "";var x5 = 0;for(x5=0; x5<G_V_Info[x2][3]; x5++){if(x5 != 0)temp += delimeter;temp += GetStringValue(G_V_Info[x2][0],"_"+x4+"_"+x5);}result[x4] = temp;}}}break;}}return result;}