<template>
  <div>
    <div class="conteudo">
      <EquipamentoForm escopo="Atualizar" :equipamento="equipamento" :funcButton="putEquipamento" />
    </div>
  </div>
</template>
<script>
import EquipamentoForm from "./EquipamentoForm";
export default {
  components: { EquipamentoForm },
  props: ["id"],
  data() {
    return {
      equipamento: {}
    };
  },
  methods: {
    getEquipamento() {
      var arrayTemp = [];
      this.$http.get("equipamentos/" + this.id).then(res => {
        this.equipamento = res.data;
      });
    },
    putEquipamento() {
      this.$http
        .put("equipamentos", {
          idEquipamento: this.equipamento.idEquipamento,
          idLocal: this.equipamento.idLocal,
          idCategoria: this.equipamento.idCategoria,
          nome: this.equipamento.nome,
          descricao: this.equipamento.descricao,
          marca: this.equipamento.marca,
          tombamento: this.equipamento.tombamento,
          modelo: this.equipamento.modelo,
          status: this.equipamento.status,
          potencia: this.equipamento.Potencia
        })
        .then(resp => {
          if (resp.data.idEquipamento != null) {
            alert("Atualizado com sucesso!");
          }
          this.$router.push("/equipamentos");
        });
    }
  },
  mounted() {
    this.getEquipamento();
  }
};
</script>