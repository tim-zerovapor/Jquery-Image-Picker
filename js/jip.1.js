/**
 *  Jquery Image Picker
 *  Version 2.0 
 *  Author : Tim Smith  tim@thinklikearobot.com
 *   Licensed under the MIT License
 *   Jquery  Boilerplate Authored by @ajpiano
 */


/**
 * This is a complete rewrite of the orginal  Jquery image picker .
 * Everythign has been refactored and is now more stable. 
 */


// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'jip',
        defaults = {
            placeholder: 'http://lorempixel.com/120/120/',  
            data: '',  
            galleryUrl: '/gallery/' ,
            modal_title: 'Select A Image',
            save_btn_text : "Select Image",
            btn_text : "Select Image",
            paging : true,
            per_page : 10 
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
          

    }

    Plugin.prototype = {
        
        init: function() {
                // Place initialization logic here
                // You already have access to the DOM element and
                // the options via the instance, e.g. this.element
                // and this.options
                // you can add more functions like the one below and 
                // call them like so: this.yourOtherFunction(this.element, this.options).
                addLayout(this.element, this.options);     
        }, 
        
        /**
         * moves the modal onto the screen
         * @param  {object} $elm Modal we want to show
         */
        showModal :function($elm){

                var target  = $elm.data('target');

                this.getData(function(){
                   $('.jip_modal').modal('show').data('target',target);
                });
                
                 return false;
        },

        /**
         * Closes our modal when it is open
         */
        closeModal : function(){
                $('.jip_modal').modal('hide');
                return false;
        },

        /**
         * Uses the predefined url to get data from a server side call. Expects a non-nested JSON object 
         * @param  {Function} callback [description]
         * @return {null}            Does not return anything.
         */
        getData : function(callback){
                var opts = this.options;
                var paging = this.options.paging;
                var itemsize = 0; 
                var $elm  = $(".jip_modal .modal-body");
                var _this = this ; 
                
                $elm.html("<ul></ul>")

                $.getJSON(opts.data, function(items){       

                        if(items && typeof(items) == "object"){
                          _this.insertImages(items, $elm,  _this.createPaging);
                        }
                });

                $elm.append('<div class="clearfix">&nbsp;</div>');  // add clearfix to make sure their are no float issues.

                if (callback && typeof(callback) === "function") {  
                        callback();  
                }  
        },

        /**
         *  parses our json object and then inserts thoes images into our dom.
         * @param  {obj}   items    JSON object cotaing our images {'image.jpg','image2.jpg'}
         * @param  {obj}   $elm     This it the element we are going to insert 
         * @param  {function} callback  Just incase we need a callback function after images are inserted.
         * @return { null }            return nothing. 
         */
        insertImages : function(items , $elm , callback){
                var opts = this.options;
                var itemCount = $(items).size();
                var count = 0 
                $elm.find("ul").html("");

                
                 $.each(items, function(i,item){
                    var imgstring = "<li class=\"pickerImage\"><img src=\""+ opts.galleryUrl + item + "\" alt=\"" + item + "\"/></li>"+"\n";
                    $elm.find("ul").append(imgstring);
                    count = count + 1 ;
                    if(count == itemCount){
                        if (callback && typeof(callback) === "function") {  
                              callback(opts);  
                        }  
                    }
                });
                 $(".jip_modal .modal-body ul:eq(0)").css('display','block');

        },

        /**
         * If set to true creating paging for our modal. 
         * @param  {object} opts default options defined by the plugin
         * @return {null}      nothing is returned
         */
        createPaging : function(opts){

                if(!opts.paging){
                  return;
                }

                var newcontent = "<ul class=\"page\">";
                var perPage =  opts.per_page;
                var count = 1 ; 

                 $(".modal-body li").each(function(){
                             
                             newcontent +=   "<li class=\"pickerImage\">" + $(this).html() + "</li>"; 

                             if(count == opts.per_page){
                                   newcontent += "</ul> <ul class=\"page\">";
                                   count = 0; 
                             }

                             count = count + 1; 
                  });

                newcontent +="</ul>" ;

                newcontent += "<div class=\"clearfix\">&nbsp;</div>";

                $(".jip_modal .modal-body").html(newcontent);
     

               var links = '<ul class="pager"><li class="previous disabled"><a href="#">&larr; Previous</a> </li> <li class="next">  <a href="#">Next &rarr;</a> </li></ul>';

                $(".jip_modal .modal-body").append(links);

                $(".jip_modal .modal-body ul:eq(0)").css('display','block');

        },

        /**
         * Listener for page change. Calculates current page and then transitions to the next page. 
         * @param  {string} direction You can change the page "up "(+1) or "down "(-1) 
         * @return {null}           Returns nothing
         */
        changePage : function(direction){
                var elm =  $(".modal-body");
                var min = 0 ;
                var max = elm.find('.page').size() - 1;
                if( typeof currentPage == 'undefined'){
                  currentPage = 0 ; 
                  }

                  

                  if(direction == "up"){
                    currentPage = currentPage + 1 ;
                  }
                  else if(direction == "down"){
                    currentPage = currentPage - 1; 
                  } 

                  elm.find('.disabled').removeClass("disabled");

                  if( currentPage <= min ){
                      currentPage = min; 
                      elm.find(" .previous").addClass("disabled");
                  }
                  if(currentPage >= max ){
                    currentPage =max; 
                     elm.find(" .next ").addClass("disabled");
                  }

                  elm.find('.page').hide();
                  elm.find(".page:eq(" + currentPage + ")").fadeIn();

        }

    };

      /**
       * adds jip layout to each input its request for.
       * @param {object} el      This is the targeted element
       * @param {object} options Default options for this element
       */
      var addLayout = function(el,options){
            var target = $(el).attr('name');
            var inputval = $(el).val();
            var image = options.placeholder

                if( inputval != ""){
                      image = options.galleryUrl+inputval;
                }

                var layout="";
                layout += "<div class=\"jip_wrapper\" rel='"+target+"''>";
                layout += "  <div class=\"jip_preview\">";
                layout += "    <img src=\""+image+"\" alt=\"Placeholder\">";
                layout += "  <\/div>";
                layout += "  <button   data-target=\""+target+"\" href=\"#myModal\" role=\"button\" class=\"btn select_btn\" data-toggle=\"modal\">"+options.btn_text+"<\/button>";  
                layout += "<\/div>";

                $(layout).data("target", target);

                var $targetiInput = $('input[name="'+target+'"]');

                   $targetiInput.hide();
                   $targetiInput.after(layout);
            
            addModal(options);
      }

      /**
       * Adds the modal to the bottom of the page
       * @param {obj} options 
       */
      var addModal = function(options){

              modal   = "";
              modal += "  <div class=\"jip_modal modal hide fade\">";
              modal += "    <div class=\"modal-header\">";
              modal += "      <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;<\/button>";
              modal += "      <h3>"+options.modal_title+"<\/h3>";
              modal += "    <\/div>";
              modal += "    <div class=\"modal-body\">";
              modal += "               <div class=\"tab-pane active\" id=\"jip_gallery\"><ul><\/ul></div>";
              modal += "    <\/div>";
              modal += "    <div class=\"modal-footer\">";
              modal += "      <a href=\"#\" class=\"btn close\" data-dismiss=\"modal\">Close<\/a>";
              modal += "      <a href=\"#\" class=\"jip_save btn btn-primary\">"+options.save_btn_text+"<\/a>";
              modal += "    <\/div>";
              modal += "  <\/div>";
              
              // only allow one jip_modal to exist in the dom
              if($('.jip_modal').size() == 0){
                $('body').append(modal);
              }
      }

 /**
  * [selectImg description]
  * @param  {[type]} $elm [description]
  * @return {[type]}      [description]
  */
      var selectImg = function( $elm){
             $('.jip_modal .pickerImage .active').removeClass('active');
             $elm.addClass("active");
      }

      var setImg = function(){
          var target = $('.jip_modal').data('target');
          var imgsrc =  $('.jip_modal .pickerImage .active').attr('src');

          $("input[name='"+target+"']").val(imgsrc);

          $('.jip_wrapper[rel="'+target+'"] .jip_preview  img').attr('src', imgsrc);

          $jip.closeModal();

          return false;
      }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                $jip = new  Plugin( this, options ));

                var target = $(this).attr('name');

                // onclick for select image button
                $('.jip_wrapper[rel="'+target+'"] .select_btn').on('click',function(e){
                 
                    $jip.showModal($(this));
                   
                });

                $('.jip_modal').modal({ show:false});

                
                // selecting a image in modal 
                $('.jip_modal .pickerImage img').live('click',function(e){
                  e.preventDefault(); 
                      selectImg($(this), target);
                });

                $(".jip_save").on('click', function(e){
                    e.preventDefault(); 
                    setImg();
                });

                $(".jip_modal .modal-body .pager .previous:not(.disabled)").die('click').live('click' , function(e){
                      e.preventDefault(); 
                      $jip.changePage("down");
                    });


                $(".jip_modal .modal-body .pager .next:not(.disabled)").die('click').live('click',function(e){
                  e.preventDefault(); 
                    $jip.changePage("up");
                });

            }
        });


    }

})( jQuery, window, document );