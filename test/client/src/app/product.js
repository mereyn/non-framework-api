/**
 * Now let's start our  app...
 * which uses RequireJS to load  packages and code
 *
 */
(function ( define ) {
    "use strict";

    define([
            'utils/logger/ExternalLogger',
            'utils/logger/LogDecorator',
            'product/ProductRouteManager',
            'product/modules/ProductModule',
        ],
        function ( $log, LogDecorator, ProductRouteManager, ProductModule )
        {
            /**
             * Specify main application dependencies...
             *
             * @type {Array}
             */
            var app, appName = 'app';

            $log = $log.getInstance( "BOOTSTRAP" );
            $log.debug( "Initializing {0}", [ appName ] );

            /**
             * Start the main application
             *
             * We manually start this bootstrap process; since ng:app is gone
             * ( necessary to allow Loader splash pre-AngularJS activity to finish properly )
             */
            app = angular.module(appName, [ "ngRoute", "ngSanitize", "ngAnimate", ProductModule ])
                    .config( LogDecorator )
                    .config( ProductRouteManager );

            angular.bootstrap( document.getElementsByTagName("body")[0], [ appName ]);

            return app;
        }
    );

}( define ));

