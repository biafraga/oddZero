/* ═══════════════════════════════
   LÓGICA DO SIMULADOR
═══════════════════════════════ */
let contas = [];
let lazeres = [];
let ultimoResultado = {};

function adicionarConta() {
    const descricao = document.getElementById("descricaoConta").value;
    const valor = Number(document.getElementById("valorConta").value);

    if(!descricao || valor <= 0) {
        alert("Preencha os dados da conta corretamente.");
        return;
    }
    contas.push({ descricao, valor });
    atualizarListaContas();
    document.getElementById("descricaoConta").value = "";
    document.getElementById("valorConta").value = "";
}

function atualizarListaContas() {
    const lista = document.getElementById("listaContas");
    lista.innerHTML = "";
    contas.forEach(conta => {
        lista.innerHTML += `<div class="itemLista"><span>${conta.descricao}</span> <span>R$ ${conta.valor.toFixed(2)}</span></div>`;
    });
}

function adicionarLazer() {
    const descricao = document.getElementById("descricaoLazer").value;
    const valor = Number(document.getElementById("valorLazer").value);

    if(!descricao || valor <= 0) {
        alert("Preencha os dados do lazer corretamente.");
        return;
    }
    lazeres.push({ descricao, valor });
    atualizarListaLazer();
    document.getElementById("descricaoLazer").value = "";
    document.getElementById("valorLazer").value = "";
}

function atualizarListaLazer() {
    const lista = document.getElementById("listaLazer");
    lista.innerHTML = "";
    lazeres.forEach(item => {
        lista.innerHTML += `<div class="itemLista"><span>${item.descricao}</span> <span>R$ ${item.valor.toFixed(2)}</span></div>`;
    });
}

function gerarItemGacha() {
    const sorteio = Math.random();
    if(sorteio <= 0.70) return { tipo: "comum", valorMercado: 0 };
    if(sorteio <= 0.92) return { tipo: "emocional", valorMercado: 0 };
    return { tipo: "financeiro", valorMercado: Math.floor(Math.random() * 70) + 10 };
}

function obterChance(tipo) {
    if(tipo === "esportiva") return 0.45;
    if(tipo === "cassino") return 0.40;
    return 0;
}

function obterMultiplicador(tipo) {
    if(tipo === "esportiva") return 2;
    if(tipo === "cassino") return 1.8;
    return 0;
}

function gerarTextoPsicologico(ganho, perda) {
    if(perda > ganho * 2) return "As perdas aumentaram a frustração e a vontade de recuperar o dinheiro.";
    if(ganho > perda) return "As pequenas vitórias criaram sensação de confiança e falsa sensação de controle.";
    return "Mesmo sem grandes ganhos, o comportamento automático de apostar continuou.";
}

function identificarPerfil(apostasDia, percentualPerdido) {
    if(apostasDia <= 1 && percentualPerdido < 10) return "Controlado (Atenção)";
    if(percentualPerdido < 30) return "Moderado (Risco crescente)";
    return "Impulsivo (Alto Risco de Dependência)";
}

function simular() {
    const salario = Number(document.getElementById("salario").value);
    const tipo = document.getElementById("tipoAposta").value;
    const valorAposta = Number(document.getElementById("valorAposta").value);
    const apostasDia = Number(document.getElementById("apostasDia").value);
    const periodo = Number(document.getElementById("periodo").value);

    if(!salario || !valorAposta) {
        alert("Preencha o Salário e o Valor da Aposta.");
        return;
    }

    let totalContas = contas.reduce((acc, item) => acc + item.valor, 0);
    let totalLazer = lazeres.reduce((acc, item) => acc + item.valor, 0);
    let saldo = salario - totalContas - totalLazer;
    let saldoInicial = saldo;

    let totalApostado = 0;
    let totalGanho = 0;
    let valorMercadoTotal = 0;
    let vitorias = 0;
    let derrotas = 0;
    let totalApostasRealizadas = 0;
    let log = [];
    let chance = obterChance(tipo);
    let multiplicador = obterMultiplicador(tipo);

    if(periodo <= 30) {
        for(let dia = 1; dia <= periodo; dia++) {
            let ganhoDia = 0, perdaDia = 0, apostasHoje = 0, emocionais = 0, financeiros = 0;

            for(let aposta = 1; aposta <= apostasDia; aposta++) {
                if(saldo <= 0) break;
                apostasHoje++;
                totalApostasRealizadas++;
                saldo -= valorAposta;
                totalApostado += valorAposta;
                perdaDia += valorAposta;

                if(tipo === "gacha") {
                    const item = gerarItemGacha();
                    if(item.tipo === "emocional") emocionais++;
                    if(item.tipo === "financeiro") {
                        financeiros++;
                        saldo += item.valorMercado;
                        ganhoDia += item.valorMercado;
                        valorMercadoTotal += item.valorMercado;
                        totalGanho += item.valorMercado;
                    }
                    vitorias++;
                } else {
                    if(Math.random() <= chance) {
                        let premio = valorAposta * multiplicador;
                        saldo += premio;
                        ganhoDia += premio;
                        totalGanho += premio;
                        vitorias++;
                    } else {
                        derrotas++;
                    }
                }
            }

            let textoPsicologico = gerarTextoPsicologico(ganhoDia, perdaDia);
            let textoEspecial = tipo === "gacha" ? 
                (financeiros > 0 ? `Obteve retorno de R$ ${ganhoDia.toFixed(2)}` : "Ganhos apenas emocionais (raridade), sem retorno.") : 
                `Retorno real no dia: R$ ${ganhoDia.toFixed(2)}`;

            log.push(`<b>[DIA ${dia}]</b><br>• Gastou R$ ${perdaDia.toFixed(2)} em ${apostasHoje} apostas.<br>• ${textoEspecial}<br>• ${textoPsicologico}`);
        }
    } else {
        let meses = periodo / 30;
        for(let mes = 1; mes <= meses; mes++) {
            let ganhoMes = 0, perdaMes = 0, apostasMes = 0, emocionais = 0, financeiros = 0;

            for(let dia = 1; dia <= 30; dia++) {
                for(let aposta = 1; aposta <= apostasDia; aposta++) {
                    if(saldo <= 0) break;
                    apostasMes++;
                    totalApostasRealizadas++;
                    saldo -= valorAposta;
                    totalApostado += valorAposta;
                    perdaMes += valorAposta;

                    if(tipo === "gacha") {
                        const item = gerarItemGacha();
                        if(item.tipo === "emocional") emocionais++;
                        if(item.tipo === "financeiro") {
                            financeiros++;
                            saldo += item.valorMercado;
                            ganhoMes += item.valorMercado;
                            valorMercadoTotal += item.valorMercado;
                            totalGanho += item.valorMercado;
                        }
                        vitorias++;
                    } else {
                        if(Math.random() <= chance) {
                            let premio = valorAposta * multiplicador;
                            saldo += premio;
                            ganhoMes += premio;
                            totalGanho += premio;
                            vitorias++;
                        } else {
                            derrotas++;
                        }
                    }
                }
            }

            let textoPsicologico = gerarTextoPsicologico(ganhoMes, perdaMes);
            let textoEspecial = tipo === "gacha" ? 
                `Retorno no mercado: R$ ${ganhoMes.toFixed(2)}` : 
                `Retorno da banca: R$ ${ganhoMes.toFixed(2)}`;

            log.push(`<b>[MÊS ${mes}]</b><br>• Gastou R$ ${perdaMes.toFixed(2)} em ${apostasMes} apostas.<br>• ${textoEspecial}<br>• ${textoPsicologico}`);
        }
    }

    let perdaTotal = totalApostado - totalGanho;
    let percentualPerdido = (perdaTotal / salario) * 100;
    let perfilIdentificado = identificarPerfil(apostasDia, percentualPerdido);

    let contasPossiveis = contas.filter(conta => perdaTotal >= conta.valor);
    let contasTexto = "";

    if(contasPossiveis.length > 0) {
        contasTexto += `<div class="alerta"><h3>⚠️ Dano Colateral</h3><p style="border:none">Sua perda total poderia ter pago as seguintes contas:</p><ul>`;
        contasPossiveis.forEach(conta => {
            contasTexto += `<li>❌ ${conta.descricao} — R$ ${conta.valor.toFixed(2)}</li>`;
        });
        contasTexto += `</ul></div>`;
    }

    // Oculta o placeholder e exibe os resultados na UI do OddZero
    document.getElementById("placeholder-resultado").style.display = "none";
    document.getElementById("resultado").style.display = "block";
    document.getElementById("botoesAcao").style.display = "grid";

    document.getElementById("resultado").innerHTML = `
        <div class="sim-box" style="border-color: ${saldo >= saldoInicial ? 'var(--lime)' : 'var(--red)'}">
            <h3>Resumo Final da Simulação</h3>
            <p><span>Saldo Inicial Livre:</span> <span>R$ ${saldoInicial.toFixed(2)}</span></p>
            <p><span>Saldo Final:</span> <span class="${saldo >= saldoInicial ? 'positivo' : 'negativo'}">R$ ${saldo.toFixed(2)}</span></p>
        </div>

        <div class="resumo">
            <h3>Dossiê de Apostas</h3>
            <p><span>Total gasto na plataforma:</span> <strong>R$ ${totalApostado.toFixed(2)}</strong></p>
            <p><span>Total que "voltou":</span> <strong>R$ ${totalGanho.toFixed(2)}</strong></p>
            <p><span>Perda Financeira Real:</span> <span class="negativo">R$ ${perdaTotal.toFixed(2)}</span></p>
            <p><span>Percentual do seu salário evaporado:</span> <span class="negativo">${percentualPerdido.toFixed(1)}%</span></p>
            <p><span>Vitórias da Ilusão:</span> <strong>${vitorias}</strong></p>
            <p><span>Derrotas Reais:</span> <span class="negativo">${derrotas}</span></p>
            <p><span>Volume (Apostas feitas):</span> <strong>${totalApostasRealizadas} rodadas/giros</strong></p>
        </div>

        ${contasTexto}

        <div class="resumo">
            <h3>Diagnóstico do Algoritmo</h3>
            <p><span>Perfil Identificado:</span> <strong style="color:var(--orange)">${perfilIdentificado}</strong></p>
            <p style="font-size:12px; color:var(--muted); border:none; line-height:1.4; margin-top:10px;">Metodologia: As odds aplicadas simulam um RTP (Return to Player) e house edge programados das bancas, projetando perdas reais baseadas na frequência.</p>
        </div>

        <h3 style="font-family:var(--font-h); font-size: 20px; text-transform:uppercase; margin-bottom: 12px; color:var(--white);">Relatório de Psicologia e Caixa</h3>
        <div class="log">
            ${log.join("<hr>")}
        </div>
    `;

    ultimoResultado = { salario, saldoInicial, saldoFinal: saldo, totalContas, totalLazer, totalApostado, totalGanho, perdaTotal, percentualPerdido, totalApostasRealizadas, vitorias, derrotas, perfilIdentificado, tipo, periodo };
}

function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.setFillColor(232, 50, 10);
    pdf.rect(0, 0, 210, 25, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.text("DOSSIÊ DE IMPACTO - ODDZERO", 20, 16);
    pdf.setTextColor(0, 0, 0);

    let y = 40;
    const dataAtual = new Date().toLocaleString("pt-BR");
    pdf.setFontSize(10);
    pdf.text("Data da simulação: " + dataAtual, 20, y);
    y += 15;

    pdf.setFontSize(14);
    pdf.text("RESULTADO MATEMÁTICO E FINANCEIRO", 20, y);
    y += 10;
    pdf.setFontSize(11);
    pdf.text("Salário: R$ " + ultimoResultado.salario.toFixed(2), 25, y); y += 8;
    pdf.text("Contas Básicas: R$ " + ultimoResultado.totalContas.toFixed(2), 25, y); y += 8;
    pdf.text("Saldo Inicial Livre: R$ " + ultimoResultado.saldoInicial.toFixed(2), 25, y); y += 8;
    pdf.text("Saldo Final Pós-Apostas: R$ " + ultimoResultado.saldoFinal.toFixed(2), 25, y); y += 15;

    pdf.setFontSize(14);
    pdf.text("O CUSTO DA ILUSÃO", 20, y);
    y += 10;
    pdf.setFontSize(11);
    pdf.text("Total injetado na plataforma: R$ " + ultimoResultado.totalApostado.toFixed(2), 25, y); y += 8;
    pdf.text("Perda Real Absorvida: R$ " + ultimoResultado.perdaTotal.toFixed(2), 25, y); y += 15;

    pdf.setFontSize(14);
    pdf.text("DIAGNÓSTICO E PERFIL", 20, y);
    y += 10;
    pdf.setFontSize(11);
    pdf.text("Perfil Identificado: " + ultimoResultado.perfilIdentificado, 25, y);

    pdf.save("Dossie_OddZero_Simulacao.pdf");
}

function compartilharWhatsapp() {
    const texto = encodeURIComponent("Fiz a simulação no OddZero. O resultado foi brutal: a longo prazo, o algoritmo ganha e minha conta zera. A odd real é zero. Veja o impacto das apostas em: oddzero.com.br");
    window.open("https://wa.me/?text=" + texto, "_blank");
}
