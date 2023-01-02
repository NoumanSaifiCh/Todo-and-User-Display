// User Create Function //

function createUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let passwordRepeat = document.getElementById("repeatPassword").value;
  let image = document.getElementById("profileImage").value;
  let checkbox = document.getElementById("checkboxID").checkbox;

  let namePattern = /^[a-zA-Z\s]+$/;
  let nameValidate = name.match(namePattern);

  if (!nameValidate) {
    document.getElementById("sign-in-error").innerHTML =
      '<div class="alert alert-danger"><strong>Error: </strong>Invalid user name</div>';
    return;
  }

  let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let emailValidate = email.match(emailPattern);

  if (!emailValidate) {
    document.getElementById("sign-in-error").innerHTML =
      '<div class="alert alert-danger"><strong>Error: </strong>Invalid email</div>';
    return;
  }

  let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/;
  let result = password.match(passwordPattern);

  if (!result) {
    document.getElementById("sign-in-error").innerHTML =
      '<div class="alert alert-danger"><strong>Error: </strong>Password must contain Alphabets, Numbers, max length 8</div>';
    return;
  }

  if (password !== passwordRepeat) {
    document.getElementById("sign-in-error").innerHTML =
      '<div class="alert alert-danger"><strong>Error: </strong>Password and Repeat should be same</div>';
    return;
  }

  if (checkbox == false) {
    document.getElementById("sign-in-error").innerHTML =
      '<div class="alert alert-danger"><strong>Error: </strong>Terms and conditions must be accepted</div>';
    return;
  }

  let user = [{ name: name, email: email, password: password, image: "" }];
  let usersData = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : [];
 // console.log("test", usersData)
  if (usersData) {
    let match = usersData?.find((item) => item.email === email);
    if (match) {
      document.getElementById("sign-in-error").innerHTML =
        '<div class="alert alert-danger"><strong>Error: </strong>User Already Exists</div>';
      return;
    }
  }

  let userImage = "";
  var filesSelected = document.getElementById("profileImage").files;
  if (filesSelected.length > 0) {
    var fileToLoad = filesSelected[0];

    var fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
      userImage = fileLoadedEvent.target.result; // data: base64
      console.log({ userImage });
      user[0].image = userImage;
      user = [...usersData, ...user];
      localStorage.user = JSON.stringify(user);
    };
    fileReader.readAsDataURL(fileToLoad);

    window.location.href = "signin.html";

    return;
  }

  localStorage.user = JSON.stringify([...usersData, ...user]);

  window.location.href = "signin.html";
}

// function handleCheck() {
//   if (localStorage.getItem("key") == 1) {
//     window.location.href = "index.html";
//   }
// }
