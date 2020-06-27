import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Input from '../../components/Input/Input';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../service/api'


const useStyles = makeStyles((theme) => ({
    container: {
        background: 'linear-gradient(180deg, #303030 0%, #000000 100%)',
        width: '100vw',
    },
    paper: {
        height: '100%',
        paddingTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',


    },
    form: {
        display:'flex',
        flexDirection:'column',
        width: '77vw',
        height: '100vh',

    },
    submit: {
        background: '#FE963D',
        borderRadius: '10px',
        width: '180px',
        height: '40px',
        marginLeft: '60px',
        justifyContent: 'center',
        marginTop: '80px'
    },

    texto: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '17px',
        lineHeight: '17px',
        paddingLeft: '20px'
    },
    scrol:{
        overflow:'hidden'
    }

}));





export default function Cadastrar() {

    const classes = useStyles();

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmar_senha, setconfirmar_senha] = useState("");


    function cadastrarUsuario(evento, campo) {
        if (campo === 'nome') {
            setNome(evento.target.value);
            console.log(nome);
        }
        if (campo === 'email') {
            setEmail(evento.target.value);
            console.log(email);
        }
        if (campo === 'cpf') {
            setCpf(evento.target.value);
            console.log(cpf);
        }
        if (campo === 'senha') {
            setSenha(evento.target.value);
            console.log(senha);
        }
        if (campo === 'senha') {
            setconfirmar_senha(evento.target.value);
            console.log(setconfirmar_senha);
        }


    }

    async function enviarCadastro(evento) {
        evento.preventDefault()
        const data = { nome, email, cpf, senha, confirmar_senha, id_cargo: 2 }
        console.log(data)
        

        api.post('/gestor', data)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    return (
        <div className={classes.container}>
            <CssBaseline/>
            <div className={classes.paper}>
                <form className={classes.form} noValidate onSubmit={enviarCadastro}>
                    <Input
                        type="text"
                        id="nome"
                        label="Insira o nome"
                        variant="outlined"
                        funcao={evento => cadastrarUsuario(evento, 'nome')} >
                    </Input>
                    <Input
                        type="email"
                        id="email"
                        label="E-mail"
                        variant="outlined"
                        funcao={evento => cadastrarUsuario(evento, 'email')} >
                    </Input>
                    <Input
                        type="text"
                        id="cpf"
                        label="CPF"
                        variant="outlined"
                        funcao={evento => cadastrarUsuario(evento, 'cpf')} >
                    </Input>
                    <Input
                        type="password"
                        id="senha"
                        label="Digite sua senha"
                        variant="outlined"
                        funcao={evento => cadastrarUsuario(evento, 'senha')} >
                    </Input>
                    <Input
                        type="password"
                        id="confirmasenha"
                        label="Confirmar senha"
                        variant="outlined"
                        funcao={evento => cadastrarUsuario(evento, 'confirmar_senha')} >
                    </Input>

                    <Button
                        size="medium"
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Cadastrar
                    </Button>

                </form>
            </div>
        </div >
    );
}