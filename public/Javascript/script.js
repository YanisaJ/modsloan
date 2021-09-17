src="https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js"
src="https://www.gstatic.com/firebasejs/8.6.2/firebase-analytics.js"
src='https://www.gstatic.com/firebasejs/3.2.1/firebase.js'
// import firebase from 'firebase'
//--------ConnectFirebase--------
    var firebaseConfig = {
      apiKey: "AIzaSyD_PU5bw4-vNEYL5ew7sow970gTu-ZtLG4",
      authDomain: "modloans-f8d62.firebaseapp.com",
      projectId: "modloans-f8d62",
      storageBucket: "modloans-f8d62.appspot.com",
      messagingSenderId: "398266070886",
      appId: "1:398266070886:web:d684c75954cb090ae3faa7",
      measurementId: "G-61MQ0SD6LJ",
      databaseURL: "https://modloans-f8d62-default-rtdb.firebaseio.com"
    };
    firebase.initializeApp(firebaseConfig);
    // export default firebase;
    //--------------------------
    var fileName, fileURL, fileDescription;
    var files = [];
    var reader = new FileReader();
    //--------------------------
    function parm() {
      topicName = document.getElementById('topic').value;
      fileName = document.getElementById('namebox').value;
      fileDescription = document.getElementById('description').value;
      topicName_view = document.getElementById('namebox2').value;
      topicName_Del = document.getElementById('namebox3').value;
    }

    //---------------------------selectFile----------------------------
    document.getElementById('selectf').onclick = function (e) {
      var input = document.createElement('input');
      input.type = 'file';
      input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function () {
          document.getElementById('myFile').src = reader.result;
          document.getElementById('fileOldName').innerHTML = '<b>Your file is : </b>' + files[0].name;
        }
        reader.readAsDataURL(files[0]);
      }
      input.click();
    }

    //-----------------uploadFile and createFileName------------------
    document.getElementById('upload').onclick = function () {
      parm();
      if (fileName == "" || topicName == "") {
        window.alert("Please enter Topic name and File name");
        console.log("Please enter Topic name and File name");
      } else {
        console.log("Up loadfile. . .");
        var uploadTask = firebase.storage().ref('Files/' + fileName).put(files[0]);

        //---show % upload on log---
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          function (snapshot) {
            var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            console.log(percent + "% done");
            document.getElementById('upProgress').innerHTML = percent;
          },
          function (error) {
            console.log('Error in saving file.');
          },
          function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (URL) {
              fileURL = URL;
              // //**
              // var data = {
              //   TopicName: topicName,
              //   NameFile: fileName,
              //   LinkFile: fileURL,
              //   Description: fileDescription
              // };
              // firebase.database().ref('Files/').push({
              //   TopicName: topicName,
              //   NameFile: fileName,
              //   LinkFile: fileURL,
              //   Description: fileDescription
              // }).then(() => {
              //   window.alert("Add file successfully.");
              //   console.log('Add file successfully');
              //   location.reload();
                //**
                firebase.database().ref('Files/' + topicName).set({
                TopicName: topicName,
                NameFile: fileName,
                LinkFile: fileURL,
                Description: fileDescription
                }).then(() => {
                  window.alert("Add file successfully.");
                  console.log('Add file successfully');
                  location.reload();
                // **
              });
            })
              // .key;
          });
      }
    }

    //-----------------------------view-------------------------------
    document.getElementById('view').onclick = function () {
      parm();
      if (topicName_view == "") {
        window.alert("Please enter File name for view");
        console.log("Please enter File name for view");
      } else {
          firebase.database().ref('Files/'+ topicName_view).on('value', function (snapshot) {
          var _li = document.createElement('li');
         _li.innerHTML = 
         '<p>topic : ' + snapshot.val().TopicName + '<br>' +
          'Content : ' + snapshot.val().Description + '<br>' +
          'filename : ' + snapshot.val().NameFile + '<br>' +
          'Link file : <a target = "_blank" href=' + 
          snapshot.val().linkFile + '>Click link here.<br></p>';
          document.getElementById('_view').appendChild(_li);
          console.log("View file");
          console.log(snapshot.val().TopicName);
        });
      }
    }

    //+----- view automatic -----+
    database = firebase.database();
    var Ref = database.ref('Files');
    Ref.on('value', gotData);
    function gotData(data) {
      // console.log(data.val());
      var Files = data.val();
      var keys = Object.keys(Files);
      // console.log(keys);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var topic = Files[k].TopicName;
        var description = Files[k].Description;
        var fileName = Files[k].NameFile;
        var linkFile = Files[k].LinkFile;
        console.log(topic, description, fileName);
        var li = document.createElement('li');
        li.innerHTML =
          '<p>topic : ' + topic + '<br>' +
          'Content : ' + description + '<br>' +
          'filename : ' + fileName + '<br>' +
          'Link file : <a target = "_blank" href=' + linkFile + '>Click link here.<br></p>';
        document.getElementById('list_file').appendChild(li);
      }
    }

    //------------------------delete file------------------------------
    document.getElementById('delete').onclick = function () {
      parm();
      if (topicName_Del == "") {
        window.alert("Please enter File name for delete");
        console.log("Please enter File name for delete");
      } else {
        firebase.database().ref('Files/' + topicName_Del).remove().then(() => {
          console.log('Delete file successfully');
          window.alert('Delete file successfully');
          location.reload();
        });
      }
    }
