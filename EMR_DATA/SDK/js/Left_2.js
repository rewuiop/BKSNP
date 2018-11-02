var GridString="";
var tree=null;
var temp;
var mygrid;
var scanChart='';
var x1='';

var BK_DOC_CATE = parent.parent.BK_DOC_CATE;
var BK_DOC_DATA = parent.parent.BK_DOC_DATA;
var pid=parent.parent.pid;
BK_SHOW_FRAME = parent.parent.BK_SHOW_FRAME;

var BK_HWAN_JA= parent.parent.BK_HWAN_JA;
var BK_HWAN_JA_NAME=parent.parent.BK_HWAN_JA_NAME;
var BK_USER=parent.parent.BK_USER;
var doctorId = parent.parent.parent.doctorId;
var uDeptCd = parent.parent.parent.uDeptCd;
var BK_REC_DATA = new Array();									
var tempRecStr="";
function init()
{
	BK_REC_DATA = getBitRecdData();
	//BK_REC_DATA = parent.parent.BK_REC_DATA;
	
	if(tree != null)
		GetObj('recList2').innerHTML = ""; 

	VSIJ_MakeXml('1',BK_DOC_CATE,BK_DOC_DATA,BK_REC_DATA);
	if(tree.htmlNode.childNodes[0].childNodes.length>0)
	{
		VSIJ_AddItemToTree(tree,tree.htmlNode.childNodes[0].childNodes[0].id,getIDRecdDataDept(tree.htmlNode.childNodes[0].childNodes[0].id));
	}
	/*if(tree.htmlNode.childNodes[0].childNodes.length>0)
	{
		VSIJ_AddItemToTree(tree,tree.htmlNode.childNodes[0].childNodes[0].id,getIDRecdDataDept(tree.htmlNode.childNodes[0].childNodes[0].id));
		if(tree.htmlNode.childNodes[0].childNodes[0].childNodes.length>0)
			recordCheck(tree.htmlNode.childNodes[0].childNodes[0].childNodes[0].id);
	}*/
	/*
	var recXml = "<item id='rec_root_1' text='전체기록'>";
	temp=[0,null,null,null,null];  //카테고리, 과(보여질 과), 검색, pid, 자기과(자기과 외)
																					
	recXml += VSIJ_MakeRecordXml(BK_DOC_CATE, BK_DOC_DATA, BK_REC_DATA, temp);//BK_SDK.js의 VSIJ_MakeDocumentXml
	

	recXml += "</item>";
	

 
 	tree = MakeTreeToXml('recList', '100%','100%', 'dhx_skyblue', '/EMR_DATA/dhtmlx/dhtmlxTree/imgs/csh_bluebooks/', 1, recXml, LeftClick, null);	

	var x1 = tempRecStr.split(",");
	
	for(var i=0; i<x1.length; i++)
		tree.setItemColor(x1[i], '#FF0000','#FF0000');		

	//document.getElementById('patiInfomation2').innerHTML="<b>&nbsp;&nbsp;&nbsp; "+BK_HWAN_JA[0]+"&nbsp;&nbsp"+BK_HWAN_JA[1]+"&nbsp;&nbsp"+BK_HWAN_JA[3]+"/"+BK_HWAN_JA[16]+"&nbsp;&nbsp"+BK_USER[1]+"&nbsp;&nbsp"+BK_HWAN_JA[12]+"</b>";
	if(BK_HWAN_JA!=null)
		document.getElementById('patiInfomation2').innerHTML="<b>&nbsp;&nbsp; 등록번호:"+BK_HWAN_JA[0]+"&nbsp;&nbsp;&nbsp;성명:"+BK_HWAN_JA[1]+"("+BK_HWAN_JA[3]+"/"+BK_HWAN_JA[8]+")";*/
	document.oncontextmenu=contextMenu;
}


function LeftClick(id)
{
		var interVal = setInterval(function(){
			if(parent.parent.blockDiv!=undefined)
				parent.parent.blockDiv.style.display="inline-block";	
		});
	
		var i=0;
		var j=0;
		var param = new Array();
		tree.openItem(id);
		for(j=0; j<BK_REC_DATA.length; j++)
		{
			var Sid = id.split('_');//
			var recParam = Sid[0].split('*$*');
			if(Sid[1] == BK_REC_DATA[j][2])
			{
				for(i=0; i<BK_DOC_DATA.length; i++)
				{
					if(BK_DOC_DATA[i][0] == BK_REC_DATA[j][5])//서식의코드 ==  기록의 서식코드
					{			
						param = [BK_DOC_DATA[i][0],j,id,BK_REC_DATA[j][3],BK_REC_DATA[j][2],BK_REC_DATA[j][1]];
						//parent.parent.temp = BK_DOC_DATA[i];//body의 temp url
						//parent.parent.temp2 = BK_REC_DATA[j];//서식의 xml
						alert(param);
						parent.parent.SelectTreeItem(1, param); //Main.js (i,j)=>기록 조회
																					//document Code, rocord Code, id, title
						break;
					}
				}
			}
			else if(recParam.length != 1 && Sid[1]==undefined)
			{
				recordCheck(Sid[0]);
				break;
			}	
			else if(Sid[0] == BK_REC_DATA[j][0] && Sid[1]==undefined)
			{
				checkEvent=1;
				VSIJ_AddItemToTree(tree,Sid[0],getIDRecdDataDept(BK_REC_DATA[j][0]));
				//parent.parent.GetObj('rightbody').contentWindow.AdditionTab('1', ['32161121111305070',,,,,BK_REC_DATA[j][1],0,]);
				var tempRecParam = Sid[0]+"*$**$**$**$**$*"+BK_REC_DATA[j][1]+"*$*0*$*";
				recordCheck(tempRecParam);
				break;
			}
		}
		
		setTimeout(function(){
				clearInterval(interVal);
				if(parent.parent.blockDiv!=undefined)
					parent.parent.blockDiv.style.display="none";
		},1500);
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
	
	var recType=document.getElementById('searchType').value;
	if(recType=="default")
	{
		recType=0;
	}
	text1=document.getElementById('rec_input');
	VSIJ_SearchingDocument(tree,'rec_root_5', null, BK_REC_DATA, text1.value,recType);  //recType   0:이름 1:일자

}


function onBtnOpen()//다중기록보기
{
	var selectedId=tree.getAllChecked();
	var tempp=selectedId.split(',');
	var Sid2=new Array();	
			
	for(var i=0; i<tempp.length; i++)
	{
		var tempp2 = tempp[i].split('_');
		Sid2[i]=tempp2[1];
	}	
	
	for(var p=0; p<Sid2.length; p++)
	{
		for(var j=0; j<BK_REC_DATA.length; j++)
		{
			if(Sid2[p]==BK_REC_DATA[j][0])
			{
				//alert("if");
				for(var k=0; k<BK_DOC_DATA.length; k++)
				{					
					if(BK_DOC_DATA[k][0] == BK_REC_DATA[j][5])//서식의코드 ==  기록의 서식코드
					{
						parent.parent.arrTemp[p] = BK_DOC_DATA[k];//body의 temp url
						parent.parent.arrTemp2[p] = BK_REC_DATA[j];//서식의 xml
							//alert('open');					
					}
				}
		  }
	  }
	}	parent.parent.SelectTreeItem(3, [k,j,this.id]); //Main.js (k,j)=>기록 조회 (k:서식data, j:기록data)	
	return;
}

function YearDate()//일자별 
{
	for(var i=0; i<BK_REC_DATA.length; i++)
	{
		BK_REC_DATA[i][12];//create_time
		BK_REC_DATA[i][14];//modify_time
	}
}

