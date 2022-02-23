//Control displaying responsive mobile nav bar and desktop nav bar
function responsiveNavBar() {
    var navBar = document.getElementById("nav");
    if (navBar.className === "NavBar") {
        navBar.className = "ResponsiveNavBar";
    } else {
        navBar.className = "NavBar";
    }
}

function windowResize() {
    //Close responsive nav bar when the window is resized
    var navBar = document.getElementById("nav");
    navBar.className = "NavBar";
}

//Add event listener for window resize
window.addEventListener("resize", windowResize);

//Handle accordion toggle on my account page
function toggleAccordion(element){
    let accordion_content = element.nextElementSibling;
    if (accordion_content.style.display === "block") {
		accordion_content.style.display = "none";
    } else {
		accordion_content.style.display = "block";
	}	
}

//Display user information in the my account page
function displayMyAccInfo(){
	$.get('http://ceto.murdoch.edu.au/~33303336/assignment2/Server/GetUserInfo.php?SID=' + SessionID, function(data, status){
    if (status == "success"){
        let user = JSON.parse(data);
        $("#updateAcc_username").val(user['UserName']);
        $("#updateAcc_fname").val(user['FName']);
        $("#updateAcc_lname").val(user['LName']);
        $("#updateAcc_staddress").val(user['StreetAddress']);
        $("#updateAcc_email").val(user['EmailAddress']);
        $("#updateAcc_phone").val(user['Phone']);
        $("#updateAcc_password").val("");
    }
    });
}

//Display user list for staff users to view
function displayUserList(){
	$.get('http://ceto.murdoch.edu.au/~33303336/assignment2/Server/GetUserList.php', function(data, status){
    if (status == "success"){
        let userData = JSON.parse(data);
        let users = userData['User'];
        $('#UserList').html("");
        users.forEach(function(user) {
            $('#UserList').append("<tr><td>"+ user.UserName +"</td><td>"+ user.FName +"</td><td>"+ user.LName +"</td><td>"+ user.CategoryName +"</td><td><button onclick='edituser("+ user.PkID +")' class='button'>Edit</button></td></tr>");
        });
    }
    });
}

//Display edit user page
function edituser(UserID){
    window.location.href = "#edituser";
    $("#editAccountMSG").html("");
    $.post('http://ceto.murdoch.edu.au/~33303336/assignment2/Server/GetUser.php',{user:JSON.stringify(UserID)}, function(data, status) {
        if (status == "success"){
            let user = JSON.parse(data);
            $("#editAcc_UserType").val(user['FkUserCategory']).change();
            $("#editAcc_username").val(user['UserName']);
            $("#editAcc_fname").val(user['FName']);
            $("#editAcc_lname").val(user['LName']);
            $("#editAcc_staddress").val(user['StreetAddress']);
            $("#editAcc_email").val(user['EmailAddress']);
            $("#editAcc_phone").val(user['Phone']);
            $("#editAcc_password").val("");
            $("#editAcc_userID").val(user['PkID']);
        }
        });
}

$(document).ready(function(){
    //Update user account information
    $('#updateAccBtn').click(function() {
        let updateData = {};
        if(!$("#updateAcc_fname").val()){
            $("#updateAccountMSG").html("Please enter a first name.");
        }
        else if(!$("#updateAcc_lname").val()){
            $("#updateAccountMSG").html("Please enter a last name.");
        }
        else if(!$("#updateAcc_staddress").val()){
            $("#updateAccountMSG").html("Please enter a street address.");
        }
        else if(!$("#updateAcc_email").val()){
            $("#updateAccountMSG").html("Please enter an email address.");
        }
        else if(!$("#updateAcc_phone").val()){
            $("#updateAccountMSG").html("Please enter a phone number.");
        }
        else {
            $("#updateAccountMSG").html("");
            //Prepare POST data
            updateData['fname'] = $("#updateAcc_fname").val();
            updateData['lname'] = $("#updateAcc_lname").val();
            updateData['staddress'] = $("#updateAcc_staddress").val();
            updateData['email'] = $("#updateAcc_email").val();
            updateData['phone'] = $("#updateAcc_phone").val();
            updateData['password'] = $("#updateAcc_password").val();

            $.post('http://ceto.murdoch.edu.au/~33303336/assignment2/Server/UpdateUserInfo.php?SID=' + SessionID,{update:JSON.stringify(updateData)}, function(data, status) {
            if (status == "success"){
                let response = JSON.parse(data);
                $("#updateAccountMSG").html(response);
            }
            });
        }
    }); 

    $('#editAccBtn').click(function() {
        let editData = {};
        if(!$("#editAcc_fname").val()){
            $("#editAccountMSG").html("Please enter a first name.");
        }
        else if(!$("#editAcc_lname").val()){
            $("#editAccountMSG").html("Please enter a last name.");
        }
        else if(!$("#editAcc_staddress").val()){
            $("#editAccountMSG").html("Please enter a street address.");
        }
        else if(!$("#editAcc_email").val()){
            $("#editAccountMSG").html("Please enter an email address.");
        }
        else if(!$("#editAcc_phone").val()){
            $("#editAccountMSG").html("Please enter a phone number.");
        }
        else {
            $("#editAccountMSG").html("");
            //Prepare POST data
            editData['userID'] = $("#editAcc_userID").val();
            editData['userType'] = $("#editAcc_UserType").val();
            editData['fname'] = $("#editAcc_fname").val();
            editData['lname'] = $("#editAcc_lname").val();
            editData['staddress'] = $("#editAcc_staddress").val();
            editData['email'] = $("#editAcc_email").val();
            editData['phone'] = $("#updateAcc_phone").val();
            editData['password'] = $("#editAcc_password").val();

            $.post('http://ceto.murdoch.edu.au/~33303336/assignment2/Server/UpdateUserInfo_Staff.php',{edit:JSON.stringify(editData)}, function(data, status) {
            if (status == "success"){
                let response = JSON.parse(data);
                $("#editAccountMSG").html(response);
            }
            });
        }
    }); 

    $('#deleteAccBtn').click(function() {
        userID = $("#editAcc_userID").val();
        $("#editAccountMSG").html("");
        $.post('http://ceto.murdoch.edu.au/~33303336/assignment2/Server/DeleteUser.php',{user:JSON.stringify(userID)}, function(data, status) {
        if (status == "success"){
            let response = JSON.parse(data);
            $("#editAccountMSG").html(response);
            if(response="Success"){
                window.location.href = "#users";
            }
        }
        });
    }); 
});