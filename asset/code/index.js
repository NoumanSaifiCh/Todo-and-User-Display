
function logout() {
  localStorage.removeItem("loginUer");
  window.location.href = "signin.html";
}

function handleCheck(){         // if user hit index URL this function will check the user already login ot not 
  let getdata= localStorage.getItem("loginUer")  // if already in login status then user can access this page other will redirect to signin page 
   if (!getdata){window.location.href="signin.html"}
}


