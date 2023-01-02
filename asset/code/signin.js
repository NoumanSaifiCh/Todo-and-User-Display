function handleLogin() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!email) {
    document.getElementById("sign-in-error").innerHTML =
      '<div class="alert alert-danger"><strong>Error: </strong>Please write a email</div>';
    return;
  }

  if (!password) {
    document.getElementById("sign-in-error").innerHTML =
      '<div class="alert alert-danger"><strong>Error: </strong>Please write a password</div>';
    return;
  }

  if (localStorage.getItem("user")) {
    let usersData = JSON.parse(localStorage.getItem("user"));

    let match = usersData.find((item) => item.email === email);
    if (!match) {
      document.getElementById("sign-in-error").innerHTML =
        '<div class="alert alert-danger"><strong>Error: </strong>User Not Exists, Please Signup first</div>';
      return;
    }

    if (match?.password !== password) {
      document.getElementById("sign-in-error").innerHTML =
        '<div class="alert alert-danger"><strong>Error: </strong>Invalid Password</div>';
      return;
    }

    localStorage.setItem("loginUer", JSON.stringify(match));
    window.location.href = "index.html";
  }
}

function handleCheck(){
  let getdata= localStorage.getItem("loginUer")
   if (getdata){window.location.href="index.html"
  }
}
