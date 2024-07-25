import $ from 'jquery';
import 'select2/dist/js/select2';
import 'select2/dist/css/select2.min.css';
import { useEffect, useRef } from 'react';
import "./CustomSelect.css";

const CustomSelect = ({ options, initialSelectedValue, onOptionChange }) => {
  const selectRef = useRef(null);
  useEffect(() => {
    $(selectRef.current).select2({
      width: "100%",
      dropdownParent: $(".custom-select")
    })
    $("#customeselect").on("change", function (e) {
      onOptionChange(e.target.value);
    })
    return () => {
      $(selectRef.current).select2('destroy');
    }
  }, [])
  return (
    <div className='custom-select'>
      <select ref={selectRef} id='customeselect' defaultValue={initialSelectedValue.toString()}>
        {
          options.map((el, index) => {
            return (
              <option key={index} value={el.dial_code}>
                {el.dial_code} ({el.name})
              </option>
            )
          })
        }
      </select>
    </div>
  )
}

export default CustomSelect;