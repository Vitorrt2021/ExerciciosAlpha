async function getUser() {
try{ 
    let response = await fetch(`http://localhost:3000/produtos/all`);
    let userData = await response.json();
    console.log(userData);
    return userData.name; // não é necessário o await no return

}catch(e){
    console.log(e)
}
}
getUser()