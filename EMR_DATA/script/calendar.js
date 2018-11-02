var target1;
var pop_top;
var pop_left;
var cal_Day;
var formatType = "";
var cal_id ="";
if(!window.createPopup){
  window.createPopup = function (){
      var popup = document.createElement("iframe"), //must be iframe because existing functions are being called like parent.func()
          isShown = false, popupClicked = false;
      popup.src = "about:blank";
      popup.style.position = "absolute";
      popup.style.border = "0px";
      popup.style.display = "none";
      popup.addEventListener("load", function(e){
          popup.document = (popup.contentWindow || popup.contentDocument);//this will allow us to set innerHTML in the old fashion.
          if(popup.document.document) popup.document = popup.document.document;
      });
      if(document.body!=null)
    	  document.body.appendChild (popup);
      var hidepopup = function (event){
          if(isShown)
              setTimeout(function (){
                  if(!popupClicked){
                      popup.hide();
                  }
                  popupClicked = false;
              }, 150);//timeout will allow the click event to trigger inside the frame before closing.
      }

      popup.show = function (x, y, w, h, pElement){
          if(typeof(x) !== 'undefined'){
              var elPos = [0, 0];
              elPos[0] += x, elPos[1] += y;

              if(isNaN(w)) w = popup.document.scrollWidth;
              if(isNaN(h)) h = popup.document.scrollHeight;
            
              popup.style.left = elPos[0] + "px";
              popup.style.top = elPos[1] + "px";
              popup.style.width = w + "px";
              popup.style.height = h + "px";
          }
          popup.style.display = "block";
          isShown = true;
      }

      popup.hide = function (){
          isShown = false;
          popup.style.display = "none";
      }

      window.addEventListener('click', hidepopup, true);
      window.addEventListener('blur', hidepopup, true);
      return popup;
  }
}
/* 수정 20180103
var oPopup = typeof window.createPopup =="object"? window.createPopup():null;
if(oPopup == null)
	if(window.createPopup != null)
		oPopup = window.createPopup();oPopup.document.oncontextmenu=function(){return false;}
*/
var oPopup = window.createPopup();
if(oPopup.document!=null)
	oPopup.document.oncontextmenu=function(){return false;}
else
	oPopup.contentWindow.document.oncontextmenu=function(){return false;}
var checkdatedocArr =  new Array(); //컨트롤id말고 id

function Calendar_Click(e) {
	cal_Day = e.title;
	var ret_val = cal_Day;
	if(checkdatedocArr.length > 0)
  {
    for(i = 0 ; i < checkdatedocArr.length ; i ++)
    {
       var chkdateid = target1.id.split('_')
       if(chkdateid.length > 1)
       {
          if(checkdatedocArr[i] == chkdateid[1])
          {
             var chk_ret_val = ret_val.split('-');
	           var chkdate = new Date(chk_ret_val[0], chk_ret_val[1]-1, chk_ret_val[2]);
             var chknowdate = new Date();
             if(chkdate.getFullYear() < chknowdate.getFullYear())
             {
               alert('과거는 선택할 수 없습니다.');
               return;
             }
             if(chkdate.getFullYear() == chknowdate.getFullYear() && (chkdate.getMonth()+1)< ( chknowdate.getMonth()+1))
             {
               alert('과거는 선택할 수 없습니다.');
               return;
             }
             if(chkdate.getFullYear() == chknowdate.getFullYear() && (chkdate.getMonth()+1) == ( chknowdate.getMonth()+1) && chkdate.getDate() < chknowdate.getDate())
             {
               alert('과거는 선택할 수 없습니다.');
               return;
             }  
           break;    
        }
      }
    }
  }
	
	
	var formArr = "YYYY_MM_DD HH:MM/YYYY_MM_DD(W)/YYYY_MM_DD/YYYY_MM/MM_DD/HH:MM/HH:MM:SS";
	formArr = formArr.split('/');
	var x1 = formArr.length;
	var x2 = 0;
	for(x2=0; x2<x1; x2++)
	{
		if(formArr[x2] == formatType)
			break;
	}
	x2++;
	if (cal_Day.length > 6) 
	{
		if(x2 == 1)
		{
			var date = new Date();
			var hour = date.getHours();
			if(hour/10 < 1)
				hour = "0" + hour;
			var min = date.getMinutes();
			if(min/10 < 1)
				min = "0" + min;
			if(target1.tagName != "INPUT")
				target1.innerText = ret_val + " " + hour + ":" + min;
			else
				target1.value = ret_val + " " + hour + ":" + min;
		}
		else if(x2 == 2)
		{
			ret_val = ret_val.split('-');
			var date = new Date(ret_val[0], ret_val[1]-1, ret_val[2]);
			var day = date.getDay();
			var dayStr = "";
			switch(day)
			{
				case 0: dayStr = "일"; break;
				case 1: dayStr = "월"; break;
				case 2: dayStr = "화"; break;
				case 3: dayStr = "수"; break;
				case 4: dayStr = "목"; break;
				case 5: dayStr = "금"; break;
				case 6: dayStr = "토"; break;
			}
			if(target1.tagName != "INPUT")
				target1.innerText = ret_val + " " + hour + ":" + min;
			else
				target1.value = cal_Day + "(" + dayStr + ")";
		}
		else if(x2 == 4)
		{
			if(target1.tagName != "INPUT")
				target1.innerText = ret_val.substring(0, 7);
			else
				target1.value = ret_val.substring(0, 7);
		}
		else if(x2 == 5)
		{
			if(target1.tagName != "INPUT")
				target1.innerText = ret_val.substring(5, 10);
			else
				target1.value = ret_val.substring(5, 10);
		}
		else
		{
			if(target1.tagName != "INPUT")
				target1.innerText = ret_val;
			else
				target1.value = ret_val;
		}
	}
	//alert(ret_val);
	/*if(cal_id=="INPUT_1015"){
		var now = new Date();
		var today = now.getFullYear()+"-"+(now.getMonth() + 1) +"-"+now.getDate(); // "2018-02-21";
		var arr1 = ret_val.split('-');
		var arr2 = today.split('-');
	
		var dat1 = new Date(arr1[0], arr1[1], arr1[2]);
		var dat2 = new Date(arr2[0], arr2[1], arr2[2]);
		var diff = dat2 - dat1;
		var currDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
		var temp = parseInt(diff/currDay);
		
		SET_VAL(1049588, temp);
		
	}*/ 
	if(document.getElementById(cal_id).onchange != null ){
		document.getElementById(cal_id).onchange();
	}
	oPopup.hide();
}
function cal_plus(setid){
	
	/*
	var today = new Date();  
	//var dateString = "2012-04-25";  
	  
	var dateArray = document.getElementById(cal_id).value;  
	  
	var dateObj = new Date(dateArray[0], Number(dateArray[1])-1, dateArray[2]);  
	  
	var betweenDay = (today.getTime() - dateObj.getTime())/1000/60/60/24;  
	
	var year = betweenDay / 365;
	var month = (betweenDay % 360) / 30;
	var day = ( (betweenDay % 360) % 30 );
	*/
	
	var today = new Date();  
	//var dateString = "2012-04-25";  
	  
	var dateArray = document.getElementById(cal_id).value.split("-");  
	  
	var dateObj = new Date(dateArray[0], Number(dateArray[1])-1, dateArray[2]);  
	  
	var betweenDay = (today.getTime() - dateObj.getTime())/1000/60/60/24;  
	betweenDay = Math.floor(betweenDay);
	var timestatus = '';
	if(betweenDay < 0) {
		timestatus = '-'
		betweenDay = Math.abs(betweenDay);
	}

	var year = Math.floor(betweenDay / 365);
	var month = Math.floor((betweenDay % 365) / 30);
	var day = Math.floor( (betweenDay % 365) % 30 );

	
	var temp = "";
	//tempstatus + tempyear +"년 " + tempmonth +"월 " + tempday +"일";
	temp += timestatus;
	if(year!=0){
		temp += year +"년 ";
	}
	if(month!=0){
		temp += month +"개월 ";
	}
	if(temp == "" || day!=0) {
		temp += day +"일";
	}
	
	SET_VAL(setid, temp);
	
	
	
	/*
	var dat1 = new Date(arr1[0], arr1[1], arr1[2]);
	var dat2 = new Date(arr2[0], arr2[1], arr2[2]);
	var diff = dat2 - dat1;
	var currDay = 24 * 60 * 60 * 1000;
	var temp = parseInt(diff/currDay);
	SET_VAL(setid, temp);
	*/
}



function podSet(setData){
	var today = new Date();  
	
	var dateArray = setData.split("-");  
	  
	var dateObj = new Date(dateArray[0], Number(dateArray[1])-1, dateArray[2]);  
	  
	var betweenDay = (today.getTime() - dateObj.getTime())/1000/60/60/24;  
	betweenDay = Math.floor(betweenDay);
	var timestatus = '';
	if(betweenDay < 0) {
		timestatus = '-'
		betweenDay = Math.abs(betweenDay);
	}

	var year = Math.floor(betweenDay / 365);
	var month = Math.floor((betweenDay % 365) / 30);
	var day = Math.floor( (betweenDay % 365) % 30 );

	
	var temp = "";
	temp += timestatus;
	if(year!=0){
		temp += year +"년 ";
	}
	if(month!=0){
		temp += month +"개월 ";
	}
	if(temp == "" || day!=0) {
		temp += day +"일";
	}
	
	return temp;
}


function getGA4LMP(weekid, dayid, edcid){

	if(cal_id=="")
		return;

	var today = new Date();  
	//var dateString = "2012-04-25";  
	  
	var dateArray = document.getElementById(cal_id).value.split("-");  
	  
	var dateObj = new Date(dateArray[0], Number(dateArray[1])-1, dateArray[2]);  
	
	
	//var dat1 = new Date(arr1[0], arr1[1], arr1[2]);
	//var dat2 = new Date(arr2[0], arr2[1], arr2[2]);
	var diff = today - dateObj;
	var currDay = 24 * 60 * 60 * 1000;
	var temp = parseInt(diff/currDay);
	
	var week = Math.floor(parseInt(temp)/7);
	var day = Math.floor(parseInt(temp)%7);
	
	var Edc = dateObj;
	Edc.setDate(Edc.getDate() + (7*40));
	
	var EdcStr = Edc.getFullYear() + '-' + (Edc.getMonth()+1) + '-' + Edc.getDate();
	
	SET_VAL(weekid, week);
	SET_VAL(dayid, day);
	SET_VAL(edcid, EdcStr);

}

function getGA4EDC(weekid, dayid, edcid){

	if(cal_id=="")
		return;

	var today = new Date();  
	//var dateString = "2012-04-25";  
	  
	var dateArray = GET_VAL(edcid, '').split("-");  
	  
	var dateObj = new Date(dateArray[0], Number(dateArray[1])-1, dateArray[2]);  
	
	
	//var dat1 = new Date(arr1[0], arr1[1], arr1[2]);
	//var dat2 = new Date(arr2[0], arr2[1], arr2[2]);
	var diff = dateObj - today;
	
	
	var currDay = 24 * 60 * 60 * 1000;
	var temp = parseInt(diff/currDay);
	
	var GA_day = 280 - temp - 1;
	
	var week = parseInt(parseInt(GA_day)/7);
	var day = Math.floor(parseInt(GA_day)%7);

	SET_VAL(weekid, week);
	SET_VAL(dayid, day);

}

	
function show_calendar(id, formT) {
	cal_id = id;
	formatType = formT;
	var now = document.getElementById(id);
	if(now.tagName != "INPUT")
		now = now.innerText.split("-");
	else
		now = now.value.split("-");
	target1 = document.getElementById(id);
	//alert(document.body.clientTop +" / "+ GetObjectTop(target1) +" / "+ target1.offsetParent.offsetTop +" / "+ document.body.scrollTop);
	//pop_top = document.body.clientTop + GetObjectTop(target1) - document.body.scrollTop;
	pop_top = document.body.clientTop + GetObjectTop(target1);
	pop_left = document.body.clientLeft + GetObjectLeft(target1) -  document.body.scrollLeft;
	if(pop_left>1100)
		pop_left=1100;
	if (now.length == 3) {
		Show_cal(now[0],now[1],now[2]);					
	} else {
		now = new Date();
		Show_cal(now.getFullYear(), now.getMonth()+1, now.getDate());
	}	
	
}

function doOver(el) {
	cal_Day = el.title;

	if (cal_Day.length > 7) {
		el.style.borderColor = "#FF0000";
	}
}

function doOut(el) {
	cal_Day = el.title;

	if (cal_Day.length > 7) {
		el.style.borderColor = "#FFFFFF";
	}
}

function day2(d) {
	var str = new String();
	
	if (parseInt(d) < 10) {
		str = "0" + parseInt(d);
	} else {
		str = "" + parseInt(d);
	}
	return str;
}

function Show_cal(sYear, sMonth, sDay) {
	var Months_day = new Array(0,31,28,31,30,31,30,31,31,30,31,30,31)
	var Month_Val = new Array("01","02","03","04","05","06","07","08","09","10","11","12");
	var intThisYear = new Number(), intThisMonth = new Number(), intThisDay = new Number();

	datToday = new Date();												
	
	intThisYear = parseInt(sYear,10);
	intThisMonth = parseInt(sMonth,10);
	intThisDay = parseInt(sDay,10);
	
	switch(intThisMonth) {
		case 1:
				intPrevYear = intThisYear -1;
				intPrevMonth = 12;
				intNextYear = intThisYear;
				intNextMonth = 2;
				break;
		case 12:
				intPrevYear = intThisYear;
				intPrevMonth = 11;
				intNextYear = intThisYear + 1;
				intNextMonth = 1;
				break;
		default:
				intPrevYear = intThisYear;
				intPrevMonth = parseInt(intThisMonth,10) - 1;
				intNextYear = intThisYear;
				intNextMonth = parseInt(intThisMonth,10) + 1;
				break;
	}
	intPPyear = intThisYear-1
	intNNyear = intThisYear+1

	NowThisYear = datToday.getFullYear();
	NowThisMonth = datToday.getMonth()+1;
	NowThisDay = datToday.getDate();
	
	datFirstDay = new Date(intThisYear, intThisMonth-1, 1);
	intFirstWeekday = datFirstDay.getDay();
	intThirdWeekday = intFirstWeekday;
	
	datThisDay = new Date(intThisYear, intThisMonth, intThisDay);
		
	intPrintDay = 1;
	secondPrintDay = 1;
	thirdPrintDay = 1;
  NxtPrintDay = 1;
	
	Stop_Flag = 0
	
	if ((intThisYear % 4)==0) {
		if ((intThisYear % 100) == 0) {
			if ((intThisYear % 400) == 0) {
				Months_day[2] = 29;
			}
		} else {
			Months_day[2] = 29;
		}
	}
	intLastDay = Months_day[intThisMonth];
	
	
	intPrevYear = intThisYear; 
  intPrevMonth = intThisMonth; 
  intNxtYear = intThisYear; 
  intNxtMonth = intThisMonth; 
  
	if(intThisMonth == 1)
	{
	  intPrevYear = intPrevYear - 1;
	  intPrevMonth = 12;
	  intPrevLastDay = 31;
	}
	else if(intThisMonth == 12)
	{
	  intNxtYear = intNxtYear  + 1;
	  intNxtMonth = 1;
	  intPrevLastDay = Months_day[intThisMonth-1];
	
	}
	else
	{
	   intPrevMonth = intPrevMonth  - 1;
	   intNxtMonth  = intNxtMonth + 1;
	   intPrevLastDay = Months_day[intThisMonth-1];
	}
	Cal_HTML = "<html><body>";
	Cal_HTML += "<form name='calendar'>";
	Cal_HTML += "<table id=Cal_Table border=0 bgcolor='#f4f4f4' cellpadding=1 cellspacing=1 width=100% onmouseover='parent.doOver(window.event.srcElement)' onmouseout='parent.doOut(window.event.srcElement)' style='font-size : 12;font-family:굴림;'>";
	Cal_HTML += "<tr height='35' align=center bgcolor='#f4f4f4'>";
	Cal_HTML += "<td colspan=7 align=center>";
	Cal_HTML += "	<select name='selYear' STYLE='font-size:11;' OnChange='parent.fnChangeYearD(calendar.selYear.value, calendar.selMonth.value, "+intThisDay+")';>";
	for (var optYear=(intThisYear-9); optYear<(intThisYear+10); optYear++) {
		Cal_HTML += "		<option value='"+optYear+"' ";
		if (optYear == intThisYear) Cal_HTML += " selected>\n";
		else Cal_HTML += ">\n";
		Cal_HTML += optYear+"</option>\n";
	}
	Cal_HTML += "	</select>";
	Cal_HTML += "&nbsp;&nbsp;&nbsp;<a style='cursor:hand;' OnClick='parent.Show_cal("+intPrevYear+","+intPrevMonth+","+intThisDay+");'>◀</a> ";
	Cal_HTML += "<select name='selMonth' STYLE='font-size:11;' OnChange='parent.fnChangeYearD(calendar.selYear.value, calendar.selMonth.value, "+intThisDay+")';>";
	for (var i=1; i<13; i++) {	
		Cal_HTML += "		<option value='"+Month_Val[i-1]+"' ";
		if (intThisMonth == parseInt(Month_Val[i-1],10)) Cal_HTML += " selected>\n";
		else Cal_HTML += ">\n";
		Cal_HTML += Month_Val[i-1]+"</option>\n";
	}
	Cal_HTML += "	</select>&nbsp;";
	Cal_HTML += "<a style='cursor:hand;' OnClick='parent.Show_cal("+intNextYear+","+intNextMonth+","+intThisDay+");'>▶</a>";
	Cal_HTML += "</td></tr>";
	Cal_HTML += "<tr align=center bgcolor='#87B3D6' style='color:#2065DA;' height='25'>";
	Cal_HTML += "	<td style='padding-top:3px;' width='24'><font color=black>일</font></td>";
	Cal_HTML += "	<td style='padding-top:3px;' width='24'><font color=black>월</font></td>";
	Cal_HTML += "	<td style='padding-top:3px;' width='24'><font color=black>화</font></td>";
	Cal_HTML += "	<td style='padding-top:3px;' width='24'><font color=black>수</font></td>";
	Cal_HTML += "	<td style='padding-top:3px;' width='24'><font color=black>목</font></td>";
	Cal_HTML += "	<td style='padding-top:3px;' width='24'><font color=black>금</font></td>";
	Cal_HTML += "	<td style='padding-top:3px;' width='24'><font color=black>토</font></td>";
	Cal_HTML += "</tr>";
	for (intLoopWeek=1; intLoopWeek < 7; intLoopWeek++) {
		Cal_HTML += "<tr height='24' align=right bgcolor='white'>"
		for (intLoopDay=1; intLoopDay <= 7; intLoopDay++) {
			if (intThirdWeekday > 0) {	
			  	
			  	
			  var PrevPrintDay =( intPrevLastDay + 1) - intThirdWeekday ;							
				//Cal_HTML += "<td><font color=gray>" + PrevPrintDay; //앞부분
				Cal_HTML += "<td onClick=parent.Calendar_Click(this); title="+intPrevYear+"-"+day2(intPrevMonth).toString()+"-"+day2(PrevPrintDay).toString()+" style=\"cursor:Hand;border:1px solid white; color:gray\">" +PrevPrintDay ;
				intThirdWeekday--;
			} else {
				if (thirdPrintDay > intLastDay) {	
					//Cal_HTML += "<td><font color=gray>"+ NxtPrintDay; //뒷부분
					Cal_HTML += "<td onClick=parent.Calendar_Click(this); title="+intNxtYear+"-"+day2(intNxtMonth).toString()+"-"+day2(NxtPrintDay).toString()+" style=\"cursor:Hand;border:1px solid white; color:gray\">" + NxtPrintDay ;
					NxtPrintDay++;
				} else {
					Cal_HTML += "<td onClick=parent.Calendar_Click(this); title="+intThisYear+"-"+day2(intThisMonth).toString()+"-"+day2(thirdPrintDay).toString()+" style=\"cursor:Hand;border:1px solid white;";
					
					
					if (intThisYear == NowThisYear && intThisMonth==NowThisMonth && thirdPrintDay==intThisDay) {
						Cal_HTML += "background-color:#C6F2ED;";
					}
					
					switch(intLoopDay) {
						case 1:														
							Cal_HTML += "color:red;"
							break;
						//case 7:
						//	Cal_HTML += "color:blue;"
						//	break;
						default:
							Cal_HTML += "color:black;"
							break;
					}
					
					Cal_HTML += "\">"+thirdPrintDay;
				}
				thirdPrintDay++;
				
				if (thirdPrintDay > intLastDay) {								
					Stop_Flag = 1;
				}
			}
			Cal_HTML += "</td>";
		}
		Cal_HTML += "</tr>";
		if (Stop_Flag==1) break;
	}

	Cal_HTML += "<tr height='24' align=right bgcolor='white'>"
  for (tempi=0; tempi < 7; tempi++) {
	Cal_HTML += "<td onClick=parent.Calendar_Click(this); title="+intNxtYear+"-"+day2(intNxtMonth).toString()+"-"+day2(NxtPrintDay).toString()+" style=\"cursor:Hand;border:1px solid white; color:gray\">" + NxtPrintDay ;
	NxtPrintDay++;
	Cal_HTML += "</td>";
	}
	Cal_HTML += "</tr>";
	
	
	Cal_HTML += "</table></form></body></html>";

	var oPopBody = oPopup.document.body;
	oPopBody.style.backgroundColor = "lightyellow";
	oPopBody.style.border = "solid #dcdcdc 1px";
	oPopBody.innerHTML = Cal_HTML;

	var calHeight = null;
	if(oPopBody.document != null)
		calHeight = oPopBody.document.all.Cal_Table.offsetHeight;
	else
		calHeight = oPopBody.offsetHeight;
	//행이 6개 행인지, 5개인지 구분
	

	if (intLoopWeek == 6)	calHeight = 279;
	else	calHeight = 254;
	//alert(pop_top + " / " + target1.offsetHeight);
	var popData = pop_top + target1.offsetHeight;
	//alert(document.body.scrollTop*2 +" / "+GetObjectTop(target1));
	if(GetObjectTop(target1)>1000 && document.body.scrollTop*2+200>GetObjectTop(target1))
		popData-=calHeight+40;
	oPopup.show(pop_left, popData, 195, calHeight, document.body);
}

function fnChangeYearD(sYear,sMonth,sDay){
	Show_cal(sYear, sMonth, sDay);
}

function GetObjectTop(obj)
{
	if (obj.offsetParent == document.body)
		return obj.offsetTop;
	else
		return obj.offsetTop + GetObjectTop(obj.offsetParent);
}

function GetObjectLeft(obj)
{
	if (obj.offsetParent == document.body)
		return obj.offsetLeft;
	else
		return obj.offsetLeft + GetObjectLeft(obj.offsetParent);
}
