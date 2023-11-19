import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    colors,
} from "@mui/material";

const LoginPage = () => {
    return (
        <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
                height: "100%",
                width: "100%",
            }}
        >
            <Paper elevation={3}>
                <Box
                    sx={(theme) => ({
                        [theme.breakpoints.up("sm")]: {
                            width: "500px",
                            px: "32px",
                            py: "48px",
                        },
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
                    <TextField
                        sx={{
                            my: 2,
                        }}
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type="email"
                    />
                    <TextField
                        sx={{
                            my: 2,
                        }}
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                    />

                    <Button
                        sx={{
                            mt: 5,
                            fontSize: 18,
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
