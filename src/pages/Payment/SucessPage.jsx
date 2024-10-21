import React, { useEffect } from 'react';
import successGif from '../../images/gifs/theyseemerollingacato.gif';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let timerInterval;

        Swal.fire({
            html: "Redirecting in <b class='swal-timer'></b> milliseconds.",
            timer: 8000, // Set the timer duration
            timerProgressBar: true,
            background: 'rgba(255, 255, 255, 0.7)', // Make the background slightly transparent
            customClass: {
                popup: 'swal-popup', // Add a custom class to the popup
            },
            didOpen: () => {
                Swal.showLoading();
                const b = Swal.getHtmlContainer().querySelector('b.swal-timer');
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft();
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                // Redirect after the timer ends
                navigate('/ourpets');
            }
        });

        return () => {
            clearInterval(timerInterval); // Cleanup timer on unmount
        };
    }, [navigate]);

/*     const backgroundStyle = {
        backgroundImage: `url(${successGif})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
        textAlign: 'center',
        flexDirection: 'column'
    };
 */
    return (
        <>
        <div className='mt-5'>
            <h1>Payment Successful</h1>
            <p>Your payment was successful. Thank you for your purchase!</p>
        </div>

         <div>
            <img src={successGif} alt="a grey cat wearing dark sunglasses is rolling on a cardboard car" />
        </div>
        </>
    );
};

// Custom CSS for SweetAlert to make it smaller and centered
const styles = `

  .swal-popup {
    top: 80%; /* Vertical position, adjust to move up or down */
    left: 0%; /* Horizontal position, adjust to move left or right */
    transform: translate(-0%, -0%); /* Centers the popup based on its own width and height */
    background: rgba(255, 255, 255, 0.8) !important; /* Semi-transparent background */
    width: 300px; /* Width of the popup */
}
  


  .swal-timer {
    font-size: 18px; /* Smaller font size for the timer */
    display: inline-block;
    margin-top: 10px; /* Add some space above the timer */
    color: black; /* Timer color */
  }

  .swal2-popup .swal2-title {
    font-size: 20px; /* Smaller title */
    margin-bottom: 10px; /* Less margin below the title */
  }

  .swal2-popup .swal2-html-container {
    font-size: 14px; /* Smaller font size for the HTML content */
  }
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);

// Do not delete this, it's for Stripe. DO NOT DELETE!
export default SuccessPage;
