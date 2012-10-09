// the semi-colon before function invocation is a safety net against concatenated 
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, undefined ) {

  // undefined is used here as the undefined global variable in ECMAScript 3 is
  // mutable (ie. it can be changed by someone else). undefined isn't really being
  // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
  // can no longer be modified.

  // window and document are passed through as local variables rather than globals
  // as this (slightly) quickens the resolution process and can be more efficiently
  // minified (especially when both are regularly referenced in your plugin).

  // Create the defaults once
  var pluginName = 'jip',
      document = window.document,
      defaults = {
        placeholder: 'http://lorempixel.com/120/120/',  
        data: '',  
        galleryUrl: '/imagepicker/gallery/' ,
        modal_title: 'Select A Image',
        btn_text : "Select Image"
      };

  // The actual plugin constructor
  function Plugin( element, options ) {
    this.element = element;

    // jQuery has an extend method which merges the contents of two or 
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();


    $('.jip_wrapper .select_btn').on('click',function(){
          var target = $(this).attr('rel');
          showModal(target);
          return false;
      });
  }

  Plugin.prototype.init = function () {
    // Place initialization logic here
    // You already have access to the DOM element and the options via the instance, 
    // e.g., this.element and this.options
    $t = $(this.element);
    $o = this.options;

    // add layout to each input field.
      $(this.element).each(function(){
        var target = $(this).attr("name");
        addLayout(target, $o)
      });


  };

  function addLayout(target, options){

      var layout="";
      layout += "<div class=\"jip_wrapper\" rel='"+target+"''>";
      layout += "  <div class=\"jip_preview\">";
      layout += "    <img src=\""+options.placeholder+"\" alt=\"Placeholder\">";
      layout += "  <\/div>";
      layout += "  <button class=\"select_btn btn\" rel=\""+target+"\">"+options.btn_text+"<\/button>";
      layout += "  <div class=\"modal hide\">";
      layout += "    <div class=\"modal-header\">";
      layout += "      <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;<\/button>";
      layout += "      <h3>"+options.modal_title+"<\/h3>";
      layout += "    <\/div>";
      layout += "    <div class=\"modal-body\">";
      layout += "      <ul><\/ul>";
      layout += "    <\/div>";
      layout += "    <div class=\"modal-footer\">";
      layout += "      <a href=\"#\" class=\"btn\">Close<\/a>";
      layout += "      <a href=\"#\" class=\"btn btn-primary\">Save changes<\/a>";
      layout += "    <\/div>";
      layout += "  <\/div>";
      layout += "<\/div>";


      var $target = $('input[name="'+target+'"]')

        $target.hide();
        $target.after(layout);

  }

  function showModal(target){
    console.log(
      $('.jip_wrapper[rel="'+target+'"] .modal').removeClass("hide"));
  }

  // A really lightweight plugin wrapper around the constructor, 
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }
    });
  }

}(jQuery, window));