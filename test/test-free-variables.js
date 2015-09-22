const babel = require('babel');
const mocha = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');

const freeVariables = require('../src/free-variables');


describe('freeVariables', function() {
    const examples = {
        '<I18N>{foo}</I18N>': ['foo'],
        '<I18N><span foo={bar}>{foo}</span></I18N>': ['foo', 'bar']
    };

    Object.entries(examples).forEach(([src, expectedVariables]) => {
        it(`in ${src}`, function() {
            const expression = babel.parse(src).body[0].expression;
            const variables = freeVariables.freeVariablesInMessage(expression);
            expect(variables).to.have.members(expectedVariables);
        });
    });
});