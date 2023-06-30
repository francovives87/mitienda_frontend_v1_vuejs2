<template>
  <div class="tienda_blog_entry_comments">
    <div class="container mb-12">
      <div class="row card mb-4">
        <div class="col-12 col-sm-12">
          <div class="mt-2 p-2" v-for="(comment, index) in comments" :key="index">
            <div class="row">
              <div class="col-12 col-sm-12 pt-0 pb-0">
                <font-awesome-icon icon="fa-user" /> &nbsp;
                <span class="parent_user"> {{ comment.user.username }} </span>
                <span class="parent_date">{{ comment.created }}</span>
              </div>
              <div class="col-12 pl-7 pt-0 pb-0">
                <span class="parent_text"> {{ comment.text }} </span> <br />
                <span class="parent_responder"
                  ><a @click="SetCommentToResponseParent(comment)"> responder </a></span
                >
              </div>
              <div v-if="comment.response.length > 0">
                <div
                  class="row"
                  v-for="(response, index) in comment.response"
                  :key="index"
                >
                  <div class="col-12 pl-10 pt-0 pb-0">
                    <font-awesome-icon icon="fa-user" /> &nbsp;
                    <span style="font-size: 14px">
                      {{ response.user__username }}
                    </span>
                    <span class="children_response_user">
                      @{{ response.parent_user__username }}</span
                    >
                    <span class="children_date">{{ response.formatted_date }}</span>
                  </div>
                  <div class="col-12 pl-10 pt-0 pb-0">
                    <span class="children_text"> {{ response.text }} </span>
                    <br />
                    <span class="parent_responder">
                      <a @click="SetCommentToResponseParentChildren(comment, response)">
                        responder
                      </a></span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-12 col-sm-12 d-flex justify-content-center"
          v-if="have_more_comments == true"
        >
          <v-btn elevation="2" outlined @click="MoreCommnets()">
            <span style="font-size: 12px !important"> MAS COMENTARIOS </span>
          </v-btn>
        </div>
      </div>
    </div>

    <v-alert
      colored-border
      color="deep-purple accent-4"
      elevation="3"
      class="publicar_botoom_fixed d-none d-block d-sm-none"
      v-if="user_store.id"
    >
      <div class="row" v-if="responder == true">
        <div class="col-8">
          <span class="responder_barra"> responder a @{{ username_to_response }} </span>
        </div>
        <div class="col-4">
          <span><a @click="CloseResponseDialog()">X</a></span>
        </div>
      </div>
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-10 col-sm-10 pr-0">
          <div>
            <input
              type="text"
              class="form-control"
              placeholder="Escriba un comentario..."
              v-model="text_commnet"
            />
          </div>
        </div>
        <div class="col-2 col-sm-2 pl-2">
          <v-btn elevation="2" small @click="Publicar(publicar)">
            <font-awesome-icon icon="fa-paper-plane" />
          </v-btn>
        </div>
      </div>
    </v-alert>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "tienda_blog_entry_comments",
  props: ["entry_id"],

  data() {
    return {
      comments: [],
      entrada_id: 0,
      text_commnet: "",
      responder: false,
      commet_to_response_parent: {
        entry: null,
        user: null,
        parent: null,
        parent_user: null,
        text: "",
      },
      have_more_comments: false,
      comments_current_page: 1,
      username_to_response: null,
      publicar: "CreateParentComment",
    };
  },
  computed: {
    ...mapState("user", ["user_store"]),
  },

  mounted() {
    this.entrada_id = parseInt(this.entry_id);
    console.log("desde mounted");
    console.log("this.entry_id");
    console.log(this.entrada_id);
    this.GetComments();
  },

  methods: {
    Publicar(publicar) {
      if (publicar === "CreateParentComment") {
        this.CreateParentComment();
      }

      if (publicar === "CreateResponseCommet") {
        this.CreateResponseCommet();
      }
    },

    RefreshComments() {
      this.comments = [];
      this.comments_current_page = 1;
      this.GetComments();
    },

    CreateParentComment() {
      let data = {
        entry: this.entrada_id,
        user: this.user_store.id,
        text: this.text_commnet,
      };
      axios
        .post(this.server + "/api/v1.0/blog/entry/comments/parent/create/", data, {
          headers: {
            Authorization: localStorage.getItem("access"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.RefreshComments();
          this.$swal.fire(
            "Comentario Publicado!",
            "Se ha publicado su comentario con exito.",
            "success"
          );
          this.text_commnet = "";
          this.publicar = "CreateParentComment";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CloseResponseDialog() {
      this.responder = false;
      this.text_commnet = "";
      this.publicar = "CreateParentComment";
    },

    SetCommentToResponseParent(commnet) {
      this.responder = true;
      this.publicar = "CreateResponseCommet";
      this.username_to_response = commnet.user.username;
      this.commet_to_response_parent = {
        entry: this.entrada_id,
        user: this.user_store.id,
        parent: commnet.id,
        parent_user: commnet.user.id,
      };
      console.log("this.commet_to_response_parent");
      console.log(this.commet_to_response_parent);
    },

    SetCommentToResponseParentChildren(commnet, response) {
      this.responder = true;
      this.publicar = "CreateResponseCommet";
      this.username_to_response = response.user__username;
      this.commet_to_response_parent = {
        entry: this.entrada_id,
        user: this.user_store.id,
        parent: commnet.id,
        parent_user: response.user__id,
      };
      console.log("this.commet_to_response_parent");
      console.log(this.commet_to_response_parent);
    },

    CreateResponseCommet() {
      console.log("this.commet_to_response_parent");
      console.log(this.commet_to_response_parent);
      this.commet_to_response_parent.text = this.text_commnet;
      axios
        .post(
          this.server + "/api/v1.0/blog/entry/comments/children/create/",
          this.commet_to_response_parent,
          {
            headers: {
              Authorization: localStorage.getItem("access"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.RefreshComments();
          this.$swal.fire(
            "Comentario Publicado!",
            "Se ha publicado su comentario con exito.",
            "success"
          );
          this.text_commnet = "";
          this.publicar = "CreateParentComment";
          this.CloseResponseDialog();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    MoreCommnets() {
      this.comments_current_page += 1;
      this.GetComments();
    },

    GetComments() {
      console.log("GetComments");
      axios
        .get(this.server + "/api/v1.0/blog/entry/comments/", {
          params: {
            entry: this.entrada_id,
            page: this.comments_current_page,
          },
        })
        .then((response) => {
          response.data.results.forEach((element) => {
            this.comments.push(element);
          });
          console.log("this.comments");
          console.log(this.comments);
          if (response.data.next != null) {
            this.have_more_comments = true;
          } else {
            this.have_more_comments = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
a {
  color: darkslategrey !important;
}

.publicar_botoom_fixed {
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: 50px !important;
}

.parent_user {
  font-size: 16px !important;
}

.parent_date {
  font-size: 11px !important;
  margin-left: 10px !important;
}
.parent_text {
  font-size: 16px !important;
  font-family: "Times New Roman", Times, serif;
  margin-left: 2px !important;
}
.parent_responder {
  font-size: 10px !important;
  color: darkslategrey !important;
  text-transform: uppercase !important;
}
.children_responder {
  font-size: 10px !important;
  color: darkgrey !important;
}

.children_user {
  font-size: 16px !important;
}

.children_date {
  font-size: 10px !important;
  margin-left: 10px !important;
}
.children_text {
  font-size: 16px !important;
  font-family: "Times New Roman", Times, serif;
  margin-left: 7px !important;
}
.children_response_user {
  color: cornflowerblue !important;
  font-size: 14px !important;
}
</style>
