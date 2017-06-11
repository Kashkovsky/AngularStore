var app = angular.module('storeApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/store', {
            templateUrl: './html/store.html',
            controller: 'StoreController'
        })
        .when('/products/:productId', {
            templateUrl: './html/product.html',
            controller: 'StoreController'
        })
        .when('/basket', {
            templateUrl: './html/basket.html',
            controller: 'StoreController'
        })
        .otherwise({
            redirectTo: '/store'
        });
}]);
