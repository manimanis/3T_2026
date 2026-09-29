import os
import re
import shutil
import subprocess
import zipfile
import xml.etree.ElementTree as ET

WORKSPACE_DIR = r"c:\xampp-school\htdocs\3T_2026"
SOFFICE_PATH = r"C:\Program Files\LibreOffice\program\soffice.exe"
USER_INSTALL = "-env:UserInstallation=file:///C:/Users/LENOVO/AppData/Local/Temp/lo_tmp_s03"

OUT_DIR = os.path.join(WORKSPACE_DIR, "docs", "séance03")
os.makedirs(OUT_DIR, exist_ok=True)

target_odt = os.path.join(OUT_DIR, "seance03.odt")
extract_dir = os.path.join(WORKSPACE_DIR, "temp_gen_s03")
if os.path.exists(extract_dir):
    shutil.rmtree(extract_dir)
os.makedirs(extract_dir)

# HTML source following mise_en_page.md specifications
html_doc = r"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Séance 3 : TP Évalué N°1 — Contrôle de saisie &amp; Boucle Tant Que sur Machine</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 12mm 8mm 12mm;
    }
    body {
      font-family: 'Book Antiqua', serif;
      font-size: 11pt;
      line-height: 1.15;
      color: #0f172a;
      margin: 0;
      padding: 0;
    }
    p {
      font-family: 'Book Antiqua', serif;
      font-size: 11pt;
      line-height: 1.15;
      margin-top: 0.06cm;
      margin-bottom: 0.06cm;
    }
    .header-bar {
      border-bottom: 2pt solid #d97706;
      padding-bottom: 2pt;
      margin-bottom: 3pt;
      text-align: center;
    }
    .top-meta {
      font-size: 8.5pt;
      color: #64748b;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 0.5px;
      margin-bottom: 1pt;
      font-family: 'Book Antiqua', serif;
      text-align: center;
    }
    h1 {
      font-family: 'Ink Free', cursive, sans-serif;
      font-size: 24pt;
      font-weight: bold;
      color: #0f172a;
      margin-top: 0.15cm;
      margin-bottom: 0.06cm;
      text-align: center;
    }
    .subtitle {
      font-size: 10.5pt;
      color: #334155;
      font-style: italic;
      margin-bottom: 3pt;
      font-family: 'Book Antiqua', serif;
      text-align: center;
    }
    .badges-line {
      margin-bottom: 3pt;
      text-align: center;
    }
    .badge {
      display: inline-block;
      padding: 1.5pt 5pt;
      font-size: 8pt;
      font-weight: bold;
      border-radius: 3pt;
      margin-right: 3pt;
      font-family: 'Book Antiqua', serif;
    }
    .b-blue { background-color: #dbeafe; color: #1e40af; border: 0.5pt solid #bfdbfe; }
    .b-cyan { background-color: #cffafe; color: #155e75; border: 0.5pt solid #a5f3fc; }
    .b-green { background-color: #dcfce7; color: #166534; border: 0.5pt solid #bbf7d0; }
    .b-amber { background-color: #fef3c7; color: #92400e; border: 0.5pt solid #fde68a; }

    h2 {
      font-family: 'Cambria', serif;
      font-size: 17pt;
      font-weight: bold;
      color: #1e3a8a;
      margin-top: 0.12cm;
      margin-bottom: 0.06cm;
      padding-bottom: 1pt;
      border-bottom: 0.8pt solid #cbd5e1;
      page-break-after: avoid;
    }
    h3 {
      font-family: 'Bernard MT Condensed', sans-serif;
      font-size: 15pt;
      font-weight: normal;
      color: #0f172a;
      margin-top: 0.12cm;
      margin-bottom: 0.06cm;
      page-break-after: avoid;
    }
    h4 {
      font-family: 'Arno Pro', serif;
      font-size: 13pt;
      font-weight: bold;
      color: #1e293b;
      margin-top: 0.1cm;
      margin-bottom: 0.04cm;
      page-break-after: avoid;
    }

    p.callout-rule, p.callout-consignes {
      background-color: #fffbeb;
      border-left: 3.5pt solid #f59e0b;
      padding: 3pt 5pt;
      margin-top: 0.08cm;
      margin-bottom: 0.08cm;
      line-height: 1.15;
    }
    p.callout-synthesis {
      background-color: #f0f9ff;
      border-left: 3.5pt solid #0ea5e9;
      padding: 3pt 5pt;
      margin-top: 0.08cm;
      margin-bottom: 0.08cm;
      line-height: 1.15;
    }
    p.cahier-box {
      background-color: #f8fafc;
      border: 0.8pt dashed #94a3b8;
      padding: 2.5pt 4.5pt;
      font-size: 9.5pt;
      color: #475569;
      font-style: italic;
      margin-top: 0.08cm;
      margin-bottom: 0.08cm;
      line-height: 1.15;
    }

    pre {
      background-color: #f8fafc;
      border: 0.5pt solid #cbd5e1;
      padding: 2.5pt 4.5pt;
      font-family: 'Consolas', monospace;
      font-size: 10pt;
      line-height: 1.15;
      margin-top: 0cm;
      margin-bottom: 0cm;
    }
    code {
      font-family: 'Consolas', monospace;
      font-size: 10pt;
      background-color: #f1f5f9;
      padding: 0.5pt 2pt;
      color: #0f172a;
    }

    table {
      width: 100%;
      margin: 0.06cm auto;
      border-collapse: collapse;
      border: 0.5pt solid #000000;
      font-size: 10pt;
      font-family: 'Book Antiqua', serif;
    }
    th, td {
      border: 0.5pt solid #000000;
      padding: 1.8pt 3pt;
      text-align: left;
    }
    th {
      background-color: #f1f5f9;
      font-weight: bold;
      color: #0f172a;
    }
    .text-center { text-align: center; }
    .empty-dots { color: #94a3b8; font-style: italic; letter-spacing: 1.5px; }

    ol, ul {
      margin-top: 0.03cm;
      margin-bottom: 0.03cm;
      padding-left: 14pt;
      font-family: 'Book Antiqua', serif;
      font-size: 11pt;
    }
    li {
      margin-bottom: 0.8pt;
      line-height: 1.15;
    }
    .img-box {
      text-align: center;
      margin: 1.5pt 0 1pt 0;
      page-break-inside: avoid;
    }
    .img-box img {
      width: 135mm;
      max-width: 100%;
      height: auto;
      border: 0.8pt solid #cbd5e1;
    }
    .img-caption {
      font-size: 8.5pt;
      color: #64748b;
      font-style: italic;
      text-align: center;
      margin-top: 0.5pt;
      margin-bottom: 1pt;
      font-family: 'Book Antiqua', serif;
    }
  </style>
</head>
<body>

  <!-- =========================================================================
       PAGE 1 : EN-TÊTE OFFICIEL, CONSIGNES & PALIER SOCLE (Figure 1)
       ========================================================================= -->
  <div class="header-bar">
    <div class="top-meta">République Tunisienne · Ministère de l'Éducation — 3<sup>e</sup> Année Secondaire (Sciences)</div>
    <h1>Séance 3 : TP Évalué N°1 — Contrôle de saisie &amp; Boucle Tant Que sur Machine</h1>
    <div class="subtitle">Évaluation pratique sur machine N°1 (TP noté individuel) sur les boucles itératives non bornées et le contrôle de saisie</div>
    <div class="badges-line">
      <span class="badge b-amber">Module 1 : Algorithmique &amp; Python</span>
      <span class="badge b-cyan">⏱ Durée : 90 min</span>
      <span class="badge b-green">Total : 20 points</span>
      <span class="badge b-blue">Fiche TP Noté Individuel</span>
    </div>
  </div>

  <h2>1. Consignes Générales</h2>

  <p class="callout-consignes">
    <strong>💻 Organisation du TP :</strong> Durée 90 minutes. Travail individuel sur machine.<br>
    Créez sur votre bureau le script Python <code>TP1_Nom_Prenom.py</code>. Rédigez les algorithmes et les TDO demandés sur votre feuille de copie.
  </p>

  <table align="center" border="1">
    <thead>
      <tr>
        <th style="width: 33%;">Respect des Conventions</th>
        <th style="width: 33%;">Trace Écrite (Copie)</th>
        <th style="width: 34%;">Validation Machine</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Noms de variables explicites, types stricts, pas de conversion abusive en chaîne, interdiction formelle de l'instruction <code>break</code>.</td>
        <td>Rédigez sur votre feuille les algorithmes normalisés en pseudo-code et les Tableaux de Déclaration des Objets (TDO).</td>
        <td>Testez chaque activité avec les jeux d'essais obligatoires avant de faire valider le fonctionnement par l'enseignant.</td>
      </tr>
    </tbody>
  </table>

  <h2>2. Palier Socle de Réussite (8 points)</h2>
  <p class="subtitle" style="text-align: left; margin-bottom: 2pt;">Sécuriser la saisie du code d'accès opérateur d'une machine-outil et analyser sa structure par divisions successives.</p>

  <div class="img-box">
    <img src="images/seance03/decompte_chiffres_controle.png" alt="Illustration : Décompte des chiffres par divisions successives par 10">
    <div class="img-caption">Figure 1 : Décompte des chiffres par divisions successives par 10 et patron de saisie contrôlée.</div>
  </div>

  <!-- =========================================================================
       PAGE 2 : ACTIVITÉ 1 (MOCN, Cahier des charges, Trace, Jeux d'essais)
       ========================================================================= -->
  <h3 style="page-break-before: always;">Activité 1 — Contrôle d'accès sécurisé à une machine-outil (MOCN) <span class="badge b-green">4 points</span></h3>

  <h4>Mise en situation technique &amp; Cahier des charges</h4>
  <p>Sur une machine-outil à commande numérique (MOCN), l'accès au pupitre de commande est verrouillé. Pour s'authentifier, l'opérateur doit introduire un code numérique strictement positif (<i>code</i> ∈ ℕ*).</p>
  <p>Le module de sécurité exécute un traitement séquentiel en trois étapes indissociables :</p>
  <ol>
    <li><strong>Étape 1 — Saisie filtrée obligatoire :</strong> Le système invite l'utilisateur à saisir <code>code</code>. Tant que la valeur entrée est invalide (<i>code</i> ≤ 0), le système affiche <em>« Code invalide ! Entrez un entier strictement positif. »</em> et réitère la demande.</li>
    <li><strong>Étape 2 — Analyse du format &amp; Décompte des chiffres (Ex. 5) :</strong> Une fois le code validé, le système détermine son nombre exact de chiffres par <strong>divisions entières successives par 10</strong> (<code>copie_code // 10</code>), sans jamais recourir à la conversion en chaîne de caractères (interdiction formelle de <code>str()</code> ou <code>len()</code>).</li>
    <li><strong>Étape 3 — Décision d'habilitation :</strong>
      <ul>
        <li>Si le code comporte <strong>4 chiffres</strong> ⇒ Afficher <em>« Accès Technicien Régleur autorisé »</em>.</li>
        <li>Si le code comporte <strong>3 chiffres</strong> ⇒ Afficher <em>« Accès Opérateur Usinage autorisé »</em>.</li>
        <li>Pour tout autre format ⇒ Afficher <em>« Format de code non accrédité : Accès refusé ! »</em>.</li>
      </ul>
    </li>
  </ol>

  <h4>Principe algorithmique &amp; Validation (Exemple : code = 5403)</h4>
  <pre>// Initialisation : copie_code ← code (5403), nb ← 0
// Étape 1 : 5403 div 10 = 540  -> nb = 1
// Étape 2 :  540 div 10 =  54  -> nb = 2
// Étape 3 :   54 div 10 =   5  -> nb = 3
// Étape 4 :    5 div 10 =   0  -> nb = 4
// Arrêt : copie_code = 0  -> Résultat = 4 chiffres
// Habilitation : Profil « Technicien Régleur »</pre>

  <p><strong>Jeux d'essais obligatoires :</strong></p>
  <ul>
    <li><i>code</i> = 5403 ⇒ <strong>4</strong> chiffres ⇒ Technicien Régleur</li>
    <li><i>code</i> = 176 ⇒ <strong>3</strong> chiffres ⇒ Opérateur Usinage</li>
    <li><i>code</i> = 9 ⇒ <strong>1</strong> chiffre ⇒ Format non accrédité</li>
    <li><i>code</i> = -45 ⇒ Erreur et répétition de saisie</li>
  </ul>

  <p class="cahier-box">
    ✍ <strong>Sur votre copie :</strong> Rédigez l'algorithme complet sur votre feuille et enregistrez le script sous <code>TP1_Nom_Prenom.py</code>.
  </p>

  <!-- =========================================================================
       PAGE 3 : ACTIVITÉ 2 (TDO & Questions) + PALIER MAÎTRISE (Figure 2)
       ========================================================================= -->
  <h3 style="page-break-before: always;">Activité 2 — Tableau de Déclaration des Objets &amp; Justification des choix <span class="badge b-green">4 points</span></h3>
  <p>Dresser le Tableau de Déclaration des Objets (TDO) de l'Activité 1 sur votre feuille d'examen :</p>

  <table align="center" border="1">
    <thead>
      <tr>
        <th style="width: 22%;">Objet</th>
        <th style="width: 24%;">Type / Nature</th>
        <th style="width: 54%;">Rôle &amp; Justification du type</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>code</code></td>
        <td class="empty-dots">...............</td>
        <td>Code d'accès saisi par l'opérateur (Entier naturel ≥ 1)</td>
      </tr>
      <tr>
        <td><code>copie_code</code></td>
        <td class="empty-dots">...............</td>
        <td>Variable de travail entière préservant la valeur initiale de <code>code</code> lors des divisions successives</td>
      </tr>
      <tr>
        <td><code>nb_chiffres</code></td>
        <td class="empty-dots">...............</td>
        <td>Compteur d'itérations / nombre total de chiffres du code (Entier ≥ 0)</td>
      </tr>
    </tbody>
  </table>

  <ol>
    <li>Pourquoi est-il indispensable de copier la valeur de <code>code</code> dans <code>copie_code</code> avant la boucle ? Que se passerait-il si on effectuait les divisions directement sur la variable <code>code</code> ?</li>
    <li>Pourquoi l'opérateur <code>//</code> (division entière) est-il impératif à la place de l'opérateur <code>/</code> (division réelle) ? Quel serait l'impact sur la condition d'arrêt ?</li>
    <li>Pourquoi l'usage de la fonction <code>len(str(code))</code> est-il proscrit dans cette épreuve d'algorithmique fondamentale ?</li>
  </ol>

  <p class="cahier-box">
    ✍ <strong>Sur votre copie :</strong> Complétez le TDO et justifiez vos choix de typage sur votre feuille d'évaluation.
  </p>

  <h2>3. Palier Maîtrise du Niveau Attendu (8 points)</h2>
  <p class="subtitle" style="text-align: left; margin-bottom: 2pt;">Acquisition d'un flux de mesures par sentinelle, calculs cumulatifs et protection anti-crash.</p>

  <div class="img-box">
    <img src="images/seance03/acquisition_sentinelle_mesures.png" alt="Illustration : Chaîne d'acquisition de données par sentinelle">
    <div class="img-caption">Figure 2 : Chaîne d'acquisition de données par sentinelle et gestion du cas limite sans mesure.</div>
  </div>

  <!-- =========================================================================
       PAGE 4 : ACTIVITÉ 3 & ACTIVITÉ 4 (Combinées sur 1 page équilibrée)
       ========================================================================= -->
  <h3 style="page-break-before: always;">Activité 3 — Saisie par sentinelle : Télémétrie optique <span class="badge b-cyan">4 points</span></h3>

  <h4>Mise en situation industrielle</h4>
  <p>Sur une chaîne automatisée de contrôle qualité, un <strong>capteur de télémétrie laser optique</strong> mesure en temps réel la distance séparant l'émetteur d'une série de pièces usinées défilant sur un convoyeur.</p>
  <p>Chaque mesure valide correspond à une distance réelle positive <i>A</i> ≥ 0.0 cm. La transmission s'arrête dès que le capteur émet la valeur sentinelle <strong><code>-1.0</code></strong> (fin de lot ou arrêt du défilement).</p>

  <h4>Patron d'acquisition par sentinelle</h4>
  <pre>Lire(A)
nb_mesures ← 0
Tant que (A ≥ 0.0) Faire
  nb_mesures ← nb_mesures + 1
  Lire(A)
Fin Tant que
Écrire("Nombre de mesures : ", nb_mesures)</pre>

  <ol>
    <li>Pourquoi la variable <code>A</code> doit-elle être lue une première fois <em>avant</em> la boucle <code>Tant que</code>, puis à la <em>fin</em> du corps de boucle ?</li>
    <li>Vérifier que ce patron d'écriture garantit que la sentinelle <code>-1.0</code> n'est <strong>jamais comptabilisée</strong> dans <code>nb_mesures</code>.</li>
  </ol>

  <h3>Activité 4 — Calcul cumulatif &amp; Protection anti-division par zéro <span class="badge b-cyan">4 points</span></h3>
  <p>Compléter le programme pour calculer la somme totale et la moyenne arithmétique des mesures valides :</p>

  <ol>
    <li>Initialiser un accumulateur <code>somme</code> à 0.0 et l'actualiser à chaque tour de boucle avec la mesure valide courante.</li>
    <li><strong>Sécurité algorithmique :</strong> Que se passe-t-il si l'opérateur saisit immédiatement <code>-1.0</code> ? Pourquoi le calcul direct <code>moyenne = somme / nb_mesures</code> provoquerait-il un arrêt brutal (<code>ZeroDivisionError</code>) ?</li>
    <li>Insérer la structure <code>if nb_mesures &gt; 0: ... else: ...</code> afin d'afficher la moyenne ou le message <code>"Aucune mesure valide enregistrée"</code>.</li>
    <li><strong>Jeux d'essais à valider :</strong>
      <ul>
        <li><strong>Cas nominal :</strong> <code>12.5</code> → <code>4.2</code> → <code>18.3</code> → <code>-1.0</code> ⇒ <strong>3 mesures, Somme = 35.0, Moyenne = 11.67 cm</strong>.</li>
        <li><strong>Cas limite (0 itération) :</strong> <code>-1.0</code> ⇒ <strong>"Aucune mesure valide enregistrée"</strong> sans crash machine.</li>
      </ul>
    </li>
  </ol>

  <p class="callout-synthesis">
    <strong>💡 SYNTHÈSE DIDACTIQUE :</strong>
    Le calcul de moyenne après sentinelle nécessite toujours une <strong>protection conditionnelle préalable</strong> (<i>nb_mesures</i> &gt; 0).
  </p>

  <p class="cahier-box">
    ✍ <strong>Sur votre copie :</strong> Programmez les boucles, intégrez la protection et validez les jeux d'essais sur machine.
  </p>

  <!-- =========================================================================
       PAGE 5 : PALIER DÉPASSEMENT & EXCELLENCE — ACTIVITÉ 5
       ========================================================================= -->
  <h2 style="page-break-before: always;">4. Palier Dépassement &amp; Excellence (4 points)</h2>
  <p class="subtitle" style="text-align: left; margin-bottom: 2pt;">Modéliser la dynamique comparée de deux systèmes et réaliser la recette logicielle d'un capteur.</p>

  <div class="img-box">
    <img src="images/seance03/croissance_comparee_calibrage.png" alt="Illustration : Modélisation dynamique comparée">
    <div class="img-caption">Figure 3 : Modélisation dynamique comparée linéaire vs exponentielle et procédure de calibrage de capteur.</div>
  </div>

  <h3>Activité 5 — Modélisation dynamique comparée : Lignes de fabrication <span class="badge b-green">Ex. 20</span> <span class="badge b-amber">2 points</span></h3>

  <h4>Mise en situation industrielle (Usine automatisée)</h4>
  <p>Deux lignes de fabrication robotisées produisent des composants électroniques :</p>
  <ul>
    <li><strong>Ligne α (Croissance linéaire) :</strong> Production initiale <i>P<sub>α</sub></i> = 10 000 000 pièces, cadence constante de +500 000 pièces/h.</li>
    <li><strong>Ligne β (Croissance géométrique) :</strong> Production initiale <i>P<sub>β</sub></i> = 5 000 000 pièces, gain continu de +3% par heure (<i>P<sub>β</sub></i> ← <i>P<sub>β</sub></i> × 1.03).</li>
  </ul>
  <p><strong>Objectif :</strong> Déterminer au bout de combien d'heures de fonctionnement la production de la ligne β dépassera celle de la ligne α.</p>

  <h4>Jalons d'évolution horaire</h4>
  <table align="center" border="1">
    <thead>
      <tr>
        <th class="text-center" style="width: 25%;">Temps <i>t</i></th>
        <th class="text-center" style="width: 25%;">Ligne α (Linéaire)</th>
        <th class="text-center" style="width: 25%;">Ligne β (Exponentielle)</th>
        <th class="text-center" style="width: 25%;"><i>P<sub>β</sub></i> &gt; <i>P<sub>α</sub></i> ?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center"><i>t</i> = 0 h</td>
        <td class="text-center">10.0 M</td>
        <td class="text-center">5.00 M</td>
        <td class="text-center">Non</td>
      </tr>
      <tr>
        <td class="text-center"><i>t</i> = 20 h</td>
        <td class="text-center">20.0 M</td>
        <td class="text-center">9.03 M</td>
        <td class="text-center">Non</td>
      </tr>
      <tr>
        <td class="text-center"><i>t</i> = 40 h</td>
        <td class="text-center">30.0 M</td>
        <td class="text-center">16.31 M</td>
        <td class="text-center">Non</td>
      </tr>
      <tr>
        <td class="text-center"><i>t</i> = 60 h</td>
        <td class="text-center">40.0 M</td>
        <td class="text-center">29.46 M</td>
        <td class="text-center">Non</td>
      </tr>
      <tr>
        <td class="text-center"><i>t</i> = 77 h</td>
        <td class="text-center" style="font-weight: bold; color: #1e40af;">48.50 M</td>
        <td class="text-center" style="font-weight: bold; color: #166534;">48.69 M</td>
        <td class="text-center" style="font-weight: bold; color: #166534;">OUI (Dépassement !)</td>
      </tr>
    </tbody>
  </table>

  <ol>
    <li>Formuler la condition de maintien de la boucle <code>Tant Que</code> modélisant cette évolution : <code>Tant que (P_beta ≤ P_alpha) Faire</code>.</li>
    <li>Écrire l'algorithme complet <code>ProductionComparee</code> avec compteur d'heures <code>t</code>.</li>
    <li>Implémenter et exécuter la simulation sous Python.</li>
    <li>Vérifier qu'au bout de <strong>77 heures</strong>, la ligne β (48 689 611 pièces) dépasse la ligne α (48 500 000 pièces).</li>
  </ol>

  <p class="cahier-box">
    ✍ <strong>Sur votre copie :</strong> Rédigez l'algorithme sur votre feuille et enregistrez le script dans <code>TP1_Nom_Prenom.py</code>.
  </p>

  <!-- =========================================================================
       PAGE 6 : ACTIVITÉ 6 — CALIBRAGE CAPTEUR & GRILLE DE RECETTE
       ========================================================================= -->
  <h3 style="page-break-before: always;">Activité 6 — Calibrage d'un capteur par encadrement &amp; Recette <span class="badge b-amber">Ex. 114</span> <span class="badge b-green">2 points</span></h3>

  <h4>Procédure de réglage (Exercice 114)</h4>
  <p>Un capteur de position doit être calibré sur une valeur de consigne entière secrète comprise entre 1 et 30. Le technicien dispose de <strong>5 tentatives maximum</strong>. À chaque essai, le système indique <code>"Signal trop fort !"</code> ou <code>"Signal trop faible !"</code>.</p>

  <ol>
    <li>Identifier la double condition d'arrêt de la boucle : <code>(valeur == cible) ou (essais &gt;= 5)</code>.</li>
    <li>Écrire le script simulant le calibrage et afficher le message de succès ou d'échec au terme des 5 essais.</li>
  </ol>

  <h4>Grille de recette logicielle à faire valider par l'enseignant</h4>
  <table align="center" border="1">
    <thead>
      <tr>
        <th class="text-center" style="width: 12%;">N° Test</th>
        <th style="width: 28%;">Activité &amp; Données de test</th>
        <th style="width: 32%;">Résultat attendu</th>
        <th class="text-center" style="width: 14%;">Résultat machine</th>
        <th class="text-center" style="width: 14%;">Visa Enseignant</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center"><strong>Test 1</strong></td>
        <td>Activité 1 : <i>code</i> = 5403 (test préalable -12)</td>
        <td>Rejet de -12 ; 5403 ⇒ 4 chiffres (Technicien Régleur)</td>
        <td class="text-center empty-dots">............</td>
        <td class="text-center">[ &nbsp; ] Validé</td>
      </tr>
      <tr>
        <td class="text-center"><strong>Test 2</strong></td>
        <td>Activité 4 : 12.5 → 4.2 → 18.3 → -1.0</td>
        <td>Somme = 35.0 ; Moyenne = 11.67 cm</td>
        <td class="text-center empty-dots">............</td>
        <td class="text-center">[ &nbsp; ] Validé</td>
      </tr>
      <tr>
        <td class="text-center"><strong>Test 3</strong></td>
        <td>Activité 4 : Saisie directe de -1.0</td>
        <td>Alerte : Aucune mesure (anti-crash)</td>
        <td class="text-center empty-dots">............</td>
        <td class="text-center">[ &nbsp; ] Validé</td>
      </tr>
      <tr>
        <td class="text-center"><strong>Test 4</strong></td>
        <td>Activité 5 : Modélisation α vs β</td>
        <td>Croisement en 77 heures (<i>P<sub>β</sub></i> = 48.69 M &gt; 48.50 M)</td>
        <td class="text-center empty-dots">............</td>
        <td class="text-center">[ &nbsp; ] Validé</td>
      </tr>
      <tr>
        <td class="text-center"><strong>Test 5</strong></td>
        <td>Activité 6 : Calibrage capteur</td>
        <td>Arrêt en ≤ 5 essais avec retours guidés</td>
        <td class="text-center empty-dots">............</td>
        <td class="text-center">[ &nbsp; ] Validé</td>
      </tr>
    </tbody>
  </table>

  <p class="cahier-box">
    ✍ <strong>Sur votre copie :</strong> Faites valider vos 5 tests par l'enseignant et remettez votre copie ainsi que votre fichier <code>TP1_Nom_Prenom.py</code>.
  </p>

</body>
</html>
"""

temp_html_path = os.path.join(WORKSPACE_DIR, "seance03_base.html")
with open(temp_html_path, "w", encoding="utf-8") as f:
    f.write(html_doc)

temp_odt_path = os.path.join(WORKSPACE_DIR, "seance03_base.odt")
if os.path.exists(temp_odt_path):
    os.remove(temp_odt_path)

subprocess.run([
    SOFFICE_PATH,
    USER_INSTALL,
    "--headless",
    "--convert-to", "odt:writer8",
    temp_html_path,
    "--outdir", WORKSPACE_DIR
], capture_output=True, text=True)

# Extract
with zipfile.ZipFile(temp_odt_path, 'r') as z:
    z.extractall(extract_dir)

# Embed images into Pictures/
pictures_dir = os.path.join(extract_dir, "Pictures")
os.makedirs(pictures_dir, exist_ok=True)

images_to_embed = [
    ("decompte_chiffres_controle.png", "image/png"),
    ("acquisition_sentinelle_mesures.png", "image/png"),
    ("croissance_comparee_calibrage.png", "image/png")
]

manifest_entries = []
for img_name, media_type in images_to_embed:
    src_path = os.path.join(WORKSPACE_DIR, "images", "seance03", img_name)
    dst_path = os.path.join(pictures_dir, img_name)
    if os.path.exists(src_path):
        shutil.copyfile(src_path, dst_path)
        manifest_entries.append(f'  <manifest:file-entry manifest:full-path="Pictures/{img_name}" manifest:media-type="{media_type}"/>\n')

# Update manifest.xml
manifest_path = os.path.join(extract_dir, "META-INF", "manifest.xml")
with open(manifest_path, "r", encoding="utf-8") as f:
    manifest_xml = f.read()

for entry in manifest_entries:
    manifest_xml = manifest_xml.replace("</manifest:manifest>", f"{entry}</manifest:manifest>")
with open(manifest_path, "w", encoding="utf-8") as f:
    f.write(manifest_xml)

# Font face declarations
FONTS_XML = """  <style:font-face style:name="Book Antiqua" svg:font-family="&apos;Book Antiqua&apos;" style:font-family-generic="roman" style:font-pitch="variable"/>
  <style:font-face style:name="Ink Free" svg:font-family="&apos;Ink Free&apos;" style:font-family-generic="script" style:font-pitch="variable"/>
  <style:font-face style:name="Cambria" svg:font-family="Cambria" style:font-family-generic="roman" style:font-pitch="variable"/>
  <style:font-face style:name="Bernard MT Condensed" svg:font-family="&apos;Bernard MT Condensed&apos;" style:font-family-generic="swiss" style:font-pitch="variable"/>
  <style:font-face style:name="Arno Pro" svg:font-family="&apos;Arno Pro&apos;" style:font-family-generic="roman" style:font-pitch="variable"/>
  <style:font-face style:name="Consolas" svg:font-family="Consolas" style:font-family-generic="modern" style:font-pitch="fixed"/>
"""

# =========================================================================
# MODIFY styles.xml
# =========================================================================
styles_path = os.path.join(extract_dir, "styles.xml")
with open(styles_path, "r", encoding="utf-8") as f:
    s_xml = f.read()

for fn in ["Book Antiqua", "Ink Free", "Cambria", "Bernard MT Condensed", "Arno Pro", "Consolas"]:
    s_xml = re.sub(r'<style:font-face\s+style:name="' + fn + r'"[^>]*/>', '', s_xml)
s_xml = s_xml.replace("</office:font-face-decls>", f"{FONTS_XML}</office:font-face-decls>")

# 1. Default paragraph style: Book Antiqua, 12pt (Rule 1)
default_p_style = """<style:default-style style:family="paragraph"><style:paragraph-properties style:text-autospace="ideograph-alpha" style:punctuation-wrap="hanging" style:line-break="strict" style:writing-mode="page" fo:line-height="115%" fo:margin-top="0cm" fo:margin-bottom="0cm"/><style:text-properties style:font-name="Book Antiqua" fo:font-family="&apos;Book Antiqua&apos;" fo:font-size="12pt" style:font-name-asian="Book Antiqua" style:font-family-asian="&apos;Book Antiqua&apos;" style:font-size-asian="12pt" style:font-name-complex="Book Antiqua" style:font-family-complex="&apos;Book Antiqua&apos;" style:font-size-complex="12pt"/></style:default-style>"""
s_xml = re.sub(r'<style:default-style style:family="paragraph">.*?</style:default-style>', default_p_style, s_xml, flags=re.DOTALL)

# 2. Standard: Book Antiqua, 12pt
standard_style = """<style:style style:name="Standard" style:family="paragraph" style:class="text">
  <style:paragraph-properties fo:margin-top="0cm" fo:margin-bottom="0cm" fo:line-height="115%"/>
  <style:text-properties style:font-name="Book Antiqua" fo:font-family="&apos;Book Antiqua&apos;" fo:font-size="12pt" style:font-name-asian="Book Antiqua" style:font-family-asian="&apos;Book Antiqua&apos;" style:font-size-asian="12pt" style:font-name-complex="Book Antiqua" style:font-family-complex="&apos;Book Antiqua&apos;" style:font-size-complex="12pt"/>
</style:style>"""
s_xml = re.sub(r'<style:style style:name="Standard"[^>]*>.*?</style:style>', standard_style, s_xml, flags=re.DOTALL)

# 3. Text_20_body (Corps de texte): Book Antiqua, 12pt, avant 0.1cm, après 0.1cm, interligne 115% (Rule 2)
text_body_style = """<style:style style:name="Text_20_body" style:display-name="Corps de texte" style:family="paragraph" style:parent-style-name="Standard" style:class="text">
  <style:paragraph-properties fo:margin-top="0.1cm" fo:margin-bottom="0.1cm" fo:line-height="115%"/>
  <style:text-properties style:font-name="Book Antiqua" fo:font-family="&apos;Book Antiqua&apos;" fo:font-size="12pt" style:font-name-asian="Book Antiqua" style:font-family-asian="&apos;Book Antiqua&apos;" style:font-size-asian="12pt" style:font-name-complex="Book Antiqua" style:font-family-complex="&apos;Book Antiqua&apos;" style:font-size-complex="12pt"/>
</style:style>"""
s_xml = re.sub(r'<style:style style:name="Text_20_body"[^>]*>.*?</style:style>', text_body_style, s_xml, flags=re.DOTALL)

# 4. Heading_20_1 (Titre 1): Ink Free, gras, 24pt, avant 0.2cm, après 0.1cm, centré (Rule 3)
heading1_style = """<style:style style:name="Heading_20_1" style:display-name="Titre 1" style:family="paragraph" style:parent-style-name="Heading" style:next-style-name="Text_20_body" style:default-outline-level="1" style:class="chapter">
  <style:paragraph-properties fo:margin-top="0.2cm" fo:margin-bottom="0.1cm" fo:text-align="center" fo:keep-with-next="always"/>
  <style:text-properties style:font-name="Ink Free" fo:font-family="&apos;Ink Free&apos;" fo:font-size="24pt" fo:font-weight="bold" style:font-name-asian="Ink Free" style:font-family-asian="&apos;Ink Free&apos;" style:font-size-asian="24pt" style:font-weight-asian="bold" style:font-name-complex="Ink Free" style:font-family-complex="&apos;Ink Free&apos;" style:font-size-complex="24pt" style:font-weight-complex="bold"/>
</style:style>"""
s_xml = re.sub(r'<style:style style:name="Heading_20_1"[^>]*>.*?</style:style>', heading1_style, s_xml, flags=re.DOTALL)

# 5. Heading_20_2 (Titre 2): Cambria, gras, 18pt, avant 0.2cm, après 0.1cm (Rule 4)
heading2_style = """<style:style style:name="Heading_20_2" style:display-name="Titre 2" style:family="paragraph" style:parent-style-name="Heading" style:next-style-name="Text_20_body" style:default-outline-level="2" style:class="chapter">
  <style:paragraph-properties fo:margin-top="0.2cm" fo:margin-bottom="0.1cm" fo:keep-with-next="always"/>
  <style:text-properties style:font-name="Cambria" fo:font-family="Cambria" fo:font-size="18pt" fo:font-weight="bold" style:font-name-asian="Cambria" style:font-family-asian="Cambria" style:font-size-asian="18pt" style:font-weight-asian="bold" style:font-name-complex="Cambria" style:font-family-complex="Cambria" style:font-size-complex="18pt" style:font-weight-complex="bold"/>
</style:style>"""
s_xml = re.sub(r'<style:style style:name="Heading_20_2"[^>]*>.*?</style:style>', heading2_style, s_xml, flags=re.DOTALL)

# 6. Heading_20_3 (Titre 3): Bernard MT Condensed, 16pt, avant 0.2cm, après 0.1cm (Rule 5)
heading3_style = """<style:style style:name="Heading_20_3" style:display-name="Titre 3" style:family="paragraph" style:parent-style-name="Heading" style:next-style-name="Text_20_body" style:default-outline-level="3" style:class="chapter">
  <style:paragraph-properties fo:margin-top="0.2cm" fo:margin-bottom="0.1cm" fo:keep-with-next="always"/>
  <style:text-properties style:font-name="Bernard MT Condensed" fo:font-family="&apos;Bernard MT Condensed&apos;" fo:font-size="16pt" style:font-name-asian="Bernard MT Condensed" style:font-family-asian="&apos;Bernard MT Condensed&apos;" style:font-size-asian="16pt" style:font-name-complex="Bernard MT Condensed" style:font-family-complex="&apos;Bernard MT Condensed&apos;" style:font-size-complex="16pt"/>
</style:style>"""
s_xml = re.sub(r'<style:style style:name="Heading_20_3"[^>]*>.*?</style:style>', heading3_style, s_xml, flags=re.DOTALL)

# 7. Heading_20_4 (Titre 4): Arno Pro, gras, 14pt, avant 0.2cm, après 0.1cm (Rule 6)
heading4_style = """<style:style style:name="Heading_20_4" style:display-name="Titre 4" style:family="paragraph" style:parent-style-name="Heading" style:next-style-name="Text_20_body" style:default-outline-level="4" style:class="chapter">
  <style:paragraph-properties fo:margin-top="0.2cm" fo:margin-bottom="0.1cm" fo:keep-with-next="always"/>
  <style:text-properties style:font-name="Arno Pro" fo:font-family="&apos;Arno Pro&apos;" fo:font-size="14pt" fo:font-weight="bold" style:font-name-asian="Arno Pro" style:font-family-asian="&apos;Arno Pro&apos;" style:font-size-asian="14pt" style:font-weight-asian="bold" style:font-name-complex="Arno Pro" style:font-family-complex="&apos;Arno Pro&apos;" style:font-size-complex="14pt" style:font-weight-complex="bold"/>
</style:style>"""
if 'style:name="Heading_20_4"' in s_xml:
    s_xml = re.sub(r'<style:style style:name="Heading_20_4"[^>]*>.*?</style:style>', heading4_style, s_xml, flags=re.DOTALL)
else:
    s_xml = s_xml.replace("</office:styles>", f"  {heading4_style}\n</office:styles>")

# 8. Preformatted (Preformatted_20_Text): Consolas, 11pt, avant 0cm, après 0cm, interligne 115% (Rule 7)
preformatted_style = """<style:style style:name="Preformatted_20_Text" style:display-name="Préformaté" style:family="paragraph" style:parent-style-name="Standard" style:class="html">
  <style:paragraph-properties fo:margin-top="0cm" fo:margin-bottom="0cm" fo:margin-left="0.15cm" fo:margin-right="0.15cm" fo:line-height="115%" fo:background-color="#f8fafc" fo:padding="0.15cm" fo:border="0.5pt solid #cbd5e1"/>
  <style:text-properties style:font-name="Consolas" fo:font-family="Consolas" fo:font-size="11pt" style:font-name-asian="Consolas" style:font-family-asian="Consolas" style:font-size-asian="11pt" style:font-name-complex="Consolas" style:font-family-complex="Consolas" style:font-size-complex="11pt"/>
</style:style>"""
s_xml = re.sub(r'<style:style[^>]*Preformatted_20_Text[^>]*>.*?</style:style>', preformatted_style, s_xml, flags=re.DOTALL)

# 9. Paragraph Callout styles in styles.xml: background applied to ENTIRE paragraph (Rule 9)
callout_styles = """
<style:style style:name="Corps_20_de_20_texte.callout-rule" style:display-name="Corps de texte.callout-rule" style:family="paragraph" style:parent-style-name="Text_20_body">
  <style:paragraph-properties fo:margin-top="0.1cm" fo:margin-bottom="0.1cm" fo:line-height="115%" fo:background-color="#fffbeb" fo:padding-left="0.3cm" fo:padding-right="0.3cm" fo:padding-top="0.1cm" fo:padding-bottom="0.1cm" fo:border-left="3.5pt solid #f59e0b" fo:border-right="none" fo:border-top="none" fo:border-bottom="none"/>
  <style:text-properties style:font-name="Book Antiqua" fo:font-family="&apos;Book Antiqua&apos;" fo:font-size="11pt"/>
</style:style>
<style:style style:name="Corps_20_de_20_texte.callout-consignes" style:display-name="Corps de texte.callout-consignes" style:family="paragraph" style:parent-style-name="Text_20_body">
  <style:paragraph-properties fo:margin-top="0.1cm" fo:margin-bottom="0.1cm" fo:line-height="115%" fo:background-color="#fffbeb" fo:padding-left="0.3cm" fo:padding-right="0.3cm" fo:padding-top="0.1cm" fo:padding-bottom="0.1cm" fo:border-left="3.5pt solid #f59e0b" fo:border-right="none" fo:border-top="none" fo:border-bottom="none"/>
  <style:text-properties style:font-name="Book Antiqua" fo:font-family="&apos;Book Antiqua&apos;" fo:font-size="11pt"/>
</style:style>
<style:style style:name="Corps_20_de_20_texte.callout-synthesis" style:display-name="Corps de texte.callout-synthesis" style:family="paragraph" style:parent-style-name="Text_20_body">
  <style:paragraph-properties fo:margin-top="0.1cm" fo:margin-bottom="0.1cm" fo:line-height="115%" fo:background-color="#f0f9ff" fo:padding-left="0.3cm" fo:padding-right="0.3cm" fo:padding-top="0.1cm" fo:padding-bottom="0.1cm" fo:border-left="3.5pt solid #0ea5e9" fo:border-right="none" fo:border-top="none" fo:border-bottom="none"/>
  <style:text-properties style:font-name="Book Antiqua" fo:font-family="&apos;Book Antiqua&apos;" fo:font-size="11pt"/>
</style:style>
<style:style style:name="Corps_20_de_20_texte.cahier-box" style:display-name="Corps de texte.cahier-box" style:family="paragraph" style:parent-style-name="Text_20_body">
  <style:paragraph-properties fo:margin-top="0.08cm" fo:margin-bottom="0.08cm" fo:line-height="115%" fo:background-color="#f8fafc" fo:padding-left="0.3cm" fo:padding-right="0.3cm" fo:padding-top="0.08cm" fo:padding-bottom="0.08cm" fo:border="0.8pt dashed #94a3b8"/>
  <style:text-properties style:font-name="Book Antiqua" fo:font-family="&apos;Book Antiqua&apos;" fo:font-size="9.5pt" fo:font-style="italic" fo:color="#475569"/>
</style:style>
"""
for c_name in ["callout-rule", "callout-consignes", "callout-synthesis", "cahier-box"]:
    s_xml = re.sub(r'<style:style[^>]*Corps_20_de_20_texte\.' + c_name + r'[^>]*>.*?</style:style>', '', s_xml, flags=re.DOTALL)
s_xml = s_xml.replace("</office:styles>", f"{callout_styles}\n</office:styles>")

# 10. Header and Footer paragraph styles (Book Antiqua, 10pt, italic) (Rules 10 & 11)
header_footer_styles = """
<style:style style:name="Header" style:display-name="En-tête" style:family="paragraph" style:parent-style-name="Standard" style:class="extra">
  <style:paragraph-properties fo:text-align="right" fo:margin-top="0cm" fo:margin-bottom="0.1cm" fo:border-bottom="0.5pt solid #cbd5e1" fo:padding-bottom="0.1cm"/>
  <style:text-properties style:font-name="Book Antiqua" fo:font-family="&apos;Book Antiqua&apos;" fo:font-size="10pt" fo:font-style="italic" fo:color="#475569" style:font-name-asian="Book Antiqua" style:font-family-asian="&apos;Book Antiqua&apos;" style:font-size-asian="10pt" style:font-style-asian="italic" style:font-name-complex="Book Antiqua" style:font-family-complex="&apos;Book Antiqua&apos;" style:font-size-complex="10pt" style:font-style-complex="italic"/>
</style:style>
<style:style style:name="Footer" style:display-name="Pied de page" style:family="paragraph" style:parent-style-name="Standard" style:class="extra">
  <style:paragraph-properties fo:text-align="center" fo:margin-top="0.1cm" fo:margin-bottom="0cm" fo:border-top="0.5pt solid #cbd5e1" fo:padding-top="0.1cm"/>
  <style:text-properties style:font-name="Book Antiqua" fo:font-family="&apos;Book Antiqua&apos;" fo:font-size="10pt" fo:font-style="italic" fo:color="#475569" style:font-name-asian="Book Antiqua" style:font-family-asian="&apos;Book Antiqua&apos;" style:font-size-asian="10pt" style:font-style-asian="italic" style:font-name-complex="Book Antiqua" style:font-family-complex="&apos;Book Antiqua&apos;" style:font-size-complex="10pt" style:font-style-complex="italic"/>
</style:style>
"""
for st_name in ["Header", "Footer"]:
    s_xml = re.sub(r'<style:style[^>]*style:name="' + st_name + r'"[^>]*>.*?</style:style>', '', s_xml, flags=re.DOTALL)
s_xml = s_xml.replace("</office:styles>", f"{header_footer_styles}\n</office:styles>")

# 11. Page Layouts: Mpm_First (Page 1: NO header, has footer) and Mpm3 (Page 2+: HAS header and footer)
mpm_first = """<style:page-layout style:name="Mpm_First"><style:page-layout-properties fo:page-width="21.001cm" fo:page-height="29.7cm" style:num-format="1" style:print-orientation="portrait" fo:margin-top="0.8cm" fo:margin-bottom="0.8cm" fo:margin-left="1.2cm" fo:margin-right="1.2cm" fo:background-color="transparent" style:writing-mode="lr-tb"><style:footnote-sep style:width="0.018cm" style:distance-before-sep="0.101cm" style:distance-after-sep="0.101cm" style:line-style="solid" style:adjustment="left" style:rel-width="25%" style:color="#000000"/></style:page-layout-properties><style:header-style/><style:footer-style><style:header-footer-properties fo:min-height="0.6cm" fo:margin-top="0.25cm"/></style:footer-style></style:page-layout>"""

mpm3_updated = """<style:page-layout style:name="Mpm3"><style:page-layout-properties fo:page-width="21.001cm" fo:page-height="29.7cm" style:num-format="1" style:print-orientation="portrait" fo:margin-top="0.8cm" fo:margin-bottom="0.8cm" fo:margin-left="1.2cm" fo:margin-right="1.2cm" fo:background-color="transparent" style:writing-mode="lr-tb"><style:footnote-sep style:width="0.018cm" style:distance-before-sep="0.101cm" style:distance-after-sep="0.101cm" style:line-style="solid" style:adjustment="left" style:rel-width="25%" style:color="#000000"/></style:page-layout-properties><style:header-style><style:header-footer-properties fo:min-height="0.6cm" fo:margin-bottom="0.25cm"/></style:header-style><style:footer-style><style:header-footer-properties fo:min-height="0.6cm" fo:margin-top="0.25cm"/></style:footer-style></style:page-layout>"""

s_xml = re.sub(r'<style:page-layout style:name="Mpm_First">.*?</style:page-layout>', '', s_xml, flags=re.DOTALL)
s_xml = re.sub(r'<style:page-layout style:name="Mpm3">.*?</style:page-layout>', mpm_first + mpm3_updated, s_xml, flags=re.DOTALL)

# 12. Master styles: First_20_Page (no header, footer with page number) and HTML (header with title, footer with page number)
doc_title_header = "Séance 3 : TP Évalué N°1 — Contrôle de saisie &amp; Boucle Tant Que"
master_styles_updated = f"""<office:master-styles>
  <style:master-page style:name="First_20_Page" style:display-name="Première page" style:page-layout-name="Mpm_First" style:next-style-name="HTML">
    <style:footer>
      <text:p text:style-name="Footer">Page <text:page-number text:select-page="current">1</text:page-number> / <text:page-count>6</text:page-count></text:p>
    </style:footer>
  </style:master-page>
  <style:master-page style:name="HTML" style:page-layout-name="Mpm3" draw:style-name="Mdp2">
    <style:header>
      <text:p text:style-name="Header">{doc_title_header}</text:p>
    </style:header>
    <style:footer>
      <text:p text:style-name="Footer">Page <text:page-number text:select-page="current">2</text:page-number> / <text:page-count>6</text:page-count></text:p>
    </style:footer>
  </style:master-page>
</office:master-styles>"""

s_xml = re.sub(r'<office:master-styles>.*?</office:master-styles>', master_styles_updated, s_xml, flags=re.DOTALL)

with open(styles_path, "w", encoding="utf-8") as f:
    f.write(s_xml)

# =========================================================================
# MODIFY content.xml
# =========================================================================
content_path = os.path.join(extract_dir, "content.xml")
with open(content_path, "r", encoding="utf-8") as f:
    c_xml = f.read()

# Font face declarations
for fn in ["Book Antiqua", "Ink Free", "Cambria", "Bernard MT Condensed", "Arno Pro", "Consolas"]:
    c_xml = re.sub(r'<style:font-face\s+style:name="' + fn + r'"[^>]*/>', '', c_xml)
c_xml = c_xml.replace("</office:font-face-decls>", f"{FONTS_XML}</office:font-face-decls>")

# 1. Main Title: ensure it uses Heading_20_1
c_xml = re.sub(
    r'<text:p text:style-name="P2">(Séance 3\s*:.*?)</text:p>',
    r'<text:h text:style-name="Heading_20_1" text:outline-level="1">\1</text:h>',
    c_xml
)

# 2. First paragraph uses master-page-name="First_20_Page" so Page 1 has NO header
c_xml = re.sub(r'style:master-page-name="[^"]+"', 'style:master-page-name="First_20_Page"', c_xml)

# 3. Preformatted automatic styles (ensure 0cm margins, 10pt Consolas, 115% line-height)
def fix_pre_automatic(m):
    s_name = m.group(1)
    return f"""<style:style style:name="{s_name}" style:family="paragraph" style:parent-style-name="Preformatted_20_Text"><style:paragraph-properties fo:margin-top="0cm" fo:margin-bottom="0cm" fo:line-height="115%" style:contextual-spacing="false"/><style:text-properties style:font-name="Consolas" fo:font-family="Consolas" fo:font-size="10pt"/></style:style>"""
c_xml = re.sub(r'<style:style\s+style:name="(P\d+)"\s+style:family="paragraph"\s+style:parent-style-name="Preformatted_20_Text"[^>]*>.*?</style:style>', fix_pre_automatic, c_xml, flags=re.DOTALL)

# 4. Table styles: Centered (table:align="center") and exact table widths (Rule 8)
c_xml = re.sub(r'<style:style\s+style:name="(Tableau\d+)"\s+style:family="table">.*?</style:style>',
               r'<style:style style:name="\1" style:family="table"><style:table-properties style:width="17.0cm" table:align="center"/></style:style>',
               c_xml, flags=re.DOTALL)

# 5. Table cell styles: border 0.5pt solid #000000 (black), padding, vertical align middle (Rule 8)
def fix_cell_props(m):
    c_name = m.group(1)
    return f"""<style:style style:name="{c_name}" style:family="table-cell"><style:table-cell-properties style:vertical-align="middle" fo:padding-left="0.18cm" fo:padding-right="0.18cm" fo:padding-top="0.08cm" fo:padding-bottom="0.08cm" fo:border="0.5pt solid #000000"/></style:style>"""
c_xml = re.sub(r'<style:style\s+style:name="(Tableau\d+\.[A-Z]\d+)"\s+style:family="table-cell">.*?</style:style>', fix_cell_props, c_xml, flags=re.DOTALL)

# 6. Specific column widths for tables to avoid word splitting
col_widths = {
    # Tableau 1: Consignes (total 17.0cm)
    "Tableau1.A": "5.6cm",
    "Tableau1.B": "5.7cm",
    "Tableau1.C": "5.7cm",
    # Tableau 2: TDO (total 17.0cm)
    "Tableau2.A": "3.8cm",
    "Tableau2.B": "3.5cm",
    "Tableau2.C": "9.7cm",
    # Tableau 3: Jalons (total 17.0cm)
    "Tableau3.A": "3.2cm",
    "Tableau3.B": "4.6cm",
    "Tableau3.C": "4.6cm",
    "Tableau3.D": "4.6cm",
    # Tableau 4: Recette (total 17.0cm)
    "Tableau4.A": "2.2cm",
    "Tableau4.B": "4.4cm",
    "Tableau4.C": "5.6cm",
    "Tableau4.D": "2.4cm",
    "Tableau4.E": "2.4cm",
}
for col_name, width in col_widths.items():
    col_style = f"""<style:style style:name="{col_name}" style:family="table-column"><style:table-column-properties style:column-width="{width}"/></style:style>"""
    c_xml = re.sub(r'<style:style\s+style:name="' + col_name + r'"\s+style:family="table-column">.*?</style:style>', col_style, c_xml, flags=re.DOTALL)

# 7. Clean up any character styles with background-color or char-shading (Rule 9)
def clean_text_properties_bg(m):
    chunk = m.group(0)
    chunk = re.sub(r'fo:background-color="[^"]*"', '', chunk)
    chunk = re.sub(r'loext:char-shading-value="[^"]*"', '', chunk)
    chunk = re.sub(r'loext:border[^=]*="[^"]*"', '', chunk)
    chunk = re.sub(r'loext:padding[^=]*="[^"]*"', '', chunk)
    return chunk
c_xml = re.sub(r'<style:style\s+style:name="T\d+"\s+style:family="text">.*?</style:style>', clean_text_properties_bg, c_xml, flags=re.DOTALL)

# 8. Image replacement and resizing (compact height 3.2cm so each diagram fits on its page)
for img_name, _ in images_to_embed:
    base_stem = os.path.splitext(img_name)[0]
    c_xml = re.sub(r'xlink:href="[^"]*' + base_stem + r'\.(png|svg|jpg)"', f'xlink:href="Pictures/{img_name}"', c_xml)

c_xml = re.sub(
    r'(<draw:frame [^>]*?)(svg:width="[^"]*")([^>]*?)(svg:height="[^"]*")',
    r'\1svg:width="13.5cm"\3svg:height="3.2cm"',
    c_xml
)

with open(content_path, "w", encoding="utf-8") as f:
    f.write(c_xml)

# Validate XML syntax before packing
try:
    ET.fromstring(s_xml)
    print("styles.xml is VALID XML")
except Exception as e:
    print("styles.xml XML ERROR:", e)

try:
    ET.fromstring(c_xml)
    print("content.xml is VALID XML")
except Exception as e:
    print("content.xml XML ERROR:", e)

# Repack final seance03.odt
# Terminate any lingering soffice first to avoid file lock
subprocess.run(["powershell", "-NoProfile", "-Command", "Get-Process -Name soffice* -ErrorAction SilentlyContinue | Stop-Process -Force"], capture_output=True)

if os.path.exists(target_odt):
    os.remove(target_odt)

with zipfile.ZipFile(target_odt, "w") as z_out:
    mimetype_path = os.path.join(extract_dir, "mimetype")
    if os.path.exists(mimetype_path):
        z_out.write(mimetype_path, "mimetype", compress_type=zipfile.ZIP_STORED)
    for root, dirs, files in os.walk(extract_dir):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, extract_dir).replace("\\", "/")
            if rel_path == "mimetype":
                continue
            z_out.write(full_path, rel_path, compress_type=zipfile.ZIP_DEFLATED)

shutil.rmtree(extract_dir)
if os.path.exists(temp_odt_path):
    os.remove(temp_odt_path)
if os.path.exists(temp_html_path):
    os.remove(temp_html_path)

print("Repacked successfully to", target_odt)

# Export PDF to confirm visual quality and page count
pdf_out_path = os.path.join(OUT_DIR, "seance03.pdf")
if os.path.exists(pdf_out_path):
    os.remove(pdf_out_path)

res_pdf = subprocess.run([
    SOFFICE_PATH,
    USER_INSTALL,
    "--headless",
    "--convert-to", "pdf",
    target_odt,
    "--outdir", OUT_DIR
], capture_output=True, text=True)

print("LibreOffice PDF export returncode:", res_pdf.returncode)
if os.path.exists(pdf_out_path):
    with open(pdf_out_path, "rb") as f:
        pdf_bytes = f.read()
    total_pages = len(re.findall(rb'/Type\s*/Page\b', pdf_bytes))
    print(f"Verified PDF export: {total_pages} pages at {pdf_out_path}")
else:
    print("PDF export failed to create file!")
