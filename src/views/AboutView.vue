<template>
  <v-container>
    <v-card :width="width">
      <v-row>
        <v-col cols="12" sm="9">
          <v-card cols="12" sm="6">
            <v-row>
              <v-col cols="12" sm="6">
                <v-img
                  :aspect-ratio="1"
                  class="img-circle"
                  src="https://i.ibb.co/8zR8C5Y/Akshay.jpg"
                ></v-img
              ></v-col>
              <v-divider></v-divider>
              <v-col cols="12" sm="6">
                <v-card-text
                  >➼ I'm a Software Engineer with 3 Years of industry
                  experience. <br />➼ Currently working as Senior Software
                  Engineer @ Opcito Technology, also worked in Futurense
                  Technology as Data Engineer and as a Software Developer in
                  Amdocs.<br />
                  ➼ I enjoy writing code and building production ready
                  applications.
                  <br />➼ I have knowledge of Python Programming with frameworks
                  like Django, Flask & Pyspark and Big data technology for
                  distributed storage and distributed processing. <br />➼ I also
                  worked on cloud platform "AWS & Azure".<br />
                  ➼ I also have good knowledge of System Desgin, Version
                  Control, Containerisation and Deployment tools like Jenkins,
                  Kubernetes and Ansible. <br />➼ Worked on SQL & NoSql
                  databases.<br />
                  ➼ Completed my graduation in "Computer Science" in 2018.
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card class="align-center">
            <v-card-title>Follow Me On </v-card-title>

            <v-card-actions
              ><v-row
                justify="center"
                class="d-flex justify-space-between align-center mx-10 mb-11"
              >
                <v-btn
                  depressed
                  outlined
                  color="grey"
                  href="https://github.com/akshaysoni001"
                >
                  <v-icon color="grey">fab fa-github</v-icon>
                </v-btn>
                <v-btn
                  depressed
                  outlined
                  color="grey"
                  href="https://www.linkedin.com/in/akshay-soni-51171913b/"
                >
                  <v-icon color="blue">fab fa-linkedin</v-icon>
                </v-btn>
                <v-btn
                  depressed
                  outlined
                  color="grey"
                  href="https://hub.docker.com/u/somebady"
                >
                  <v-icon color="light-blue">fab fa-docker</v-icon>
                </v-btn>
              </v-row></v-card-actions
            >
          </v-card></v-col
        >
      </v-row>
    </v-card>
    <div class="d-flex mt-10 flex-column justify-space-between align-center">
      <v-slider
        v-model="width"
        class="align-self-stretch"
        min="800"
        max="1800"
        step="1"
      ></v-slider>
    </div>
    <v-app-bar flat color="#49D9A0" elevation="12" class="mx-5"
      ><v-app-bar-title> My Skills</v-app-bar-title></v-app-bar
    >
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="2"
        v-for="list in skills"
        :key="list.skill"
      >
        <v-card class="text-center ma-3 rounded-xl">
          <v-responsive class="pt-4">
            <v-avatar size="130">
              <v-icon size="110" :color="list.color">{{ list.img }}</v-icon>
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <div>
              <strong>{{ list.skill }}</strong>
            </div>
            <div>{{ list.service }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    width: 1700,
    skills: [
      {
        skill: "Python",
        img: "fab fa-python",
        color: "DarkBlue",
        service: "Backend",
      },
      {
        skill: "Flask",
        img: "fab fa-foursquare",
        color: "black",
        service: "Backend Web",
      },
      {
        skill: "VueJs",
        img: "fab fa-vuejs",
        color: "green",
        service: "Front-End",
      },
      {
        skill: "Docker",
        img: "fab fa-docker",
        color: "blue",
        service: "DevOps",
      },
      {
        skill: "Oracle SQL",
        img: "fa-solid fa-database",
        color: "purple",
        service: "Database",
      },
      {
        skill: "Linux",
        img: "fab fa-linux",
        color: "black",
        service: "Operations",
      },
      {
        skill: "Big Data",
        img: "fab fa-hire-a-helper",
        color: "yellow",
        service: "Database",
      },
      {
        skill: "Kubernaties",
        img: "fab fa-empire",
        color: "blue",
        service: "Cluseter Manager",
      },
      {
        skill: "MongoDB",
        img: "fab fa-envira",
        color: "green",
        service: "No SQL Database",
      },
      {
        skill: "Git Hub",
        img: "fab fa-git",
        color: "black",
        service: "Development",
      },
      {
        skill: "AWS Cloud",
        img: "fab fa-aws",
        color: "orange",
        service: "Cloud Platform",
      },
    ],
  }),
};
</script>
<style scoped>
.img-circle {
  border-radius: 50%;
}
</style>
