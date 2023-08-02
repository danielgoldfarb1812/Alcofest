//test 2 - add product to cart
describe(`Manage Product in cart`, () => {
    it (`Add item`, () =>{
        //arrange
        //יוצרים מערך
        let emptyCart = [];
        //Cart שמים מערך ריק ומאפס את האוביקט שנקרא 
        // כרגע 0 מוצרים sessionStorage שנמצא בתוך emptyCart מאפסים את המוצרים לתוך  
        sessionStorage.setItem(`cart`, JSON.stringify(emptyCart));
        //יוצרים מוצר 1 
        let product = new Product(`Test`, 99999, 50, null, `test`, `beers`)
        //act
        //ומוסיפים את מזהה של מוצר לתוך העגלה   
        AddProductToCart(product.product_number);
        // מחזירים מערך של עגלה עם מזההים של מוצרים 
        let cart = JSON.parse(sessionStorage.getItem(`cart`));

        //assert
        //99999 נמצא בתא הראשון במערך 
        expect(cart[0]).toBe(product.product_number);
        // כרגע 0 מוצרים sessionStorage שנמצא בתוך emptyCart מאפסים את המוצרים לתוך 
        //זורק את הקודם ושם במקומו משהו חדש
        sessionStorage.setItem(`cart`, JSON.stringify(emptyCart));
    })

    //part 3 - if cart already has an item remove it
    it(`Remove item`, () =>{
        //arrange
        //יוצרים מוצר 1 
        let product = new Product(`Test Product`, 666, 99, null, `test descr`, `vodka`);
         //ומוסיפים את מזהה של מוצר לתוך העגלה 
        AddProductToCart(product.product_number);
        //act
        //מסירים את המזהה של המוצר מהעגלה
        RemoveProductFromCart(product.product_number);
        let products = JSON.parse(sessionStorage.getItem(`cart`)) || [];
        products = products.filter(p=>p.product_number === product.product_number);
        //Assert
        expect(products.length).toBe(0);   
    })
})