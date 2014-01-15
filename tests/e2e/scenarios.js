'use strict';

describe('app', function() {

    beforeEach(function() {
        browser().navigateTo('/');
    });

    describe('add', function() {
        beforeEach(function() {
            browser().navigateTo('/#!/add');
            localStorage.clear();
        });

        it('should render new contact page', function() {
            expect(element('h1').text()).toMatch(/New contact/);
        });
        it('should render save contact and render in the table', function() {
            input('contact.name').enter('New');
            input('contact.surname').enter('Surname');
            input('contact.phone').enter('000');
            input('contact.group').enter('Group 1');
            element(':button').click();
            expect(element('tbody:first tr:first td').text()).toMatch(/Group 1/);
            expect(element('tbody:first tr:nth(1) td:first').text()).toMatch(/New/);
            expect(element('tbody:first tr:nth(1) td:nth(1)').text()).toMatch(/Surname/);
            expect(element('tbody:first tr:nth(1) td:nth(2)').text()).toMatch(/000/);
        });
    });

    describe('edit', function() {
        beforeEach(function() {
            browser().navigateTo('/#!/contact/1');
        });

        it('should render edit contact page', function() {
            expect(element('h1').text()).toMatch(/Edit contact/);
        });
        it('should render save contact and render in the table', function() {
            expect(input('contact.name').val()).toEqual('New');
            expect(input('contact.surname').val()).toEqual('Surname');
            expect(input('contact.phone').val()).toEqual('000');
            expect(input('contact.group').val()).toEqual('Group 1');

            input('contact.name').enter('New 2');
            input('contact.surname').enter('Surname 2');
            input('contact.phone').enter('111');
            input('contact.group').enter('Group 2');
            element(':button').click(); //save
            expect(element('tbody:first tr:first td').text()).toMatch(/Group 2/);
            expect(element('tbody:first tr:nth(1) td:first').text()).toMatch(/New 2/);
            expect(element('tbody:first tr:nth(1) td:nth(1)').text()).toMatch(/Surname 2/);
            expect(element('tbody:first tr:nth(1) td:nth(2)').text()).toMatch(/111/);
        });
    });

    describe('list', function() {
        beforeEach(function() {
            browser().navigateTo('/');
        });

        it('should render edit contact page', function() {
            expect(element('h1').text()).toMatch(/List of contacts/);
        });
        it('should render save contact and render in the table', function() {
            expect(element('tbody:first tr:first td').text()).toMatch(/Group 2/);
            expect(element('tbody:first tr:nth(1) td:first').text()).toMatch(/New 2/);
            expect(element('tbody:first tr:nth(1) td:nth(1)').text()).toMatch(/Surname 2/);
            expect(element('tbody:first tr:nth(1) td:nth(2)').text()).toMatch(/111/);

            // founded
            input('filter').enter('N');
            expect(element('tbody:first tr:first td').text()).toMatch(/Group 2/);
            expect(element('tbody:first tr:nth(1) td:first').text()).toMatch(/New 2/);
            expect(element('tbody:first tr:nth(1) td:nth(1)').text()).toMatch(/Surname 2/);
            expect(element('tbody:first tr:nth(1) td:nth(2)').text()).toMatch(/111/);

            // not found
            input('filter').enter('F');
            expect(element('tbody:first tr:first td').text()).toMatch(/No group/);
        });
    });

});