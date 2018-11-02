<%@page trimDirectiveWhitespaces="true"%>
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

<%@ include file="/SDK/BK_CONNECTION.jsp" %>
<%@ include file="/SDK/BK_IMG.jsp" %>
 
<%!
String rootPath="/EMR_DATA/";	
int b_loadSetup=0;
int DB_CONN_TYPE=0;
String BK_DOC = "SEQ_NO,CODE,NAME,VERSION,FOLDER,PID,DOCTYPE,STARTTIME,ENDTIME,DEPARTMENT1,USED,DEPARTMENT2,DEPARTMENT3,DEPARTMENT4,DEPARTMENT5,CATEGORY1,CATEGORY2,CATEGORY3,CREATOR,MODIFIER,"
	             + "CREATETIME,MODIFYTIME,RECORDTYPE,RECORDEVENT,RECORDAREA,RECORDLEVEL,MANDATORY,DEPSHARE,EN_INPUT,SIGN,TEMPSAVEVIEW,COSIGN,COSIGNLEVEL,COSIGNPRINT,PRIVATEDOC,WRITELEVEL,VIEWLEVEL,FILE_INPUT,"
	             + "FILE_VIEW,FILE_PRINT,FILE_MODIFY,DEV_DESIGN,DEV_MODEL,DEV_MAPPING,DEV_TEST,DEV_PROGRESS,DESCRIPTION,COMMON_CODE,CONNECTED_DOC_CODE,FILE_DOCU,TITLE,POS,REQ_DEPARTMENT,INSF_DOC_CODE,"
	             + "SINGLE_PRINT_YN,DOC_SEARCH_YN,REC_SEARCH_YN,PRINT_STORAGE,AMEND_LEVEL,OCTY_CD,MODIFYLEVEL,CONNECTED_DOC_CODE2";
String BK_REC = "SEQ_NO,CODE,COMMON_CODE,NAME,STATUS,DOC_CODE,PTID,RPTID,CATEGORY1,CATEGORY2,CATEGORY3,CREATOR_CODE,CREATE_TIME,MODIFIER_CODE,MODIFY_TIME,SIGNER_CODE,SIGN_TIME,COSIGNER_CODE,COSIGN_TIME,PRINTED,FILENAME,"
							+ "RECORDTYPE,INCOMPLETE,TEMPSAVE,DEPARTMENT,CHOS_NO,SIGNLEVEL,EXT_RECD_CODE,DOC_VER,INSF_DOC_CODE,SIGNER_CODE2,SIGN_TIME2,COSIGNER_CODE2,RECORD_TIME,COSIGN_CANDIDATE_CD,COSIGN_TIME2";
							
String BK_PAT = "NAME,RRNS,JUNO,IDNO,BLOOD,ADDT,JAEW,CHDT,CHUS,CHTM,ADRT,WARD,ROOM,DEPT,DPDS,DOCT,DONM,SEXX,AGE,ADDR,HPNO,TELN,KIND,BSCD";         
String BK_IMG = "SEQ_NO,CODE,NAME,PID,KEYWORD,FILENAME";

BufferedWriter out1 = null;
BufferedWriter out2 = null;
BufferedWriter out3 = null;

JspWriter jw;

void OutMsg(String msg)
{
	try
	{
		//o1.println("alert('"+msg+"');");
	}
	catch(Exception e)
	{
	}
}

void VSI_SetDataArr(List ret, String name, String in, JspWriter out)
{
	try
	{
		String[] comp = in.split(",");
		int size = comp.length;

		int len=ret.size();
		int i;
		if(len <=1)
		{
		  out.println(name +"=[];");
			return;
		}
		HashMap hm;
		out.print(name+" = [");
		for(i=1; i<len; i++)
		{
			if(i!=1)
				out.println("],");
			out.print("[");
			hm=(HashMap)ret.get(i);
			
			for(int j=0; j<size; j++)
			{
				if(j!=0)
					out.print(" ,");
				
				String tStr=(String)hm.get(comp[j]);
				if(tStr==null)
					tStr="";
				else
				{
					tStr = tStr.replace("\\", "\\\\");
					tStr = tStr.replace("\'", "\\\'");
					tStr = tStr.replace("\n", "\\n");
					tStr = tStr.replace("\r", "\\r");
					tStr = tStr.replace("\t", "\\t");
				}
				out.print("'"+tStr+"'");
			}
		}
		out.println("]]; ");
	}
	catch(Exception e)
	{
	}
}



String GetData(List ret, String col)
{
	if(ret == null)
		return "";
	HashMap hm;
	hm=(HashMap)ret.get(1);
	return (String)hm.get(col);
}


void VSI_CheckRightOfRecord(int mode, String recordId, String ptId, String userInfo)
{
}

List ProcessRequest(String xmlStr)
{
	DocumentBuilderFactory docFactory = null;
	DocumentBuilder docBuilder = null;
	Document doc = null;
	List res=null; 
	try{
		xmlStr = ToAscii(xmlStr);
			
	 	docFactory = DocumentBuilderFactory.newInstance();
	 	docBuilder = docFactory.newDocumentBuilder();
	 	doc = docBuilder.parse(new InputSource(new StringReader(xmlStr)));
	 	
	 	res = new ArrayList<List>();
	 	
		NodeList reqSet = doc.getElementsByTagName("REQUEST");
		int reqLen = reqSet.getLength();
		int i;
		for(i=0; i<reqLen; i++)
		{
			List req = new ArrayList<HashMap>();
			Node temp = reqSet.item(i);
			NamedNodeMap attr = temp.getAttributes();
			NodeList child  = temp.getChildNodes();
			HashMap hm = new HashMap();
			
			hm.put("name", attr.getNamedItem("id").getNodeValue());
			req.add(hm);
			
			int childLen = child.getLength();
			for(int k=0; k<childLen; k++)
			{
				if(!child.item(k).getNodeName().equals("PS"))
					continue;
				NodeList dataNode = child.item(k).getChildNodes();
				hm=new HashMap();
				int dataLen=dataNode.getLength();
				for(int n=0; n<dataLen; n++)
				{
					Node value=dataNode.item(n);
					hm.put(value.getAttributes().getNamedItem("name").getNodeValue(), value.getTextContent());
				}
				req.add(hm);
			}
			res.add(req);
		}
	}
	catch(Exception e)
	{
		System.out.println("ProcessRequest Error:"+e);
	}
	return res;
}

String ToAscii(String x)
 {
		int i;
		int len = x.length();
		
		if(len <2)
			return null;
		
		byte[] byteArray = new byte[len/2];
		byte ch;
		for(i=0; i<len; i += 2)
		{
			ch = (byte)x.charAt(i);
			if(ch >= 'A' && ch <= 'F')
			{
				byteArray[i/2] = (byte)(ch-'A');
				byteArray[i/2] += 10;
			}
			else 
			{
				byteArray[i/2] = (byte)(ch-'0');
			}
			byteArray[i/2] <<= 4;
			
			ch = (byte)x.charAt(i+1);
			if(ch >= 'A' && ch <= 'F')
			{
				byteArray[i/2] |= (byte)(ch-'A');
				byteArray[i/2] += 10;
			}
			else 
			{
				byteArray[i/2] |= (byte)(ch-'0');
			}
		}
		try{
			return new String(byteArray,"UTF-16");
		}
		catch(Exception e)
		{
			System.out.println(e);
		}
		return "";
}



String getRequestHeadInfo(List res, int no, String name)
{
	HashMap head=(HashMap)((List)res.get(no)).get(0);
	return (String)head.get(name);
}

String getRequestValue(List res, int row, int col,  String name)
{
	HashMap head=(HashMap)((List)res.get(row)).get(col);
	System.out.println("=======row:"+row+"  col:"+col+"===="+name+"========="+head+"====END");
	return (String)head.get(name);
}

String [][] MakeSqlParam(List res, int no, String param)
{
	List l=(List)res.get(no);
	int lLen = l.size();
	String [] p = param.split("\\^");
	int pLen = p.length;
	
	String [][]ret= new String[lLen-1][pLen];
	
	for(int i=1; i<lLen; i++)
	{
		HashMap hm = (HashMap)l.get(i);
		for(int n=0; n<pLen; n++)
		{
			ret[i-1][n] = (String)hm.get(p[n]);
		}
	}
	return ret;
}

	
String GetToday()
{
 java.util.Date tdate = new java.util.Date();
 String y = Integer.toString(tdate.getYear()+1900);
 String m = Integer.toString(tdate.getMonth()+1);
 String d = Integer.toString(tdate.getDate());
 return y+m+d;
}
/*------------------------------------------------------------------------------------------------*/
/********************************************2012.11.01******************************************* */
/*******************************************ajax response***************************************** */

void MakeResponse4String_printdb(List res)
{
 int len = res.size();
 if(len<1)
  return ;
 HashMap hm;
 try
 {
   hm = (HashMap)res.get(1);
   int hLen = hm.size();
   String[] key = new String[hLen];
   int i=0;
   String val = null;
   Iterator ir = hm.keySet().iterator();
   while(ir.hasNext())
   {
     key[i++] = (String)ir.next();
   }
   jw.print(key);
  }
 catch(Exception e)
 {  
 }
 return ;
}

String[] MakeResponse4String_db(List res)
{
 int len = res.size();
 if(len<1)
  return null;
 HashMap hm;
 try
 {
   hm = (HashMap)res.get(1);
   int hLen = hm.size();
   String[] key = new String[hLen];
   int i=0;
   Iterator ir = hm.keySet().iterator();
   while(ir.hasNext())
   {
     key[i++] = (String)ir.next();
   }
   return key;
  }
 catch(Exception e)
 {  
 }
 return null;
}

void MakeResponse4String(String name, List res, String msg, JspWriter jw)
{
 String xmlStr="";
 if(res == null)
  return;
 int len = res.size();
 if(len<1)
  return ;

 HashMap hm;
 hm = (HashMap)res.get(0);
 try
 {
  jw.println("<RESPONSE name='"+name+"' result='"+(String)hm.get("result")+"' msg='"+msg+"' > \r\n"); 
 
  for(int i=1; i<len; i++)
  {
   hm = (HashMap)res.get(i);
   int hLen = hm.size();
   String[] key = MakeResponse4String_db(res);
   jw.println("<VALUESET no='"+i+"'> \r\n");
   for(int j=0; j<hLen; j++)
   {
     String val = (String)hm.get(key[j]);
     if(val != null && !val.equals(""))
     {
      val = val.replace("&", "&amp;");
      val = val.replace("<", "&lt;");
      val = val.replace(">", "&gt;");
      val = val.replace("\'", "&apos;");
      val = val.replace("\"", "&quot;");
      val = val.trim();
      
      jw.println("<VALUE name='"+key[j]+"'>"+val+"</VALUE> \r\n"); 
     }
   else
    jw.println("<VALUE name='"+key[j]+"'></VALUE> \r\n");
   }
   jw.println("</VALUESET> \r\n");
  }
  jw.println("</RESPONSE> \r\n");
 }
 catch(Exception e)
 {
  System.out.println("MakeResponse4String err : " +e);
 }
 
 return;
}


void MakeResponse4Arr(String name, List res, String msg, JspWriter jw)
{
 String xmlStr="";
 if(res == null)
  return;
 int len = res.size();
 if(len<1)
  return ;

 HashMap hm;
 hm = (HashMap)res.get(0);
 try
 {
  for(int i=1; i<len; i++)
  {
   hm = (HashMap)res.get(i);
   int hLen = hm.size();
   String[] key = MakeResponse4String_db(res);
   for(int j=0; j<hLen; j++)
   {
     String val = (String)hm.get(key[j]);
     if(val != null && !val.equals(""))
     {
      val = val.replace("&", "&amp;");
      val = val.replace("<", "&lt;");
      val = val.replace(">", "&gt;");
      val = val.replace("\'", "&apos;");
      val = val.replace("\"", "&quot;");
      val = val.trim();
      jw.print(val+"$"); 
     }
   else
    jw.print("$");
   }
   jw.print("^");
  }
 }
 catch(Exception e)
 {
  System.out.println("MakeResponse4Arr err : " +e);
 }
 
 return;
}
	
void debugMsg(int level, String msg)
{
 if(level == 0)
 {
  try
  {
   if(out1 == null)
   {
    out1 = new BufferedWriter(new FileWriter(getServletContext().getRealPath("../EMR_DATA/LOG/BK_SDK_LOG1.txt")));
   }
   out1.write(msg);
   out1.newLine();
   out1.flush();
  }
  catch(Exception e)
  {
   System.out.println("debugMsg : "+e);
  }
 }
 else if(level == 1)//***로고찍기*/
 {
  try
  {
   if(out2 == null)
   {
    out2 = new BufferedWriter(new FileWriter(getServletContext().getRealPath("../EMR_DATA/LOG/BK_SDK_LOG2.txt")));
   }
   out2.write(msg);
   out2.newLine();
   out2.flush();
  }
  catch(Exception e)
  {
   System.out.println("debugMsg : "+e);
  }
 }
 else if(level == 2)
 {
  try
  {
   if(out3 == null)
   {
    out3 = new BufferedWriter(new FileWriter(getServletContext().getRealPath("../EMR_DATA/LOG/BK_SDK_LOG3.txt")));
   }
   out3.write(msg);
   out3.newLine();
   out3.flush();
  }
  catch(IOException e)
  {
   System.out.println("debugMsg : "+e);
  }
 }
}



/*
//-----------------------------------12/27 입원정보 쿼리하나로 가져오기
	List getIpwonInfo(String ptId,String ipDate,String usrId,String today)
	{
		String sqlStr=" SELECT c.PTBSIDNO AS PTIDNO, c.PTBSNAME AS PTNAME, c.PTBSRRNF AS JUMINA, c.PTBSRRNS AS JUMINB, c.PTBSRRNF||'-'||c.PTBSRRNS AS JUNUM,  SEX_FND(c.PTBSRRNS) as SEXX  ";
               sqlStr+="  , to_char(  to_number(substr(to_char(SYSDATE, 'YYYY/MM/DD'),1,4)) - to_number(decode(substr(c.ptbsrrns,1,1),'3','20','4','20','0','18','9','18','19')||substr(c.ptbsrrnf,1,2)) - to_number((decode( substr( to_char( to_number(substr(to_char(SYSDATE, 'YYYYMMDD'),5,4)) - to_number(substr(c.ptbsrrnf,3,4))), 1,1 ), '-', '1', '0') ))) as AGE    ";
               sqlStr+="  ,  c.PTBSTELN AS PTTEL, c.PTBSZIPF AS PTZIPA, c.PTBSZIPS AS PTZIPB,   PTBS_ADDR(c.PTBSIDNO) as ADDR,  BLOOD_DESC(c.PTBSIDNO) as BLOOD, c.PTBSHPNO AS PTPNO, c.PTBSEMAL AS PTMAL   ";
               sqlStr+="  ,  nvl(A.IPHSIDNO,' ') as IPIDNO, nvl(A.iphsaddt,' ') as IPADDT, nvl(A.iphskind,' ') as IPKIND, nvl(A.bscddesc,' ') AS BDESC,  nvl(A.iphsdept,' ') AS IPDEPT, nvl(A.deptdpds,' ') AS DEPTDPDS, nvl(A.iphssbdp,' ') AS IPSBDP    ";
               sqlStr+="  ,  nvl(A.iphsdoct,' ') AS IPDOCT, nvl(A.iphspidn,' ') AS IPPIDN, nvl(A.JAEWONDOC,' ') AS IPDOCNAME,  nvl(A.iphsward,' ') IPWARD, nvl(A.iphsroom,' ') AS IPROOM, nvl(A.wardroom ,' ') AS WARDROOM";  
               sqlStr+="  , INPTIDNO, inptaddt AS INADDT, inptadtm AS INTIME, inptaddt||inptadtm AS INADTIME, inptadrt AS INWAY, inptdsdt AS OUTADDT, inptdstm AS OUTTIME, inptdsdt||inptdstm AS OUTADTIME    ";
               sqlStr+="    , inptdsrs AS OUTWAY, inptchdt AS WARDADDT, inptchus AS WARDTIME, inptchdt||inptchus AS WARDADTIME,  nvl( ( select count(*)  from  ocsedsch  where  edscidno = d.inptidno and   edscmddt = d.inptaddt   ";
               sqlStr+="   and   edscgubn = 'K'  and   edsctype = 'Y'), 0 ) DNRCOUNT ,  nvl( (SELECT alleidno  FROM  ocsalleh  WHERE  alleidno =  d.inptidno AND   rownum = 1), ' ' ) alleidno     ";
               sqlStr+="  , nvl(e.bodyidno,' ') AS BODYIDNO , nvl(e.bodywegt,' ') AS BODYWEGT,  nvl(e.bodyinch, ' ') AS BODYINCH, nvl( f.EDSCINPN,' ') AS DAMDOC, nvl( f.EDSCDESC,' ')  AS DAMDOCTEL,  nvl( f.edonm,' ') DAMDOCNAME    ";
               sqlStr+="   ,   nvl(DOCTDOCT,' ') AS DOCCODE, nvl(DOCTFRDT,' ') AS DOCSTART, nvl(DOCTTODT,' ') AS DOCEND,nvl(DOCTPIDN,' ') AS DOCIDNO, nvl(DOCTDONM,' ') AS DOCNAME, nvl(DOCTDEPT,' ') AS DOCDEPT,  ";
               sqlStr+="   nvl(DOCTSBDP,' ') AS DOCBDEPT, nvl(DOCTSPEC,' ')AS DOCSPEC, nvl(DOCTODPT,' ')AS DOCODPT from pmiinpth d ,  pmcptbsm c, ( select IPHSIDNO, iphsaddt, iphskind, bscddesc,    ";
               sqlStr+="   iphsdept, DEPT_DPDS(iphsdept) AS deptdpds , iphssbdp,iphsdoct, iphspidn, DOCT_DONM(iphspidn,iphsfrdt)  AS JAEWONDOC, iphsward, iphsroom, iphsward||iphsroom  AS  wardroom from  pmiiphsh TT  , picbscdm where IPHSIDNO=  ";
               sqlStr+="'"+ptId+"'";
               sqlStr+="   AND  iphsadst in ('A','T','D') AND  iphsmscs = 'M' AND  iphsfrdt = ( SELECT MAX(iphsfrdt) FROM   pmiiphsh WHERE  iphsidno = TT.iphsidno AND   iphsadst in ('A','T','D')  AND    iphsmscs = 'M') ";
               sqlStr+="  and  bscdgubn='31'  and  bscdcode= iphskind) A , (SELECT  bodyidno, bodywegt, bodyinch   from  ";
               sqlStr+="  (select bodyidno, bodywegt, bodyinch from ocsbodyh where   bodyidno=  ";
               sqlStr+="'"+ptId+"'";
               sqlStr+="  order  by bodyordt desc) where rownum=1) e ,(SELECT edscidno, EDSCINPN, EDSCDESC, DOCT_DONM(edscinpn, edscmddt) edonm    ";
               sqlStr+="  from   ocsedsch where  edscidno =  ";
               sqlStr+="'"+ptId+"'";
               sqlStr+=" and   edscmddt =  ";
               sqlStr+="'"+ipDate+"'";
               sqlStr+=" and   edscgubn = 'J'  and  ";
               sqlStr+="'"+today+"'";
               sqlStr+=" between EDSCINDT and edscoudt and   rownum = 1) f, (SELECT DOCTDOCT,DOCTFRDT,DOCTTODT,DOCTPIDN,DOCTDONM,DOCTDEPT,DOCTSBDP,DOCTSPEC,DOCTODPT FROM    pmbdoctm WHERE  ((doctcskw='S' AND doctpidn=  ";
               sqlStr+="'"+usrId+"'";
               sqlStr+=" ) or  (doctcskw='N' AND doctpidn=  ";
               sqlStr+="'"+usrId+"'";
               sqlStr+=" )) AND  to_char(sysdate,'yyyymmdd')  between  doctfrdt and docttodt and  rownum = 1) g where 1 = 1 and  inptidno =  ";
               sqlStr+="'"+ptId+"'";
               sqlStr+=" and  inptaddt =  ";
               sqlStr+="'"+ipDate+"'";
               sqlStr+=" and  inptadst in ( 'A', 'T', 'D' )  and  inptmscs = 'M' and  c.ptbsidno = inptidno and  A.iphsidno(+) = c.ptbsidno  and  e.bodyidno(+) = d.inptidno  and  f.edscidno(+) = d.inptidno    "; 
				  
		return DoSql(sqlStr);
	}*/
	/*
	List getOtptInfo(String ptId,String otDate,String usrId,String today, String pDept)//pt pt ot to us us pt ot pdept
	{
		String sqlStr="   SELECT PTBSIDNO as PTIDNO,PTBSNAME AS PTNAME,PTBSRRNF AS JUMINA,PTBSRRNS AS JUMINB,PTBSRRNF||'-'||PTBSRRNS AS JUNUM, SEX_FND(PTBSRRNS) AS SEX, ";
       			sqlStr+=" to_char(  to_number(substr(to_char(SYSDATE, 'YYYY/MM/DD'),1,4)) - to_number(decode(substr(ptbsrrns,1,1),'3','20','4','20','0','18','9','18','19')||substr(ptbsrrnf,1,2)) - to_number((decode( substr( to_char( to_number(substr(to_char(SYSDATE, 'YYYYMMDD'),5,4)) - to_number(substr(ptbsrrnf,3,4))), 1,1 ), '-', '1', '0') )))  as  AGE ,  ";
            		sqlStr+=" PTBSTELN AS PTTEL, PTBSZIPF AS PTZIPA, PTBSZIPS AS PTZIPB, PTBS_ADDR(PTBSIDNO) AS ADDR,BLOOD_DESC(PTBSIDNO) AS BLOOD, PTBSHPNO PTPNO,  PTBSEMAL AS PTMAL,A.OTPTIDNO, A.OTPTDATE, A.OTPTTIME, ";
             	sqlStr+=" A.OTPTDATE||A.OTPTTIME   as DAYTIME, DEPT_DPDS(A.OTPTDEPT) as DEPTCODE,  A.OTPTSBDP, A.OTPTDOCT,A.OTPTPIDN,  DOCT_DONM(A.OTPTPIDN,A.OTPTDATE) as DOCNAME,";
             	sqlStr+=" A.OTPTMETP,A.OTPTKIND,  nvl( B.BSCDDESC , ' ' ) as BSCDDESC, nvl(e.bodyidno,' ') AS BODYIDNO, nvl(e.bodywegt,' ') AS BODYWEGT,  nvl(e.bodyinch, ' ') AS BODYINCH ";
            		sqlStr+=" , nvl( f.EDSCINPN,' ') AS EDSCINPN , nvl( f.EDSCDESC,' ') AS DAMTEL,  nvl( f.edonm,' ') AS DAMNAME,    nvl(DOCTDOCT,' ') AS USERCODE, nvl(DOCTFRDT,' ') AS USERSTART, nvl(DOCTTODT,' ') AS USEREND, ";
                sqlStr+=" nvl(DOCTPIDN,' ') AS USERPID, nvl(DOCTDONM,' ') AS USERNAME, nvl(DOCTDEPT,' ') AS USERDEPT, nvl(DOCTSBDP,' ') AS USERBDEPT, nvl(DOCTSPEC,' ') AS USERSPEC, nvl(DOCTODPT,' ')AS USERODPT FROM   PMOOTPTH A  , PMCPTBSM   ,  picbscdm B ,  ";
          		sqlStr+=" (SELECT  bodyidno, bodywegt, bodyinch   from ( select bodyidno, bodywegt, bodyinch from ocsbodyh  where   bodyidno=";
         			sqlStr+="'"+ptId+"'"; 
          		sqlStr+=" order  by bodyordt desc )  ";
   	   		      sqlStr+=" where rownum=1) e ,  (    SELECT   edscidno, EDSCINPN, EDSCDESC, DOCT_DONM(edscinpn, edscmddt) edonm  ";
		         sqlStr+=" from   ocsedsch  where  edscidno = ";
           	  sqlStr+="'"+ptId+"'";//-// 등록번호
              sqlStr+=" and   edscmddt = ";
               sqlStr+="'"+otDate+"'";// --// 입원일자
              sqlStr+=" and   edscgubn = 'J'   and  ";
                sqlStr+="'"+today+"'"; 
              sqlStr+=" between EDSCINDT and edscoudt  and   rownum = 1 ) f , (SELECT DOCTDOCT,DOCTFRDT,DOCTTODT,DOCTPIDN,DOCTDONM,DOCTDEPT, DOCTSBDP,DOCTSPEC,DOCTODPT FROM  pmbdoctm ";
               sqlStr+=" WHERE  ( ( doctcskw='S' AND doctpidn= ";
                sqlStr+="'"+usrId+"'";//00002' 
               sqlStr+=" ) or   ( doctcskw='N' AND doctpidn=";
                sqlStr+="'"+usrId+"'";
                 sqlStr+=" )  )   AND  to_char(sysdate,'yyyymmdd')  between  doctfrdt and docttodt and  rownum = 1 ) g   WHERE  OTPTIDNO=";
              sqlStr+="'"+ptId+"'";//10026999' 
         		sqlStr+=" AND   otptdate = ";
         		sqlStr+="'"+otDate+"'";//20120628'  
         		sqlStr+=" AND   otptdept = ";
          	sqlStr+="'"+pDept+"'";
          	sqlStr+=" AND otptrgtp = 'O'";          	
      			sqlStr+=" AND   otptrgst in ('R','S') and  ptbsidno = otptidno  AND   BSCDGUBN(+) = '31' AND   BSCDCODE(+) = OTPTKIND and   e.bodyidno(+) = A.otptidno and   f.edscidno(+) = A.otptidno	";
      			
      			
      					return DoSql(sqlStr);
	}*/
	/*
	List getEmerInfo(String ptId,String otDate,String usrId,String today, String pDept) //pt,pt, ot to , usr, usr, pt ot
	{//otptdept= 'ER' AND otptrgtp = 'O'
				String sqlStr="   SELECT PTBSIDNO as PTIDNO,PTBSNAME AS PTNAME,PTBSRRNF AS JUMINA,PTBSRRNS AS JUMINB,PTBSRRNF||'-'||PTBSRRNS AS JUNUM, SEX_FND(PTBSRRNS) AS SEX, ";
       			sqlStr+=" to_char(  to_number(substr(to_char(SYSDATE, 'YYYY/MM/DD'),1,4)) - to_number(decode(substr(ptbsrrns,1,1),'3','20','4','20','0','18','9','18','19')||substr(ptbsrrnf,1,2)) - to_number((decode( substr( to_char( to_number(substr(to_char(SYSDATE, 'YYYYMMDD'),5,4)) - to_number(substr(ptbsrrnf,3,4))), 1,1 ), '-', '1', '0') )))  as  AGE ,  ";
            		sqlStr+=" PTBSTELN AS PTTEL, PTBSZIPF AS PTZIPA, PTBSZIPS AS PTZIPB, PTBS_ADDR(PTBSIDNO) AS ADDR,BLOOD_DESC(PTBSIDNO) AS BLOOD, PTBSHPNO PTPNO,  PTBSEMAL AS PTMAL,A.OTPTIDNO, A.OTPTDATE, A.OTPTTIME, ";
             	sqlStr+=" A.OTPTDATE||A.OTPTTIME   as DAYTIME, DEPT_DPDS(A.OTPTDEPT) as DEPTCODE,  A.OTPTSBDP, A.OTPTDOCT,A.OTPTPIDN,  DOCT_DONM(A.OTPTPIDN,A.OTPTDATE) as DOCNAME,";
             	sqlStr+=" A.OTPTMETP,A.OTPTKIND,  nvl( B.BSCDDESC , ' ' ) as BSCDDESC, nvl(e.bodyidno,' ') AS BODYIDNO, nvl(e.bodywegt,' ') AS BODYWEGT,  nvl(e.bodyinch, ' ') AS BODYINCH ";
            		sqlStr+=" , nvl( f.EDSCINPN,' ') AS EDSCINPN , nvl( f.EDSCDESC,' ') AS DAMTEL,  nvl( f.edonm,' ') AS DAMNAME,    nvl(DOCTDOCT,' ') AS USERCODE, nvl(DOCTFRDT,' ') AS USERSTART, nvl(DOCTTODT,' ') AS USEREND, ";
                sqlStr+=" nvl(DOCTPIDN,' ') AS USERPID, nvl(DOCTDONM,' ') AS USERNAME, nvl(DOCTDEPT,' ') AS USERDEPT, nvl(DOCTSBDP,' ') AS USERBDEPT, nvl(DOCTSPEC,' ') AS USERSPEC, nvl(DOCTODPT,' ')AS USERODPT FROM   PMOOTPTH A  , PMCPTBSM   ,  picbscdm B ,  ";
          		sqlStr+=" (SELECT  bodyidno, bodywegt, bodyinch   from ( select bodyidno, bodywegt, bodyinch from ocsbodyh  where   bodyidno=";
         			sqlStr+="'"+ptId+"'"; 
          		sqlStr+=" order  by bodyordt desc )  ";
   	   		      sqlStr+=" where rownum=1) e ,  (    SELECT   edscidno, EDSCINPN, EDSCDESC, DOCT_DONM(edscinpn, edscmddt) edonm  ";
		         sqlStr+=" from   ocsedsch  where  edscidno = ";
           	  sqlStr+="'"+ptId+"'";//-// 등록번호
              sqlStr+=" and   edscmddt = ";
               sqlStr+="'"+otDate+"'";// --// 입원일자
              sqlStr+=" and   edscgubn = 'J'   and  ";
                sqlStr+="'"+today+"'"; 
              sqlStr+=" between EDSCINDT and edscoudt  and   rownum = 1 ) f , (SELECT DOCTDOCT,DOCTFRDT,DOCTTODT,DOCTPIDN,DOCTDONM,DOCTDEPT, DOCTSBDP,DOCTSPEC,DOCTODPT FROM  pmbdoctm ";
               sqlStr+=" WHERE  ( ( doctcskw='S' AND doctpidn= ";
                sqlStr+="'"+usrId+"'";//00002' 
               sqlStr+=" ) or   ( doctcskw='N' AND doctpidn=";
                sqlStr+="'"+usrId+"'";
                 sqlStr+=" )  )   AND  to_char(sysdate,'yyyymmdd')  between  doctfrdt and docttodt and  rownum = 1 ) g   WHERE  OTPTIDNO=";
              sqlStr+="'"+ptId+"'";//10026999' 
         		sqlStr+=" AND   otptdate = ";
         		sqlStr+="'"+otDate+"'";//20120628'  
         		sqlStr+=" AND   otptdept= 'ER' AND otptrgtp = 'O'";          	
      			sqlStr+=" AND   otptrgst in ('R','S') and  ptbsidno = otptidno  AND   BSCDGUBN(+) = '31' AND   BSCDCODE(+) = OTPTKIND and   e.bodyidno(+) = A.otptidno and   f.edscidno(+) = A.otptidno	";
  
  				return DoSql(sqlStr);		
	}
	*/
	/*
	List getScanChartInfo(String ptId)
	{
		String sqlStr=" select INDEXNAME, A.INDEXCODE, A.ITEMCOUNT FROM  (select COUNT(*) as ITEMCOUNT,INDEXCODE from  t_image@iemr3_bkmed where  PATNO=";
				  sqlStr+="'"+ptId+"'";
				  sqlStr+=" group by INDEXCODE) A,  t_index@iemr3_bkmed B where A.INDEXCODE=B.INDEXCODE  order by INDEXNAME ";
				  
				  return DoSql(sqlStr);
	}*/
	
	
%>
<% jw=out; %>
