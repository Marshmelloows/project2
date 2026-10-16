//Function Component
function FormCost(props) {
    const totalCost = props.sharedPropBond + (props.sharedPropWarranty ? 0 : 85);
    const GST = totalCost * 0.15;
    const totalCostWithGST = totalCost + GST;
    //Component UI: HTML Rendering
    return(<>
        <h2>Cost</h2>
        <div className="row mt-2 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Bond ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={props.sharedPropBond} readOnly />
        </div>
        {/*Service Fee section*/}
        <div className="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Service Fee ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={props.sharedPropWarranty ? 0 : 85}  />
        </div>
        {/*Total section*/}
        <div class="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Total ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={totalCost}  />
        </div>
        {/*GST section*/}
        <div className="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">GST:($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={GST} readOnly/>
        </div>
        {/*Total section. including gst*/}
        <div class="row mt-1 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Total(+GST): ($)</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" value={totalCostWithGST} readOnly />
        </div>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCost; 