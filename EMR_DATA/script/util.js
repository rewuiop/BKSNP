function encrypt(orgData) {
	var aesUtil = new AesUtil(keySize, iterationCount);
	return aesUtil.encrypt(salt, iv, passPhrase, orgData);
}

function decrypt(encData) {
	var aesUtil = new AesUtil(keySize, iterationCount);
	return aesUtil.decrypt(salt, iv, passPhrase, encData);
}

function ToHex4Unicode(x){
	var hex = "0123456789ABCDEF";
	var r = "";
	var i, j;
	var let;
	var tempStr;
	for(i=0;i<x.length;i++){
		tempStr = "";
		let= x.charCodeAt(i);
		tempStr += hex.charAt((let >> 4) & 0xF);
		tempStr += hex.charAt((let) & 0xF);
		//tempStr += hex.charAt((let >> 12) & 0xF);
		//tempStr += hex.charAt((let >> 8) & 0xF);
		r += tempStr;
	}
	return r;
}

function GetAjaxData(url, postData) {
	try {
		var xmlHttpReq = false;
		if (window.XMLHttpRequest) 
	    xmlHttpReq = new XMLHttpRequest();
		else if (window.ActiveXObject) 
			xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
		
		if(xmlHttpReq == null)
			return "Can't get the XML HTTP";
			
		xmlHttpReq.open('POST', url, false);
		xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
		xmlHttpReq.setRequestHeader('CharSet', 'UTF-8'); 
		xmlHttpReq.send(postData); 
		return xmlHttpReq.responseText;
	}
	catch(e) {
		return;
	}
}

function chColor(obj,flag) {
	if(flag==1)
		obj.style.background ="#BADBEF";
	else
		obj.style.background ="";
}