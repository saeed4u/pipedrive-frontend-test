import React from "react";
import CsvUploader from "../../../js/components/container/CsvUploader";
import {render,cleanup} from "@testing-library/react";
import {toBeInTheDocument} from '@testing-library/jest-dom'

expect.extend({toBeInTheDocument});

afterEach(cleanup);

describe('CsvUploader component', () => {
   /* it('Snapshot test', () => {
        let {csvComponent} = render(
            <CsvUploader />,
        );
        const tree = csvComponent.toJSON();
        expect(tree).toMatchSnapshot();
    });*/

    it('card header has default text', () => {
        const {container} = render(
            <CsvUploader />,
        );
        const title = container.querySelector('span');

        expect(title.textContent).toBe('Upload');
    }) ;

    it('has a file input element', () => {
        const {container} = render(
            <CsvUploader />,
        );
        const input = container.querySelector('input[type="file"]');

        expect(input).toBeTruthy();
    });

    it('it has `Drag CSV file here or click to upload your CSV!` in document', () => {
        const {getByText} = render(
            <CsvUploader />,
        );
        expect(getByText('Drag CSV file here or click to upload your CSV!')).toBeInTheDocument()
    })
});