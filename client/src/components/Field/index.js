import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Input } from 'semantic-ui-react';

import { changeCurrentField } from '../../actions/utilities';

import './style.scss';

function Field({
  type,
  value,
  title,
  placeholder,
  icon,
  inputError,
  name,
}) {
  const dispatch = useDispatch();

  /** Controlled field
   * @changeCurrentField Change input state value
   */
  const handleChange = (event) => {
    dispatch(changeCurrentField(event.target.value, name));
  };

  const inputId = `field-${name}`;
  return (
    <Input
      error={inputError}
      id={inputId}
      value={value}
      type={type}
      className={inputId}
      icon={icon}
      iconPosition="left"
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      title={title}
    />
  );
}

Field.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  inputError: PropTypes.bool,
  icon: PropTypes.string,
  name: PropTypes.string,
};

Field.defaultProps = {
  inputError: false,
  icon: null,
  // name & value not required for socialNetwork because it's not finished
  name: null,
  value: undefined,
};

export default Field;
