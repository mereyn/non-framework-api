/**
 *  Use aysnc script loader, configure the application module (for AngularJS)
 *  and initialize the application ( which configures routing )
 *
 *  @author Neza Melencion
 */

 (function( window, head, site_prefix, base_url ) {
    "use strict";
    
    site_prefix = "/myapp"; // Change this when working on local
    
    base_url = site_prefix + "/test/client/";
    
    head.js(

      // Pre-load these for splash-screen progress bar...
      
      { require    : site_prefix + "/bower_components/requirejs/require.js",                      size: "80196"   },
      { underscore : site_prefix + "/bower_components/underscore/underscore.js",                  size: "43568"   },
      { angular    : site_prefix + "/bower_components/angular/angular.min.js",                        size: "551057"  },
      { ngRoute    : site_prefix + "/bower_components/angular-route/angular-route.min.js",        size: "30052"   },
      { ngSanitize : site_prefix + "/bower_components/angular-sanitize/angular-sanitize.min.js",  size: "19990"   },
      { ngAnimate  : site_prefix + "/bower_components/angular-animate/angular-animate.js",  	    size: "79081"   }

    )
    .ready("ALL", function() {

        require.config (
            {
            appDir  : '',
            baseUrl : base_url + 'src',
            priority: 'angular',
            paths   :
            {
                // Configure alias to full paths
            	'product'         : './app/product',
                'utils'         : './utils'
            },
            shim    :
            {
                'underscore':
                {
                    exports : '_'
                }
            }
        });

        require( [ "product" ], function( app )
        {
            // Application has bootstrapped and started...
        });
        
    });

}( window, head ));
