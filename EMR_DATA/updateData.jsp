<%@page import = "java.util.Properties"%>
<%@page contentType="text/html;charset=EUC-KR"%>
<%@page import = "java.sql.*"%>
<%@page import = "java.io.*"%>
<%@page import = "org.w3c.dom.*"%>
<%@page import = "javax.xml.parsers.*"%>
<%@page import = "org.w3c.dom.*"%>
<%@page import = "org.xml.sax.InputSource"%>
<%@page import = "java.util.*, javax.naming.*"%>
<%@page import = "java.lang.System"%>
<%@page import = "javax.sql.DataSource "%>
<%@ include file="/SDK/BK_SDK.jsp" %>
<script src='/EMR_DATA/SDK/BK_SDK.js?v=1.0.4'></script>
<%!
String GetTimeString(java.util.Date tdate)
{
		String currentTime="";
		currentTime=Integer.toString(tdate.getYear()+1900);

		int tval = tdate.getMonth()+1;
		if(tval <10)
			currentTime += "-0"+Integer.toString(tval);
		else
			currentTime += "-"+Integer.toString(tval);

		tval = tdate.getDate();
		if(tval <10)
			currentTime += "-0"+Integer.toString(tval);
		else
			currentTime += "-"+Integer.toString(tval);

		tval = tdate.getHours();
		if(tval <10)
			currentTime += " 0"+Integer.toString(tval);
		else
			currentTime += " "+Integer.toString(tval);

		tval = tdate.getMinutes();
		if(tval <10)
			currentTime += ":0"+Integer.toString(tval);
		else
			currentTime += ":"+Integer.toString(tval);

		tval = tdate.getSeconds();
		if(tval <10)
			currentTime += ":0"+Integer.toString(tval);
		else
			currentTime += ":"+Integer.toString(tval);

		return currentTime;
}
%>
<%
String reqData = request.getParameter("reqData");
List res=ProcessRequest(reqData);
String fname = getRequestHeadInfo(res, 0, "name");

if(fname.equals("updatePhrasal"))
{
	String seqNo=getRequestValue(res, 0, 0, "seqNo");
	java.util.Date tDate=new java.util.Date();
	String curDate=GetTimeString(tDate);
	
	if(seqNo.equals("-1"))
	{
		String sqlStr = "INSERT INTO BERPMPHRA  (SEQ_NO,DEPARTMENT,NAME,FOLDER,PID,POSITION,DESCRIPTION,KEYWORD,MODIFY_TIME,MODIFIER,CATEGORY,TYPE)"
										+" VALUES(AUTO_SEQUENCE_PHRASAL.NEXT_VAL,?,?,?,?,?,?,?,?,?,?,?,?)";
		String[][] param= new String[1][11];//MakeSqlParam(res, 0, "DEPARTMENT^NAME^FOLDER^PID^POSITION^DESCRIPTION^KEYWORD^MODIFY_TIME^MODIFIER^CATEGORY^TYPE");
		param[0][0]=getRequestValue(res, 0, 0, "DEPARTMENT");
		param[0][1]=getRequestValue(res, 0, 0, "NAME");
		param[0][2]=getRequestValue(res, 0, 0, "FOLDER");
		param[0][3]=getRequestValue(res, 0, 0, "PIID");
		param[0][4]=getRequestValue(res, 0, 0, "POSITION");
		param[0][5]=getRequestValue(res, 0, 0, "DESCRIPTION");
		param[0][6]=getRequestValue(res, 0, 0, "KEYWORD");
		param[0][7]=curDate;
		param[0][8]=getRequestValue(res, 0, 0, "USERID");
		param[0][9]=getRequestValue(res, 0, 0, "CATEGORY");
		param[0][10]=getRequestValue(res, 0, 0, "TYPE");
		int result = DoSqlUpdate_PS(sqlStr, param);
		out.clear();
		if(result != 1)
		{
			out.println("Error");
			return;
		}
			
		sqlStr = "SELECT BERPMPHRA SEQ_NO WHERE MODIFIER=? AND MODIFIER_TIME=? AND NAME=? AND PID=?";
		String[] param1 = new String[4];
		param1[0]=param[0][8];
		param1[1]=curDate;
		param1[2]=param[0][1];
		param1[3]=param[0][3];
		List res1=DoSql_PS(sqlStr, param1);
		if(res1 == null || res1.size()<2)
		{
			out.print("Error");
			return;
		}
		HashMap hm=(HashMap)res1.get(1);
		seqNo=(String)hm.get("SEQ_NO");
		out.print("SEQ_NO:"+seqNo);
	}
	else 
	{
		String sqlStr = "UPDATE BERPMPHRA SET DEPARTMENT=?,NAME=?,FOLDER=?,PID=?,POSITION=?,DESCRIPTION=?,KEYWORD=?,MODIFY_TIME=?,MODIFIER=?,CATEGORY=?,TYPE=? WHERE SEQ_NO=?";
		String[][] param= new String[1][12];
		param[0][0]=getRequestValue(res, 0, 0, "DEPARTMENT");
		param[0][1]=getRequestValue(res, 0, 0, "NAME");
		param[0][2]=getRequestValue(res, 0, 0, "FOLDER");
		param[0][3]=getRequestValue(res, 0, 0, "PIID");
		param[0][4]=getRequestValue(res, 0, 0, "POSITION");
		param[0][5]=getRequestValue(res, 0, 0, "DESCRIPTION");
		param[0][6]=getRequestValue(res, 0, 0, "KEYWORD");
		param[0][7]=curDate;
		param[0][8]=getRequestValue(res, 0, 0, "USERID");
		param[0][9]=getRequestValue(res, 0, 0, "CATEGORY");
		param[0][10]=getRequestValue(res, 0, 0, "TYPE");
		param[0][11]=seqNo;
		int result = DoSqlUpdate_PS(sqlStr, param);
		out.clear();
		out.println(String.valueOf(result));
	}
	//oput
		
}
else if(fname.equals("deletePhrasal"))
{
	String seqNo=getRequestValue(res, 0, 0, "seqNo");
	String sqlStr="DELETE BERPMPHRA WHERE SEQ_NO=?";
	String[][] param= MakeSqlParam(res, 0, "SEQ_NO");
	int result = DoSqlUpdate_PS(sqlStr, param);
	out.clear();
	out.println(String.valueOf(result));
}

else if(fname.equals("getRecAddress"))
{
	String sqlStr="SELECT FILENAME, MODIFY_TIME, SIGNER_CODE2, COSIGNER_CODE2 FROM(SELECT * FROM BERDMRECD WHERE CODE= ? order by SEQ_NO desc) where 1=1";
	String recCode = getRequestValue(res,0,1,"recCode"); //0:row 1:col
	
	String[] param3 = new String[1];
	param3[0]=recCode;

	out.println("recCode="+recCode);
	out.println("param3="+param3[0]);
	
	List result = DoSql_PS(sqlStr, param3);
	
	out.clear(); 
	MakeResponse4String("FILENAME", result, null,out);



}

else if(fname.equals("getRecentRec"))
{
	String sqlStr="SELECT T.COMMON_CODE, T.NAME, A.* FROM (SELECT S.* FROM BERDMRECD S, ( SELECT CODE, MAX(SEQ_NO) AS SN FROM BERDMRECD WHERE STATUS='0' GROUP BY CODE ) B WHERE S.CODE = B.CODE AND B.CODE = ?  AND S.SEQ_NO = B.SN ) A, ( SELECT S1.* FROM BERDHDOCU S1, ( SELECT CODE, MAX(CAST(VERSION AS INT)) AS VS FROM BERDHDOCU WHERE FOLDER='0' GROUP BY CODE ) S2  WHERE S1.CODE = S2.CODE AND S1.VERSION = CONVERT(VARCHAR(20),S2.VS) ) T WHERE T.CODE = A.DOC_CODE  AND 1=1 ORDER BY MODIFY_TIME ASC";

	String recCode = getRequestValue(res,0,1,"recCode");	
//SEQ_NO, CODE, STATUS,DOC_CODE,PTID,RPID,CATEGORY1,CATEGORY2,CATEGORY3,CREATOR_CODE,CREATE_TIME,MODIFIER_CODE,MODIFY_TIME,SIGNER_CODE,SIGN_TIME,COSIGNER_CODE,COSIGN_TIME,PRINTED,FILENAME,RECORDTYPE,INCOMPLETE,TEMPSAVE,DEPARTMENT,CHOS_NO,SIGNLEVEL,EXT_RECD_CODE,DOC_VER,INSF_DOC_CODE,SIGNER_CODE2,SIGN_TIME2,COSIGNER_CODE2,COSIGN_TIME2,RECORD_TIME,COSIGN_CANDIATE_CD
	String[] param4 = new String[1];
	param4[0]=recCode;
	
	
	List result=DoSql_PS(sqlStr,param4);
	out.clear();
	MakeResponse4String("RECENT_REC", result, null,out);

}

else if(fname.equals("getDocumentData"))
{
	String sqlStr="SELECT C.* FROM BERDHDOCU C, ( SELECT MAX(A.SEQ_NO) AS SN, B.CODE, B.VS FROM BERDHDOCU A ,(  "
	              + " SELECT CODE, MAX(CAST(VERSION AS INT)) AS VS FROM BERDHDOCU WHERE FOLDER = '0' GROUP BY CODE )B WHERE A.CODE = B.CODE AND A.VERSION = B.VS "
                + " GROUP BY B.CODE, B.VS )D WHERE C.SEQ_NO = D.SN AND C.DOCTYPE = '0' AND C.COMMON_CODE = ? ";
                
  String comCode= getRequestValue(res,0,1,"comCode");
  String[] param4 = new String[1];
  param4[0]=comCode;
  
  List result=DoSql_PS(sqlStr,param4);
  
  out.clear();
 	MakeResponse4String("R_DOCUMENT",result,null,out);
}
else if(fname.equals("getUserName"))
{
		String sqlStr="SELECT EWHA_NAME( ? ) as CREATOR_NAME from dual ";
		
		String userCode=getRequestValue(res,0,1,"userCode");
		String[] param5 = new String[1];
		param5[0] = userCode;
		
		List result= DoSql_PS(sqlStr,param5);
		
		out.clear();
		MakeResponse4String("UserName",result,null,out);
}
else if(fname.equals("getWardPatient"))
{
		String sqlStr=" SELECT  iphsward, iphsroom, nvl(wbedwbed,0) as BEDNUM, ptbsname,  SEX_FND(ptbsrrns) as SEX , ptbsrrnf as AJUMIN , ptbsrrns as BJUMIN , inptidno,"
            	   +" iphsdept,  NVL(DOCT_DONM(iphsdoct,iphsfrdt),'-') as JUDOC, inptaddt, inptadtm, to_date(to_char(sysdate,'YYYYMMDD'),'YYYYMMDD')-to_date(iphsaddt,'YYYY-MM-DD')+1  as JAEDATE "
  				   +" FROM   pmiinpth a , pmiiphsh b ,  pmcptbsm c, ocswbedh d  WHERE  inptadst = 'A'  AND   iphsidno = inptidno  AND  iphsaddt = inptaddt   AND  iphsmscs = inptmscs     AND  iphssrno = inptsrno"
   					+" AND  iphsdoct like '%'   AND  iphsadst = inptadst  AND  iphsward like ?  AND  rtrim( ? ) <= iphstodt AND rtrim( ? ) >=iphsfrdt  AND  iphsdept like '%'"
   					+" AND  ptbsidno = iphsidno  AND  iphsidno = wbedidno(+)  AND  iphsward = wbedward(+)   AND  iphsroom = wbedroom(+)    order by iphsroom, bednum asc";

		
		String ward=getRequestValue(res,0,1,"ward");
		String today=getRequestValue(res,0,1,"today");		
	
		String[] param6=new String[3];
		param6[0]=ward;
		param6[1]=today;
		param6[2]=today;
		
		List result= DoSql_PS(sqlStr,param6);		
		out.clear();
		MakeResponse4String("WardPatient",result,null,out);
}

else if(fname.equals("userDocInsert"))//최근사용서식 update
{
	String sqlStr="INSERT  INTO BERPMFAVR (SEQ_NO,OWNER_TYPE,OWNER_CODE,OBJECT_TYPE,OBJECT_CODE,DESCRIPTION,MODIFY_TIME,MODIFIER) values(AUTO_SEQUENCE_BERPMFAVR.NEXTVAL,?,?,?,?,?,?,?)";
	
	String oType=getRequestValue(res,0,1,"oType");
	String oCode=getRequestValue(res,0,1,"oCode");
	String objType=getRequestValue(res,0,1,"objType");
	String objCode=getRequestValue(res,0,1,"objCode");
	String desc=getRequestValue(res,0,1,"desc");
	String modiTime=getRequestValue(res,0,1,"modiTime");
	String modifier=getRequestValue(res,0,1,"modifier");
	
	String[] param7=new String[7];
	param7[0]=oType;
	param7[1]=oCode;
	param7[2]=objType;
	param7[3]=objCode;
	param7[4]=desc;
	param7[5]=modiTime;
	param7[6]=modifier;
	
	List result=DoSql_PS(sqlStr,param7);
	
	out.clear();
	MakeResponse4String("userDocInsert",result,null,out);
	
}

else if(fname.equals("userDocSelect"))
{
	String sqlStr="SELECT DESCRIPTION FROM BERPMFAVR WHERE MODIFIER = ?";
	
	String userId=getRequestValue(res,0,1,"userId");
	
	String[] param8=new String[1];
	param8[0]=userId;
	
	List result=DoSql_PS(sqlStr,param8);
	
	out.clear();
	MakeResponse4String("userDocSelect",result,null,out);
}

else if(fname.equals("userDocUpdate"))
{
	String sqlStr="UPDATE BERPMFAVR SET DESCRIPTION= ? where MODIFIER = ? ";
	
	String des=getRequestValue(res,0,1,"des");
	String userId=getRequestValue(res,0,1,"userId");
	
	String[] param9=new String[2];
	param9[0]=des;
	param9[1]=userId;
	
	List result=DoSql_PS(sqlStr,param9);
	
	out.clear();
	MakeResponse4String("userDocUpdate",result,null,out);
}


else if(fname.equals("userConSelect"))
{
	String sqlStr="SELECT DESCRIPTION FROM BERPMFAVR WHERE MODIFIER = ?";
	
	String userId=getRequestValue(res,7,1,"userId");
	
	String[] param8=new String[1];
	param8[0]=userId;
	
	List result=DoSql_PS(sqlStr,param8);
	
	out.clear();
	MakeResponse4String("userConSelect",result,null,out);
}

else if(fname.equals("userConInsert"))//최근사용서식 update
{
	String sqlStr="INSERT  INTO BERPMFAVR (SEQ_NO,OWNER_TYPE,OWNER_CODE,OBJECT_TYPE,OBJECT_CODE,DESCRIPTION,MODIFY_TIME,MODIFIER) values(AUTO_SEQUENCE_BERPMFAVR.NEXTVAL,?,?,?,?,?,?,?)";
	
	String oType=getRequestValue(res,0,1,"oType");
	String oCode=getRequestValue(res,0,1,"oCode");
	String objType=getRequestValue(res,0,1,"objType");
	String objCode=getRequestValue(res,0,1,"objCode");
	String desc=getRequestValue(res,0,1,"desc");
	String modiTime=getRequestValue(res,0,1,"modiTime");
	String modifier=getRequestValue(res,0,1,"modifier");
	
	String[] param7=new String[7];
	param7[0]=oType;
	param7[1]=oCode;
	param7[2]=objType;
	param7[3]=objCode;
	param7[4]=desc;
	param7[5]=modiTime;
	param7[6]=modifier;
	
	List result=DoSql_PS(sqlStr,param7);
	
	out.clear();
	MakeResponse4String("userConInsert",result,null,out);
	
}

/*
else if(fname.eqauls("getTempData"))
{
	String sqlStr="SELECT * FROM (SELECT * FROM BERDMRECD WHERE DOC_CODE= ? AND PTID= ? ORDER BY MODIFY_TIME DESC) WHERE ROWNUM=1";
	
	String docCode=getRequestValue(res,0,1,
}*/

%>