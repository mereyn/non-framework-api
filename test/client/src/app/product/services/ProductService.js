/**
 * Define product service
 * 
 * @author Neza Melencion
 * 
 * @param define
 */
(function(define) {
    "use strict";
    
    var dependencies = [
                    ];

    define( dependencies, function (  )
    {
    	var ProductService = function ( $http, $q, $log )
    	{
    		$log = $log.getInstance( "ProductService" );
            $log.debug( "constructor() ");
            
            var serviceBase = 'http://localhost/myapp/api/product.php?apikey=nezamelencion&',
            /**
             * Get all the products
             * 
             */
            loadAllProducts = function()
            {
                $log.debug("loadall products service");

                return $http.get(serviceBase + 'method=get');
            },
            /**
             * Get the selected product
             * 
             * @param int productID
             */
            getProductById = function( productID )
            {
                $log.debug("getProductById product service {id}", productID);
                
                return $http.get(serviceBase + 'method=get&id=' + productID).then(function (response) {
                	return response;
        	    });
            },
            /**
             * Delete product 
             * 
             * @param int productID
             */
            deleteProductById = function( productID )
            {
                $log.debug("deleteProductById product service {id}", productID);
                
                return $http.get(serviceBase + 'method=delete&id=' + productID).then(function (response) {
        	        return response.data;
        	    });
            },
            /**
             * save the modified product
             * 
             * @param mix product
             */
            saveProduct = function( product )
            {
            	$log.debug("updateProductById {product}", product);
            	
                return $http.post(serviceBase + 'method=post', {product:product}).then(function (response) {
        	        return response.data;
        	    });
            },
            /**
             * Add new product
             * 
             * @param product
             */
            addNewProduct = function( product )
            {
                $log.debug("insertProduct {product}", product);
                
                return $http.post(serviceBase + 'method=post', {product:product}).then(function (response) {
        	        return response.data;
        	    });
            };
            
            return {
                loadProducts    	: loadAllProducts,
                getProduct      	: getProductById,
                updateProduct      	: saveProduct,
                insertProduct      	: addNewProduct,
                deleteProduct      	: deleteProductById
            };
            
    	};
        // Register as global constructor function
        return [ "$http", "$q", "$log", ProductService ];
    });
}(define));

