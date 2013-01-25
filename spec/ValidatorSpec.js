function formatDate(d) {
    if (d.constructor == Number) {
        d = new Date(d);
    }

    return (d.getYear() + 1900) + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

describe('Validator', function() {

    var testForm, testFormHtml,
        checkboxInput, textInput, confirmationInput, passwordInput,
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
        confirmationInput = $('[name=textInput_confirmation]', testForm);
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

    it ('should allow custom attributes for validations', function() {

        var elem = null,
            elemValid = null,
            formValid = null;

        textInput.data('custom', 'required');
        textInput.val('any');

        testForm.validator($.extend({
            validationAttribute: 'custom',
            callback: function(e, v) {
                elem = e;
                elemValid = v;
            },
            done: function(v) {
                formValid = v;
            }
        }, defaultOptions)).submit();

        waitsFor(function() {
            return formValid !== null;
        });

        runs(function() {
            expect($(elem).attr('name')).toEqual(textInput.attr('name'));
            expect(elemValid).toEqual(true);
            expect(formValid).toEqual(true);
        });

    });

    it ('should allow multiple instances', function() {

        var warningsValid = null,
            errorsValid = null;

        textInput.data('warnings', 'email').data('errors', 'required').val('not an email');

        testForm.validator($.extend({
            validationAttribute: 'warnings',
            done: function(v) {
                warningsValid = v;
            }
        }, defaultOptions))
        .validator($.extend({
            validationAttribute: 'errors',
            done: function(v) {
                errorsValid = v;
            }
        }, defaultOptions)).submit();

        waitsFor(function() {
            return warningsValid !== null &&
                errorsValid !== null;
        });

        runs(function() {
            expect(warningsValid).toEqual(false);
            expect(errorsValid).toEqual(true);
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

    describe('for the alpha rule', function() {

        it ('should pass for alphabetical characters only', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            textInput.data('validations', 'alpha')
                .val('AbCdEfGhIjKlMnOpQrStUvWxYz');

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
                return elemValid !== null &&
                    formValid !== null;
            });

            runs(function() {
                expect($(elem).attr('name')).toEqual(textInput.attr('name'));
                expect(elemValid).toEqual(true);
                expect(formValid).toEqual(true);
            });

        });

        it ('should fail for non-alphabetical characters', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            textInput.data('validations', 'alpha')
                .val('AbCdEfGhIjKlMn2OpQrStUvWxYz');

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
                return elemValid !== null &&
                    formValid !== null;
            });

            runs(function() {
                expect($(elem).attr('name')).toEqual(textInput.attr('name'));
                expect(elemValid).toEqual(false);
                expect(formValid).toEqual(false);
            });

        });

    });

    describe('for the alpha_dash rule', function() {

        it ('should pass for alphanumeric characters, dashes, and underscores only', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            textInput.data('validations', 'alpha_dash')
                .val('AbCdEfGhIjKlMnOpQrStUvWxYz0123456789-_');

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
                return elemValid !== null &&
                    formValid !== null;
            });

            runs(function() {
                expect($(elem).attr('name')).toEqual(textInput.attr('name'));
                expect(elemValid).toEqual(true);
                expect(formValid).toEqual(true);
            });

        });

        it ('should fail for other characters', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            textInput.data('validations', 'alpha_dash')
                .val('AbCdEfGhIjKlMn OpQrStUvWxYz0123456789-_');

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
                return elemValid !== null &&
                    formValid !== null;
            });

            runs(function() {
                expect($(elem).attr('name')).toEqual(textInput.attr('name'));
                expect(elemValid).toEqual(false);
                expect(formValid).toEqual(false);
            });

        });

    });

    describe('for the alpha_num rule', function() {

        it ('should pass for alphanumeric characters only', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            textInput.data('validations', 'alpha_num')
                .val('AbCdEfGhIjKlMnOpQrStUvWxYz0123456789');

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
                return elemValid !== null &&
                    formValid !== null;
            });

            runs(function() {
                expect($(elem).attr('name')).toEqual(textInput.attr('name'));
                expect(elemValid).toEqual(true);
                expect(formValid).toEqual(true);
            });

        });

        it ('should fail for other characters', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            textInput.data('validations', 'alpha_num')
                .val('AbCdEfGhIjKlMn-OpQrStUvWxYz0123456789');

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
                return elemValid !== null &&
                    formValid !== null;
            });

            runs(function() {
                expect($(elem).attr('name')).toEqual(textInput.attr('name'));
                expect(elemValid).toEqual(false);
                expect(formValid).toEqual(false);
            });

        });

    });

    describe('for the before rule', function() {

        it ('should fail for tomorrow\'s date', function() {

            var elem = null,
                elemValid = null,
                formValid = null,
                now = new Date;

            textInput.data('validations', 'before:' + formatDate(now));
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
                expect(elemValid).toEqual(false);
                expect(formValid).toEqual(false);
            });

        });

        it ('should fail for today\'s date', function() {

            var elem = null,
                elemValid = null,
                formValid = null,
                now = new Date;

            textInput.data('validations', 'before:' + formatDate(now));
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

        it ('should pass for yesterday\'s date', function() {

            var elem = null,
                elemValid = null,
                formValid = null,
                now = new Date;

            textInput.data('validations', 'before:' + formatDate(now));
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
                expect(elemValid).toEqual(true);
                expect(formValid).toEqual(true);
            });

        });

    });

    describe('for the between rule', function() {

        it ('should pass for a value between the terms', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            textInput.data('validations', 'between:9,10')
                .val('9.5');

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

        it ('should pass for values equal to the terms', function() {

            var elemsValid = [],
                formValid = null;

            textInput.data('validations', 'between:9,10')
                .val('9.000000');
            passwordInput.data('validations', 'between:9,10')
                .val('10.000000');

            testForm.validator($.extend({
                callback: function(e, v) {
                    elemsValid.push(v);
                },
                done: function(v) {
                    formValid = v;
                }
            }, defaultOptions)).submit();

            waitsFor(function() {
                return formValid !== null;
            });

            runs(function() {
                expect(elemsValid).not.toContain(false);
                expect(formValid).toEqual(true);
            });

        });

        it ('should fail for values outside of the terms', function() {

            var elemsValid = [],
                formValid = null;

            textInput.data('validations', 'between:9,10')
                .val('8.999999');
            passwordInput.data('validations', 'between:9,10')
                .val('10.000001');

            testForm.validator($.extend({
                callback: function(e, v) {
                    elemsValid.push(v);
                },
                done: function(v) {
                    formValid = v;
                }
            }, defaultOptions)).submit();

            waitsFor(function() {
                return formValid !== null;
            });

            runs(function() {
                expect(elemsValid).not.toContain(true);
                expect(formValid).toEqual(false);
            });

        });

    });

    describe('for the confirmed rule', function() {

        it ('should pass for identical values', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            textInput.data('validations', 'confirmed')
                .val('Confirm me!');
            confirmationInput.val('Confirm me!');

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

        it ('should fail for different values', function() {

            var elem = null,
                elemValid = null,
                formValid = null;

            textInput.data('validations', 'confirmed')
                .val('Confirm me!');
            confirmationInput.val('Different!');

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