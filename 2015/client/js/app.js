/**
 * 2015-specific scripts go here
 */



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



/**
 * Handle footer sponsor logos
 */
$('.footer-sponsors-global').hide()
$('.footer-sponsors-2015').removeClass('hide')

/**
 * Load News RSS feed
 */
 $(document).ready(function(e) {

    $('#news').rss(
        'http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&q=%22solar+decathlon%22&cf=all&scoring=h&output=rss',
        {
             limit: 10,
             outputMode: 'json', // valid values: 'json', 'json_xml'
             layoutTemplate: '<div class="feed-container">{entries}</div>',
             entryTemplate: ''+
                     '<h2 class="title">{title}</h2>'+
                     '<h3>{origin}</h3>'+
                     '<h4 class="date">{prettydate}</h4>'+
                     '<p>{shortBodyPlain} <a href="{url}">More</a></p>',
             tokens: {
                 title: function(entry, tokens) {
                     return entry.title.split(" - ")[0];
                 },

                 origin: function(entry, tokens) {
                     return entry.title.split(" - ")[1];
                 },

                 prettydate: function(entry, tokens){

                     var uglydate = new Date(entry.publishedDate);
                     var monthArray = ['January','February','March','April','May','June','July','August','September','October','November','December'];

                     var d = uglydate.getDate();
                     var m = monthArray[ uglydate.getMonth() ];
                     var y = uglydate.getFullYear();

                     return m +' '+ d + ', ' + y;
                 }
             },
             success: function(entry){
                $('.ajax-loading-msg').fadeOut('slow');
             }

        }
    )
})
