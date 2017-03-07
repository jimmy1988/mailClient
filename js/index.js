window.onload=function(){disable()};

function disable(){
	window.history.forward();
}


var xhr=null;

function request(){
	
	//calls a function to validate the form
	var validate1 = validate();
	
	//checks to see if the form has been validated, if so the server call is made, if not an error is generated
	if (validate1){
	
	
		//server call is created
		if (window.ActiveXObject){
		   xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}else{ 
			if (window.XMLHttpRequest){
			   xhr = new XMLHttpRequest(); 
			}
		}
		
		//values from the text fields and error box are stored
		var email1 = document.getElementById("email").value;
		var password1 = document.getElementById("password").value;
		var validate31 = document.getElementById("validate3");
		
		//server call is sent
		if (xhr!=null){ 
			 var thedata = "userID=" + email1 + "&" + "passWD=" + password1;
			 xhr.open("POST", "php/checkuser.php?"+thedata, true);
			 xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			 xhr.send();
			 
			 //response is received
			 var response1 = xhr.onreadystatechange=response;
			 
			 //checks to see if the user was on the database, if so a cookie is saved to 
			 //the users computer and the next page is loaded, if not the page does not load
			if (response1){
				 document.cookie = email1;
				 window.location.href = "message_menu.html";
				 return true;
			}else{
				var textserver1 = document.createTextNode("ERROR! Validation OK but Cannot make communicate with server");
				var validate31 = document.createElement("p");
				validate31.setAttribute("class", "validate")
				validate31.setAttribute("id","validate3");
				var div=document.getElementById("insert");
				validate31.appendChild(textserver1);
				div.appendChild(validate31);
				document.getElementById("go").setAttribute("value","Log In");
				return false;
		    }
		}
	}else{
	
		// if the user does not exist an error is generated and the form is reset
		return false;
	}
}

function response(){
	if (xhr.readyState==4){
		if (xhr.status==200){
			var response=xhr.responseText;
			if (response == "registered"){
				document.getElementById("go").setAttribute("value","Log In");
				//returns true to say that the user has been logged in
				return true;
			}else{
				//form is reset
				var textserver = document.createTextNode("User Not Registered");
				var validate31 = document.createElement("p");
				validate31.setAttribute("class", "validate")
				validate31.setAttribute("id","validate3");
				var div=document.getElementById("insert");
				validate31.appendChild(textserver);
				div.appendChild(validate31);
				document.getElementById("go").setAttribute("value","Log In");
				return false;
			}
		}
	}
}

function validate(){
	
	//stores all of the fields needed to be used
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var validate3 = document.getElementById("validate3");
	var validate1 = document.getElementById("validate1");
	var validate2 = document.getElementById("validate2");
	var div = document.getElementById("insert");
	
	//Gets the data for the fields that will be used
	
	var e1val = false;
	var e2val = false;
	
	var passval = false;
  
	
	var text1 = document.createTextNode("E-mail address not valid");
	var text2 = document.createTextNode("The Password Is Too Short");
	var text3 = document.createTextNode("The Password Is Too Long");
	var text4 = document.createTextNode("Fix marked errors to proceed");
	var blank1 = document.createTextNode("This field is blank, please choose a valid form of data");
	var blank2 = document.createTextNode("This field is blank, please choose a valid form of data");
	
	var para = document.createElement("p");
	
	//creates text nodes ready to display on the page
	
	var char = email.indexOf("@");
	var char2 = email.indexOf(".",char);
	
	var sub = email.substring(char2,email.length);
	
	//refreshes the page and starts with a new clean form with no errors
	if (validate1.firstChild || validate2.firstChild || div.firstChild){
		validate1.innerHTML="";
		validate2.innerHTML="";
		div.removeChild(validate3);
	}
	
	
	//checks the e-mail address to see if it blank
	if (email == ""){
		e1val = false;
		validate1.appendChild(blank1);
	}else{
		if (email != ""){
			//checks to see if the address and @ character are in the right place
			if (char ==0 || char == -1){
				e1val = false;
				validate1.appendChild(text1);
			}else{
				e1val=true;
				//checks the domain to see if it is written correctly
				if (char2 == 0 || char2 == -1){
					e2val = false;
					validate1.appendChild(text1);
				}else{
					if(sub.length >= 2){
						e2val =true;
					}else{
						e2val = false;
						validate1.appendChild(text1);
					}
				}
			}
		}
	}
	
	//checks password
	
	if (password == ""){
		passval=false;
		validate2.appendChild(blank2);
	}else{ 
		passval=true;
		if (password.length < 5){
			passval=false;
			validate2.appendChild(text2);
		}else{
			if (password.length > 11){
				passval=false;
				validate2.appendChild(text3);
			}else{
				passval=true;
			}
		}
	}
	
	//evaluate each of the fields to see if they are correct
	
	if (e1val == false || e2val == false || passval == false){
		para.setAttribute("class","validate");
		para.setAttribute("id","validate3");
		para.appendChild(text4);
		div.appendChild(para);
		return false;
	}else{
		if(e1val == true && e2val == true && passval == true){
			if (div.firstChild){
				div.removeChild("p");
				validate1.innerHTML="";
				validate2.innerHTML="";
			}
			document.getElementById("go").setAttribute("value","Please Wait...");
			return true;
		}
	}
}

