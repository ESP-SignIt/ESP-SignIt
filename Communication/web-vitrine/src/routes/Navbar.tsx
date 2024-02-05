import { Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar/AppBar";
import { Outlet, useNavigate } from "react-router-dom";

interface Props {}

const linkStyles = {
  cursor: "pointer",
};

export default function Navbar({}: Props) {
  const navigate = useNavigate();

  return (
    <section>
      <AppBar position="sticky">
        <Grid style={{ paddingLeft: 15, paddingRight: 15, marginTop: 15, marginBottom: 15 }} container direction="row" justifyContent={"center"} alignItems={"center"}>
          <Grid item xs={10} style={{ textAlign: "center", fontSize: 24 }}>
            <Grid container direction="row" justifyContent={"space-evenly"} alignItems={"center"}>
              <Grid item>
                <span style={linkStyles} onClick={() => navigate("/")}>
                  Accueil
                </span>
              </Grid>
              <Grid item>
                <span style={linkStyles} onClick={() => navigate("/project")}>
                  Notre projet
                </span>
              </Grid>
              <Grid item>
                <span style={linkStyles} onClick={() => navigate("/team")}>
                  Notre équipe
                </span>
              </Grid>
              <Grid item>
                <span style={linkStyles} onClick={() => navigate("/zebi")}>
                  SignIt
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
      <Outlet />
    </section>
  );
}
