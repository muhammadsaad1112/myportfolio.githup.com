 
  function validateForm(event) {
  event.preventDefault(); 

  // Get form values
  const uname = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const CNIC = document.getElementById("cnic").value.trim();
  const password = document.getElementById("pass").value.trim();


  if (uname === "") {
    alert("Name is required.");
    return false;
  }


  if (email === "") {
    alert("Email is required.");
    return false;
  }
  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email address.");
    return false;
  }


 const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
  if (!cnicPattern.test(CNIC)) {
    alert("Enter CNIC in format 12345-1234567-1.");
    return false;
  }


  if (password === "") {
    alert("Password is required.");
    return false;
  }


  const selectedGender = document.querySelector('input[name="gender"]:checked');
  if (!selectedGender) {
    alert("Please select a gender option.");
    return false;
  }

  // alert("Form submitted successfully!");
  document.getElementById("myform").submit(); 
}