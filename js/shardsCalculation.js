/**
 * Mapeamento dos custos de Shards por sub-nível de Estrela (0.2 até 10.0)
 * Fonte: http://lastasylumplague.com/database/heroes-upgrade-requirements-antitoxins-stars-skill-badges/
 */
const STAR_SHARDS_COSTS = {
	0.2: 2,
	0.4: 2,
	0.6: 2,
	0.8: 2,
	'1.0': 2,
	1.2: 3,
	1.4: 3,
	1.6: 3,
	1.8: 3,
	'2.0': 3,
	2.2: 4,
	2.4: 4,
	2.6: 4,
	2.8: 4,
	'3.0': 4,
	3.2: 6,
	3.4: 6,
	3.6: 6,
	3.8: 6,
	'4.0': 6,
	4.2: 8,
	4.4: 8,
	4.6: 8,
	4.8: 8,
	'5.0': 8,
	5.2: 12,
	5.4: 12,
	5.6: 12,
	5.8: 12,
	'6.0': 12,
	6.2: 25,
	6.4: 25,
	6.6: 25,
	6.8: 25,
	'7.0': 25,
	7.2: 35,
	7.4: 35,
	7.6: 35,
	7.8: 35,
	'8.0': 35,
	8.2: 40,
	8.4: 40,
	8.6: 40,
	8.8: 40,
	'9.0': 40,
	9.2: 60,
	9.4: 60,
	9.6: 60,
	9.8: 60,
	'10.0': 60,
};

/**
 * Calcula a quantidade total de Shards necessárias para alcançar a quantidade desejada de estrelas.
 *
 * @param {number} estrelaAtual - Quantidade de estrelas atual do herói (ex: 5.2 ou 0)
 * @param {number} estrelaDesejada - Quantidade de estrelas desejada (ex: 6.8 ou 10)
 * @returns {object} Resultado com total de shards, valores formatados ou erro de validação
 */
function calcularShardsTotal(estrelaAtual, estrelaDesejada) {
	// Normalização para números inteiros (multiplicando por 10) para evitar bugs de ponto flutuante no JS
	const atualInt = Math.round(estrelaAtual * 10);
	const desejadaInt = Math.round(estrelaDesejada * 10);

	// 1. Validações de entrada
	if (isNaN(atualInt) || isNaN(desejadaInt)) {
		return { erro: 'Por favor, insira valores numéricos válidos.' };
	}

	if (atualInt < 0 || desejadaInt > 100) {
		return { erro: 'As estrelas devem estar no intervalo de 0.0 até 10.0.' };
	}

	if (atualInt % 2 !== 0 || desejadaInt % 2 !== 0) {
		return { erro: 'Os valores das estrelas devem ser múltiplos de 0.2 (ex: 0.2, 0.4, 5.2, etc.).' };
	}

	if (atualInt >= desejadaInt) {
		return { erro: 'A estrela desejada deve ser maior do que a estrela atual.' };
	}

	let totalShards = 0;

	// 2. Soma o custo de cada sub-nível de 0.2 em 0.2 (de +2 em +2 nos inteiros)
	for (let step = atualInt + 2; step <= desejadaInt; step += 2) {
		const starKey = (step / 10).toFixed(1);
		if (STAR_SHARDS_COSTS[starKey] !== undefined) {
			totalShards += STAR_SHARDS_COSTS[starKey];
		}
	}

	// 3. Retorno com detalhes
	return {
		estrelaAtual: (atualInt / 10).toFixed(1),
		estrelaDesejada: (desejadaInt / 10).toFixed(1),
		totalShards: totalShards,
		totalFormatado: totalShards.toLocaleString('pt-BR'),
		html: `<p>Para alcançar o total de <span style="color: red;">${(desejadaInt / 10).toFixed(1)} estrelas</span>, deverá gastar <span style="color: red;">${totalShards} fragmentos</span>.</p>`,
	};
}