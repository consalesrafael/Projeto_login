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
function verificaSenha(){
    const senha = document.getElementById("criaSenha")
    const senhaRep = document.getElementById("senhaRep")

     if(senha.value != senhaRep.value){
        alert("As senhas não colidem")
        senha.value = ""
        senhaRep.value = ''
        return false
    }else{
        return true
    }
}
