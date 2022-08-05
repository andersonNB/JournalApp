import { useState } from "react";
const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);
    // console.log("formState: ", formState);
    //Los formularios su estado se maneja de manera distinta a otros componentes html
    const onInputChange = ({ target }) => {
        // console.log("target.name: ", target.name)
        // console.log("target.value: ", target.value)
        setFormState({
            ...formState,
            [target.name]: target.value,
        });
    };

    const onResetForm = () => {
        setFormState(initialForm)
    }


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}

export default useForm