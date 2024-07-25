import $ from 'jquery';
import 'select2/dist/js/select2';
import 'select2/dist/css/select2.min.css';
import { useEffect, useRef } from "react";
import "./CustomSelect.css";

const CountrySelect = ({ options, initialSelectedValue, onOptionChange }) => {
    const selectRef = useRef(null);
    useEffect(() => { 
        $(selectRef.current).select2({
            width: "100%",
            dropdownParent: ".country-select"
        })
        $("#country-select").on("change", function (e) {
            onOptionChange(e.target.value);
        })
        return () => {
            $(selectRef.current).select2('destroy');
        }
    }, [])
    return (
        <div className='country-select' style={{ width: "100%" }}>
            <select ref={selectRef} id='country-select' defaultValue={initialSelectedValue.toString()}>
                {
                    options.map((el, index) => {
                        return (
                            <option key={index} value={el.name}>{el.name}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default CountrySelect;