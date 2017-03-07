window.onload=function(){check()};
var xhr=null;

function check(){
	window.history.forward();
	var x = document.cookie
	var char2 = x.indexOf(";");
	var mailid = x.slice(0,char2);
	
	if (mailid!=""|| char!=0){
		
		var to = document.getElementById("to");
		var from = document.getElementById("from");
		var subject = document.getElementById("subject");
		var message = document.getElementById("message");
		
		/*if (to.value == "" || from.value == "" || subject.value == "" || message.value == ""){
			to = "";
			from = ""
			subject = "";
			message = "";
		}*/
		
		request(mailid);
		
		//send request
	}else{
		document.cookie="";
		window.location.href="index.html";
	}
	
}

function request(mailid){
	if (window.ActiveXObject){
		   xhr = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		else if (window.XMLHttpRequest){
		   xhr = new XMLHttpRequest(); 
	   	}
		
		//server call is sent
		if (xhr!=null){ 
			 var thedata = "mailID=" + mailid
			 xhr.open("POST", "php/update.php?"+thedata, true);
			 xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			 xhr.send();
			 
			 //response is received
			 var response1 = xhr.onreadystatechange=response;
			 if (response1){
				 return true;
			 }
		}
	
}

function response(){
	if (xhr.readyState==4){
		if (xhr.status==200){
			var xmlDoc = xhr.responseXML;
			var mailmessage = xmlDoc.getElementsByTagName("mail");
			
			if (mailmessage.length == 0){
				return false;
			}else{
			
				var to = document.getElementById("to");
				var from = document.getElementById("from");
				var subject1 = document.getElementById("subject");
				var message1 = document.getElementById("message");
				
				var userid = xmlDoc.getElementsByTagName("userid")[0];
				var sender = xmlDoc.getElementsByTagName("sender")[0];
				var mailid = xmlDoc.getElementsByTagName("mailid")[0];
				var subject = xmlDoc.getElementsByTagName("subject")[0];
				var message = xmlDoc.getElementsByTagName("message")[0];
				var date = xmlDoc.getElementsByTagName("date")[0];
				var time = xmlDoc.getElementsByTagName("time")[0];
				
				var xuseridt = userid.childNodes[0].nodeValue;
				var xsendert = sender.childNodes[0].nodeValue;
				var xmailidt = mailid.childNodes[0].nodeValue;
				var xsubjectt =subject.childNodes[0].nodeValue;
				var xmessaget = message.childNodes[0].nodeValue;
				var xdatet = date.childNodes[0].nodeValue;
				var xtimet = time.childNodes[0].nodeValue;
				
				var welcome = document.getElementById("welcome");
				welcome.innerHTML="";
				welcome.innerHTML="Here is Your Message, " + xuseridt;
				
				to.value = xuseridt;
				to.readOnly;
				from.value = xsendert;
				from.readOnly;
				subject1.value = xsubjectt;
				subject1.readOnly;
				message1.value = xmessaget;
				message1.readOnly;
				
				return true;
			}
		}
							
							
	}
	
}

function reply_message(){
	var subject = document.getElementById("subject").value;
	var email = document.getElementById("to").value;
	var data = "Re: " + subject+"-"+email;
	document.cookie=data
	
	window.location.href="new_message.html";
	return true;
}

function new_message(){
	var subject = "";
	var email = document.getElementById("to").value;
	var data = subject+"-"+email;
	document.cookie=data;

	window.location.href="new_message.html";
	return true;
}

function cancel_message(){
	var userid = document.getElementById("to").value;
	
	document.cookie=userid
	window.location.href="message_menu.html";
	
}