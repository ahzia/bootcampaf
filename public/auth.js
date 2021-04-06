var CLIENT_ID =
  "468491144903-8g64hc23k35br3p2go57aapkapbtetjk.apps.googleusercontent.com";
var API_KEY = "AIzaSyA5UjwHsY0_eaq6NHFrGURV0WE4e_KVvRQ";

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest",
  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
  "https://www.googleapis.com/discovery/v1/apis/people/v1/rest"
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES =
  "https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/youtube.readonly ";

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
/**
 *  On load, called to load the auth2 library and API client library.
 */

function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(
      function () {
        
//<!-- The core Firebase JS SDK is always required and must be listed first -->


// TODO: Add SDKs for Firebase products that you want to use
  //   https://firebase.google.com/docs/web/setup#available-libraries -->
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyA5UjwHsY0_eaq6NHFrGURV0WE4e_KVvRQ",
    authDomain: "bootcampaf-1616570042819.firebaseapp.com",
    projectId: "bootcampaf-1616570042819",
    storageBucket: "bootcampaf-1616570042819.appspot.com",
    messagingSenderId: "468491144903",
    appId: "1:468491144903:web:0a3715f22ddbc5cbff38e2",
    measurementId: "G-HKKQ27JHDJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        //handle on clicks function
        ready();
      },
      function (error) {
        appendPre(JSON.stringify(error, null, 2));
      }
    );
}

