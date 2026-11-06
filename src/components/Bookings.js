//Import all dependencies, other Components
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient.js';

//Function Component
function Bookings() {
    //states
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    //Background style for the bookings page
    const BackgroundStyle = { 
        minHeight: '68vh',
        backgroundColor: '#70b1f1'
    }
    //background colour for the forms
    const FormStyle = { 
        minHeight: '5vh',
        backgroundColor: '#88b9e9'
    }

    //Business contact details shown on every booking card, change these to your own details
    const businessDetails = {
        name: 'marshalls phones repo',
        street: '123 Example Street',
        city: 'Your City',
        phone: '06 123 4567',
        email: 'info@yourbusiness.co.nz',
        website: 'www.yourbusiness.co.nz',
    };

    //Names of the courtesy items, the ids match the list in FormCourtesyPhone
    const courtesyNames = {
        0: 'None',
        1: 'iPhone',
        2: 'Samsung Galaxy',
        3: 'Nokia',
        4: 'iPhone Charger',
        5: 'Samsung Charger',
        6: 'Nokia Charger',
    };

    //Format a number as dollars, blank values show as $0.00
    const money = (value) => '$' + Number(value || 0).toFixed(2);

    //Format a date like "15 Nov 2026" (value comes from Supabase as "2026-11-15")
    const formatDate = (value) => {
        if (!value) return '';
        const [y, m, d] = value.split('-');
        return new Date(y, m - 1, d).toLocaleDateString('en-NZ', {day: '2-digit', month: 'short', year: 'numeric'});
    };

    //Format the invoice date and time in 24-hour format, like "15 Nov 2026 14:05"
    const formatInvoice = (value) => {
        if (!value) return '';
        const d = new Date(value);
        return d.toLocaleDateString('en-NZ', {day: '2-digit', month: 'short', year: 'numeric'})
            + ' ' + d.toLocaleTimeString('en-NZ', {hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
    };

    //Format a time in 12-hour format with AM or PM (value comes from Supabase as "14:30:00")
    const formatTime12 = (value) => {
        if (!value) return '';
        const [h, m] = value.split(':');
        const hour = Number(h);
        return ((hour % 12) || 12) + ':' + m + ' ' + (hour >= 12 ? 'PM' : 'AM');
    };

    // Fetch bookings from Supabase
    const fetchBookings = async () => {
        try {
        // Set loading state
        setLoading(true);
        // Fetch data from Supabase
        const { data, error } = await supabase.from('bookings').select('*');
        console.log('Fetched bookings:', data);
        // Handle error
        if (error) throw error;
        // Update state with fetched data
        setBookings(data);

        } catch (error) {
        setError(error.message);
        console.error('Error fetching bookings:', error);
        } finally {
        setLoading(false);
        }
    };

    // Use useEffect to fetch bookings
    useEffect(() => {
        fetchBookings();
    }, []);
    
    //Component UI
    return (
        <>
            <div style={BackgroundStyle}>
                <h1>Bookings</h1>
                {/*Retrieve data from bookings table on supabase */}
                {loading ? (<p>Loading bookings...</p>) : error ? (<p style={{ color: "red" }}>Error: {error}</p>) : bookings.length === 0 ? (<p>No bookings yet.</p>) : (
                    bookings.map((booking) => (
                    <div key={booking.id}
                        style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px", borderRadius: "5px", ...FormStyle }}>

                        {/*Business contact details*/}
                        <div style={{ borderBottom: "1px solid gray", marginBottom: "10px", paddingBottom: "5px" }}>
                            <h3>{businessDetails.name}</h3>
                            <p>{businessDetails.street + ", " + businessDetails.city}</p>
                            <p>{"Phone: " + businessDetails.phone}</p>
                            <p>{"Email: " + businessDetails.email}</p>
                            <p>{"Web: " + businessDetails.website}</p>
                        </div>

                        {/*Job number and invoice date/time (24-hour)*/}
                        <h4>{"Job number: JOB-" + booking.jobnumber}</h4>
                        <p>{"Invoice date: " + formatInvoice(booking.invoicedate)}</p>

                        {/*Customer details*/}
                        <h4>{booking.title + ": " + booking.firstname + " " + booking.lastname}</h4>
                        <p>{"Customer type: " + booking.customertype}</p>
                        <p>{"Address: " + booking.street + ", " + (booking.suburb ? booking.suburb + ", " : "") + booking.city + " " + booking.postcode}</p>
                        <p>{"Phone: " + booking.phone}</p>
                        <p>{"Email: " + booking.email}</p>

                        {/*Repair details*/}
                        <h5>Repair details</h5>
                        <p>{"Purchase date: " + booking.purchasedate}</p>
                        <p>{"Repair date/time: " + formatDate(booking.repairdate) + ", " + formatTime12(booking.repairtime)}</p>
                        <p>{"Under warranty: " + (booking.warrantycheck ? "Yes" : "No")}</p>
                        <p>{"IMEI: " + booking.imeinumber}</p>
                        <p>{"Make: " + booking.make}</p>
                        <p>{"Model number: " + booking.modelnumber}</p>
                        <p>{"Fault category: " + booking.faultcategory}</p>
                        <p>{"Fault description: " + booking.faultdescription}</p>

                        {/*Courtesy items*/}
                        <h5>Courtesy items</h5>
                        <p>{"Phone: " + (courtesyNames[booking.phoneborrow] || "None") + " (" + money(booking.phonebond) + ")"}</p>
                        <p>{"Charger: " + (courtesyNames[booking.chargerborrow] || "None") + " (" + money(booking.chargerbond) + ")"}</p>
                        <p>{"Bond: " + money(booking.bond)}</p>

                        {/*Costs*/}
                        <h5>Costs</h5>
                        <p>{"Service fee: " + money(booking.service)}</p>
                        <p>{"Total: " + money(booking.total)}</p>
                        <p>{"GST: " + money(booking.gst)}</p>
                        <p>{"Total (+GST): " + money(booking.totalcostgst)}</p>
                    </div>
                    ))
                )
                }
            </div>
        </>
    );
}
//Export
export default Bookings;