import React from 'react';
import { Button, Form, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { compose } from 'recompose';
import zxcvbn from 'zxcvbn';
import { FaUnlockAlt } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

import { createInitFormData } from '../../redux/form/helpers';
import { renderInputGroupFieldComplexe } from '../../redux/form/renderers';
import { compileValidation } from './validate';

export const formName = 'signupForm';
export const initFormData = createInitFormData(formName);

function SignupForm(props) {
  const {
    formValues: { password },
    handleSubmit,
  } = props;

  const onHandleSubmit = (data) => {
    props.originalOnSubmit(data);
  };

  const isWeakPassword = (mdp) => {
    let weak = { color: '', msg: '' };
    if (mdp) {
      switch (zxcvbn(mdp).score) {
        case 2:
          weak = { color: 'text-warning', msg: 'Weak' };
          break;
        case 3:
          weak = { color: 'text-info', msg: 'Strong' };
          break;
        case 4:
          weak = { color: 'text-success', msg: 'Too strong' };
          break;
        default:
          weak = { color: 'text-danger', msg: 'Too weak' };
          break;
      }
    }
    return weak;
  };

  return (
    <Form role="form">
      <Field
        labelSize={2}
        labelClass="form-control-label"
        labelFor="lastname"
        labelTxt="Nom"
        inputClass="form-control-alternative"
        id="lastname"
        name="lastname"
        type="text"
        placeholder="Dupont"
        iconComponent={<i className="ni ni-hat-3" />}
        component={renderInputGroupFieldComplexe}
        inputColSize={10}
      />
      <Field
        labelSize={2}
        labelClass="form-control-label"
        labelFor="firstname"
        labelTxt="Prénom"
        inputClass="form-control-alternative"
        id="firstname"
        name="firstname"
        type="text"
        placeholder="Jean"
        iconComponent={<i className="ni ni-hat-3" />}
        component={renderInputGroupFieldComplexe}
        inputColSize={10}
      />
      <Field
        labelSize={2}
        labelClass="form-control-label"
        labelFor="email"
        labelTxt="Email"
        inputClass="form-control-alternative"
        id="email"
        name="email"
        type="email"
        placeholder="jean.dupont@lambda.fr"
        iconComponent={<HiMail />}
        component={renderInputGroupFieldComplexe}
        inputColSize={10}
      />
      <Field
        labelSize={2}
        labelClass="form-control-label"
        labelFor="password"
        labelTxt=""
        inputClass="form-control-alternative"
        id="password"
        name="password"
        type="password"
        autoComplete="off"
        iconComponent={<FaUnlockAlt />}
        component={renderInputGroupFieldComplexe}
        inputColSize={10}
      />
      <Row>
        <Col sm={2} />
        <Col sm={10}>
          <div className="text-muted font-italic">
            <small>Veuillez ressaisir votre mot de passe</small>
          </div>
        </Col>
      </Row>
      <Field
        labelSize={2}
        labelClass="form-control-label"
        labelFor="passwordTwo"
        labelTxt=""
        inputClass="form-control-alternative"
        id="passwordTwo"
        name="passwordTwo"
        type="password"
        autoComplete="off"
        iconComponent={<FaUnlockAlt />}
        component={renderInputGroupFieldComplexe}
        inputColSize={10}
      />
      <Row>
        <Col sm={2} />
        <Col sm={10}>
          <div className="text-muted font-italic">
            <small>
              Fiabilité du mot de passe:{' '}
              <span className={`${isWeakPassword(password).color} font-weight-700`}>
                {isWeakPassword(password).msg}
              </span>
            </small>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={2} />
        <Col sm={10}>
          <div className="text-center">
            <Button className="mt-4" color="primary" type="button" onClick={handleSubmit(onHandleSubmit)}>
              Creer un compte
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

const selector = formValueSelector(formName);
const mapDispatchToProps = {};
const mapStateToProps = (state) => ({
  formValues: {
    lastname: selector(state, 'lastname'),
    firstname: selector(state, 'firstname'),
    email: selector(state, 'email'),
    password: selector(state, 'password'),
    passwordTwo: selector(state, 'passwordTwo'),
  },
});

export default compose(
  reduxForm({
    form: formName,
    validate: compileValidation,
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(SignupForm);
