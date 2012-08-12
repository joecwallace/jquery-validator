# jQuery Validator

I wrote this to be a Laravel bundle, so the installation instructions will approach it from that angle; however, the only real dependency is jQuery, so it should be easy to use in any context.

## Installation

Clone this repo into your bundles directory or:

```
php artisan bundle:install jquery-validator
```

Now edit your ```application/bundles.php```:

```
<?php

return array(
    // Other bundles and whizbangs...
    'jquery-validator',
);
```

Next, you'll have to publish the bundle's assets:

```
php artisan bundle:publish
```

## Usage

You can probably guess that **jquery-validator** depends on jQuery, so at some point, you'll do something like this:

```
{{ HTML::script('https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js') }}
{{ HTML::script('bundles/jquery-validator/validator.js') }}
```

### HTML Markup

```
<form id="myForm" method="POST" action="submit.php">
  <input name="username" type="text" data-validations="required|alpha_dash" />
  <input name="email" type="text" data-validations="email" />
  <input name="password" type="password" data-validations="required|confirmed" />
  <input name="password_confirmation" type="password" />
  <!-- more selects, textareas, etc. -->
  <input name="picture" type="file" data-validations="image" />
  <input name="submit" type="submit" value="Submit" />
</form>
```

Notice the ```data-validations``` attributes. They are just like the [Laravel validation rules](http://laravel.com/docs/validation#validation-rules).

Handy. Right? This is a trivial example, but it should be enough to get you started.

### JavaScript

So, let's say you want to validate the entire form before "on submit":

```
$(document).ready(function() {
    $('#myForm').validator({
      events   : 'submit',
      selector : 'input[type!=submit], select, textarea',
      callback : function( elem, valid ) {
          if ( ! valid ) {
              $( elem ).addClass('error');
          }
      }
    });
});
```

The callback provided is called for each input/select/textarea on which validation is attempted, so the ```elem``` in the callback above is the input/select/textarea that contains invalid data - not the parent form.

Want the parent form instead? Use the 'done' callback instead of (or in addition to) the, um..., 'callback' callback.

```
$(document).ready(function() {
    $('#myForm').validator({
      events   : 'submit',
      selector : 'input[type!=submit], select, textarea',
      done     : function( valid ) {
          if ( ! valid ) {
              $( elem ).addClass('error');
          }
      }
    });
});
```

But the code above may be bad because the form submits even if the data is invalid. Let's stop the form submission:

```
$(document).ready(function() {
    $('#myForm').validator({
      events         : 'submit',
      selector       : 'input[type!=submit], select, textarea',
      preventDefault : true,
      callback       : function( elem, valid ) {
          if ( ! valid ) {
              $( elem ).addClass( 'error' );
          }
      }
    });
});
```

Better. But what if you only want to stop the form's submission when invalid data is present?

```
$(document).ready(function() {
    $('#myForm').validator({
      events                  : 'submit',
      selector                : 'input[type!=submit], select, textarea',
      preventDefaultIfInvalid : true,
      callback                : function( elem, valid ) {
          if ( ! valid ) {
              $( elem ).addClass( 'error' );
          }
      }
    });
});
```

Cool. Now, instead of validating the entire form at once, let's do each input.

```
$(document).ready(function() {
    $('input').validator({
      events   : 'blur change',
      callback : function( elem, valid ) {
          if ( valid ) {
              $( elem ).addClass( 'error' );
          }
          else {
              $( elem ).addClass( 'success' );
          }
      }
    });
});
```

Nice. That's pretty much it. Please enjoy and let me know if you see any bad behavior.

## Known issues

- The validation rules ```unique``` and ```exists``` will always be valid. The JavaScript in this bundle can't see into your DB, obviously.
- The ```active_url``` rule returns the result of the ```url``` rule. There's not a good, easy way to check that the URL is active.
