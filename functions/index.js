const functions = require("firebase-functions");
const algoliasearch = require('algoliasearch'); //we use angolia for searching data in firestore
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Initialize Algolia, requires installing Algolia dependencies:
// https://www.algolia.com/doc/api-client/javascript/getting-started/#install
//
// App ID and API Key are stored in functions config variables
// const ALGOLIA_ID = functions.config().algolia.app_id;
// const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
// const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

// const ALGOLIA_INDEX_NAME = 'courses';
// const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

// // Update the search index every time a blog post is written.
// exports.onCourseCreated = functions.firestore.document('courses/{courseId}').onCreate((snap, context) => {
//     // Get the note document
//     const course = snap.data();
  
//     // Add an 'objectID' field which Algolia requires
//     course.objectID = context.params.courseId;
  
//     // Write to the algolia index
//     const index = client.initIndex(ALGOLIA_INDEX_NAME);
//     return index.saveObject(course);
//   });
