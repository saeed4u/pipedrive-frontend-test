import _extends from "babel-runtime/helpers/extends";
import * as React from "react";
import {bpfrpt_proptype_RowRendererParams} from "react-virtualized/dist/es/Table/types";
import PropTypes from "prop-types";


/**
 * This is a fork from react-virtualized. This allows setting id to be result-N for each rendered row
 * Default row renderer for Table.
 */
export default function customDefaultRowRenderer(_ref) {
    const className = _ref.className,
        columns = _ref.columns,
        index = _ref.index,
        key = _ref.key,
        onRowClick = _ref.onRowClick,
        onRowDoubleClick = _ref.onRowDoubleClick,
        onRowMouseOut = _ref.onRowMouseOut,
        onRowMouseOver = _ref.onRowMouseOver,
        onRowRightClick = _ref.onRowRightClick,
        rowData = _ref.rowData,
        //Added id for task use case
        id = _ref.id,
        style = _ref.style;


    const a11yProps = {'aria-rowindex': index + 1, 'id': id};

    if (onRowClick || onRowDoubleClick || onRowMouseOut || onRowMouseOver || onRowRightClick) {
        a11yProps['aria-label'] = 'row';
        a11yProps.tabIndex = 0;

        if (onRowClick) {
            a11yProps.onClick = function (event) {
                return onRowClick({event: event, index: index, rowData: rowData});
            };
        }
        if (onRowDoubleClick) {
            a11yProps.onDoubleClick = function (event) {
                return onRowDoubleClick({event: event, index: index, rowData: rowData});
            };
        }
        if (onRowMouseOut) {
            a11yProps.onMouseOut = function (event) {
                return onRowMouseOut({event: event, index: index, rowData: rowData});
            };
        }
        if (onRowMouseOver) {
            a11yProps.onMouseOver = function (event) {
                return onRowMouseOver({event: event, index: index, rowData: rowData});
            };
        }
        if (onRowRightClick) {
            a11yProps.onContextMenu = function (event) {
                return onRowRightClick({event: event, index: index, rowData: rowData});
            };
        }
    }

    return React.createElement(
        'div',
        _extends({}, a11yProps, {
            className: className,
            key: key,
            role: 'row',
            style: style
        }),
        columns
    );
}
customDefaultRowRenderer.propTypes = process.env.NODE_ENV === 'production' ? null : bpfrpt_proptype_RowRendererParams === PropTypes.any ? {} : bpfrpt_proptype_RowRendererParams;
