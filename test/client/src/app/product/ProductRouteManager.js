/**
 * This manages the routing for admin panel
 * 
 * @param define
 * 
 * @author M Neza Melencion
 */
(function ( define ) {
    "use strict";

    define([
            'utils/logger/ExternalLogger',
            'product/controllers/ProductController'
        ],
        function ( $log, ProductController )
        {
                /**
                 * Route management constructor ()
                 * - to be used in angular.config()
                 *
                 */
            var ProductRouteManager = function ( $routeProvider )
            {
                $log.debug( "Configuring $routeProvider...");
                var tpl_path = "./views/product/";
                
                $routeProvider
                    .when( '/', {
                    	templateUrl: tpl_path + "list.html",
                        controller  : "ProductController"
                    })
                    .when('/product/edit/:productID', {
                    	templateUrl: tpl_path + "edit.html",
				        controller: 'ProductController'
                    });
            };

            $log = $log.getInstance( "ProductRouteManager" );

            return ["$routeProvider", ProductRouteManager ];
        });


}( define ));

