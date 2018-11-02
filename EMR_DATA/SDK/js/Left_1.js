//BK_HWAN_JA[0]+"　　"+BK_HWAN_JA[1]+"　　　"+BK_HWAN_JA[3]+"/"+BK_HWAN_JA[16]+"　　"+BK_HWAN_JA[4]+"　　"+BK_HWAN_JA[5]+"cm 　　"+BK_HWAN_JA[6]+"kg 　　"+BK_HWAN_JA[10]+"　　"+BK_HWAN_JA[12]+" ("+BK_DAM_DOC[1]+")</font>　 "
var GridString="";
var tree;
var temp;
var recentArr=new Array();
var cnt=0;
var mygrid;
var BK_DOC_CATE;// = parent.parent.BK_DOC_CATE;
var BK_DOC_DATA;// = parent.parent.BK_DOC_DATA;
var BK_REC_DATA;// = parent.parent.BK_REC_DATA;
var BK_DOC_DEPT;

//SEQ_NO,CODE,NAME,FOLDER,PID,DOCTYPE,FILE_INPUT,FILE_VIEW,FILE_PRINT,FILE_MODIFY,DESCRIPTION,COMMON_CODE,FILE_DOCU

var BK_HWAN_JA=parent.parent.BK_HWAN_JA;
var BK_HWAN_JA_NAME=parent.parent.BK_HWAN_JA_NAME;
var BK_USER=parent.parent.BK_USER;
//alert(BK_HWAN_JA);
//var BK_USER = parent.parent.parent.BK_USER;
var header_dept=parent.parent.parent.header_dept;
var patDepartment=parent.parent.parent.deptCd;
var doctorId = parent.parent.parent.doctorId;
var uDeptCd = parent.parent.parent.uDeptCd;
var userIdno=parent.parent.userId;
var pid=parent.parent.parent.ptIdno;
var patRoom='';
var patWard='';
var ipTime='';
var mTime=GetDate();
var mcode='';
var docSeq='';
var des='';
var desArr='';
var fsGubun='0';
var ipaddress = parent.parent.parent.ipaddress;

if(header_dept=='I')
{
	patRoom=BK_HWAN_JA[27];
	parWard=BK_HWAN_JA[26];
	ipTime="17:52";//BK_HWAN_JA[30];

}
else
{
	patRoom="0";
	parWard="0";
	ipTime="0";
}

var CateRenderNo=0;
function TreeRender()
{
	for(var i=0;i<5;i++)
	{
		if(CateRenderNo >= parent.parent.BK_DOC_CATE.length)
			return;
		LeftClick("cate_"+parent.parent.BK_DOC_CATE[CateRenderNo][0]);
		tree.closeItem("cate_"+parent.parent.BK_DOC_CATE[CateRenderNo][0])
		CateRenderNo++;
	}
	setTimeout('TreeRender();', 100);

}
function Leftinit(pageNum)
{
	if(tree != null)
	{
		GetObj('docList').innerHTML = "";
	}

	if(ipaddress=="192.168.6.144" || ipaddress=="192.168.6.145" || ipaddress=="192.168.6.146" || ipaddress=="192.168.6.147" || ipaddress=="192.168.6.249" || ipaddress=="192.168.6.76" || SERVERADDR.indexOf('preemrdev')!=-1)
		BK_DOC_DEPT = getDeptDataSpecial(uDeptCd);
	else
	{
		if(uDeptCd=="PD" || uDeptCd=="MC" || uDeptCd=="NN")
		{
			var deptIn1 = ['PD','MC','NN'];
			var deptIn = new Array();
			for(var k=0;k<3;k++)
			{
				if(deptIn1[k]!=uDeptCd)
					deptIn[deptIn.length] = deptIn1[k];
			}
			BK_DOC_DEPT = getInDeptData(uDeptCd,deptIn[0],deptIn[1]);
		}
		else
			BK_DOC_DEPT = getDeptData(uDeptCd);
	}

	BK_DOC_CATE = getCateData();
	BK_DOC_DATA = getDocData(fsGubun);

	var page = '0';
	if(pageNum!=null)
		page = '5';
	VSIJ_MakeXml(page,BK_DOC_CATE,BK_DOC_DATA,BK_DOC_DEPT);
	tree.openItem("dept_root_0");
	document.oncontextmenu=contextMenu;
}


var treeClickHis=new Array();
function IsTreeClicked(id)
{
	var len=treeClickHis.length;
	var i;
	for( i=-0;i<len;i++)
		if(treeClickHis[i]==id)
			return true;
	treeClickHis[i]=id;
	return false;
}

function LeftClick(id)
{
	var i=0;
	var Sid = id.split('_');

	//alert(id);
	tree.openItem(id);

	if(Sid[0]=='cate')
	{
		/*
		if(tree.hasChildren(id)=='1')
			tree.deleteChildItems(id);

		if(IsTreeClicked(id)) return;

		BK_DOC_DATA = parent.parent.BK_DOC_DATA;
		var leng=BK_DOC_DATA.length;
		//alert("서식의 길이는="+leng);
		for(i=0; i<leng; i++)
		{
			if(BK_DOC_DATA[i][2] == Sid[1])
			 	tree.insertNewItem(id, 'doc_'+BK_DOC_DATA[i][0],  BK_DOC_DATA[i][1], 0, 'book.gif', 'book.gif', 'book.gif');
		}*/
	}



	if(Sid[0]=='doc')
	{

		var interVal = setInterval(function(){
			if(parent.parent.blockDiv!=undefined)
				parent.parent.blockDiv.style.display="inline-block";
		});

		//authWrite(pid,userIdno);
		//alert(Sid[1]);
		for(i=0; i<BK_DOC_DATA.length; i++)
		{
			if(Sid[1]==BK_DOC_DATA[i][0])//code
			{

				if(BK_USER.length==0)
				{
					alert("의사정보가 정확하지 않습니다. 기록을 작성 할 수 없습니다. ");
					return;
				}
			/*	if(BK_DOC_DATA[i][3]=='7')
				{
					var edUrl = "/EMR_DATA/ED_Viewer.jsp?docData="+BK_DOC_DATA[i][0]+"&recData=";
					parent.parent.SelectTreeItem(2,['0',edUrl,BK_DOC_DATA[i][1]]);
					break;
				}*/
				parent.parent.parent.recentIdx=i;//Index.js
				//parent.parent.SelectTreeItem(0,[Sid[1],BK_DOC_DATA[i][1]]);
				if(BK_DOC_DATA[i][2]=="1962")
				{
					var firstRec = firstRecCheck(BK_HWAN_JA[0][0],Sid[1],BK_HWAN_JA[0][0]+BK_HWAN_JA[0][8]+BK_HWAN_JA[0][7]);
					if(firstRec==undefined)
						parent.parent.SelectTreeItem(0,[Sid[1],BK_DOC_DATA[i][1]]); //신규
					else if(firstRec[1]=="1")
						parent.parent.SelectTreeItem(2,[Sid[1],firstRec[0],firstRec[0],firstRec[0],firstRec[0],BK_DOC_DATA[i][1]]); //수정모드
					else
						parent.parent.SelectTreeItem(1,[Sid[1],firstRec[0],firstRec[0],firstRec[0],firstRec[0],BK_DOC_DATA[i][1]]); //조회모드
				}
				else
					parent.parent.SelectTreeItem(0,[Sid[1],BK_DOC_DATA[i][1]]); //신규

				break;
			}
		}

		setTimeout(function(){
				clearInterval(interVal);
				if(parent.parent.blockDiv!=undefined)
					parent.parent.blockDiv.style.display="none";
		},1500);

/*
		if(BK_USER!=null && BK_USER[3]!=null)
		{
			var s=SendServerCall('userDocSelect', ['userId'], [[BK_USER[3]]], "/EMR_DATA/updateData.jsp", null); //ajax로 새로 저장된 최근기록 가져오기

				if(s.itemCount[0]>0)//만약 있다면
				{
					onAddRecentList(docSeq);
				}
				else if(s.itemCount[0]==0) //만약 비어있다면
				{
					var a = SendServerCall('userDocInsert', ['oType','oCode','objType','objCode','desc','modiTime','modifier'], [['2',BK_USER[3],'2',,docSeq,mTime,BK_USER[3]]], "/EMR_DATA/updateData.jsp", null);
				}
			}*/
	}





	cnt++;

	for(var k=cnt; k<=cnt; k++)
	{
			cnt=cnt-1;
			recentArr[cnt]=i;
	}

}

function SetClick(id)
{
	var i=0;
	var Sid = id.split('_');
	//alert(id);
	tree.openItem(id);
	var returnCode = "";
	var returnName = "";
	if(Sid[0]=='doc')
	{
		for(i=0; i<BK_DOC_DATA.length; i++)
		{
			if(Sid[1]==BK_DOC_DATA[i][0])//code
			{
				returnCode = BK_DOC_DATA[i][0];
				returnName = BK_DOC_DATA[i][1];
				break;
			}
		}
		window.returnValue=returnCode+"*$*"+returnName;
		window.close();
	}
}

function onAddRecentList(docSeq)
{
	var i=0;
	var k=0;
	var inum=0;
	var tempSeq='';
	var flag=0;
	var s=SendServerCall('userDocSelect', ['userId'], [[BK_USER[3]]], "/EMR_DATA/updateData.jsp", null); //ajax로 새로 저장된 최근기록 가져오기
	des=s.getKeyValue(0,0,'DESCRIPTION');
	desArr=des.split('^');

	var leng=desArr.length;


		if(leng==10)//배열이 10개일때
		{
			for(i=0; i<leng; i++)
			{
				if(desArr[i]==docSeq)
				{
					inum=i;
					flag=1;
				}
			}

			if(flag==0)//같은 Seq가 없을때
			{
				for(k=0; k<9; k++)
				{
					desArr[k]=desArr[k+1];
				}
				desArr[9]=docSeq;
			}

			else if(flag==1)//같은 Seq가 있을때
			{
				for(k=inum; k<9; k++)
				{
					desArr[k]=desArr[k+1];
				}
				desArr[9]=docSeq;
			}

			des='';

			for(var k=0; k<10; k++)
			{
				des+=desArr[k];
				if(k!=9){des+="^";}
			}
			SendServerCall('userDocUpdate',['des','userId'],[[des,BK_USER[3]]], "/EMR_DATA/updateData.jsp", null);
		}
//-----------------------------------------------------------------------------------------------
		else if(leng<10)//배열이 10개 미만일때
		{
			for(i=0; i<leng; i++)
			{
				if(desArr[i]==docSeq)
				{
					inum=i;
					flag=1;
				}
			}

			if(flag==0)//같은 Seq가 없을때
			{
				desArr[leng]=docSeq;
			}
			else if(flag==1)//같은 Seq가 있을때
			{
				for(k=inum; k<leng; k++)
				{
					desArr[k]=desArr[k+1];
				}
				desArr[leng]=docSeq;
			}

			des='';

			for(k=0; k<leng; k++)
			{
				des+=desArr[k];
				if(k!=leng){des+="^";}
			}
			SendServerCall('userDocUpdate',['des','userId'],[[des,BK_USER[3]]], "/EMR_DATA/updateData.jsp", null);
		}
}

function onBtnRefresh()
{
		location.reload(true);
}

function onBtnSearch()
{
	var text1;
	var data_arr;
	var j=0;

	text1=document.getElementById('doc_input');
	VSIJ_SearchingDocument(tree,'mainroot_7', BK_DOC_DATA, null, text1.value); //

}

function onPlusTree()
{
	if(tree.getSelectedItemId())
	{
		var tId=tree.getSelectedItemId();
		var tName=tId.split('_');

	}
else
	alert("선택된 서식이 없습니다");
}



