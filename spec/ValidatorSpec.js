describe('Validator', function() {

    var testForm, testFormHtml,
        checkboxInput, textInput, passwordInput,
        defaultOptions = {
            events: 'submit',
            selector: 'input',
            preventDefault: true
        };

    beforeEach(function() {
        testForm = $('#testForm');
        testFormHtml = testForm.html();

        checkboxInput = $('[name=checkboxInput]', testForm);
        textInput = $('[name=textInput]', testForm);
        passwordInput = $('[name=passwordInput]', testForm);
    });

    afterEach(function() {
        testForm.validator('destroy');
        testForm.html(testFormHtml);
    });

    it ('should validate with no rules', function() {

        var valid = null;

        testForm.validator($.extend({
            done: function(v) {
                valid = v;
            }
        }, defaultOptions)).submit();

        waitsFor(function() {
            return valid !== null;
        });

        runs(function() {
            expect(valid).toEqual(true);
        });

    });

    describe('for the ACCEPTED rule', function() {

        it ('should pass a checked checkbox', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            checkboxInput.data('validations', 'accepted');
            checkboxInput.prop('checked', true);

            testForm.validator($.extend({
                callback: function(e, v) {
                    elem = e;
                    elemValid = v;
                },
                done: function(v) {
                    formValid = v;
                }
            }, defaultOptions)).submit();

            waitsFor(function() {
                return elem !== null &&
                    formValid !== null;
            });

            runs(function() {
                expect($(elem).attr('name')).toEqual(checkboxInput.attr('name'));
                expect(elemValid).toEqual(true);
                expect(formValid).toEqual(true);
            });
        
        });

        it ('should fail an unchecked checkbox input', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            checkboxInput.data('validations', 'accepted');
            checkboxInput.prop('checked', false);

            testForm.validator($.extend({
                callback: function(e, v) {
                    elem = e;
                    elemValid = v;
                },
                done: function(v) {
                    formValid = v;
                }
            }, defaultOptions)).submit();

            waitsFor(function() {
                return elem !== null &&
                    formValid !== null;
            });

            runs(function() {
                expect($(elem).attr('name')).toEqual(checkboxInput.attr('name'));
                expect(elemValid).toEqual(false);
                expect(formValid).toEqual(false);
            });
        
        });

        it ('should pass "1" in a text input', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            textInput.data('validations', 'accepted');
            textInput.val('1');

            testForm.validator($.extend({
                callback: function(e, v) {
                    elem = e;
                    elemValid = v;
                },
                done: function(v) {
                    formValid = v;
                }
            }, defaultOptions)).submit();

            waitsFor(function() {
                return elem !== null &&
                    formValid !== null;
            });

            runs(function() {
                expect($(elem).attr('name')).toEqual(textInput.attr('name'));
                expect(elemValid).toEqual(true);
                expect(formValid).toEqual(true);
            });

        });

        it ('should pass "yes" in a text input', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            textInput.data('validations', 'accepted');
            textInput.val('yes');

            testForm.validator($.extend({
                callback: function(e, v) {
                    elem = e;
                    elemValid = v;
                },
                done: function(v) {
                    formValid = v;
                }
            }, defaultOptions)).submit();

            waitsFor(function() {
                return elem !== null &&
                    formValid !== null;
            });

            runs(function() {
                expect($(elem).attr('name')).toEqual(textInput.attr('name'));
                expect(elemValid).toEqual(true);
                expect(formValid).toEqual(true);
            });

        });

        it ('should fail an empty text input', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            textInput.data('validations', 'accepted');
            textInput.val('');

            testForm.validator($.extend({
                callback: function(e, v) {
                    elem = e;
                    elemValid = v;
                },
                done: function(v) {
                    formValid = v;
                }
            }, defaultOptions)).submit();

            waitsFor(function() {
                return elem !== null &&
                    formValid !== null;
            });

            runs(function() {
                expect($(elem).attr('name')).toEqual(textInput.attr('name'));
                expect(elemValid).toEqual(false);
                expect(formValid).toEqual(false);
            });

        });

        it ('should fail non-1/non-yes in a text input', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            textInput.data('validations', 'accepted');
            textInput.val('magic');

            testForm.validator($.extend({
                callback: function(e, v) {
                    elem = e;
                    elemValid = v;
                },
                done: function(v) {
                    formValid = v;
                }
            }, defaultOptions)).submit();

            waitsFor(function() {
                return elem !== null &&
                    formValid !== null;
            });

            runs(function() {
                expect($(elem).attr('name')).toEqual(textInput.attr('name'));
                expect(elemValid).toEqual(false);
                expect(formValid).toEqual(false);
            });

        });

    });

});