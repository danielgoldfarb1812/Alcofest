describe('User settings', () => {
    it('Update user', () => {
        //Arrange
        let username = "TestUserName";
        let password = "TestPassword1!";
        let confirmPassword = "TestPassword1";
        let photo = null;
        let firstName = "TestName";
        let lastName = "TestLastName";
        let email = "TestName";
        let userDate = new Date();
        let city = "TestCity";
        let street = "TestStreet";;
        let streetNum = 1;
        let user = new User(username, password, firstName, lastName, email, userDate, city, street, streetNum);
        AddUserToStorage(user);
        let users = JSON.parse(localStorage.getItem(`users`))
        let testUsers = users.filter(u=>u.User_name === username);
        debugger;
        //Assert
        expect(testUsers).not.toBe(null);    
        expect(testUsers[0].User_name).toBe(username);       
        RemoveUserFromStorage(username);
    });   

    it('Invalid user name checking', () => {
        //Assert        
        let isValidName = IsValidUserName("Not_Valid Name");
        expect(isValidName).not.toBe(1);    
    });    

    it('Invalid password checking', () => {
        //Assert        
        let isValidName = ValidPassword("Not_Valid Password");
        expect(isValidName).not.toBe(1);    
    });    
});

    
 
    
