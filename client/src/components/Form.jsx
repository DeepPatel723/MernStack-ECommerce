import React from 'react'

const Form = ({formControls,formData,isBtnDisabled,setFormData,buttonText,onsubmit}) => {
    console.log(formControls);
    function renderInputByComponentType(getControlItem) {
        let element = null;
        const value = formData[getControlItem.name] || "";

        switch (getControlItem.contentType) {
            case "input":
                element = (
                    <input 
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event)=>setFormData({
                            ...formData,[getControlItem.name]: event.target.value,
                        })}/>
                )
                break;

            case "textarea":
                element = (
                    <textarea 
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        value={value}
                        onChange={(event)=>
                            setFormData({
                            ...formData,[getControlItem.name]: event.target.value,
                        })}/>
                )
                break;
            
            default:
                element = (
                    <input 
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event)=>setFormData({
                            ...formData,[getControlItem.name]: event.target.value,
                        })}/>
                )
                break;
        }
        return element;
    }
  return (
    <form onSubmit={onsubmit}>
        <div className="form-container">
            {formControls.map((controlItems) => (
                <div className="field" key={controlItems.name}>
                    <label className="field-label">{controlItems.name}</label>
                    {renderInputByComponentType(controlItems)}
                </div>
            ))}
        </div>
        <button className='button' type='submit' disabled={isBtnDisabled}>{buttonText || 'Submit'}</button>
    </form>
  )
}

export default Form;