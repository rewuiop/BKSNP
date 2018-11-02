<%@ page language="java" contentType="text/html; charset=EUC-KR" %>
<%@ page import="
    javax.naming.*,
    javax.sql.*,
    org.apache.commons.dbcp.BasicDataSource"
%>
<% 
 Context initContext = new InitialContext();
 Context envContext  = (Context)initContext.lookup("java:/comp/env");
 DataSource ds   = (DataSource)envContext.lookup("jdbc/preemr");
  
 BasicDataSource bds = (BasicDataSource)ds; 
 String dbname  = "caelum";
 
 try { 
   int bdsNumActive  = bds.getNumActive(); 
   int bdsMaxActive  = bds.getMaxActive(); 
   int bdsNumIdle   = bds.getNumIdle(); 
   long bdsMaxWait  = bds.getMaxWait(); 
   
   String fontcolor  = ""; 
   
   if (bdsNumActive <= 400) { 
    fontcolor = "<font color='green'>"; 
   } else if (bdsNumActive > 400 && bdsNumActive <= 500) { 
    fontcolor = "<font color='orange'>"; 
   } else { 
    fontcolor = "<font color='red'>"; 
   }
%> 
   <table cellpadding='3' cellspacing='0' border='1'>
    <tr>
     <td colspan='4' align='center'><b><%=dbname%></b> DataSource</td>
    </tr>
    <tr>
     <td height='24' align='center' alt='connections that are processing'># Active Connections</td>
     <td height='24' align='center' alt='total size of pool'>Maximum Active Connections</td>
     <td height='24' align='center' alt='connections that are idle in the pool'># of Idle Connections</td>
     <td height='24' align='center'>Maxium Wait period before timeout</td>
    </tr>
    <tr>
     <td align='right'><%=fontcolor%><%=bdsNumActive%></font></td>
     <td align='right'><%=bdsMaxActive%></td>
     <td align='right'><%=bdsNumIdle%></td>
     <td align='right'><%=bdsMaxWait%></td>
    </tr>
   </table>
<%
 } catch(Exception e) { 
  out.println(e.toString());
 } 
%>