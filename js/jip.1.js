// // the semi-colon before function invocation is a safety net against concatenated 
// // scripts and/or other plugins which may not be closed properly.
// ;(function ( $, window, undefined ) {

//   // undefined is used here as the undefined global variable in ECMAScript 3 is
//   // mutable (ie. it can be changed by someone else). undefined isn't really being
//   // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
//   // can no longer be modified.

//   // window and document are passed through as local variables rather than globals
//   // as this (slightly) quickens the resolution process and can be more efficiently
//   // minified (especially when both are regularly referenced in your plugin).

//   // Create the defaults once
//   var pluginName = 'jip',
      // document = window.document,
      // defaults = {
      //   placeholder: 'http://lorempixel.com/120/120/',  
      //   data: '',  
      //   galleryUrl: '/gallery/' ,
      //   modal_title: 'Select A Image',
      //   btn_text : "Select Image"
//       };


//   // The actual plugin constructor
//   function Plugin( element, options ) {
//     this.element = element;
//     $t = this;
//     // jQuery has an extend method which merges the contents of two or 
//     // more objects, storing the result in the first object. The first object
//     // is generally empty as we don't want to alter the default options for
//     // future instances of the plugin
//     this.options = $.extend( {}, defaults, options) ;

//     this._defaults = defaults;
//     this._name = pluginName;

//     this.init();

//     // var jpWrapper = $(".jip_wrapper")
//     // jpWrapper.eq(jpWrapper.length-1).find(".select_btn").on('click',function(e){
//     //       e.preventDefault();
//     //       var target = $(this).attr('rel');
//     //       console.log(target);
//     //       showModal(target);
//     //       return false;
//     //   });

//   }

//   Plugin.prototype.init = function () {
//     // Place initialization logic here
//     // You already have access to the DOM element and the options via the instance, 
//     // e.g., this.element and this.options
//     $t = $(this.element);
//     $o = this.options;
//     // add layout to each input field.
//         var target = $($t).attr("name");
//        return  addLayout(target, $o);


//       $($t).on('click',function(){
//         alert('fire');
//           showModal(target);
//             return false;
//        });

//   };

//   function addLayout(target, options){

//       var $thisInput = $('input[name="'+target+'"]');
//       var image =  options.placeholder;

//       if($thisInput.val() != ""){
//             image = options.galleryUrl+$thisInput.val();
//       }



//       var layout="";
//       layout += "<div class=\"jip_wrapper\" rel='"+target+"''>";
//       layout += "  <div class=\"jip_preview\">";
//       layout += "    <img src=\""+image+"\" alt=\"Placeholder\">";
//       layout += "  <\/div>";
//       layout += "  <button class=\"select_btn btn\" rel=\""+target+"\">"+options.btn_text+"<\/button>";
//       layout += "  <div class=\"modal hide\">";
//       layout += "    <div class=\"modal-header\">";
//       layout += "      <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;<\/button>";
//       layout += "      <h3>"+options.modal_title+"<\/h3>";
//       layout += "    <\/div>";
//       layout += "    <div class=\"modal-body\">";
//       layout += "      <ul><\/ul>";
//       layout += "    <\/div>";
//       layout += "    <div class=\"modal-footer\">";
//       layout += "      <a href=\"#\" class=\"btn\">Close<\/a>";
//       layout += "      <a href=\"#\" class=\"btn btn-primary\">Save changes<\/a>";
//       layout += "    <\/div>";
//       layout += "  <\/div>";
//       layout += "<\/div>";


//       var $target = $('input[name="'+target+'"]');

//         $target.hide();
//         $target.after(layout);
        
//         return layout;
//   }

//   function showModal(target){
//     console.log(target);
//       $('.jip_wrapper[rel="'+target+'"] .modal').removeClass("hide")
//   }

//   // A really lightweight plugin wrapper around the constructor, 
//   // preventing against multiple instantiations
//   $.fn[pluginName] = function ( options ) {
//     return this.each(function () {
//       if (!$.data(this, 'plugin_' + pluginName)) {
//         $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
//       }
//     });
//   }



// }(jQuery, window));



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
            btn_text : "Select Image"
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
     
        showModal :function(){
            this.getData(function(){
               $(".jip_modal").fadeIn();
            });
            
             return false;
        },

        closeModal : function(){
            $('.jip_modal').fadeOut();
            return false;
        },

        getData : function(callback){
            var opts = this.options;
            var $modal  = $(".jip_modal .modal-body ul");

            $modal.html("");

            $.getJSON(opts.data, function(items){
                      
                      $.each(items, function(i, item){
                        var imgstring = "<li class=\"pickerImage\"><img src=\""+ opts.galleryUrl + item + "\" alt=\"" + item + "\"/></li>"+"\n";
                        $modal.append(imgstring);
                      });
            });

             $modal.append('<div class="clearfix">&nbsp;</div>');

            if (callback && typeof(callback) === "function") {  
                    callback();  
            }  
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
                layout += "  <button class=\"select_btn btn\" rel=\""+target+"\">"+options.btn_text+"<\/button>";  
                layout += "<\/div>";


                var $targetiInput = $('input[name="'+target+'"]');

                   $targetiInput.hide();
                   $targetiInput.after(layout);
            
            addModal(options);
      }

      var addModal = function(options){

              modal = "";
              modal += "  <div class=\"jip_modal modal hide\">";
              modal += "    <div class=\"modal-header\">";
              modal += "      <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;<\/button>";
              modal += "      <h3>"+options.modal_title+"<\/h3>";
              modal += "    <\/div>";
              modal += "    <div class=\"modal-body\">";
              modal += "      <ul><\/ul>";
              modal += "    <\/div>";
              modal += "    <div class=\"modal-footer\">";
              modal += "      <a href=\"#\" class=\"btn close\">Close<\/a>";
              modal += "      <a href=\"#\" class=\"btn btn-primary\">Save changes<\/a>";
              modal += "    <\/div>";
              modal += "  <\/div>";
              
              // only allow one jip_modal to exist in the dom
              if($('.jip_modal').size() == 0){
                $('body').append(modal);
              }
      }

      var selectImg = function( elm , target){
            console.log(elm);
            console.log(target);
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
                $('.jip_wrapper[rel="'+target+'"] .select_btn').on('click',function(){
                    $jip.showModal( target);
                    return false;
                });

                //close button
                $('.jip_modal .close').on("click",function(){
                    $jip.closeModal();
                    return false;
                });

                $('.pickerImage img').on('click',function(){
                  alert("test");
                  console.log(this);
                      selectImg(this, target);
                });
            }
        });
    }

})( jQuery, window, document );