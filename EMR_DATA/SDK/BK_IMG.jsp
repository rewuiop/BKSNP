<%@page import = "java.sql.*"%><%@page import = "java.io.*"%><%@page import="org.w3c.dom.*, javax.xml.parsers.*" %><%@page import="org.w3c.dom.*, org.xml.sax.InputSource" %><%@page import="java.util.*"%>
<%!

List VSI_GetImageCategory(String Dept)
{
	String sqlStr = " SELECT SEQ_NO,NAME,FOLDER,PID,USED,STARTTIME,ENDTIME,KEYWORD,DESCRIPTION,CATEGORY,FILENAME,MODIFIER,MODIFY_TIME,CODE, case when NAME='"+Dept+"' then '0' else '1' end POS FROM BERDMIMAG WHERE FOLDER = '1' ORDER BY PID, POS \n";
			
	return DoSql(sqlStr);
}

List VSI_GetImageList(String condition)
{
	String sqlStr = " SELECT SEQ_NO, PID, FOLDER, NAME, FILENAME, KEYWORD, CATEGORY, CODE \n"
							  + " FROM BERDMIMAG WHERE FOLDER = '0' \n";
	
	if(condition != null)
	{
		String[] condi = condition.split(" ");
		for(int i=0; i<condi.length; i++)
		{
			sqlStr += "AND KEYWORD LIKE '%"+condi[i]+"%' \n";
		}
	}
	
	sqlStr += "ORDER BY POS \n";
							 
	return DoSql(sqlStr);
}

int VSI_ShowImageListInTree(JspWriter o, String xmlName, String imgList, String imgCate, String def_Cate)
{
	String scriptStr="";
	try
	{
		o.println( "var cate_len = "+imgCate+".length; ");
	  o.println(  "var data_len = "+imgList+".length; \n var XmlString=\"\";");
		o.println( "for(var i=0; i<cate_len; i++) ");
		o.println( "{ \n "+ xmlName +" += \"<item text='\"+Replace4xml("+imgCate+"[i][3])+\"' id='\"+"+imgCate+"[i][0]+\"' \";");
						
	if(def_Cate != null)
	{
		o.println( "if("+imgCate+"[i][7] == "+def_Cate+") \n");
		o.println( xmlName +" += \"selected='1' open='1' \";");
	}
	
	o.println( xmlName + " += \" > \";");
	o.println( "for(var j=0; j<data_len; j++) \n ");
	o.println( "{\n  if("+imgCate+"[i][7] == "+imgList+"[j][1])");
	o.println( "{\n" +	xmlName +" += \"<item text='\"+Replace4xml("+imgList+"[j][3])+\"' id='\"+"+imgList+"[j][0]+\"' img='\"+"+imgList+"[j][4]+\"' keyword='\"+Replace4xml("+imgList+"[j][6])+\"' /> \"; ");
	o.println( "} ");
	o.println( "} ");
	o.println( xmlName +" += \"</item> \";\n } ");
	}
	catch(Exception e)
	{
		return 1;
	};
	
	return 0;
}

int VSI_ShowImageListInGrid(JspWriter o, String imgList, String imgCate, String callBackFunc, String columnInfo)
{
	return 0;
}

%>