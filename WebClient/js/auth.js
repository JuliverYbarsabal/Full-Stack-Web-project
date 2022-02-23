let SessionID = 1;
if(localStorage.getItem("session_id")){
    SessionID = localStorage.getItem("session_id");
}

$(document).ready(function(){
    displayUserBtns();

	$('#LoginBtn').click(function() {
        let loginData = {};
        if(!$("#login_username").val()){
			$("#LoginMSG").html("Please enter your username.");
        }
        else if(!$("#login_password").val()){
			$("#LoginMSG").html("Please enter your password.");
        }
        else {
            $("#LoginMSG").html("");
            loginData['username'] = $("#login_username").val();
            loginData['password'] = $("#login_password").val();

            $.post('http://ceto.murdoch.edu.au/~33303336/assignment2/Server/Login.php',{login:JSON.stringify(loginData)}, function(data, status) {
            if (status == "success"){
                let loginResponse = JSON.parse(data);
                if(loginResponse == 0){
                    $("#LoginMSG").html("Error authenticating, please check username and password.");
                }
               else{
                    SessionID = loginResponse;
                    localStorage.setItem("session_id", loginResponse);
                    window.location.href = "#myAccount";
                }
            }
            });
        }
    }); 

	$('#RegisterBtn').click(function() {
        let registerData = {};
        if(!$("#register_username").val()){
			$("#registerMSG").html("Please enter a username.");
        }
        else if(!$("#register_fname").val()){
			$("#registerMSG").html("Please enter a first name.");
        }
        else if(!$("#register_lname").val()){
			$("#registerMSG").html("Please enter a last name.");
        }
        else if(!$("#register_staddress").val()){
			$("#registerMSG").html("Please enter a street address.");
        }
        else if(!$("#register_email").val()){
			$("#registerMSG").html("Please enter an email address.");
        }
        else if(!$("#register_phone").val()){
			$("#registerMSG").html("Please enter a phone number.");
        }
        else if(!$("#register_password").val()){
			$("#registerMSG").html("Please enter a password.");
        }
        else {
            $("#registerMSG").html("");
            //Prepare POST data
            registerData['username'] = $("#register_username").val();
            registerData['fname'] = $("#register_fname").val();
            registerData['lname'] = $("#register_lname").val();
            registerData['staddress'] = $("#register_staddress").val();
            registerData['email'] = $("#register_email").val();
            registerData['phone'] = $("#register_phone").val();
            registerData['password'] = $("#register_password").val();

            $.post('http://ceto.murdoch.edu.au/~33303336/assignment2/Server/Register.php',{register:JSON.stringify(registerData)}, function(data, status) {
            if (status == "success"){
                let registerResponse = JSON.parse(data);
                $("#RegisterMSG").html(registerResponse);
                if(registerResponse == "Register success"){
                    window.location.href = "#login";
                }
            }
            });
        }
    }); 
});

function GetUserSession(handleData) {
	$.get('http://ceto.murdoch.edu.au/~33303336/assignment2/Server/GetUserSession.php?SID=' + SessionID, function(data, status){
    if (status == "success"){
        handleData(JSON.parse(data));
    }
    else {
        handleData(0);
    }
    });
}

function Logout(){
	$.get('http://ceto.murdoch.edu.au/~33303336/assignment2/Server/Logout.php?SID=' + SessionID, function(data, status){
        window.location.href = "#home";
    });
}