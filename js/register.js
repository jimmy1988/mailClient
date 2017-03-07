window.onload=function(){disable()};

function disable(){
	window.history.forward();
}
var xhr=null;

function request(){
	 
	 //validates the form
	 validate();
	 
	 //create the server call if the form has been validated as correct
	 if (validate){
		if (window.ActiveXObject){
		   xhr = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		else if (window.XMLHttpRequest){
		   xhr = new XMLHttpRequest(); 
	   	}
		var firstname1 = document.getElementById("firstname").value;
		var surname1 = document.getElementById("surname").value;
		var email1 = document.getElementById("email").value;
		var password1 = document.getElementById("password").value;
		var validate61 = document.getElementById("validate6");
		
		//sends the data to server
		if (xhr!=null){ 
			 var thedata = "Name=" + firstname1 + "&" + "Surname=" + surname1 + "&" + "userID=" + email1 + "&" + "passWD=" + password1;
			 xhr.open("POST", "php/RegisterNewUser.php?"+thedata, true);
			 xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			 xhr.send();
			 
			 //get response
			 var response1 = xhr.onreadystatechange=response;
			 if (response1){
				 document.cookie = email1;
				 window.location.href = "message_menu.html";
				 return true;
			 }else{
					return false;
			}
		}
	 }else{
		//reset form
		 var validate61 = document.createElement("p");
		 var textserver = ("ERROR! Validation ok but cannot communicate with server");
		 validate61.setAttribute("class", "validate")
		 validate61.setAttribute("id","validate6");
		 var div=document.getElementById("insert");
		 validate61.appendChild(textserver);
		 div.appendChild(validate61);
		 document.getElementById("go").setAttribute("value","Log In");
		return false;
	} 
}

function response(){
	//process response
	if (xhr.readyState == 4){
		if (xhr.status == 200){
			var response = xhr.responseText;
			
			if (response == "registered"){
				document.getElementById("go").setAttribute("value","Log In");
				alert("You are now registered with us");
				return true;
			}else{
				var validate61 = document.createElement("p");
				var textserver = ("User Already Registered");
				validate61.setAttribute("class", "validate")
				validate31.setAttribute("id","validate6");
				var div=document.getElementById("insert");
				validate31.appendChild(textserver);
				div.appendChild(validate61);
				document.getElementById("go").setAttribute("value","Log In");
				return false;
			}
		}
	}
}
 
 function validate(){
	var firstname = document.getElementById("firstname").value;
	var surname = document.getElementById("surname").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var check = document.getElementById("confirm_pass").value;
	
	var validate1 = document.getElementById("validate1");
	var validate2 = document.getElementById("validate2");
	var validate3 = document.getElementById("validate3");
	var validate4 = document.getElementById("validate4");
	var validate5 = document.getElementById("validate5");
	var validate6 = document.getElementById("validate6");
	
	var div = document.getElementById("insert");
	
	//Gets the data for the fields that will be used
	
	var n1 = false;
	var n2 = false;
	
	var e1val = false;
	var e2val = false;
	
	var passval = false;
	var passvalcheck = false;
	var passcheck=false;
  
	var blank1 = document.createTextNode("This field is blank, please choose a valid form of data");
	var blank2 = document.createTextNode("This field is blank, please choose a valid form of data");
	var blank3 = document.createTextNode("This field is blank, please choose a valid form of data");
	var blank4 = document.createTextNode("This field is blank, please choose a valid form of data");
	var blank5 = document.createTextNode("This field is blank, please choose a valid form of data");
	
	var text1 = document.createTextNode("E-mail address not valid");
	var text2 = document.createTextNode("The Password Is Too Short");
	var text3 = document.createTextNode("the Password is Too Long");
	var text21 = document.createTextNode("The Password Is Too Short");
	var text31 = document.createTextNode("the Password is Too Long");
	var text4 = document.createTextNode("The passwords do not match");
	var text5 = document.createTextNode("Fix marked errors to proceed");
	
	var para = document.createElement("p");
	var bre = document.createElement("br");
	
	//creates text nodes ready to display on the page
	
	var char = email.indexOf("@");
	var char2 = email.indexOf(".",char);
	
	var sub = email.substring(char2,email.length);
	
	
	
	
	if (validate1.firstChild || validate2.firstChild || validate3.firstChild || validate4.firstChild|| validate5.firstChild|| div.firstChild){
		validate1.innerHTML="";
		validate2.innerHTML="";
		validate3.innerHTML="";
		validate4.innerHTML="";
		validate5.innerHTML="";
		div.removeChild(validate6);
	}
	
	if (firstname ==""){
		n1=false;
		validate1.appendChild(blank1);
	}else{
		n1=true;
	}
	
	if (surname ==""){
		n2=false;
		validate2.appendChild(blank2);
	}else{
		n2 = true;
	}
	
	if (email == ""){
		e1val = false;
		validate3.appendChild(blank3);
	}else{
		if (email != ""){
			if (char ==0 || char == -1){
				e1val = false;
				validate3.appendChild(text1);
			}else{
				e1val=true;
				if (char2 == 0 || char2 == -1){
					e2val = false;
					validate3.appendChild(text1);
				}else{
					if(sub.length >= 2){
						e2val =true;
					}else{
						e2val = false;
						validate3.appendChild(text1);
					}
				}
			}
		}
	}
		
	
	if (password == ""){
		passval=false;
		validate4.appendChild(blank4);
	}else{ 
		passval=true;
		if (password.length < 5){
			passval=false;
			validate4.appendChild(text2);
				
		}else{
			if (password.length > 11){
				validate4.appendChild(text3);
			}else{
				passval=true;
			}
		}
	}
	
	if (check == ""){
		passvalcheck=false;
		if (validate5.firstChild){
			validate5.innerHTML = "";
		}else{
			validate5.appendChild(blank5);
		}
	}else{ 
		passvalcheck=true;
		if (check.length < 5){
			passvalcheck=false;
				validate5.appendChild(text21);
		}else{
			if (check.length > 11){
				validate5.appendChild(text31);
			}else{
				passvalcheck=true;
				if (password != check){
					passcheck = false;
					validate4.appendChild(text4);
					validate5.appendChild(text4);
				}else{
					passcheck=true;
				}
			}
		}
	}
	
	
	
	if (n1 == false || n2 == false || e1val == false || e2val == false || passval == false || passcheck == false){
		para.setAttribute("class","validate");
		para.setAttribute("id","validate6");
		para.appendChild(text5);
		div.appendChild(para);
		return false;
	}else{
		if(n1 == true && n2 == true && e1val == true && e2val == true && passval == true && passcheck == true){
			if (div.firstChild){
				div.removeChild("p");
				validate1.innerHTML="";
				validate2.innerHTML="";
				validate3.innerHTML="";
				validate4.innerHTML ="";
				validate5.innerHTML="";
			}
			document.getElementById("go").setAttribute("value","Please Wait...");
			return true;
		}
	}
}