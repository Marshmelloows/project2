import React, { useState, useEffect } from 'react';
//Function Component
function FormCost({ sharedPropBond, sharedPropWarranty, sendCostDetails }) {
    const serviceFee = sharedPropWarranty ? 0 : 85;
    const totalCost = sharedPropBond + serviceFee;
    const GST = Math.round(totalCost * 0.15 * 100) / 100;
    const totalCostWithGST = totalCost + GST;
//sends the details to the perent whenever the value has changed 

    useEffect(() => {
        if (typeof sendCostDetails === 'function') {
            sendCostDetails({
                serviceFee,
                totalCost,
                GST,
                totalCostWithGST
            });
        }
    }, [serviceFee, totalCost, GST, totalCostWithGST]);

    //Component UI: HTML Rendering
    return(<>
        <h2>Cost</h2>
        <div className="row mt-2 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Bond ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={sharedPropBond} readOnly />
        </div>
        {/*Service Fee section*/}
        <div className="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Service Fee ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={serviceFee} readOnly />
        </div>
        {/*Total section*/}
        <div className="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Total ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={totalCost} readOnly />
        </div>
        {/*GST section*/}
        <div className="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">GST:($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={GST} readOnly/>
        </div>
        {/*Total section. including gst*/}
        <div className="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Total(+GST): ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={totalCostWithGST} readOnly />
        </div>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCost;