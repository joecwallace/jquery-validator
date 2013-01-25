describe('Validator', function() {

    it ('should validate with no rules', function() {

        var valid = null;

        $('#testForm').validator({
            events: 'submit',
            selector: 'input',
            preventDefault: true,
            done: function(v) {
                valid = v;
            }
        });
        $('#testForm').submit();

        waitsFor(function() {
            return valid !== null;
        });

        runs(function() {
            expect(valid).toEqual(true);
        });

    });

});