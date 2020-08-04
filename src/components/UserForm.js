import React, { Component } from 'react';
import { FormUserDetails } from './FormUserDetails';
import { FormPersonalDetails } from './FormPersonalDetails';
import { Confirm } from './Confirm';
import { Success } from './Success';

// Regex
const patterns = {
  firstName: /[a-zA-Z]/gi,
  lastName: /[a-zA-Z]/gi,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)?\.?([a-z]{2,8})\.([a-z]{2,8})?$/,
  city: /^[a-zA-Z\\u0080-\\u024F.]+((?:[ -.|'])[a-zA-Z\\u0080-\\u024F]+)*$/,
  occupation: /[a-zA-Z]/,
};

class UserForm extends Component {
  state = {
    step: 1,
    firstName: null,
    lastName: null,
    email: null,
    occupation: null,
    city: null,
    bio: null,
    formErrors: {
      firstName: '',
      lastName: '',
      email: '',
      occupation: '',
      city: '',
      bio: '',
    },
  };

  // Proceed to next step
  nextStep = () => {
    const { step, formErrors } = this.state;

    this.setState({
      step: step + 1,
    });
    return formErrors;
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    const { value } = e.target;
    let formErrors = this.state.formErrors;

    // validation
    switch (input) {
      case 'firstName':
        formErrors.firstName =
          patterns.firstName.test(value) && value.length > 3
            ? ''
            : 'Invalid First Name';
        break;

      case 'lastName':
        formErrors.lastName =
          patterns.lastName.test(value) && value.length > 3
            ? ''
            : 'Invalid Last Name';
        break;
      case 'email':
        formErrors.email =
          patterns.email.test(value) && value.length > 3
            ? ''
            : 'Invalid Email Address';
        break;
      case 'occupation':
        formErrors.occupation =
          value.length < 3 && value.length > 0
            ? 'Minimum 3 characters required'
            : '';
        break;
      case 'city':
        formErrors.city =
          patterns.city.test(value) && value.length > 3 ? '' : 'Invalid City';
        break;
      case 'bio':
        formErrors.bio =
          value.length < 5 && value.length > 0
            ? 'Minimum 5 Characters Required'
            : '';
        break;
      default:
        break;
    }
    // validation end
    this.setState({
      formErrors,
      [input]: value,
    });
  };

  // rendering UI
  render() {
    const { step } = this.state;
    const {
      firstName,
      lastName,
      email,
      occupation,
      city,
      bio,
      formErrors,
    } = this.state;

    const values = {
      firstName,
      lastName,
      email,
      occupation,
      city,
      bio,
      formErrors,
    };

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormPersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <Success />;
    }
  }
}

export default UserForm;
