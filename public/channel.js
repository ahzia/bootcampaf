//Function to return the channel ID of current User
function getChannelsId() {
    return gapi.client.youtube.channels
      .list({
        part: ["id"],
        mine: true,
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          //console.log("Response", response);
          //change the response to js object and extract channel id from it
          return (JSON.parse(response.body).items[0].id);
          //console.log("Channel id", channelID);
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  }
var playlistID;
function createplaylist(pTitle,pDescription){
  createPL(pTitle,pDescription);
  console.log("second",playlistID);
}
  function createPL(pTitle,pDescription) {
    return gapi.client.youtube.playlists.insert({
      "part": [
        "snippet"
      ],
      "resource": {
        "snippet": {
          "title": "Temp",
          "description": "Created By Bootcamp.af - description",
          "privacyStatus": "public"
        }
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                playlistID=response;
              },
              function(err) { console.error("Execute error", err); });
  }