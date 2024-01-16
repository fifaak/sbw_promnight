


  
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










// HANDLE FORM
      var modal = document.getElementById("myModal");
      var Student_ip = document.getElementById("searchtext");
      var search_form = document.getElementById("search_form");
      let Search_btn = document.getElementById("rectangle4")
      Search_btn.addEventListener('click',(event) =>{
        event.preventDefault(); 
        let studentId = Student_ip.value;

    if (studentId.trim() != ""){
        document.getElementById('myModal').style.display = 'flex';
        let studentName = "NAME" 
        let stutus = "STATUS"
        document.getElementById('studentId').textContent = studentId;
        document.getElementById('studentName').textContent = studentName;
        document.getElementById('status').textContent =status;
    }
      });


      function closeModal() {
        document.getElementById('myModal').style.display = 'none';
      }
