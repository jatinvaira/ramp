import classNames from "classnames";
import { useRef } from "react";
import { InputCheckboxComponent } from "./types";

export const InputCheckbox: InputCheckboxComponent = ({ id, checked, disabled, onChange }) => {
  const { current: inputId } = useRef(`RampInputCheckbox-${id}`);

  return (
    <div className="RampInputCheckbox--container" data-testid={inputId}>
      <label
        htmlFor={inputId} // Ensure accessibility by linking label to input
        className={classNames("RampInputCheckbox--label", {
          "RampInputCheckbox--label-checked": checked,
          "RampInputCheckbox--label-disabled": disabled,
        })}
      />
      <input
        id={inputId}
        type="checkbox"
        className="RampInputCheckbox--input"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)} // Pass the new checked value
      />
    </div>
  );
};
