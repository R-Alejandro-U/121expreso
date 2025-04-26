import React, { useContext, useEffect, useState } from 'react';
import { RegisterForm } from '../../components/Forms/register/RegisterForm';
import { IErrors, IRegister } from '../../components/Forms/register/RegisterForm.interface';
import { handleInputChange } from '../../components/Forms/register/handlers/handleInputChange';
import { UserContext } from '../../context/UserContext';
import Swal from 'sweetalert2';
import { handleOnSubmit } from '../../components/Forms/register/handlers/handleOnSubmit';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { validate } from '../../components/Forms/register/utils/validate';

const Registro: React.FC = () => {
  const [data, setData] = useState<IRegister>({
    name: '',
    email: '',
    password:'',
    passwordConfirmation: ''
  });
  const [errors, seterrors] = useState<IErrors | undefined>({
    name: '',
    email: '',
    password:'',
    passwordConfirmation: ''
  });
  const navigate: NavigateFunction = useNavigate();
  const { signup } = useContext(UserContext)
  const change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleInputChange(event, setData);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault();
      if(!data.name){
        alert(`Por favor rellene el campo nombre.`)
        return;
      };
      if(!data.email){
        alert(`Por favor rellene el campo email.`)
        return;
      };if(!data.password){
        alert(`Por favor rellene el campo contraseña.`)
        return;
      };if(!data.passwordConfirmation){
        alert(`Por favor rellene el campo confirmar contraseña.`)
        return;
      };
      if(errors && Object.keys(errors).length){
        Swal.fire({
          title: `Por favor, complete el formulario de forma correcta.`,
          width: 600,
          padding: "3em",
          color: "#fff",
          background: `url("https://mir-s3-cdn-cf.behance.net/project_modules/hd/5c9e06114084301.6034c329b0e28.gif") no-repeat center center`, 
        });
        return;
      }
      await handleOnSubmit(event, data, signup, navigate);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    return seterrors(validate(data));
  }, [data]);
  return (
    <RegisterForm data={data} change={change} submit={handleSubmit} errors={errors}/>
  );
};

export default Registro;