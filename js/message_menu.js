window.onload = check;
var xhr = null;

function check(){
	window.history.forward();
	var x = document.cookie
	var char2 = x.indexOf(";");
	var char = x.indexOf("@", 0,char2);
	var email = x.slice(0,char2);
	
	if (email!=""|| char!=0){
	
		var messages = document.getElementById("messages");
		
		if (messages!=""){
			messages.innerHTML="";
			messages.style="";
		}
		
		var h = document.getElementById("welcome");
		var welcome = document.createTextNode("Welcome " + email + ", Here Are Your Messages");
		
		h.appendChild(welcome);
		
		request(email);
	}else{
		document.cookie="";
		window.location.href="index.html";
	}
}

function request(email){
	//server call is created
		if (window.ActiveXObject){
		   xhr = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		else if (window.XMLHttpRequest){
		   xhr = new XMLHttpRequest(); 
	   	}
		
		//server call is sent
		if (xhr!=null){ 
			 var thedata = "userID=" + email
			 xhr.open("POST", "php/checkmail1.php?"+thedata, true);
			 xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			 xhr.send();
			 
			 //response is received
			 var response1 = xhr.onreadystatechange=response;
			 if (response1){
				 return true;
			 }else{
				 return false;
			 }
		}
		
}

function response(){
	if (xhr.readyState==4){
		if (xhr.status==200){
			var xmlDoc = xhr.responseXML;
			var mailmessage = xmlDoc.getElementsByTagName("mail");
			
			if (mailmessage.length == 0){
				var messages = document.getElementById("messages");
				var non = document.createTextNode("No Messages To Display");
				messages.style.textAlign="center";
				messages.style.fontSize="24px"; 
				messages.style.fontWeight="bold";
				messages.appendChild(non);
			}else{		
				var messages = document.getElementById("messages");
				messages.style.color="#FFF";
				
				var table = document.createElement("table");
				table.width="760"
				table.cellSpacing="0";
				table.cellPadding="2";
				//table.style.backgroundColor="#FFF"
				table.border="2";
				table.style.border="border:#FFF 2px solid";
				table.style.marginTop="5px";
			
				for (var i=0;i<=mailmessage.length+1;i++){
					var tr = document.createElement("tr");
					
					if(i==0){
						for (var j=0; j<5; j++){
							var th = document.createElement("th");
							if (j==0){
								th.width ="9%";
								th.style.borderRight="#FFF 2px solid";
								th.style.borderBottom = "#FFF 2px solid";
								th.style.maxWidth = "9%";
								var idt = document.createTextNode("ID");
								th.appendChild(idt);
								tr.appendChild(th);
							}
							if(j==1){
								th.width ="21%";
								th.style.borderRight="#FFF 2px solid";
								th.style.borderBottom = "#FFF 2px solid";
								th.style.maxWidth = "21%";
								var fromt = document.createTextNode("From");
								th.appendChild(fromt);
								tr.appendChild(th);
							}
							if(j==2){
								th.width ="27%";
								th.style.borderRight="#FFF 2px solid";
								th.style.borderBottom = "#FFF 2px solid";
								th.style.maxWidth = "27%";
								var subjectt = document.createTextNode("Subject");
								th.appendChild(subjectt);	
								tr.appendChild(th);							
							}
							if(j==3){
								th.width ="30%";
								th.style.borderRight="#FFF 2px solid";
								th.style.borderBottom = "#FFF 2px solid";
								th.style.maxWidth = "30%";
								var datet = document.createTextNode("Date");
								th.appendChild(datet);
								tr.appendChild(th);
								
							}
							if(j==4){
								th.width ="13%";
								th.style.borderRight="#FFF 2px solid";
								th.style.borderBottom = "#FFF 2px solid";
								th.style.maxWidth = "13%";
								var timet = document.createTextNode("Time");
								th.appendChild(timet);
								tr.appendChild(th);
							}
						}
						table.appendChild(tr);
						messages.appendChild(table);
					}else{
						if (i>=1){
							var userid = xmlDoc.getElementsByTagName("userid")[i-1];
							var sender = xmlDoc.getElementsByTagName("sender")[i-1];
							var mailid = xmlDoc.getElementsByTagName("mailid")[i-1];
							var subject = xmlDoc.getElementsByTagName("subject")[i-1];
							var message = xmlDoc.getElementsByTagName("message")[i-1];
							var date = xmlDoc.getElementsByTagName("date")[i-1];
							var time = xmlDoc.getElementsByTagName("time")[i-1];
							var status = xmlDoc.getElementsByTagName("status")[i-1];
							
							var xuseridt = userid.childNodes[0].nodeValue;
							var xsendert = sender.childNodes[0].nodeValue;
							var xmailidt = mailid.childNodes[0].nodeValue;
							var xsubjectt =subject.childNodes[0].nodeValue;
							var xmessaget = message.childNodes[0].nodeValue;
							var xdatet = date.childNodes[0].nodeValue;
							var xtimet = time.childNodes[0].nodeValue;
							var xstatust = status.childNodes[0].nodeValue;
							
							for (var k=0;k<5;k++){
															
								if(k==0){
									var a = document.createElement("a");
									a.style.textDecoration="none";
									a.style.color="#FFF";
									document.getElementById("new_mail").onclick=function(){change(this)}
									a.onclick = function(){change(this)};
									a.setAttribute("href","read_message.html");
									a.setAttribute("class",i);
									a.setAttribute("id","mailid_"+i);
									
									var td = document.createElement("td");
									td.style.textAlign="center";
									td.style.overflow="scroll";
									td.width="9%";
									td.style.maxWidth="9%";
									var hmailidt = document.createTextNode(xmailidt);
									if (xstatust == "unread"){
										td.style.backgroundColor="#F00";
										a.style.fontWeight = "bold";
									}
									
									a.appendChild(hmailidt);
									td.appendChild(a);
									tr.appendChild(td);
								}
								if(k==1){
									var a = document.createElement("a");
									a.style.textDecoration="none";
									a.style.color="#FFF";
									a.onclick = function() {change(this)};
									a.setAttribute("href","read_message.html");
									a.setAttribute("class",i);
									a.setAttribute("id","from_"+i);
									
									var td = document.createElement("td");
									td.style.textAlign="center";
									td.style.overflow="scroll";
									td.width="21%";
									td.style.maxWidth="21%";
									var hsendert = document.createTextNode(xsendert);
									if (xstatust == "unread"){
										td.style.backgroundColor="#F00";
										a.style.fontWeight = "bold";
									}
									
									a.appendChild(hsendert);
									td.appendChild(a);
									tr.appendChild(td);
								}
								if(k==2){
									var a = document.createElement("a");
									a.style.textDecoration="none";
									a.style.color="#FFF";
									a.onclick = function(){change(this)};
									a.setAttribute("href","read_message.html");
									a.setAttribute("class",i);
									a.setAttribute("id","subject_"+i);
									
									var td = document.createElement("td");
									td.style.textAlign="center";
									td.style.overflow="scroll";
									td.width="27%";
									td.style.maxWidth="27%";
									var hsubjectt = document.createTextNode(xsubjectt);
									if (xstatust == "unread"){
										td.style.backgroundColor="#F00";
										a.style.fontWeight = "bold";
									}
									
									a.appendChild(hsubjectt);
									td.appendChild(a);
									tr.appendChild(td);
								}
								if(k==3){
									var a = document.createElement("a");
									a.style.textDecoration="none";
									a.style.color="#FFF";
									a.onclick = function(){change(this)};
									a.setAttribute("class",i)
									a.setAttribute("href","read_message.html");
									a.setAttribute("id","date_"+i);
									
									var td = document.createElement("td");
									td.style.textAlign="center";
									td.style.overflow="scroll";
									td.width="30%";
									td.style.maxWidth="30%";
									var hdatet = document.createTextNode(xdatet);
									if (xstatust == "unread"){
										td.style.backgroundColor="#F00";
										a.style.fontWeight = "bold";
									}
									
									a.appendChild(hdatet);
									td.appendChild(a);
									tr.appendChild(td);
								}
								if(k==4){
									var a = document.createElement("a");
									
									a.style.textDecoration="none";
									a.style.color="#FFF";
									a.onclick = function(){change(this)};
									a.setAttribute("href","read_message.html");
									a.setAttribute("class",i);
									a.setAttribute("id","time_"+i);
									
									var td = document.createElement("td");
									td.style.textAlign="center";
									td.style.overflow="scroll";
									td.width="13%";
									td.style.maxWidth="13%";
									var htimet = document.createTextNode(xtimet);
									if (xstatust == "unread"){
										td.style.backgroundColor="#F00";
										a.style.fontWeight = "bold";
									}
									
									a.appendChild(htimet);
									td.appendChild(a);
									tr.appendChild(td);
								}
								
							}
							table.appendChild(tr);
							
						}
					
					}
				}
				
				
			}
		}
	}
	
}

function change(el){
	
	var mail = el.className;
	
	
	document.cookie = mail;
	window.location.href="read_message.html"
	return true;
}

function logout(){
	document.cookie="";
	alert("You Have Been Successfully Logged Out");
	window.location.href="index.html";
	return true;
}

function new_message(){
	document.cookie=subject;"read_message.html"
	window.location.href="new_message.html";
	return true;
}