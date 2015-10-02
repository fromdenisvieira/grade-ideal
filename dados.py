#!/usr/bin/env python
# -*- coding: utf-8 -*-

import numpy as np
from scipy.sparse import *
from scipy import linalg
import disciplina

# Para melhor legibilidade
aulas_por_dia = 4
dias_por_semana = 5
qtd_disciplinas = 44
disc_inativas = set([0, 36, 41, 42])

'''
Colunas: disciplinas
Linhas: aulas em ordem cronológica (seg1-4,ter1-4, etc.)
Elementos: {
	0: sem aula da disciplina nesse dia
	1: com aula da disciplina nesse dia
	2: disciplina inativa ou não ofertada 
}
'''
horario = np.array([
	map(int, "200001000100000101000100000010000100201002200"),
	map(int, "200001000100000101000100000010000100201002200"),
	map(int, "210000000010010000100001000000101000200102200"),
	map(int, "210000000010010000100001000000101000200102200"),
	map(int, "201000100001000000010000011000010000200002210"),
	map(int, "201000100001000000010000011000010000200002210"),
	map(int, "210000000010100010000010000100000000210002201"),
	map(int, "210000000010100010000010000100000000210002201"),
	map(int, "200100000100001010000001000001010010200002200"),
	map(int, "200100000100001010000001000001010010200002200"),
	map(int, "200001010000000100010000100000100010201002200"),
	map(int, "200001010000000100010000100000100010201002200"),
	map(int, "201000100001000001000110000010001000200012200"),
	map(int, "201000100001000001000110000010001000200012200"),
	map(int, "200010010000001000001000001000000001200102200"),
	map(int, "200010010000001000001000001000000001200102200"),
	map(int, "200010001000010000001000010001000001210002200"),
	map(int, "200010001000010000001000010001000001210002200"),
	map(int, "200100001000100000100000100100000100200012200"),
	map(int, "200100001000100000100000100100000100200012200")
]).T

assert len(horario) == qtd_disciplinas + 1

'''
Matriz de dependências (MD), incluindo a disciplina nula (se o elemento a_ij == 1,
então a disciplina i depende da disciplina j,
caso contrário, a_ij == 0).
TODO: escolher o formato de matriz esparsa (http://docs.scipy.org/doc/scipy/reference/sparse.html#sparse-matrix-classes). 
'''
dependencias = np.array([
	map(int, "011111011100001001011010000010011011111000111"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000100010000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000010000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000001000100000000000100000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000100000000000000000100000000000000"),
	map(int, "000000000000010000000000100000000000000000000"),
	map(int, "000000000000000010000101000000000000000000000"),
	map(int, "000000000000000000000000000000100000000000000"),
	map(int, "000000000000000000000000100000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000100000000000000000000000000"),
	map(int, "000000000000000000000100000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000001000"),
	map(int, "000000000000000000000000001000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000001000000000000010000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000001000000000000000"),
	map(int, "000000000000000000000000000000000100000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000100000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000"),
	map(int, "000000000000000000000000000000000000000000000")
])

assert dependencias.shape == (qtd_disciplinas + 1, qtd_disciplinas + 1), "A matriz de dependências tem dimensões incorretas."
assert set(dependencias.flat) == set([0,1]), "A matriz de dependências contém valores inválidos."

# Histórico: lista de disciplinas em que o aluno foi aprovado
historico = csr_matrix(np.array(map(int, "100000000000000000000000000000000000000000000")))
# historico = csr_matrix(np.array(map(int, "111111111111111111011111110110000001000000011")))	# Allan Denis
# historico = csr_matrix(np.array(map(int, "111111111111111111111000000000000000000000000"))) # Arthur Novaes, Leilton
# historico = csr_matrix(np.array(map(int, "111111111111111111101111110000100000010000011"))) # Hercílio
# historico = csr_matrix(np.array(map(int, "111111111101101111111011000000000010000000000"))) # Ernande
# historico = csr_matrix(np.array(map(int, "111111111101101111111011000000000010000000000"))) # Bruno Antonelly
# historico = csr_matrix(np.array(map(int, "101101111111110101001011100110100001000000000"))) # Lucas
# historico = csr_matrix(np.array(map(int, "111101111111111111111111100000100000000000011"))) # Denis Vieira
# historico = csr_matrix(np.array(map(int, "111101111111110110101011100000100000000000010"))) # Kyo
# historico = csr_matrix(np.array(map(int, "111111101111111111111011100000000000000000000"))) # Nywton

assert historico.shape[1] == qtd_disciplinas + 1, "Histórico com tamanho incorreto."
assert set(historico.toarray()[0]) == set([0,1]), "O histórico contém valores inválidos."