document.oncontextmenu = function (e) {
		return true;
  }


var resultData;
var MAP_RET_VAL="";
var MAP_RET_VAL2="";
var MAP_SET_VAL="";
var B_SAVE_TEMP=0;
var B_SAVE_UPDATE=0;

function SET_VAL(idStr,val1)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][9] ==idStr)
			break;
	if(x2==x1)
		return 0;
	if(ParsingRule[x2][2] ==4)
		SetValue(ParsingRule[x2][0],val1,"_0_0");
	else
		SetValue(ParsingRule[x2][0],val1,"");
}
function SET_ADD_VAL(idStr,val1,deli)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][9] ==idStr)
			break;
	if(x2==x1)
		return 0;
	if(!deli)
		deli = ",";
	if(ParsingRule[x2][2] ==4)
		SetAddValue(ParsingRule[x2][0],val1,"_0_0",deli);
	else
		SetAddValue(ParsingRule[x2][0],val1,"",deli);
}
function SET_VAL_1(idStr,val1,aStr)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][9] ==idStr)
			break;
	if(x2==x1)
		return 0;
	SetValue(ParsingRule[x2][0],val1,aStr);
}

function GET_VAL(idStr , aStr)
{
  var x1=fn_fprbc(idStr);
  if(x1 <0) return "";
	return GetValue(ParsingRule[x1][0], aStr);
}

function GET_CHECKCOUNT(x1)
{
	var x21=0;
	x2 = fn_fprbc(x1);
	if(x2 <0)
		return;
	var i=x2+1;
	var x5 = ParsingRule.length;
	var x7 = ParsingRule[x2][4]+1;
	while(i < x5)
	{
		if(x7 > ParsingRule[i][4])
			break;
		if( x7 != ParsingRule[i][4])
		{
			i++;
			continue;
		}

		var x8 = document.getElementById(ParsingRule[i][0]);
		if(x8)
		{
			if(x8.selected || x8.checked)
			{
				x21++;
			}
		}
		i++;
	}
	return x21;
}

function GET_CHECKSTATUS(x1)
{
	var x21=0;
	x2 = fn_fprbc(x1);
	if(x2 <0)
		return;
	var i=x2+1;
	var x5 = ParsingRule.length;
	var x7 = ParsingRule[x2][4]+1;
	while(i < x5)
	{
		if(x7 > ParsingRule[i][4])
			break;
		if( x7 != ParsingRule[i][4])
		{
			i++;
			continue;
		}

		var x8 = document.getElementById(ParsingRule[i][0]);
		if(x8)
		{
			if(x8.selected || x8.checked)
			{
				x21 += i-x2;
			}
		}
		i++;
	}
	return x21;
}

function GET_COOKIE_VAL(cookieNo)
{
	var idx = parseInt(cookieNo);
	if(RVInfo.length > idx)
		return RVInfo[idx];
	else
		return "";
}


function GET_REQUEST_VAL(valueName)
{
	//age#22$sex#M$medDate#20140101$
	if(valueName=="medDate" && G_VT01==1) //수정모드로 들어왔을 때 진료일 저장 시 내원 일로 세팅되도록 수정
	{
		var chosDate = parent.x1.param[18].split('-');
		return chosDate[0]+chosDate[1]+chosDate[2];
	}
	else if(valueName=="chosType" && G_VT01==1) //수정모드로 들어왔을 때 진료일 저장 시 내원 일로 세팅되도록 수정
	{
		return "O";
	}
	else
	{
		if(G_RVIFV == null || G_RVIFV == "")
			return "";
		var x1 = G_RVIFV.split('$');
		if(x1.length < 1)
			return "";
		for(i=0; i<x1.length; i++)
		{
			var x2 = x1[i].split('@');
			if(x2.length != 2)
				continue;
			if(x2[0] == valueName)
			{
				if(x2[1] == "")
					return "";
				return x2[1];
			}
		}
	}
	return "";
}

var G_DMD=new Array();
var G_DMC=0;
function GetMenuInfo()
{
	G_DMC=0;
	return G_DMD;
}
function MoveToElement(idStr)
{
	var obj=document.getElementById(idStr);
	if(obj)
	{
		obj.scrollIntoView(true);
	}
}

function ExecMenu(id, status)
{
	var len = G_DMD.length;
	var i;
	for(i=0;i<len;i++)
	{
		if(G_DMD[i][0]!=id)
			continue;
		if(status==1)
		{
			fn_ejs(G_DMD[i][5]);
			return G_DMC;
		}
		fn_ejs(G_DMD[i][4]);
		return G_DMC;
	}
	return G_DMC;
}

function CallGenPopupWinFunc(idStr, urlStr, width, height)
{

	var ret_val1 = window.showModalDialog(urlStr,
	'popup','dialogWidth='+width+'px; dialogHeight='+height+'px; center:yes; scroll=no; resizable=no; status:no; help:no; dialogHide:yes;');

	if(ret_val1 == null)
		return;
	SET_VAL(idStr, ret_val1);

}

function SET_VISIBLE(idStr, type)
{
	var obj=document.getElementById(idStr);

	if(obj)
	{
		if(type==0)
			obj.style.display='none';
	}

	return;
}

function CallExtModule(path, arguement, setvalue_option, Type)
{
	parent.parent.parent.getExtInfo(this, path, arguement, setvalue_option, Type);
}

function ProcessReturnValue(col,data,svoption)
{
	//alert("테스트 중 >>>"+col+":"+data+":"+svoption);
	CallPopupExtFunc(col,data,svoption);
}

//*************************************************

function CallPopupExtFunc(col,cData,svoption)//CallPopupExtFunc(idStr, urlStr, width, height)
{
	if(col==null || cData==null) return;
	var temp_col=col.split('|');
	if(temp_col == null || temp_col.length<=0)	return;
	var temp_cdata=cData.split('^');
	if(temp_cdata==null ||temp_cdata.length<=0) return;

	var len = temp_col.length;
	for(var i=0;i<len;i++)
	{
		temp_col[i]=[temp_col[i]];
	}
	var tLen=temp_cdata.length;
	for(var i=0;i<tLen;i++)
	{
		var ttd=temp_cdata[i].split('|');
		var ttLen=ttd.length;
		for(var n=0;n<ttLen;n++)
		{
			if(temp_col[n]==null) continue;
			temp_col[n][i+1]=ttd[n];
		}
	}

	var svo=svoption.split('/');
	var slen=svo.length;
	for(var i=0; i<len && i<slen; i++)
	{
		if(svo[i].substring(0, 1) == '#' || svo[i].substring(1, 2) == '#')
			continue;
		SetPopupExtValue(svo[i], temp_col[i]);
	}
	return "";
}
////////////////////////////////

function SetPopupExtValue(idStr, ar1)
{
	var x1=ParsingRule.length;
	var flag = 0;
	if(idStr.substring(0, 1) == 'R')//replace
	{
		flag = 1;
		idStr = idStr.replace(/R/, "");
	}
	if(idStr.substring(0, 1) == 'V')
	{
		flag = 2;
		idStr = idStr.replace(/V/, "");
	}
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
		var x4 = new Array(x3-1);
		var x5;
		var x6=0;
		for(x5=0; x5<x3; x5++)
			if(x5 != 0)
				x4[x6++] = ar1[x5];

		SetAddGridArrayValue(idStr, x4, 1);
		gridFlag = 0;
	}
	else if(ParsingRule[x2][2]==5)
	{
		var x3=ar1.length;
		var i = 0;
		if(flag == 1)
		{
			if(x3>0)
				SetValue(idStr, ar1[1], '');
			else
				SetValue(idStr, '0', '');
		}
		else if(flag == 2)
		{
			if(x3>0)
			{
				var temp = "";
				for(i=1; i<x3; i++)
					temp += i + ". " + ar1[i] + "\r\n";
				SetAddValue(idStr, temp, '');
			}
			else
				SetAddValue(idStr, '0', '');
		}
		else
		{
			if(x3>0)
			{
				var temp = ar1[1];
				for(i=2; i<x3; i++)
					temp += "," + ar1[i];
				SetAddValue(idStr, temp, '');
			}
			else
				SetAddValue(idStr, '0', '');
		}
	}
	return "";
}

function ViewerState()
{
	var viewerState="";
}
// 20120910 -> 2012-09-10
function ConvertDateString(dStr)//주민번호 받아서 -넣기
{
	return dStr.substring(0,4)+"-"+dStr.substring(4,6)+"-"+dStr.substring(6,8);
}
function ConvertDateString2(dStr)
{
	if(dStr.length <=8) return dStr;
	return dStr.substring(0,4)+dStr.substring(5,7)+dStr.substring(8,10);
}

//1000 ->10:00
function ConvertTimeString(dStr)
{
	return dStr.substring(0,2)+":"+dStr.substring(2,4);
}

function ConvertTimeString3(dStr)
{
	return dStr.substring(0,2)+dStr.substring(3,5);
}


function ConvertTimeString2(dStr)
{
 if(dStr.length < 4)
  return '0'+dStr;
 if(dStr.length == 4)
  return dStr;
 return dStr.substring(0,2)+dStr.substring(3,5);
}

function Date2Standard(d)
{
	d=d.split('-');
	if(d.length<2)
		return d;
	return d[1]+"/"+d[2]+"/"+d[0];
}
function GetDateByDiffer(cur,diff)
{
	var curDate=new Date(Date2Standard(cur));
	curDate.setDate(curDate.getDate()+diff);
	return GetToday('YY-MM-DD',curDate);
}

function GetDayDiffer(d1,d2)
{
	d1=Date2Standard(d1);d2=Date2Standard(d2);
	var diff=((new Date(d1))-(new Date(d2)));
	diff /= 86400000;
	return diff;
}

function GetDateDiffer(c,porg)
{
	c=Date2Standard(c);porg=Date2Standard(porg);
	c=c.split("/");p=porg.split("/");
	if(c[2]<p[2]) return [-1,-1,-1,-1];
	var y=parseInt(c[2]-p[2]);
	var m=parseInt(c[0])-parseInt(p[0]);
	c[1]=parseInt(c[1]); p[1]=parseInt(p[1]);
	if(m==0){
		if(c[1]==p[1])
			return [y,m,0,0];
		if(c[1]<p[1]){y--;m =11;}
	}
	else if(m<0){y--; m+=12;}

	var diff=0;
	if(c[1]<p[1])
	{
		diff =GetDayDiffer((parseInt(p[0])+1)+"/"+c[1]+"/"+p[2], porg);
	}
	else
	{
		diff =GetDayDiffer(p[0]+"/"+p[1]+"/"+p[2], porg);
	}
	return [y,m,parseInt(diff/7),diff%7];
}

function GetWeek(d)
{
	d=Date2Standard(d);
	var d=new Date(d);
	return d.getDay();
}

function GetRowCount(id)
{
	for(var i=0; i<GD_Info.length; i++)
	{
		if(GD_Info[i][0] == id )
		{
			return GD_Info[i][1];
		}
	}

	return -1;
}

function SetDateEvent(prn)
{
	for(var i=0; i<prn.length; i++)
	{
		if(prn[i][3] == 4 || prn[i][3] == 9)
		{
			var obj = document.getElementById("INPUT_"+prn[i][0]);
			if(obj)
			{
				obj.r_mode=prn[i][3];
				obj.r_str=prn[i][20];
				obj.onkeypress=function (){	SetDateFormat(this, this.r_mode, this.r_str);};

			}
		}
	}
}

function SetDateFormat(obj, mode, type)
{
	if(window.event.keyCode == '13')
	{
		var val = obj.value;
		var str = "";
		for(var i=0; i<val.length; i++)
		{
			if(val.substring(i, i+1) != " " && val.substring(i, i+1) != "-" && val.substring(i, i+1) != ":")
				str += val.substring(i, i+1);
		}
		switch(type)
		{
			case 0:
				return;
			break;
			case 1:
				if(str.length<12 || mode != 4)
					return;
				obj.value = str.substring(0,4)+"-"+str.substring(4,6)+"-"+str.substring(6,8)+" "+str.substring(8,10)+":"+str.substring(10,12);
			break;
		  case 2:
		  	if(str.length<8 || mode != 4)
					return;
				var day = str.substring(0,4)+"-"+str.substring(4,6)+"-"+str.substring(6,8);
				switch(GetWeek(day))
				{
					case 0:
						obj.value = day+"(일)";
					break;
					case 1:
						obj.value = day+"(월)";
					break;
					case 2:
						obj.value = day+"(화)";
					break;
					case 3:
						obj.value = day+"(수)";
					break;
					case 4:
						obj.value = day+"(목)";
					break;
					case 5:
						obj.value = day+"(금)";
					break;
					case 6:
						obj.value = day+"(토)";
					break;
				}
		  break;
		  case 3:
		  	if(str.length<8 || mode != 4)
					return;
				obj.value = str.substring(0,4)+"-"+str.substring(4,6)+"-"+str.substring(6,8);
		  break;
		  case 4:
		  	if(str.length<6 || mode != 4)
					return;
				obj.value = str.substring(0,4)+"-"+str.substring(4,6);
		  break;
		  case 5:
		  	if(str.length<4 || mode != 4)
					return;
				obj.value = str.substring(0,4)+"-"+str.substring(4,6);
		  break;
		  case 6:
		  	if(str.length<4 || mode != 9)
					return;
				obj.value = str.substring(0,2)+":"+str.substring(2,4);
		  break;
		  case 7:
		  	if(str.length<8 || mode != 9)
					return;
				obj.value = str.substring(0,2)+":"+str.substring(2,4)+":"+str.substring(4,6);
		  break;
		}
	}
}

function ConvertMasking(arrData)
{
	for(var i=0; i<arrData.length; i++)
	{
		switch(arrData[i][0])
		{
			case 0:
				ConvertText(arrData[i][1], arrData[i][2]);
			break;
			case 6:
				var len = GetRowCount(arrData[i][1]);
				for(var j=0; j<len; j++)
				{
					ConvertText(arrData[i][1]+"_"+j+"_0", arrData[i][2]);
				}
			break;
			case 20:
				ConvertText(arrData[i][1], arrData[i][2]);
			break;

		}
	}
}

function ConvertText(id, format)
{
	var obj = document.getElementById("INPUT_"+id);
	var val;
	var x1 = -1;
	var x2 ="";
	var valType = 1;
	if(obj == null)
	{
		valType = 0;
		obj = document.getElementById("VAL_"+id);
		if(obj == null)
			return;
		val = obj.innerHTML;
	}
	else
		val = obj.value;
	for(var j=0; j<format.length; j++)
	{
		if(format.substring(j, j+1) == "*")
		{
			if(x1 == -1)
				x1 = j;
			x2 += "*";
		}
	}

	if(!val)
		return;

	if(val.length > (x1 + x2.length))
	{
		if(valType)
			obj.value = val.substring(0, x1)+x2+val.substring(x1+x2.length, val.length);
		else
			obj.innerTEXT = val.substring(0, x1)+x2+val.substring(x1+x2.length, val.length);
	}
	else if(val.length > x1 && val.length <= (x1+x2.length))
	{
		if(valType)
			obj.value = val.substring(0, x1)+x2.substring(0,val.length-x1);
		else
			obj.innerTEXT = val.substring(0, x1)+x2.substring(0,val.length-x1);
	}

}

function LimitTextCount(arrData)
{
	for(var i=0; i<arrData.length; i++)
	{
		var obj = document.getElementById("INPUT_"+arrData[i][1]);
		if(obj)
		{
			if(obj.maxLength == 0 )
				return;
			var str = arrData[i][2];

			var length = parseInt(str);
			if(length == 0 || isNaN(length))
				continue;
//				length = 10000;
			obj.maxLength = length;
			//obj.onkeyup=function (){ return CheckTextCount(this, str );};
		}
	}
}

function CheckTextCount(obj, limit)
{
	var v=obj.value;
	var n=parseInt(limit);
	if(v.length >= n)
	{
		window.event.keyCode=9;
		//obj.value = v.substring(0, n);
		//return false;
	}
}

var C_G_DATA;
function ConvertGridDataToTime(l_conId, g_conId, strTime) {
	if(!l_conId || !g_conId)
		return;
	if(!strTime)
		strTime = 0;

	//C_G_DATA : Convert Grid Data
	if(!C_G_DATA)
		C_G_DATA = new Array();

	var i=0;
	for(; i<C_G_DATA.length; i++) {
		if(C_G_DATA[i][0] == l_conId && C_G_DATA[i][1] == g_conId)
			break;
	}
	C_G_DATA[i] = [l_conId, g_conId, strTime, 'time'];
}

//우혜윤
function GetValuePanel(ids, panel_id)
{
	var f_id='IFRAME_'+ids;

	var obj=document.getElementById(f_id).contentWindow;//.document.getElementById(panel_id).value;
	if(obj)
	{
		if(obj.GetValue && typeof(obj.GetValue)=='function')
			return obj.GetValue(panel_id);
		else
			return false;
	}
	else
		return false;
}

function SetValuePanel(ids, panel_id, data)
{
	var f_id='IFRAME_'+ids;

	var obj = document.getElementById(f_id).contentWindow;//.document.getElementById(panel_id).value=data;
	if(obj)
	{
		if(obj.SetValue&&typeof(obj.SetValue)=='function')
			obj.SetValue(panel_id,data);
		else
			return false;
	}
	else
		return false;
}


function GetMapData(colName) {
	if(!colName || !MAP_RET_VAL)
		return "";

	if(!(MAP_RET_VAL instanceof Array))
		return "";

	try {
		for(var i=0; i<MAP_RET_VAL.length; i++) {
			if(colName == MAP_RET_VAL[i][0]) {
				return MAP_RET_VAL[i][1];
			}
		}
		return "";
	}
	catch(e) {
		//alert("Error.GetMapData("+ e.message+")");
		return "";
	}
}


var g_popupParm = new Array();
function OpenOcsPopup(idStr, popupName, param, width, height)
{
	g_popupParm[0] = idStr;

	parent.document.title = "TYPE|POPUP^NAME|"+popupName+"^PARAM|"+param+"^WIDTH|"+width+"^HEIGHT|"+height+"^";
	//ReturnValueToPopup("TEXT1|TEXT2|TEXT3☆1234|456|789☆344|DFSDF|EEEE☆");
}

function OpenOcsPopupByMulti(id, popupName, param, width, height, numStr, gapStr, useLine, useName)
{
	g_popupParm[0] = id;
	g_popupParm[1] = numStr;
	g_popupParm[2] = gapStr;
	g_popupParm[3] = useLine;
	g_popupParm[4] = useName;

	parent.document.title = "TYPE|POPUP^NAME|"+popupName+"^PARAM|"+param+"^WIDTH|"+width+"^HEIGHT|"+height+"^";
	ReturnValueToPopupByMulti("TEXT1|TEXT2|TEXT3☆1234|456|789☆344|DFSDF|EEEE☆");
}

function ReturnValueToPopup(strVal)
{
	alert(strVal);
	//strVal = "TEXT1|TEXT2|TEXT3☆1234|456|789☆344|DFSDF|EEEE☆";
	if(g_popupParm.length<1)
		return;
	var id = g_popupParm[0].split("/");
	var retVal = ConvertRetStr(strVal);
	if(retVal == null)
		return;

	var len = retVal.length < id.length ? retVal.length : id.length;
	var i=0;
	for(i=0; i<len; i++)
	{
		if(id[i].substring(0, 1) == '#' || id[i].substring(1, 2) == '#')
			continue;

		if(retVal[i].length > 1)
		{
			retVal[i][1] = 	retVal[i][1].replace(/&amp;/g, "&");
			retVal[i][1] = 	retVal[i][1].replace(/&lt;/g, "<");
			retVal[i][1] = 	retVal[i][1].replace(/&gt;/g, ">");
		}

		SetPopupValue(id[i], retVal[i]);
	}
	g_popupParm = null;
	g_popupParm = new Array();
	//document.getElementById(id).value = val;
}

function ReturnValueToPopupByMulti(strVal)
{
	alert(strVal);
	var id = g_popupParm[0];
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==id)
			break;
	if(x2==x1)
		return 0;
	if(ParsingRule[x2][3] != 3)
	{
		alert("It's not Multiline-TextBox!");
		return;
	}

	var retVal = ConvertRetStr(strVal);
	if(retVal == null)
		return;

	var numStr = g_popupParm[1];
	var gapStr = g_popupParm[2];
	var useLine = g_popupParm[3];
	var useName = g_popupParm[4];

	var len = retVal.length;
	var columnStr = numStr.split('_');
	var len2 = columnStr.length;
	var lenStr = gapStr.split('_');
	var len3 = lenStr.length;

	if(len2 <= 0)
		return;
	if(len2 != len3)
		return;

	var i=0;
	var j=0;
	//var starFlag = 0;
	var starFlag = useName?0:1;
	var starArr = new Array();
	for(i=0; i<len2; i++)
	{
		if(columnStr[i].substring(0, 1) == '*')
		{
			starFlag = 1;
			starArr[j++] = parseInt(columnStr[i].substring(1, columnStr[i].length)) - 1;
			columnStr[i] = columnStr[i].substring(1, columnStr[i].length);
		}
	}

	var ret_val2;
	var len1;
	var maxLen = 0;
	var totalLen = 0;
	var x4 = 0;
	var x5 = 0;
	var x6 = 0;
	for(x3=0; x3<len; x3++)
	{
		ret_val2 = retVal[x3];
		len1 = ret_val2.length;
		for(x4=0; x4<len2; x4++)
		{
			if(x3 == columnStr[x4]-1)
			{
				ret_val2[len1] = 1;
				ret_val2[len1+1] = parseInt(lenStr[x5++]);
				break;
			}
			ret_val2[len1] = 0;
			ret_val2[len1+1] = 0;
		}
		ret_val2[len1+2] = 0;
		for(x4=0; x4<starArr.length;x4++)
		{
			if(x3 == starArr[x4])
			{
				ret_val2[len1+2] = 1;
				break;
			}
		}
		if(ret_val2[len1+1]	< 0)
		{
			ret_val2[len1+3] = ret_val2[len1+1] * -1;
			if(ret_val2[len1+2] == 0)
				totalLen += ret_val2[len1+3];
			continue;
		}
		var x7 = GetStrLength(ret_val2[0]) > GetStrLength(ret_val2[1]) ? ret_val2[0] : ret_val2[1];
		ret_val2[len1+3] = GetStrLength(x7);

		for(x4=2; x4<len1; x4++)
		{
			if(GetStrLength(ret_val2[x4]) > GetStrLength(x7))
				x7 = ret_val2[x4];
			ret_val2[len1+3] = GetStrLength(x7);
		}
		ret_val2[len1+3] = GetStrLength(x7) > ret_val2[len1+1] ? GetStrLength(x7) : ret_val2[len1+1];
		if(ret_val2[len1] == 1 && ret_val2[len1+2] == 0)
			totalLen += ret_val2[len1+3];
	}
	var starLen = 0;
	for(x3=0; x3<len; x3++)
	{
		ret_val2 = retVal[x3];
		len1 = ret_val2.length;
		if(ret_val2[len1-2] == 1)
		{
			if(x3 == 0)
				starLen = ret_val2[len1-1];
			else
				starLen = starLen > ret_val2[len1-1] ? starLen : ret_val2[len1-1];
		}
	}
	totalLen = totalLen > starLen ? totalLen : starLen;

	var outputArr = new Array();
	var maxLen = 0;
	for(x3=0, x4=0; x3<len; x3++)
	{
		ret_val2 = retVal[x3];
		len1 = ret_val2.length;
		if(ret_val2[len1-4] == 1)
		{
			outputArr[x4] = ret_val2;
			if(x4 == 0)
				maxLen = outputArr[x4].length-4;
			else
			{
				if(outputArr[x4].length-4 > maxLen)
					maxLen = outputArr[x4].length-4;
			}
			x4++;
		}
	}

	useLine = useLine?1:0;
//	if(url == "operationCodeSearching.jsp")
//		useLine = 0;

	totalLen = totalLen + x4 - 1;
	var x9 = document.getElementById("INPUT_"+ParsingRule[x2][0]);

  if(x9 == null)
  {
  	alert("Not Exist!");
  	return;
  }

	for(x3=0; x3<maxLen; x3++)
	{
		if(x3 == 0 && useLine == 1)
		{
			for(i=0; i<totalLen; i++)
				x9.value += "-";

			x9.value += "\r\n";
		}

		if(x3 == 0 && starFlag == 1)
			continue;

		if(x3 == 1 && starFlag == 0 && useLine == 1)
		{
			for(i=0; i<totalLen; i++)
				x9.value += "-";

			x9.value += "\r\n";
		}

		var temp = outputArr[0];
		var a = GetStrLength(temp[x3]);
		var b = temp[temp.length-1];
		var subLen = a%b == 0 ? parseInt(a/b) : parseInt(a/b)+1;

		if(x3 >= temp.length-4)
			subLen = 0;

		for(x5=1; x5<x4; x5++)
		{
			var temp1 = outputArr[x5];

			if(temp1[temp1.length-2] == 1)
				continue;

			if(x3 >= temp1.length-4)
				continue;

			a = GetStrLength(temp1[x3]);
			b = temp1[temp1.length-1];
			var cmp1 = a%b == 0 ? parseInt(a/b) : parseInt(a/b) + 1;
			subLen = subLen > cmp1 ? subLen : cmp1;
		}

		for(x5=0; x5<subLen; x5++)
		{
			for(x6=0; x6<x4; x6++)
			{
				temp = outputArr[x6];
				if(temp[temp.length-2] == 0)
				{
					var gap = "";
					if(x3 < temp.length-4)
					{
						var data = temp[x3];
						a = temp[temp.length-1];
						x9.value += GetSubString(data, a*x5, a*x5+a);
					}
					else
					{
							for(x7=0; x7<temp[temp.length-1]; x7++)
								gap += " ";
							x9.value += gap;
					}
					x9.value += " ";
				}
			}
			x9.value += "\r\n";
		}

		for(x5=0; x5<x4; x5++)
		{
			temp = outputArr[x5];
			if(temp[temp.length-2] == 1 && x3 < temp.length-4)
			{
				var data = outputArr[x5][x3];

				if(totalLen > data.length)
					x9.value += data + "\r\n";
				else
				{
					var x10 = data.length/totalLen;
					for(x7=0; x7<x10; x7++)
						x9.value += GetSubString(data, totalLen*x7, totalLen*x7+totalLen) + "\r\n";
				}
			}
		}

		if(x3 == maxLen-1 && useLine == 1)
		{
			for(i=0; i<totalLen; i++)
				x9.value += "\r\n";
		}
	}

	g_popupParm = null;
	g_popupParm = new Array();
	return "";
}

function ConvertRetStr(strVal)
{
	var x2 = strVal.split("☆");
	var col = x2[0].split("|");
	var retVal = new Array();
	var len = col.length;
	for(var i=0; i<len; i++)
		retVal[i] =[col[i]];
	var len2 = x2.length;

	for(var i=1; i<len2-1; i++)
	{
		var x3 = x2[i].split("|");
		for(var j=0; j<len; j++)
		{
			var cnt = retVal[j].length;
			retVal[j][cnt] = x3[j];
		}
	}

	return retVal;
}

function SET_SHOW(idStr, val)
{
	var x0;
  var x1=ParsingRule.length;

	for(x0=0;x0<x1;x0++)
		if(ParsingRule[x0][0] ==idStr)
			break;

	if(x0 == x1)
		return;

	var x1=document.getElementById(ParsingRule[x0][0]);
	if(x1 ==null)
		x1=document.getElementById("INPUT_"+ParsingRule[x0][0]);

	if(x1 ==null)
		x1=document.getElementById("VAL_"+ParsingRule[x0][0]);

	if(x1 ==null)
		x1=document.getElementById("CON_"+ParsingRule[x0][0]);

	if(x1 ==null)
		x1=document.getElementById("CHECK_"+ParsingRule[x0][0]+"_0");

	while(x1 != null)
	{
		if(x1.tagName == "TABLE" || x1.tagName == "TR")
		{
//			if(val==true)
//				x1.style.display='inline-block';
//			else
			{
				x1.style.display='none';
				x1.id = "hide_"+x1.id;
			}
			return;
		}
		x1 = x1.parentElement;
	}
}

function GetParsingItemData()
{
	var count = ParsingRule.length;
	var strXmlStr = "";
	for(i=0; i<count; i++)
	{
  	if(fn_bHide(i) && ParsingRule[i][3] != 19)
  		continue;
	 	if(ParsingRule[i][2] ==3 || ParsingRule[i][2] ==5 || ParsingRule[i][2] ==10 ||  ParsingRule[i][2] ==9)
	 	{
	 		strXmlStr += fn_gxel(i);
	 	}
  }

  return strXmlStr;
}

function GET_STR_VAL(idStr , aStr)
{
	var x1=fn_fprbc(idStr);
  if(x1 <0) return "";
  if(aStr==null)
   	aStr="";
	return GetStringValue(ParsingRule[x1][0], aStr);
}



function SetGridFirstRow(idStr,valStr, data)
{
	var gData=GetGridData(idStr);


	SetGridArrayValue(valStr,data);
}


var totalArr = new Array();	// rowscript에서 array모은것

// 쿼리 데이터만 뽑아 정렬하는 함수
function fn_arrAngement(seqArr, totalArr)
{
	var retArr = new Array();
	for(var i=0 ; i< totalArr.length ; i++)
	{
		retArr[i] = new Array(seqArr.length);
	}

	for(var k=0 ; k<seqArr.length ; k++)
	{
		for(var i=0 ; i< totalArr.length ; i++)
		{
			for(var j=0 ; j< totalArr[i].length ; j++)
			{
				if(totalArr[i][j][0] == seqArr[k])
				{
					retArr[i][k] = totalArr[i][j][1];
				}
			}
		}
	}
	return retArr;
}

//특정 컬럼 값으로 join하는 함수
function fn_arrControl(selArr, seqArr, retArr)
{
	var retArr1 = new Array();
	for(var i=0 ; i< retArr.length ; i++)
	{
		retArr1[i] = new Array();
	}

	var selnum;
	for(var i=0 ; i<seqArr.length ; i++)
	{
		if(seqArr[i] == selArr)
		{
			selnum = i;
		}
	}

	for(var k=0 ; k<retArr.length ; k++)
	{
		var temp="";
		for(var i=0 ; i<retArr.length ; i++)
		{
			if(retArr[k][selnum] == retArr[i][selnum])
			{
				for(var j=0 ; j<seqArr.length ; j++)
				{
					if(selnum == j)
					{
						retArr1[k][0] = retArr[i][selnum];
					}
					else if(seqArr.length-1== j)
					{
						temp += retArr[i][j]+"|";
					}
					else
					{
						temp += retArr[i][j]+"@";
					}
				}
			}
		}
		retArr1[k][1] = temp;
	}

	var a = {};
	for(var i=0; i <retArr1.length; i++)
	{
		if(typeof a[retArr1[i]] == "undefined")
		a[retArr1[i]] = 1;
	}

	retArr1.length = 0;
	for(var i in a)
	retArr1[retArr1.length] = i;

	var arrControlArr = new Array();

	for(var i=0 ; i<retArr1.length ; i++)
	{
		arrControlArr[i] = new Array(seqArr.length);
	}

	for(var i=0 ; i<arrControlArr.length ; i++)
	{
		arrControlArr[i] = retArr1[i].split(",");
	}

	return arrControlArr;
}

//누적성기록에서 사용하는 정렬함수
function fn_alignControl(columnArr, arrControlArr)
{
	var finalArr = new Array();
	var tempArr = new Array();

	for(var i=0 ; i<columnArr.length ; i++)
	{
		finalArr[finalArr.length] = new Array();
	}

	for(var i=0 ; i<arrControlArr.length ; i++)
	{
		tempArr[tempArr.length] = arrControlArr[i][1].split("|");
	}

	for(var i=0 ; i<columnArr.length ; i++)
	{
		for(var j=0 ; j<tempArr.length ; j++)
		{
			for(var k=0 ; k<tempArr[j].length ; k++)
			{
				if(columnArr[i] == tempArr[j][k].split("@")[0])
				{
					finalArr[i][j] = tempArr[j][k].split("@")[1];
				}
			}
		}
	}

	for(var i=0 ; i<finalArr.length ; i++)
	{
		for(var j=0 ; j<finalArr[i].length ; j++)
		{
			if(finalArr[i][j] == null )
			{
				finalArr[i][j] = "";
			}
			else
			{
				finalArr[i][j] = finalArr[i][j];
			}
		}
	}

	return finalArr;
}

function accumulateRecord(selArr, seqArr, columnArr, totalArr)
{
	var retArr = fn_arrAngement(seqArr, totalArr);
	var arrControlArr = fn_arrControl(selArr, seqArr, retArr);
	var finalArr = fn_alignControl(columnArr, arrControlArr);
	totalArr = null;
	return finalArr;
}


function callChangeFormatPopup()
{
 	//window.showModalDialog("http://192.168.0.100/EMR_DATA/ChangeFormat.jsp,	'popup','');
 	var orgText="<p><font style='background-color: rgb(1, 0, 255);'>테스트</font><strong>합니다ㅎ</strong><font color='#ff5e00'>ㅎㅎㅎ</font></p>"
 	orgText=han2hex(orgText);
 	alert(orgText);
 	window.showModalDialog("http://121.141.176.66/EMR_DATA/script/ChangeFormat.jsp?orgText="+orgText,'popup' ,'');

}

function changeFormat()
{

	var p_Length = ParsingRule.length;
 	//var its = document.getElementsByTagName('TEXTAREA');
 	for(var i=0; i<p_Length; i++)
 	{
 		if(ParsingRule[i][3] =='3')//multiline
	 			document.getElementById('VAL_'+ParsingRule[i][0]).addEventListener("dblclick",callChangeFormatPopup);


 		else if(ParsingRule[i][3] =='2')//singleline
 		 var k=1;	//		document.getElementById('VAL_'+ParsingRule[i][0]).attachEnvent("dblclick",callChangeFormatPopup);
 	}

}
function SetGridArrayValue(idStr, ar1)
{
	var x1 = ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==idStr)
			break;
	if(x2==x1)
		return "";

	var x3=ar1.length;
	if(x3 == 0)
		return "";
	var x4;
	for(x4=0;x4<x3;x4++)
	{
			fn_sgvbdv(x2, ar1[x4], x4);
	}
}


function SetGridArrayData(gridId, gridData, option) {
	//Array 데이터를 그리드에 Set 해주는 함수
	//gridId : 그리드 아이디
	//gridData : 추가할 데이터(Array)
	//option : 그리드 초기화 여부(0-데이터 추가, 1-초기화)
	if(!gridData)
		return;

	var x1 = 0;
	for(x1=0; x1<GD_Info.length; x1++) {
		if(gridId == GD_Info[x1][0])
			break;
	}
	if(x1 == GD_Info.length)
		return;

	var gvIds;
	for(var x2=0; x2<G_V_Info.length; x2++) {
		if((GD_Info[x1][0] == G_V_Info[x2][1]) && (G_V_Info[x2][6] == 0)) {
			if(!gvIds)
				gvIds = new Array();
			gvIds[gvIds.length] = G_V_Info[x2][0];
		}
	}
	if(!gvIds)
		return;

	if(option == 1)
		ClearGrid(gridId);

	for(x1=0; x1<gvIds.length; x1++)
		SetGridArrayValue(gvIds[x1], gridData[x1]);
}

function fn_gxtd2(x0)
{
	if(x0.firstChild) {
		var retVal = [x0.getAttribute("Name"), x0.firstChild.data];
		return retVal;
	}
	return "";
}

function getMapRowScript(dsId, dsSeq) {
	var x1 = 0;
	if(DI_ID!=-1)
	{
		for(x1=0; x1<DsIfInfo.length; x1++)
		{
			if(DsIfInfo[x1][9] == DI_ID && DsIfInfo[x1][2] == 3)
					break;
		}
	}
	else
	{
		for(x1=0; x1<DsIfInfo.length; x1++) {
			if(DsIfInfo[x1][0] == dsId && DsIfInfo[x1][2] == 3)
				break;
		}
	}
	if(x1 == DsIfInfo.length)
		return null;

	return DsIfInfo[x1][7];
}


function MapEndScript(dsId) {
	var x1 = 0;
	for(x1=0; x1<DsIfInfo.length; x1++) {
		if(DsIfInfo[x1][0] == dsId && DsIfInfo[x1][2] == 4)
			break;
	}
	if(x1 == DsIfInfo.length)
		return null;

	return DsIfInfo[x1][7];
}


function han2hex(str)  { str = escape(str); var arr = [];  for (var i = 0, l = str.length; i < l; i ++) {    var hex = Number(str.charCodeAt(i)).toString(16);    arr.push(hex);  }  return arr.join('');}
function hex2han(hexx) {
	var hex = hexx.toString();
	var str = '';
	for (var i = 0; i < hex.length; i += 2)
	str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	return unescape(str);
	}





function getSysDate(systype) {
	var query = "select sysdate from dual";
	var retData = processDB(query);
	var temp;
	var sysdate;
	if(!retData)
		return;
		
		if(systype==0 || systype==0){
			temp = retData + "";
			sysdate = temp.substring(0,10);
			return sysdate;
		}else if(systype==1 || systype==1){
			temp = retData + "";
			sysdate = temp.substring(0,16);
			return sysdate;
		}else{
			return retData;
		}
}



function hideGroup(idStr)
{
	var x1=InstItem.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(InstItem[x2][1] ==idStr)
			break;
			
	var x3=document.getElementById(InstItem[x2][0]);
	x3.style.display="none";
	
	
}

	   function Datepad(number, length) {

        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }

        return str;

    }
 Date.prototype.YYYYMMDDHHMM = function () {
        var yyyy = this.getFullYear().toString();
        var MM = Datepad(this.getMonth() + 1,2);
        var dd = Datepad(this.getDate(), 2);
        var hh = Datepad(this.getHours(), 2);
        var mm = Datepad(this.getMinutes(), 2)
        

        return yyyy+"-"+MM +"-"+ dd+" "+  hh +":"+ mm;
    };
function addHour(startTime,hours)
{

var d1 = new Date (startTime);
var d2 = new Date ( d1 );
d2.setHours ( d1.getHours() + hours);
 alert(d2.YYYYMMDDHHMM());
}


function toHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return hex;
}


function GetObj(idStr) {

	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==idStr)
			break;
	if(x2==x1)
		return null;
		
	var x8;
	var x4;

	if(ParsingRule[x2][2]==8)
	{
		x8 = document.getElementById(ParsingRule[x2][0]+aStr);
	  	if(x8 != null)
	  	{
	  		return x8;
	  	}
	  	return null;
	}
	else if(ParsingRule[x2][2]==10)
	{
		x4 = x2-1;
		while(x4 >=0)
		{
			if( ParsingRule[x2][4] == (ParsingRule[x4][4]+1))
			{
				if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
					x8 = findImageInputObj("APP_"+ParsingRule[x4][0]+aStr);
				else
					x8 = document.getElementById("APP_"+ParsingRule[x4][0]+aStr);
				if(x8 != null)
				{
					return x8;
				}
				
				break;
			}
		}
		return null;
	}
	
	switch(ParsingRule[x2][3])
  {
  	case 0:
  		x8 = document.getElementById("VAL_"+ParsingRule[x2][0]+aStr);
  		if(x8 != null)
  		{
  			return x8
  		}
  		break;
  	case 1:
  	case 2:
  	case 3:
  	case 4:
  	case 9:
  		x8 = document.getElementById("INPUT_"+ParsingRule[x2][0]+aStr);
  		if(x8 != null)
  		{
  		  
  			return x8
  		}
  		break;
  	case 5:
  	case 6:
  	case 7:
  		
  		break;
  	case 8:
  			var i=x2+1;
  			var x4 =0;
  			var x5=ParsingRule.length;
	  		x8 = document.getElementById("INPUTU1_"+ParsingRule[x2][0]+aStr);
	  		if(x8 != null ) {
	  			return x8;
	  		}
	  		
  		break;
  	case 10:
  		x8 = document.getElementById("CHECK_"+ParsingRule[x2][0]+aStr+"_0");
  		if(x8 != null)
  		{
  			return x8;
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
	  		if(x8 != null)
	  		{
	  			return x8;
	  		}
  		}
  		break;
  }
  
  return null;
}


function setDisplay(table_obj, flag) {
    if (G_VT01 >= 2)
        return;
    
    if(table_obj == null)
    	return;
    
    var childCol = table_obj.children;
    for (i = 0; i < childCol.length; i++) {
        var block = childCol.item(i);
        if (flag)
            block.style.display = "block";
        else {
            block.style.display = "none";
        }
    }
}

////한양대학교병원 하승현
function COMMON_AGE(data1){
	
	var aaa= new Date();
	var tmp_yf = aaa.getFullYear();
	var tmp_mf = aaa.getMonth()+1;
	var tmp_df = aaa.getDate();
	var jumin = data1;
	
	var day =0;
	var month =0;
	var year =0;
	
	var jumin_bk = jumin.substring(7,8);
	var jumin_year ;
	var jumin_day ;
	
	if(jumin_bk==1 || jumin_bk==2 || jumin_bk==5 || jumin_bk==6 ){
		jumin_year = '19'+jumin.substring(0,2); //생일년도
	}else if(jumin_bk==3 || jumin_bk==4 || jumin_bk==7 || jumin_bk==8){
		jumin_year = '20'+jumin.substring(0,2); //생일년도
	} 
//	birth = String(jumin_year) + jumin.substring(2,4); //생일년월 198902
	//alert("jumin_year="+jumin_year);
	var tmp_yt = jumin_year;
	var tmp_mt =  jumin.substring(2,4); 
	//alert("tmp_mt="+tmp_mt);
	var tmp_dt = jumin.substring(4,6);
	
	var cal_yy = tmp_yf - tmp_yt;
  var cal_mm = tmp_mf - tmp_mt;
  var cal_dd = tmp_df - tmp_dt;
  
  var tot_mf = tmp_yf * 12 + tmp_mf;
  var tot_mt = tmp_yt * 12 + Number(tmp_mt);
  //alert("tot_mf=" +tot_mf + "tot_mt=" +tot_mt);
  var rtn_yy = Math.floor((tot_mf - tot_mt) / 12);
  var rtn_mm = (tot_mf - tot_mt) % 12;
  var rtn_dd =0 ;

   if(cal_dd >= 0)   /* 생일 지났는지 체크 */
   {
      rtn_dd = cal_dd;
   }
   else
   {
   	switch(tmp_mf)
   	{
   		case 1: case 3: case 5: case 7: case 8: case 10: case 12: /*31일*/
   		rtn_dd = tmp_df + 31 - tmp_dt;
   		    rtn_mm --;
   		    break;
   		case 4: case 6: case 9: case 11:  /*30일*/
                 rtn_dd = tmp_df + 30 - tmp_dt;
                      // 18
                 rtn_mm --;
                 break;
       case 2: /*2월*/
              if((tmp_yf % 4 == 0)||(tmp_yf % 100 == 0))
                 {
                    rtn_dd = tmp_df + 29 - tmp_dt;
                    rtn_mm --;
                 }
              else
                 {
                    rtn_dd = tmp_df + 28 - tmp_dt;
                    rtn_mm --;
                 }
                 break;
   
   	 }
   	if(rtn_mm < 0)
   	{ 
   		if(rtn_yy == 1 || rtn_yy ==2) rtn_mm =11;
   		rtn_yy --;
     }
   	
   }	
  //alert("rtn_yy="+rtn_yy);
	if(rtn_yy >= 2)
	{
			return rtn_yy +"세";
  }
  else
  	{
      if(rtn_yy == 1)
      {
         rtn_mm =  rtn_mm + 12;
      }

      //alert("rtn_mm=" +rtn_mm);
      if(rtn_mm >= 1)
      {
         if(Math.floor((rtn_dd/7)) == 0)
            return rtn_mm + "개월";
         else
         	
         	   return rtn_mm +"개월"+ Math.floor((rtn_dd/7)) + "주" ;
      }
      else
         return rtn_dd +"일";
  	}
	
}