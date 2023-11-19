import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
    colors,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { httpGet, httpPost } from "../../../services/axios.service";
import { AxiosResponse } from "../../../types/response.type";
import { AuthContextType } from "../../../types/authcontext.type";
import { AuthContext } from "../../../provider/Auth.provider";
import { useNavigate } from "react-router-dom";

type Inputs = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const navigate = useNavigate();
    const authContext = useContext<AuthContextType | null>(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            email: "edwinbermejo.jr@gmail.com",
            password: "Asdf!234",
        },
    });

    const theme = useTheme();
    const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

    const onSubmit: SubmitHandler<Inputs> = async (payload) => {
        const { data: response } = await httpPost("/user/login", payload);
        const [status, message, data] = response;

        if (status === "SUCCESS") {
            authContext?.setIsLoggedIn(true);
            navigate("/");
        }
    };

    const getUser = async () => {
        const response = await httpGet(`/user`);
        console.log(response);
    };

    return !authContext?.isLoggedIn ? (
        <p>Redirecting...</p>
    ) : (
        <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
                height: "100%",
                width: "100%",
            }}
        >
            <Paper
                elevation={isDownSm ? 0 : 3}
                sx={(theme) => ({
                    [theme.breakpoints.down("sm")]: {
                        background: theme.palette.background.default,
                    },
                })}
            >
                <Box
                    sx={(theme) => ({
                        [theme.breakpoints.up("sm")]: {
                            width: "400px",
                        },
                        px: "32px",
                        py: "48px",
                    })}
                >
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <Typography variant="h4">Log in</Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                mt: 1,
                                color: colors.grey[500],
                            }}
                        >
                            Sign in with your credentials.
                        </Typography>
                    </Box>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Email is required",
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{
                                    mt: 2,
                                }}
                                fullWidth
                                label="Email"
                                variant="outlined"
                                type="email"
                                helperText={
                                    errors.email ? errors.email.message : " "
                                }
                                {...(errors.email
                                    ? {
                                          error: true,
                                      }
                                    : {})}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: "Password is required",
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{
                                    my: 2,
                                }}
                                fullWidth
                                label="Password"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                helperText={
                                    errors.password
                                        ? errors.password.message
                                        : " "
                                }
                                {...(errors.password
                                    ? {
                                          error: true,
                                      }
                                    : {})}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        sx={{
                            mt: 4,
                            fontSize: 16,
                            textTransform: "none",
                        }}
                        fullWidth
                        variant="contained"
                        size="large"
                    >
                        Log in
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginPage;
