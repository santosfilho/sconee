<template>
    <div>
        <div class="conteudo">
            <form class="panel panel-default">
                <div class="panel-heading">Cadastro Equipamento</div>
                <Rotulo nome="Nome">
                    <input type="text" v-model="equipamento.nome" placeholder="Nome do Equipamento">
                </Rotulo>
                <hr>
				<button @click.prevent="postEvento" type="button" class="btn btn-success">Adicionar</button>
            </form>
        </div>
    </div>
</template>
<script>

import Rotulo from './../../components/Rotulo'
export default {
    components: {Rotulo},
    data() {
        return {
            equipamento: {
                local:"",
                categoria:"categoria",
                nome:"nome",
                descricao:"descricao",
                // "Marca",
                // "Tombamento",
                // "Modelo",
                status:"status",
                acao:"acao"
                // "Potencia",
                // "Data Cadastro"
            },
            idLocal: 0,
            equipamento: {
                idEquipamento: "",
                idLocal: "",
                categoria: ""
            },
            arrayLocais: [],
            arrayEquipamentos: [],
            arrayCaterorias:[]
        }
    },
    methods:{
        getLocais(){
            this.$http.get("locais").then(res => {
                for (var i = 0; i < res.data.length; i++) {
                    this.arrayLocais.push({
                        idLocal: res.data[i].idLocal,
                        localizacao: res.data[i].localizacao
                    });
                }
            });
        },
        getCategorias(){
            this.$http.get("equipamentos/categorias").then(res => {
                for (var i = 0; i < res.data.length; i++) {
                    this.arrayCaterorias.push({
                        idCategoria: res.data[i].idCategoria,
                        nome: res.data[i].nome
                    });
                }
            });
        }
    },
    mounted(){
        this.getLocais();
        this.getEquipamentos();
    }
}
</script>
<style>
    /*
.conteudo {
    display: flex;
    justify-content: space-around;
}

.identificacao{
    flex-direction: row;
}
.panel {
	flex: 1;
	background: #FFF;
	margin: 0px 10px;
	padding: 20px;
	border: 1px solid #AAA;
	border-radius: 5px;
}
*/
</style>