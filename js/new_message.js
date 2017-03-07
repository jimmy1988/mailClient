window.onload=function(){check()};
var xhr=null;

function check(){
	window.history.forward();
	var x = document.cookie;
	var char = x.indexOf("-",0);
	var char2 = x.indexOf(";",char);
	var reply = x.slice(0,char);
	var email = x.slice(char+1,char2);
	
	document.getElementById("subject").value = reply;
	document.getElementById("from").value = email;
	document.getElementById("send").onclick = function(){request2(email)};
	document.getElementById("cancel").onclick = function(){cancel(email)}
		
}

function request2(email){
	
	var from=email;
	var hto = document.getElementById("to");
	var hsubject = document.getElementById("subject");
	var hmessage = document.getElementById("message");
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	
	var date = dd + "/" + mm + "/" + yyyy;
	
	
	var to = hto.value
	var subject = hsubject.value;
	var message=hmessage.value;
	
	if (window.ActiveXObject){
		   xhr = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		else if (window.XMLHttpRequest){
		   xhr = new XMLHttpRequest(); 
	   	}
		
		//server call is sent
		if (xhr!=null){ 
			 var thedata = "id=" + to + "&" + "sender=" + from + "&" + "subject=" + subject + "&" + "message=" + message + "&" + "date=" + date;
			 xhr.open("POST", "php/insert.php?"+thedata, true);
			 xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			 xhr.send();
			 
			 //response is received
			 var response1;
			 response1 = xhr.onreadystatechange=response2;
			 if(response1){
				 alert("Message Sent, returning To Main Menu");
				
				document.cookie=email;	
				window.location.href="message_menu.html";
				return true;
			 }else{
				 alert("Sorry! Message Not Sent, Please Try Again");
			 }
		}
}

function response2(){
	if (xhr.readyState==4){
		if (xhr.status==200){
			var text = xhr.responseText;
			
			if (text =="inserted"){
					
				return true;
			}else{
				return false
			}
		}
							
							
	}
	
}

function cancel(email){
	document.cookie=email;
	window.location="message_menu.html";
}
