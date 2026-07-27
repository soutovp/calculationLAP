/**
 * Abrevia números grandes em formatos legíveis (ex: 1K, 1.1M, 1B)
 *
 * @param {number} numero - O número a ser abreviado
 * @param {number} casasDecimais - Quantidade máxima de casas decimais (padrão: 1)
 * @returns {string} O número formatado com o sufixo apropriado
 */
function abreviarNumero(numero, casasDecimais = 1) {
	// Tratamento para entradas inválidas ou nulas
	if (typeof numero !== 'number' || isNaN(numero)) return '0';

	// Números menores que 1000 não precisam de sufixo
	if (Math.abs(numero) < 1000) {
		return numero.toString();
	}

	// Lista de sufixos para ordens de grandeza (Mil, Milhão, Bilhão, Trilhão, Quatrilhão, Quintilhão)
	const sufixos = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'];

	// Calcula em qual ordem de grandeza o número se enquadra (base 1000)
	let indice = Math.floor(Math.log10(Math.abs(numero)) / 3);

	// Garante que o índice não ultrapasse o último sufixo disponível
	if (indice >= sufixos.length) {
		indice = sufixos.length - 1;
	}

	// Calcula o valor reduzido (ex: 1.100.000 / 1.000.000 = 1.1)
	let valorFormatado = numero / Math.pow(10, indice * 3);

	// Arredonda para as casas decimais desejadas
	let valorArredondado = Number(valorFormatado.toFixed(casasDecimais));

	// Ajuste de borda: Se o arredondamento subir o valor para 1000 (ex: 999.950 -> 1000K), avança o sufixo para 1M
	if (Math.abs(valorArredondado) >= 1000 && indice < sufixos.length - 1) {
		indice++;
		valorFormatado = numero / Math.pow(10, indice * 3);
		valorArredondado = Number(valorFormatado.toFixed(casasDecimais));
	}

	return `${valorArredondado}${sufixos[indice]}`;
}
