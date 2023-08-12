document.getElementById("regBtn").addEventListener('click',()=>{
    let correo = document.getElementById('correo');
    let contra = document.getElementById('Password');
    //let recuerda = document.getElementById('recuerdame').checked
    
    if (correo.length > 0 && contra.length > 0) {
        location.href = "./index.html"
    }else{
        showAlertError()
    }
})

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}