<%
	String html = request.getParameter("html");
%>
<html>
<script type="text/javascript" charset="utf-8">
function mainInit(){
	var obj = document.getElementById('BkPrint');
//alert(9);
//obj.NewPrintPage("http://192.168.2.43:8080/EMR_DATA/html/pr_207_4.html","192.168.2.43:8080/EMR_DATA/xml/2017/11_27/207_1840479_01245809_1511763066092.XML^1^0^test2222^1^01245809^홍길동^1998-08-08^M^환자16^15:11:24^유저부서^박의사^IP^출력용도^^^test2222^^^^^^^^환자10^01245809^0^",600,800);
//obj.NewPrintPage("https://preemrdev.hyumc.com:8081/EMR_DATA/html/pr_207_4.html","preemrdev.hyumc.com:8081/EMR_DATA/xml/2017/11_27/207_1840479_01245809_1511763066092.XML^1^0^test2222^1^01245809^홍길동^1998-08-08^M^환자16^15:11:24^유저부서^박의사^IP^출력용도^^^test2222^^^^^^^^환자10^01245809^0^",600,800);

//obj.NewPrintPage("https://preemrdev.hyumc.com:8081/EMR_DATA/html/pr_1240_20.html","preemrdev.hyumc.com:8081/EMR_DATA/xml/2018/1_31/1240_2071414_00596722_1517381512656.XML^1^0^외래 재진 기록지 (각과공통)^1^00596722^https://preemrdev.hyumc.com:8081^^^^2018-02-01 10:22:53^2018-01-31 15:51:52^강*름^전형준^0^^^^^^^^^^^신경외과^2018-01-16^0^",600,800);

//var printParam="1^0^"+xx1.doc[1]+"^"+chosType+"^"+pid+"^"+patInfo[0][1]+"^"+patInfo[0][9]+"^"+patInfo[0][4]+"^"+patInfo[0][3]+"^"+curr_time;
//printParam+="^"+xx1.rec[6]+"^"+userNm2[0][0]+"^"+userNm1[0][0]+"^"+xx1.rec[8]+"^"+""+"^"+""+"^^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^^"+deptNm[0][1]+"^"+xx1.rec[7]+"^0^";
 					
//obj.NewPrintPage("http://192.168.2.43:8080/EMR_DATA/html/pr_207_4.html","192.168.2.43:8080/EMR_DATA/xml/2017/11_27/207_1840479_01245809_1511763066092.XML^1^9^^^^^^^^^^^^^^^^^^^^^^^^^0^",600,800);
//obj.NewPrintPage("http://192.168.2.43:8080/EMR_DATA/html/pr_677_25.html","192.168.2.43:8080/EMR_DATA/xml/2018/1_22/677_2131758_00596722_1516589801406.XML^1^9^^1^00596722^^^^^^2131758^168^00596722GS01784171^20180123^N^1^2^병사용^이*현^677^GS^437^^^^^0^",600,800);
//obj.NewPrintPage("https://preemrdev.hyumc.com:8081/EMR_DATA/html/pr_677_25.html","preemrdev.hyumc.com:8081/EMR_DATA/xml/2018/1_22/677_2131758_00596722_1516589801406.XML^1^9^^1^00596722^^^^^^2131758^168^00596722GS01784171^20180123^N^1^2^병사용^이*현^677^GS^437^^^^^0^",600,800);
//obj.NewPrintPage("http://192.168.2.43:8080/EMR_DATA/html/pr_874_6.html","192.168.2.43:8080/EMR_DATA/xml/2018/1_22/874_2131758_00596722_1516598993603.XML^1^9^^1^00596722^^^^^^1505041^240^00596722GS20170530^20180124^N^1^4^개인용도용^이*현^874^GS^422^^^^^0^",600,800);
//obj.NewPrintPage("https://preemrdev.hyumc.com:8081/EMR_DATA/html/pr_874_6.html","preemrdev.hyumc.com:8081/EMR_DATA/xml/2018/1_22/874_2131758_00596722_1516598993603.XML^1^9^^1^00596722^^^^^^1505041^240^00596722GS20170530^20180126^N^1^4^개인용도용^이*현^874^GS^422^^^^^0^",600,800);
//obj.NewPrintPage("https://preemrdev.hyumc.com:8081/EMR_DATA/html/pr_196_8.html","preemrdev.hyumc.com:8081/EMR_DATA/xml/2018/1_26/196_2131758_00596722_1516929635331.XML^1^9^^1^00596722^^^^^^1505041^329^00596722GS20170530^20180126^N^U^T^R^테스트^196^GS^640^^^^^0^",600,800);


//개별
//obj.NewPrintPage("https://preemrdev.hyumc.com:8081/EMR_DATA/html/pr_1209_18.html","preemrdev.hyumc.com:8081/EMR_DATA/xml/2018/1_25/1209_2131758_00596722_1516849037474.XML^1^9^^1^00596722^^^^^^1505041^281^00596722GS20170530^20180126^N^5^3^공공기관제출용^이*현^1209^GS^522^^^^^0^",600,800);
//멀티
//obj.NewPrintPage("https://preemrdev.hyumc.com:8081/EMR_DATA/html/pr_1209_18.html","preemrdev.hyumc.com:8081/EMR_DATA/xml/2018/1_25/1209_2131758_00596722_1516849037474.XML^1^9^^1^00596722^^^^^^1505041^281^00596722GS20170530^20180126^N^1^1^타병원진료용^이*현^1209^GS^522^^^^^0^",600,800);
//alert(printRet);

//obj.PrintPage("http://192.168.2.43:8080/EMR_DATA/TIF/data16/chartimg16/7111/99170529023027111.tif","1^1^1^test2222^1^01245809^홍길동^1998-08-08^M^환자16^15:11:24^유저부서^박의사^IP^출력용도^^^test2222^^^^^^^^환자10^01245809^0^",600,800);
///////obj.ImagePrintPage("https://preemrdev.hyumc.com:8081/EMR_DATA/14120711100220000.tif","테스트서식","0","테스터","2018-01-31 14:22:45");
//obj.ImagePrintPage("http://192.168.2.43:8080/EMR_DATA/99161206054426081.tif","테스트서식","1","테스터","2018-01-31 14:22:45");

/*
 ---------------------------
신청 
테스트중입니다.fn_procPrint_com[800^600^preemrdev.hyumc.com:8081/EMR_DATA/xml/2018/2_21/789_1921684_00056589_1519188654602.XML^9^N^1^4^개인용도용^김*순^789^NS^1164^]
---------------------------
테스트중입니다.fn_procPrint_com[800^600^preemrdev.hyumc.com:8081/EMR_DATA/xml/2018/2_21/789_1921684_00056589_1519188654602.XML^0^^^^^^^^^]



테스트중입니다.fn_procPrint_com[800^600^preemrdev.hyumc.com:8081/EMR_DATA/xml/2018/2_21/789_1921684_00056589_1519188654602.XML^0^N^1^4^개인용도용^김*순^789^NS^1164^]
*/
//xml/2018/2_20/481_1952898_02697327_1519114342203.XML
//xml/2018/2_20/481_1952898_02697327_1519112766098.XML
 obj.NewPrintPage("https://preemrdev.hyumc.com:8081/EMR_DATA/html/pr_481_129.html","preemrdev.hyumc.com:8081/EMR_DATA/xml/2018/2_20/481_1952898_02697327_1519112766098.XML^1^0^외래 초진 기록지(가정의학과)^1^02697327^https://preemrdev.hyumc.com:8081^111^111^111^2018-02-21 13:10:26^2018-02-20 16:46:06^강*름^박훈기      ^0^^^^^^^^^^^외래 초진 기록지(가정의학과)^2018-01-16^0^",600,800);
 //obj.NewPrintPage("https://preemrdev.hyumc.com:8081/EMR_DATA/html/pr_789_6.html","preemrdev.hyumc.com:8081/EMR_DATA/xml/2018/2_21/789_1921684_00056589_1519188654602.XML^1^9^^1^00056589^https://preemrdev.hyumc.com:8081^^^^^1505041^491^00056589NS20170530^20180221^N^2^4^개인용도용^김*순^789^NS^1164^^^^^0^",600,800);
 
//obj.ImagePrintPage("https://preemrdev.hyumc.com:8081/EMR_DATA/TIF/data16/chartimg16/6081/99161206054426081.tif", "입퇴원요약지(Summary)_1",  '1',"강*름","2018-02-01 10:54:53");
 
//obj.NewPrintPage("http://192.168.2.43:8080/EMR_DATA/html/pr_725_20.html","192.168.2.43:8080/EMR_DATA/xml/2018/1_25/725_2131758_00007186_1516878893576.XML^1^0^외래 초진 기록지(GS) 유방^1^00007186^기*희^111^111^111^2018-01-25 21:36:18^2018-01-25 20:14:53^1840479^최원주      ^^^^^^^^^^^^외래 초진 기록지(GS) 유방^2017-10-17^0^",600,800);
//obj.NewPrintPage("http://192.168.2.43:8080/EMR_DATA/html/pr_196_8.html","192.168.2.43:8080/EMR_DATA/xml/2018/1_26/196_2131758_00596722_1516929635331.XML^1^0^외래 초진 기록지(GS) 유방^1^00007186^기*희^111^111^111^2018-01-25 21:36:18^2018-01-25 20:14:53^1840479^최원주      ^^^^^^^^^^^^외래 초진 기록지(GS) 유방^2017-10-17^0^",600,800);
}
</SCRIPT>

<BODY LEFTMARGIN=0 TOPMARGIN=0 MARGINWIDTH=0 MARGINHEIGHT=0 WIDTH="1270" HEIGHT="878" onload="mainInit();" style="border:'solid #8CBDED 0px';overflow-y:hidden;">
	<object id = "BkPrint" classid="clsid:FF992A61-0A51-4D39-BAFC-E154F5BA8945"  style="display:'none';">
	<!--object id = "BkPrint" classid="clsid:FF992A61-0A51-4D39-BAFC-E154F5BA8945" codebase="http://10.60.210.27/EMR_DATA/applet/BkSdePrintModule.ocx#version=1,0,0,5"  style="display:'none';"-->
	</object>
</BODY>
<html>


