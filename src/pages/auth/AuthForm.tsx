import CButton from "components/CButton";
import { SubmitHandler, useForm, SubmitErrorHandler } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Dialog,
  DialogContent,
  FormHelperText,
} from "@mui/material";
import React, { ReactNode, useRef } from "react";
import { IFormAuth } from "pages/interface";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  handleFormOpenChange,
  handleFormTypeChange,
  handleLoading,
} from "app/globalSlice";
import { authenticate, signupUser } from "./authSlice";
import customToast, { ToastType } from "components/CustomToast/customToast";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import CInput from "components/CInput";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { globalSelector } from "app/selectors";
import CCheckbox from "components/CCheckbox";
import Events from "utils/helpers/Events";
import { eventKey } from "configuration/eventKey";

const defaultValues: IFormAuth = {
  email: "",
  password: "",
  confirmPassword: "",
};

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const global = useAppSelector(globalSelector);
  const { open, type } = global.authFormState;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
    clearErrors,
    watch,
  } = useForm<IFormAuth>({
    defaultValues,
  });
  const formRef = useRef<any>(null);
  const submitFormHandler: SubmitHandler<IFormAuth> = async (data) => {
    // Just for test
    dispatch(handleLoading(true));
    try {
      const { confirmPassword, ...params } = data;
      const res: any = await dispatch(
        isSignin ? authenticate(params) : signupUser(params)
      ).unwrap();
      const { success, message } = res;

      if (success) {
        customToast(ToastType.SUCCESS, message);
        Events.emit(eventKey.GET_MY_INFO);
        handleClose();
      } else {
        customToast(ToastType.ERROR, message);
      }
      dispatch(handleLoading(false));
    } catch (e: any) {
      customToast(ToastType.ERROR, e.message);
      dispatch(handleLoading(false));
    }
  };
  const errorFormHandler: SubmitErrorHandler<IFormAuth> = (_, event) => {
    event?.target.classList.add("wasvalidated");
  };
  const handleReset = () => {
    reset(defaultValues);
    clearErrors();
    formRef.current?.classList.remove("wasvalidated");
  };
  const handleClose = () => {
    dispatch(handleFormOpenChange(false));
    handleReset();
  };
  const handleChangeType = (type = "signin") => {
    dispatch(handleFormTypeChange(type));
    handleReset();
  };
  const isSignin = type === "signin";
  const inputData: {
    icon: ReactNode;
    label: string;
    name: keyof IFormAuth;
    placeholder: string;
    type: "text" | "password";
    rules: any;
    endIcon?: any;
  }[] = [
    {
      icon: <PersonIcon />,
      label: "Email",
      name: "email",
      placeholder: "abcxyz@gmail.com",
      type: "text",
      rules: isSignin
        ? {}
        : {
            validate: (value: string) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
              "Invalid email address",
          },
    },
    {
      icon: <LockIcon />,
      label: "Password",
      name: "password",
      placeholder: "Enter your password",
      endIcon: <VisibilityIcon />,
      type: "password",
      rules: {},
    },
  ];

  if (!isSignin) {
    inputData.push({
      icon: <LockIcon />,
      label: "Confirm password",
      name: "confirmPassword",
      placeholder: "Confirm your password",
      endIcon: <VisibilityIcon />,
      type: "password",
      rules: {
        validate: (value: string) =>
          value === getValues("password") || "Password does not match",
      },
    });
  }

  const watchAllFields = watch();
  const isFormValid =
    isSignin || Object.values(watchAllFields).every((value) => value !== "");

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"xs"} fullWidth={true}>
      <DialogContent className="auth-content">
        <h4>{isSignin ? "Sign in" : "Sign up"}</h4>
        <form
          className="auth-form w-100"
          onSubmit={handleSubmit(submitFormHandler, errorFormHandler)}
          method="POST"
          action="#"
          noValidate
          ref={formRef}
        >
          <FormControl variant="standard" className="w-100 d-flex flex-column">
            {inputData.map((data, idx) => {
              const { icon, label, name, placeholder, rules, type, endIcon } =
                data;
              return (
                <FormGroup
                  className={`auth-form__group ${
                    isSignin && idx !== 0 ? "" : "mb-4"
                  }`}
                  key={name}
                >
                  <InputLabel htmlFor={name}>
                    {icon}
                    <span>{label}</span>
                  </InputLabel>
                  <CInput
                    id={name}
                    placeholder={placeholder}
                    type={type}
                    endicon={endIcon}
                    valid={!errors[name]}
                    {...register(name, rules)}
                  />
                  {!!errors[name] && (
                    <FormHelperText error>
                      {errors[name]?.message}
                    </FormHelperText>
                  )}
                </FormGroup>
              );
            })}
          </FormControl>

          {isSignin && (
            <div className="auth-form__support mb-3 d-flex justify-content-between align-items-center">
              <div className="save-account">
                <FormControlLabel control={<CCheckbox />} label="Remember me" />
              </div>
              <div className="auth-variant">Forgot password?</div>
            </div>
          )}

          <div className="auth-form__button w-100 text-center mb-2">
            <CButton
              className="py-3 w-100"
              variant="contained"
              type="submit"
              color="inherit"
              disabled={!isFormValid}
            >
              {isSignin ? "Sign in" : "Sign up"}
            </CButton>
          </div>
          <p className="auth-form__extend text-center">
            {isSignin ? (
              <span>
                Don't have an account?{" "}
                <span
                  className="auth-variant"
                  onClick={() => handleChangeType("signup")}
                >
                  Sign up
                </span>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <span
                  className="auth-variant"
                  onClick={() => handleChangeType("signin")}
                >
                  Sign in
                </span>
              </span>
            )}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthForm;
