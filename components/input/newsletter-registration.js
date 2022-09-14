import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailRef = useRef()

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const email = emailRef.current.value
    // optional: validate input
    if(email === undefined) {
      console.log('Enter valid email')
      return
    }
    // send valid data to API
    console.log('Sending this email ', email)
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        email: email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => console.log('Got Response ', JSON.stringify(data))).catch(e => {
      console.log('Error ', e)
    })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
