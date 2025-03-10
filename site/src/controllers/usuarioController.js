const usuarioModel = require("../models/usuarioModel");

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function listarConta(req, res) {
    const idUser = req.params.id;

    usuarioModel.listarConta(idUser)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function minhaPoupanca(req, res) {
    const idUser = req.params.id;

    usuarioModel.minhaPoupanca(idUser)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function meuUsuario(req, res) {
    const idUser = req.params.id;

    usuarioModel.meuUsuario(idUser)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function atualizarImg(req, res) {
    const idUser = req.body.id;
    const img = req.body.img;

    usuarioModel.atualizarImg(idUser, img).then((response) => {
        const tamanho = response.affectedRows;

        if (tamanho > 0) {
            res.json({
                mensagem: "success",
            });
        } else {
            res.json({
                mensagem: "error",
            });
        }
    });
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function autenticarCpf(req, res) {
    var cpf = req.body.cpfServer;


    if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else {

        usuarioModel.autenticarCpf(cpf)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("cpf inválido");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo cpf!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao autenticar o cpf! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function updateSaldo(req, res) {
    var valorTrasfer = req.body.valorTrasferServer;
    var cpf = req.body.cpfServer;

    usuarioModel.updateSaldo(valorTrasfer, cpf)
        .then((response) => {
            const tamanho = response.affectedRows;

            if (tamanho > 0) {
                res.json({
                    mensagem: "success",
                });
            } else {
                res.json({
                    mensagem: "error",
                });
            }
        });
}

function updateSaldoAtual(req, res) {
    var valorTrasfer = req.body.valorTrasferServer;
    var cpfListar = req.body.cpfListarServer;

    usuarioModel.updateSaldoAtual(valorTrasfer, cpfListar)
        .then((response) => {
            const tamanho = response.affectedRows;

            if (tamanho > 0) {
                res.json({
                    mensagem: "success",
                });
            } else {
                res.json({
                    mensagem: "error",
                });
            }
        });
}

function updateSaldoPoupanca(req, res) {
    var valorTrasfer = req.body.valorTrasferServer;
    var cpf = req.body.cpfServer;

    usuarioModel.updateSaldoPoupanca(valorTrasfer, cpf)
        .then((response) => {
            const tamanho = response.affectedRows;

            if (tamanho > 0) {
                res.json({
                    mensagem: "success",
                });
            } else {
                res.json({
                    mensagem: "error",
                });
            }
        });
}

function jurosPoupanca(req, res) {
    var cpf = req.body.cpfServer;

    usuarioModel.jurosPoupanca(cpf)
        .then((response) => {
            const tamanho = response.affectedRows;

            if (tamanho > 0) {
                res.json({
                    mensagem: "success",
                });
            } else {
                res.json({
                    mensagem: "error",
                });
            }
        });
}

function resgatarPoupanca(req, res) {
    var valorTrasfer = req.body.valorTrasferServer;
    var cpf = req.body.cpfServer;

    usuarioModel.resgatarPoupanca(valorTrasfer, cpf)
        .then((response) => {
            const tamanho = response.affectedRows;

            if (tamanho > 0) {
                res.json({
                    mensagem: "success",
                });
            } else {
                res.json({
                    mensagem: "error",
                });
            }
        });
}


function resgatarPoupancaAtual(req, res) {
    var valorTrasfer = req.body.valorTrasferServer;
    var cpf = req.body.cpfServer;

    usuarioModel.resgatarPoupancaAtual(valorTrasfer, cpf)
        .then((response) => {
            const tamanho = response.affectedRows;

            if (tamanho > 0) {
                res.json({
                    mensagem: "success",
                });
            } else {
                res.json({
                    mensagem: "error",
                });
            }
        });
}

function updateNovoPoupanca(req, res) {
    var valorTrasfer = req.body.valorTrasferServer;
    var cpf = req.body.cpfServer;

    usuarioModel.updateNovoPoupanca(valorTrasfer, cpf)
        .then((response) => {
            const tamanho = response.affectedRows;

            if (tamanho > 0) {
                res.json({
                    mensagem: "success",
                });
            } else {
                res.json({
                    mensagem: "error",
                });
            }
        });
}

function extratoEnviado(req, res) {
    var dateExtrato = req.body.dateExtratoServer;
    var descExtrato = req.body.descExtratoServer;
    var fkConta = req.body.fkContaServer;

    usuarioModel.extratoEnviado(dateExtrato, descExtrato, fkConta)
        .then((response) => {
            const tamanho = response.affectedRows;

            if (tamanho > 0) {
                res.json({
                    mensagem: "success",
                });
            } else {
                res.json({
                    mensagem: "error",
                });
            }
        });
}

function returnFkCliente(req, res) {

    const cpf = req.params.cpfCliente;

    usuarioModel.listarConta(cpf)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function metrics1(req, res) {

    const fkConta = req.params.fkConta;

    usuarioModel.metrics1(fkConta)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function metrics2(req, res) {

    const fkConta = req.params.fkConta;

    usuarioModel.metrics2(fkConta)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function listarStatement(req, res) {

    const fkConta = req.params.fkConta;

    usuarioModel.listarStatement(fkConta)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function extratoRecebido(req, res) {
    var dateExtrato = req.body.dateExtratoServer;
    var descExtrato = req.body.descExtratoServer;
    var fkCliente2 = req.body.fkClienteServer2;

    usuarioModel.extratoRecebido(dateExtrato, descExtrato, fkCliente2)
        .then((response) => {
            const tamanho = response.affectedRows;

            if (tamanho > 0) {
                res.json({
                    mensagem: "success",
                });
            } else {
                res.json({
                    mensagem: "error",
                });
            }
        });
}


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var telefone = req.body.telefoneServer;
    var cpf = req.body.cpfServer;
    var nasc = req.body.nascServer;
    var email = req.body.emailServer;
    var email2 = req.body.emailServer2;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (nasc == undefined) {
        res.status(400).send("Sua data de nascimento está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (email2 == undefined) {
        res.status(400).send("Seu email de recuperação está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, telefone, cpf, nasc, email, email2, senha)
            .then((resultado) => {
                const tamanho = resultado.affectedRows;

                if (tamanho > 0) {

                    usuarioModel.listarUser(cpf).then((response) => {
                        const idUser = response[0].idCliente;

                        usuarioModel.saldoInicial(idUser).then((resEffect) => {

                            console.log(resEffect);
                            res.json(resEffect)
                        })
                        setTimeout(() => {
                            usuarioModel.saldoInicialPoupanca(idUser).then((resEffect) => {
                                console.log(resEffect);
                                res.json(resEffect)
                            })
                        }, "1500")

                    })
                }
            }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    autenticarCpf,
    updateSaldo,
    updateSaldoAtual,
    updateSaldoPoupanca,
    jurosPoupanca,
    resgatarPoupanca,
    resgatarPoupancaAtual,
    updateNovoPoupanca,
    extratoEnviado,
    returnFkCliente,
    metrics1,
    metrics2,
    listarStatement,
    extratoRecebido,
    cadastrar,
    listar,
    listarConta,
    meuUsuario,
    atualizarImg,
    minhaPoupanca,
    testar
}