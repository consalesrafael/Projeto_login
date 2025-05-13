function mudaLogin(){
    const loginNovo = document.getElementById("criaLogin")
    const login = document.getElementById("loginE")
    if(loginNovo.style.display === "none"){
        loginNovo.style.display = "flex"
        login.style.display = "none"
    }else{
        loginNovo.style.display = "none"
        login.style.display = "flex"
    }
}