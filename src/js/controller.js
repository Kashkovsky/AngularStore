(function(){
    'use strict';

    app.controller('StoreController', storeController);

    storeController.$inject = ['$scope', '$routeParams', 'StoreService'];

    function storeController($scope, $routeParams, StoreService) {

        if ($routeParams.productId != null) {
            $scope.product = StoreService.getProduct(parseInt($routeParams.productId));
        }

        $scope.basket = StoreService.basket;

        $scope.categoryChanged = function(category){
            $scope.selectedCategory = category;
            $scope.products = StoreService.getProducts(category);
        }

        $scope.init = function() {
            $scope.categories = StoreService.getCategories();
            $scope.products = StoreService.getProducts();
        };
    }
})();