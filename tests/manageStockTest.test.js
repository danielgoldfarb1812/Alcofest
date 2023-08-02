describe('Manage product in stock', () => {
    it('Add item', () => {
        let product = new Product("TestProductAdd", 1, 10, `/images/baltika.png`, "good", "1");
        AddProductToStorage(product) ;
        debugger;
        let products = JSON.parse(localStorage.getItem(`Array_of_product`));
        products = products.filter(p=>p.product_number === product.product_number);
        //Assert
        expect(products.length).toBe(1);   
        expect(products[0].product_number).toBe(product.product_number);  
        RemoveProductFromStorage(product.product_number);
    });

    it('Remove item', () => {
        //  2 id  חדש עם  Product יוצרים 
        let product = new Product("TestProductRemove", 2, 10, `/images/baltika.png`, "good", "1");
        //  localStorage שנמצא בתוך ה `Array_of_product` מוסיפים את המוצר לתוך 
        AddProductToStorage(product); 
        // localStorage שנמצא בתוך ה `Array_of_product` מקבלים את  כל המוצרים  
        let products = JSON.parse(localStorage.getItem(`Array_of_product`));
        // ומחזירים 1 id מסננים את המוצרים שיש להם את אותו 
        products = products.filter(p=>p.product_number === product.product_number);
        //Assert
        expect(products.length).toBe(1);   
        expect(products[0].product_number).toBe(product.product_number);  //id 2 מיקום 0 מחזיר את המוצר עם  
        // 2 id  מסירים את המוצר 
        RemoveProductFromStorage(product.product_number);
             // localStorage שנמצא בתוך ה `Array_of_product` מקבלים את  כל המוצרים  
        products = JSON.parse(localStorage.getItem(`Array_of_product`));
            // id מסננים את המוצרים שיש להם את אותו 
            //אחרי הסרה מוודאים שהמוצרים הוסרו
        //Assert
        products = products.filter(p=>p.product_number === product.product_number);
        expect(products.length).toBe(0);// ומחזירים 0
    });    
});

