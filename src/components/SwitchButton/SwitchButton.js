import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";

export default function SwitchButton(props) {

    const { formControlProps, checked, color, label } = props;

    const SwitchColor = withStyles({
        switchBase: {
            color: color[300],
            "&$checked": {
                color: color[500]
            },
            "&$checked + $track": {
                backgroundColor: color[500]
            }
        },
        checked: {},
        track: {}
    })(Switch);

    return (
        <FormGroup>
            <FormControlLabel
                style={{ margin: "0 0 15px 0" }}
                control={
                    <SwitchColor
                        {...formControlProps}
                        checked={checked}
                        name="checkedA"
                    />
                }
                label={label}
            />
        </FormGroup>
    );
}

SwitchButton.propTypes = {
    color: PropTypes.object,
    label: PropTypes.string,
    checked: PropTypes.bool,
    formControlProps: PropTypes.object
};
