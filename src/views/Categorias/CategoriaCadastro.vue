<template>
    <div>
        <div class="conteudo">
            <form class="panel panel-default">
                <div class="panel-heading">Cadastro Evento</div>
                <b-alert v-if="sucesso.show" :variant="sucesso.variant" show dismissible>{{sucesso.mensagem}}</b-alert>
                <Rotulo nome="Categoria">
                    <input type="text" v-model="categoria.nome" placeholder="Nome da Categoria">
                </Rotulo>
                <hr>
                <router-link tag="button" class="btn btn-secondary" to="/categorias">
                    Voltar
                </router-link>
                <button @click="postCategoria" type="button" class="btn btn-success">Cadastrar</button>
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
            categoria: {
                nome:''
            },
            sucesso: {
                show : false,
                variant : '',
                mensagem: ''
            }
        }
    },
    methods:{
        postCategoria(){
            this.$http.post('equipamentos/categorias', {
                nome: this.categoria.nome
            }).then(resp => {
                if(resp.status >= 200 && resp.status < 300){
                    this.sucesso.show = true;
                    this.sucesso.variant = 'success';
                    this.sucesso.mensagem = 'Cadastrado com sucesso!'
                    this.categoria.nome = '';
                }

            }).catch((error) => {
                this.sucesso.show = true;
                this.sucesso.variant = 'danger';
                this.sucesso.mensagem = 'Verifique o nome da categoria! ' + error;
            })
        }
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
/*
body {
	background-color: #ECECEC;
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

	display: flex;
	flex-direction: column;
}

.painel .cabecalho {
	width: 100%;
	background-color: #DDD;
	padding: 10px 0px;
	border-radius: 5px;
	font-size: 1.4rem;
}

#app form button {
	float: right;
	margin: 10px 0px;
	padding: 10px 20px;
	font-size: 1.4rem;
	border-radius: 5px;
	color: #FFF;
	background-color: #2196F3;
}

#app h1 {
	font-weight: 200;
	margin: 20px;
	padding: 0;
}

.mr-4 {
	margin-right: 40px;
}*/
</style>