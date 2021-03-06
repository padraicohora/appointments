import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import {createContainer} from './domManipulators';
import {CustomerForm} from '../src/CustomerForm';

describe('CustomerForm', () => {

    let render, container;


    const form = id => container.querySelector(`form[id="${id}"]`);
    const field = (name) => form('customer').elements[name];
    const labelFor = el => container.querySelector(`label[for="${el}"]`)

    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };

    const itRendersAsATextBox = (fieldName) => {
        it("renders a text box", () => {
            render(<CustomerForm/>);
            expectToBeInputFieldOfTypeText(field(fieldName))
        })
    };

    const itIncludesTheExistingValue = (fieldName) => {
        it("includes the existing value", () => {
            render(<CustomerForm {...{[fieldName]: "value"}}/>);
            expect(field(fieldName).value).toEqual("value")
        })
    }

    const itRendersALabel = (fieldName, label) => {
        it("renders a label", () => {
            render(<CustomerForm/>);
            expect(labelFor(fieldName).textContent).toEqual(label);
        })
    }

    const itAssignsAnIdThatMatchesLabelId = (fieldName) => {
        it("assigns an id that matches the label id", () => {
            render(<CustomerForm/>);
            expect(field(fieldName).id).toEqual(fieldName);
        });
    };

    const itSavesExistingValueWhenSubmitted = (fieldName) => {
        it('saves existing value when submitted', async () => {
            expect.hasAssertions();
            render(
                <CustomerForm {...{[fieldName]: "value"}}
                              onSubmit={props => expect(props[fieldName]).toEqual("value")
                              }/>
            )
            await ReactTestUtils.Simulate.submit(form('customer'));
        });
    }

    const itSavesNewValueWhenSubmitted = (fieldName, value) => {
        it('saves new first name when submitted', async () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    {...{[fieldName]: value}}
                    onSubmit={props => expect(props[fieldName]).toEqual(value)
                    }
                />
            );
            await ReactTestUtils.Simulate.change(field(fieldName), {
                target: {value, name: fieldName}
            });
            await ReactTestUtils.Simulate.submit(form('customer'));
        });
    };

    beforeEach(() => {
        ({render, container} = createContainer());
    });

    it('renders a form', () => {
        render(<CustomerForm/>);
        expect(form("customer")).not.toBeNull();
    });

    describe('first name field', () => {
        itRendersAsATextBox("firstName");
        itIncludesTheExistingValue("firstName");
        itRendersALabel("firstName", "First Name");
        itAssignsAnIdThatMatchesLabelId("firstName");
        itSavesExistingValueWhenSubmitted("firstName")
        itSavesNewValueWhenSubmitted("firstName", "fancy");
    });

    describe('last name field', () => {
        itRendersAsATextBox("lastName");
        itIncludesTheExistingValue("lastName");
        itRendersALabel("lastName", "Last Name");
        itAssignsAnIdThatMatchesLabelId("lastName");
        itSavesExistingValueWhenSubmitted("lastName")
        itSavesNewValueWhenSubmitted("lastName", "beaner");
    });


    describe('Phone Number field', () => {
        itRendersAsATextBox("phoneNumber");
        itIncludesTheExistingValue("phoneNumber");
        itRendersALabel("phoneNumber", "Phone Number");
        itAssignsAnIdThatMatchesLabelId("phoneNumber");
        itSavesExistingValueWhenSubmitted("phoneNumber")
        itSavesNewValueWhenSubmitted("phoneNumber", "12345");
    });

    it("has a submit button", () => {
        render(<CustomerForm />);
        const submitButton = container.querySelector(
            "input[type='submit']"
        );
        expect(submitButton).not.toBeNull();
    })

});