import * as Yup from "yup";

export function initialValues(user) {
  return {
    avatar: user?.avatar || "",
    fileAvatar: null,
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    role: user?.role || "",
    password: "",
  };
}

export function validationSchema(user) {
  return Yup.object({
    firstname: Yup.string().required("Campo obligatorio"),
    lastname: Yup.string().required("Campo obligatorio"),
    email: Yup.string().email(true).required("Campo obligatorio"),
    role: Yup.string().required("Campo obligatorio"),
    password: user ? Yup.string() : Yup.string().required("Campo obligatorio"),
  });
}

/*
import * as Yup from "yup";

export function initialValues() {
  return {
    avatar: "",
    fileAvatar: null,
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    firstname: Yup.string().required(true),
    lastname: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    role: Yup.string().required(true),
    password: Yup.string().required(true),
  });
}
*/

/*


import * as Yup from "yup"

export function initialValues(){
    return {
        avatar: "",
        fileAvatar: null,
        firstname: "",
        lastname:"",
        email:"",
        role:"",
        password:""
    }
}

export function validationSchema(){
    return Yup.object({
      firstname: Yup.string().required("El nombre es requerido"),
      lastname: Yup.string().required("El apellido es requerido"),
      email: Yup.string()
        .email("Introduce un correo electrónico válido")
        .required("Campo obligatorio"),
      role: Yup.string().required("Selecciona un rol"),
      password: Yup.string().required("La contraseña es requerida"),
    });
}

*/
