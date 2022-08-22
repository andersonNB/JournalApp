import { useEffect, useState, useMemo } from "react";
const useForm = (initialForm = {}, formValidations = {}) => {


    const [formState, setFormState] = useState(initialForm);

    //Con este estado nos apoyamos para las validaciones
    //Si hay error o no
    // este tiene cada propiedad del formulario
    const [formValidation, setformValidation] = useState({})


    useEffect(() => {
        createValidators();
    }, [formState])

    //Puede ocurrir el caso de que si activa este efecto pero llega a existir un estado inicial vacio
    //este activara un elevado número de veces la re renderización
    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm])

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            console.log("formValue ", formValue)

            if (formValidation[formValue] !== null) return false;

        }

        return true;

    }, [formValidation])


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

    // Hacemos la validaciones dinámicas
    const createValidators = () => {
        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
            // console.log(formField)
            const [funcion, errorMessage = 'Este campo es requerido'] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = funcion(formState[formField]) ? null : errorMessage
        }

        // Una vez valide cada item de nuestro formulario y le setee
        // los valores se lo pasamos a nuestro setformValidation

        setformValidation(formCheckedValues)
    }


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}

export default useForm