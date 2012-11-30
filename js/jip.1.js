/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
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
            per_page : 10, 
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
     
        showModal :function($elm){

            var target  = $elm.data('target');

            this.getData(function(){
               $('.jip_modal').modal('show').data('target',target);
            });
            
             return false;
        },

        closeModal : function(){
            $('.jip_modal').modal('hide');
            return false;
        },

        getData : function(callback){
                var opts = this.options;
                var paging = this.options.paging;
                var itemsize = 0; 
                var $elm  = $(".jip_modal .modal-body");
                var _this = this ; 
                
                $elm.html("<ul></ul>")

                $.getJSON(opts.data, function(items){      
                          _this.insertImages(items, $elm,  _this.createPaging);
                });

                $elm.append('<div class="clearfix">&nbsp;</div>');  // add clearfix to make sure their are no float issues.

                if (callback && typeof(callback) === "function") {  
                        callback();  
                }  
        },

        insertImages : function(items , $elm , callback){
                var opts = this.options;
                var itemCount = $(items).size();
                var count = 0 
                $elm.html("");

                
                 $.each(items, function(i,item){
                    var imgstring = "<li class=\"pickerImage\"><img src=\""+ opts.galleryUrl + item + "\" alt=\"" + item + "\"/></li>"+"\n";
                    $elm.append(imgstring);
                    count = count + 1 ;
                    if(count == itemCount){
                        if (callback && typeof(callback) === "function") {  
                              callback(opts);  
                        }  
                    }
                });

        },
        createPaging : function(opts){

          var newcontent = "<ul>";


          var perPage =  opts.per_page;
          var count = 1 ; 

      console.log($(".modal-body li").size()  + "  size? "); 


           $(".modal-body li").each(function(){
                        newcontent += $(this).html(); 

                        if(count == opts.per_page){
                             newcontent += "</ul> <ul>";
                             count = 0; 
                        }

                        count = count + 1; 
            });

          newcontent +="</ul>" ;

          newcontent += "<div class=\"clearfix\">&nbsp;</div>";

          $(".jip_modal .modal-body").html(newcontent);

         // create links 
         //          

         var links = '<ul class="pager"><li class="previous"><a href="#">&larr; Previous</a> </li> <li class="next">  <a href="#">Next &rarr;</a> </li></ul>';

          $(".jip_modal .modal-body").append(links);

        }

    };

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

      var addModal = function(options){

              modal   = "";
              modal += "  <div class=\"jip_modal modal hide fade\">";
              modal += "    <div class=\"modal-header\">";
              modal += "      <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;<\/button>";
              modal += "      <h3>"+options.modal_title+"<\/h3>";
              // modal += "      <ul class=\"nav nav-tabs\">";
              // modal += "          <li class=\"active\"><a href=\"#jip_gallery\"  data-toggle=\"tab\">Gallery</a></li>";
              // modal += "          <li><a href=\"#jip_upload\" data-toggle=\"tab\">Upload</a></li>";
              // modal += "      </ul>";
              modal += "    <\/div>";
              modal += "    <div class=\"modal-body\">";
              // modal += "        <div class=\"tab-content\">";
              modal += "               <div class=\"tab-pane active\" id=\"jip_gallery\"><ul><\/ul></div>";
              // modal += "               <div class=\"tab-pane\" id=\"jip_upload\">coming soon.. </div>";
              // modal += "         </div>";
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

      var selectImg = function( $elm , target){
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
                    e.preventDefault();
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

            }
        });


    }

})( jQuery, window, document );