function calcular() {
    //converter @ para Kg:
    var custoArroba = Number(input_custoArroba.value);
    var custoKg = custoArroba / 14.688;

    //valores pré-abate:
    var qtdM = Number(input_bovinosM.value);
    var qtdF = Number(input_bovinosF.value);

    //peso médio macho = Kg 588,9
    var kgTotalM = qtdM * 588.9;
    //peso médio fêmea = Kg 444,7
    var kgTotalF = qtdF * 444.7;

    /*  Cálculo de perda pré-abate:
    61 (Colômbia) + 60 (Uruguai) + 14,7 (Chile) + 10,3 (Brasil, Curitiba) + 54,2 (Brasil, Rio Grande do Sul) + 92 (México) / 6 = 48,7%
    
    */
    //O peso da carcaça equivale a 50% do peso do animal vivo
    var machoCarcacaKg = kgTotalM / 2;
    var femeaCarcacaKg = kgTotalF / 2;

    //Calculo de perda:
    /* A perda por carcaça equivale a 0,40% para fêmeas (900g a cada 222,35kg)
    e de 0,30% para os machos (900g a cada 294,45kg) */
    var carneMPerdidaKg = (machoCarcacaKg * 0.4807) * 0.0030;
    var carneFPerdidaKg = (femeaCarcacaKg * 0.4807) * 0.0040;
    var carnePerdidaKg = carneFPerdidaKg + carneMPerdidaKg;
    var dinheiroPerdido = carnePerdidaKg * custoKg;
    var queDeixaDePerder = dinheiroPerdido * 0.25;


resultados.innerHTML = `
    <p><i style="color: red">Em média, 48,7% dos seus animais se lesionam durante o transporte</i> </p>
    <p>Levando em consideração que uma carcaça vale metade do peso do animal vivo. </p>
    <p>A quantidade de carne que seus bovinos machos renderiam normalmente é de <b>${machoCarcacaKg.toFixed(3)}kg</b> ou <b>${(machoCarcacaKg / 14.688).toFixed(2)}</b> arroba. No entanto, considerando que por conta do estresse causado durante o transporte estes bovinos sofreram lesões tornando em média 0,30% de sua carne inválida para consumo, a carga final se torna <b>${(machoCarcacaKg - carneMPerdidaKg).toFixed(3)}Kg</b> ou <b>${((machoCarcacaKg - carneMPerdidaKg) / 15).toFixed(2)}</b> arroba (perda de <b>${carneMPerdidaKg.toFixed(3)}kg</b> ou <b>${(carneMPerdidaKg / 15).toFixed(2)}</b> arroba). </p>
    <p>A quantidade de carne que seus bovinos fêmeas renderiam normalmente é de <b>${femeaCarcacaKg.toFixed(3)}Kg</b> ou <b>${(femeaCarcacaKg / 14.688).toFixed(2)}</b> arroba. No entanto, considerando que por conta do estresse causado durante o transporte estes bovinos sofreram lesões tornando em média 0,40% de sua carne inválida para consumo, a carga final se torna <b>${(femeaCarcacaKg - carneFPerdidaKg).toFixed(3)}Kg</b> ou <b>${((femeaCarcacaKg - carneFPerdidaKg) / 15).toFixed(2)}</b> arroba (perda de <b>${carneFPerdidaKg.toFixed(3)}kg</b> ou <b>${(carneFPerdidaKg / 15).toFixed(2)}</b> arroba). </p>
    
    <p>Sendo assim, mensalmente, sua empresa tem uma perda de <b>${carnePerdidaKg.toFixed(3)}Kg</b> de carne, ou <b>${(carnePerdidaKg / 14.688).toFixed(2)}</b> arroba.
    O que equivale em dinheiro, um prejuízo de <b>R$${dinheiroPerdido.toFixed(2)}</b> mensalmente, e <b>R$${(dinheiroPerdido * 12).toFixed(2)}</b> anualmente por conta de lesões causadas por estresse no pré-abate.</p>

    <p>Com a <u style="color: blue">TechMoovers</u>, sua empresa deixará de perder mensalmente <b>R$${queDeixaDePerder.toFixed(2)}</b> e <b>R$${(queDeixaDePerder * 12).toFixed(2)}</b> anualmente baseado na diminuição da oscilação de temperatura e umidade do ar.</p>
    `

    var transportePosAbate = (machoCarcacaKg + femeaCarcacaKg) - carnePerdidaKg;
    var perdaTransportePosAbate = transportePosAbate * 0.06;
    var perdaTransportePosAbateDinheiro = perdaTransportePosAbate * 46.16;
    var deixaPerdaTransportePosAbateDinheiro = perdaTransportePosAbateDinheiro * 0.65;

    resultados.innerHTML += `
    <p>Considerando que durante o transporte pós-abate se perde em média 6% da carga, sua empresa perde <b>${perdaTransportePosAbate.toFixed(3)}Kg</b> de carne ou <b>${(perdaTransportePosAbate / 14.688).toFixed(2)}</b> arroba. Perda que equivale a <b>R$${perdaTransportePosAbateDinheiro.toFixed(2)}</b> mensalmente e <b>R$${(perdaTransportePosAbateDinheiro * 12).toFixed(2)}</b> anualmente</p>
    <p>Com a <u style="color: blue">TechMoovers</u>, sua empresa deixará de perder mensalmente <b>R$${deixaPerdaTransportePosAbateDinheiro.toFixed(2)}</b>, e <b>R$${(deixaPerdaTransportePosAbateDinheiro * 12).toFixed(2)}</b> anualmente.</p>
    `

    var armazenamento = transportePosAbate - perdaTransportePosAbate;
    var perdaArmazenamento = armazenamento * 0.03;
    var perdaArmazenamentoDinheiro = perdaArmazenamento * 46.16;
    var deixaPerdaArmazenamentoDinheiro = perdaArmazenamentoDinheiro * 0.65;
    var perdaTotal = perdaArmazenamentoDinheiro + perdaTransportePosAbateDinheiro + dinheiroPerdido;
    var deixaPerdaTotal = deixaPerdaArmazenamentoDinheiro + deixaPerdaTransportePosAbateDinheiro + queDeixaDePerder;

    resultados.innerHTML += `
    <p>Considerando que durante o armazenamento pós abate se perde em média 3% da carga, sua empresa perde <b>${perdaArmazenamento.toFixed(3)}kg</b> de carne ou <b>${(perdaArmazenamento / 14.688).toFixed(2)}</b> arroba. Perda que equivale em dinheiro à <b>${perdaArmazenamentoDinheiro.toFixed(2)}</b> mensalmente e <b>${(perdaArmazenamentoDinheiro * 12).toFixed(2)}</b> anualmente.</p>
    
    <p>Contratando nosso serviço, sua empresa deixa de perder mensalmente </b>R$${deixaPerdaArmazenamentoDinheiro.toFixed(2)}</b> e </b>R$${(deixaPerdaArmazenamentoDinheiro * 12).toFixed(2)}</b> anualmente.</p> <br>
    <h2>No total...</h2>
    <h2>Mensalmente sua empresa perde:<br>
    <u style="color: red"><b>R$${(perdaTotal).toFixed(2)}</b></u></h2>

    <h2>Anualmente sua empresa perde:<br>
    <u style="color: red"><b>R$${(perdaTotal * 12).toFixed(2)}</b></u></h2> <br>

    <h2>Contratando nosso serviço. No total...</h2>
    <h2>Mensalmente sua empresa deixa de perder:<br>
    <u style="color: green"><b>R$${(deixaPerdaTotal).toFixed(2)}</b></u></h2>

    <h2>Anualmente sua empresa deixa de perder:<br>
    <u style="color: green"><b>R$${(deixaPerdaTotal * 12).toFixed(2)}</b></u></h2> <br>
    
    <button onclick="recomecar()">Recomeçar</button>
    `
}
function recomecar() {
    resultados.innerHTML = ""
}