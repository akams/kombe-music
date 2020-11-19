import React from 'react';
import { FormGroup, Input, InputGroupAddon, InputGroupText, InputGroup, Label, Col } from 'reactstrap';
import ReactDatetime from 'react-datetime';

import './style.scss';

/** Render complex input group sans label
 * @param {*} param0
 */
export const renderInputGroupField = ({
  iconComponent,
  inputClass,
  placeholder,
  input,
  type,
  meta: { touched, error, warning },
}) => (
  <FormGroup>
    <InputGroup className="input-group-alternative mb-3">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>{iconComponent}</InputGroupText>
      </InputGroupAddon>
      <Input {...input} placeholder={placeholder} type={type} className={inputClass} />
    </InputGroup>
    {touched && ((error && <span className="error-render-form">{error}</span>) || (warning && <span>{warning}</span>))}
  </FormGroup>
);

export const renderInputGroupFieldComplexe = ({
  iconComponent,
  labelClass,
  labelFor,
  labelSize,
  labelTxt,
  inputClass,
  inputColSize,
  input,
  type,
  meta: { touched, error, warning },
}) => (
  <FormGroup row>
    <Label className={labelClass} for={labelFor} sm={labelSize}>
      {labelTxt}
    </Label>
    <Col sm={inputColSize}>
      <InputGroup className="input-group-alternative mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>{iconComponent}</InputGroupText>
        </InputGroupAddon>
        <Input {...input} type={type} className={inputClass} />
      </InputGroup>
      {touched &&
        ((error && <span className="error-render-form">{error}</span>) || (warning && <span>{warning}</span>))}
    </Col>
  </FormGroup>
);

export const renderDatePickerLabelGroupField = ({
  labelFor,
  labelClass,
  labelSize,
  labelTxt,
  onChangeFunction,
  iconComponent,
  dateTimeValue,
  timeFormat = false,
  meta: { touched, error, warning },
}) => (
  <FormGroup>
    <Label className={labelClass} for={labelFor} sm={labelSize}>
      {labelTxt}
    </Label>
    <InputGroup className="input-group-alternative mb-3">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>{iconComponent}</InputGroupText>
      </InputGroupAddon>
      <ReactDatetime value={dateTimeValue} timeFormat={timeFormat} onChange={onChangeFunction} />
    </InputGroup>
    {touched && ((error && <span className="error-render-form">{error}</span>) || (warning && <span>{warning}</span>))}
  </FormGroup>
);

export const renderInputLabelRowGroupField = ({
  labelFor,
  labelClass,
  labelSize,
  labelTxt,
  inputColSize,
  input,
  inputClass,
  type,
  isRowFormGroup = true,
  meta: { touched, error, warning },
}) => (
  <FormGroup row={isRowFormGroup}>
    <Label className={labelClass} for={labelFor} sm={labelSize}>
      {labelTxt}
    </Label>
    <Col sm={inputColSize}>
      <Input {...input} type={type} className={inputClass} />
      {touched && ((error && <p className="error-render-form mt-2 mb-2">{error}</p>) || (warning && <p>{warning}</p>))}
    </Col>
  </FormGroup>
);

export const renderInputLabelGroupField = ({
  labelFor,
  labelClass,
  labelSize,
  labelTxt,
  input,
  inputClass,
  type,
  meta: { touched, error, warning },
}) => (
  <FormGroup>
    <Label className={labelClass} for={labelFor} sm={labelSize}>
      {labelTxt}
    </Label>
    <Input {...input} type={type} className={inputClass} />
    {touched && ((error && <p className="error-render-form mt-2 mb-2">{error}</p>) || (warning && <p>{warning}</p>))}
  </FormGroup>
);

/**
 * retourne le render select group field
 */
export const renderSelectLabelGroupField = ({
  labelFor,
  labelClass,
  labelSize,
  labelTxt,
  input,
  inputClass,
  options,
  meta: { touched, error, warning },
}) => (
  <FormGroup>
    <Label className={labelClass} for={labelFor} sm={labelSize}>
      {labelTxt}
    </Label>
    <Input {...input} type="select" className={inputClass}>
      <option value="0">Veuillez choisir une option</option>
      {options.map((o) => (
        <option key={o.id}>{o.label}</option>
      ))}
    </Input>
    {touched && ((error && <p className="error-render-form mt-2 mb-2">{error}</p>) || (warning && <p>{warning}</p>))}
  </FormGroup>
);

/** render sans label
 * @param {*} param0
 */
export const renderSimpleInputTextField = ({ input, type, meta: { touched, error, warning } }) => (
  <>
    <Input {...input} type={type} />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </>
);

/** render avec label
 * @param {*} param0
 */
export const renderInputTextField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    {label && <label>{label}</label>}
    <>
      <Input {...input} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </>
  </div>
);
