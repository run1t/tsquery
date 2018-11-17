// Test Utilities:
import { expect } from './index';

// Dependencies:
import { nestedFunctions } from './fixtures';

// Under test:
import { FunctionDeclaration, SyntaxKind  } from 'typescript';
import { tsquery } from '../src/index';

describe('tsquery:', () => {
    describe('tsquery - :root:', () => {
        it('Should find the first function', () => {
            const ast = tsquery.ast(nestedFunctions);
            const result = tsquery(ast, ':root > FunctionDeclaration');
            expect(result.length).to.equal(1);
            expect(result[0].kind).to.equal(SyntaxKind.FunctionDeclaration);
            const name = (result[0] as FunctionDeclaration).name;
            expect(name).to.not.equal(null);
            expect(name).to.not.equal(undefined);
            if (name) {
                expect(name.text).to.eq('a');
            }
        });

        it('Should find the first function of root level from a child', () => {
            const ast = tsquery.ast(nestedFunctions);
            // We need to move into a child of root
            const child = tsquery(ast, 'Block')[0];
            const result = tsquery(child, ':root > FunctionDeclaration');
            expect(result.length).to.equal(1);
            expect(result[0].kind).to.equal(SyntaxKind.FunctionDeclaration);
            const name = (result[0] as FunctionDeclaration).name;
            expect(name).to.not.equal(null);
            expect(name).to.not.equal(undefined);
            if (name) {
                expect(name.text).to.eq('a');
            }
        });

        it('Should find all the function inside root level from a child', () => {
            const ast = tsquery.ast(nestedFunctions);
            // We need to move into a child of root
            const child = tsquery(ast, 'Block')[0];
            const result = tsquery(child, ':root FunctionDeclaration');
            expect(result.length).to.equal(2);
            expect(result[0].kind).to.equal(SyntaxKind.FunctionDeclaration);
            const nameA = (result[0] as FunctionDeclaration).name;
            expect(nameA).to.not.equal(null);
            expect(nameA).to.not.equal(undefined);
            if (nameA) {
                expect(nameA.text).to.eq('a');
            }
            expect(result[1].kind).to.equal(SyntaxKind.FunctionDeclaration);
            const nameB = (result[1] as FunctionDeclaration).name;
            expect(nameB).to.not.equal(null);
            expect(nameB).to.not.equal(undefined);
            if (nameB) {
                expect(nameB.text).to.eq('b');
            }
        });
    });
});