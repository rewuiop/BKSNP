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
<%@ include file="/SDK/BK_SDK.jsp" %>
<%@page contentType="text/html;charset=EUC-KR"%>
<script src='/EMR_DATA/SDK/BK_SDK.js?v=1.0.5'></script>
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
 	String login_id="";
 	String chosNo="";
 	
	out.clear();
	for(int i=0; i<len; i++)
	{
		String fname = getRequestHeadInfo(res, i, "name");
		/*if(fname.equals("getPatientInfo"))
		{
			ptId=getRequestValue(res,i,1,"ptId");//"10838186";		
			if(ptId !=null)
			{
				List x1=getBKpatientsInformaiton(ptId);
				MakeResponse4String("getPatientInfo", x1, null,out);
			}
		}
	else */
	if(fname.equals("getUserName"))
	{
		//String sqlStr="SELECT USERNAME,USERFRDT,USERTODT,USERDEPT,USERCSKW FROM ETL_PICUSERM WHERE USERPIDN = ? ";
		String sqlStr="SELECT USERNAME,USERFRDT,USERTODT,USERDEPT,USERCSKW,CASE when USERDEPT = ? then 0 else 1 end POS FROM ETL_PICUSERM WHERE USERPIDN = ?  order by POS ";

		usrId=getRequestValue(res,i,1,"usrId");
		String usrDept=getRequestValue(res,i,1,"usrDept");
		
		String[] param = new String[2];
		param[0]=usrDept;
		param[1]=usrId;
			
		List result=DoSql_PS(sqlStr,param);
			
		out.clear();
		MakeResponse4String("getUserName",result,null,out);
	}

	else if(fname.equals("getHwanjaInfo"))
		{	
			//String sqlStr="SELECT 등록번호,이름,생년월일,성별,혈액형,키,몸무게,입원구분,입원일,퇴원일,환자과명,환자과코드,담당의,주민뒷자리,병동,병실, ";
			String sqlStr="SELECT 등록번호,이름,생년월일,성별,혈액형,키,몸무게,주민뒷자리, ";
						sqlStr+=" to_char(  to_number(substr(to_char(SYSDATE, 'YYYY/MM/DD'),1,4)) - to_number(decode(substr(주민뒷자리,1,1),'3','20','4','20','0','18','9','18','19')||substr(생년월일,1,2)) -  to_number((decode( substr( to_char( to_number(substr(to_char(SYSDATE, 'YYYYMMDD'),5,4)) -  to_number(substr(생년월일,3,4))), 1,1 ), '-', '1', '0') ))) as 나이 ";
						sqlStr+=" from BKEMRPATI WHERE 등록번호= ? ";
			ptId=getRequestValue(res,i,1,"ptId");
			
			String[] param1=new String[1];
			param1[0]=ptId;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getHwanjaInfo",result,null,out);
		}
		

	else if(fname.equals("getUserInfo"))
	{
		String sqlStr="SELECT 등록번호,이름,담당과명,담당과코드,연락처,구분  FROM  BKEMRUSER WHERE 등록번호 = ? ";

		usrId=getRequestValue(res,i,1,"usrId");
		String[] param4=new String[1];
		param4[0]=usrId;

		List result=DoSql_PS(sqlStr,param4);
		out.clear();
		MakeResponse4String("getUserInfo", result, null,out);
		
	}


	else if(fname.equals("getRecInfo"))
		{
			String sqlStr=" SELECT T.COMMON_CODE, T.NAME, A.* FROM (SELECT S.* FROM BERDMRECD S, ( SELECT CODE, MAX(SEQ_NO) AS SN FROM BERDMRECD GROUP BY CODE ) B WHERE S.CODE = B.CODE  AND S.SEQ_NO = B.SN  ) A, ";
 					  sqlStr+=" ( SELECT S1.* FROM BERDHDOCU S1, ( SELECT CODE, MAX(CAST(VERSION AS INT)) AS VS FROM BERDHDOCU WHERE FOLDER='0' GROUP BY CODE ) S2  WHERE S1.CODE = S2.CODE AND S1.VERSION = CONVERT(VARCHAR(20),S2.VS)) T WHERE T.CODE = A.DOC_CODE  AND A.CODE= ? ";
		
			String recCode=getRequestValue(res,i,1,"recCode");
			String[] param7= new String[1];
			param7[0]=recCode;
			
			List result=DoSql_PS(sqlStr,param7);
			out.clear();
			MakeResponse4String("getRecInfo", result, null,out);
		}
		

		
	else if(fname.equals("getRecentRec"))
	{
	String sqlStr="SELECT T.COMMON_CODE, T.NAME, A.* FROM (SELECT S.* FROM BERDMRECD S, ( SELECT CODE, MAX(CAST(SEQ_NO AS INT)) AS SN,STATUS,TEMPSAVE FROM BERDMRECD GROUP BY CODE,STATUS,TEMPSAVE ) B WHERE S.CODE = B.CODE AND B.CODE = ?  AND B.STATUS='0' AND B.TEMPSAVE='0'  AND S.SEQ_NO = B.SN ) A, ( SELECT S1.* FROM BERDHDOCU S1, ( SELECT CODE, MAX(CAST(VERSION AS INT)) AS VS FROM BERDHDOCU WHERE FOLDER='0' GROUP BY CODE ) S2  WHERE S1.CODE = S2.CODE AND S1.VERSION = CONVERT(VARCHAR(20),S2.VS) ) T WHERE T.CODE = A.DOC_CODE  AND 1=1 ORDER BY MODIFY_TIME ASC";
	//"SELECT S.* FROM BERDMRECD S, (SELECT CODE, MAX(SEQ_NO) AS SN FROM BERDMRECD GROUP BY CODE) B WHERE S.CODE = B.CODE AND B.CODE = ?  AND S.SEQ_NO = B.SN";
	String recCode = getRequestValue(res,0,1,"recCode");	
//SEQ_NO, CODE, STATUS,DOC_CODE,PTID,RPID,CATEGORY1,CATEGORY2,CATEGORY3,CREATOR_CODE,CREATE_TIME,MODIFIER_CODE,MODIFY_TIME,SIGNER_CODE,SIGN_TIME,COSIGNER_CODE,COSIGN_TIME,PRINTED,FILENAME,RECORDTYPE,INCOMPLETE,TEMPSAVE,DEPARTMENT,CHOS_NO,SIGNLEVEL,EXT_RECD_CODE,DOC_VER,INSF_DOC_CODE,SIGNER_CODE2,SIGN_TIME2,COSIGNER_CODE2,COSIGN_TIME2,RECORD_TIME,COSIGN_CANDIATE_CD
	String[] param4 = new String[1];
	param4[0]=recCode;
	
	
	List result=DoSql_PS(sqlStr,param4);
	out.clear();
	MakeResponse4String("RECENT_REC", result, null,out);

	}
else if(fname.equals("getScanData"))
	{
		String sqlStr="select INDEXNAME, A.INDEXCODE,SEQ,PAGE,IMAGENO,IP,PATH,PATHUSER,PATHPW from t_image@iemr3_bkmed A, ";
 				  sqlStr+=" t_index@iemr3_bkmed B, t_path@iemr3_bkmed C  where PATNO=? AND A.INDEXCODE=? and A.INDEXCODE=B.INDEXCODE and A.PATHID=C.PATHID order by INDEXNAME,SEQ,PAGE";
 		
 		ptId=getRequestValue(res,0,1,"ptId");
 		String indexCode=getRequestValue(res,0,1,"indexCode");
 		
 		String[] param5 = new String[2];
 		param5[0]=ptId;
 		param5[1]=indexCode;
 		
 		List result=DoSql_PS(sqlStr,param5);
 		out.clear();
 		MakeResponse4String("SCAN_DATA",result,null,out);
	}



	
else if(fname.equals("getCateList"))
	{
	//	String sqlStr="Select SEQ_NO,CODE,NAME,VERSION,FOLDER,PID,DOCTYPE,STARTTIME,ENDTIME,DEPARTMENT1,USE,DEPARTMENT2,DEPARTMENT3,DEPARTMENT4,DEPARTMENT5,CATEGORY1,CATEGORY2,CATEGORY3,CREATOR,MODIFIER,CREATETIME,MODIFYTIME,RECORDTYPE,RECORDEVENT,RECORDAREA,RECORDLEVEL,MANDATORY,DEPSHARE,EN_INPUT,SIGN,TEMPSAVEVIEW,COSIGN,COSIGNLEVEL,COSIGNPRINT,PRIVATEDOC,WRITELEVEL,VIEWLEVEL,FILE_INPUT,FILE_VIEW,FILE_PRINT,FILE_MODIFY,DEV_DESIGN,DEV_MODEL,DEV_MAPPING,DEV_TEST,DEV_PROGRESS,DESCRIPTION,COMMON_CODE,CONNECTED_DOC_CODE,FILE_DOCU,TITLE,POS,REQ_DEPARTMENT,INSF_DOC_CODE,SINGLE_PRINT_YN,DOC_SEARCH_YN,REC_SEARCH_YN,PRINT_STORAGE,AMEND_LEVEL,OCTY_CD,MODIFYLEVEL,CONNECTED_DOC_CODE2 from BERDMDOCU";
		
		String sqlStr = "SELECT * FROM BERDHDOCU WHERE FOLDER = '1' ORDER BY PID, POS";
		
		List result=DoSql(sqlStr);
		out.clear();
		MakeResponse4String("getCateList",result,null,out);		
	}



	
else if(fname.equals("getCateList2"))
	{
	//	String sqlStr="Select SEQ_NO,CODE,NAME,VERSION,FOLDER,PID,DOCTYPE,STARTTIME,ENDTIME,DEPARTMENT1,USE,DEPARTMENT2,DEPARTMENT3,DEPARTMENT4,DEPARTMENT5,CATEGORY1,CATEGORY2,CATEGORY3,CREATOR,MODIFIER,CREATETIME,MODIFYTIME,RECORDTYPE,RECORDEVENT,RECORDAREA,RECORDLEVEL,MANDATORY,DEPSHARE,EN_INPUT,SIGN,TEMPSAVEVIEW,COSIGN,COSIGNLEVEL,COSIGNPRINT,PRIVATEDOC,WRITELEVEL,VIEWLEVEL,FILE_INPUT,FILE_VIEW,FILE_PRINT,FILE_MODIFY,DEV_DESIGN,DEV_MODEL,DEV_MAPPING,DEV_TEST,DEV_PROGRESS,DESCRIPTION,COMMON_CODE,CONNECTED_DOC_CODE,FILE_DOCU,TITLE,POS,REQ_DEPARTMENT,INSF_DOC_CODE,SINGLE_PRINT_YN,DOC_SEARCH_YN,REC_SEARCH_YN,PRINT_STORAGE,AMEND_LEVEL,OCTY_CD,MODIFYLEVEL,CONNECTED_DOC_CODE2 from BERDMDOCU";
		
		String sqlStr = "SELECT SEQ_NO,CODE,NAME,FOLDER,PID,DOCTYPE,FILE_INPUT,FILE_VIEW,FILE_PRINT,FILE_MODIFY,DESCRIPTION,COMMON_CODE,FILE_DOCU,CATEGORY1,CATEGORY2,CATEGORY3 FROM BERDHDOCU WHERE FOLDER = '1' ORDER BY PID, POS";
		
		List result=DoSql(sqlStr);
		out.clear();
		MakeResponse4String("getCateList2",result,null,out);		
	}

else if(fname.equals("getDocuList"))
	{
	//	String sqlStr="Select SEQ_NO,CODE,NAME,VERSION,FOLDER,PID,DOCTYPE,STARTTIME,ENDTIME,DEPARTMENT1,USE,DEPARTMENT2,DEPARTMENT3,DEPARTMENT4,DEPARTMENT5,CATEGORY1,CATEGORY2,CATEGORY3,CREATOR,MODIFIER,CREATETIME,MODIFYTIME,RECORDTYPE,RECORDEVENT,RECORDAREA,RECORDLEVEL,MANDATORY,DEPSHARE,EN_INPUT,SIGN,TEMPSAVEVIEW,COSIGN,COSIGNLEVEL,COSIGNPRINT,PRIVATEDOC,WRITELEVEL,VIEWLEVEL,FILE_INPUT,FILE_VIEW,FILE_PRINT,FILE_MODIFY,DEV_DESIGN,DEV_MODEL,DEV_MAPPING,DEV_TEST,DEV_PROGRESS,DESCRIPTION,COMMON_CODE,CONNECTED_DOC_CODE,FILE_DOCU,TITLE,POS,REQ_DEPARTMENT,INSF_DOC_CODE,SINGLE_PRINT_YN,DOC_SEARCH_YN,REC_SEARCH_YN,PRINT_STORAGE,AMEND_LEVEL,OCTY_CD,MODIFYLEVEL,CONNECTED_DOC_CODE2 from BERDMDOCU";
	
		String sqlStr = " SELECT C.* FROM BERDHDOCU C, ( SELECT MAX(A.SEQ_NO) AS SN, B.CODE, B.VS FROM BERDHDOCU A ,(  "
	              + " SELECT CODE, MAX(CAST(VERSION AS INT)) AS VS FROM BERDHDOCU WHERE FOLDER = '0' GROUP BY CODE )B WHERE A.CODE = B.CODE AND A.VERSION = B.VS "
                + " GROUP BY B.CODE, B.VS )D WHERE C.SEQ_NO = D.SN AND C.DOCTYPE = '0'   and  C.modifytime >'2013-01-21' ";
		
		List result=DoSql(sqlStr);
		out.clear();
		MakeResponse4String("getDocuList",result,null,out);		
	}
	
else if(fname.equals("getDocuListAll"))
	{
	//	String sqlStr="Select SEQ_NO,CODE,NAME,VERSION,FOLDER,PID,DOCTYPE,STARTTIME,ENDTIME,DEPARTMENT1,USE,DEPARTMENT2,DEPARTMENT3,DEPARTMENT4,DEPARTMENT5,CATEGORY1,CATEGORY2,CATEGORY3,CREATOR,MODIFIER,CREATETIME,MODIFYTIME,RECORDTYPE,RECORDEVENT,RECORDAREA,RECORDLEVEL,MANDATORY,DEPSHARE,EN_INPUT,SIGN,TEMPSAVEVIEW,COSIGN,COSIGNLEVEL,COSIGNPRINT,PRIVATEDOC,WRITELEVEL,VIEWLEVEL,FILE_INPUT,FILE_VIEW,FILE_PRINT,FILE_MODIFY,DEV_DESIGN,DEV_MODEL,DEV_MAPPING,DEV_TEST,DEV_PROGRESS,DESCRIPTION,COMMON_CODE,CONNECTED_DOC_CODE,FILE_DOCU,TITLE,POS,REQ_DEPARTMENT,INSF_DOC_CODE,SINGLE_PRINT_YN,DOC_SEARCH_YN,REC_SEARCH_YN,PRINT_STORAGE,AMEND_LEVEL,OCTY_CD,MODIFYLEVEL,CONNECTED_DOC_CODE2 from BERDMDOCU";
	
		String sqlStr = " SELECT C.* FROM BERDHDOCU C, ( SELECT MAX(A.SEQ_NO) AS SN, B.CODE, B.VS FROM BERDHDOCU A ,(  "
	              + " SELECT CODE, MAX(CAST(VERSION AS INT)) AS VS FROM BERDHDOCU WHERE FOLDER = '0' GROUP BY CODE )B WHERE A.CODE = B.CODE AND A.VERSION = B.VS "
                + " GROUP BY B.CODE, B.VS )D WHERE C.SEQ_NO = D.SN AND C.DOCTYPE = '0'    ";
		
		List result=DoSql(sqlStr);
		out.clear();
		MakeResponse4String("getDocuList",result,null,out);		
	}
else if(fname.equals("getWardPatList"))
	{
		String sqlStr="SELECT 등록번호,이름,생년월일,성별,혈액형,키,몸무게,입원구분,입원일,퇴원일,환자과명,환자과코드,담당의,주민뒷자리,병동,병실, ";
					sqlStr+=" to_char(  to_number(substr(to_char(SYSDATE, 'YYYY/MM/DD'),1,4)) - to_number(decode(substr(주민뒷자리,1,1),'3','20','4','20','0','18','9','18','19')||substr(생년월일,1,2)) -  to_number((decode( substr( to_char( to_number(substr(to_char(SYSDATE, 'YYYYMMDD'),5,4)) -  to_number(substr(생년월일,3,4))), 1,1 ), '-', '1', '0') ))) as 나이 ";
					sqlStr+=" from BKEMRPATI where 병동= ? ";
		
		
		String wardNo=getRequestValue(res,0,1,"wardNo");		
		String[] param6 = new String[1];
		param6[0]=wardNo;
		
		List result=DoSql_PS(sqlStr,param6);
		out.clear();
		MakeResponse4String("getWardPatList",result,null,out);
	}	
	else if(fname.equals("getDamDocInfo"))
	{
		String sqlStr="SELECT 이름,연락처  FROM  BKEMRUSER WHERE 이름 = ? ";
		
		String DocName=getRequestValue(res,0,1,"DocName");
		String[] param9=new String[1];
		param9[0]=DocName;
		
		List result=DoSql_PS(sqlStr,param9);
		out.clear();
		MakeResponse4String("getDamDocInfo",result,null,out);
	}
	else if(fname.equals("getRecList"))
	{
		String 	sqlStr = " SELECT T.COMMON_CODE, T.NAME, A.* FROM ( SELECT S.* FROM BERDMRECD S, ( SELECT CODE, MAX(SEQ_NO) AS SN FROM BERDMRECD GROUP BY CODE ) B WHERE S.CODE = B.CODE  AND S.SEQ_NO = B.SN ) A, "
					       + " (  SELECT S1.* FROM BERDHDOCU S1, ( SELECT CODE, MAX(CAST(VERSION AS INT)) AS VS FROM BERDHDOCU WHERE FOLDER='0' GROUP BY CODE ) S2  WHERE S1.CODE = S2.CODE AND S1.VERSION = CONVERT(VARCHAR(20),S2.VS)  ) T WHERE T.CODE = A.DOC_CODE "
						    + " AND A.PTID = ? ";
		
		 ptId=getRequestValue(res,0,1,"ptIdno");
		String[] param10=new String[1];
		param10[0]=ptId;
		
		List result=DoSql_PS(sqlStr,param10);
		out.clear();
		MakeResponse4String("getRecList",result,null,out);
	}
	else if(fname.equals("getWardPatient"))
	{
			String sqlStr="SELECT 등록번호,이름,생년월일,성별,혈액형,키,몸무게,입원구분,입원일,퇴원일,환자과명,환자과코드,담당의,주민뒷자리,병동,병실, ";
						sqlStr+=" to_char(  to_number(substr(to_char(SYSDATE, 'YYYY/MM/DD'),1,4)) - to_number(decode(substr(주민뒷자리,1,1),'3','20','4','20','0','18','9','18','19')||substr(생년월일,1,2)) -  to_number((decode( substr( to_char( to_number(substr(to_char(SYSDATE, 'YYYYMMDD'),5,4)) -  to_number(substr(생년월일,3,4))), 1,1 ), '-', '1', '0') ))) as 나이 ";
						sqlStr+=" from BKEMRPATI WHERE 병동= ? order by 병실 ";
		
		String wardNo=getRequestValue(res,0,1,"wardNo");
		String[] param11=new String[1];
		param11[0]=wardNo;
		
		List result=DoSql_PS(sqlStr,param11);
		out.clear();
		MakeResponse4String("getWardPatient",result,null,out);	
	}
	/*else if(fname.equals("getClickedDocList"))
	{	
	
		String sqlStr = " SELECT C.CODE, C.NAME, C.PID, C.DOCTYPE, C.FILE_INPUT, C.FILE_VIEW, C.FILE_PRINT, C.FILE_MODIFY,C.COMMON_CODE, C.FILE_DOCU, C.CATEGORY1, C.CATEGORY2, C.CATEGORY3,C.DEPARTMENT1,C.DEPARTMENT2,C.DEPARTMENT3,C.DEPARTMENT4,C.DEPARTMENT5 FROM BERDHDOCU C, ( SELECT MAX(A.SEQ_NO) AS SN, B.CODE, B.VS FROM BERDHDOCU A ,(  "
	              + " SELECT CODE, MAX(CAST(VERSION AS INT)) AS VS FROM BERDHDOCU WHERE FOLDER = '0' GROUP BY CODE )B WHERE A.CODE = B.CODE AND A.VERSION = B.VS AND PID= ? "
                + " GROUP BY B.CODE, B.VS )D WHERE C.SEQ_NO = D.SN AND C.DOCTYPE = '0'    ";
		//CODE,NAME,PID,DOCTYPE,FILE_INPUT,FILE_VIEW,FILE_PRINT,FILE_MODIFY,COMMON_CODE,FILE_DOCU,CATEGORY1,CATEGORY2,CATEGORY3,DEPARTMENT1,DEPARTMENT2,DEPARTMENT3,DEPARTMENT4,DEPARTMENT5
		
		String docCode=getRequestValue(res,0,1,"docCode");
		String[] param12=new String[1];
		param12[0]=docCode;
		
		List result=DoSql_PS(sqlStr,param12);
		out.clear();
		MakeResponse4String("getClickedDocList",result,null,out);		
	}*/
	
	
	else if(fname.equals("getPatiChosNo"))
	{	
	
		//String sqlStr = "SELECT 내원번호,입원구분,입원일,환자과코드  FROM BKEMRCHOS WHERE 등록번호 =? ORDER BY 입원일 DESC ";
		String sqlStr = "SELECT CHOS,IWFL,IWDT,DEID  FROM BKEMRCHOS WHERE PAID=? ORDER BY IWDT DESC ";
		
		ptId=getRequestValue(res,i,1,"ptId");
		String[] param13=new String[1];
		param13[0]=ptId;
		
		List result=DoSql_PS(sqlStr,param13);
		out.clear();
		MakeResponse4String("getPatiChosNo",result,null,out);		
	}
	
	else if(fname.equals("getBKUser"))
	{		
		//String sqlStr = "SELECT 등록번호,이름,담당과명,담당과코드,연락처,구분  FROM  BKEMRUSER WHERE 등록번호 = ? ";
		String sqlStr = "SELECT 등록번호,이름,담당과코드,연락처,구분  FROM  BKEMRUSER WHERE 등록번호 = ? ";
		
		usrId=getRequestValue(res,i,1,"usrId");
		String[] param14=new String[1];
		param14[0]=usrId;
		
		List result=DoSql_PS(sqlStr,param14);
		out.clear();
		MakeResponse4String("getBKUser",result,null,out);		
	}
	//--------------------------------------------------------
	else if(fname.equals("getUserInfo2"))
	{
		String sqlStr="SELECT NVL(MAX(이름),'Guest')as 이름, NVL(MAX(담당과코드),'Guest')as 담당과명 FROM BKEMRUSER WHERE 등록번호 = ?";

		login_id=getRequestValue(res,i,1,"login_id");
		String[] param15=new String[1];
		param15[0]=login_id;

		List result=DoSql_PS(sqlStr,param15);
		out.clear();
		MakeResponse4String("getUserInfo2", result, null,out);
	}
	
		else if(fname.equals("hjListALL"))
	{
		String sqlStr="select a.이름, b.내원번호, b.입원구분 from bkemrpati a join bkemrchos b on a.등록번호 = b.등록번호";

		List result=DoSql(sqlStr);
		out.clear();
		MakeResponse4String("hjListALL",result,null,out);		
	}
	/*
		else if(fname.equals("getHwanjaInfo2"))
		{	
			//String sqlStr="SELECT 등록번호,이름,생년월일,성별,혈액형,키,몸무게,입원구분,입원일,퇴원일,환자과명,환자과코드,담당의,주민뒷자리,병동,병실, ";
			String sqlStr="select a.등록번호 as 등록번호, a.이름 as 이름, a.생년월일 as 생년월일, a.성별 as 성별, a.혈액형 as 혈액형, a.키 as 키, a.몸무게 as 몸무게, b.입원구분 as 입원구분, b.입원일 as 입원일, b.퇴원일 as 퇴원일, c.name as 환자과명, b.환자과코드 as 환자과코드, b.담당의 as 담당의, a.주민뒷자리 as 주민뒷자리, b.병동 as 병동, b.병실 as 병실, a.나이 as 나이 "
										+	"from bkemrpati a "
										+	"join bkemrchos b on a.등록번호 = b.등록번호 "
										+	"join bkemrdept c on b.환자과코드 = c.CODE "
										+	"where b.내원번호 = ?";
			chosNo=getRequestValue(res,i,1,"chosNo");
			
			String[] param1=new String[1];
			param1[0]=chosNo;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getHwanjaInfo2",result,null,out);
		}*/
		//추가
		else if(fname.equals("getHwanjaInfo2"))
		{
			String sqlStr="SELECT otptidno "
							      +"   , ptbsname "
							      +"   , ptbsrrnf + '-' + SUBSTRING(ptbsrrns,1,1) +'******' AS jumin "
							      +"   , CONVERT(int, SUBSTRING(otptdate,1,4)) - CONVERT(int,CASE SUBSTRING(ptbsrrns,1,1) "
							      +"                                      WHEN '3' THEN '20'+SUBSTRING(ptbsrrnf,1,2) "
							      +"                                      WHEN '4' THEN '20'+SUBSTRING(ptbsrrnf,1,2) "
							      +"                                      WHEN '7' THEN '20'+SUBSTRING(ptbsrrnf,1,2) "
							      +"                                      WHEN '8' THEN '20'+SUBSTRING(ptbsrrnf,1,2) "
							      +"                                      WHEN '9' THEN '18'+SUBSTRING(ptbsrrnf,1,2) "
							      +"                                      WHEN '0' THEN '18'+SUBSTRING(ptbsrrnf,1,2) "
							      +"                                      ELSE '19'+SUBSTRING(ptbsrrnf,1,2) END) - "
							      +"                   CASE WHEN SUBSTRING(ptbsrrnf,3,4) > SUBSTRING(otptdate,5,4) THEN "
							      +"                            1 ELSE 0 END AS age, "
							      +"                   CASE WHEN SUBSTRING(ptbsrrns,1,1) IN ('1','3','5','7','9') THEN "
							      +"                            'M' ELSE 'F' END AS sex "
							      +"  , ptbshpno "
							      +"  , userpidn "
							      +"  , username  "
							      +"  , otptdate  "
							      +"  , otptdept "
							      +"  , CASE SUBSTRING(ptbsrrns,1,1) "
						          +"      WHEN '3' THEN '20' "
						          +"      WHEN '4' THEN '20' "
						          +"      WHEN '7' THEN '20' "
						          +"      WHEN '8' THEN '20' "
						          +"      WHEN '9' THEN '18' "
						          +"      WHEN '0' THEN '18' "
						          +"      ELSE '19' END  + SUBSTRING(ptbsrrnf,1,2) "
						          +"      + '-' + SUBSTRING(ptbsrrnf,3,2) "
						          +"      + '-' + SUBSTRING(ptbsrrnf,5,2) AS birthdate "
								   +" FROM  pat..pmootpth, pat..pmcptbsm, pat..picuserm "
								   +" WHERE 1=1 AND "
							       +"    otptidno = ?  AND "
							       +"    otptdate = ? AND "
							       +"    otptdept = ? AND "
							       +"    otptrgst IN ('R','S')     AND "
							       +"    otptidno = ptbsidno AND "
							       +"    otptdept = userdept  AND "
							       +"    otptdoct = userdoct  AND "
							       +"    otptdate BETWEEN userfrdt AND usertodt AND "
							       +"    usercskw IN ('R','S') AND "
							       +"    username LIKE CASE WHEN SUBSTRING(userdoct,3,2) = '99' THEN "
							       +"                                  '%일반%' ELSE '%' END ";
			String pid=getRequestValue(res,i,1,"pid");
			String medDate=getRequestValue(res,i,1,"medDate");
			String dept=getRequestValue(res,i,1,"dept");
			
			String[] param1=new String[3];
			param1[0]=pid;
			param1[1]=medDate;
			param1[2]=dept;
			
			List result=DoSql_PS_OCS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getHwanjaInfo2",result,null,out);
		}
		else if(fname.equals("getHwanjaInfo3"))
		{
			String sqlStr="SELECT ptbsidno , ptbsname , ptbsrrnf + '-' + SUBSTRING(ptbsrrns,1,1) +'******' AS jumin "
									  +" FROM  pat..pmcptbsm "
									 +" WHERE ptbsidno = ? ";
									 
			String pid=getRequestValue(res,i,1,"pid");
			
			String[] param1=new String[1];
			param1[0]=pid;
			
			//List result=DoSql_PS_OCS(sqlStr,param1);
			
			out.clear();
			DoSql_PS_OCS2(sqlStr,param1,out);
			//MakeResponse4String("getHwanjaInfo3",result,null,out);
		}
		else if(fname.equals("getRecdData"))
		{
			String sqlStr="SELECT T.COMMON_CODE, T.NAME, A.* FROM ( SELECT S.* FROM BERDMRECD S, ( SELECT CODE, MAX(SEQ_NO) AS SN FROM BERDMRECD GROUP BY CODE ) B WHERE S.CODE = B.CODE  AND S.SEQ_NO = B.SN ) A, "
										+	" ( SELECT S1.* FROM BERDHDOCU S1, ( SELECT CODE, MAX(CAST(VERSION AS INT)) AS VS FROM BERDHDOCU WHERE FOLDER='0' GROUP BY CODE ) S2  WHERE S1.CODE = S2.CODE AND S1.VERSION = CONVERT(VARCHAR(20),S2.VS)  ) T WHERE T.CODE = A.DOC_CODE  "
										+	" AND A.PTID = ?  order by A.RECORD_TIME DESC";
										
			chosNo=getRequestValue(res,i,1,"pid"); 
			
			String[] param1=new String[1];
			param1[0]=chosNo;
			
			List result=DoSql_PS(sqlStr,param1);
						
			out.clear();
			MakeResponse4String("getRecdData",result,null,out);
		}
		else if(fname.equals("getBitRecdData"))
		{
			String sqlStr=" SELECT  convert(varchar, T.TREATNO) AS TREATNO  ,CL.NAME+ ' ' + INDATE + ' ~ ' + OUTDATE + ' '  + case when u.NAME = '통합의사' then '' else u.NAME end + ' [' + convert(varchar, count(PAGENO)) + ']' AS INFO ,INDATE  "
                     +" FROM emr..TREATT T(index IX_TREATT1 )  ,emr..CHARTPAGET c ,emr..USERT u , emr..CLINICT CL "
                    	+" Where c.TREATNO = T.TREATNO  "
                     + " and T.DOCCODE = u.USERID   "
                     +" and PATID = ? "
                     +" and CLASS ='I' "
                     +" and T.CLINCODE =CL.CLINCODE  and ( c.CERTACTIVE='Y'  OR c.CERTACTIVE=NULL )"
                     +" group by T.TREATNO , T.CLINCODE , T.CLINCODE + ' ' + INDATE + ' ~ ' + OUTDATE + ' '  + case when u.NAME = '통합의사' then '' else u.NAME end ,INDATE  , T.OUTDATE, u.NAME , CL.NAME  "
                     + "order by INDATE  desc ";
                    				
			chosNo=getRequestValue(res,i,1,"pid");
			
			String[] param1=new String[1];
			param1[0]=chosNo;
			
			List result=DoSql_PS(sqlStr,param1);
						
			out.clear();
			MakeResponse4String("getBitRecdData",result,null,out);
		}
		else if(fname.equals("getOPRecdData"))
		{
		/*
			String sqlStr=" SELECT  T.CLINCODE , cl.NAME + ' [' + CONVERT(VARCHAR, count(cp.PAGENO)) + ']' AS INFO ,cl.ORDERBY  "
                     +" FROM emr..TREATT T (index IX_TREATT1 ) ,emr..CHARTPAGET cp, emr..CLINICT cl "
                    	+" WHERE T.TREATNO = cp.TREATNO  "
                     + " AND T.CLINCODE = cl.CLINCODE   "
                     +" and PATID = ? "
                     +" and CLASS ='O' "
                     +" GROUP BY T.CLINCODE , cl.NAME ,cl.ORDERBY  "
                     + " ORDER BY cl.ORDERBY, T.CLINCODE ";
                     */
           String sqlStr=" select CLINCODE, NAME+' [' + CONVERT(VARCHAR, SUM(CNT)) +']' AS INFO, MAX(convert(int,ORDERBY)) as ORDERBY FROM ( "
//								+" select * from( "
								+" SELECT  T.CLINCODE , cl.NAME , count(cp.PAGENO) AS CNT ,cl.ORDERBY   FROM emr..TREATT T (index IX_TREATT1 ) ,emr..CHARTPAGET cp, emr..CLINICT cl  "
								+" WHERE T.TREATNO = cp.TREATNO   AND T.CLINCODE = cl.CLINCODE    and PATID = ?  and CLASS ='O'  and (cp.CERTACTIVE='Y'  OR cp.CERTACTIVE=NULL) GROUP BY T.CLINCODE , cl.NAME ,cl.ORDERBY  "
								+" UNION ALL "
								+" select R.DEPARTMENT AS CLINCODE, DE.DEPTDPDS AS NAME,count(R.CODE) AS CNT, convert(varchar,DE.DEPTSQ01) AS ORDERBY from BERDMRECD R "
								+" left join ETL_PICDEPTM DE on R.DEPARTMENT = DE.DEPTCODE "
								+" inner join ETL_PICUSERM U on R.MODIFIER_CODE = U.USERPIDN   and U.USERDEPT=R.DEPARTMENT  "
								+" where R.PTID= ?  and R.STATUS='0' "
								+" group by R.DEPARTMENT, DE.DEPTDPDS, convert(varchar,DE.DEPTSQ01) "
//								+" ) X "
//								+" group by CLINCODE , NAME ,ORDERBY "
								+" ) XX "
								+" group by CLINCODE, NAME "
								+" order by ORDERBY, CLINCODE ";
                    				
			chosNo=getRequestValue(res,i,1,"pid");
			
			String[] param1=new String[2];
			param1[0]=chosNo;
			param1[1]=chosNo;
			
			//List result=DoSql_PS(sqlStr,param1);
						
			out.clear();
			DoSql_PS2(sqlStr,param1,out);
			//MakeResponse4String("getOPRecdData",result,null,out);
		}
		else if(fname.equals("getRecdDataDept"))
		{
			String sqlStr="SELECT T.COMMON_CODE, T.NAME, A.* FROM ( SELECT S.* FROM BERDMRECD S, ( SELECT CODE, MAX(SEQ_NO) AS SN FROM BERDMRECD GROUP BY CODE ) B WHERE S.CODE = B.CODE  AND S.SEQ_NO = B.SN ) A, "
										+	" ( SELECT S1.* FROM BERDHDOCU S1, ( SELECT CODE, MAX(CAST(VERSION AS INT)) AS VS FROM BERDHDOCU WHERE FOLDER='0' GROUP BY CODE ) S2  WHERE S1.CODE = S2.CODE AND S1.VERSION = CONVERT(VARCHAR(20),S2.VS)  ) T WHERE T.CODE = A.DOC_CODE  "
										+	" AND A.PTID = ?   AND DEPARTMENT = ? order by A.RECORD_TIME DESC";
										
			chosNo=getRequestValue(res,0,1,"pid");
			String dept=getRequestValue(res,0,1,"dept");
			
			String[] param1=new String[2];
			param1[0]=chosNo;
			param1[1]=dept;
			
			List result=DoSql_PS(sqlStr,param1);
						
			out.clear();
			MakeResponse4String("getRecdData",result,null,out);
		}
		else if(fname.equals("getOPRecdDataDept"))
		{
		/*
			String sqlStr="SELECT T.CLINCODE ,INDATE + ' ' + case when u.NAME = '통합의사' then '' else u.NAME end + ' [' + CONVERT(VARCHAR,count(PAGENO)) + ']' AS LEVEL2 ,INDATE ,f.NAME  + ' [' + CONVERT(VARCHAR, count(PAGENO)) + ']' AS LEVEL3, f.ORDERBY  "
                         +" FROM emr..TREATT T (index IX_TREATT1 ) ,emr..CHARTPAGET cp ,emr..FORMT f ,emr..USERT u "
                         +" WHERE cp.TREATNO = T.TREATNO  "
                         +"  AND T.DOCCODE = u.USERID  "
                         +" AND cp.FORMCODE = f.FORMCODE  "
                         +" AND PATID = ?  "
                         +" AND T.CLASS ='O' "
                         +" AND T.CLINCODE = ?  " 
                         +" GROUP BY T.CLINCODE + '_' + CONVERT(VARCHAR, T.TREATNO) + '_' + cp.FORMCODE, T.CLINCODE + '_' + CONVERT(VARCHAR, T.TREATNO) ,f.NAME, f.ORDERBY, "
				           +" 			      T.TREATNO, T.CLINCODE, T.INDATE + ' ' + case when u.NAME = '통합의사' then '' else u.NAME end , T.INDATE , u.NAME "
                         +" ORDER BY INDATE DESC, f.ORDERBY, T.CLINCODE + '_' + CONVERT(VARCHAR, T.TREATNO) + '_' + cp.FORMCODE ";*/
                         
                         
			String top=getRequestValue(res,0,1,"top");
			String topStr = "";
           if(top.equals("1"))
           	topStr = " TOP 1 ";
			String sqlStr=" select "+topStr+" XX.CLINCODE,XX.LEVEL2+' ['+CONVERT(VARCHAR, SUM(XX.CNT)) +']' AS LEVEL2, XX.INDATE,XX.NAME+' ['+case when SDECHECK ='0' then CONVERT(VARCHAR, XX.CNT) else CONVERT(VARCHAR, SUM(XX.CNT)) end  +']' AS LEVEL3,XX.ORDERBY AS ORDERBY , DOC_CODE, CODE, SEQ_NO,XX.NAME,SDECHECK,MODIFY_TIME,TEMPSAVE,CHOS_NO from ( "
//                         +"  select * from ( "
                          +" SELECT u.NAME AS UNAME,T.CLINCODE ,INDATE + ' ' + case when u.NAME = '통합의사' then '' else u.NAME end  AS LEVEL2 ,count(PAGENO) AS CNT ,INDATE ,f.NAME, f.ORDERBY  ,f.FORMCODE AS DOC_CODE, '' AS CODE, '' AS SEQ_NO ,'0' SDECHECK , '' MODIFY_TIME,'' TEMPSAVE, CONVERT(VARCHAR, T.TREATNO) AS CHOS_NO "
                          +" FROM emr..TREATT T (index IX_TREATT1 ) ,emr..CHARTPAGET cp ,emr..FORMT f ,emr..USERT u  "
                          +" WHERE cp.TREATNO = T.TREATNO   "
                           +" AND T.DOCCODE = u.USERID   "
                          +" AND cp.FORMCODE = f.FORMCODE  and ( cp.CERTACTIVE='Y'  OR cp.CERTACTIVE=NULL ) "
                          +" AND PATID = ?   "
                          +" AND T.CLASS ='O'  "
                          +" AND T.CLINCODE = ? "
                          +" GROUP BY T.CLINCODE + '_' + CONVERT(VARCHAR, T.TREATNO) + '_' + cp.FORMCODE, T.CLINCODE + '_' + CONVERT(VARCHAR, T.TREATNO) ,f.NAME,f.FORMCODE, f.ORDERBY,  "
				            +" 			      T.TREATNO, T.CLINCODE, T.INDATE + ' ' + case when u.NAME = '통합의사' then '' else u.NAME end , T.INDATE , u.NAME  "
                          +" UNION ALL "
			 +" select U.USERNAME AS UNAME, R.DEPARTMENT AS CLINCODE, Substring(R.RECORD_TIME,1,4)+Substring(R.RECORD_TIME,6,2)+Substring(R.RECORD_TIME,9,2) +' '+U.USERNAME AS LEVEL2 , "
       +" count(R.CODE) AS CNT, Substring(R.RECORD_TIME,1,4)+Substring(R.RECORD_TIME,6,2)+Substring(R.RECORD_TIME,9,2) AS INDATE  , DO.NAME,'0' AS ORDERBY ,R.DOC_CODE , "
       +" R.CODE,CONVERT(VARCHAR,R.SEQ_NO) ,'1' SDECHECK,  R.MODIFY_TIME,R.TEMPSAVE,R.CHOS_NO  "
       +" from BERDMRECD R  "
       +" left join BERDMDOCU DO on R.DOC_CODE = DO.CODE "
       +" inner join ETL_PICUSERM U on R.MODIFIER_CODE = U.USERPIDN  and U.USERDEPT=R.DEPARTMENT  where R.PTID= ? and R.DEPARTMENT= ?   "
       +" and R.STATUS='0'  and R.RECORD_TIME!=''"
			 +" GROUP BY U.USERNAME, R.DEPARTMENT, Substring(R.RECORD_TIME,1,4)+Substring(R.RECORD_TIME,6,2)+Substring(R.RECORD_TIME,9,2) +' '+U.USERNAME, "
			 +" Substring(R.RECORD_TIME,1,4)+Substring(R.RECORD_TIME,6,2)+Substring(R.RECORD_TIME,9,2) , DO.NAME, R.DOC_CODE , "
       +" R.CODE,CONVERT(VARCHAR,R.SEQ_NO),  R.MODIFY_TIME,R.TEMPSAVE,R.CHOS_NO "
//							+" ) X "
//							+" group by X.INDATE,X.INDATE+'_'+X.UNAME "
							+" ) XX "
							+" group by XX.INDATE, XX.INDATE+'_'+XX.UNAME "
							//+" order by ORDERBY,DOC_CODE, INDATE DESC,LEVEL2,LEVEL3,MODIFY_TIME DESC, SDECHECK "; 
							+" order by  INDATE DESC,LEVEL2,ORDERBY,DOC_CODE,LEVEL3,MODIFY_TIME DESC, SDECHECK ";
			chosNo=getRequestValue(res,0,1,"pid");
			String dept=getRequestValue(res,0,1,"dept");
			
			String[] param1=new String[4];
			param1[0]=chosNo;
			param1[1]=dept;
			param1[2]=chosNo;
			param1[3]=dept;
			
			//List result=DoSql_PS(sqlStr,param1);
			out.clear();
			DoSql_PS2(sqlStr,param1,out);
			//MakeResponse4String("getOPRecdDataDept",result,null,out);
			//MakeResponse4Arr("getOPRecdDataDept",result,null,out);
		}
		else if(fname.equals("getOPRecdDataDept2"))
		{
		/*
			String sqlStr="SELECT T.CLINCODE ,INDATE + ' ' + case when u.NAME = '통합의사' then '' else u.NAME end + ' [' + CONVERT(VARCHAR,count(PAGENO)) + ']' AS LEVEL2 ,INDATE ,f.NAME  + ' [' + CONVERT(VARCHAR, count(PAGENO)) + ']' AS LEVEL3, f.ORDERBY  "
                         +" FROM emr..TREATT T (index IX_TREATT1 ) ,emr..CHARTPAGET cp ,emr..FORMT f ,emr..USERT u "
                         +" WHERE cp.TREATNO = T.TREATNO  "
                         +"  AND T.DOCCODE = u.USERID  "
                         +" AND cp.FORMCODE = f.FORMCODE  "
                         +" AND PATID = ?  "
                         +" AND T.CLASS ='O' "
                         +" AND T.CLINCODE = ?  " 
                         +" GROUP BY T.CLINCODE + '_' + CONVERT(VARCHAR, T.TREATNO) + '_' + cp.FORMCODE, T.CLINCODE + '_' + CONVERT(VARCHAR, T.TREATNO) ,f.NAME, f.ORDERBY, "
				           +" 			      T.TREATNO, T.CLINCODE, T.INDATE + ' ' + case when u.NAME = '통합의사' then '' else u.NAME end , T.INDATE , u.NAME "
                         +" ORDER BY INDATE DESC, f.ORDERBY, T.CLINCODE + '_' + CONVERT(VARCHAR, T.TREATNO) + '_' + cp.FORMCODE ";*/
			String sqlStr=" select XX.CLINCODE,XX.LEVEL2+' ['+CONVERT(VARCHAR, SUM(XX.CNT)) +']' AS LEVEL2, XX.INDATE,XX.NAME+' ['+case when SDECHECK ='0' then CONVERT(VARCHAR, XX.CNT) else CONVERT(VARCHAR, SUM(XX.CNT)) end  +']' AS LEVEL3,XX.ORDERBY AS ORDERBY , DOC_CODE, CODE, SEQ_NO,XX.NAME,SDECHECK,MODIFY_TIME,TEMPSAVE,CHOS_NO from ( "
//                         +"  select * from ( "
                          +" SELECT u.NAME AS UNAME,T.CLINCODE ,INDATE + ' ' + case when u.NAME = '통합의사' then '' else u.NAME end  AS LEVEL2 ,count(PAGENO) AS CNT ,INDATE ,f.NAME, f.ORDERBY  ,f.FORMCODE AS DOC_CODE, '' AS CODE, '' AS SEQ_NO ,'0' SDECHECK , '' MODIFY_TIME,'' TEMPSAVE, CONVERT(VARCHAR, T.TREATNO) AS CHOS_NO "
                          +" FROM emr..TREATT T (index IX_TREATT1 ) ,emr..CHARTPAGET cp ,emr..FORMT f ,emr..USERT u  "
                          +" WHERE cp.TREATNO = T.TREATNO   "
                           +" AND T.DOCCODE = u.USERID   "
                          +" AND cp.FORMCODE = f.FORMCODE  and ( cp.CERTACTIVE='Y'  OR cp.CERTACTIVE=NULL ) "
                          +" AND PATID = ?   "
                          +" AND T.CLASS ='O'  "
                          +" AND T.CLINCODE = ?   and INDATE=? "
                          +" GROUP BY T.CLINCODE + '_' + CONVERT(VARCHAR, T.TREATNO) + '_' + cp.FORMCODE, T.CLINCODE + '_' + CONVERT(VARCHAR, T.TREATNO) ,f.NAME,f.FORMCODE, f.ORDERBY,  "
				            +" 			      T.TREATNO, T.CLINCODE, T.INDATE + ' ' + case when u.NAME = '통합의사' then '' else u.NAME end , T.INDATE , u.NAME  "
                          +" UNION ALL "
							+" select U.USERNAME AS UNAME, R.DEPARTMENT AS CLINCODE, Substring(R.RECORD_TIME,1,4)+Substring(R.RECORD_TIME,6,2)+Substring(R.RECORD_TIME,9,2) +' '+U.USERNAME AS LEVEL2 ,count(R.CODE) AS CNT, Substring(R.RECORD_TIME,1,4)+Substring(R.RECORD_TIME,6,2)+Substring(R.RECORD_TIME,9,2) AS INDATE  , DO.NAME,'0' AS ORDERBY ,R.DOC_CODE ,R.CODE,CONVERT(VARCHAR,R.SEQ_NO) ,'1' SDECHECK,  R.MODIFY_TIME,R.TEMPSAVE,R.CHOS_NO  "
							+" from BERDMRECD R  "
							+" left join BERDMDOCU DO on R.DOC_CODE = DO.CODE  "
							+" inner join ETL_PICUSERM U on R.MODIFIER_CODE = U.USERPIDN  and U.USERDEPT=R.DEPARTMENT  "
							+" where R.PTID= ? and R.DEPARTMENT= ?   and R.STATUS='0'  and RECORD_TIME=? and RECORD_TIME!='' "
							+" group by U.USERNAME, R.DEPARTMENT, Substring(R.RECORD_TIME,1,4)+Substring(R.RECORD_TIME,6,2)+Substring(R.RECORD_TIME,9,2) +' '+U.USERNAME, Substring(R.RECORD_TIME,1,4)+Substring(R.RECORD_TIME,6,2)+Substring(R.RECORD_TIME,9,2), DO.NAME,R.DOC_CODE ,R.CODE,CONVERT(VARCHAR,R.SEQ_NO) ,R.MODIFY_TIME,R.TEMPSAVE,R.CHOS_NO "
//							+" ) X "
//							+" group by X.INDATE,X.INDATE+'_'+X.UNAME "
							+" ) XX "
							+" group by XX.INDATE, XX.INDATE+'_'+XX.UNAME "
							//+" order by ORDERBY,DOC_CODE, INDATE DESC,LEVEL2,LEVEL3,MODIFY_TIME DESC, SDECHECK "; 
							+" order by  INDATE DESC,LEVEL2,ORDERBY,DOC_CODE,LEVEL3,MODIFY_TIME DESC, SDECHECK ";
			chosNo=getRequestValue(res,0,1,"pid");
			String dept=getRequestValue(res,0,1,"dept");
			String indate1=getRequestValue(res,0,1,"indate1");
			String indate2=getRequestValue(res,0,1,"indate2");
			
			String[] param1=new String[6];
			param1[0]=chosNo;
			param1[1]=dept;
			param1[2]=indate1;
			param1[3]=chosNo;
			param1[4]=dept;
			param1[5]=indate2;
			
			//List result=DoSql_PS(sqlStr,param1);
						
			out.clear();
			DoSql_PS2(sqlStr,param1,out);
			//MakeResponse4String("getOPRecdDataDept",result,null,out);
		}
		else if(fname.equals("getDocRecdData"))
		{
		/*
			String sqlStr=" SELECT ? AS GUBUN , c.FORMCODE ,f.NAME + ' [' + CONVERT(VARCHAR, count(PAGENO)) + ']' AS DOCINFO, f.ORDERBY  "
                         + " FROM emr..TREATT T (index IX_TREATT1 ) ,emr..CHARTPAGET c, emr..FORMT f  "
                         + " WHERE c.TREATNO = T.TREATNO  "
                         + " AND c.FORMCODE = f.FORMCODE  "
                         + " AND PATID = ?  "
                         + " AND T.CLASS = ?  "
                         + " GROUP BY c.FORMCODE , f.NAME , f.ORDERBY "
                         + " ORDER BY f.ORDERBY, c.FORMCODE ";
                         */
			String sqlStr=" SELECT * FROM ( "
                   		 + " SELECT  ? AS GUBUN , c.FORMCODE ,f.NAME + ' [' + CONVERT(VARCHAR, count(PAGENO)) + ']' AS DOCINFO, f.ORDERBY, '0' AS SDECHECK   "
                          + " FROM emr..TREATT T (index IX_TREATT1 ) ,emr..CHARTPAGET c, emr..FORMT f   "
                          + " WHERE c.TREATNO = T.TREATNO   "
                          + " AND c.FORMCODE = f.FORMCODE  and ( c.CERTACTIVE='Y' OR c.CERTACTIVE=NULL ) "
                          + " AND PATID = ?    "
                          + " AND T.CLASS =  ?   "
                          + " GROUP BY c.FORMCODE , f.NAME , f.ORDERBY  "
                          + " UNION ALL "
                          + " SELECT  ? AS GUBUN, R.DOC_CODE AS FORMCODE, DO.NAME+ ' [' + CONVERT(VARCHAR, count(R.CODE)) + ']' AS DOCINFO, '0' AS ORDERBY, '1' AS SDECHECK FROM BERDMRECD R "
                          + " LEFT JOIN BERDMDOCU DO ON R.DOC_CODE=DO.CODE "
                          + " WHERE R.PTID = ? AND R.SIGNLEVEL= ?  AND R.STATUS='0' "
                          + " GROUP BY R.DOC_CODE, DO.NAME "
                          + " ) X "
						 	 + " ORDER BY X.ORDERBY, CONVERT(INT, X.FORMCODE ) ";
			chosNo=getRequestValue(res,0,1,"pid");
			String gubun=getRequestValue(res,0,1,"gubun");
			String gubun2=getRequestValue(res,0,1,"gubun2");
			
			String[] param1=new String[6];
			param1[0]=gubun;
			param1[1]=chosNo;
			param1[2]=gubun;
			param1[3]=gubun;
			param1[4]=chosNo;
			param1[5]=gubun2;
			
			List result=DoSql_PS(sqlStr,param1);
						
			out.clear();
			MakeResponse4String("getDocRecdData",result,null,out);
		}
		else if(fname.equals("getChosRecdData"))
		{
			String sqlStr=" SELECT  convert(varchar, T.TREATNO) AS TREATNO , c.FORMCODE ,INDATE + CASE WHEN OUTDATE = '' THEN '' ELSE + ' ~ ' + OUTDATE END + ' ' + CL.NAME + case when u.NAME = '통합의사' then '' else u.NAME end + ' [' + convert(varchar, count(PAGENO)) + ']' AS INFO , INDATE  "
						+" ,'' CODE,  '' SEQ_NO, '' NAME,'0' AS SDECHECK ,'' TEMPSAVE"
                     +" FROM emr..TREATT T (index IX_TREATT1 ) , emr..CHARTPAGET c, emr..USERT u, emr..CLINICT CL   "
                    	+" Where c.TREATNO = T.TREATNO  "
                     +" and T.DOCCODE = u.USERID  and ( c.CERTACTIVE='Y' OR c.CERTACTIVE=NULL )"
                     +" and PATID = ? "
                     +" and CLASS = ?  "
                     +" and T.CLINCODE = CL.CLINCODE    "
                     +" and c.FORMCODE = ?"
                     +" group by T.TREATNO, c.FORMCODE, INDATE + CASE WHEN OUTDATE = '' THEN '' ELSE + ' ~ ' + OUTDATE END + ' '  + case when u.NAME = '통합의사' then '' else u.NAME end ,INDATE, T.OUTDATE , u.NAME   , CL.NAME "
                     +" order by INDATE ";
			chosNo=getRequestValue(res,0,1,"pid");
			String gubun=getRequestValue(res,0,1,"gubun");
			String doccode=getRequestValue(res,0,1,"doccode");
			
			String[] param1=new String[3];
			param1[0]=chosNo;
			param1[1]=gubun;
			param1[2]=doccode;
			
			List result=DoSql_PS(sqlStr,param1);
						
			out.clear();
			MakeResponse4String("getChosRecdData",result,null,out);
		}
		else if(fname.equals("getChosRecdSdeData"))
		{
			String sqlStr=" SELECT R.CHOS_NO AS TREATNO, R.DOC_CODE AS FORMCODE, "
						+" Substring(R.RECORD_TIME,1,4)+Substring(R.RECORD_TIME,6,2)+Substring(R.RECORD_TIME,9,2)+ ' ' +DE.DEPTDPDS+U.USERNAME+' ['+CONVERT(VARCHAR,count(R.CODE))+']' AS INFO, "
						+" Substring(R.RECORD_TIME,1,4)+Substring(R.RECORD_TIME,6,2)+Substring(R.RECORD_TIME,9,2) AS INDATE "
						+" ,R.CODE, R.SEQ_NO,DO.NAME,'1' AS SDECHECK, R.TEMPSAVE "
						+" FROM BERDMRECD R "
						+" LEFT JOIN BERDMDOCU DO ON R.DOC_CODE = DO.CODE "
						+" LEFT JOIN ETL_PICUSERM U ON R.MODIFIER_CODE = U.USERPIDN "
						+" LEFT JOIN ETL_PICDEPTM DE ON R.DEPARTMENT = DE.DEPTCODE "
						+" WHERE R.PTID=? AND R.SIGNLEVEL = ? AND R.DOC_CODE= ?   AND R.STATUS='0' and R.DEPARTMENT = U.USERDEPT "
						+" GROUP BY R.DEPARTMENT+'_'+R.CHOS_NO+'_'+R.DOC_CODE+'_'+Substring(R.RECORD_TIME,1,4)+Substring(R.RECORD_TIME,6,2)+Substring(R.RECORD_TIME,9,2)+'_'+DO.NAME+'_'+CONVERT(VARCHAR,R.SEQ_NO) "
						+" ,U.USERNAME,DO.CODE+'_'+DO.NAME,DE.DEPTDPDS,U.USERDEPT+'_'+U.USERPIDN "
						+" ORDER BY INDATE ";
						
			chosNo=getRequestValue(res,0,1,"pid");
			String gubun=getRequestValue(res,0,1,"gubun");
			String doccode=getRequestValue(res,0,1,"doccode");
			
			String[] param1=new String[3];
			param1[0]=chosNo;
			param1[1]=gubun;
			param1[2]=doccode;
			
			List result=DoSql_PS(sqlStr,param1);
						
			out.clear();
			MakeResponse4String("getChosRecdSdeData",result,null,out);
		}
		else if(fname.equals("getIDRecdDataDept"))
		{
			String sqlStr="SELECT   T.TREATNO ,f.NAME  + ' [' + CONVERT(VARCHAR, count(PAGENO)) + ']' AS LEVEL2, f.ORDERBY,f.FORMCODE,'0' AS SDECHECK "
                         +" FROM emr..TREATT T(index IX_TREATT1 )  ,emr..CHARTPAGET c ,emr..FORMT f  "
                         +" WHERE c.TREATNO = T.TREATNO  "
                         +" AND c.FORMCODE = f.FORMCODE  and ( c.CERTACTIVE='Y' OR c.CERTACTIVE=NULL )"
                         +" AND T.PATID = ?  "
                         +" AND T.CLASS ='I'   "
                         +" AND T.TREATNO = CONVERT(NUMERIC, ? )"
                         +" GROUP BY CONVERT(VARCHAR, T.TREATNO) + '_' + c.FORMCODE, T.TREATNO ,f.NAME, f.ORDERBY,f.FORMCODE   "
                         +" ORDER BY T.TREATNO desc, f.ORDERBY, CONVERT(VARCHAR, T.TREATNO) + '_' + c.FORMCODE ";
			chosNo=getRequestValue(res,0,1,"pid");
			String dept=getRequestValue(res,0,1,"treatno");
			
			String[] param1=new String[2];
			param1[0]=chosNo;
			param1[1]=dept;
			
			List result=DoSql_PS(sqlStr,param1);
						
			out.clear();
			MakeResponse4String("getIDRecdDataDept",result,null,out);
		}
		else if(fname.equals("getDeptData"))
		{
			/*String sqlStr="select DEPTCODE,DEPTDPDS,case when DEPTCODE= ?  then '0' else '1' end POS from ETL_PICDEPTM where DEPTPAFG='D' order by POS, DEPTSQ01 ";*/
			String sqlStr="select DEPTCODE,DEPTDPDS, '0' AS POS from ETL_PICDEPTM where  DEPTCODE= ? order by POS, DEPTSQ01 ";/* 타과 서식 안보이도록*/
										
			String dept=getRequestValue(res,i,1,"dept");
			
			String[] param1=new String[1];
			param1[0]=dept;
			
			List result=DoSql_PS(sqlStr,param1);
			out.clear();
			MakeResponse4String("getDeptData",result,null,out);
		}
		else if(fname.equals("getInDeptData"))
		{
			String sqlStr="select DEPTCODE,DEPTDPDS, case when DEPTCODE= ? then '0' when DEPTCODE = ? then '1' else  '2'  end POS from ETL_PICDEPTM where  DEPTCODE in (?,?,?) order by POS, DEPTSQ01 ";/* 타과 서식 안보이도록*/
										
			String dept1=getRequestValue(res,i,1,"dept1");
			String dept2=getRequestValue(res,i,1,"dept2");
			String dept3=getRequestValue(res,i,1,"dept3");
			
			String[] param1=new String[5];
			param1[0]=dept1;
			param1[1]=dept2;
			param1[2]=dept1;
			param1[3]=dept2;
			param1[4]=dept3;
			
			List result=DoSql_PS(sqlStr,param1);
			out.clear();
			MakeResponse4String("getDeptData",result,null,out);
		}
		else if(fname.equals("getDeptDataSpecial"))
		{
			String sqlStr="select DEPTCODE,DEPTDPDS,case when DEPTCODE= ?  then '0' else '1' end POS from ETL_PICDEPTM where DEPTPAFG='D' order by POS, DEPTSQ01 ";
			/*String sqlStr="select DEPTCODE,DEPTDPDS, '0' AS POS from ETL_PICDEPTM where  DEPTCODE= ? order by POS, DEPTSQ01 ";/* 타과 서식 안보이도록*/
										
			String dept=getRequestValue(res,i,1,"dept");
			
			String[] param1=new String[1];
			param1[0]=dept;
			
			List result=DoSql_PS(sqlStr,param1);
			out.clear();
			MakeResponse4String("getDeptData",result,null,out);
		}
		else if(fname.equals("getCateData"))
		{
			String sqlStr="SELECT CODE,NAME,PID,POS FROM BERDHDOCU WHERE FOLDER = ? ORDER BY PID, POS ";
										
			chosNo=getRequestValue(res,i,1,"folder");
			
			String[] param1=new String[1];
			param1[0]=chosNo;
			
			List result=DoSql_PS(sqlStr,param1);
			out.clear();
			MakeResponse4String("getCateData",result,null,out);
		}
		else if(fname.equals("getDocData"))
		{
			String sqlStr="SELECT C.CODE, C.NAME, C.PID, C.DOCTYPE,C.DEPARTMENT1,C.DEPARTMENT2,C.DEPARTMENT3,C.DEPARTMENT4,C.DEPARTMENT5 FROM BERDHDOCU C, BERDMDOCU M, ( SELECT MAX(A.SEQ_NO) AS SN, B.CODE, B.VS FROM BERDHDOCU  A ,(  "
								+" SELECT CODE, convert(varchar,MAX(convert(int,VERSION))) AS VS FROM BERDHDOCU WHERE FOLDER = ?  GROUP BY CODE )B WHERE A.CODE = B.CODE AND A.VERSION = B.VS "
								+" GROUP BY B.CODE, B.VS )D WHERE C.SEQ_NO = D.SN AND  C.DOCTYPE IN( '0')  AND C.USED='1' AND C.PID!= ? and C.CODE = M.CODE ORDER BY  DEPARTMENT1,convert(int,M.POS), PID desc ";
				
			chosNo=getRequestValue(res,i,1,"folder");
			String fsGubun=getRequestValue(res,i,1,"fsGubun");
			
			String[] param1=new String[2];
			param1[0]=chosNo;
			param1[1]=fsGubun;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getDocData",result,null,out);
		}
		/*else if(fname.equals("getDocData"))
		{
			String sqlStr="SELECT DISTINCT DT.NAME "
            	+"	, DT.COMMON_CODE, DT.PID, DT.FOLDER, DT.FILE_INPUT, "
              +" (CASE COALESCE (DT.DEPARTMENT1, 'NULL') WHEN '0' THEN '공통' WHEN 'NULL' THEN '미분류 서식' ELSE T4.DEPTDPDS END) AS DEPT_M, "
              +"  T1.NAME AS CATE1, "
              +"  T2.NAME AS CATE2, "
              +"  T3.NAME AS CATE3, "
              +"  (CASE DT.DEPARTMENT1 WHEN '0'     THEN '01' "
              +"                       WHEN ? THEN '00' "
              +"                       ELSE  DT.DEPARTMENT1 "
              +"   END "
              +"  ) AS DEPT_SORT, "
              +"  DT.SEQ_NO, "
              +"  T1.POS, T2.POS, T3.POS, DT.POS, DT.COSIGNLEVEL "
              +"  , DT.CATEGORY1, DT.CATEGORY2, DT.CATEGORY3 "
              +" FROM "
              +"  (SELECT NAME, VERSION, COMMON_CODE, PID, FOLDER, FILE_INPUT, CATEGORY1, CATEGORY2, CATEGORY3, DEPARTMENT1, SEQ_NO, POS, COSIGNLEVEL FROM "
              +"      BERDMDOCU WHERE (DOCTYPE = '0' OR DOCTYPE = '5') "
              +"          AND DOC_SEARCH_YN = '1' "
              +"          AND USED = '1' "
              +"          AND convert(varchar,DATEPART(YEAR,GETDATE()))+'-'+convert(varchar,DATEPART(MONTH,GETDATE()))+'-'+convert(varchar,DATEPART(DAY,GETDATE()))  +' '+  convert(varchar,getdate(),8) BETWEEN STARTTIME AND ENDTIME "
              +"  UNION ALL "
              +"  SELECT NAME, VERSION, COMMON_CODE, PID, FOLDER, FILE_INPUT, CATEGORY1, CATEGORY2, CATEGORY3, DEPARTMENT2, SEQ_NO, POS, COSIGNLEVEL FROM "
              +"     BERDMDOCU WHERE DEPARTMENT1 <> DEPARTMENT2 "
              +"          AND (DOCTYPE = '0' OR DOCTYPE = '5') "
              +"          AND DOC_SEARCH_YN = '1' "
              +"          AND USED = '1' "
              +"          AND convert(varchar,DATEPART(YEAR,GETDATE()))+'-'+convert(varchar,DATEPART(MONTH,GETDATE()))+'-'+convert(varchar,DATEPART(DAY,GETDATE()))  +' '+  convert(varchar,getdate(),8) BETWEEN STARTTIME AND ENDTIME "
              +"  UNION ALL "
              +"  SELECT NAME, VERSION, COMMON_CODE, PID, FOLDER, FILE_INPUT, CATEGORY1, CATEGORY2, CATEGORY3, DEPARTMENT3, SEQ_NO, POS, COSIGNLEVEL FROM "
              +"      BERDMDOCU WHERE DEPARTMENT2 <> DEPARTMENT3 "
              +"          AND (DOCTYPE = '0' OR DOCTYPE = '5') "
              +"          AND DOC_SEARCH_YN = '1' "
              +"          AND USED = '1' "
              +"          AND convert(varchar,DATEPART(YEAR,GETDATE()))+'-'+convert(varchar,DATEPART(MONTH,GETDATE()))+'-'+convert(varchar,DATEPART(DAY,GETDATE()))  +' '+  convert(varchar,getdate(),8) BETWEEN STARTTIME AND ENDTIME "
              +"  UNION ALL "
              +"  SELECT NAME, VERSION, COMMON_CODE, PID, FOLDER, FILE_INPUT, CATEGORY1, CATEGORY2, CATEGORY3, DEPARTMENT4, SEQ_NO, POS, COSIGNLEVEL FROM "
              +"      BERDMDOCU WHERE DEPARTMENT3 <> DEPARTMENT4 "
              +"          AND (DOCTYPE = '0' OR DOCTYPE = '5') "
              +"          AND DOC_SEARCH_YN = '1' "
              +"          AND USED = '1' "
              +"          AND convert(varchar,DATEPART(YEAR,GETDATE()))+'-'+convert(varchar,DATEPART(MONTH,GETDATE()))+'-'+convert(varchar,DATEPART(DAY,GETDATE()))  +' '+  convert(varchar,getdate(),8) BETWEEN STARTTIME AND ENDTIME "
              +"  UNION ALL "
              +"  SELECT NAME, VERSION, COMMON_CODE, PID, FOLDER, FILE_INPUT, CATEGORY1, CATEGORY2, CATEGORY3, DEPARTMENT5, SEQ_NO, POS, COSIGNLEVEL FROM "
              +"      BERDMDOCU WHERE DEPARTMENT4 <> DEPARTMENT5 "
               +"        AND (DOCTYPE = '0' OR DOCTYPE = '5') "
               +"        AND DOC_SEARCH_YN = '1' "
               +"        AND USED = '1' "
               +"        AND convert(varchar,DATEPART(YEAR,GETDATE()))+'-'+convert(varchar,DATEPART(MONTH,GETDATE()))+'-'+convert(varchar,DATEPART(DAY,GETDATE()))  +' '+  convert(varchar,getdate(),8) BETWEEN STARTTIME AND ENDTIME "
               +" ) DT "
               +" LEFT OUTER JOIN "
               +" BERDMDOCU T1 "
               +" ON  T1.CODE = DT.CATEGORY1 "
               +" LEFT OUTER JOIN "
               +" BERDMDOCU T2 "
               +" ON  T2.CODE = DT.CATEGORY2 "
               +" LEFT OUTER JOIN "
               +" BERDMDOCU T3 "
               +" ON  T3.CODE = DT.CATEGORY3 "
               +" LEFT OUTER JOIN "
               +" ETL_PICDEPTM T4 "
               +" ON  T4.DEPTCODE = DT.DEPARTMENT1 "
               +" WHERE (convert(varchar,GETDATE(),112) BETWEEN T4.DEPTFRDT AND T4.DEPTTODT  OR T4.DEPTCODE IS  NULL) "
            	 +" ORDER BY DEPT_SORT, T1.POS, T2.POS, T3.POS, CATE1, CATE2, CATE3, DT.POS ";
				
			String dept=getRequestValue(res,0,1,"dept");
			
			String[] param1=new String[1];
			param1[0]=dept;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getDocData",result,null,out);
		}*/
		else if(fname.equals("getBKUser"))
		{
			String sqlStr="SELECT 등록번호,이름,담당과코드,연락처,구분  FROM  BKEMRUSER WHERE 등록번호 = ? ";

			chosNo=getRequestValue(res,i,1,"doctorId");
			
			String[] param1=new String[1];
			param1[0]=chosNo;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getBKUser",result,null,out);
		}
		else if(fname.equals("getPatiInfo"))
		{
			String sqlStr="SELECT 등록번호,이름,생년월일,성별,혈액형,키,몸무게,주민뒷자리,나이 from BKEMRPATI WHERE 등록번호= ?	";

			chosNo=getRequestValue(res,i,1,"pid");
			
			String[] param1=new String[1];
			param1[0]=chosNo;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getPatiInfo",result,null,out);
		}
		else if(fname.equals("getRightRecd"))
		{
			String sqlStr="SELECT CODE,CREATE_TIME,SIGNER_CODE,SIGN_TIME,COSIGNER_CODE,FILENAME,MODIFY_TIME,RECORD_TIME,TEMPSAVE,PTID,DEPARTMENT,CHOS_NO,MODIFIER_CODE,SIGNLEVEL,PTNM,DOC_VER from BERDMRECD where CODE= ? and STATUS='0' and DOC_CODE= ? ORDER BY SEQ_NO desc";

			chosNo=getRequestValue(res,i,1,"recSeq");
			String docCode=getRequestValue(res,i,1,"docCode");
			
			String[] param1=new String[2];
			param1[0]=chosNo;
			param1[1]=docCode;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getRightRecd",result,null,out);
		}
		else if(fname.equals("getScanImagePath"))
		{
			chosNo=getRequestValue(res,i,1,"pid");
			String docCode=getRequestValue(res,i,1,"docCode");
			String recSeq=getRequestValue(res,i,1,"recSeq");
			
			String sqlStr="SELECT  T.PATID, "
						       +"  T.INDATE, "
						       +"  T.CLINCODE, "
						       +"  T.CLASS, "
						       +" '/'+substring( PA.LOCALPATH,2,6)+'/'+substring( PA.LOCALPATH,9,10)+'/'+ "
						       +"  Right(rtrim('0000'+CONVERT(char(4),C.PAGENO%10000)),4) Image_Path, "
						       +" rtrim(CONVERT(char(24),C.PAGENO))+'.'+P.EXTENSION Image_Name, "
						       +" F.NAME as DOCNAME,T.TREATNO,T.OUTDATE "
						       +"        FROM emr..TREATT T, emr..CHARTPAGET C, emr..PAGET P, emr..PATHT PA , emr..FORMT F "
						       +"       WHERE T.TREATNO = C.TREATNO "
						       +"         AND C.PAGENO = P.PAGENO "
						       +"         AND P.PATHID = PA.PATHID  and ( C.CERTACTIVE='Y' OR C.CERTACTIVE=NULL )"
						       +"         AND T.PATID = ?  "
						       +"         AND CONVERT(varchar,T.TREATNO) = ? "
						       +"         AND C.FORMCODE= ?  AND F.FORMCODE=C.FORMCODE  ORDER BY F.ORDERBY,F.FORMCODE,T.INDATE desc";
							if(docCode.equals("0005"))
								sqlStr+="         ,C.RESULTDATE  ";
							else
						       sqlStr+="         ,C.PAGENO  ";
						       
						       
						       /*+"         AND T.CLASS = 'I'   ";*/

			String[] param1=new String[3];
			param1[0]=chosNo;
			param1[1]=recSeq;
			param1[2]=docCode;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getScanImagePath",result,null,out);
		}
		else if(fname.equals("getScanAllImagePath"))
		{
			String sqlStr="SELECT  T.PATID, "
						       +"  T.INDATE, "
						       +"  T.CLINCODE, "
						       +"  T.CLASS, "
						       +" '/'+substring( PA.LOCALPATH,2,6)+'/'+substring( PA.LOCALPATH,9,10)+'/'+ "
						       +"  Right(rtrim('0000'+CONVERT(char(4),C.PAGENO%10000)),4) Image_Path, "
						       +" rtrim(CONVERT(char(24),C.PAGENO))+'.'+P.EXTENSION Image_Name, "
						       +" F.NAME as DOCNAME,T.TREATNO,T.OUTDATE "
						       +"        FROM emr..TREATT T, emr..CHARTPAGET C, emr..PAGET P, emr..PATHT PA , emr..FORMT F "
						       +"       WHERE T.TREATNO = C.TREATNO "
						       +"         AND C.PAGENO = P.PAGENO "
						       +"         AND P.PATHID = PA.PATHID  and ( C.CERTACTIVE='Y' OR C.CERTACTIVE=NULL )"
						       +"         AND T.PATID = ?  "
						       +"         AND CONVERT(varchar,T.TREATNO) = ? "
						       +"          AND F.FORMCODE=C.FORMCODE  ORDER BY F.ORDERBY,F.FORMCODE,T.INDATE desc,C.PAGENO ";
						       /*+"         AND C.FORMCODE= ?  AND F.FORMCODE=C.FORMCODE  ";*/
						       /*+"         AND T.CLASS = 'I'   ";*/

			chosNo=getRequestValue(res,i,1,"pid");
			String docCode=getRequestValue(res,i,1,"docCode");
			String recSeq=getRequestValue(res,i,1,"recSeq");
			
			String[] param1=new String[2];
			param1[0]=chosNo;
			param1[1]=recSeq;
			//param1[2]=docCode;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getScanImagePath",result,null,out);
		}
		else if(fname.equals("getHistoryRecd"))
		{
			String sqlStr="SELECT CODE,CREATE_TIME,SIGNER_CODE,SIGN_TIME,COSIGNER_CODE,FILENAME,MODIFY_TIME,RECORD_TIME,TEMPSAVE,PTID,DEPARTMENT,CHOS_NO,MODIFIER_CODE,SIGNLEVEL,PTNM,DOC_VER from BERDHRECD where CONVERT(VARCHAR,SEQ_NO)= ? and STATUS='0' ORDER BY SEQ_NO desc";

			chosNo=getRequestValue(res,i,1,"recSeq");
			
			String[] param1=new String[1];
			param1[0]=chosNo;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getHistoryRecd",result,null,out);
		}
		else if(fname.equals("getClickedDocList"))
		{
			String sqlStr="SELECT  C.CODE, C.NAME, C.PID, C.DOCTYPE, C.FILE_INPUT, C.FILE_VIEW, C.FILE_PRINT, C.FILE_MODIFY,C.COMMON_CODE, C.FILE_DOCU, C.CATEGORY1, C.CATEGORY2,"
 								+" C.CATEGORY3,C.DEPARTMENT1,C.DEPARTMENT2,C.DEPARTMENT3,C.DEPARTMENT4,C.DEPARTMENT5,C.VERSION FROM BERDHDOCU C, ( SELECT MAX(A.SEQ_NO) AS SN, B.CODE, B.VS FROM BERDHDOCU A ,(  "
        						+" SELECT CODE, MAX(CAST(VERSION AS INT)) AS VS FROM BERDHDOCU WHERE FOLDER = '0' GROUP BY CODE )B WHERE A.CODE = B.CODE AND A.CODE=? "
        						+" GROUP BY B.CODE, B.VS )D WHERE C.SEQ_NO = D.SN AND C.DOCTYPE = '0'  ";

			chosNo=getRequestValue(res,i,1,"docCd");
			
			String[] param1=new String[1];
			param1[0]=chosNo;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getClickedDocList",result,null,out);
		}
		else if(fname.equals("getClickedDocVer"))
		{
			String sqlStr="select  CODE, NAME, PID, DOCTYPE, FILE_INPUT, FILE_VIEW, FILE_PRINT, FILE_MODIFY,COMMON_CODE, FILE_DOCU, CATEGORY1, CATEGORY2, "
 								 +" CATEGORY3,DEPARTMENT1,DEPARTMENT2,DEPARTMENT3,DEPARTMENT4,DEPARTMENT5,VERSION  from BERDHDOCU where CODE= ? and VERSION= ? ";

			chosNo=getRequestValue(res,i,1,"docCd");
			String version=getRequestValue(res,i,1,"version");
			
			String[] param1=new String[2];
			param1[0]=chosNo;
			param1[1]=version;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getClickedDocVer",result,null,out);
		}
		else if(fname.equals("getPastRecd"))
		{
			String sqlStr="select R.FILENAME from BERDMRECD R where R.PTID= ?  AND R.DOC_CODE= ?  AND "
							+" R.SEQ_NO = (SELECT MAX(R2.SEQ_NO) FROM BERDMRECD R2 WHERE R2.PTID= ?  AND R2.DOC_CODE= ?  ) ";
			
			chosNo=getRequestValue(res,i,1,"pid");
			String docCode=getRequestValue(res,i,1,"docCode");
			
			String[] param1=new String[4];
			param1[0]=chosNo;
			param1[1]=docCode;
			param1[2]=chosNo;
			param1[3]=docCode;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getPastRecd",result,null,out);
		}
		else if(fname.equals("getModifyList"))
		{
			String sqlStr=" select distinct A.* from ( SELECT D.NAME, R.MODIFY_TIME, U.USERNAME, CASE WHEN R.TEMPSAVE='1' THEN 'X' ELSE 'O' END TEMPSAVE,R.SEQ_NO FROM BERDHRECD R "
									+" LEFT JOIN BERDMDOCU D ON R.DOC_CODE = D.CODE "
									+" LEFT JOIN ETL_PICUSERM U ON R.MODIFIER_CODE=U.USERPIDN "
									+" WHERE R.PTID=? AND R.DOC_CODE=? AND R.CODE=? "
									+" ) A "
									+" GROUP BY A.MODIFY_TIME+'_'+convert(varchar,A.SEQ_NO) "
									+" ORDER BY A.SEQ_NO ";
			
			chosNo=getRequestValue(res,i,1,"pid");
			String docCode=getRequestValue(res,i,1,"docCode");
			String recCode=getRequestValue(res,i,1,"recCode");
			
			String[] param1=new String[3];
			param1[0]=chosNo;
			param1[1]=docCode;
			param1[2]=recCode;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getModifyList",result,null,out);
		}
		else if(fname.equals("updateBerdmprvt"))
		{
			String sqlStr="update BERDMPRVT set FST_DOC_ID = ? , SND_DOC_ID = ? ,MONITOR = ? where DOCTOR_ID = ? and DIVISION_ID = ? and GUBUN = ? ";
			
			String doctorId=getRequestValue(res,i,1,"doctorId");
			String uDeptCd=getRequestValue(res,i,1,"uDeptCd");
			String fstDocuId=getRequestValue(res,i,1,"fstDocuId");
			String sndDocuId=getRequestValue(res,i,1,"sndDocuId");
			String gubun=getRequestValue(res,i,1,"gubun");
			String chartCheck=getRequestValue(res,i,1,"chartCheck");
			
			String[][] param1=new String[1][6];
			param1[0][0]=fstDocuId;
			param1[0][1]=sndDocuId;
			param1[0][2]=chartCheck;
			param1[0][3]=doctorId;
			param1[0][4]=uDeptCd;
			param1[0][5]=gubun;
						
			int result=DoSqlUpdate_PS(sqlStr,param1);
			
			out.clear();
			if(result == -1)
			{
				out.println("ERROR");
				return;
			}
			out.print(result);
		}
		else if(fname.equals("insertBerdmprvt"))
		{
			String sqlStr="insert into BERDMPRVT(DOCTOR_ID,DIVISION_ID,FST_DOC_ID,SND_DOC_ID,GUBUN,MONITOR) values(?,?,?,?,?,?) ";
			
			String doctorId=getRequestValue(res,i,1,"doctorId");
			String uDeptCd=getRequestValue(res,i,1,"uDeptCd");
			String fstDocuId=getRequestValue(res,i,1,"fstDocuId");
			String sndDocuId=getRequestValue(res,i,1,"sndDocuId");
			String gubun=getRequestValue(res,i,1,"gubun");
			String chartCheck=getRequestValue(res,i,1,"chartCheck");
			
			String[][] param1=new String[1][6];
			param1[0][0]=doctorId;
			param1[0][1]=uDeptCd;
			param1[0][2]=fstDocuId;
			param1[0][3]=sndDocuId;
			param1[0][4]=gubun;
			param1[0][5]=chartCheck;
			
			int result=DoSqlUpdate_PS(sqlStr,param1);
			
			out.clear();
			if(result == -1)
			{
				out.println("ERROR");
				return;
			}
			out.print(result);
		}
		else if(fname.equals("selectBerdmprvtAll"))
		{
			String sqlStr=" select A.* from (  "
								+"	select P.DOCTOR_ID,P.DIVISION_ID,P.FST_DOC_ID,D.NAME AS FST_NM,P.SND_DOC_ID,D3.NAME AS SND_NM ,P.GUBUN,MONITOR  "
								+"	from BERDMPRVT P    "
    							+"	left join BERDMDOCU D on D.CODE !='' and P.FST_DOC_ID = D.CODE   "
    							+" left join BERDMDOCU D3 on D3.CODE !='' and P.SND_DOC_ID = D3.CODE "
								+"	where P.DIVISION_ID=? and  P.DOCTOR_ID= ? "
								+"	UNION ALL "
								+"	select P.DOCTOR_ID,P.DIVISION_ID, P.FST_DOC_ID, D4.NAME AS FST_NM,P.SND_DOC_ID,D2.NAME AS SND_NM ,P.GUBUN,MONITOR "
								+"	from BERDMPRVT P   "
    							+"	left join BERDMDOCU D2 on D2.CODE !='' and P.SND_DOC_ID = D2.CODE       "
    							+" left join BERDMDOCU D4 on D4.CODE !='' and P.FST_DOC_ID = D4.CODE  "
								+"	where P.DIVISION_ID= ? and P.DOCTOR_ID='0' "
								+"	UNION ALL "
								+"	select P.DOCTOR_ID,P.DIVISION_ID,P.FST_DOC_ID,D.NAME AS FST_NM,P.SND_DOC_ID,D3.NAME AS SND_NM ,'3' AS GUBUN,MONITOR  "
								+"	from BERDMPRVT P    "
    							+"	left join BERDMDOCU D on D.CODE !='' and P.FST_DOC_ID = D.CODE   "
    							+" left join BERDMDOCU D3 on D3.CODE !='' and P.SND_DOC_ID = D3.CODE "
								+"	where P.DIVISION_ID=? and  P.DOCTOR_ID= ? "
								+"	) A order by A.GUBUN ";
			
			String uDeptCd=getRequestValue(res,i,1,"uDeptCd"); 
			String doctorId=getRequestValue(res,i,1,"doctorId");
			String doctorId2=getRequestValue(res,i,1,"doctorId2");
			
			String[] param1=new String[5];
			param1[0]=uDeptCd;
			param1[1]=doctorId;
			param1[2]=uDeptCd;
			param1[3]=uDeptCd;
			param1[4]=doctorId2;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("selectBerdmprvtAll",result,null,out);
		}
		else if(fname.equals("insertBeramlogu"))
		{
			String sqlStr="INSERT INTO BERAMLOGU ( GUBUN, USID, UDEPT_CD, DOC_CODE, PID, RECORD_ID, ACCESS_TIME, COMMENTS_CD, COMMENTS, IP_ADDRESS ) "
										+" VALUES(?,?,?,?,?,?,?,?,?,?) ";
			
			String type=getRequestValue(res,i,1,"type");
			String doctorId=getRequestValue(res,i,1,"doctorId");
			String uDeptCd=getRequestValue(res,i,1,"uDeptCd");
			String docCode=getRequestValue(res,i,1,"docCode");
			String pid=getRequestValue(res,i,1,"pid");
			String recCode=getRequestValue(res,i,1,"recCode");
			String getToday=getRequestValue(res,i,1,"getToday");
			String commentCd=getRequestValue(res,i,1,"commentCd");
			String comment=getRequestValue(res,i,1,"comment");
			String ipaddress=getRequestValue(res,i,1,"ipaddress");
			
			String[][] param1=new String[1][10];
			param1[0][0]=type;
			param1[0][1]=doctorId;
			param1[0][2]=uDeptCd;
			param1[0][3]=docCode;
			param1[0][4]=pid;
			param1[0][5]=recCode;
			param1[0][6]=getToday;
			param1[0][7]=commentCd;
			param1[0][8]=comment;
			param1[0][9]=ipaddress;
			
			int result=DoSqlUpdate_PS(sqlStr,param1);
			
			out.clear();
			if(result == -1)
			{
				out.println("ERROR");
				return;
			}
			out.print(result);
		}
		else if(fname.equals("selectBeramlogc"))
		{
			System.out.println(fname);
			String sqlStr=" SELECT SEQ_NO FROM BERAMLOGC WHERE USER_PID = ? AND SERIAL_NO = ? AND USER_DN = ?";
			
			String userPid=getRequestValue(res,i,1,"userPid");
			String serialNo=getRequestValue(res,i,1,"serialNo");
			String userDn=getRequestValue(res,i,1,"userDn");
			
			String[] param1=new String[3];
			param1[0]=userPid;
			param1[1]=serialNo;
			param1[2]=userDn;
			
			List result=DoSql_PS(sqlStr,param1);
			
			
			out.clear();
			if(result == null || result.size() <= 1)
				out.print("");
			else
			  out.print(((HashMap)result.get(1)).get("SEQ_NO"));
			//MakeResponse4String("selectBerdmprvtAll",result,null,out);
		}
		else if(fname.equals("insertBeramlogc"))
		{
			String sqlStr="INSERT INTO bke.dbo.BERAMLOGC (USER_PID, SERIAL_NO, USER_DN, CERTDATA, CREATE_DATE, UPDATE_DATE) "
										+" VALUES ( ?, ?, ?, ?, GETDATE(), GETDATE())";
			
			String userPid=getRequestValue(res,i,1,"userPid");
			String serialNo=getRequestValue(res,i,1,"serialNo");
			String userDn=getRequestValue(res,i,1,"userDn");
			String certData=getRequestValue(res,i,1,"certData");
			
			String[][] param1=new String[1][4];
			param1[0][0]=userPid;
			param1[0][1]=serialNo;
			param1[0][2]=userDn;
			param1[0][3]=certData;
			
			int result=DoSqlUpdate_PS(sqlStr,param1);
			
			out.clear();
			if(result == -1)
			{
				out.println("ERROR");
				return;
			}
			out.print(result);
		}
		else if(fname.equals("checkLimitPidData"))
		{
			//String sqlStr=" select SEQ_NO,DEPTCODE,START_DATE,END_DATE from BERDLIMIT where PATID=? and USEYN='1' ";
			String sqlStr="select A.SEQ_NO,A.DEPTCODE,B.DEPTDPDS,A.START_DATE,A.END_DATE from BERDLIMIT A, ETL_PICDEPTM B where A.PATID= ? and A.USEYN='1' and A.DEPTCODE = B.DEPTCODE ";
			
			String pid=getRequestValue(res,i,1,"pid");
			
			String[] param1=new String[1];
			param1[0]=pid;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("checkLimitPidData",result,null,out);
		}
		else if(fname.equals("checkLimitPid"))
		{
			String sqlStr=" select SEQ_NO,DEPTCODE from BERDLIMIT where PATID=? and USEYN='1' and START_DATE<=? and END_DATE>=? ";
			
			String pid=getRequestValue(res,i,1,"pid");
			String getToDate=getRequestValue(res,i,1,"medDate");
			
			String[] param1=new String[3];
			param1[0]=pid;
			param1[1]=getToDate;
			param1[2]=getToDate;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("checkLimitPid",result,null,out);
		}
		else if(fname.equals("checkLimitUser"))
		{
			String sqlStr=" select USERID from BERDUNLMT where MAPP_PATISEQ=? and USERID=? and ACCESSYN='1' ";
			
			String mSeqNo=getRequestValue(res,i,1,"mSeqNo");
			String doctorId=getRequestValue(res,i,1,"doctorId");
			
			String[] param1=new String[2];
			param1[0]=mSeqNo;
			param1[1]=doctorId;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("checkLimitUser",result,null,out);
		}
		else if(fname.equals("deleteRecd"))
		{
			String sqlStr=" update BERDMRECD set STATUS='1' where PTID=? and CODE=? ";
			
			String recCode=getRequestValue(res,i,1,"recCode");
			String pid=getRequestValue(res,i,1,"pid");
			
			String[][] param1=new String[1][2];
			param1[0][0]=pid;
			param1[0][1]=recCode;
			
			int result=DoSqlUpdate_PS(sqlStr,param1);
			
			out.clear();
			if(result == -1)
			{
				out.println("ERROR");
				return;
			}
			out.print(result);
		}
		else if(fname.equals("checkNpPrt"))
		{
			String sqlStr=" select USERID,startdate,enddate from BERDMAUTH where USERID=? and ACCESSYN='1' and OPENTYPE=? ";
			
			String doctorId=getRequestValue(res,i,1,"doctorId");
			String type=getRequestValue(res,i,1,"type");
			
			String[] param1=new String[2];
			param1[0]=doctorId;
			param1[1]=type;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("checkNpPrt",result,null,out);
		}
		else if(fname.equals("checkPrint"))
		{
			String sqlStr=" select PRINTED,CDATE,USE_DATA from BERMPRINT where CODE= ? ORDER BY CDATE DESC";  
			
			String recCode=getRequestValue(res,i,1,"recCode");
			
			String[] param1=new String[1];
			param1[0]=recCode;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("checkPrint",result,null,out);
		}
		else if(fname.equals("insertBermprint"))
		{
			String sqlStr="INSERT INTO BERMPRINT ( PID,GUBUN,USID,CODE,CHOS_NO,CDATE,PRINTED,NEEDCNT,USE_CD,USE_DATA,PATNAME,DOCCODE,DEPARTMENT, HRECD_SEQ, PAGECNT ) "
										+" VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ";
			
			String pid=getRequestValue(res,i,1,"pid");
			String gubun=getRequestValue(res,i,1,"gubun");
			String doctorId=getRequestValue(res,i,1,"doctorId");
			String recCode=getRequestValue(res,i,1,"recCode");
			chosNo=getRequestValue(res,i,1,"chosNo");
			String createDate=getRequestValue(res,i,1,"cDate");
			String prtYn=getRequestValue(res,i,1,"prtYn");
			String prtNum=getRequestValue(res,i,1,"prtNum");
			String commentCode=getRequestValue(res,i,1,"commentCode");
			String commentValue=getRequestValue(res,i,1,"commentValue");
			String pName=getRequestValue(res,i,1,"pName");
			String docCode=getRequestValue(res,i,1,"docCode");
			String dept=getRequestValue(res,i,1,"dept");
			String hSeq=getRequestValue(res,i,1,"hSeq");
			String pageCnt=getRequestValue(res,i,1,"pageCnt");
			
			String[][] param1=new String[1][15];
			param1[0][0]=pid;
			param1[0][1]=gubun;
			param1[0][2]=doctorId;
			param1[0][3]=recCode;
			param1[0][4]=chosNo;
			param1[0][5]=createDate;
			param1[0][6]=prtYn;
			param1[0][7]=prtNum;
			param1[0][8]=commentCode;
			param1[0][9]=commentValue;
			param1[0][10]=pName;
			param1[0][11]=docCode;
			param1[0][12]=dept;
			param1[0][13]=hSeq;
			param1[0][14]=pageCnt;
			
			int result=DoSqlUpdate_PS(sqlStr,param1);
			
			out.clear();
			if(result == -1)
			{
				out.println("ERROR");
				return;
			}
			out.print(result);
		}
		else if(fname.equals("staffCheck"))
		{
			String sqlStr=" select USERPIDN from ETL_PICUSERM where USERCSKW='S'  and USERDEPT= ? ";
			
			String dept=getRequestValue(res,i,1,"dept");
			
			String[] param1=new String[1];
			param1[0]=dept;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("staffCheck",result,null,out);
		}
		else if(fname.equals("getHistorySeq"))
		{
			String sqlStr=" select MAX(SEQ_NO) AS SEQ_NO from BERDHRECD where PTID= ? and CODE= ? and DOC_CODE= ? ";
			
			String pid=getRequestValue(res,i,1,"pid");
			String recCode=getRequestValue(res,i,1,"recCode");
			String docCode=getRequestValue(res,i,1,"docCode");
			
			String[] param1=new String[3];
			param1[0]=pid;
			param1[1]=recCode;
			param1[2]=docCode;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getHistorySeq",result,null,out);
		}
		else if(fname.equals("getOcsPtNm"))
		{
			String sqlStr=" select ptbsname from pat..pmcptbsm where ptbsidno=?  ";
			
			String pid=getRequestValue(res,i,1,"pid");
			
			String[] param1=new String[1];
			param1[0]=pid;
			
			List result=DoSql_PS_OCS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getOcsPtNm",result,null,out);
		}
		else if(fname.equals("getDeptInfo"))
		{
			String sqlStr=" select DEPTPAFG,DEPTDPDS from ETL_PICDEPTM where DEPTCODE= ?  ";
			
			String dept=getRequestValue(res,i,1,"dept");
			
			String[] param1=new String[1];
			param1[0]=dept;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getDeptInfo",result,null,out);
		}
		else if(fname.equals("RecDataCheck"))
		{
			String sqlStr=" select B.NAME AS DOCNM ,A.* from BERDMRECD A,BERDMDOCU B where A.PTID= ? and A.CHOS_NO= ?  and A.STATUS='0' and A.DOC_CODE=B.CODE order by A.MODIFY_TIME desc";
			
			String pid=getRequestValue(res,i,1,"pid");
			chosNo=getRequestValue(res,i,1,"chosNo");
			
			String[] param1=new String[2];
			param1[0]=pid;
			param1[1]=chosNo;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("RecDataCheck",result,null,out);
		}
		else if(fname.equals("firstRecCheck"))
		{
			String sqlStr=" select * from BERDMRECD where PTID=?  and DOC_CODE=? and CHOS_NO=?  and STATUS='0' order by MODIFY_TIME desc";
			
			String pid=getRequestValue(res,i,1,"pid");
			String docCode=getRequestValue(res,i,1,"docCode");
			chosNo=getRequestValue(res,i,1,"chosNo");
			
			String[] param1=new String[3];
			param1[0]=pid;
			param1[1]=docCode;
			param1[2]=chosNo;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("firstRecCheck",result,null,out);
		}
		else if(fname.equals("selectPrintCheck"))
		{
			System.out.println("===selectPrintCheck===");
			String sqlStr=" select count(*) AS CNT from BERMPRINT where PID=? and CDATE=? and USID=? and USE_CD=? and CODE=? and PRINTED='N'  ";
			
			String pid=getRequestValue(res,i,1,"pid");
			String createDate=getRequestValue(res,i,1,"createDate");
			String doctorId=getRequestValue(res,i,1,"doctorId");
			String useCd=getRequestValue(res,i,1,"useCd");
			String recCode=getRequestValue(res,i,1,"recCode");
			
			String[] param1=new String[5];
			param1[0]=pid;
			param1[1]=createDate;
			param1[2]=doctorId;
			param1[3]=useCd;
			param1[4]=recCode;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("selectPrintCheck",result,null,out);
		}
		else if(fname.equals("getImportData"))
		{
			String sqlStr="SELECT CODE,NAME,PID FROM BERIMPORT WHERE 1=1 ORDER BY PID, CODE ";
										
			/*chosNo=getRequestValue(res,i,1,"folder");
			
			String[] param1=new String[1];
			param1[0]=chosNo;
			*/
			String[] param1=new String[0];
			
			List result=DoSql_PS(sqlStr,param1);
			out.clear();
			MakeResponse4String("getImportData",null,null,out);
		}
		else if(fname.equals("updateBermprint"))
		{
			String sqlStr=" update BERMPRINT set CODE = ? , NEEDCNT = ? , HRECD_SEQ = ? where PID=? and CDATE=? and USID=? and USE_CD=? and PAGECNT=? and USE_DATA=? and CODE = ? and PRINTED='N'  ";
			
			String pid=getRequestValue(res,i,1,"pid");
			String createDate=getRequestValue(res,i,1,"createDate");
			String doctorId=getRequestValue(res,i,1,"doctorId");
			String prtNum=getRequestValue(res,i,1,"prtNum");
			String commentCode=getRequestValue(res,i,1,"commentCode");
			String commentValue=getRequestValue(res,i,1,"commentValue");
			String recCode=getRequestValue(res,i,1,"recCode");
			String recSeq=getRequestValue(res,i,1,"recSeq");
			String pageCnt=getRequestValue(res,i,1,"pageCnt");
			
			String[][] param1=new String[1][10];
			param1[0][0]=recCode;
			param1[0][1]=prtNum;
			param1[0][2]=recSeq;
			param1[0][3]=pid;
			param1[0][4]=createDate;
			param1[0][5]=doctorId;
			param1[0][6]=commentCode;
			param1[0][7]=pageCnt;
			param1[0][8]=commentValue;
			param1[0][9]=recCode;
			
			int result=DoSqlUpdate_PS(sqlStr,param1);
			
			out.clear();
			if(result == -1)
			{
				out.println("ERROR");
				return;
			}
			out.print(result);
		}
		else if(fname.equals("updateConfirmSaveMrecd"))
		{
			String recdCode=getRequestValue(res,i,1,"recdCode");
			String sinerCheck=getRequestValue(res,i,1,"sinerCheck");
			String doctorId=getRequestValue(res,i,1,"doctorId");
			String ipaddress=getRequestValue(res,i,1,"ipaddress");
			
			String sqlStr=" update BERDMRECD set MODIFIER_CODE= ? ,MODIFY_TIME=  convert(varchar,DATEPART(YEAR,GETDATE()))+'-'+substring(convert(varchar,GETDATE(),102),6,2)+'-'+substring(convert(varchar,GETDATE(),102),9,2) +' '+  convert(varchar,getdate(),8)  ,TEMPSAVE='0', WORK_IP= ? ,";
			if(sinerCheck.equals("2"))
				sqlStr+=" SIGNER_CODE2= ? ,SIGN_TIME2=  convert(varchar,DATEPART(YEAR,GETDATE()))+'-'+substring(convert(varchar,GETDATE(),102),6,2)+'-'+substring(convert(varchar,GETDATE(),102),9,2) +' '+  convert(varchar,getdate(),8) ";
			else
				sqlStr+=" SIGNER_CODE= ? ,SIGN_TIME=  convert(varchar,DATEPART(YEAR,GETDATE()))+'-'+substring(convert(varchar,GETDATE(),102),6,2)+'-'+substring(convert(varchar,GETDATE(),102),9,2) +' '+  convert(varchar,getdate(),8) ";
			sqlStr+=" where  CODE= ?  ";
			String[][] param1=new String[1][4];
			param1[0][0]=doctorId;
			param1[0][1]=ipaddress;
			param1[0][2]=doctorId;
			param1[0][3]=recdCode;
			
			int result=DoSqlUpdate_PS(sqlStr,param1);
			
			out.clear();
			if(result == -1)
			{
				out.println("ERROR");
				return;
			}
			out.print(result);
		}
		else if(fname.equals("insertConfirmSaveHrecd"))
		{
			String recdCode=getRequestValue(res,i,1,"recdCode");
			
			String sqlStr=" insert into BERDHRECD(CODE,STATUS,DOC_CODE,PTID,RPTID,CREATOR_CODE,CREATE_TIME,MODIFIER_CODE,MODIFY_TIME, "
									+" SIGNER_CODE,SIGN_TIME,PRINTED,FILENAME,RECORDTYPE,INCOMPLETE,TEMPSAVE,DEPARTMENT,CHOS_NO,SIGNLEVEL,SIGNER_CODE2,SIGN_TIME2,RECORD_TIME,WORK_IP) "
									+" select CODE,STATUS,DOC_CODE,PTID,RPTID,CREATOR_CODE,CREATE_TIME,MODIFIER_CODE,MODIFY_TIME, "
									+" SIGNER_CODE,SIGN_TIME,PRINTED,FILENAME,RECORDTYPE,INCOMPLETE,TEMPSAVE,DEPARTMENT,CHOS_NO,SIGNLEVEL,SIGNER_CODE2,SIGN_TIME2,RECORD_TIME,WORK_IP "
									+" from BERDHRECD B where B.SEQ_NO = (select MAX(A.SEQ_NO)  from BERDHRECD A where  A.CODE= ?  group by A.CODE ) ";
									
			String[][] param1=new String[1][1];
			param1[0][0]=recdCode;
			
			int result=DoSqlUpdate_PS(sqlStr,param1);
			
			out.clear();
			if(result == -1)
			{
				out.println("ERROR");
				return;
			}
			out.print(result);
		}
		else if(fname.equals("updateConfirmSaveHrecd"))
		{
			String recdCode=getRequestValue(res,i,1,"recdCode");
			String sinerCheck=getRequestValue(res,i,1,"sinerCheck");
			String doctorId=getRequestValue(res,i,1,"doctorId");
			String ipaddress=getRequestValue(res,i,1,"ipaddress");
			
			String sqlStr=" update BERDHRECD set MODIFIER_CODE=?, MODIFY_TIME=  convert(varchar,DATEPART(YEAR,GETDATE()))+'-'+substring(convert(varchar,GETDATE(),102),6,2)+'-'+substring(convert(varchar,GETDATE(),102),9,2) +' '+  convert(varchar,getdate(),8)  , TEMPSAVE='0',  WORK_IP= ? ,";
			if(sinerCheck.equals("2"))
				sqlStr+=" SIGNER_CODE2= ? ,SIGN_TIME2=  convert(varchar,DATEPART(YEAR,GETDATE()))+'-'+substring(convert(varchar,GETDATE(),102),6,2)+'-'+substring(convert(varchar,GETDATE(),102),9,2) +' '+  convert(varchar,getdate(),8) ";
			else
				sqlStr+=" SIGNER_CODE= ? ,SIGN_TIME=  convert(varchar,DATEPART(YEAR,GETDATE()))+'-'+substring(convert(varchar,GETDATE(),102),6,2)+'-'+substring(convert(varchar,GETDATE(),102),9,2) +' '+  convert(varchar,getdate(),8) ";
			sqlStr+=" where SEQ_NO = (select MAX(A.SEQ_NO)  from BERDHRECD A where  A.CODE= ?  group by A.CODE )  ";
			String[][] param1=new String[1][4];
			param1[0][0]=doctorId;
			param1[0][1]=ipaddress;
			param1[0][2]=doctorId;
			param1[0][3]=recdCode;
			
			int result=DoSqlUpdate_PS(sqlStr,param1);
			
			out.clear();
			if(result == -1)
			{
				out.println("ERROR");
				return;
			}
			out.print(result);
		}
		else if(fname.equals("checkBeramrecd"))
		{
			String sqlStr=" select PTID,CHOS_NO,CODE,DEPARTMENT,RECORD_TIME,STATUS,MODIFIER_CODE,MODIFY_TIME,CAUSE,REGISTRANT,REGISTRATION_DATE from BERAMRECD where CODE=? order by REGISTRATION_DATE desc ";
			
			String recCode=getRequestValue(res,i,1,"recCode");
			
			String[] param1=new String[1];
			param1[0]=recCode;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("checkBeramrecd",result,null,out);
		}
		else if(fname.equals("insertBeramrecd"))
		{
			String ptid=getRequestValue(res,i,1,"ptid");
			chosNo=getRequestValue(res,i,1,"chosNo");
			String recCode=getRequestValue(res,i,1,"recCode");
			String department=getRequestValue(res,i,1,"department");
			String recTime=getRequestValue(res,i,1,"recTime");
			String status=getRequestValue(res,i,1,"status");
			String doctorId=getRequestValue(res,i,1,"doctorId");
			String cause=getRequestValue(res,i,1,"cause");
			
			String sqlStr=" insert into BERAMRECD(PTID,CHOS_NO,CODE,DEPARTMENT,RECORD_TIME,STATUS,MODIFIER_CODE,MODIFY_TIME,CAUSE,REGISTRANT,REGISTRATION_DATE) ";
					sqlStr+=" values(?,?,?,?,?,?,?,convert(varchar,DATEPART(YEAR,GETDATE()))+'-'+substring(convert(varchar,GETDATE(),102),6,2)+'-'+substring(convert(varchar,GETDATE(),102),9,2) +' '+  convert(varchar,getdate(),8),?,?, ";
					sqlStr+=" convert(varchar,DATEPART(YEAR,GETDATE()))+'-'+substring(convert(varchar,GETDATE(),102),6,2)+'-'+substring(convert(varchar,GETDATE(),102),9,2) +' '+  convert(varchar,getdate(),8))";
				
			String[][] param1=new String[1][9];
			param1[0][0]=ptid;
			param1[0][1]=chosNo;
			param1[0][2]=recCode;
			param1[0][3]=department;
			param1[0][4]=recTime;
			param1[0][5]=status;
			param1[0][6]=doctorId;
			param1[0][7]=cause;
			param1[0][8]=doctorId;
			
			int result=DoSqlUpdate_PS(sqlStr,param1);
			
			out.clear();
			if(result == -1)
			{
				out.println("ERROR");
				return;
			}
			out.print(result);
		}
		else if(fname.equals("updateBeramrecd"))
		{
			String ptid=getRequestValue(res,i,1,"ptid");
			chosNo=getRequestValue(res,i,1,"chosNo");
			String recCode=getRequestValue(res,i,1,"recCode");
			String department=getRequestValue(res,i,1,"department");
			String recTime=getRequestValue(res,i,1,"recTime");
			String status=getRequestValue(res,i,1,"status");
			String doctorId=getRequestValue(res,i,1,"doctorId");
			
			String sqlStr=" update BERAMRECD set STATUS = ? where PTID = ? and CHOS_NO = ? and CODE = ? and DEPARTMENT = ? and RECORD_TIME = ? and STATUS = '1' and REGISTRANT = ? ";
				
			String[][] param1=new String[1][7];
			param1[0][0]=status;
			param1[0][1]=ptid;
			param1[0][2]=chosNo;
			param1[0][3]=recCode;
			param1[0][4]=department;
			param1[0][5]=recTime;
			param1[0][6]=doctorId;
			
			int result=DoSqlUpdate_PS(sqlStr,param1);
			
			out.clear();
			if(result == -1)
			{
				out.println("ERROR");
				return;
			}
			out.print(result);
		}
		else if(fname.equals("getPedigreeRecd"))
		{
			String sqlStr="SELECT CODE,CREATE_TIME,SIGNER_CODE,SIGN_TIME,COSIGNER_CODE,FILENAME,MODIFY_TIME,RECORD_TIME,TEMPSAVE,PTID,DEPARTMENT,CHOS_NO,MODIFIER_CODE,SIGNLEVEL,PTNM,DOC_VER from BERDMRECD where  STATUS='0' and PTID= ? and DOC_CODE= ? ORDER BY SEQ_NO desc";

			String ptid=getRequestValue(res,i,1,"ptid");
			String docCode=getRequestValue(res,i,1,"docCode");
			
			String[] param1=new String[2];
			param1[0]=ptid;
			param1[1]=docCode;
			
			List result=DoSql_PS(sqlStr,param1);
			
			out.clear();
			MakeResponse4String("getPedigreeRecd",result,null,out);
		}
}
%>