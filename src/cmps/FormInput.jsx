import React from 'react'
export const FormInput = ({ type, value, handleChange, name, label, cols = '', reference='', autoComplete='off', rows = '' ,options=[] }) => {
    return (
        <div className="input-field" >
            {(type !== 'textarea' && type !== 'select') && < input className="form-input" ref={reference} type={type} name={name} placeholder=" "
                value={value} onChange={handleChange}
                autoComplete={autoComplete}
            />}
            {(type === 'textarea') && <textarea ref={reference} className="form-input" type={type} name={name} placeholder=" "
                value={value} onChange={handleChange}
                autoComplete={autoComplete}
                cols={cols} rows={rows} />}
            {(type === 'select') && <select ref={reference} className="form-input" type={type} name={name} placeholder=" "
                 onChange={handleChange}
                autoComplete={autoComplete}
                cols={cols} rows={rows} >
                    {options.map(option => <option value={option}>{option}</option>
                    )}
                    </select>}
            <label className="form-label" htmlFor={label}>{label}</label>
        </div>
    )
}
