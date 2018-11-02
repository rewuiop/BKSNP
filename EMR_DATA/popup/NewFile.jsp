<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js">
</script>
<title>Insert title here</title>
</head>
<body> <h1>Ajax 이제부터</h1> 

<p id="result">여기가 id=result 해당된 p태그 </p>

<button>버튼</button>  

<script type="text/javascript">
   $(document).ready(function () {    
	   $('button').click(function () {        
		    alert("버튼 클릭");                
		    /* jquery는 함수 안에 각각의 property 성질을 집어넣는 것 */        
		    //json 방식 {key, value}               
		    $.ajax({                        
		    	//데이터 넣기           
		    	url: "oplisttest.jsp", //어느 파일로 이동해 데이터를 가져올 것인가            
		    	type: "get", //get 방식 , post 방식 구분           
		    	data: "t1=ZZZ&t2=XXX", //data입력 (넘길 데이터)                        
		    	success: function (data, status, xhr) {               
		    		//ajax를 통해서 연결 성공하면 출력                
		    		alert("통신 성공!");                
		    		$("#result").html(data);            
		    		},            
		    		error: function (xhr, status, error) {                
		    			alert("통신 실패!");           
		    			},            
		    			complete: function (xhr, status) {                
		    				alert("통신 종료");            
		    				}                    });    });});

</script> </body>
</html>

