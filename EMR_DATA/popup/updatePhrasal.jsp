<%@page import = "java.util.Properties"%>
<%@page import = "java.sql.*"%>
<%@page import = "java.io.*"%>
<%@page import = "org.w3c.dom.*"%>
<%@page import = "javax.xml.parsers.*"%>
<%@page import = "org.w3c.dom.*"%>
<%@page import = "org.xml.sax.InputSource"%>
<%@page import = "java.util.*, javax.naming.*"%>
<%@page import = "java.lang.System"%>
<%@page import = "javax.sql.DataSource "%>
<%@ include file="../SDK/BK_SDK.jsp" %>
<%@page contentType="text/html;charset=ksc5601"%>
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
	int len = res.size();

 	String ptId="";
 	String ipDate="";
 	String otDate="";
 	String pDept="";
 	String today="";
 	String usrId="";
 	String drList="";
 	String ward="";
 	
	out.clear();
	for(int i=0; i<len; i++)
	{
		String fname = getRequestHeadInfo(res, i, "name");
		System.out.println("fname : " + fname);
		if(fname.equals("getPhra"))
		{
			/*List x1 = DoSql("SELECT * FROM BERPMPHRA WHERE PID !='' AND TYPE='2'  order by  FOLDER desc ,LOWER(NAME) asc");
			MakeResponse4String("getPhra", x1, null, out);*/
			String[] param = new String[1];
			String type = getRequestValue(res,0,1,"TYPE");
			param[0]=type;
			System.out.println("getPhra ::: param[0] : "+type);
			String sqlStr = "SELECT * FROM BERPMPHRA WHERE PID !='' AND TYPE= ?  order by  FOLDER desc ,LOWER(NAME) asc";
			List x1 = DoSql_PS(sqlStr,param);
			out.clear();
			MakeResponse4String("getPhra", x1, null, out);
		}
		else if(fname.equals("getPhraD"))
		{
			String[] param = new String[2];
			String type = getRequestValue(res,0,1,"TYPE");
			String dept = getRequestValue(res,0,1,"DEPT");
			param[0]=type;
			param[1]=dept;
			
			String sqlStr = "SELECT * FROM BERPMPHRA WHERE PID !='' AND TYPE= ?  AND DEPARTMENT = ? order by  FOLDER desc ,LOWER(NAME) asc";
			List x1 = DoSql_PS(sqlStr,param);
			out.clear();
			MakeResponse4String("getPhraD", x1, null, out);
		}
		else if(fname.equals("getPhraP"))
		{
			String[] param = new String[2];
			String type = getRequestValue(res,0,1,"TYPE");
			String user = getRequestValue(res,0,1,"USER");
			param[0]=type;
			param[1]=user;
			
			String sqlStr = "SELECT * FROM BERPMPHRA WHERE PID !='' AND TYPE= ? AND MODIFIER = ? order by  FOLDER desc ,LOWER(NAME) asc";
			List x1 = DoSql_PS(sqlStr,param);
			out.clear();
			MakeResponse4String("getPhraP", x1, null, out);
		}
		else if(fname.equals("insertPhra"))
		{
			java.util.Date tDate=new java.util.Date();
			String curDate=GetTimeString(tDate);
			String sqlStr = "INSERT INTO BERPMPHRA  (DEPARTMENT,NAME,FOLDER,PID,POSITION,DESCRIPTION,KEYWORD,MODIFY_TIME,MODIFIER,CATEGORY,TYPE)"
										+" VALUES(?,?,?,?,?,?,?,?,?,?,?)";
			String[][] param= new String[1][11];
			param[0][0]=getRequestValue(res, 0, 1, "DEPARTMENT");
			param[0][1]=getRequestValue(res, 0, 1, "NAME");
			param[0][2]=getRequestValue(res, 0, 1, "FOLDER");
			param[0][3]=getRequestValue(res, 0, 1, "PID");
			param[0][4]=getRequestValue(res, 0, 1, "POSITION");
			param[0][5]=getRequestValue(res, 0, 1, "DESCRIPTION");
			param[0][6]=getRequestValue(res, 0, 1, "KEYWORD");
			param[0][7]=curDate;
			param[0][8]=getRequestValue(res, 0, 1, "USERID");
			param[0][9]=getRequestValue(res, 0, 1, "CATEGORY");
			param[0][10]=getRequestValue(res, 0, 1, "TYPE");
			
			System.out.println("USERID : " + param[0][8]);
			int result = DoSqlUpdate_PS(sqlStr, param);
			out.clear();
			if(result == -1)
			{
				out.println("Error");
				return;
			}
			
			if(param[0][8].equals("")) {
				sqlStr = "SELECT SEQ_NO FROM BERPMPHRA WHERE MODIFIER IS NULL AND MODIFY_TIME=? AND NAME=? AND PID=?";
				System.out.println("query : " + sqlStr);
				String[] param1 = new String[3];
				param1[0]=curDate;
				param1[1]=param[0][1];
				param1[2]=param[0][3];
				System.out.println("MODIFY_TIME : " + param1[0]);
				System.out.println("NAME : " + param1[1]);
				System.out.println("PID : " + param1[2]);
				List x1=DoSql_PS(sqlStr, param1);
				out.clear();
				MakeResponse4String("insertPhra", x1, null, out);
			}
			else {
				sqlStr = "SELECT SEQ_NO FROM BERPMPHRA WHERE MODIFIER=? AND MODIFY_TIME=? AND NAME=? AND PID=?";
				System.out.println("query : " + sqlStr);
				String[] param1 = new String[4];
				param1[0]=param[0][8];
				param1[1]=curDate;
				param1[2]=param[0][1];
				param1[3]=param[0][3];
				System.out.println("MODIFIER : " + param1[0]);
				System.out.println("MODIFY_TIME : " + param1[1]);
				System.out.println("NAME : " + param1[2]);
				System.out.println("PID : " + param1[3]);
				List x1=DoSql_PS(sqlStr, param1);
				out.clear();
				MakeResponse4String("insertPhra", x1, null, out);
			}
		}	
		else if(fname.equals("updatePhra"))
		{
			java.util.Date tDate=new java.util.Date();
			String curDate=GetTimeString(tDate);
			String sqlStr = "UPDATE BERPMPHRA SET NAME = ?, DESCRIPTION = ?, MODIFY_TIME = ?, MODIFIER = ? WHERE CONVERT(VARCHAR,SEQ_NO) = ? ";
			String[][] param= new String[1][5];
			param[0][0]=getRequestValue(res, 0, 1, "NAME");
			param[0][1]=getRequestValue(res, 0, 1, "DESCRIPTION");
			param[0][2]=curDate;
			param[0][3]=getRequestValue(res, 0, 1, "USERID");
			param[0][4]=getRequestValue(res, 0, 1, "SEQ_NO");
			
			int result = DoSqlUpdate_PS_1(sqlStr, param);
			System.out.println("result : " + result);
			out.clear();
			String msg = "success";
			if(result == -1)
				msg = "error";
			out.println("<RESPONSE name='"+fname+"' result='"+msg+"' msg='"+msg+"' ></RESPONSE>");
		}
		else if(fname.equals("deletePhra"))
		{
			String sqlStr = "DELETE FROM BERPMPHRA WHERE CONVERT(VARCHAR,SEQ_NO)  = ?";
			String[][] param= new String[1][1];
			param[0][0]=getRequestValue(res, 0, 1, "SEQ_NO");
			int result = DoSqlUpdate_PS_1(sqlStr, param);
			System.out.println("result : " + result);
			out.clear();
			String msg = "success";
			if(result == -1)
				msg = "error";
			out.println("<RESPONSE name='"+fname+"' result='"+msg+"' msg='"+msg+"' ></RESPONSE>");
		}
		else if(fname.equals("deletePhrafolder"))
		{
			String sqlStr = "DELETE FROM BERPMPHRA WHERE PID = ?";
			String[][] param= new String[1][1];
			param[0][0]=getRequestValue(res, 0, 1, "SEQ_NO");
			int result = DoSqlUpdate_PS_1(sqlStr, param);
			System.out.println("result : " + result);
			out.clear();
			String msg = "success";
			if(result == -1)
				msg = "error";
			out.println("<RESPONSE name='"+fname+"' result='"+msg+"' msg='"+msg+"' ></RESPONSE>");
		}
	}
	
%>

