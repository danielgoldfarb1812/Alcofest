describe('Shopping tests', () => {
    it('Purchase all products', () => {
        debugger
        //Arrange
        let prevLoginUser = JSON.parse(sessionStorage.getItem(`login_user`));
        let user = new User("TestUserName", "TestPassword1!", "TestName", "TestLastName", "test@test.com", new Date(), "TestCity", "TestCity", 1);
        sessionStorage.setItem(`login_user`, JSON.stringify(user));
        
        let product = new Product(`Test Product`, 666, 99, null, `test descr`, `vodka`);
        AddProductToCart(product.product_number);     
        PurchaseAllProducts();
        //act
        //RemoveProductFromCart(product.product_number);
        let products = JSON.parse(sessionStorage.getItem(`cart`));
        //products = products.filter(p=>p.product_number === product.product_number);
        //Assert
        expect(products.length).toBe(0);  
        let loginUser = JSON.parse(sessionStorage.getItem(`login_user`)); 
        if(prevLoginUser)
            sessionStorage.setItem(`login_user`, JSON.stringify(prevLoginUser));
        else
            sessionStorage.removeItem("login_user");            
    });   
});

    
 
    
