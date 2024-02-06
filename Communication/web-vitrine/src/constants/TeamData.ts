interface TeamData {
  fullName: string;
  jobName: string;
  socialsURL: string;
  projectRoles: string[];
}

const teamData: TeamData[] = [
  {
    fullName: "ROSSO Romain",
    jobName: "Architechte et Développeur fullstack web",
    socialsURL: "https://www.linkedin.com/in/romain-rosso-a1377821a/",
    projectRoles: ["Communication"],
  },
  {
    fullName: "GINISTY Pierre",
    jobName: "Développeur AR/VR",
    socialsURL: "https://www.linkedin.com/in/romain-rosso-a1377821a/",
    projectRoles: ["Chef de projet", "Communication"],
  },
  {
    fullName: "VIENNE Killian",
    jobName: "Développeur web fullstack",
    socialsURL: "https://www.linkedin.com/in/killian-vienne-2b4a3615b/",
    projectRoles: ["Gestion de projet"],
  },
  {
    fullName: "GAILLET Aïmane",
    jobName: "Développeur web fullstack",
    socialsURL: "https://www.linkedin.com/in/a%C3%AFmane-gaillet-7551061bb/",
    projectRoles: ["Gestion de projet"],
  },
  {
    fullName: "LOUCIF Inasse",
    jobName: "Développeur web fullstack",
    socialsURL: "https://www.linkedin.com/in/inasse-loucif/",
    projectRoles: ["Communication"],
  },
  {
    fullName: "OUKZIZ Salma",
    jobName: "Développeur fullstack",
    socialsURL: "https://www.linkedin.com/in/salma-oukziz/",
    projectRoles: ["Gestion de projet"],
  },
  {
    fullName: "TOMIETTO Vincent",
    jobName: "Développeur fullstack",
    socialsURL: "https://www.linkedin.com/in/romain-rosso-a1377821a/",
    projectRoles: ["Gestion de projet"],
  },
  {
    fullName: "HAMDA Salsabil",
    jobName: "Architechte et Développeur fullstack web",
    socialsURL: "https://www.linkedin.com/in/salsabil-hamda/",
    projectRoles: ["Gestion de projet"],
  },
].sort((a, b) => a.fullName.localeCompare(b.fullName));

export default teamData;
