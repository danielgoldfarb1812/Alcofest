if (document.querySelector(`#cities`)){
    LoadCitiesRegister()
}
if (document.querySelector(`#cities_update`)){
    LoadCitiesUpdate()
}
if (document.querySelector(`#admin_cities_update`)){
    LoadCitiesAdminUpdate()
}
// //global vars - users arrays
var productArr = new Array()
var users = JSON.parse(localStorage.getItem(`users`)) || []
var usersImages = JSON.parse(localStorage.getItem('usersImages')) || []
var cart=JSON.parse(sessionStorage.getItem(`cart`)) || []
if (document.querySelector(`#add_button`)){
    document.querySelector(`#add_button`).addEventListener(`click`, AddProduct);
}
if (document.querySelector(`#register_form`)) {
    document.querySelector(`#register_form`).addEventListener(`submit`, CreateUser)
}
if (document.querySelector(`#login_form`)){
    document.querySelector(`#login_form`).addEventListener(`submit`, LoginUser)
}
if(document.querySelector(`#user_image`))
{
document.querySelector(`#user_image`).addEventListener(`change`,ShowImage)
}
//עדכון התפריט בראש הדף לאחר התחברות המשתמש
if(document.querySelector(`#header`) && JSON.parse(sessionStorage.getItem(`login_user`)))
{    
    document.querySelector(`#ul`).innerHTML+= `
    <li><a href="profile.html" class="nav-link px-2 link-dark">Profile</a></li>`

    document.querySelector(`#image_login_user`).src=JSON.parse(sessionStorage.getItem(`usersImages`))
    document.querySelector(`#hp1`).style.display=`none`
    document.querySelector(`#hp2`).style.display=`block`
}
else
{
    document.querySelector(`#hp1`).style.display=`block`
    document.querySelector(`#hp2`).style.display=`none`
}

if(document.querySelector(`#disconnect`))
{
    document.querySelector(`#disconnect`).addEventListener(`click`,() => {sessionStorage.clear(), location.href=`index.html`})
}
if(document.querySelector(`#logOut`))
{
    document.querySelector(`#logOut`).addEventListener(`click`, ()=> {return sessionStorage.clear(), location.href=`index.html`})
}
if(document.querySelector(`#image`))
{
document.querySelector(`#image`).addEventListener(`change`,ShowImage)
}
//update user data
if (document.querySelector(`#update_form`)){
    document.querySelector(`#update_form`).addEventListener(`submit`,UpdateUserData)
}
if (document.querySelector(`#admin_update_form`)){
    document.querySelector(`#admin_update_form`).addEventListener(`submit`,AdminUpdateUserData)
}

//array of products

//אם localstorage ריק 
//יוצרים מערך של מוצרים
let array = localStorage.getItem(`Array_of_product`);
if(array === null || array.length === 0){
    productArr[0]= new Product("Corona",1111,39,"/images/corona-product-img.png","Not a virus, just beer","beers")
    productArr[6]=new Product("Black Forest Cocktail",1112,99,"/images/black-forest-img.png","Bourbon, cherry brandy and a lot of passion","cocktails")
    productArr[2]=new Product("Carlsberg",1113,39,"/images/carlsberg.png","Your everyday beer, just buy and shut up","beers")
    productArr[3]=new Product("Absolut",1114,119,"/images/vodka-product-img.png","Absolut-ely crazy Russian vodka","vodka")
    productArr[4]=new Product("Hennessy",1115,249,"/images/cognac-item.png","Straight from the land of France - To blow your mind and liver","cognac")
    productArr[5]=new Product("Black Label",1116,169,"/images/black-label-item-img.png","Scotch whiskey for you lads","whiskey")
    productArr[1]=new Product("Baltika",1117,59,"/images/baltika.png","Because of Putin we now have free shipping to Africa", "beers")
    productArr[7]=new Product("Gato Negro",1118,29,"/images/gato-negro.png","Pure red wine for black cats","wine")
    productArr[8]=new Product("Mojito",1119,89,"/images/mojito.png","If you feel like a pu**y","cocktails")
    productArr[9]=new Product("Champagne",1120,69,"/images/champagne.png","If you really are a pu**y","wine")
    productArr[10]=new Product("Martini",1121,99,"/images/martini.png","Don't hide your tiny wheenie","cocktails")
    productArr[11]=new Product("Daiquiri",1122,109,"/images/daiquiri.png","Nothing special...","cocktails")
    productArr[12]=new Product("Heineken",1123,39,"/images/heineken.png","Dutch Masterpiece","beers")
    productArr[13]=new Product("Stella Artois",1124,39,"/images/stella-artois.png","Bring Stella and don't forget the umbrella","beers")
    productArr[14]=new Product("Budweiser",1125,49,"/images/budweiser.png","It will make you wiser","beers")
    productArr[15]=new Product("Petra",1126,39,"/images/petra.png","Feel extra safe with Petra","beers")
    productArr[16]=new Product("Martell",1127,129,"/images/martell.png","Drink Martell and go to hell","cognac")
    productArr[17]=new Product("Smirnoff",1128,79,"/images/smirnoff.png","If you don't want to drink Smirnoff, f*ck off","vodka")
    productArr[18]=new Product("White Horse",1129,179,"/images/white-horse.png","Of course you need White Horse!","whiskey")
    productArr[19]=new Product("Dry Martini",1130,99,"/images/dry-martini.png","If you feel like James Bond","cocktails")
    productArr[20]=new Product("Gold Champagne",1131,89,"/images/gold-champagne.png","A little bit of gold, and you will never get old","wine")
    localStorage.setItem(`Array_of_product`, JSON.stringify(productArr))
}
//אם הוא מלא נשמור את המוצרים במערך כי יכול להיות שנוספו מוצרים
else
{
    productArr=JSON.parse(localStorage.getItem(`Array_of_product`))
}
//show products on shop page
if(document.querySelector(`#shop`))
{
    PrintProduct();
    FilterSelection("");
}
if (document.querySelector(`#Search`)){

    document.querySelector(`#Search`).addEventListener(`click`, FilterProductsByPrice)
}
if (document.querySelector(`#purchase`)){
    TogglePurchaseButton()
}


