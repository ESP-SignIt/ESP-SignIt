import { Button, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import teamData from "../constants/TeamData";

export default function Home() {
  const linkedIn = (URL: string) => {
    window.open(URL, "_blank");
  };

  return (
    <section style={{ width: "100%", margin: "0 auto" }}>
      <Grid container className="box" style={{ paddingTop: 30, paddingBottom: 30 }} direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={12} md={1}></Grid>
        <Grid item xs={12} md={6} style={{ textAlign: "end", paddingRight: 30 }}>
          <Typography variant="h4" component="p" className="ternary main-title">
            T-ESP-800 - SignIt
          </Typography>
          <Typography variant="body1" component="p" className="ternary secondary-title" style={{ marginBottom: 5 }}>
            🎯&nbsp;Objectif: Réaliser un logiciel de traduction bilatérale entre la langue française et la{" "}
            <abbr style={{ cursor: "help" }} title="Langue des Signes Française">
              LSF
            </abbr>
          </Typography>
          <Typography variant="body1" component="p" className="secondary">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam architecto officiis, adipisci sapiente, eum suscipit alias quisquam voluptate enim culpa non inventore itaque deserunt at
            molestiae ea consectetur fugiat dolorum dolorem. Magnam quidem optio aliquid iure labore quasi autem ea explicabo ab ipsa quod beatae, quae sunt debitis praesentium, repudiandae rem. At,
            quia consequuntur quisquam minus iste suscipit ipsa ad distinctio architecto eos magni nihil laborum corrupti amet sunt asperiores quibusdam possimus vitae, quo quidem? Nihil nostrum
            maiores quo, labore voluptatibus maxime dolor blanditiis quis at quia laborum non sint dolores qui optio, sequi asperiores repudiandae adipisci neque ut reprehenderit! Nam praesentium
            laborum nihil non tempora, obcaecati atque id temporibus rerum. Ullam, nam minima. Hic perferendis asperiores, possimus officia ratione sint dolore iure, quam laudantium neque expedita
            optio repudiandae alias laboriosam doloribus eum assumenda reiciendis molestiae quia et cum tenetur, doloremque incidunt voluptatem. Iste neque dolores consequuntur dolorum ipsum. Ipsam
            molestias ratione pariatur repellendus deleniti fugiat amet eos autem quaerat.
          </Typography>
        </Grid>
        <Grid item xs={12} md={5} style={{ position: "relative", display: "flex", justifyContent: "flex-start" }}>
          <div>
            <img className="hover-img" src="LSF.jpg" style={{ objectFit: "scale-down", maxWidth: "90%", position: "relative", borderRadius: 10 }} />
            <Button
              color="info"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                fontSize: 24,
                border: "1px solid #FFFFFF",
              }}
              variant="outlined"
            >
              En savoir plus ...
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={2}></Grid>
      </Grid>
      <Grid container className="" style={{ paddingTop: 30, paddingBottom: 30 }} direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={10}>
          <Grid container direction="row" justifyContent={"center"} alignItems={"center"} spacing={5}>
            {teamData &&
              teamData.map((teamMember) => {
                return (
                  <Grid item xs={3}>
                    <Card style={{ width: "100%", borderRadius: 10 }}>
                      <Grid container style={{ margin: 0 }} direction="row" justifyContent={"center"} alignItems={"center"}>
                        <CardContent style={{ width: "100%" }}>
                          <Grid item xs={12} style={{ textAlign: "start" }}>
                            <Typography variant="body1" component="span" className="secondary">
                              {teamMember.jobName}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} style={{ textAlign: "center", marginTop: 5 }}>
                            <Typography variant="h4" component="span" className="primary">
                              {teamMember.fullName}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} style={{ textAlign: "center", marginTop: 5 }}>
                            <Typography variant="body1" component="span" style={{ fontWeight: "bold" }}>
                              {teamMember.projectRoles.join(", ")}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} style={{ textAlign: "center", marginTop: 5 }}>
                            <Typography variant="body1" component="span">
                              <Link underline="hover" onClick={() => linkedIn(teamMember.socialsURL)} style={{ cursor: "pointer", color: "royalblue" }}>
                                Lien LinkedIn
                              </Link>
                            </Typography>
                          </Grid>
                        </CardContent>
                      </Grid>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
}
