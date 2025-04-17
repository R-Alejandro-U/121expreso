/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRegister } from "../RegisterForm.interface";
export const handleInputChange = ({target}: React.ChangeEvent<HTMLInputElement>, setData: any) => {
    const { value, name } = target;
    setData(((prevState: IRegister) => ({
        ...prevState, 
        [name]: value,
    })));
};