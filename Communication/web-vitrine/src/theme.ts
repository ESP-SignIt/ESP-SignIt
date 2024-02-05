import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFA500",
      contrastText: "#FFFFFF", // Assurez-vous que le texte sur le fond gris clair est lisible
    },
    secondary: {
      main: "#D3D3D3",
      light: "#FFFFFF",
      contrastText: "#000000", // Assurez-vous que le texte sur le fond gris clair est lisible
    },
    info: {
      main: "#FFFFFF",
      contrastText: "#FFA500"
    }
  },
});

export default theme;
