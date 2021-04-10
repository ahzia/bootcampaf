//Function to create a cource in google classroom
function CreateCourseClassroom(
  txtName,
  txtDescription,
  txtDescriptionHeading,
  playListID
) {
  return gapi.client.classroom.courses
    .create({
      resource: {
        name: txtName,
        descriptionHeading: txtDescription,
        description: txtDescriptionHeading,
        ownerId: "me",
        section: "Bootcamp.af",
        room: playListID,
      },
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
        var cId = response.result.id;
        var cName = response.result.name;
        var code = response.result.enrollmentCode;
        var cDescriptionHead = response.result.descriptionHeading;
        var cDescription = response.result.description;
        var playlist = response.result.room;
        var db = firebase.firestore();
        //store Course Data to firebase
        db.collection("Courses")
          .doc(cId)
          .set({
            courseId: cId,
            name: cName,
            enrollmentCode: code,
            description: cDescriptionHead,
            descriptionHeading: cDescription,
            playlistId: playlist,
          })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        getMyCourse();
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
//list Courses a student is enrolled in

function getEnrolled() {
  return gapi.client.classroom.courses
    .list({
      studentId: "me",
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        var res = JSON.parse(response.body).courses;
        //jQuery code to show Json data in HTML:

        $(".course").hide();
        res.forEach(function (item) {
          var cards = $(".course:first").clone(); //clone first divs
          //check if the course is create byBootcamp Website
          if (item.section == "Bootcamp.af") {
            var className = item.name;
            var heading = item.descriptionHeading;
            var description = item.description;
            //add values inside divs
            $(cards).find(".class-name").html(className);
            $(cards).find(".class-header").html(heading);
            $(cards).find(".class-description").html(description);
            $(cards).show(); //show cards
            $(cards).appendTo($(".enrolledContainer")); //append to container
          }
        });
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
//retrive list of courses that user is as a teacher:
function getMyCourse() {
  return gapi.client.classroom.courses
    .list({
      teacherId: "me",
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        var res = JSON.parse(response.body).courses;

        //jQuery code to show Json data in HTML:

        $(".myCourse").hide();
        res.forEach(function (item) {
          var cards = $(".myCourse:first").clone(); //clone first divs
          //check if the course is create byBootcamp Website
          if (item.section == "Bootcamp.af") {
            var className = item.name;
            var heading = item.descriptionHeading;
            var description = item.description;
            //add values inside divs
            $(cards).find(".class-name").html(className);
            $(cards).find(".class-header").html(heading);
            $(cards).find(".class-description").html(description);
            $(cards).show(); //show cards
            $(cards).appendTo($(".myCourseContainer")); //append to container
          }
        });
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}

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
        return JSON.parse(response.body).items[0].id;
        //console.log("Channel id", channelID);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}

function CreateCourse() {
  var txtName = document.getElementById("txtName").value;
  var txtDescription = document.getElementById("txtDescription").value;
  var txtDescriptionHeading = document.getElementById("txtDescriptionHeading")
    .value;
  //create Playlist
  return gapi.client.youtube.playlists
    .insert({
      part: ["snippet"],
      resource: {
        snippet: {
          title: txtName,
          description: txtDescription,
          privacyStatus: "public",
        },
      },
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
        playlistID = response.result.id;
        //create google classroom course:
        CreateCourseClassroom(
          txtName,
          txtDescription,
          txtDescriptionHeading,
          playlistID
        );
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}

//get all courses from firebase:
function getAllCourses() {
  var db = firebase.firestore();
  console.log("wait", "wait");
  db.collection("Courses")
    .get()
    .then((querySnapshot) => {
      $(".courses").hide();
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        var item=doc.data();
        var cards = $(".courses:first").clone(); //clone first divs
          var courseID = doc.id;
          var className = item.name;
          var heading = item.descriptionHeading;
          var description = item.description;
          var enrollment = item.enrollmentCode;
          //add values inside divs
          $(cards).find(".class-name").html(className);
          $(cards).find(".class-header").html(heading);
          $(cards).find(".class-description").html(description);
          $(cards).find(".class-enrollment").val(enrollment);
          $(cards).find(".class-ID").val(courseID);
          $(cards).show(); //show cards
          $(cards).appendTo($(".coursesContainer")); //append to container
          console.log("done","done");
      });
    });
}

//enroll student to clicked enroll code
function enrollUsingCode(enrollCode,courseId){
    return gapi.client.classroom.courses.students.create({
      "courseId": courseId,
      "enrollmentCode": enrollCode,
      "resource": {
        "userId": "me"
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
