/**!
 *  moakley
 *  20141101
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

    // shorthand alias for our page variables
    solard = window.solard || {}
    pv = solard.pagevars || {}




    pv.pagename = $('h1').text()

    slash = location.pathname.lastIndexOf('/') + 1

    if(pv.pageurl === undefined) {
        pv.pageurl  = location.pathname                 //  /foo/bar/baz/boink.html
    }

    if(pv.siteurl === undefined) {
        pv.siteurl  = location.pathname.substr(0,slash) //  /foo/bar/baz/
    }


    /*
     *  TOPNAV
     ******************/

     $('#topnav [data-topnav*=' + pv.topnav + ']').addClass('active')


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
     * If the developer set something manually, respect that first.
     * Otherwise, if the filename was found in a leftnav hyperlink, unlink it,
     * or lastly just assume top level and show all.
     */

    $navlink = $( '.sidenav a[href="' + pv.pageurl + '"]' ) // Find an <a> tag that links to us

    if ( pv.sidenavButton ) {
        // did the developer manually set something?
        // (maybe our page is a sub-page of something)
        $navlink = $( '.sidenav a[href$="' + pv.sidenavButton + '"]' )
    } else if ( $navlink.length ) {
        $navlink.removeAttr('href')
    } else {
        $('.sidenav > .nav').removeClass('hide')
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
 *  Init sliders
 */
$(document).ready( function(){

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
