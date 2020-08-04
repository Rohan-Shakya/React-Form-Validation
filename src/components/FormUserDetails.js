import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class FormUserDetails extends Component {
  continue = (e) => {
    const { nextStep, values } = this.props;
    const { firstName, lastName, email, formErrors } = values;
    e.preventDefault();

    if (firstName === null || lastName === null || email === null) {
      alert('Please fill the form');
    } else if (
      (!formErrors.firstName || !formErrors.lastName, !formErrors.email)
    ) {
      nextStep();
    } else {
      alert('Invalid User Details');
    }
  };
  render() {
    const { values, handleChange } = this.props;

    return (
      <MuiThemeProvider>
        <>
          <AppBar title='Enter User Details' />

          <TextField
            hintText='Enter Your First Name'
            floatingLabelText='First Name'
            onChange={handleChange('firstName')}
            defaultValue={values.firstName}
          />

          {values.formErrors.firstName.length > 0 && (
            <>
              <br />
              <span className='errorMessage'>
                {values.formErrors.firstName}
              </span>
            </>
          )}

          <br />
          <TextField
            hintText='Enter Your Last Name'
            floatingLabelText='Last Name'
            onChange={handleChange('lastName')}
            defaultValue={values.lastName}
          />
          {values.formErrors.lastName.length > 0 && (
            <>
              <br />
              <span className='errorMessage'>{values.formErrors.lastName}</span>
            </>
          )}
          <br />
          <TextField
            hintText='Enter Your Email Name'
            floatingLabelText='Email'
            onChange={handleChange('email')}
            defaultValue={values.email}
          />
          {values.formErrors.email.length > 0 && (
            <>
              <br />
              <span className='errorMessage'>{values.formErrors.email}</span>
            </>
          )}
          <br />

          <RaisedButton
            label='Continue'
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
        </>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15,
  },
};
