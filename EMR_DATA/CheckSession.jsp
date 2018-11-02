<%@page import="javax.servlet.http.HttpServlet"%>
<%@page import="BKSNP.CheckSession"%>

<%
CheckSession servlet = new CheckSession();
servlet.service(request,response);
%>