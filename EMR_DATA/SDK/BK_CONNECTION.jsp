<%@ page language="java"  trimDirectiveWhitespaces="true" %>
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
<%@page import = "com.sybase.*"%>
<%!


//---------------------- DB CONNECTION ---------------------------
Connection GetDbConnection()
{
	Connection conn=null;
	try
	{
		  
		  Context context = new InitialContext();
         DataSource dataSource = (DataSource) context.lookup("java:comp/env/jdbc/preemr");
         return dataSource.getConnection();

	}
	catch(Exception e)
	{
		OutMsg("GetDbConnection Error : "+e);
		System.out.println("GetDbConnection Error : "+e);
	}
	
	return null;
}

Connection GetOCSDbConnection()
{
	try
	{
		Context context = new InitialContext();
       DataSource dataSource = (DataSource) context.lookup("java:comp/env/jdbc/preocs");
       return dataSource.getConnection();
	
	}
	catch(Exception e)
	{
		OutMsg("GetOCSDbConnection Error : "+e);
		System.out.println("GetOCSDbConnection Error : "+e);
	}
	
	return null;
}

//---------------------- DB EXECUTE ---------------------------
List DoSql(String sqlString)
{
	Connection conn=null;
	Statement stmt=null;
	ResultSet rs=null;
	List doc=null;
	try
	{
		System.out.println("DOSQL: "+sqlString);
		conn = GetDbConnection();

		if(conn == null)
			return null;
		doc=new ArrayList<HashMap>();	
		stmt = conn.createStatement();
		if(stmt != null)
		{
			rs=stmt.executeQuery(sqlString);
			if(rs != null)
			{
				ResultSetMetaData rsm = rs.getMetaData();
				
				int i;
				int colLen=rsm.getColumnCount();
				
				String []columnName = new String[colLen];
				int []columnType = new int[colLen];
				for(i=0;i<colLen;i++)
				{
					String type=rsm.getColumnClassName(i+1);
					columnName[i]=rsm.getColumnName(i+1);
					if(0==type.compareTo("oracle.sql.CLOB"))
						columnType[i]=1;
					else
						columnType[i]=0;
					
				}
				HashMap result=new HashMap();
				result.put("result","success");
				result.put("msg","");
				doc.add(result);
				while(rs.next())
				{
					HashMap data=new HashMap();
					for(i=0;i<colLen;i++)
					{
						if(columnType[i]==0)
						{
							String value= rs.getString(i+1);
							/*if(value != null && !value.equals(""))
							{
								value = new String(value.getBytes("ISO-8859-1"), "EUC-KR");
							}*/
							data.put(columnName[i], value);
						}
						else
						{
							Clob clob=rs.getClob(i+1);
							if(clob != null)
							{
								StringBuffer str = new StringBuffer();
       					String strng;
               	BufferedReader bufferRead = new BufferedReader(clob.getCharacterStream());
    						while ((strng=bufferRead .readLine())!=null)
        				str.append(strng+"\r\n");
    						data.put(columnName[i], str.toString());
							}
						}
					}
					doc.add(data);
				}
			}
		}
	}
	catch(Exception e)
	{
		OutMsg("error"+e);
		System.out.println("ERROR:"+e);
		doc=null;
	}
	finally
	{
		try{
			if(conn != null)
			  conn.close();
			if(stmt != null)
				stmt.close();
			if(rs != null)
				rs.close();
		}
		catch(Exception e)
		{
		}
	}
	return doc;
}

List DoSql_PS(String sqlString, String []params)
{
	Connection conn=null;
	PreparedStatement psmt=null;
	ResultSet rs=null;
	List doc=null;
	try
	{
		System.out.println("*****************DOSQL!!: "+sqlString);
		conn = GetDbConnection();

		if(conn == null)
			return null;
		doc=new ArrayList<HashMap>();	
		//stmt = conn.createStatement();
		//if(stmt != null)
		{
			psmt = conn.prepareStatement(sqlString);
			if(psmt != null)
			{
				int len=0;
				if(params != null)
					len = params.length;
				
				System.out.println("params len : " +len);
				for(int i=0;i<len;i++)
				{
					psmt.setString(i+1, params[i]);
					//psmt.setString(i+1, new String(params[i].getBytes("EUC-KR"), "ISO-8859-1"));//EUC-KR -> ISO-88859-1
				}
				
				rs = psmt.executeQuery();
				
			}
			
			if(rs != null)
			{
				ResultSetMetaData rsm = rs.getMetaData();
				int i;
				int colLen=rsm.getColumnCount();
				
				String []columnName = new String[colLen];
				int []columnType = new int[colLen];
				for(i=0;i<colLen;i++)
				{
					String type=rsm.getColumnClassName(i+1);
					columnName[i]=rsm.getColumnName(i+1);
					System.out.println("DoSql_PS type : " +columnName[i]+" : "+type);
					if(0==type.compareTo("oracle.sql.CLOB"))
						columnType[i]=1;
					else
						columnType[i]=0;
					
				}
				HashMap result=new HashMap();
				result.put("result","success");
				result.put("msg","");
				doc.add(result);
				while(rs.next())
				{
					HashMap data=new HashMap();
					for(i=0;i<colLen;i++)
					{
						if(columnType[i]==0)
						{
							String value= rs.getString(i+1);
							
						/*	if(value != null && !value.equals(""))
							{
								value = new String(value.getBytes("ISO-8859-1"), "EUC-KR");
							}*/
							
							data.put(columnName[i], value);
							
							System.out.println("DoSql_PS columnName =" + columnName[i] + " value =" + value + " length = ");
						}
						else
						{
							Clob clob=rs.getClob(i+1);
							if(clob != null)
							{
								StringBuffer str = new StringBuffer();
       					String strng;
               	BufferedReader bufferRead = new BufferedReader(clob.getCharacterStream());
    						while ((strng=bufferRead .readLine())!=null)
        				str.append(strng+"\r\n");
    						data.put(columnName[i], str.toString());
							}
						}
					}
					doc.add(data);
				}
			}
		}
	}
	catch(Exception e)
	{
		OutMsg("error"+e);
		System.out.println("ERROR:"+e);
		doc=null;
	}
	finally
	{
		try{
			if(conn != null)
			  conn.close();
			if(rs != null)
				rs.close();
		}
		catch(Exception e)
		{
		}
	}
	return doc;
}

void DoSql_PS2(String sqlString, String []params, JspWriter out)
{
	Connection conn=null;
	PreparedStatement psmt=null;
	ResultSet rs=null;
	
	try
	{
		System.out.println("*****************DOSQL!!: "+sqlString);
		conn = GetDbConnection();

		if(conn != null)
		{
			psmt = conn.prepareStatement(sqlString);
			if(psmt != null)
			{
				int len=0;
				if(params != null)
					len = params.length;
				
				System.out.println("params len : " +len);
				for(int i=0;i<len;i++)
				{
					psmt.setString(i+1, params[i]);
					//psmt.setString(i+1, new String(params[i].getBytes("EUC-KR"), "ISO-8859-1"));//EUC-KR -> ISO-88859-1
				}
				
				rs = psmt.executeQuery();
				
			}
			
			if(rs != null)
			{
				ResultSetMetaData rsm = rs.getMetaData();
				
				int i;
				int colLen=rsm.getColumnCount();
				
				String []columnName = new String[colLen];
				int []columnType = new int[colLen];
				for(i=0;i<colLen;i++)
				{
					String type=rsm.getColumnClassName(i+1);
					columnName[i]=rsm.getColumnName(i+1);
					if(0==type.compareTo("oracle.sql.CLOB"))
						columnType[i]=1;
					else
						columnType[i]=0;
					
				}
				
				while(rs.next())
				{
					for(i=0;i<colLen;i++)
					{
						if(columnType[i]==0)
						{
							String value= rs.getString(i+1);
							out.print(value+"$");	
						}
						else
						{
							out.print("$");	
						}
					}
					out.print("^");	
				}
			}
		}
	}
	catch(Exception e)
	{
		OutMsg("error"+e);
		System.out.println("ERROR:"+e);
	}
	finally
	{
		try{
			if(conn != null)
			  conn.close();
			if(rs != null)
				rs.close();
		}
		catch(Exception e)
		{
		}
	}
}

List DoSql_PS_OCS(String sqlString, String []params)
{
	Connection conn=null;
	PreparedStatement psmt=null;
	ResultSet rs=null;
	List doc=null;
	try
	{
		System.out.println("*****************DoSql_PS_OCS!!: "+sqlString);
		conn = GetOCSDbConnection();

		if(conn == null)
			return null;
		doc=new ArrayList<HashMap>();	
		//stmt = conn.createStatement();
		//if(stmt != null)
		{
			psmt = conn.prepareStatement(sqlString);
			if(psmt != null)
			{
				int len=0;
				if(params != null)
					len = params.length;
				
				System.out.println("params len : " +len);
				for(int i=0;i<len;i++)
				{
					psmt.setString(i+1, params[i]);
					//psmt.setString(i+1, new String(params[i].getBytes("EUC-KR"), "ISO-8859-1"));//EUC-KR -> ISO-88859-1
				}
				
				rs = psmt.executeQuery();
				
			}
			
			if(rs != null)
			{
				ResultSetMetaData rsm = rs.getMetaData();
				
				int i;
				int colLen=rsm.getColumnCount();
				
				String []columnName = new String[colLen];
				int []columnType = new int[colLen];
				for(i=0;i<colLen;i++)
				{
					String type=rsm.getColumnClassName(i+1);
					columnName[i]=rsm.getColumnName(i+1);
					if(0==type.compareTo("oracle.sql.CLOB"))
						columnType[i]=1;
					else
						columnType[i]=0;
					
				}
				HashMap result=new HashMap();
				result.put("result","success");
				result.put("msg","");
				doc.add(result);
				while(rs.next())
				{
					HashMap data=new HashMap();
					for(i=0;i<colLen;i++)
					{
						if(columnType[i]==0)
						{
							String value= rs.getString(i+1);
						/*	if(value != null && !value.equals(""))
							{
								value = new String(value.getBytes("ISO-8859-1"), "EUC-KR");
							}*/
							data.put(columnName[i], value);
						}
						else
						{
							Clob clob=rs.getClob(i+1);
							if(clob != null)
							{
								StringBuffer str = new StringBuffer();
       					String strng;
               	BufferedReader bufferRead = new BufferedReader(clob.getCharacterStream());
    						while ((strng=bufferRead .readLine())!=null)
        				str.append(strng+"\r\n");
    						data.put(columnName[i], str.toString());
							}
						}
					}
					doc.add(data);
				}
			}
		}
	}
	catch(Exception e)
	{
		OutMsg("error"+e);
		System.out.println("ERROR:"+e);
		doc=null;
	}
	finally
	{
		try{
			if(conn != null)
			  conn.close();
			if(rs != null)
				rs.close();
		}
		catch(Exception e)
		{
		}
	}
	return doc;
}

void DoSql_PS_OCS2(String sqlString, String []params, JspWriter out)
{
	Connection conn=null;
	PreparedStatement psmt=null;
	ResultSet rs=null;
	
	try
	{
		System.out.println("*****************DoSql_PS_OCS!!: "+sqlString);
		conn = GetOCSDbConnection();

		if(conn != null)
		{
			psmt = conn.prepareStatement(sqlString);
			if(psmt != null)
			{
				int len=0;
				if(params != null)
					len = params.length;
				
				System.out.println("params len : " +len);
				for(int i=0;i<len;i++)
				{
					psmt.setString(i+1, params[i]);
					//psmt.setString(i+1, new String(params[i].getBytes("EUC-KR"), "ISO-8859-1"));//EUC-KR -> ISO-88859-1
				}
				
				rs = psmt.executeQuery();
				
			}
			
			if(rs != null)
			{
				ResultSetMetaData rsm = rs.getMetaData();
				
				int i;
				int colLen=rsm.getColumnCount();
				
				String []columnName = new String[colLen];
				int []columnType = new int[colLen];
				for(i=0;i<colLen;i++)
				{
					String type=rsm.getColumnClassName(i+1);
					columnName[i]=rsm.getColumnName(i+1);
					if(0==type.compareTo("oracle.sql.CLOB"))
						columnType[i]=1;
					else
						columnType[i]=0;
					
				}
				
				while(rs.next())
				{
					for(i=0;i<colLen;i++)
					{
						if(columnType[i]==0)
						{
							String value= rs.getString(i+1);
							out.print(value+"$");	
						}
						else
						{
							out.print("$");	
						}
					}
					out.print("^");	
				}
			}
		}
	}
	catch(Exception e)
	{
		OutMsg("error"+e);
		System.out.println("ERROR:"+e);
	}
	finally
	{
		try{
			if(conn != null)
			  conn.close();
			if(rs != null)
				rs.close();
		}
		catch(Exception e)
		{
		}
	}
}

List DoSqlUpdate(String sqlString)
{
	Connection conn=null;
	Statement stmt=null;
	ResultSet rs=null;
	List doc=null;
	try
	{
		System.out.println("DOSQL: "+sqlString);
		conn = GetDbConnection();

		if(conn == null)
			return null;
		doc=new ArrayList<HashMap>();	
		stmt = conn.createStatement();
		if(stmt != null)
		{
			int ret = stmt.executeUpdate(sqlString);
			//int ret = stmt.executeUpdate(new String(sqlString.getBytes("EUC-KR"), "ISO-8859-1"));
		}
	}
	catch(Exception e)
	{
		OutMsg("error"+e);
		System.out.println("ERROR:"+e);
		doc=null;
	}
	finally
	{
		try{
			if(conn != null)
			  conn.close();
			if(stmt != null)
				stmt.close();
			if(rs != null)
				rs.close();
		}
		catch(Exception e)
		{
		}
	}
	return doc;
}

int DoSqlUpdate_PS_1(String sqlString, String[][] params)
{
	Connection conn=null;
	PreparedStatement psmt=null;
	System.out.println(sqlString);
	int ret=-1;
	try
	{
		conn = GetDbConnection();
		if(conn != null)
		{
			psmt = conn.prepareStatement(sqlString);
			if(psmt != null)
			{
				int len=params.length;
				System.out.println("params len : " +len);
				for(int i=0;i<len;i++)
				{
					int sLen = params[i].length;
					System.out.println("params slen : " +len);
					for(int j=0; j<sLen; j++)
					{
						System.out.println(params[i][j]);
						psmt.setString(j+1, params[i][j]);
						//psmt.setString(j+1, new String(params[i][j].getBytes("EUC-KR"), "ISO-8859-1"));
					}
					//psmt.addBatch();
				}
				ret = psmt.executeUpdate();
				//psmt.close();
				//psmt = null;
			}
			conn.commit();
			//conn.close();
			//conn =null;
			System.out.println("rusult : " + ret);
			return ret;
		}
	}
	catch(Exception e)
	{
		System.out.println("ExecuteSql ERROR:"+e);
	}
	finally
	{
		try
		{
			if(conn != null)
			  conn.close();
			if(psmt != null)
				psmt.close();
		}
		catch(Exception e)
		{
		}
	}
	return ret;
}

int DoSqlUpdate_PS(String sqlString, String[][] params)
{
	Connection conn=null;
	PreparedStatement psmt=null;
	System.out.println(sqlString);
	int[] ret=null;
	try
	{
		conn = GetDbConnection();
		if(conn != null)
		{
			psmt = conn.prepareStatement(sqlString);
			if(psmt != null)
			{
				int len=params.length;
				System.out.println("params len : " +len);
				for(int i=0;i<len;i++)
				{
					int sLen = params[i].length;
					System.out.println("params slen : " +len);
					for(int j=0; j<sLen; j++)
					{
						System.out.println(params[i][j]);
						psmt.setString(j+1, params[i][j]);
						//psmt.setString(j+1, new String(params[i][j].getBytes("EUC-KR"), "ISO-8859-1"));
					}
					psmt.addBatch();
				}
				ret = psmt.executeBatch();
				psmt.close();
				psmt = null;
			}
			conn.close();
			conn =null;
			System.out.println("rusult : " + ret);
			return ret[0];
		}
	}
	catch(Exception e)
	{
		System.out.println("ExecuteSql ERROR:"+e);
	}
	finally
	{
		try
		{
			if(conn != null)
			  conn.close();
			if(psmt != null)
				psmt.close();
		}
		catch(Exception e)
		{
		}
	}
	return ret[0];
}

int ExecuteSql4PrepareStatement(String sqlString, String[] params)
{
	Connection conn=null;
	PreparedStatement psmt=null;
	System.out.println(sqlString);
	int ret=-1;
	try{
		conn = GetDbConnection();
		if(conn != null)
		{
			psmt = conn.prepareStatement(sqlString);
			if(psmt != null)
			{
				int len=params.length;
				for(int i=0;i<len;i++)
				{
					System.out.println(params[i]);
					psmt.setString(i+1, new String(params[i].getBytes("EUC-KR"), "ISO-8859-1"));
				}
				ret=psmt.executeUpdate();
				psmt.close();
				psmt = null;
			}
			conn.close();
			conn =null;
			return ret;
		}
	}
	catch(Exception e)
	{
		System.out.println("ExecuteSql ERROR:"+e);
	}
	finally
	{
		try{
			if(conn != null)
			  conn.close();
			if(psmt != null)
				psmt.close();
		}
		catch(Exception e)
		{
		}
	}
	return ret;
}
%>