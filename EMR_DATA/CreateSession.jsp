<%
	session.setAttribute("Agent", request.getParameter("Agent"));
%>
<html>
	<style>
		html, body, div, span, a, img{
	  padding:0; 
	  margin:0;
	}
	
	.vertical{
	  width:80px; 
	  height:80px; 
	  border:1px solid #ccc; 
	  margin:10px 0 0 10px; 
	  display:table; 
	  position:relative;
	  overflow:hidden;
	}
	
	.vertical span{
	  display:table-cell; 
	  .position:absolute;
	  .left:50%; 
	  .top:50%; 
	  background:#fff; 
	  text-align:center; 
	  vertical-align:middle;
	}
	
	.vertical span a{
	  .position:relative;
	  .left:-50%; 
	  .top:-50%;
	}
	</style>
	<body style="width:100%;height:100%;">
				<!--img style="position:absolute;width:150px;height:150px;top:50%;left:50%;margin-top:-75px;margin-left:-75px;" src="/EMR_DATA/images/loading.gif"/-->
	</body>
</html>