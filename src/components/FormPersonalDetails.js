import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class FormPersonalDetails extends Component {
  continue = (e) => {
    const { nextStep, values } = this.props;
    const { occupation, city, bio, formErrors } = values;
    e.preventDefault();

    if (occupation === null || city === null || bio === null) {
      alert('Please fill the form');
    } else if ((!formErrors.occupation || !formErrors.city, !formErrors.bio)) {
      nextStep();
    } else {
      alert('Invalid User Details');
    }
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <AppBar title='Enter Personal Details' />
          <TextField
            hintText='Enter Your Occupation'
            floatingLabelText='Occupation'
            onChange={handleChange('occupation')}
            defaultValue={values.occupation}
          />
          {values.formErrors.occupation.length > 0 && (
            <>
              <br />
              <span className='errorMessage'>
                {values.formErrors.occupation}
              </span>
            </>
          )}
          <br />
          <TextField
            hintText='Enter Your City'
            floatingLabelText='City'
            onChange={handleChange('city')}
            defaultValue={values.city}
          />
          {values.formErrors.city.length > 0 && (
            <>
              <br />
              <span className='errorMessage'>{values.formErrors.city}</span>
            </>
          )}
          <br />
          <TextField
            hintText='Enter Your Bio'
            floatingLabelText='Bio'
            onChange={handleChange('bio')}
            defaultValue={values.bio}
          />
          {values.formErrors.bio.length > 0 && (
            <>
              <br />
              <span className='errorMessage'>{values.formErrors.bio}</span>
            </>
          )}
          <br />
          <RaisedButton
            label='Continue'
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
          <RaisedButton
            label='Back'
            primary={false}
            style={styles.button}
            onClick={this.back}
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
