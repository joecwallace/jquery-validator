function formatDate(d) {
    if (d.constructor == Number) {
        d = new Date(d);
    }

    return (d.getYear() + 1900) + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

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

    describe('for the accepted rule', function() {

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

    describe('for the active_url rule', function() {

        it ('should pass a valid URL', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            textInput.data('validations', 'active_url');
            textInput.val('ftp://sub.domain.com/url/params?get=params&are=magic');

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

        it ('should fail an invalid URL', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            textInput.data('validations', 'active_url');
            textInput.val('ftp:/a/sub.domain.com/url/params?get=params&are=magic');

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

        it ('does not actually test that a URL is active', function() {});

    });

    describe('for the after rule', function() {

        it ('should pass for tomorrow\'s date', function() {

            var elem = null,
                elemValid = null,
                formValid = null,
                now = new Date;

            textInput.data('validations', 'after:' + formatDate(now));
            textInput.val(formatDate(now.setDate(now.getDate() + 1)));

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

        it ('should fail for today\'s date', function() {

            var elem = null,
                elemValid = null,
                formValid = null,
                now = new Date;

            textInput.data('validations', 'after:' + formatDate(now));
            textInput.val(formatDate(now));

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

        it ('should fail for yesterday\'s date', function() {

            var elem = null,
                elemValid = null,
                formValid = null,
                now = new Date;

            textInput.data('validations', 'after:' + formatDate(now));
            textInput.val(formatDate(now.setDate(now.getDate() - 1)));

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