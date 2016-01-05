/**
 * ******************************************************************************************************
 *
 *   Product Module
 *
 *   Defines controllers and services for the product
 * ******************************************************************************************************
 */
(function ( define, angular ) {
    "use strict";

    var dependencies = [
                        'app/product/services/ProductService',
                        'app/product/controllers/ProductController'
                    ];
    
    define( dependencies, function ( ProductService, ProductController )
    {
    	var moduleName = "app.Product";

        angular.module( moduleName, [ ] )
               	.service( "productService", ProductService )
               	.controller( "ProductController", ProductController );

        return moduleName;
    });

}( define, angular ));

