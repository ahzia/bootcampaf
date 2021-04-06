//Function to get user public info

function getSignInInfo() {
  var profile = gapi.auth2
    .getAuthInstance()
    .currentUser.get()
    .getBasicProfile();
  document.getElementById("userName").innerHTML = profile.getName();
  var url = profile.getImageUrl();
  document.getElementById("userImage").setAttribute("src", url);
}

//to extract user profile image
