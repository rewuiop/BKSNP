<%@ page contentType="application/octet-stream;charset=euc-kr" %>
<%@ page import="java.util.*" %>
<%@ page import="java.net.URLDecoder"%>
<%@ page import="java.io.*" %>
<%@ page import="javax.servlet.*" %>
<%@ page import ="java.io.InputStream" %>
<%@ page import ="java.io.OutputStream" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.net.URLConnection"%>

<%
int size = 1024;

//파일 어드레스
String url = "https://emr.hyumc.com:8080/EMR_DATA/TIF/data00/chartimg00/0000/14120711100220000.tif";
// 다운로드 디렉토리
String downDir = "/EMR_DATA/TIF/data00/chartimg00/0001/";

int slashIndex = url.lastIndexOf('/');
int periodIndex = url.lastIndexOf('.');

// 파일 어드레스에서 마지막에 있는 파일이름을 취득
String fileName = url.substring(slashIndex + 1);

if (periodIndex >= 1 && slashIndex >= 0
  && slashIndex < url.length() - 1) {
 
 OutputStream outStream = null;
 URLConnection uCon = null;

 InputStream is = null;
 try {

  System.out.println("-------Download Start------");

  URL Url;
  byte[] buf;
  int byteRead;
  int byteWritten = 0;
  Url = new URL("https://emr.hyumc.com:8080/EMR_DATA/TIF/data00/chartimg00/0000/14120711100220000.tif");
  outStream = new BufferedOutputStream(new FileOutputStream(
		  downDir + "\\" + fileName));

  uCon = Url.openConnection();
  is = uCon.getInputStream();
  buf = new byte[size];
  while ((byteRead = is.read(buf)) != -1) {
   outStream.write(buf, 0, byteRead);
   byteWritten += byteRead;
  }

  System.out.println("Download Successfully.");
  System.out.println("File name : " + fileName);
  System.out.println("of bytes  : " + byteWritten);
  System.out.println("-------Download End--------");

 } catch (Exception e) {
  e.printStackTrace();
 } finally {
  try {
	 if(!is.equals(null))
   		is.close();
	 if(!outStream.equals(null))
  		 outStream.close();
  } catch (IOException e) {
   e.printStackTrace();
  }
 }
 
 
 
 
 
 
} else {
 System.err.println("path or file name NG.");
}
     
           
%>