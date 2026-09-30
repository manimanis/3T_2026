/**
 * Highlight.js Syntax Definition for Tunisian Algorithmic Conventions (2024-2025)
 * Domaine : Pensée computationnelle et programmation (3ème Année & Bac)
 */

(function (root, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory;
  }

  var targetHljs = (typeof window !== 'undefined' && window.hljs) ? window.hljs : (root && root.hljs ? root.hljs : null);
  if (targetHljs && typeof targetHljs.registerLanguage === 'function') {
    targetHljs.registerLanguage('algorithm', factory);
    targetHljs.registerLanguage('algo', factory);
    targetHljs.registerLanguage('algorithme', factory);
  }
}(typeof window !== 'undefined' ? window : this, function hljsAlgorithmLanguage(hljs) {
  const WORD_CHARS = 'a-zA-Z0-9_àâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ';
  const WORD_BOUNDARY_FR = `(?![${WORD_CHARS}])`;

  const KEYWORDS = {
    $pattern: new RegExp(`[${WORD_CHARS}]+|Jusqu['’]à`, 'i'),
    keyword: [
      'ALGORITHME', 'Algorithme', 'DEBUT', 'Début', 'Debut', 'FIN', 'Fin',
      'Si', 'Alors', 'Sinon', 'FinSi', 'Fin Si', 'Fin_Si',
      'Selon', 'FinSelon', 'Fin Selon', 'Fin_Selon',
      'Pour', 'de', 'à', 'Pas', 'Faire', 'Fin Pour', 'FinPour', 'Fin_Pour',
      'Tant que', 'Tantque', 'Fin Tant que', 'FinTantque', 'Fin_Tant_que',
      'Répéter', 'Repeter', 'Jusqu\'à', 'Jusqua', 'Jusqu’à',
      'Fonction', 'Procédure', 'Procedure', 'Retourner',
      'Tableau', 'Enregistrement', 'Fichier', 'Structure'
    ],
    type: [
      'Entier', 'Réel', 'Reel', 'Booléen', 'Booleen', 'Caractère', 'Caractere',
      'Chaîne', 'Chaine', 'Texte', 'lignes', 'colonnes'
    ],
    literal: [
      'Vrai', 'Faux'
    ],
    built_in: [
      // Entrées / Sorties et Fichiers
      'Lire', 'Écrire', 'Ecrire', 'Écrire_nl', 'Ecrire_nl', 'Lire_ligne',
      'Ouvrir', 'Fermer', 'Fin_fichier',
      // Mathématiques
      'Arrondi', 'RacineCarré', 'RacineCarre', 'Racine', 'Aléa', 'Alea', 'Ent', 'Abs',
      // Caractères & Chaînes
      'Ord', 'Chr', 'Long', 'Pos', 'Convch', 'Estnum', 'Valeur', 'Sous_chaine', 'Effacer', 'Majus',
      // Opérateurs mots
      'Div', 'Mod', 'Non', 'Et', 'Ou'
    ]
  };

  return {
    name: 'Algorithme (Conventions 2024)',
    aliases: ['algo', 'algorithme', 'pseudo-code'],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.HASH_COMMENT_MODE,
      hljs.COMMENT('--', '$'),
      // Mots-clés composés & accentués explicites
      {
        className: 'keyword',
        begin: new RegExp('(?:Début|Debut|Répéter|Repeter|Procédure|Procedure|Jusqu[\'’]à|Jusqua|Fin\\s+Si|Fin\\s+Selon|Fin\\s+Pour|Fin\\s+Tant\\s+que|Tant\\s+que)' + WORD_BOUNDARY_FR, 'i')
      },
      {
        className: 'type',
        begin: new RegExp('(?:Réel|Booléen|Caractère|Chaîne)' + WORD_BOUNDARY_FR, 'i')
      },
      {
        className: 'built_in',
        begin: new RegExp('(?:Écrire_nl|Écrire|RacineCarré|Aléa)' + WORD_BOUNDARY_FR, 'i')
      },
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: /'[^'\\]'/
      },
      hljs.C_NUMBER_MODE,
      {
        className: 'operator',
        begin: /←|<-|≠|>=|<=|>|<|=|≥|≤|∈|\+|\-|\*|\//
      },
      {
        className: 'function',
        beginKeywords: 'Fonction Procédure Procedure',
        end: /[:;\n(]/,
        excludeEnd: true,
        contains: [
          hljs.TITLE_MODE
        ]
      },
      {
        className: 'title.class',
        begin: /(?:Algorithme|ALGORITHME)\s+([a-zA-Z0-9_àâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ]+)/i,
        returnBegin: true,
        end: /$/m,
        contains: [
          {
            className: 'keyword',
            begin: /Algorithme|ALGORITHME/i
          },
          {
            className: 'title.class',
            begin: new RegExp('[a-zA-Z_àâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ][a-zA-Z0-9_àâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ]*')
          }
        ]
      },
      {
        className: 'symbol',
        begin: /@/
      }
    ]
  };
}));
