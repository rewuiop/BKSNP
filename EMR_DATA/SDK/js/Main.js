var data="";

var temp;
var temp2;

var arrTemp=new Array();
var arrTemp2=new Array();

var right_body;//=document.getElementById('rightbody');//id�� �޾ƿ���



function SelectTreeItem(type, param,showRec2)//type 0:���� 1: ��� 2:����  3:�ϴܱ��
{
	setObject();
	if(showRec2==1)
	{
		param = param.split('*$*');
		right_body.contentWindow.GetObj('showFrame2').style.display="inline-block";
		
		var showFrame = right_body.contentWindow.GetObj('showFrame');
		var show_iFrame = right_body.contentWindow.GetObj('show_iFrame');
		
		
		for(var j=0;j<showFrame.childNodes.length;j++)
		{
			if(showFrame.childNodes[j]!=undefined)
				showFrame.childNodes[j].childNodes[0].style.height = "500px";
		}
		showFrame.style.height="500px";
		show_iFrame.style.width="810px";
		show_iFrame.style.height="410px";
		show_iFrame.style.display="inline-block";
		
		if(param[6]==0)
		{
			show_iFrame.src = BK_MAIN_PATH+"right_content.jsp?viewType=3&idx=0&Index=0&recIdno="+param[3]+"&recIdx=1&docCode="+param[1]+"&recSeq="+param[0]+"&sdeCheck="+param[6];
			right_body.contentWindow.GetObj('btn_close2').style.display='inline-block'
		}
		else
			show_iFrame.src = BK_MAIN_PATH+"right_content.jsp?viewType=3&idx=0&Index=0&recIdno="+param[3]+"&recIdx=1&docCode="+param[0]+"&recSeq="+param[4]+"&sdeCheck="+param[6];
	}
	else
	{
		var result = right_body.contentWindow.AdditionTab(type, param); //rightMain.js�� AdditionTab (i,-1)
		
		if(result == 1)
			alert('�������� ���� �Ǵ� ��� �Դϴ�');
	}
}

function DeleteTab()
{
	var result = GetObj('rightbody').contentWindow.CloseTab();
	if(result != 0)
		alert('���� ���� �� �����ϴ�.');
}




function setObject()
{
	
	right_body = document.getElementById('rightbody');

}

