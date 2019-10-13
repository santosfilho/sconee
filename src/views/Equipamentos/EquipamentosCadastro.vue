<template>
    <div>
        <div class="conteudo">
            <form class="panel panel-default" >
                <div class="panel-heading">Cadastro Equipamento</div>
                <Rotulo nome="Nome*">
                    <input type="text" v-model="equipamento.nome" placeholder="Nome do Equipamento">
                </Rotulo>
                <Rotulo nome="Descrição">
                    <input type="text" v-model="equipamento.descricao" placeholder="Descrição ">
                </Rotulo>
                <Rotulo nome="Marca/Modelo">
                    <input type="text" v-model="equipamento.marca" placeholder="Marca">
                    <input type="text" v-model="equipamento.modelo" placeholder="Modelo">
                </Rotulo>
                <Rotulo nome="Tombamento">
                    <input type="text" v-model="equipamento.tombamento" placeholder="Tombamento">
                </Rotulo>
                <Rotulo nome="Potência">
                    <input type="number" v-model="equipamento.potencia" value="100" placeholder="Potencia em Watts">
                </Rotulo>
                <Rotulo nome="Local*">
                    <select v-model="equipamento.idLocal">
                        <option v-for="locais in arrayLocais"
                            :value="locais.idLocal"
                            :key="locais.idLocal">{{locais.localizacao}}</option>
                    </select>
                </Rotulo>
                <Rotulo nome="Categoria*">
                    <select v-model="equipamento.idCategoria">
                        <option v-for="categoria in arrayCaterorias"
                            :value="categoria.idCategoria"
                            :key="categoria.idCategoria">{{categoria.nome}}</option>
                    </select>
                </Rotulo>
                <hr>
                <router-link tag="button" class="btn btn-secondary"
                    to="/equipamentos">
                    Voltar
                </router-link>
				<button type="submit" 
                    @click="postEquipamento" 
                    class="btn btn-success" value="Cadastrar">Cadastrar</button>
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
                idLocal:"",
                idCategoria: "",
                nome:"",
                descricao:"",
                marca: "",
                tombamento: "",
                modelo: "",
                status:"",  
                potencia: ""
            },
            erros: [],
            idLocal: 0,
            arrayLocais: [],
            arrayEquipamentos: [],
            arrayCaterorias:[]
        }
    },
    methods:{
        /*checkForm(e){
            if(this.equipamento.nome && this.equipamento.idlocal && this.equipamento.idCategoria){
                return true;
            } else {
                console.log('preencha saporra!')
                return false;
            }
            e.preventDefault();
        },*/
        postEquipamento(){
            this.$http.post('equipamentos', {
                idlocal: this.equipamento.idLocal,
                idCategoria: this.equipamento.idCategoria,
                nome: this.equipamento.nome,
                descricao: this.equipamento.descricao,
                marca: this.equipamento.marca,
                tombamento: this.equipamento.tombamento,
                modelo: this.equipamento.modelo,
                status:this.equipamento.status,
                potencia: this.equipamento.Potencia
            }).then(resp => {
                console.log(resp.data[0])
                if(resp.data[0].idEquipamento != null){
                    alert("Cadastrado com sucesso!sssss")
                }
            })
        },
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
        this.getCategorias();
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