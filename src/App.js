import React, { Component } from "react";
import ReactDOM from "react-dom";
import makeAnimated from "react-select/animated";
import { colourOptions } from "./data.js";
import MySelect from "./MySelect.js";
import "./styles.css";
import { components } from "react-select";

const Option = props => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

const allOption = {
    label: "Select all",
    value: "*"
};

const ValueContainer = ({ children, ...props }) => {
    const currentValues = props.getValue();
    let toBeRendered = children;
    if (currentValues.some(val => val.value === allOption.value)) {
        toBeRendered = [[children[0][0]], children[1]];
    }

    return (
        <components.ValueContainer {...props}>
            {toBeRendered}
        </components.ValueContainer>
    );
};

const MultiValue = props => {
    let labelToBeDisplayed = `${props.data.label}`;
    if (props.data.value === allOption.value) {
        labelToBeDisplayed = "All is selected";
    }
    return (
        <components.MultiValue {...props}>
            <span>{labelToBeDisplayed}</span>
        </components.MultiValue>
    );
};

const animatedComponents = makeAnimated();
export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionSelected: null
        };
    }

    handleChange = selected => {
        this.setState({
            optionSelected: selected
        });
    };

    render() {
        return (
            <span
                class="d-inline-block"
                data-toggle="popover"
                data-trigger="focus"
                data-content="Please selecet account(s)"
            >
        <MySelect
            options={colourOptions}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
                Option,
                MultiValue,
                ValueContainer,
                animatedComponents
            }}
            onChange={this.handleChange}
            allowSelectAll={true}
            value={this.state.optionSelected}
        />
      </span>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Example />, rootElement);
