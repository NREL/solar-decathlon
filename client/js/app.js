/**!
 *  moakley
 *  20150801
 *  Global actions to take on all solardecathlon.gov pages
 *  Set breadcrumbs
 *  side navigation
 *  top nav
 *  Label icons
 *  Init sliders
 *  crazy egg
 *  todo: encapsulate all this.
 */

'use strict';

$(document).ready(function(){

    var $navlink
      , $navitem
      , slash
      , solard
      , pv
      , isHomePage = false
      //, homepages = ['/','index.html','index.cfm','index.php']

    // shorthand alias for our page variables
    solard = window.solard || {};
    pv = solard.pagevars || {};




    pv.pagename = $('h1').text();

    slash = location.pathname.lastIndexOf('/') + 1;

    if (pv.pageurl === undefined) {
        pv.pageurl  = location.pathname;                 //  /foo/bar/baz/boink.html or /foo/ if foo home page
    }

    if (pv.siteurl === undefined) {
        pv.siteurl  = location.pathname.substr(0,slash); //  /foo/bar/baz/
    }

    if ( pv.pageurl === pv.siteurl || pv.pageurl.match(/index\./) || pv.pageurl.match(/\/$/) ) {
        isHomePage = true
    }

    /*
     *  TOPNAV
     ******************/

     $('.topnav [data-topnav*=' + pv.topnav + ']').addClass('active')


    /*
     *  BREADCRUMBS
     ******************/

    // build the 2nd breadcrumb
    if( pv.sitename ) {
        $( '.breadcrumb' ).append( '<li><a class="bc-siteurl" href="' + pv.siteurl + '"><span class="bc-sitename">' + pv.sitename  + '</span></a></li>')
    }

    // build the 3rd (last) breadcrumb
    if( pv.pagename && pv.breadcrumbs !== false  ) {
        $( '.breadcrumb' ).append( '<li><span class="bc-pagename">' + pv.pagename + '</span></li>' )
    }


    // show the breadcrumbs, except on pages without H1s (such as home pages)
    if( pv.pagename.length ) {
        $( '.breadcrumb' ).removeClass( 'invisible' )
    }





    /*
     * LEFTNAV
     ******************/

    /*
     * Home pages aren't in the nav. Show the top level.
     *
     * If the developer set `sidenav`, show the menu.
     * (this is usually the case for landing pages that aren't listed in the nav)
     *
     * If the developer set `sidenavButton` manually, respect that.
     * (this is usually the case for sub buttons that aren't listed in the nav)
     *
     * If the filename was found in a leftnav hyperlink, unlink it and show the upstream menus.
     *
     */


    if ( isHomePage) {

        $('.sidenav').children('.nav').removeClass('hide')

    }

    if ( pv.sidenav ) {

        $('.sidenav [data-sidenav=' + pv.sidenav + ']').removeClass('hide')

    }


    $navlink = $( '.sidenav a[href="' + pv.pageurl + '"]' ) // Find an <a> tag that links to us

    if ( pv.sidenavButton ) {

        // Accept sidenavButton vals like /mysite/mypage.html and mypage.html
        // If it's just mypage.html, prepend the siteurl
        pv.sidenavButton = pv.sidenavButton.substr(0) !== '/'
          ? pv.siteurl + pv.sidenavButton
          : pv.sidenavButton


        $navlink = $( '.sidenav a[href="' + pv.sidenavButton + '"]' )

    } else {

        $navlink.removeAttr('href')

    }

    $navitem = $navlink.parent() // grab the <li>
    $navitem.addClass('active') // Activate the button
    $navitem.children('.nav').removeClass('hide') // show any immediate downstream menus
    $navitem.parentsUntil('.sidenav', '.hide').removeClass('hide') // show any hidden menus upstream as needed






})




/*
 *  Label icons
 */
$(document).ready(function(){

    $('body').iconomatic({
        ajax     :  true
      , dataMode :  true
    })

})


/*
 *  Teams pages slideshow
 *  Fetch images from the Flickr API and init two Flexsliders
 *
 */
$(document).ready(function(){

    $('.flex-carousel .slides').jflickrrest(
        {
            imageSize: 'medium'
          , qstrings: {
                api_key: '95b77c681e3659934f3c38485febc19e'
              , photoset_id: $('.flickr-photoviewer').data('flickrset')
            }
          , photoCallback: function(){
                console.log(this)
                $(this).children('img').each( function( idx, el  ){
                    $(el).wrap( '<li />' );
                })
            }


        }
      , function(data){

            $(this).children().clone().appendTo('.flex-slider .slides')

            setTimeout( function(){ // hackery to compensate for flexslider setting viewport to 0 height

                $('.flex-carousel').flexslider({
                    animation: 'slide'
                  , animationLoop: false
                  , asNavFor: '.flex-slider'
                  , controlNav: false
                  , itemMargin: 5
                  , itemWidth: 210
                  , maxItems: 4
                  , minItems: 2
                  , slideshowSpeed:4000
                })

                $('.flex-slider').flexslider({
                    animation: 'slide'
                  , animationLoop: false
                  , controlNav: false
                  , slideshow: true
                  , slideshowSpeed:4000
                  , smoothHeight: true
                  , sync: '.flex-carousel'
                })

            }, 500)

        }
    )
})


/*
 * HP Flickr slideshow
 */
$(window).ready(function(){

    $('.hp-flex-slider .slides').jflickrrest(
        {
            imageSize: 'medium'
          , qstrings: {
                api_key: '95b77c681e3659934f3c38485febc19e'
              , photoset_id: '72157624071391333'
            }
          , photoCallback: function(){
                $('.' + this.className + ' > img').each( function( idx, el  ){
                    $(el).wrap( '<li></li>' );
                })
            }
        }
      , function(){
            setTimeout( function(){ // hackery to compensate for flexslider setting viewport to 0 height
                $('.hp-flex-slider').flexslider({
                    animation: 'slide'
                  , animationLoop: true
                  , controlNav: false
                  , slideshow: true
                  , slideshowSpeed:3500
                  , smoothHeight: true
                  , initDelay: 300
                })
            }, 500)
        }
    )

})

/*
 *  Crazy Egg
 */
setTimeout(function(){
    var a=document.createElement('script');
    var b=document.getElementsByTagName('script')[0];
    a.src=document.location.protocol+"//dnn506yrbagrg.cloudfront.net/pages/scripts/0011/5883.js?"+Math.floor(new Date().getTime()/3600000);
    a.async=true;
    a.type="text/javascript";
    b.parentNode.insertBefore(a,b)
}, 1)
