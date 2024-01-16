   //PREVENT FORMS FROM SUBMITTING / PREVENT DEFAULT BEHAVIOUR
  function preventFormSubmit() {
    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', function(event) {
      event.preventDefault();
      });
    }
  }
  window.addEventListener("load", preventFormSubmit, true); 
     
  
  //HANDLE FORM SUBMISSION
  function handleFormSubmit(formObject) {
    document.getElementById('search').innerHTML = "Loading";
    document.getElementById('spinner').classList.remove("d-none");
    google.script.run.withSuccessHandler(createTable).processForm(formObject);
    document.getElementById("search-form").reset();
  } 
  

  function registerStudent(studentData) {
    var studentArray = studentData.split(',');

    var button = event.target;

    button.disabled = true;
    button.innerText = "Loading...";

    if (studentArray[studentArray.length - 1] === "Unverified") {
      button.disabled = false;
      button.innerText = "Register";
      alert(studentArray[4] + " " + studentArray[1]  + studentArray[2] +" ไม่มีสิทธิ์ลลงทะเบียน");
      return; // Stops the registration process
    }

    google.script.run
      .withFailureHandler(function(error) {
        button.disabled = false;
        button.innerText = "Register";

        alert("Unable to register: " + studentArray[4] + " " + studentArray[1] + " " + studentArray[2]); 

        Logger.log("Unable to registed; " + JSON.stringify(studentArray) + error);
      })
      .withSuccessHandler(function(response) {
        button.disabled = false;
        button.innerText = "Register";

        alert(studentArray[4] + " " + studentArray[1]  + studentArray[2] + " ลงทะเบียนเสร็จสิ้น");
      })
    .registerStudents(studentArray);
  }



  //CREATE THE DATA TABLE
  function createTable(dataArray) {
    
    document.getElementById('search').innerHTML = "Search";
    document.getElementById('spinner').classList.add("d-none");
    if(dataArray && dataArray !== undefined && dataArray.length != 0){
      var result = "<table class='table table-sm table-striped' id='dtable' style='font-size:0.8em'>"+
                  "<thead style='white-space: nowrap'>" 
                  "</thead>";
         for(var i=0; i<dataArray.length; i++) {
          result += "<tr>";
          for(var j=0; j<dataArray[i].length - 1; j++){
            result += "<td>"+dataArray[i][j]+"</td>";
          }
          //alert(dataArray);
          // Check and apply color to column X (adjust the index accordingly)
          if (dataArray[i][dataArray[i].length - 1] === "Verified") {
            result += "<td style='color: green'>" + dataArray[i][dataArray[i].length - 1] + "</td>";
          } else if (dataArray[i][dataArray[i].length - 1] === "Unverified") {
            result += "<td style='color: red'>" + dataArray[i][dataArray[i].length - 1] + "</td>";
          } else {
            result += "<td>" + dataArray[i][dataArray[i].length - 1] + "</td>";
          }
        
        //alert(dataArray[i]);
        result += "<td><button class='btn btn-primary btn-sm' onclick='registerStudent(\""+ dataArray[i] + "\");'>Register</button></td>"; //Pass all data to registerStudent()  

        result += "</tr>";
      }
      result += "</table>";
      var div = document.getElementById('search-results');
      div.innerHTML = result;
    }else{
      var div = document.getElementById('search-results');
      // //div.empty()
      div.innerHTML = "ไม่พบข้อมูล!";
    }
  }


// *************************************************************************************************************************
  
      // Get the followDiv element
      var followDiv = document.getElementById('followDiv');
  
      // Add a mousemove event listener to the document
      document.addEventListener('mousemove', function(event) {
        // Update the position of the followDiv based on the mouse cursor
        var x = event.clientX - followDiv.clientWidth / 2;
        var y = event.clientY - followDiv.clientHeight / 2;
  
        followDiv.style.left = x + 'px';
        followDiv.style.top = y + 'px';
      });
      var modal = document.getElementById("modal");

      function openModal(studentId, studentName) {
        document.getElementById('myModal').style.display = 'flex';
        
        // Update the elements in the modal with student information
        document.getElementById('studentId').textContent = studentId;
        document.getElementById('studentName').textContent = studentName;
        document.getElementById('status').textContent ="Unverrified";

      }
      
      // Function to close the modal
      function closeModal() {
        document.getElementById('myModal').style.display = 'none';
      }
