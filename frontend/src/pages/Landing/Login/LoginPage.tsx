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
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { httpGet, httpPost } from "../../../services/axios.service";

type Inputs = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const theme = useTheme();
    const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const response = await httpPost("/user/login", data);
        console.log(response);
    };

    const getUser = async () => {
        const response = await httpGet(`/user`);
        console.log(response);
    };

    useEffect(() => {}, []);

    return (
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

                    <Button
                        onClick={getUser}
                        type="button"
                        sx={{
                            mt: 4,
                            fontSize: 16,
                            textTransform: "none",
                        }}
                        fullWidth
                        variant="contained"
                        size="large"
                    >
                        Get User
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginPage;
