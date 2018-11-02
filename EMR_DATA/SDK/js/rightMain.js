var BK_DOC_DATA = parent.BK_DOC_DATA;
var BK_REC_DATA = parent.BK_REC_DATA;
var BK_HWAN_JA = parent.BK_HWAN_JA;
var winTab;
var idx;
var showType;
var docArr;//= parent.temp;
var recArr;//= parent.temp2;


function rightMainInit()
{
	winTab = new WindowTabObj();//보여지는 탭의 갯수
	idx = winTab.cnt;
	winTab.id = 'veiwerDiv';
	winTab.tabId = GetObj('tabMenu'); //tab 영역 객체
	winTab.contentId = GetObj('showFrame'); //CONTENT 영역 객체
	WINTAB = winTab;

	GetObj('showFrame2').style.display="none";
	document.oncontextmenu=contextMenu;
	//BK_HWAN_JA = [['02596394','홍길동','123456-*****','22','M','010-1234-5678','1840479','20170601','ER','20170101']];
	if(parent.parent.deptCd!=parent.parent.uDeptCd)
		return;

	arrTypeVar = parent.parent.arrTypeVar;
	var chosType = arrTypeVarData('chosType');
	var hyubjin = arrTypeVarData('hyubjin');
	if(chosType=="I" || (hyubjin!="" && hyubjin!="N") || (parent.parent.BK_USER[0][4]!='S' && parent.parent.BK_USER[0][4]!='R' && parent.parent.BK_USER[0][4]!='I'))
		return;

	var gubun = arrTypeVarData('gubun');
	var recData = RecDataCheck(BK_HWAN_JA[0][0],BK_HWAN_JA[0][0]+BK_HWAN_JA[0][8]+BK_HWAN_JA[0][7]);
	if(recData!=undefined)
	{
		var recdUser = getUserName(recData[2],parent.uDeptCd);
		var loginUser = getUserName(parent.doctorId,parent.uDeptCd);
		if(recData[1]=="1" && parent.openDeptCheck==true && recData[2]==parent.doctorId || (recData[1]=="1" && recData[2]!=parent.doctorId && recdUser.length>=1 && recdUser[0][4]!="S" && loginUser.length>=1 && loginUser[0][4]=="S"))
			this.AdditionTab(2,[recData[3],recData[0],recData[0],recData[0],recData[0],recData[4]]); //수정모드
		else
			this.AdditionTab(1,[recData[3],recData[0],recData[0],recData[0],recData[0],recData[4]]); //조회모드
	}
	else
	{
		var defaultDoc = selectBerdmprvtAll(BK_HWAN_JA[0][6],BK_HWAN_JA[0][8],parent.parent.doctorId);
		if(defaultDoc.length==0)
			return;
		var defaultChart=0;
		var newDocdata1="";
		var newDocdata2="";
		if(gubun==1)
		{
			for(var i=0;i<defaultDoc.length;i++)
			{
				if(defaultDoc[i][0]==parent.parent.doctorId)
					defaultChart=defaultDoc[i][7];

				if(defaultDoc[i][2].replace(" ","") != "")
				{
					if(parent.openDeptCheck==true)
					{
						newDocdata1 = defaultDoc[i][2];
						newDocdata2 = defaultDoc[i][3];
						//this.AdditionTab(0,[defaultDoc[i][2],defaultDoc[i][3]]); //신규
					}
					break;
				}
			}
		}
		else if(gubun==2)
		{
			for(var i=0;i<defaultDoc.length;i++)
			{
				if(defaultDoc[i][0]==parent.parent.doctorId)
					defaultChart=defaultDoc[i][7];

				if(defaultDoc[i][4].replace(" ","") != "")
				{
					if(parent.openDeptCheck==true)
					{
						newDocdata1 = defaultDoc[i][4];
						newDocdata2 = defaultDoc[i][5];
						//this.AdditionTab(0,[defaultDoc[i][4],defaultDoc[i][5]]); //신규
					}
					break;
				}
			}
		}
		if(defaultChart!=0 && defaultChart!="0")
		{
			var xmlArr = getOPRecdDataDept(BK_HWAN_JA[0][0],parent.parent.uDeptCd,1);
			if(xmlArr.length>0)
			{
				var viewData;
				if(xmlArr[0][9]==1)
					viewData = xmlArr[0][5]+"*$*"+0+"*$*rec_"+xmlArr[0][7]+"*$*"+xmlArr[0][6]+"*$*"+xmlArr[0][7]+"*$*"+xmlArr[0][8]+"*$*"+xmlArr[0][9];
				else
					viewData = xmlArr[0][12]+"*$*"+xmlArr[0][5]+"*$*rec_"+xmlArr[0][7]+"*$*"+xmlArr[0][6]+"*$*"+xmlArr[0][7]+"*$*"+xmlArr[0][8]+"*$*"+xmlArr[0][9];
				parent.SelectTreeItem(1,viewData,1);
			}
		}
		if(newDocdata1!="" && newDocdata2!="")
			this.AdditionTab(0,[newDocdata1,newDocdata2]); //신규
	}
}

function AdditionTab(type, param)//type 0:서식 1: 2:기록 3:병동별환자
{;
	var onOff;
	var len=BK_DOC_DATA.length;
	//var no = 0; //winTab.cnt;// 열린 tab의 cnt
	var no = winTab.cnt;// 열린 tab의 cnt

	if(no>3)
	{
		alert("열린 탭의 갯수는 최대 4개 탭까지 가능합니다.");
		return;
	}
	winTab.tab[no].winStyle= '';//iframe 스타일

	if(param[3]!=undefined && param[3].replace(" ","") != "")
	{
		var selectRecData = getRightRecd('getRightRecd',param[3],param[0]);
		if(selectRecData[0][8]=="1" || selectRecData[0][8]==1)
		{
			//작성자의 부서 전문의
			var staffArr = staffCheck(selectRecData[0][10]);
			var staffYn = "N";
			var sinerCheck="";

			var recdUser = getUserName(selectRecData[0][12]);

			if(parent.BK_USER!=undefined && parent.BK_USER[0][4]!="S")
				sinerCheck="2";

			if(staffArr.length!=0 && sinerCheck!="2") // 전문의 기록은 같은 부서 전문의끼리 수정 하지 못하도록 추가
			{
				for(var i=0;i<staffArr.length;i++)
				{
					if(parent.doctorId==staffArr[i][0])
					{
						staffYn="Y";
						break;
					}
				}
			}
			if(recdUser!=undefined && recdUser[0][4]=="S")
			{
				if(param[6]==1 && parent.doctorId==selectRecData[0][12])
					type = 2;//수정모드
			}
			else
			{
				if(param[6]==1 && (parent.doctorId==selectRecData[0][12] || staffYn=='Y'))
					type = 2;//수정모드
			}
		}
	}

	var j=-1,k=0;
	for(k=0;k<winTab.tab.length;k++)
	{
		//if(winTab.tab[k].id.indexOf('document')!=-1)
		if(winTab.tab[k].state==0 || winTab.tab[k].state=="0")
			j = winTab.tab[k].idx;
	}


		if(type==0)//작성
		{
			winTab.tab[no].id = 'document_'+idx; //no : unique하게 관리
			winTab.tab[no].title = param[1];
			winTab.tab[no].type = 'doc';
			winTab.tab[no].state = 0;
			//winTab.tab[no].docData = param[0];//doc  code__//BK_DOC_DATA[docIdx]; main에서 찾은 해당 서식에대한 data
			winTab.tab[no].winSrc = BK_MAIN_PATH+"right_content.jsp?viewType=0&idx="+no+"&Index="+idx+"&docCode="+param[0];//작성 0, 기록 1, 수정 2 기타 3, idx 탭의 index
			if(GetObj('show_iFrame').src.indexOf("right_content")!=-1)
				winTab.tab[no].winStyle='width:820px;height:500px;overflow:scroll;';
			else
				winTab.tab[no].winStyle='width:820px;height:910px;overflow:scroll;';
			winTab.tab[no].clickOn = "<table cellpadding='0' cellspacing='0' border='0' padding='0 >"
		  		      							+"<tr padding='0'><td  class='gap_l_on_blue' padding='0' onClick='Set("+idx+")'></td><td align='center'  width='150px' class='on_blue' onClick='Set("+idx+")' ><span class='green' title='"+winTab.tab[no].title+"'>##</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='닫기' title='닫기' onClick='CloseSet("+idx+")' ></td><td class='gap_r_on_blue' ></td></td></tr></table>"

		  winTab.tab[no].clickOff = "<table cellpadding='0' cellspacing='0' border='0'  padding='0' >"
		  		      							+ "<tr padding='0'><td class='gap_l_off_blue' padding='0' onClick='Set("+idx+")'><td><td  align='center'  width='150px' class='off_blue' onClick='Set("+idx+")' ><span class='green' title='"+winTab.tab[no].title+"'>##</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='닫기' title='닫기' onClick='CloseSet("+idx+")' ></td><td class='gap_r_off_blue' ></td></td></tr></table>"
		  //parent.parent.ChangeRecentDoc(docIdx, ONE_DOC_DATA[1]);

		}
		else if(type==1)//기록보기
		{
			if(param[5]==undefined || param[5].replace(" ","")=="" )
				return;
			var docCode = param[0];
			var recIdx = param[1];//Seq_no
			var recIdno=param[3];

			winTab.tab[no].id = 'record_'+idx;
			winTab.tab[no].title = param[5].split("[")[0];
			winTab.tab[no].type = 'rec';
			//winTab.tab[no].docData = parent.temp; //서식과 기록데이터를 같이 띄움
			//winTab.tab[no].recData = parent.temp2;
			winTab.tab[no].state = 1;
			if(GetObj('show_iFrame').src.indexOf("right_content")!=-1)
				winTab.tab[no].winStyle='width:820px;height:500px;overflow:scroll;';
			else
				winTab.tab[no].winStyle='width:820px;height:910px;overflow:scroll;';

			/*if(winTab.tab[no].docData[3] == '7')
				winTab.tab[no].winSrc = BK_MAIN_PATH+"/ED_Viewer.jsp?viewType=1&docData="+param[0]+"&recCode="+param[4]+"&Index="+idx;
			else*/
			if(param[6]==0)
				winTab.tab[no].winSrc = BK_MAIN_PATH+"right_content.jsp?viewType=1&idx="+no+"&Index="+idx+"&recIdno="+recIdno+"&recIdx="+recIdx+"&docCode="+param[1]+"&recSeq="+param[0]+"&sdeCheck="+param[6];
			else
				winTab.tab[no].winSrc = BK_MAIN_PATH+"right_content.jsp?viewType=1&idx="+no+"&Index="+idx+"&recIdno="+recIdno+"&recIdx="+recIdx+"&docCode="+param[0]+"&recSeq="+param[4]+"&sdeCheck="+param[6];

			winTab.tab[no].clickOn = "<table cellpadding='0' cellspacing='0' border='0'  padding='0'>"
		  		      							+"<tr padding='0'><td  class='gap_l_on' onClick='Set("+idx+")' padding='0'></td><td width='150px' class='on' align='center' onClick='Set("+idx+")' ><span style='vertical-align:middle' class='red' title='"+winTab.tab[no].title+"'>##</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='닫기' title='닫기' onClick='CloseSet("+idx+")' ></td><td class='gap_r_on' onClick='Set("+idx+")' ></td></td></tr></table>";

		   winTab.tab[no].clickOff = "<table cellpadding='0' cellspacing='0' border='0'  padding='0'>"
		  		      							+ "<tr padding='0'><td class='gap_l_off' onClick='Set("+idx+")' padding='0'></td><td width='150px' class='off'  align='center' onClick='Set("+idx+")' ><span style='vertical-align:middle' class='red' title='"+winTab.tab[no].title+"'>##</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='닫기' title='닫기' onClick='CloseSet("+idx+")' ></td><td class='gap_r_off' onClick='Set("+idx+")'></td></td></tr></table>";

		}
		else  if(type==2) //수정
		{
			var docCode = param[0];
			var recIdx = param[1];//Seq_no
			var recIdno=param[3];

			winTab.tab[no].id = 'document_'+idx; //no : unique하게 관리
			winTab.tab[no].title = param[5];
			winTab.tab[no].type = 'doc';
			winTab.tab[no].state = 0;
			//winTab.tab[no].docData = param[0];//doc  code__//BK_DOC_DATA[docIdx]; main에서 찾은 해당 서식에대한 data
			//winTab.tab[no].winSrc = BK_MAIN_PATH+"right_content.jsp?viewType=2&idx="+no+"&Index="+idx+"&docCode="+param[0]+"&recIdno="+param[2];//작성 0, 기록 1, 수정 2 기타 3, idx 탭의 index
			winTab.tab[no].winSrc = BK_MAIN_PATH+"right_content.jsp?viewType=2&idx="+no+"&Index="+idx+"&recIdno="+recIdno+"&recIdx="+recIdx+"&docCode="+param[0]+"&recSeq="+param[4]+"&sdeCheck="+param[6];
			if(GetObj('show_iFrame').src.indexOf("right_content")!=-1)
				winTab.tab[no].winStyle='width:820px;height:500px;overflow:scroll;';
			else
				winTab.tab[no].winStyle='width:820px;height:910px;overflow:scroll;';
			winTab.tab[no].clickOn = "<table cellpadding='0' cellspacing='0' border='0' padding='0 >"
		  		      							+"<tr padding='0'><td  class='gap_l_on_blue' onClick='Set("+idx+")' padding='0'></td><td align='center'  width='150px' class='on_blue' onClick='Set("+idx+")' ><span style='vertical-align:middle' class='green' title='"+winTab.tab[no].title+"'>##</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='닫기' title='닫기' onClick='CloseSet("+idx+")' ></td><td class='gap_r_on_blue' ></td></td></tr></table>"

		  winTab.tab[no].clickOff = "<table cellpadding='0' cellspacing='0' border='0'  padding='0' >"
		  		      							+ "<tr padding='0'><td class='gap_l_off_blue' onClick='Set("+idx+")' padding='0'><td><td  align='center'  width='150px' class='off_blue' onClick='Set("+idx+")' ><span style='vertical-align:middle' class='green' title='"+winTab.tab[no].title+"'>##</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='닫기' title='닫기' onClick='CloseSet("+idx+")' ></td><td class='gap_r_off_blue' ></td></td></tr></table>"

		}
	/*
		else if(type==3)//다중기록보기
		{
			var docIdx = param[0];
			var recIdx = param[1];
			winTab.tab[no].id = 'records_'+idx;
			winTab.tab[no].title = '다중기록보기';
			winTab.tab[no].type = 'rec';//multirec
			winTab.tab[no].docData = parent.arrTemp; //서식과 기록데이터를 같이 띄움
			winTab.tab[no].recData = parent.arrTemp2;

			winTab.tab[no].winSrc = BK_MAIN_PATH+"/multiRight_contents.jsp?viewType=1&idx="+no+"&Index="+idx;
			winTab.tab[no].clickOn = "<table cellpadding='0' cellspacing='0' border='0'  padding='0'>"
		  		      							+"<tr padding='0'><td  class='gap_l_on' padding='0'></td><td width='150px' class='on' align='center'><span style='vertical-align:middle' class='red' title='"+winTab.tab[no].title+"'>##</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='닫기' title='닫기' onClick='CloseSet("+idx+")' ></td><td class='gap_r_on' ></td></td></tr></table>";

		   winTab.tab[no].clickOff = "<table cellpadding='0' cellspacing='0' border='0'  padding='0'>"
		  		      							+ "<tr padding='0'><td class='gap_l_off' padding='0'></td><td width='150px' class='off'  align='center' ><span style='vertical-align:middle' class='red' title='"+winTab.tab[no].title+"'>##</span><img style='vertical-align:middle;float:right;cursor:pointer;cursor:hand' src='images/closeIcon.png' id='btn_close'  alt='닫기' title='닫기' onClick='CloseSet("+idx+")' ></td><td class='gap_r_off' onClick='Set("+idx+")'></td></td></tr></table>";
			}

	else if(type==4)//병동별환자
		{
			var docIdx = param[0];
			var recIdx = param[1];
			var wardptId=param[2];
			var wardIpdate=param[3];
			winTab.tab[no].id = 'document_'+idx; //idx : unique하게 관리
			winTab.tab[no].title = parent.temp[2];//데이터배열 왼쪽에서 받은 data arr (메인에서 받은 데이터로)
			winTab.tab[no].type = 'doc';
			winTab.tab[no].docData = parent.temp;//BK_DOC_DATA[docIdx]; main에서 찾은 해당 서식에대한 data
			winTab.tab[no].winSrc = BK_MAIN_PATH+"/ward_rightContent.jsp?viewType=0&idx="+idx+"&wardptId="+wardptId+"&wardIpdate="+wardIpdate;//작성 0, 기록 1, 수정 2 기타 3, idx 탭의 index
			winTab.tab[no].winStyle='width:820px;height:910px;overflow:scroll;';
			winTab.tab[no].clickOn = "<table cellpadding='0' cellspacing='0' border='0' padding='0'>"
		  		      							+"<tr padding='0'><td width='250px' align='center' class='"+onOff+"_on' padding='0'><span style='vertical-align:middle' class='green' title='"+winTab.tab[no].title+"'>##</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='닫기' title='닫기' onClick='CloseSet("+idx+")' ></td><td class='r_line'></td></tr></table>"

		  winTab.tab[no].clickOff = "<table cellpadding='0' cellspacing='0' border='0'  padding='0'>"
		  		      							+ "<tr padding='0'><td width='250px' align='center' class='"+onOff+"_off' padding='0'><span style='vertical-align:middle' class='green' title='"+winTab.tab[no].title+"'>##</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='닫기' title='닫기' onClick='CloseSet("+idx+")' ></td><td class='r_line'></td></tr></table>"
		  parent.parent.ChangeRecentDoc(docIdx, parent.temp[2]);
		}
		*/
	winTab.tab[no].idx = idx;
	winTab.AddTab(no);

	/*if(type ==2)
	{
		GetObj(winTab.tab[no].id).style.overflowX = "auto";
		GetObj(winTab.tab[no].id).style.overflowY = "auto";
	}
	else*/
	{
		GetObj(winTab.tab[no].id).style.overflowX = "hidden";
		GetObj(winTab.tab[no].id).style.overflowY = "hidden";
	}

	callFunc(winTab.tab[no].idx);//마지막 탭이 생성되었을때

	idx++;
	if(j>-1 && (type == 0 || type == 2))
	{
		//alert("입력할 수 있는 화면은 하나만 열 수 있습니다.");
		//return;
		winTab.CloseTab(j);

	}
}
var closeCheck = 0;
function CloseSet(idx)
{
	closeCheck=1;
	winTab.CloseTab(idx);
}

function Set(idx)//onclick되었을때 호출
{
	if(closeCheck==1)
	{
		closeCheck = 0;
		return;
	}
	winTab.ShowHideWindow(idx);//idx id
}

function callFunc(id)
{
	winTab.ShowHideWindow(id);
}

function getDocData() //tab idx
{
	return docArr;//return winTab.tab[no].docData;//서식 배열 return
}

function getRecData()
{
	return recArr;//return winTab.tab[no].recData;//기록 배열 return
}

function CloseTab()
{
	var x1 = winTab.CloseTab();
	return x1;
}

function GetTabIdx(idx)
{
	for(var i=0; i<winTab.cnt; i++)
	{
		if(winTab.tab[i].idx == idx)
			return i;
	}

	return -1;
}



function showFrame2Close()
{
	var show_iFrame = parent.right_body.contentWindow.GetObj('show_iFrame');
	show_iFrame.contentWindow.onBtnClose2();
}
