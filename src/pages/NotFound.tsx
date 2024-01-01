import { Error } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

function NotFound() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh ">
      <Error width="2rem" height="2rem" />
      <Typography fontSize="2rem"> NOT FOUND</Typography>
    </Box>
  );
}

export default NotFound;
