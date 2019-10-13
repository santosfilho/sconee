<template>
  <div>
    <LocalForm scope="Editar" :local="local" :funcSubmit="putLocal" />
  </div>
</template>
<script>
import LocalForm from "./LocalForm";

export default {
  components: { LocalForm },
  props: ["id"],
  data() {
    return {
      local: {}
    };
  },
  methods: {
    getLocal() {
      this.$http.get("locais/" + this.id).then(res => {
        this.local = res.data;
      });
    },
    putLocal() {
      this.$http
        .put("locais", {
          idLocal: this.local.idLocal,
          localizacao: this.local.localizacao,
          setor: this.local.setor,
          capacidade: this.local.capacidade,
          descricao: this.local.descricao
        })
        .then(resp => {
          if (resp.data.idLocal != null) {
            alert("Atualizado com sucesso!");
          }
          this.$router.push("/locais");
        });
    }
  },
  mounted() {
    this.getLocal();
  }
};
</script>