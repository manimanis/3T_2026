/**
 * Highlight.js Syntax Definition for Tunisian Algorithmic Conventions (2024-2025)
 * Domaine : Pensée computationnelle et programmation (3ème Année & Bac)
 */

(function(root, factory) {
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
  const KEYWORDS = {
    keyword: [
      'ALGORITHME', 'DEBUT', 'FIN',
      'Si', 'Alors', 'Sinon', 'FinSi', 'Fin Si', 'Fin_Si',
      'Selon', 'Fin Selon', 'FinSelon',
      'Pour', 'de', 'à', 'Pas', 'Faire', 'Fin Pour', 'FinPour', 'Fin_Pour',
      'Tant que', 'Tantque', 'Fin Tant que', 'FinTantque', 'Fin_Tant_que',
      'Répéter', 'Jusqu\'à', 'Jusqua', 'Jusqu’à',
      'Fonction', 'Procédure', 'Retourner',
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
      'Arrondi', 'RacineCarré', 'RacineCarre', 'Aléa', 'Alea', 'Ent', 'Abs',
      // Caractères & Chaînes
      'Ord', 'Chr', 'Long', 'Pos', 'Convch', 'Estnum', 'Valeur', 'Sous_chaine', 'Effacer', 'Majus',
      // Opérateurs mots
      'Div', 'Mod', 'Non', 'Et', 'Ou'
    ]
  };

  const WORD_BOUNDARY_FR = '(?![a-zA-Z0-9_àâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ])';

  return {
    name: 'Algorithme (Conventions 2024)',
    aliases: ['algo', 'algorithme', 'pseudo-code'],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      // Mots-clés composés & accentués explicites
      {
        className: 'keyword',
        begin: new RegExp('(?:Répéter|Procédure|Jusqu[\'’]à|Jusqua|Fin\\s+Si|Fin\\s+Pour|Fin\\s+Tant\\s+que|Tant\\s+que)' + WORD_BOUNDARY_FR, 'i')
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
        beginKeywords: 'Fonction Procédure',
        end: /[:;\n(]/,
        excludeEnd: true,
        contains: [
          hljs.TITLE_MODE
        ]
      },
      {
        className: 'title.class',
        beginKeywords: 'ALGORITHME Algorithme',
        end: /$/
      },
      {
        className: 'symbol',
        begin: /@/
      }
    ]
  };
}));
