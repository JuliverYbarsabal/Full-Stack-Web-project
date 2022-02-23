var page = ["#home", "#products","#about", "#help","#login", "#registerAcc", "#myAccount", "#Cart", "#users", "#edituser", "#editProduct", "#newProduct"];
var curPage = page[0];
$(document).ready(function(){
   var newPage = getPage(window.location.hash);
   render(newPage);
   $('nav a').click(function(e){
       e.preventDefault();
       var newPage = $(this).attr('href');
       window.location.hash=newPage;
   });

   $(window).on('hashchange', function(){
    var newPage = getPage(window.location.hash);
    displayUserBtns();
    getPageData(newPage);
   });

});

function getPageData(newPage){
    GetUserSession(
        function(user){
            UserType = user.UserType;
            //Check for unauthorised access to registered user pages
            if(newPage == "#myAccount"){
                if(UserType == 1 || UserType == 2){
                    displayMyAccInfo(); //Update the account information form
                    render(newPage);
                }
                else {
                    render("#home");
                }
            }
	        else if(newPage == "#Cart"){
                if(UserType == 1 || UserType == 2){
                    loadRankings(); //Update the products before rendering page
		            loadRankings_1 ();
		            loadRankings_2 ();
	                loadRankings_3 ();
		            loadRankings_4 ();
		            loadRankings_5 ();
	                loadRankings_6 ();
			
                    render(newPage);
                }
                else {
                    render("#home");
                }
            }

            //Check for unauthorised access to staff user pages
            else if(newPage == "#users"){
                if(UserType == 2){
                    displayUserList(); //Update the user list
                    render(newPage);
                }
                else {
                    render("#home");
                }
            }
            else if(newPage == "#edituser"){
                if(UserType == 2){
                    render(newPage);
                }
                else {
                    render("#home");
                }
            }
            else if(newPage == "#editProduct"){
                if(UserType == 2){
                    render(newPage);
                }
                else {
                    render("#home");
                }
            }
            else {
                render(newPage);
            }
        }
    );
}

function displayUserBtns(){
    GetUserSession(
        function(user){
            UserType = user.UserType;
            if(UserType == 1 || UserType == 2){
                $('.userNavBtn').show();
                $('.addCartBtn').show();
                $('#loginNavBtn').hide();
                if(UserType == 2){
                    $('.editProductBtn').show();
                    $('.staffNavBtn').show();
                }
                else{
                    console.log("hiding button");
                    $('.editProductBtn').hide();
                    $('.staffNavBtn').hide();
                }
            }
            else{
                $('.editProductBtn').hide();
                $('.addCartBtn').hide();
                $('.userNavBtn').hide();
                $('#loginNavBtn').show();
                $('.staffNavBtn').hide();
            }
        }
    );
}

function render(newPage){
    if (newPage == curPage) return;
    $("#nav").attr('class', 'NavBar'); //Hide the mobile navbar on page change
    $(curPage).hide();
    $(newPage).show();
    curPage = newPage; 
}

function getPage(hash){
   var i = page.indexOf(hash);
   if (i<0 && hash != "") window.location.hash=page[0]; 
   return i < 1 ? page[0] : page[i];
}