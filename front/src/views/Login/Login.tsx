import React, { useContext, useEffect, useState } from 'react';
import { LoginForm } from '../../components/Forms/Login/LoginForm';
import { handleImputChange } from '../../components/Forms/Login/handles/handleInputChange';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { handleOnSubmit } from '../../components/Forms/Login/handles/handleOnSubmit';
import { UserContext } from '../../context/UserContext';
import { DataLogin } from '../../components/Forms/Login/LoginForm.interface';
import { validate } from '../../components/Forms/Login/utils/validate';
import { IErrors } from '../../../utils/Errors.interface';
import Swal from 'sweetalert2';
const Login: React.FC = () => {
  const { loginUser } = useContext(UserContext)
  const [Login, SetLogin] = useState<DataLogin>({
    email: '',
    password: ''
  });
  const [Errors, SetErrors] = useState<IErrors>({
    email: '',
    password: ''
  })
  const navigate: NavigateFunction = useNavigate()
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImputChange(e, SetLogin);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) : Promise<void> => {
    try {
      e.preventDefault();
      if(Object.keys(Errors).length) {
        Swal.fire({
          title: `Por favor, llene el formularío.`,
          width: 600,
          padding: "3em",
          color: "#fff",
          background: `url("https://mir-s3-cdn-cf.behance.net/project_modules/hd/5c9e06114084301.6034c329b0e28.gif") no-repeat center center`, 
        });
        return;
      };
      await handleOnSubmit(e, Login, loginUser, navigate);
    } catch (error) {
      console.error(error); 
    }
  };
  useEffect(() => {
    SetErrors(validate(Login));
  },[Login]);
  return(
    <LoginForm data={ Login } change={ change } handleSubmit={ handleSubmit } errors={ Errors }></LoginForm>
  );
};



export default Login;
