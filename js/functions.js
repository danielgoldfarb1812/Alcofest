 async function LoadCitiesAdminUpdate() {
    let results = await fetch(`../cities/cities.json`);
    let cities = await results.json();
    let citiesList = document.querySelector(`#admin_cities_update`);
    cities.map((city) => {
        let option = document.createElement('option');
        option.innerText = city.engName;
        citiesList.appendChild(option);
    });
}
async function LoadCitiesUpdate() {
    let results = await fetch(`../cities/cities.json`);
    let cities = await results.json();
    let citiesList = document.querySelector(`#cities_update`);
    cities.map((city) => {
        let option = document.createElement('option');
        option.innerText = city.engName;
        citiesList.appendChild(option);
    });
}

async function LoadCitiesRegister() {
    let results = await fetch(`../cities/cities.json`);
    let cities = await results.json();
    let citiesList = document.querySelector(`#cities`);
    cities.map((city) => {
        let option = document.createElement('option');
        option.innerText = city.engName;
        citiesList.append(option);
    });
}

//function to create a user
function CreateUser(event) {
    //prevent the page from refreshing on submit
    event.preventDefault();
    let inputs = document.querySelectorAll(`.form-control`);
    inputs.forEach((input) => input.classList.remove(`invalid`));
    let username = document.querySelector(`#user_name`).value;
    let password = document.querySelector(`#password`).value;
    let confirmPassword = document.querySelector(`#password_confirm`).value;
    let photo = document.getElementById(`profile_img`).src;
    let firstName = document.querySelector(`#user_first_name`).value;
    let lastName = document.querySelector(`#user_last_name`).value;
    let email = document.querySelector(`#user_email`).value;
    let userDate = document.querySelector(`#user_birthdate`).value;
    let city = document.querySelector(`#user_city`).value;
    let street = document.querySelector(`#user_street`).value;
    let streetNum = document.querySelector(`#user_street_number`).value;
    debugger
    if (ValidUserName(username) && UpdateValidPassword(password) && PasswordsMatch(password, confirmPassword)
        && ValidFirstName(firstName) && ValidLastName(lastName)
        && ValidEmail(email) && ValidDate(userDate)
        && ValidStreet(street) && ValidStreetNumber(streetNum)) {
        let user = new User(username, password, firstName, lastName, email, userDate, city, street, streetNum);
        AddUserToStorage(user);         
        //add the user's photo to local storage
        usersImages.push(photo);
        localStorage.setItem(`usersImages`, JSON.stringify(usersImages));
        //move to login page after registration
        location.href = `login.html`;
        alert(`Registration successful! Moving to login page...`)
    }
}
function AddUserToStorage(user){
    let users = JSON.parse(localStorage.getItem(`users`)) || [];   
    users.push(user);
    localStorage.setItem(`users`, JSON.stringify(users));
}
function RemoveUserFromStorage(username){
    let users = JSON.parse(localStorage.getItem(`users`)) || [];
    users = users.filter(u=>u.User_name !== username);
    localStorage.setItem(`users`, JSON.stringify(users));
}
//check username
function ValidUserName(username) {
    if (username.length > 60) return false;
    for (let i = 0; i < username.length; i++) {
        let tav = username[i];
        if (!(tav >= 'a' && tav <= 'z' || tav >= 'A' && tav <= 'Z' || tav >= '0' && tav <= '9' || tav == `!` || tav == `@` || tav == `#`)) {
            alert(`invalid username! must be under 60 chars and contain only letters, numbers and special chars`);
            document.querySelector(`#user_name`).classList.add(`invalid`);
            return false;
        }
    }
    return true;
}

//confirm password
function PasswordsMatch(password1, password2) {
    if (password1 != password2) {
        alert(`passwords don't match!`);
        document.querySelector(`#password_confirm`).classList.add(`invalid`);
        return false;
    }
    return true;
}
//check first name
function ValidFirstName(name) {
    for (let index = 0; index < name.length; index++) {
        const tav = name[index];
        if (!(tav >= 'a' && tav <= 'z' || tav >= 'A' && tav <= 'Z')) {
            alert(`first name must be only letters!`);
            document.querySelector(`#user_first_name`).classList.add(`invalid`);
            return false;
        }
        return true;

    }
}
//check last name
function ValidLastName(name) {
    for (let index = 0; index < name.length; index++) {
        const tav = name[index];
        if (!(tav >= 'a' && tav <= 'z' || tav >= 'A' && tav <= 'Z')) {
            alert(`last name must be only letters!`);
            document.querySelector(`#user_last_name`).classList.add(`invalid`);
            return false;
        }
        return true;
    }
}
//check email
function ValidEmail(email) {
    let counter = 0;
    let com = email.indexOf(".com");
    for (let i = 0; i < email.length; i++) {
        if (!(email.charAt(i) >= 'a' && email.charAt(i) <= 'z' || email.charAt(i) >= 'A' && email.charAt(i) <= 'Z' || email.charAt(i) >= '0' && email.charAt(i) <= '9')) {
            if (email.charAt(i) == '@') {
                counter++;
            }
            else if (email.charAt(i) == '.') continue;
            else {
                alert(`email must be letters and numbers only`);
                document.querySelector(`#user_email`).classList.add(`invalid`);
                return false;
            }
        }
    }
    //check if @ appears only once
    if (counter == 0 || counter > 1) {
        alert(`you entered @ more than once...`);
        document.querySelector(`#user_email`).classList.add(`invalid`);
        return false;
    }
    //אם אין במחרוזת .com או אם הוא אינו בסוף המחרוזת הצג את ההודעה
    if (com == -1 || com != email.length - 4) {
        alert(`your email needs to end with .com`);
        document.querySelector(`#user_email`).classList.add(`invalid`);
        return false;
    }
    //מעבר על המערך ובדיקה האם קיים מייל הזה לזה שאנו קולטים מהמשתמש
    let temp = users.filter((user) => { return user.User_email == email })
    if (temp.length != 0) {
        alert(`this email already exists in our database!`)
        document.querySelector(`#user_email`).classList.add(`invalid`);
        return false;
    }
    return true;
}
//check date
function ValidDate(userDate) {
    let year = parseInt(userDate.split(`-`)[0])
    let date = new Date()
    let yearToDay = date.getFullYear()
    if (!(yearToDay - year < 120 && yearToDay - year >= 0)) {
        alert(`invalid date...`)
        document.querySelector(`#user_birthdate`).classList.add(`invalid`);
        return false;
    }
    return true;
}
//check street name
function ValidStreet(street) {
    for (let index = 0; index < street.length; index++) {
        const tav = street[index];
        if (!(tav >= 'a' && tav <= 'z' || tav >= 'A' && tav <= 'Z')) {
            alert(`street must only have chars!`);
            document.querySelector(`#user_street`).classList.add(`invalid`);
            return false;
        }
    }
    return true;
}
//check street number
function ValidStreetNumber(streetNum) {
    let num = parseInt(streetNum);
    if (num < 0) {
        alert(`street num can't be negative!`)
        document.querySelector(`#user_street_number`).classList.add(`invalid`);
        return false;
    }
    return true;
}
//this function makes the image src go into localstorage as source url instead of page url
function ShowImage(event) {
    event.preventDefault()
    //הקובץ שנבחר
    let file = event.target.files[0]

    //אובייקט המסוגל לקרוא קבצים מתוך המחשב
    let reader = new FileReader()

    //שיוך אירוע של טעינה
    //ברגע שהאובייקט מוכן לפעולה - תקרא את הקובץ הרלוונטי
    reader.onload = () => {
        //תתפוס את האלמנט של התמונה 
        const element = document.querySelector(`.images`)
        //תציג את המידע של התמונה באלמנט
        element.src = reader.result
    }
    //הפעלה של קורא הקבצים
    reader.readAsDataURL(file)
}

//function to login
function LoginUser(event) {
    event.preventDefault();
    //get the email and password
    let email = document.querySelector(`#user_email`).value;
    let password = document.querySelector(`#user_password`).value;
    //if user enters admin info - move to admin page
    if (email == "admin@admin" && password == "admin1234admin") {
        return location.href = `admin.html`;
    }
    //get data from local storage
    let currentUser = users.filter((user) => { return user.User_email == email });
    let currentUserIndex = users.findIndex(user => user.User_email == email);

    if (currentUser.length == 0) {
        alert(`No account has been found for the specified email address`);
        return;
    }
    currentUser = currentUser[0];
    if (currentUser.User_password != password) {
        alert(`Invalid password!`);
        return;
    }
    alert(`Login successful`)
    sessionStorage.setItem(`login_user`, JSON.stringify(currentUser))
    sessionStorage.setItem(`usersImages`, JSON.stringify(usersImages[currentUserIndex]))

    location.href = "profile.html"
}
//show user info in profile page
function UserInfo() {
    var temp = JSON.parse(sessionStorage.getItem(`login_user`))
    var Pic = JSON.parse(sessionStorage.getItem(`usersImages`))
    let name_first = document.querySelector(`#profile_user`)
    let email = document.querySelector(`#profile_email`)
    let address = document.querySelector(`#profile_address`)
    let date = document.querySelector(`#profile_date`)
    let pic = document.querySelector(`#logo_Pro`)
    pic.src = Pic
    name_first.innerHTML += `${temp.User_FirstName} ${temp.User_LastName}`
    email.innerHTML += temp.User_email
    address.innerHTML += `${temp.User_Street} ${temp.User_StreetNumber}, ${temp.User_City}`
    date.innerHTML += `${temp.User_Date}`
}
//load selected user data - admin page
function AdminLoadUserData(){
    let selectedUserIndex = JSON.parse(sessionStorage.getItem(`index`));
    let usersArr = JSON.parse(localStorage.getItem(`users`));
    let selectedUser = usersArr[selectedUserIndex];
    //usersArr.splice(selectedUserIndex, 1) //remove the selected user from the array
    document.querySelector(`#admin_update_name`).value = selectedUser.User_name;
    document.querySelector(`#admin_update_password`).value = selectedUser.User_password;
    document.querySelector(`#admin_update_password_confirm`).value = selectedUser.User_password;
    document.querySelector(`#admin_update_first_name`).value = selectedUser.User_FirstName;
    document.querySelector(`#admin_update_last_name`).value = selectedUser.User_LastName;
    document.querySelector(`#admin_update_email`).value = selectedUser.User_email;
    document.querySelector(`#admin_update_date`).value = selectedUser.User_Date;
    document.querySelector(`#admin_update_city`).value = selectedUser.User_City;
    document.querySelector(`#admin_update_street`).value = selectedUser.User_Street;
    document.querySelector(`#admin_update_street_number`).value = selectedUser.User_StreetNumber
}
function AdminUpdateUserData(event){
    event.preventDefault();
    let inputs = document.querySelectorAll(`.form-control`);
    inputs.forEach((input) => input.classList.remove(`invalid`));
    let User_name = document.querySelector(`#admin_update_name`).value;
    let User_password = document.querySelector(`#admin_update_password`).value
    let User_password_confirm = document.querySelector(`#admin_update_password_confirm`).value
    let User_FirstName = document.querySelector(`#admin_update_first_name`).value;
    let User_LastName = document.querySelector(`#admin_update_last_name`).value;
    let User_email = document.querySelector(`#admin_update_email`).value;
    let User_img = document.querySelector(`#admin_update_profile_img`).src
    let User_Date = document.querySelector(`#admin_update_date`).value;
    let User_City = document.querySelector(`#admin_update_city`).value;
    let User_Street = document.querySelector(`#admin_update_street`).value;
    let User_StreetNumber = document.querySelector(`#admin_update_street_number`).value;
    if (AdminUpdateValidUserName(User_name) && AdminUpdateValidPassword(User_password) && AdminUpdatePasswordsMatch(User_password, User_password_confirm)
    && AdminUpdateValidFirstName(User_FirstName) && AdminUpdateValidLastName(User_LastName)
    && AdminUpdateValidEmail(User_email) && AdminUpdateValidDate(User_Date)
    && AdminUpdateValidStreet(User_Street) && AdminUpdateValidStreetNumber(User_StreetNumber)){
        let selectedUserIndex = JSON.parse(sessionStorage.getItem(`index`));
        let usersArr = JSON.parse(localStorage.getItem(`users`));
        let imagesArr = JSON.parse(localStorage.getItem(`usersImages`));
        imagesArr.splice(selectedUserIndex, 1)
        usersArr.splice(selectedUserIndex, 1) //remove the selected user from the array
        let updatedUser = new User(User_name, User_password, User_FirstName, User_LastName, User_email,
            User_Date, User_City, User_Street, User_StreetNumber);
        usersArr.push(updatedUser);
        imagesArr.push(User_img);
        localStorage.setItem(`users`, JSON.stringify(usersArr));
        localStorage.setItem(`usersImages`, JSON.stringify(imagesArr))
    }
    alert(`update successful`)
    location.href=`admin.html`
}
//load current user data
function LoadUserData(){
    let currentUser = JSON.parse(sessionStorage.getItem(`login_user`))
    document.querySelector(`#update_name`).value = currentUser.User_name;
    document.querySelector(`#update_password`).value = currentUser.User_password;
    document.querySelector(`#update_password_confirm`).value = currentUser.User_password;
    document.querySelector(`#update_first_name`).value = currentUser.User_FirstName;
    document.querySelector(`#update_last_name`).value = currentUser.User_LastName;
    document.querySelector(`#update_email`).value = currentUser.User_email;
    document.querySelector(`#update_date`).value = currentUser.User_Date;
    document.querySelector(`#update_city`).value = currentUser.User_City;
    document.querySelector(`#update_street`).value = currentUser.User_Street;
    document.querySelector(`#update_street_number`).value = currentUser.User_StreetNumber
}
//update user data - logged user
function UpdateUserData(event) {
    event.preventDefault()
    let usersArr = JSON.parse(localStorage.getItem(`users`));
    let currentUser = JSON.parse(sessionStorage.getItem(`login_user`));
    let currentUserIndex = usersArr.findIndex(user => user === currentUser);
    let inputs = document.querySelectorAll(`.form-control`);
    inputs.forEach((input) => input.classList.remove(`invalid`));
    let User_name = document.querySelector(`#update_name`).value;
    let User_password = document.querySelector(`#update_password`).value
    let User_password_confirm = document.querySelector(`#update_password_confirm`).value
    let User_FirstName = document.querySelector(`#update_first_name`).value;
    let User_LastName = document.querySelector(`#update_last_name`).value;
    let User_email = document.querySelector(`#update_email`).value;
    let User_img = document.querySelector(`#update_profile_img`).src
    let User_Date = document.querySelector(`#update_date`).value;
    let User_City = document.querySelector(`#update_city`).value;
    let User_Street = document.querySelector(`#update_street`).value;
    let User_StreetNumber = document.querySelector(`#update_street_number`).value;
    let imagesArr = JSON.parse(localStorage.getItem(`usersImages`));
    usersArr.splice(currentUserIndex, 1);
    imagesArr.splice(currentUserIndex, 1);

    if (UpdateValidUserName(User_name) && UpdateValidPassword(User_password) && UpdatePasswordsMatch(User_password, User_password_confirm)
    && UpdateValidFirstName(User_FirstName) && UpdateValidLastName(User_LastName)
    && UpdateValidEmail(User_email) && UpdateValidDate(User_Date)
    && UpdateValidStreet(User_Street) && UpdateValidStreetNumber(User_StreetNumber)){
        let updatedUser = new User(User_name, User_password, User_FirstName, User_LastName, User_email,
            User_Date, User_City, User_Street, User_StreetNumber);
            sessionStorage.setItem(`login_user`, JSON.stringify(updatedUser));
            sessionStorage.setItem(`usersImages`, JSON.stringify(User_img));
            usersArr.push(updatedUser);
            imagesArr.push(User_img);
            localStorage.setItem(`users`, JSON.stringify(usersArr));
            localStorage.setItem(`usersImages`, JSON.stringify(imagesArr))
            alert(`Update successful`)
            location.href = `profile.html`
    }
}
//check for updated user info
function UpdateValidUserName(username) {
    if (!IsValidUserName(username)){
        alert(`Invalid username! Must be under 60 chars and contain only letters, numbers and special chars`);
        document.querySelector(`#update_name`).classList.add(`invalid`);
    }
}
//check for updated user info
function IsValidUserName(username) {
    if (username.length > 60) return false;
    for (let i = 0; i < username.length; i++) {
        let tav = username[i];
        if (!(tav >= 'a' && tav <= 'z' || tav >= 'A' && tav <= 'Z' || tav >= '0' && tav <= '9' || tav == `!` || tav == `@` || tav == `#`))
            return false;
    }
    return true;
}
//check password
function UpdateValidPassword(password) {
    let result = ValidPassword(password)
    if (result == 2) {
        alert(`password must be 7-12 chars long`)
        document.querySelector(`#update_password`).classList.add(`invalid`);
            return false;
        }
    if (result == 3) {
        alert(`password requires capital letter, number and special char`);
        document.querySelector(`#password`).classList.add(`invalid`);
        return false;
    }
    return true;
}

//check password 1 - valid, 2 -short name, 3 - password doesn't meet requirements
function ValidPassword(User_password) {
    let SpecialCharacter = false;
    let number = false;
    let CapitalLetter = false;
    let format = "/^[!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?]*$/";
    if (User_password.length < 7 && User_password.length > 12)         
        return 2;

    for (let i = 0; i < User_password.length; i++) {
        if (User_password.charAt(i) >= 'A' && User_password.charAt(i) <= 'Z')
            CapitalLetter = true;
        else if (parseInt(User_password[i]) >= 0 && parseInt(User_password[i]) <= 9)
            number = true;
    }
    for (let i = 0; i < User_password.length; i++) {
        for (let j = 0; j < format.length; j++) {
            if (User_password.charAt(i) == format.charAt(j))
                SpecialCharacter = true;
        }
    }

    if (!SpecialCharacter || !number || !CapitalLetter) 
        return 3;

    return 1;
}
//confirm password
function UpdatePasswordsMatch(password1, password2) {
    if (password1 != password2) {
        alert(`passwords don't match!`);
        document.querySelector(`#update_password_confirm`).classList.add(`invalid`);
        return false;
    }
    return true;
}
//check first name
function UpdateValidFirstName(name) {
    for (let index = 0; index < name.length; index++) {
        const tav = name[index];
        if (!(tav >= 'a' && tav <= 'z' || tav >= 'A' && tav <= 'Z')) {
            alert(`first name must be only letters!`);
            document.querySelector(`#update_first_name`).classList.add(`invalid`);
            return false;
        }
        return true;

    }
}
//check last name
function UpdateValidLastName(name) {
    for (let index = 0; index < name.length; index++) {
        const tav = name[index];
        if (!(tav >= 'a' && tav <= 'z' || tav >= 'A' && tav <= 'Z')) {
            alert(`last name must be only letters!`);
            document.querySelector(`#update_last_name`).classList.add(`invalid`);
            return false;
        }
        return true;
    }
}
//check email
function UpdateValidEmail(email) {
    let counter = 0;
    let com = email.indexOf(".com");
    for (let i = 0; i < email.length; i++) {
        if (!(email.charAt(i) >= 'a' && email.charAt(i) <= 'z' || email.charAt(i) >= 'A' && email.charAt(i) <= 'Z' || email.charAt(i) >= '0' && email.charAt(i) <= '9')) {
            if (email.charAt(i) == '@') {
                counter++;
            }
            else if (email.charAt(i) == '.') continue;
            else {
                alert(`email must be letters and numbers only`);
                document.querySelector(`#update_email`).classList.add(`invalid`);
                return false;
            }
        }
    }
    //check if @ appears only once
    if (counter == 0 || counter > 1) {
        alert(`you entered @ more than once...`);
        document.querySelector(`#update_email`).classList.add(`invalid`);
        return false;
    }
    //אם אין במחרוזת .com או אם הוא אינו בסוף המחרוזת הצג את ההודעה
    if (com == -1 || com != email.length - 4) {
        alert(`your email needs to end with .com`);
        document.querySelector(`#update_email`).classList.add(`invalid`);
        return false;
    }
    //מעבר על המערך ובדיקה האם קיים מייל הזה לזה שאנו קולטים מהמשתמש

    return true;
}
//check date
function UpdateValidDate(userDate) {
    let year = parseInt(userDate.split(`-`)[0])
    let date = new Date()
    let yearToDay = date.getFullYear()
    if (!(yearToDay - year < 120 && yearToDay - year >= 0)) {
        alert(`invalid date...`)
        document.querySelector(`#update_date`).classList.add(`invalid`);
        return false;
    }
    return true;
}
//check street name
function UpdateValidStreet(street) {
    for (let index = 0; index < street.length; index++) {
        const tav = street[index];
        if (!(tav >= 'a' && tav <= 'z' || tav >= 'A' && tav <= 'Z')) {
            alert(`street must only have chars!`);
            document.querySelector(`#update_street`).classList.add(`invalid`);
            return false;
        }
    }
    return true;
}
//check street number
function UpdateValidStreetNumber(streetNum) {
    let num = parseInt(streetNum);
    if (num < 0) {
        alert(`street num can't be negative!`)
        document.querySelector(`#update_street_number`).classList.add(`invalid`);
        return false;
    }
    return true;
}
function ProductInfo() {
    debugger
    let div = document.querySelector(`#productInfo`)
    let array = JSON.parse(localStorage.getItem(`Array_of_product`))
    let pic = document.querySelector(`#img_product_page`)
    let button = document.querySelector(`#buttons`)
    let temp = location.href.split(`?id=`)[1]
    for (let i = 0; i < array.length; i++) {
        if (array[i].product_number == temp) {
            div.innerHTML = `<h1>${array[i].product_name}</h1>
            <h2>${array[i].product_description}</h2>
            <h3>${array[i].product_price}₪</h3>
            
            `
            pic.src = array[i].product_Pic

            button.innerHTML += `
            <button type="button" data-id="${productArr[i].product_number}" class="add" style="margin-right: 15px;">Add to cart</button>
            <a href="/shop.html"><button type="button" style="margin-right: 15px;">Back to overview</button></a>`

        }
    }
    let addToCart = document.querySelectorAll(`.add`)
    addToCart.forEach(btn => btn.addEventListener(`click`, AddToCart))
}
//show products on shop page

function PrintProduct() {
    let temp = document.querySelector(`#product_shop`)
    for (let i = 0; i < productArr.length; i++) {
        temp.innerHTML += ` <div class="col filterDiv ${productArr[i].product_category}">
       <div class="card shadow-sm" >
         <div class="card-body" style="height: 400px;">
           <img class="product-picture" src="${productArr[i].product_Pic}" alt="" class="img">
           <p>${productArr[i].product_name}</p>
             <p style="color: red;"><b>${productArr[i].product_price}</b></p>
           <div class="d-flex justify-content-between align-items-center">
             <div class="btn-group">
               <button><a href="product.html?id=${productArr[i].product_number}" type="button" data-id="${productArr[i].product_number}" class="" >Product info</a></button>
               <button type="button" data-id="${productArr[i].product_number}" class="add" style="margin-right: 15px;">Add to cart</button>
             </div>
           </div>
         </div>
       </div>
     </div>`
    }
    let addToCart = document.querySelectorAll(`.add`)
    addToCart.forEach(btn => btn.addEventListener(`click`, AddToCart))
}
//הוספת מוצר לעגלה
function AddToCart(event) {
    event.preventDefault()
    let temp = event.target
    let element = temp.dataset.id
    cart.push(element)
    alert(`Product added to cart!`)
    sessionStorage.setItem(`cart`, JSON.stringify(cart))
}
//filter products by category
function FilterSelection(c) {
    elements = document.getElementsByClassName("filterDiv");
    for (const element of elements) {
      element.classList.remove("show");
      if (!c || element.classList.contains(c)) 
          element.classList.add("show");
    }
  }
//filter products by price
function FilterProductsByPrice(event) {
    event.preventDefault()
    let display = document.querySelector(`#product_shop`);
    display.innerHTML = ``;
    let price = document.querySelector(`#price_shop`)
    if (price.value.length == 0) {
        PrintProduct()
    }
    else {
        let priceValue = parseInt(price.value);
        let productArr = JSON.parse(localStorage.getItem(`Array_of_product`))

        for (let i = 0; i < productArr.length; i++) {
            const currentPrice = productArr[i].product_price;
            if (currentPrice <= priceValue) {
                display.innerHTML += ` <div class="col">
                <div class="card shadow-sm" >
                  <div class="card-body" style="height: 400px;">
                    <img class="product-picture" src="${productArr[i].product_Pic}" alt="" class="img">
                    <p>${productArr[i].product_name}</p>
                      <p style="color: red;"><b>${productArr[i].product_price}</b></p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button><a href="product.html?id=${productArr[i].product_number}" type="button" data-id="${productArr[i].product_number}" class="" >Product info</a></button>
                        <button type="button" data-id="${productArr[i].product_number}" class="add" style="margin-right: 15px;">Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
            }
        }
    }
    let addToCart = document.querySelectorAll(`.add`)
    addToCart.forEach(btn => btn.addEventListener(`click`, AddToCart))
}
//הצגת סל הקניות
function ShowCart() {
    let div = document.querySelector(`#show_shoping_cart`)
    let array = JSON.parse(sessionStorage.getItem(`cart`)) || [];
    let temp = JSON.parse(localStorage.getItem(`Array_of_product`)) || [];

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < temp.length; j++) {
            if (array[i] == temp[j].product_number) {
                div.innerHTML += `      <div class="container" style="display: flex;">
        <div class="me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden" style="width: 40%; background-color: rgb(0,0,0,0.5);">
            <div class="my-3 py-3">
              <p class="lead"><img src="${temp[j].product_Pic}" alt="" style="width: 100px; height: 100px;"></p>
              <p>${temp[j].product_name}</p>    
              <p>${temp[j].product_description}</p>
                <p style="color: red;"><b>${temp[j].product_price}₪</b></p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group" style="margin: auto">
                     <button><a href="product.html?id=${temp[j].product_number}" type="button" data-id="${temp[j].product_number}" class="" >Product Page</a></button> <br>
                      <button id=${temp[j].product_number}" type="button" data-id="${temp[j].product_number}" class="remove" >Remove product from cart</button>
                      </div>
                </div>
            </div>
            </div><br>
        </div>`
            }
        }
    }
    let removeFromCart = document.querySelectorAll(`.remove`)
    removeFromCart.forEach(btn => btn.addEventListener(`click`, RemoveFromCart))
}
//הסרת מוצרים מהסל
function RemoveFromCart(event) {
    event.preventDefault()
    let temp = event.target
    let value = temp.dataset.id
    let array = JSON.parse(sessionStorage.getItem(`cart`)) || [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] == value) {
            array.splice(i, 1)
            break
        }
    }
    sessionStorage.setItem(`cart`, JSON.stringify(array))
    location.reload();
    ShowCart()
}
//קניית כל המוצרים שיש בעגלה
function PurchaseAllProductsUI(event) {
    let priceCount = PurchaseAllProducts();    
    if (priceCount === -1) {
        alert(`Please login to complete your purchase`)
        return location.href = `login.html`;
    }
    else {
        alert(`Your account has been charged ${priceCount}₪`)
    }
    return location.href = `shop.html`
}

//returns (-1) - no login user, otherwise charging sum
function PurchaseAllProducts() {
    if (JSON.parse(sessionStorage.getItem(`login_user`)) === null) {
        alert(`Please login to complete your purchase`)
        return -1;
    }
    let priceCount = 0;
    let array = JSON.parse(sessionStorage.getItem(`cart`)) || [];
    let temp = JSON.parse(localStorage.getItem(`Array_of_product`)) || [];

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < temp.length; j++) {
            if (array[i] == temp[j].product_number) {
                priceCount += parseInt(temp[j].product_price);
            }
        }
    }
    
    array = []
    sessionStorage.setItem(`cart`, JSON.stringify(array));
    return priceCount;
}


//show all users from admin page
function Users() {
    var temp = JSON.parse(localStorage.getItem(`users`)) || [];
    let pics = JSON.parse(localStorage.getItem(`usersImages`)) || [];
    let index = document.querySelector(`#tabel-administrator`)
    for (let i = 0; i < temp.length; i++) {
        index.innerHTML += ` <div class="col-md-6" style="display: flex;">
        <div>
            <img src="${pics[i]}" alt=""  id="logo_adm" style="width:200px">
        </div>
        <div style="margin-right: 10%; background-color: white">
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" id="profile_pic" style="width: 400px; ">
            <div class="col p-4 d-flex flex-column position-static">
              <strong class="d-inline-block mb-2 text-primary" id="profile_user_adm">Username:  ${temp[i].User_name}</strong>
              <h3 class="mb-0" id="profile_name_adm">Full name: ${temp[i].User_FirstName} ${temp[i].User_LastName}</h3>
              <h3 class="mb-0" id="profile_date_adm">Birth date: ${temp[i].User_Date}</h3>
              <h3 class="mb-0" id="profile_email_adm">Email address: ${temp[i].User_email}</h3>
              <div class="mb-1" id="profile_addres_adm">Home address: ${temp[i].User_Street} ${temp[i].User_StreetNumber}, ${temp[i].User_City}</div>
          </div>
          <div>
            <a href="adminUpdate.html" role="button" class="btn btn-primary" id="updateUserInfo" onclick="saveIndex(${i})" style="background-color:gray; border-color:gray">Update user info</a>
            <button><a id="${temp[i].User_email}" role="button" class="remove_user">Delete user from database</a></button> 
        </div>
    </div>
        </div>`
    }
    let remove_user = document.querySelectorAll(`.remove_user`)
    remove_user.forEach(btn => btn.addEventListener(`click`, RemoveUser))
}
//save the index of the session storage array
function saveIndex(index) {
    sessionStorage.setItem(`index`, JSON.stringify(index))
}
//remove users from localstorage
function RemoveUser(event) {
    event.preventDefault()
    let temp = event.target.id
    let value = temp
    let array = JSON.parse(localStorage.getItem(`users`)) || [];
    let pic = JSON.parse(localStorage.getItem(`usersImages`)) || [];

    for (let i = 0; i < array.length; i++) {
        if (array[i].User_email == value) {
            array.splice(i, 1)
            pic.splice(i, 1)
            break
        }
    }


    localStorage.setItem(`users`, JSON.stringify(array))
    localStorage.setItem(`usersImages`, JSON.stringify(pic))

    location.reload()
    Users()
}
//function to add product to stock

function AddProduct(event) {
    event.preventDefault()
    let inputs = document.querySelectorAll(`.form-control`);
    inputs.forEach((input) => input.classList.remove(`invalid`));
    let number = parseInt(document.querySelector(`#number`).value)
    if (number <= 0){
        alert(`ID must be a positive number`)
        document.querySelector(`#number`).classList.add(`invalid`)
        return;
    }
    let name = document.querySelector(`#name`).value
    let price = document.querySelector(`#price`).value
    let pic = document.querySelector(`#add_product_img`).src
    let description = document.querySelector(`#description`).value
    let category = document.querySelector(`.category_add:checked`)
    category = category.dataset.string
    let array = JSON.parse(localStorage.getItem(`Array_of_product`)) || [];
  
    //check if product id doesn't exist in the database
    for (let i = 0; i < array.length; i++) {
        const currentID = array[i].product_number;
        if (number === currentID) {
            alert(`This product ID already exists!`)
            document.querySelector(`#number`).classList.add(`invalid`)
            return;
        }

    }
    //check if price is not negative
    if (price <= 0) {
        alert(`Price must be higher than 0`)
        document.querySelector(`#price`).classList.add(`invalid`)
        return;
    }
    var product = new Product(name, number, price, pic, description, category)
    //הוספת המוצר
    AddProductToStorage(product);
}

function AddProductToStorage(product){
      //הוספת המוצר
      let array = JSON.parse(localStorage.getItem(`Array_of_product`)) || [];
      //הוספת מוצר למערך ושמירתו
      array.push(product)
      localStorage.setItem(`Array_of_product`, JSON.stringify(array))
      alert(`המוצר נוסף בהצלחה`)
}

function RemoveProductFromStorage(product_number){
    let products = JSON.parse(localStorage.getItem(`Array_of_product`)) || [];
    products = products.filter(p=>p.product_number !== product_number);
    localStorage.setItem(`Array_of_product`, JSON.stringify(products));
}

//function to toggle the purchase button - if cart is empty hide button, else show
function TogglePurchaseButton() {
    let cart = JSON.parse(sessionStorage.getItem(`cart`));
    if (cart == null || cart.length == 0) {
        alert(`Your shopping cart is empty!`)
        return location.href = `shop.html`
    }
    return
}
//check for admin updated user info
function AdminUpdateValidUserName(username) {
    if (username.length > 60) return false;
    for (let i = 0; i < username.length; i++) {
        let tav = username[i];
        if (!(tav >= 'a' && tav <= 'z' || tav >= 'A' && tav <= 'Z' || tav >= '0' && tav <= '9' || tav == `!` || tav == `@` || tav == `#`)) {
            alert(`invalid username! must be under 60 chars and contain only letters, numbers and special chars`);
            document.querySelector(`#admin_update_name`).classList.add(`invalid`);
            return false;
        }
    }
    return true;
}
//check password
function AdminUpdateValidPassword(User_password) {
    let SpecialCharacter = false;
    let number = false;
    let CapitalLetter = false;
    let format = "/^[!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?]*$/";
    if (User_password.length < 7 && User_password.length > 12) {
        alert(`password must be 7-12 chars long`)
        document.querySelector(`#admin_update_password`).classList.add(`invalid`);
        return false;
    }
    for (let i = 0; i < User_password.length; i++) {
        if (User_password.charAt(i) >= 'A' && User_password.charAt(i) <= 'Z')
            CapitalLetter = true;
        else if (parseInt(User_password[i]) >= 0 && parseInt(User_password[i]) <= 9)
            number = true;
    }
    for (let i = 0; i < User_password.length; i++) {
        for (let j = 0; j < format.length; j++) {
            if (User_password.charAt(i) == format.charAt(j))
                SpecialCharacter = true;
        }
    }

    if (!SpecialCharacter || !number || !CapitalLetter) {
        alert(`password requires capital letter, number and special char`);
        document.querySelector(`#admin_password`).classList.add(`invalid`);
        return false;
    }
    return true;
}
//confirm password
function AdminUpdatePasswordsMatch(password1, password2) {
    if (password1 != password2) {
        alert(`passwords don't match!`);
        document.querySelector(`#admin_update_password_confirm`).classList.add(`invalid`);
        return false;
    }
    return true;
}
//check first name
function AdminUpdateValidFirstName(name) {
    for (let index = 0; index < name.length; index++) {
        const tav = name[index];
        if (!(tav >= 'a' && tav <= 'z' || tav >= 'A' && tav <= 'Z')) {
            alert(`first name must be only letters!`);
            document.querySelector(`#admin_update_first_name`).classList.add(`invalid`);
            return false;
        }
        return true;

    }
}
//check last name
function AdminUpdateValidLastName(name) {
    for (let index = 0; index < name.length; index++) {
        const tav = name[index];
        if (!(tav >= 'a' && tav <= 'z' || tav >= 'A' && tav <= 'Z')) {
            alert(`last name must be only letters!`);
            document.querySelector(`#admin_update_last_name`).classList.add(`invalid`);
            return false;
        }
        return true;
    }
}
//check email
function AdminUpdateValidEmail(email) {
    let counter = 0;
    let com = email.indexOf(".com");
    for (let i = 0; i < email.length; i++) {
        if (!(email.charAt(i) >= 'a' && email.charAt(i) <= 'z' || email.charAt(i) >= 'A' && email.charAt(i) <= 'Z' || email.charAt(i) >= '0' && email.charAt(i) <= '9')) {
            if (email.charAt(i) == '@') {
                counter++;
            }
            else if (email.charAt(i) == '.') continue;
            else {
                alert(`email must be letters and numbers only`);
                document.querySelector(`#admin_update_email`).classList.add(`invalid`);
                return false;
            }
        }
    }
    //check if @ appears only once
    if (counter == 0 || counter > 1) {
        alert(`you entered @ more than once...`);
        document.querySelector(`#admin_update_email`).classList.add(`invalid`);
        return false;
    }
    //אם אין במחרוזת .com או אם הוא אינו בסוף המחרוזת הצג את ההודעה
    if (com == -1 || com != email.length - 4) {
        alert(`your email needs to end with .com`);
        document.querySelector(`#admin_update_email`).classList.add(`invalid`);
        return false;
    }
    //מעבר על המערך ובדיקה האם קיים מייל הזה לזה שאנו קולטים מהמשתמש

    return true;
}
//check date
function AdminUpdateValidDate(userDate) {
    let year = parseInt(userDate.split(`-`)[0])
    let date = new Date()
    let yearToDay = date.getFullYear()
    if (!(yearToDay - year < 120 && yearToDay - year >= 0)) {
        alert(`invalid date...`)
        document.querySelector(`#admin_update_date`).classList.add(`invalid`);
        return false;
    }
    return true;
}
//check street name
function AdminUpdateValidStreet(street) {
    for (let index = 0; index < street.length; index++) {
        const tav = street[index];
        if (!(tav >= 'a' && tav <= 'z' || tav >= 'A' && tav <= 'Z')) {
            alert(`street must only have chars!`);
            document.querySelector(`#admin_update_street`).classList.add(`invalid`);
            return false;
        }
    }
    return true;
}
//check street number
function AdminUpdateValidStreetNumber(streetNum) {
    let num = parseInt(streetNum);
    if (num < 0) {
        alert(`street num can't be negative!`)
        document.querySelector(`#admin_update_street_number`).classList.add(`invalid`);
        return false;
    }
    return true;
}

//הוספת מוצר לעגלה
function AddProductToCart(product_number) {
    let cart = JSON.parse(sessionStorage.getItem(`cart`)) || [];
    cart.push(product_number);
    sessionStorage.setItem(`cart`, JSON.stringify(cart))
}

//remove product test function
//הסרת מוצרים מהסל
function RemoveProductFromCart(product_number){
    let products = JSON.parse(sessionStorage.getItem(`cart`)) || [];
    products = products.filter(p=>p.product_number !== product_number);
    sessionStorage.setItem(`cart`, JSON.stringify(products))
}





