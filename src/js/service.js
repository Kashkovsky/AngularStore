(function () {
    'use strict';

    app.factory('StoreService', storeService);
    storeService.$inject = [];

    function storeService() {
        var dummyDescription = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';
        var store = [
            new category('Literature & Fiction', [
                new product(1, 'Camino Island: A Novel', 'John Grisham', 10.74, dummyDescription),
                new product(2, 'The Handmaids Tale', 'Margaret Atwood', 10.20, dummyDescription),
                new product(3, 'Theft by Finding: Diaries', 'David Sedaris', 10.00, dummyDescription)
            ]),
            new category('Science Fiction & Fantasy', [
                new product(4, 'Beren and Lúthien', 'J.R.R. Tolkien and Christopher Tolkien', 18.00, dummyDescription),
                new product(5, 'Players Handbook', 'Wizards RPG Team', 43.00, dummyDescription),
                new product(6, 'Fahrenheit 451', 'Ray Bradbury', 99.99, dummyDescription)
            ]),
            new category('Romance', [
                new product(7, 'Milk and Honey', 'Rupi Kaur', 8.99, dummyDescription),
                new product(8, 'Come Sundown', 'Nora Roberts', 12.50, dummyDescription),
                new product(9, 'Love Story', 'Karen Kingsbury', 10.00, dummyDescription)
            ])
        ];

        var currentBasket = new basket('BookStore');

        function getCategories() {
            return store.map(function(category){ return category.name; });
        };

        function getProducts(categoryName) {
            if(!categoryName) {
                var products = [];
                for(var i = 0; i < store.length; i++) {
                    products.push.apply(products, store[i].products);
                }

                return products;
            }

            return getCategoryProducts(categoryName);
        };

        function getCategoryProducts(categoryName) {
            for(var i = 0; i < store.length; i++){
                if(store[i].name === categoryName) return store[i].products;
            }
        };

        function getProduct(id, categoryIndex) {
            if (!categoryIndex) categoryIndex = 0;
            if (categoryIndex == store.length) {return};
            var products = store[categoryIndex].products;
            for(var i = 0; i < products.length; i++) {
                if(products[i].id === id) { 
                    return products[i]; 
                }
            }

            return getProduct(id, ++categoryIndex);
        };

        return {
            getCategories: getCategories,
            getProducts: getProducts,
            getProduct: getProduct,
            basket: currentBasket
        };
    }
})();