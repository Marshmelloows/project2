//Import all Dependencies from other components
import { useState, useEffect } from 'react';

//Function Component
function FormCustomerDetail( { passDataToParent, sendCustomerDetails } ) {
    //---------------------------------------------//
    //Customer type state
    const [type, setType] = useState({customer: "checked", business: ""});
    //Update customer type
    const updateCustomerType = (event) => {
        if (event.target.value === "customer") {
            passDataToParent(true);
            setType({customer: "checked", business: ""});
        } else {
            passDataToParent(false);
            setType({customer: "", business: "checked"});
        }
    }
//---------------------------------------------//
    //Customer details
    const [customerDetails, setCustomerDetails] = useState({title: "Mr", firstname: "", lastname: "",});
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomerDetails( {...customerDetails, ...{[name]: value} });
    }
    useEffect(() => {
        //Call back function to send customer details to parent component
        sendCustomerDetails(customerDetails);
    }, [customerDetails]);
// for
    //Component UI: html rendering
    return(<>
        <h2>Customer Details</h2>
        {/*Customer Details */}
        <div className="row">
            <fieldset className="border border-primary col-12 col-lg-11 ms-2 me-4">
                <legend className="col-11 float-none w-auto">Customer type*</legend>
                <div>
                    <label className="col-12 col-md-12 col-lg-4">Customer</label>
                    <input type="radio" name="customertype" value="customer"
                        checked={type.customer === "checked"} onChange={updateCustomerType} />
                </div>
                <div>
                    <label className="col-12 col-md-12 col-lg-4">Business</label>
                    <input type="radio" name="customertype" value="business"
                        checked={type.business === "checked"} onChange={updateCustomerType} />
                </div>
            </fieldset>
        </div>
        {/*Details for title of name*/}
        <div className="row mt-2">
            <label className="col-12 col-md-12 col-lg-4">Title *</label>
            <select className="col-12 col-md-12 col-lg-7"
                    defaultValue="Mr"
                    name="title"
                    onChange={handleChange} required>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
            </select>
        </div>
        {/*First name and validation rule for only letters*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">First Name *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text"
                name="firstname"
                onChange={handleChange}
                pattern="^[A-Za-z\s--]+$" title="Only letters, spaces, hyphens, and en-dashes are allowed."
                onInput={(e) => e.target.value = e.target.value.replace(/[^A-Za-z\s--]/g, '')}
            required/>
        </div>
        {/*Last name*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Last Name *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" 
                name="lastname"
                onChange={handleChange}
                required/>
        </div>
        {/*Street*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Street *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" 
                name="street"
                onChange={handleChange}
                required/>
        </div>
        {/*Suburb*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Suburb</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" 
                name="suburb"
                onChange={handleChange} />
        </div>
        {/*City*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">City *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" 
                name="city"
                onChange={handleChange}
                required/>
        </div>
        {/*Post code*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Post Code: </label>
            <input className="col-12 col-md-12 col-lg-7" type="text" 
                name="postcode"
                onChange={handleChange}
                required/>
        </div>
        {/*Rule allowing for numbers in phone number*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Phone Number *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" 
                name="phone"
                onChange={handleChange}
                pattern="^[0-9\s\(\)\+\-]+$" title="Only numbers, spaces, parentheses, hyphens, and plus signs are allowed."
                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9\s()+\-]/g,"")}
            required/>
        </div>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Email *</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" 
                name="email"
                onChange={handleChange}
                required/>
        </div>
    </>);
}
//Export this component
export default FormCustomerDetail;