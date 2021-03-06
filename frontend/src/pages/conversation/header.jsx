import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Online from "components/flags/online";
import Typography from "components/typography";

const Header = ({ contact }) => {
  return (
    <Grid
      item
      xs={12}
      bgcolor="white"
      padding={2}
      borderRadius={3}
      boxShadow={1}
    >
      <Grid item xs={12} display="inline-flex" alignItems={"center"}>
        <Box mr={1}>{contact?.status === 1 ? <Online /> : <></>}</Box>
        <Box mr={1}>
          <Avatar />
        </Box>
        <Typography variant="h4">{contact?.username}</Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
