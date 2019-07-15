import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils,{act} from "react-dom/test-utils";
import StyledButton from "../../../js/components/presentation/StyledButton";

let container;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe('StyledButton Component', () => {
    it('it shows passed text when mounted', () => {
        act(() => {
            ReactDOM.render(<StyledButton text={"Click me!"}/>, container);
        });

        const button = container.getElementsByTagName('button')[0];

        expect(button.textContent).toBe('Click me!');
    });

    it('it calls passed function when clicked', () => {

        const mockFun = jest.fn();
        act(() => {
            ReactDOM.render(<StyledButton text={"Click me!"} clickHandler={mockFun}/>, container);
        });

        const button = container.getElementsByTagName('button')[0];

        ReactTestUtils.Simulate.click(button);
        expect(mockFun.mock.calls.length).toBe(1);
    })
});