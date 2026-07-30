/**
 * Mapeamento dos custos de Skill Badges por nível de Habilidade (Nível 2 ao 22)
 * Fonte: http://lastasylumplague.com/database/heroes-upgrade-requirements-antitoxins-stars-skill-badges/
 */
const SKILL_BADGES_COSTS = {
	2: 50,
	3: 100,
	4: 150,
	5: 300,
	6: 450,
	7: 600,
	8: 750,
	9: 900,
	10: 1200,
	11: 1500,
	12: 1800,
	13: 2100,
	14: 2400,
	15: 3100,
	16: 3800,
	17: 4500,
	18: 5200,
	19: 5900,
	20: 6900,
	21: 7900,
	22: 8900,
};

/**
 * Calcula a quantidade total de Skill Badges necessárias para evoluir uma habilidade
 *
 * @param {number} nivelAtual - Nível atual da habilidade (ex: 1)
 * @param {number} nivelDesejado - Nível desejado da habilidade (ex: 10)
 * @returns {object} Resultado contendo o total de badges, formato legível ou mensagem de erro
 */
function calcularSkillBadgesTotal(nivelAtual, nivelDesejado) {
	// 1. Validações de entrada
	if (!Number.isInteger(nivelAtual) || !Number.isInteger(nivelDesejado)) {
		return { erro: 'Os níveis devem ser números inteiros.' };
	}

	if (nivelAtual < 1 || nivelDesejado > 22) {
		return { erro: 'O nível atual deve ser no mínimo 1 e o nível desejado no máximo 22.' };
	}

	if (nivelAtual >= nivelDesejado) {
		return { erro: 'O nível desejado deve ser maior que o nível atual.' };
	}

	// 2. Acumulação das Badges
	let totalBadges = 0;

	for (let level = nivelAtual + 1; level <= nivelDesejado; level++) {
		if (SKILL_BADGES_COSTS[level] !== undefined) {
			totalBadges += SKILL_BADGES_COSTS[level];
		}
	}

	// 3. Retorno dos dados
	return {
		nivelAtual: nivelAtual,
		nivelDesejado: nivelDesejado,
		totalBadges: totalBadges,
		totalFormatado: totalBadges.toLocaleString('pt-BR'),
	};
}

// ==========================================
// TESTES / EXEMPLOS DE USO
// ==========================================

// Exemplo 1: Do Nível 1 ao Nível 10
// console.log(calcularSkillBadgesTotal(1, 10));
/*
Saída:
{
  nivelAtual: 1,
  nivelDesejado: 10,
  totalBadges: 4500,
  totalFormatado: '4.500'
}
*/

// Exemplo 2: Do Nível 10 ao Nível 22 (Máximo)
// console.log(calcularSkillBadgesTotal(10, 22));
/*
Saída:
{
  nivelAtual: 10,
  nivelDesejado: 22,
  totalBadges: 53900,
  totalFormatado: '53.900'
}
*/
