
//Component fuction
function Footer() {
//-----------------------------//States//-----------------------------//
//-----------------------------//DATA//-----------------------------//
    let footerStyle = { 
        minHeight: '15vh',
        fontsize: '1.em',
        color: 'white',
        backgroundColor: '#2C3E50',
//-----------------------------//*CEntralise verticley and horosontily *//-----------------------------//
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
    
//-----------------------------//FUNCTIONS AND METHODS//-----------------------------//

    //UI RENDER
    return(
        <>
            <footer className="row" style={footerStyle} >
                <p className="text-center"> Created by Marshall 2026</p>
            </footer>
        </>
    );
}

//-----------------------------//EXPORT//-----------------------------//
export default Footer;