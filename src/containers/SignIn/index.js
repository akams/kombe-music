import React from 'react';
import { Button, Form } from 'reactstrap';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { compose } from 'recompose';
import { HiMail } from 'react-icons/hi';
import { FaUnlockAlt } from 'react-icons/fa';

import { createInitFormData } from '../../redux/form/helpers';
import { renderInputGroupField } from '../../redux/form/renderers';
import { compileValidation } from './validate';

export const formName = 'signinForm';
export const initFormData = createInitFormData(formName);

function LoginContainer(props) {
  const { handleSubmit } = props;

  const onHandleSubmit = (data) => {
    props.originalOnSubmit(data);
  };

  return (
    <Form role="form">
      <Field
        inputClass="form-control-alternative"
        id="email"
        name="email"
        type="email"
        placeholder="jean.dupont@lambda.fr"
        iconComponent={<HiMail />}
        component={renderInputGroupField}
      />
      <Field
        inputClass="form-control-alternative"
        id="password"
        name="password"
        type="password"
        autoComplete="off"
        iconComponent={<FaUnlockAlt />}
        component={renderInputGroupField}
      />
      <div className="custom-control custom-control-alternative custom-checkbox">
        <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
        {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="custom-control-label" htmlFor="customCheckLogin">
          <span>Remember me</span>
        </label>
      </div>
      <div className="text-center">
        <Button className="my-4" color="primary" type="submit" onClick={handleSubmit(onHandleSubmit)}>
          Valider
        </Button>
      </div>
    </Form>
  );
}

const selector = formValueSelector(formName);
const mapDispatchToProps = {};
const mapStateToProps = (state) => ({
  formValues: {
    email: selector(state, 'email'),
    password: selector(state, 'password'),
  },
});

export default compose(
  reduxForm({
    form: formName,
    validate: compileValidation,
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer);
