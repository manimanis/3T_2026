import os
import re
import shutil
import subprocess
import zipfile
import xml.etree.ElementTree as ET

WORKSPACE_DIR = r"c:\xampp-school\htdocs\3T_2026"
SOFFICE_PATH = r"C:\Program Files\LibreOffice\program\soffice.exe"
USER_INSTALL = "-env:UserInstallation=file:///C:/Users/Cyberbox/AppData/Local/Temp/lo_tmp"

target_odt = os.path.join(WORKSPACE_DIR, "seance02.odt")
extract_dir = os.path.join(WORKSPACE_DIR, "temp_gen_final")
if os.path.exists(extract_dir):
    shutil.rmtree(extract_dir)
os.makedirs(extract_dir)

# HTML source with clean layout and Consolas 11pt for preformatted
html_doc = """<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Séance 2 · La boucle Tant Que (while) &amp; Contrôle de saisie — 3e Sciences</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 12mm 8mm 12mm;
    }
    body {
      font-family: 'Book Antiqua', serif;
      font-size: 12pt;
      line-height: 1.15;
      color: #0f172a;
      margin: 0;
      padding: 0;
    }
    p {
      font-family: 'Book Antiqua', serif;
      font-size: 12pt;
      line-height: 1.15;
      margin-top: 0.1cm;
      margin-bottom: 0.1cm;
    }
    .header-bar {
      border-bottom: 2pt solid #1d4ed8;
      padding-bottom: 2pt;
      margin-bottom: 4pt;
    }
    .top-meta {
      font-size: 9pt;
      color: #64748b;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 0.5px;
      margin-bottom: 1pt;
      font-family: 'Book Antiqua', serif;
    }
    h1 {
      font-family: 'Ink Free', cursive, sans-serif;
      font-size: 24pt;
      font-weight: bold;
      color: #0f172a;
      margin-top: 0.2cm;
      margin-bottom: 0.1cm;
    }
    .subtitle {
      font-size: 11pt;
      color: #334155;
      font-style: italic;
      margin-bottom: 4pt;
      font-family: 'Book Antiqua', serif;
    }
    .badges-line {
      margin-bottom: 6pt;
    }
    .badge {
      display: inline-block;
      padding: 1.5pt 5pt;
      font-size: 8.5pt;
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
      font-size: 18pt;
      font-weight: bold;
      color: #1e3a8a;
      margin-top: 0.2cm;
      margin-bottom: 0.1cm;
      padding-bottom: 1pt;
      border-bottom: 0.8pt solid #cbd5e1;
      page-break-after: avoid;
    }
    h3 {
      font-family: 'Bernard MT Condensed', sans-serif;
      font-size: 16pt;
      font-weight: normal;
      color: #0f172a;
      margin-top: 0.2cm;
      margin-bottom: 0.1cm;
      page-break-after: avoid;
    }
    h4 {
      font-family: 'Arno Pro', serif;
      font-size: 14pt;
      font-weight: bold;
      color: #1e293b;
      margin-top: 0.15cm;
      margin-bottom: 0.05cm;
      page-break-after: avoid;
    }

    /* Paragraph callout blocks */
    p.callout-rule {
      background-color: #fffbeb;
      border-left: 3.5pt solid #f59e0b;
      padding: 4pt 7pt;
      margin-top: 0.15cm;
      margin-bottom: 0.15cm;
      line-height: 1.15;
    }
    p.callout-synthesis {
      background-color: #f0f9ff;
      border-left: 3.5pt solid #0ea5e9;
      padding: 4pt 7pt;
      margin-top: 0.15cm;
      margin-bottom: 0.15cm;
      line-height: 1.15;
    }
    p.cahier-box {
      background-color: #f8fafc;
      border: 0.8pt dashed #94a3b8;
      padding: 3.5pt 6pt;
      font-size: 10.5pt;
      color: #475569;
      font-style: italic;
      margin-top: 0.12cm;
      margin-bottom: 0.12cm;
      line-height: 1.15;
    }

    pre {
      background-color: #f8fafc;
      border: 0.5pt solid #cbd5e1;
      padding: 3.5pt 6pt;
      font-family: 'Consolas', monospace;
      font-size: 11pt;
      line-height: 1.15;
      margin-top: 0cm;
      margin-bottom: 0cm;
    }
    code {
      font-family: 'Consolas', monospace;
      font-size: 10.5pt;
      background-color: #f1f5f9;
      padding: 0.5pt 2.5pt;
      color: #0f172a;
    }

    /* Table styles: centered, 0.5pt black border */
    table {
      width: 100%;
      margin: 0.1cm auto;
      border-collapse: collapse;
      border: 0.5pt solid #000000;
      font-size: 10.5pt;
      font-family: 'Book Antiqua', serif;
    }
    th, td {
      border: 0.5pt solid #000000;
      padding: 2.2pt 4pt;
      text-align: left;
    }
    th {
      background-color: #f1f5f9;
      font-weight: bold;
      color: #0f172a;
    }
    .text-center { text-align: center; }
    .empty-dots { color: #94a3b8; font-style: italic; letter-spacing: 2px; }

    ol, ul {
      margin-top: 0.06cm;
      margin-bottom: 0.06cm;
      padding-left: 16pt;
      font-family: 'Book Antiqua', serif;
      font-size: 12pt;
    }
    li {
      margin-bottom: 1.2pt;
      line-height: 1.15;
    }
    .img-box {
      text-align: center;
      margin: 1pt 0 0.5pt 0;
      page-break-inside: avoid;
    }
    .img-box img {
      width: 135mm;
      max-width: 100%;
      height: auto;
      border: 0.8pt solid #cbd5e1;
    }
    .img-caption {
      font-size: 9pt;
      color: #64748b;
      font-style: italic;
      text-align: center;
      margin-top: 0.5pt;
      margin-bottom: 1.5pt;
      font-family: 'Book Antiqua', serif;
    }
  </style>
</head>
<body>

  <!-- =========================================================================
       PAGE 1 : CADRE THEORIQUE & CONVENTIONS OFFICIELLES
       ========================================================================= -->
  <div class="header-bar">
    <div class="top-meta">République Tunisienne · Ministère de l'Éducation — 3<sup>e</sup> Année Secondary (Sciences)</div>
    <h1>Séance 2 : La boucle Tant Que (while) &amp; Contrôle de saisie</h1>
    <div class="subtitle">Pré-condition, structure itérative non bornée et cas fondamental des 0 itération</div>
    <div class="badges-line">
      <span class="badge b-blue">Module 1 : Algorithmique</span>
      <span class="badge b-cyan">⏱ Durée : 90 min</span>
      <span class="badge b-green">3 Paliers d'apprentissage</span>
      <span class="badge b-amber">Fiche de Travail Élève</span>
    </div>
  </div>

  <h2>1. Cadre théorique &amp; Conventions officielles</h2>

  <p class="callout-rule">
    <strong>⚡ RÈGLE DE CHOIX FONDAMENTALE :</strong><br>
    Nombre d'itérations <strong>inconnu à l'avance</strong> → utiliser impérativement la structure itérative <strong><code>Tant que</code></strong> (boucle non bornée).<br>
    La boucle <code>Pour</code> est strictement réservée aux répétitions dont le nombre d'itérations est prédéterminé et connu avant d'entrer dans la boucle.
  </p>

  <h3>A. Syntaxe Algorithmique</h3>
  <pre>Tant que Condition Faire
  Traitements
Fin Tant que</pre>
  <ul>
    <li>Évaluation de la condition <strong>avant</strong> l'exécution du bloc d'instructions (structure à <strong>pré-condition</strong>).</li>
    <li>Si la condition est fausse dès l'entrée dans la boucle ⇒ <strong>0 itération</strong> (le corps de la boucle est totalement ignoré).</li>
  </ul>

  <h3>B. Traduction Python</h3>
  <pre>while Condition:
    Traitements</pre>
  <ul>
    <li><strong>Variable de contrôle :</strong> doit être obligatoirement initialisée <em>avant</em> la boucle, et modifiée <em>dans</em> le corps de la boucle.</li>
    <li>L'instruction <code>break</code> est <strong>formellement interdite</strong> par les conventions pédagogiques officielles.</li>
  </ul>

  <!-- =========================================================================
       PAGE 2 : PALIER DEBUTANT — Activité 1 (MOCN & Suivi de décharge)
       ========================================================================= -->
  <h2 style="page-break-before: always;">2. Palier Débutant — Socle (Pré-condition &amp; Cas fondamental 0 itération)</h2>

  <h3>Activité 1 — Sécurité MOCN : Décharge de condensateur <span class="badge b-cyan">Génie Électrique</span> <span class="badge b-blue">15 min</span></h3>

  <h4>Mise en situation industrielle</h4>
  <p>Dans une armoire de machine-outil (MOCN), un banc de condensateurs haute tension est chargé à <i>U</i> = 100.0 V. Pour respecter la norme TBTS, l'armoire reste verrouillée tant que <i>U</i> ≥ 20.0 V. À la coupure, la tension est divisée par 2 chaque seconde (<i>U</i> ← <i>U</i> / 2).</p>
  <p><strong>Problème posé :</strong> Trouver la durée de décharge et identifier la boucle adaptée.</p>

  <div class="img-box">
    <img src="images/seance02/decharge_condensateur_securite.png" alt="Illustration : Circuit de décharge et chronogramme comparatif">
    <div class="img-caption">Figure 1 : Circuit de dissipation, chronogramme de décharge TBTS et automate API.</div>
  </div>

  <h4>Tableau de suivi de la tension résiduelle</h4>
  <table align="center" border="1">
    <thead>
      <tr>
        <th class="text-center">Temps <i>t</i></th>
        <th class="text-center">Tension <i>U</i></th>
        <th class="text-center">Condition : <i>U</i> ≥ 20.0 V ?</th>
        <th class="text-center">Accès armoire</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center"><i>t</i> = 0 s</td>
        <td class="text-center">100.0 V</td>
        <td class="text-center" style="color: #b91c1c; font-weight: bold;">Vrai (Danger)</td>
        <td class="text-center">🔒 Verrouillé</td>
      </tr>
      <tr>
        <td class="text-center"><i>t</i> = 1 s</td>
        <td class="text-center">50.0 V</td>
        <td class="text-center" style="color: #b91c1c; font-weight: bold;">Vrai (Danger)</td>
        <td class="text-center">🔒 Verrouillé</td>
      </tr>
      <tr>
        <td class="text-center"><i>t</i> = 2 s</td>
        <td class="text-center empty-dots">.....</td>
        <td class="text-center empty-dots">.....</td>
        <td class="text-center empty-dots">.....</td>
      </tr>
      <tr>
        <td class="text-center"><i>t</i> = 3 s</td>
        <td class="text-center empty-dots">.....</td>
        <td class="text-center empty-dots">.....</td>
        <td class="text-center empty-dots">.....</td>
      </tr>
      <tr>
        <td class="text-center"><i>t</i> = 4 s</td>
        <td class="text-center empty-dots">.....</td>
        <td class="text-center empty-dots">.....</td>
        <td class="text-center empty-dots">.....</td>
      </tr>
    </tbody>
  </table>

  <h4>Travail demandé</h4>
  <ol>
    <li><strong>Décharge réelle :</strong> Compléter le tableau. Au bout de combien de secondes a-t-on <i>U</i> &lt; 20.0 V ?</li>
    <li><strong>Obstacle cognitif :</strong> Pourquoi l'affirmation <em>« 100 div 20 = 5 s »</em> est-elle fausse ?</li>
    <li><strong>Cas particulier (<i>U</i> = 15.0 V) :</strong> Machine à l'arrêt depuis 24h : la condition <i>U</i> ≥ 20.0 V est-elle vérifiée ?</li>
    <li><strong>Tester AVANT d'agir :</strong> Pourquoi l'automate teste-t-il la condition <em>avant</em> toute temporisation ?</li>
    <li><strong>Choix de structure :</strong> Pourquoi la boucle <code>Pour</code> est-elle inadaptée ici ?</li>
    <li><strong>Règle formelle :</strong> Exprimer la règle : <em>« <strong>Tant que</strong> (danger), <strong>Faire</strong> (décharge) »</em>.</li>
  </ol>

  <p class="cahier-box">
    ✍ <strong>Sur votre cahier :</strong> Complétez le tableau de suivi et répondez aux six questions de l'activité 1.
  </p>

  <!-- =========================================================================
       PAGE 3 : PALIER DEBUTANT — Activité 2 (Algorithme, TDO, Traces & Synthèse)
       ========================================================================= -->
  <h3 style="page-break-before: always;">Activité 2 — Algorithme &amp; Trace comparée <span class="badge b-blue">Conception</span> <span class="badge b-cyan">15 min</span></h3>

  <h4>Algorithme de décharge sécurisée</h4>
  <pre>ALGORITHME DechargeSecurite
DEBUT
  Lire(U)
  duree ← 0
  Tant que (U ≥ 20.0) Faire
    U ← U / 2
    duree ← duree + 1
  Fin Tant que
  Écrire("Tension : ", U, " V")
  Écrire("Durée : ", duree, " s")
FIN</pre>

  <h4>Tableau de Déclaration des Objets (TDO)</h4>
  <table align="center" border="1">
    <thead>
      <tr>
        <th style="width: 20%;">Objet</th>
        <th style="width: 20%;">Type</th>
        <th style="width: 60%;">Rôle / Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>U</code></td>
        <td>Réel</td>
        <td>Tension résiduelle mesurée aux bornes du condensateur (V)</td>
      </tr>
      <tr>
        <td><code>duree</code></td>
        <td>Entier</td>
        <td>Durée de décharge cumulée (secondes)</td>
      </tr>
    </tbody>
  </table>

  <h4>Traces d'exécution comparées</h4>
  <ol>
    <li><strong>Cas nominal (<i>U</i> = 100.0 V) :</strong><br>
    • <i>t</i> = 0 : 100.0 ≥ 20.0 (Vrai) → <i>U</i> = 50.0, duree = 1.<br>
    • <i>t</i> = 1 : 50.0 ≥ 20.0 (Vrai) → <i>U</i> = 25.0, duree = 2.<br>
    • <i>t</i> = 2 : 25.0 ≥ 20.0 (Vrai) → <i>U</i> = 12.5, duree = 3.<br>
    • <i>t</i> = 3 : 12.5 ≥ 20.0 (Faux) → Arrêt de la boucle : <strong>12.5 V, 3 s</strong>.</li>
    <li><strong>Cas 0 itération (<i>U</i> = 14.0 V) :</strong><br>
    • Entrée dans la boucle : 14.0 ≥ 20.0 (Faux d'emblée).<br>
    • <strong>0 itération</strong> → Sortie directe immédiate : <strong>14.0 V, 0 s</strong>.</li>
  </ol>

  <p class="callout-synthesis">
    <strong>💡 SYNTHÈSE DIDACTIQUE :</strong><br>
    La structure <code>Tant Que</code> s'exécute de <strong>0 à <i>N</i> fois</strong>. Si la condition est fausse à l'entrée, le corps de la boucle est totalement ignoré (cas fondamental des 0 itération).
  </p>

  <p class="cahier-box">
    ✍ <strong>Sur votre cahier :</strong> Notez le tableau de trace pour les deux cas (nominal et 0 itération).
  </p>

  <!-- =========================================================================
       PAGE 4 : PALIER INTERMEDIAIRE — Activité 3 (Trace DivisionIterative)
       ========================================================================= -->
  <h2 style="page-break-before: always;">3. Palier Intermédiaire — Maîtrise (Tracé &amp; Correction d'erreurs)</h2>

  <h3>Activité 3 — Tracé d'exécution et variables <span class="badge b-blue">15 min</span></h3>

  <h4>Algorithme DivisionIterative</h4>
  <pre>x ← 18
cpt ← 0
Tant que x > 2 Faire
  x ← x Div 2
  cpt ← cpt + 1
Fin Tant que
Écrire("x = ", x)
Écrire("cpt = ", cpt)</pre>

  <h4>Tableau de trace à compléter</h4>
  <table align="center" border="1">
    <thead>
      <tr>
        <th class="text-center" style="width: 24%;">Itération</th>
        <th class="text-center" style="width: 28%;">Condition <code>x &gt; 2</code></th>
        <th class="text-center" style="width: 26%;"><code>x ← x Div 2</code></th>
        <th class="text-center" style="width: 22%;"><code>cpt</code></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center">Initial</td>
        <td class="text-center">—</td>
        <td class="text-center">18</td>
        <td class="text-center">0</td>
      </tr>
      <tr>
        <td class="text-center">1</td>
        <td class="text-center">Vrai (18 &gt; 2)</td>
        <td class="text-center empty-dots">.....</td>
        <td class="text-center empty-dots">.....</td>
      </tr>
      <tr>
        <td class="text-center">2</td>
        <td class="text-center empty-dots">.....</td>
        <td class="text-center empty-dots">.....</td>
        <td class="text-center empty-dots">.....</td>
      </tr>
      <tr>
        <td class="text-center">3</td>
        <td class="text-center empty-dots">.....</td>
        <td class="text-center empty-dots">.....</td>
        <td class="text-center empty-dots">.....</td>
      </tr>
      <tr>
        <td class="text-center">4</td>
        <td class="text-center empty-dots">.....</td>
        <td class="text-center empty-dots">.....</td>
        <td class="text-center empty-dots">.....</td>
      </tr>
    </tbody>
  </table>

  <ol>
    <li>Quelles sont les valeurs finales affichées pour <code>x</code> et <code>cpt</code> ?</li>
    <li>Pour quelle valeur précise de <i>x</i> la condition de la boucle devient-elle fausse ?</li>
  </ol>

  <p class="cahier-box">
    ✍ <strong>Sur votre cahier :</strong> Remplissez le tableau de trace et répondez aux deux questions d'analyse.
  </p>

  <!-- =========================================================================
       PAGE 5 : PALIER INTERMEDIAIRE — Activité 4 (Débogage Boucle Infinie)
       ========================================================================= -->
  <h3 style="page-break-before: always;">Activité 4 — Débogage : Boucle infinie <span class="badge b-amber">Anomalie</span> <span class="badge b-blue">15 min</span></h3>

  <h4>Mise en situation</h4>
  <p>Si la température dépasse 25.0 °C, le programme ci-dessous boucle indéfiniment sans s'arrêter.</p>

  <pre>temperature = float(input("Température (°C) : "))
cycles = 0

while temperature > 25.0:
    print(f"Cycle {cycles} : Refroidissement...")
    cycles += 1
    # Anomalie : la température n'est pas modifiée !

print(f"Fin : {temperature}°C en {cycles} cycle(s).")</pre>

  <ol>
    <li>Pourquoi ce script provoque-t-il une boucle infinie si <code>temperature = 28.5</code> ?</li>
    <li>Quelle instruction ajouter dans la boucle pour décrémenter <code>temperature</code> (ex. <code>temperature -= 1.5</code>) ?</li>
    <li>Que produit une saisie initiale de 21.0 °C (cas fondamental des 0 itération) ?</li>
    <li>Écrire le script Python corrigé sur votre cahier.</li>
  </ol>

  <p class="cahier-box">
    ✍ <strong>Sur votre cahier :</strong> Notez l'analyse du bogue et recopiez le code Python dûment corrigé.
  </p>

  <!-- =========================================================================
       PAGE 6 : PALIER AVANCE — Activités 5 & 6 (Sentinelle & Seuil budgétaire)
       ========================================================================= -->
  <h2 style="page-break-before: always;">4. Palier Avancé — Défi (Sentinelle d'arrêt &amp; Modélisation scientifique)</h2>

  <h3>Activité 5 — Sentinelle : Pluviométrie <span class="badge b-blue">Exercice 27</span> <span class="badge b-cyan">15 min</span></h3>
  <p><strong>Énoncé :</strong> Saisir au clavier une suite de précipitations journalières (exprimées en mm, valeurs ≥ 0), terminée par la valeur sentinelle <strong><code>-1.0</code></strong> (la valeur sentinelle indique la fin de la saisie et ne doit en aucun cas être comptabilisée dans les statistiques).</p>

  <ol>
    <li>Écrire l'algorithme complet calculant et affichant le nombre de jours pluvieux ainsi que le cumul total des précipitations.</li>
    <li>Dresser le Tableau de Déclaration des Objets (TDO).</li>
    <li><strong>Jeux d'essais à valider :</strong>
      <ul>
        <li><em>Cas nominal :</em> <code>12.5</code> → <code>0.0</code> → <code>4.2</code> → <code>18.3</code> → <code>-1.0</code> ⇒ <strong>4 relevés traités, Cumul = 35.0 mm</strong>.</li>
        <li><em>Cas limite (0 itération) :</em> entrée immédiate de <code>-1.0</code> au premier tour ⇒ Affichage : <em>« Aucune donnée saisie »</em>.</li>
      </ul>
    </li>
  </ol>

  <p class="cahier-box">
    ✍ <strong>Sur votre cahier :</strong> Rédigez l'algorithme de pluviométrie et son TDO complet.
  </p>

  <h3>Activité 6 — Modélisation scientifique : Seuil budgétaire <span class="badge b-green">Exercice 10</span> <span class="badge b-green">15 min</span></h3>
  <p><strong>Énoncé :</strong> Un local commercial est loué initialement à 650 DT par mois, avec une augmentation annuelle de 1.8% (soit <i>L</i><sub><i>n</i>+1</sub> = <i>L</i><sub><i>n</i></sub> × 1.018). Le locataire résilie le bail dès que le loyer dépasse 800 DT.</p>

  <ol>
    <li>Identifier la condition de continuation de la boucle <code>Tant Que</code> et les variables de calcul.</li>
    <li>Écrire l'algorithme <code>EvolutionLoyer</code> calculant le nombre d'années écoulées avant résiliation, le loyer mensuel final et la somme totale cumulée des loyers.</li>
    <li>Dresser le Tableau de Déclaration des Objets (TDO).</li>
    <li><strong>Validation sur machine :</strong> En Python, programmer et vérifier qu'au bout de <strong>12 ans</strong> : le loyer atteint <strong>804.83 DT</strong> (&gt; 800 DT) et le total cumulé des loyers est de <strong>104 532 DT</strong>.</li>
  </ol>

  <p class="cahier-box">
    ✍ <strong>Sur votre cahier :</strong> Rédigez l'algorithme <code>EvolutionLoyer</code>, son TDO et validez les calculs.
  </p>

</body>
</html>
"""

temp_html_path = os.path.join(WORKSPACE_DIR, "seance02_base.html")
with open(temp_html_path, "w", encoding="utf-8") as f:
    f.write(html_doc)

temp_odt_path = os.path.join(WORKSPACE_DIR, "seance02_base.odt")
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

# Embed images
pictures_dir = os.path.join(extract_dir, "Pictures")
os.makedirs(pictures_dir, exist_ok=True)
png_src = os.path.join(WORKSPACE_DIR, "images", "seance02", "decharge_condensateur_securite.png")
png_name = "decharge_condensateur_securite.png"
shutil.copyfile(png_src, os.path.join(pictures_dir, png_name))

# Update manifest.xml
manifest_path = os.path.join(extract_dir, "META-INF", "manifest.xml")
with open(manifest_path, "r", encoding="utf-8") as f:
    manifest_xml = f.read()

entry = f'  <manifest:file-entry manifest:full-path="Pictures/{png_name}" manifest:media-type="image/png"/>\n'
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

# 1. Default paragraph style: Book Antiqua, 12pt
default_p_style = """<style:default-style style:family="paragraph"><style:paragraph-properties style:text-autospace="ideograph-alpha" style:punctuation-wrap="hanging" style:line-break="strict" style:writing-mode="page" fo:line-height="115%" fo:margin-top="0cm" fo:margin-bottom="0cm"/><style:text-properties style:font-name="Book Antiqua" fo:font-family="&apos;Book Antiqua&apos;" fo:font-size="12pt" style:font-name-asian="Book Antiqua" style:font-family-asian="&apos;Book Antiqua&apos;" style:font-size-asian="12pt" style:font-name-complex="Book Antiqua" style:font-family-complex="&apos;Book Antiqua&apos;" style:font-size-complex="12pt"/></style:default-style>"""
s_xml = re.sub(r'<style:default-style style:family="paragraph">.*?</style:default-style>', default_p_style, s_xml, flags=re.DOTALL)

# 2. Standard: Book Antiqua, 12pt
standard_style = """<style:style style:name="Standard" style:family="paragraph" style:class="text">
  <style:paragraph-properties fo:margin-top="0cm" fo:margin-bottom="0cm" fo:line-height="115%"/>
  <style:text-properties style:font-name="Book Antiqua" fo:font-family="&apos;Book Antiqua&apos;" fo:font-size="12pt" style:font-name-asian="Book Antiqua" style:font-family-asian="&apos;Book Antiqua&apos;" style:font-size-asian="12pt" style:font-name-complex="Book Antiqua" style:font-family-complex="&apos;Book Antiqua&apos;" style:font-size-complex="12pt"/>
</style:style>"""
s_xml = re.sub(r'<style:style style:name="Standard"[^>]*>.*?</style:style>', standard_style, s_xml, flags=re.DOTALL)

# 3. Text_20_body (Corps de texte): Book Antiqua, 12pt, avant 0.1cm, après 0.1cm, interligne 115%
text_body_style = """<style:style style:name="Text_20_body" style:display-name="Corps de texte" style:family="paragraph" style:parent-style-name="Standard" style:class="text">
  <style:paragraph-properties fo:margin-top="0.1cm" fo:margin-bottom="0.1cm" fo:line-height="115%"/>
  <style:text-properties style:font-name="Book Antiqua" fo:font-family="&apos;Book Antiqua&apos;" fo:font-size="12pt" style:font-name-asian="Book Antiqua" style:font-family-asian="&apos;Book Antiqua&apos;" style:font-size-asian="12pt" style:font-name-complex="Book Antiqua" style:font-family-complex="&apos;Book Antiqua&apos;" style:font-size-complex="12pt"/>
</style:style>"""
s_xml = re.sub(r'<style:style style:name="Text_20_body"[^>]*>.*?</style:style>', text_body_style, s_xml, flags=re.DOTALL)

# 4. Heading_20_1 (Titre 1): Ink Free, gras, 24pt, avant 0.2cm, après 0.1cm
heading1_style = """<style:style style:name="Heading_20_1" style:display-name="Titre 1" style:family="paragraph" style:parent-style-name="Heading" style:next-style-name="Text_20_body" style:default-outline-level="1" style:class="chapter">
  <style:paragraph-properties fo:margin-top="0.2cm" fo:margin-bottom="0.1cm" fo:keep-with-next="always"/>
  <style:text-properties style:font-name="Ink Free" fo:font-family="&apos;Ink Free&apos;" fo:font-size="24pt" fo:font-weight="bold" style:font-name-asian="Ink Free" style:font-family-asian="&apos;Ink Free&apos;" style:font-size-asian="24pt" style:font-weight-asian="bold" style:font-name-complex="Ink Free" style:font-family-complex="&apos;Ink Free&apos;" style:font-size-complex="24pt" style:font-weight-complex="bold"/>
</style:style>"""
s_xml = re.sub(r'<style:style style:name="Heading_20_1"[^>]*>.*?</style:style>', heading1_style, s_xml, flags=re.DOTALL)

# 5. Heading_20_2 (Titre 2): Cambria, gras, 18pt, avant 0.2cm, après 0.1cm
heading2_style = """<style:style style:name="Heading_20_2" style:display-name="Titre 2" style:family="paragraph" style:parent-style-name="Heading" style:next-style-name="Text_20_body" style:default-outline-level="2" style:class="chapter">
  <style:paragraph-properties fo:margin-top="0.2cm" fo:margin-bottom="0.1cm" fo:keep-with-next="always"/>
  <style:text-properties style:font-name="Cambria" fo:font-family="Cambria" fo:font-size="18pt" fo:font-weight="bold" style:font-name-asian="Cambria" style:font-family-asian="Cambria" style:font-size-asian="18pt" style:font-weight-asian="bold" style:font-name-complex="Cambria" style:font-family-complex="Cambria" style:font-size-complex="18pt" style:font-weight-complex="bold"/>
</style:style>"""
s_xml = re.sub(r'<style:style style:name="Heading_20_2"[^>]*>.*?</style:style>', heading2_style, s_xml, flags=re.DOTALL)

# 6. Heading_20_3 (Titre 3): Bernard MT Condensed, 16pt, avant 0.2cm, après 0.1cm
heading3_style = """<style:style style:name="Heading_20_3" style:display-name="Titre 3" style:family="paragraph" style:parent-style-name="Heading" style:next-style-name="Text_20_body" style:default-outline-level="3" style:class="chapter">
  <style:paragraph-properties fo:margin-top="0.2cm" fo:margin-bottom="0.1cm" fo:keep-with-next="always"/>
  <style:text-properties style:font-name="Bernard MT Condensed" fo:font-family="&apos;Bernard MT Condensed&apos;" fo:font-size="16pt" style:font-name-asian="Bernard MT Condensed" style:font-family-asian="&apos;Bernard MT Condensed&apos;" style:font-size-asian="16pt" style:font-name-complex="Bernard MT Condensed" style:font-family-complex="&apos;Bernard MT Condensed&apos;" style:font-size-complex="16pt"/>
</style:style>"""
s_xml = re.sub(r'<style:style style:name="Heading_20_3"[^>]*>.*?</style:style>', heading3_style, s_xml, flags=re.DOTALL)

# 7. Heading_20_4 (Titre 4): Arno Pro, gras, 14pt, avant 0.2cm, après 0.1cm
heading4_style = """<style:style style:name="Heading_20_4" style:display-name="Titre 4" style:family="paragraph" style:parent-style-name="Heading" style:next-style-name="Text_20_body" style:default-outline-level="4" style:class="chapter">
  <style:paragraph-properties fo:margin-top="0.2cm" fo:margin-bottom="0.1cm" fo:keep-with-next="always"/>
  <style:text-properties style:font-name="Arno Pro" fo:font-family="&apos;Arno Pro&apos;" fo:font-size="14pt" fo:font-weight="bold" style:font-name-asian="Arno Pro" style:font-family-asian="&apos;Arno Pro&apos;" style:font-size-asian="14pt" style:font-weight-asian="bold" style:font-name-complex="Arno Pro" style:font-family-complex="&apos;Arno Pro&apos;" style:font-size-complex="14pt" style:font-weight-complex="bold"/>
</style:style>"""
if 'style:name="Heading_20_4"' in s_xml:
    s_xml = re.sub(r'<style:style style:name="Heading_20_4"[^>]*>.*?</style:style>', heading4_style, s_xml, flags=re.DOTALL)
else:
    s_xml = s_xml.replace("</office:styles>", f"  {heading4_style}\n</office:styles>")

# 8. Preformatted (Preformatted_20_Text): Consolas, 11pt, avant 0cm, après 0cm, interligne 115%
preformatted_style = """<style:style style:name="Preformatted_20_Text" style:display-name="Préformaté" style:family="paragraph" style:parent-style-name="Standard" style:class="html">
  <style:paragraph-properties fo:margin-top="0cm" fo:margin-bottom="0cm" fo:margin-left="0.15cm" fo:margin-right="0.15cm" fo:line-height="115%" fo:background-color="#f8fafc" fo:padding="0.15cm" fo:border="0.5pt solid #cbd5e1"/>
  <style:text-properties style:font-name="Consolas" fo:font-family="Consolas" fo:font-size="11pt" style:font-name-asian="Consolas" style:font-family-asian="Consolas" style:font-size-asian="11pt" style:font-name-complex="Consolas" style:font-family-complex="Consolas" style:font-size-complex="11pt"/>
</style:style>"""
s_xml = re.sub(r'<style:style[^>]*Preformatted_20_Text[^>]*>.*?</style:style>', preformatted_style, s_xml, flags=re.DOTALL)

# 9. Paragraph Callout styles in styles.xml: background applied to ENTIRE paragraph
callout_rule_style = """<style:style style:name="Corps_20_de_20_texte.callout-rule" style:display-name="Corps de texte.callout-rule" style:family="paragraph" style:parent-style-name="Text_20_body">
  <style:paragraph-properties fo:margin-top="0.15cm" fo:margin-bottom="0.15cm" fo:line-height="115%" fo:background-color="#fffbeb" fo:padding-left="0.3cm" fo:padding-right="0.3cm" fo:padding-top="0.15cm" fo:padding-bottom="0.15cm" fo:border-left="3.5pt solid #f59e0b" fo:border-right="none" fo:border-top="none" fo:border-bottom="none"/>
  <style:text-properties style:font-name="Book Antiqua" fo:font-family="&apos;Book Antiqua&apos;" fo:font-size="12pt"/>
</style:style>"""
s_xml = re.sub(r'<style:style[^>]*Corps_20_de_20_texte\.callout-rule[^>]*>.*?</style:style>', callout_rule_style, s_xml, flags=re.DOTALL)

callout_synthesis_style = """<style:style style:name="Corps_20_de_20_texte.callout-synthesis" style:display-name="Corps de texte.callout-synthesis" style:family="paragraph" style:parent-style-name="Text_20_body">
  <style:paragraph-properties fo:margin-top="0.15cm" fo:margin-bottom="0.15cm" fo:line-height="115%" fo:background-color="#f0f9ff" fo:padding-left="0.3cm" fo:padding-right="0.3cm" fo:padding-top="0.15cm" fo:padding-bottom="0.15cm" fo:border-left="3.5pt solid #0ea5e9" fo:border-right="none" fo:border-top="none" fo:border-bottom="none"/>
  <style:text-properties style:font-name="Book Antiqua" fo:font-family="&apos;Book Antiqua&apos;" fo:font-size="12pt"/>
</style:style>"""
s_xml = re.sub(r'<style:style[^>]*Corps_20_de_20_texte\.callout-synthesis[^>]*>.*?</style:style>', callout_synthesis_style, s_xml, flags=re.DOTALL)

cahier_box_style = """<style:style style:name="Corps_20_de_20_texte.cahier-box" style:display-name="Corps de texte.cahier-box" style:family="paragraph" style:parent-style-name="Text_20_body">
  <style:paragraph-properties fo:margin-top="0.12cm" fo:margin-bottom="0.12cm" fo:line-height="115%" fo:background-color="#f8fafc" fo:padding-left="0.3cm" fo:padding-right="0.3cm" fo:padding-top="0.12cm" fo:padding-bottom="0.12cm" fo:border="0.8pt dashed #94a3b8"/>
  <style:text-properties style:font-name="Book Antiqua" fo:font-family="&apos;Book Antiqua&apos;" fo:font-size="10.5pt" fo:font-style="italic" fo:color="#475569"/>
</style:style>"""
s_xml = re.sub(r'<style:style[^>]*Corps_20_de_20_texte\.cahier-box[^>]*>.*?</style:style>', cahier_box_style, s_xml, flags=re.DOTALL)

# 10. Header and Footer paragraph styles (Book Antiqua, 10pt, italic)
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
master_styles_updated = """<office:master-styles>
  <style:master-page style:name="First_20_Page" style:display-name="Première page" style:page-layout-name="Mpm_First" style:next-style-name="HTML">
    <style:footer>
      <text:p text:style-name="Footer">Page <text:page-number text:select-page="current">1</text:page-number> / <text:page-count>6</text:page-count></text:p>
    </style:footer>
  </style:master-page>
  <style:master-page style:name="HTML" style:page-layout-name="Mpm3" draw:style-name="Mdp2">
    <style:header>
      <text:p text:style-name="Header">Séance 2 : La boucle Tant Que (while) &amp; Contrôle de saisie</text:p>
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
    r'<text:p text:style-name="P2">(Séance 2\s*:.*?)</text:p>',
    r'<text:h text:style-name="Heading_20_1" text:outline-level="1">\1</text:h>',
    c_xml
)

# 2. First paragraph uses master-page-name="First_20_Page" so Page 1 has NO header
c_xml = re.sub(r'style:master-page-name="[^"]+"', 'style:master-page-name="First_20_Page"', c_xml)

# 3. Preformatted automatic styles (ensure 0cm margins, 11pt Consolas, 115% line-height)
def fix_pre_automatic(m):
    s_name = m.group(1)
    return f"""<style:style style:name="{s_name}" style:family="paragraph" style:parent-style-name="Preformatted_20_Text"><style:paragraph-properties fo:margin-top="0cm" fo:margin-bottom="0cm" fo:line-height="115%" style:contextual-spacing="false"/><style:text-properties style:font-name="Consolas" fo:font-family="Consolas" fo:font-size="11pt"/></style:style>"""
c_xml = re.sub(r'<style:style\s+style:name="(P\d+)"\s+style:family="paragraph"\s+style:parent-style-name="Preformatted_20_Text"[^>]*>.*?</style:style>', fix_pre_automatic, c_xml, flags=re.DOTALL)

# 4. Table styles: Centered (table:align="center") and exact table widths
table_widths = {
    "Tableau1": "17.0cm",
    "Tableau2": "16.5cm",
    "Tableau3": "16.5cm",
}
for tbl_name, t_width in table_widths.items():
    def make_tbl_repl(w):
        def repl(m):
            return f"""<style:style style:name="{m.group(1)}" style:family="table"><style:table-properties style:width="{w}" table:align="center"/></style:style>"""
        return repl
    c_xml = re.sub(r'<style:style\s+style:name="(' + tbl_name + r')"\s+style:family="table">.*?</style:style>', make_tbl_repl(t_width), c_xml, flags=re.DOTALL)

# 5. Fix column widths for Tableau 1, Tableau 2, Tableau 3 to prevent awkward wrapping
col_widths = {
    # Tableau 1: Suivi (total 17.0cm)
    "Tableau1.A": "2.6cm",
    "Tableau1.B": "4.2cm",
    "Tableau1.C": "6.0cm",
    "Tableau1.D": "4.2cm",
    # Tableau 2: TDO (total 16.5cm)
    "Tableau2.A": "3.0cm",
    "Tableau2.B": "3.0cm",
    "Tableau2.C": "10.5cm",
    # Tableau 3: Trace (total 16.5cm)
    "Tableau3.A": "3.8cm",
    "Tableau3.B": "4.6cm",
    "Tableau3.C": "4.4cm",
    "Tableau3.D": "3.7cm",
}
for col_name, width in col_widths.items():
    col_style = f"""<style:style style:name="{col_name}" style:family="table-column"><style:table-column-properties style:column-width="{width}"/></style:style>"""
    c_xml = re.sub(r'<style:style\s+style:name="' + col_name + r'"\s+style:family="table-column">.*?</style:style>', col_style, c_xml, flags=re.DOTALL)

# 6. Table cell styles: border 0.5pt solid #000000, color black, padding
def fix_cell_props(m):
    c_name = m.group(1)
    return f"""<style:style style:name="{c_name}" style:family="table-cell"><style:table-cell-properties style:vertical-align="middle" fo:padding-left="0.2cm" fo:padding-right="0.2cm" fo:padding-top="0.12cm" fo:padding-bottom="0.12cm" fo:border="0.5pt solid #000000"/></style:style>"""
c_xml = re.sub(r'<style:style\s+style:name="(Tableau\d+\.[A-Z]\d+)"\s+style:family="table-cell">.*?</style:style>', fix_cell_props, c_xml, flags=re.DOTALL)

# 7. Clean up any character styles with background-color or char-shading
def clean_text_properties_bg(m):
    chunk = m.group(0)
    chunk = re.sub(r'fo:background-color="[^"]*"', '', chunk)
    chunk = re.sub(r'loext:char-shading-value="[^"]*"', '', chunk)
    chunk = re.sub(r'loext:border[^=]*="[^"]*"', '', chunk)
    chunk = re.sub(r'loext:padding[^=]*="[^"]*"', '', chunk)
    return chunk
c_xml = re.sub(r'<style:style\s+style:name="T\d+"\s+style:family="text">.*?</style:style>', clean_text_properties_bg, c_xml, flags=re.DOTALL)

# 8. Image replacement and resizing (14.0cm x 4.8cm crisp on Page 2)
c_xml = re.sub(r'xlink:href="[^"]*decharge_condensateur_securite\.(png|svg)"', f'xlink:href="Pictures/{png_name}"', c_xml)
c_xml = re.sub(
    r'(<draw:frame [^>]*?)(svg:width="[^"]*")([^>]*?)(svg:height="[^"]*")',
    r'\1svg:width="13.5cm"\3svg:height="4.0cm"',
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

# Repack final seance02.odt
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

# Export PDF to confirm
pdf_out_path = os.path.join(WORKSPACE_DIR, "seance02.pdf")
if os.path.exists(pdf_out_path):
    os.remove(pdf_out_path)

res_pdf = subprocess.run([
    SOFFICE_PATH,
    USER_INSTALL,
    "--headless",
    "--convert-to", "pdf",
    target_odt,
    "--outdir", WORKSPACE_DIR
], capture_output=True, text=True)

print("LibreOffice PDF export returncode:", res_pdf.returncode)
if os.path.exists(pdf_out_path):
    with open(pdf_out_path, "rb") as f:
        pdf_bytes = f.read()
    total_pages = len(re.findall(rb'/Type\s*/Page\b', pdf_bytes))
    print(f"Verified PDF export: {total_pages} pages.")
else:
    print("PDF export failed to create file!")
