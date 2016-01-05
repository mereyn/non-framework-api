/**
 * Product controller
 * 
 * @author M Neza Melencion
 */
(function() {
    "use strict";
    
    var dependencies = [
                    ];
    /**
     * Register the ProductController class with RequireJS
     */
    define( dependencies, function ()
    {
    	var ProductController = function( $scope, $rootScope, productService, $location, $routeParams, $log, $window  )
        {
             $log = $log.getInstance( "ProductController" );
             $log.debug( "constructor() ");
             
             var productID = ($routeParams.productID) ? parseInt($routeParams.productID) : 0,
             		
             /**
              * Get all products
              */		
             loadAllProducts = function()
             {
                 $log.debug("load all products controller");

                 productService.loadProducts().then(function(data){
                	 $scope.products = data.data;
                 });
             },
             /**
              * Get product by id
              */
             getProduct = function( id )
             {
             	productService.getProduct(id).then(function(product){
             		var original = product.data;
                     original._id = productID;
                     
                     $scope.product = angular.copy(original);
                     $scope.product._id = productID;
                     
                     $rootScope.title = "EDIT " + product.data.product_name + " PRODUCT";
                     
                     $scope.isClean = function() {
                       return angular.equals(original, $scope.product);
                     }
                 });
             },
             deleteProduct = function( product )
             {
             	productService.deleteProduct(product.id).then(function(data){
             		loadAllProducts();
                 });
             },
             updateProduct = function( product )
             {
            	 $log.debug("update product controller {product}", [product]);
            	 
             	productService.updateProduct( product).then(function(status){
             		console.log(status);
             		if (status.response == 'success') {
             			$window.location.href = '#/';
             		}
                 });
             },
             insertProduct = function( product )
             {
             	$log.debug("insert product controller {product}", [product]);
             	
             	productService.insertProduct(product).then(function(status){
             		console.log(status.response);
             		if (status.response == 'success') {
             			$window.location.href = '#/';
             		}
                 });
             };
                 
             if (!Object.keys($routeParams).length) {
             	loadAllProducts();
             }

             if ( productID > 0 ) {
             	getProduct( productID );
             } 
             
             if ( productID <= 0 || productID == "" ) {
             	$rootScope.title = "CREATE NEW PRODUCT";
             } 
            
             $log.debug("product id " + productID); 		
             
             $scope.saveProduct = function(product) {
                 if ( productID <= 0 || productID == "" ) {
                 	insertProduct( product );
                 }
                 else {
                 	updateProduct( product );
                 }
             }
             
             $scope.deleteProduct = deleteProduct;
                
        };
        // Register as global constructor function
        return [ "$scope", "$rootScope", "productService", "$location", "$routeParams", "$log", "$window", ProductController ];
    });

}());

