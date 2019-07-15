import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, {act} from "react-dom/test-utils";
import UploadBox from "../../../js/components/presentation/UploadBox";

let container;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe('UploadBox Component', () => {
    test('it shows expected text when mounted', () => {
        act(() => {
            ReactDOM.render(<UploadBox />, container);
        });

        const p = container.getElementsByTagName('p')[0];

        expect(p.textContent).toBe('Drag CSV file here or click to upload your CSV!');
    });

    test('it shows select file dialog when clicked', () => {
        act(() => {
            ReactDOM.render(<UploadBox />, container);
        });

        const div = container.getElementsByTagName('div')[0];
        const fileInput = container.getElementsByTagName('input')[0];
        const clickInputSpy = spyOn(fileInput, 'click');
        ReactTestUtils.Simulate.click(div);
        expect(fileInput).toBeTruthy();
        expect(clickInputSpy).toHaveBeenCalled();
    })
});