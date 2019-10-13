<template>
    <div>
        <div class="conteudo">
            <EquipamentoForm 
                escopo="Cadastrar" 
                :equipamento="equipamento" 
                :funcButton="postEquipamento"/>
        </div>
    </div>
</template>
<script>
import EquipamentoForm from './EquipamentoForm'

export default {
    components: {EquipamentoForm},
    data() {
        return {
            equipamento: {
                idLocal:"",
                idCategoria: "",
                nome:"",
                descricao:"",
                marca: "",
                tombamento: "",
                modelo: "",
                status:"",  
                potencia: ""
            }
        }
    },
    methods:{
        postEquipamento(){
            this.$http.post('equipamentos', {
                idLocal: this.equipamento.idLocal,
                idCategoria: this.equipamento.idCategoria,
                nome: this.equipamento.nome,
                descricao: this.equipamento.descricao,
                marca: this.equipamento.marca,
                tombamento: this.equipamento.tombamento,
                modelo: this.equipamento.modelo,
                status:this.equipamento.status,
                potencia: this.equipamento.Potencia
            }).then(resp => {
                if(resp.data.idEquipamento != null){
                    alert("Cadastrado com sucesso!")
                }
                this.$router.push("/equipamentos");
            })
        }
    }
}
</script>
<style>
</style>