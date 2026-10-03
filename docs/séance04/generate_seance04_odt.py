import os
import re
import shutil
import subprocess
import zipfile
import xml.etree.ElementTree as ET

WORKSPACE_DIR = r"c:\xampp-school\htdocs\3T_2026"
SOFFICE_PATH = r"C:\Program Files\LibreOffice\program\soffice.exe"
USER_INSTALL = "-env:UserInstallation=file:///C:/Users/Cyberbox/AppData/Local/Temp/lo_tmp_s04"

OUT_DIR = os.path.join(WORKSPACE_DIR, "docs", "séance04")
os.makedirs(OUT_DIR, exist_ok=True)

target_odt = os.path.join(OUT_DIR, "seance04.odt")
extract_dir = os.path.join(WORKSPACE_DIR, "temp_gen_s04")
if os.path.exists(extract_dir):
    shutil.rmtree(extract_dir)
os.makedirs(extract_dir)

# HTML source designed specifically for a perfectly balanced 6-page pedagogical document
# following mise_en_page.md specifications
html_doc = r"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Séance 4 : Boucle Répéter ... Jusqu'à &amp; Structure Selon — 3e Sciences</title>
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
      border-bottom: 2pt solid #0284c7;
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
      width: 130mm;
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
       PAGE 1 : EN-TÊTE OFFICIEL, OBJECTIFS & CADRE THÉORIQUE (RÉPÉTER & SELON)
       ========================================================================= -->
  <div class="header-bar">
    <div class="top-meta">République Tunisienne · Ministère de l'Éducation — 3<sup>e</sup> Année Secondaire (Sciences)</div>
    <h1>Séance 4 : Boucle Répéter ... Jusqu'à &amp; Structure Selon</h1>
    <div class="subtitle">Itérations post-test, sélecteurs scalaires, match...case et conception de menus interactifs — 3<sup>e</sup> Sciences</div>
    <div class="badges-line">
      <span class="badge b-blue">Module 1 : Algorithmique &amp; Python</span>
      <span class="badge b-cyan">⏱ Durée : 90 min</span>
      <span class="badge b-green">Pédagogie Différenciée (3 Paliers)</span>
      <span class="badge b-amber">Fiche de Travail Élève</span>
    </div>
  </div>

  <h2>1. Cadre Théorique &amp; Conventions Officielles</h2>

  <p class="callout-rule">
    <strong>⚡ RÈGLES DE CONCEPTION &amp; CRITÈRES DE CHOIX DES STRUCTURES :</strong><br>
    • Itérations inconnues avec <strong>au moins une exécution obligatoire</strong> → Structure itérative <strong><code>Répéter ... Jusqu'à</code></strong> (test postérieur).<br>
    • Aiguillage multiple sur un sélecteur de <strong>type scalaire discret</strong> (Entier ou Caractère) → Structure conditionnelle <strong><code>Selon Sélecteur</code></strong>.<br>
    • 🚫 <strong>Règle Ministérielle Stricte :</strong> Interdiction formelle de l'instruction <code>break</code> pour sortir prématurément d'une boucle.
  </p>

  <h3>A. Boucle à post-condition Répéter ... Jusqu'à</h3>
  <pre>Répéter
  Traitements
Jusqu'à Condition_Arrêt</pre>
  <ul>
    <li>Évalue la condition d'arrêt <strong>après</strong> l'exécution du bloc (au moins 1 itération garantie).</li>
    <li>La boucle s'arrête dès que la condition devient <strong>Vraie</strong> (condition de sortie).</li>
    <li>Traduction Python normalisée : <code>while not (Condition_Arrêt):</code> (inversion logique de la condition).</li>
  </ul>

  <h3>B. Structure conditionnelle à choix multiples Selon</h3>
  <pre>Selon Sélecteur
  Val_1          : Traitement_1
  Val_2, Val_3   : Traitement_2
  Sinon          : Traitement_Par_Défaut
Fin Selon</pre>
  <ul>
    <li>Le sélecteur doit être impérativement de <strong>type scalaire</strong> (Entier ou Caractère). Les types Réel et Chaîne sont interdits.</li>
    <li>Traduction Python 3.10+ : instruction <code>match Sélecteur: case ...</code> (ou cascade <code>if ... elif ... else</code>).</li>
  </ul>

  <!-- =========================================================================
       PAGE 2 : PALIER DÉBUTANT — ACTIVITÉ 1 (TRANSMISSION IOT AVEC ACK)
       ========================================================================= -->
  <h2 style="page-break-before: always;">2. Palier Débutant (Socle &amp; Guidage)</h2>

  <h3>Activité 1 — Boucle Répéter : Transmission IoT avec ACK <span class="badge b-blue">Socle · 15 min</span></h3>

  <p class="callout-consignes">
    <strong>Mise en situation technique (Télécommunication &amp; Réseau IoT) :</strong> Un émetteur radio IoT transmet des trames de données vers une station réceptrice. Chaque trame transmise est acquittée par un code retourné entre 1 et 6. La trame est reçue avec succès uniquement lorsque le code d'accusé de réception <strong>ACK = 6</strong>.
  </p>

  <div class="img-box">
    <img src="images/seance04/communication_radio_station.jpg" alt="Figure 1 : Protocole de communication sans fil IoT : transmission des trames (TX) par l'émetteur radio et accusé de réception (ACK) émis en retour.">
    <div class="img-caption">Figure 1 : Transmission des trames radio (TX) et réception du code d'acquittement (ACK).</div>
  </div>

  <h4>Algorithme de transmission radio &amp; Questions</h4>
  <pre>tentatives ← 0
Répéter
  ack ← alea(1, 6)
  tentatives ← tentatives + 1
  Écrire("Trame transmise... Réponse ACK : ", ack)
Jusqu'à (ack = 6)
Écrire("Connexion établie avec succès en ", tentatives, " essai(s).")</pre>

  <ol>
    <li>Combien de fois le bloc d'émission et d'évaluation s'exécute-t-il au minimum ? Justifier votre réponse.</li>
    <li><em>Exemple illustratif :</em> Si les tirages successifs de la fonction <code>alea(1, 6)</code> sont <code>3</code>, <code>1</code>, <code>5</code>, <code>6</code>, déterminer le nombre final de tentatives et l'affichage complet produit à l'écran.</li>
    <li>Pourquoi la structure <code>Répéter ... Jusqu'à</code> est-elle plus adaptée et plus concise ici qu'une boucle <code>Tant Que</code> ?</li>
  </ol>

  <p class="cahier-box">
    ✍️ <strong>Sur votre cahier :</strong> Rédigez le tracé de la boucle, la trace d'exécution et écrivez la version équivalente utilisant une boucle <code>Tant Que</code> sur votre cahier.
  </p>

  <!-- =========================================================================
       PAGE 3 : PALIER DÉBUTANT — ACTIVITÉ 2 (SELON & GRILLE LOGISTIQUE)
       ========================================================================= -->
  <h3 style="page-break-before: always;">Activité 2 — Structure Selon &amp; Grille logistique 8×8 <span class="badge b-blue">Socle · 15 min</span></h3>

  <p class="callout-consignes">
    <strong>Mise en situation technique (Entrepôt robotisé 4.0) :</strong> Le sol d'un entrepôt logistique automatisé est organisé sous forme d'un damier 8×8 repéré par une colonne (caractère <code>'a'..'h'</code>) et une ligne (entier <code>1..8</code>). À l'instar d'un échiquier, les cases noires constituent des <strong>zones de stockage</strong> de palettes et les cases blanches sont des <strong>voies de circulation</strong> réservées aux robots mobiles autonomes (AMR = Autonomous Mobile Robots).
  </p>

  <div class="img-box">
    <img src="images/seance04/entrepot_sol_echiquier.jpg" alt="Figure 2 : Sol d'entrepôt en forme d'échiquier 8×8 (colonnes 'a'..'h', lignes 1..8) : cases noires de stockage et cases blanches de circulation pour robots mobiles autonomes (AMR).">
    <div class="img-caption">Figure 2 : Damier logistique 8×8 : cases noires (stockage) et cases blanches (circulation AMR).</div>
  </div>

  <h4>Cahier des charges &amp; TDO</h4>
  <ol>
    <li>Écrire l'algorithme d'un programme qui lit les coordonnées <code>col</code> (Caractère) et <code>ligne</code> (Entier) d'un robot et détermine s'il se trouve dans une zone de stockage ou sur une voie de circulation.</li>
    <li><em>Exemples :</em> Pour <code>('a', 5)</code> $\rightarrow$ Stockage (Noire) ; Pour <code>('e', 6)</code> $\rightarrow$ Circulation (Blanche) ; Pour <code>('z', 2)</code> $\rightarrow$ Hors grille !</li>
    <li>Compléter le Tableau de Déclaration des Objets (TDO) ci-dessous.</li>
  </ol>

  <table align="center" border="1">
    <thead>
      <tr>
        <th style="width: 20%;">Objet</th>
        <th style="width: 20%;">Type / Nature</th>
        <th style="width: 60%;">Rôle</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>col</code></td>
        <td>Caractère</td>
        <td>Colonne repérant la position du robot ('a'..'h')</td>
      </tr>
      <tr>
        <td><code>ligne</code></td>
        <td>Entier</td>
        <td>Ligne repérant la position du robot (1..8)</td>
      </tr>
      <tr>
        <td><code>col_num</code></td>
        <td>Entier</td>
        <td>Numéro d'ordre numérique de la colonne (1 pour 'a' à 8 pour 'h')</td>
      </tr>
      <tr>
        <td><code>somme</code></td>
        <td>Entier</td>
        <td>Somme <code>col_num + ligne</code> (détermine la couleur de la case par parité)</td>
      </tr>
    </tbody>
  </table>

  <p class="cahier-box">
    ✍️ <strong>Sur votre cahier :</strong> Rédigez l'algorithme complet avec la structure <code>Selon col</code> (convertissant 'a'..'h' en 1..8) et le test de parité sur votre cahier.
  </p>

  <!-- =========================================================================
       PAGE 4 : PALIER INTERMÉDIAIRE — ACTIVITÉS 3 & 4 (MATCH CASE & DÉBOGAGE)
       ========================================================================= -->
  <h2 style="page-break-before: always;">3. Palier Intermédiaire (Maîtrise &amp; Autonomie)</h2>

  <h3>Activité 3 — Traduction en Python 3.10+ avec match...case <span class="badge b-amber">Maîtrise · 15 min</span></h3>

  <p class="callout-consignes">
    Soit un sélecteur $mois \in [1 ; 12]$. On souhaite afficher le nombre de jours correspondant au mois saisi (en considérant une année standard où février compte 28 jours) :
  </p>

  <pre><code class="language-python">mois = int(input("Numéro du mois (1 à 12) : "))
match mois:
    case 1 | 3 | 5 | 7 | 8 | 10 | 12: print("31 jours")
    case 4 | 6 | 9 | 11:              print("30 jours")
    case 2:                           print("28 jours")
    case _:                           print("Mois invalide !")</code></pre>

  <ol>
    <li>Quel est le rôle de l'opérateur <code>|</code> (pipe) dans les motifs de clause <code>case</code> ?</li>
    <li>À quelle clause algorithmique de la structure <code>Selon</code> correspond le motif universel <code>case _:</code> ?</li>
    <li>Compléter en amont par une boucle <code>while</code> assurant un contrôle de saisie pour forcer $1 \le mois \le 12$.</li>
  </ol>

  <h3>Activité 4 — Débogage d'une structure conditionnelle à choix multiples <span class="badge b-amber">Maîtrise · 15 min</span></h3>

  <p class="callout-consignes">
    Un élève a écrit l'algorithme suivant pour classer des relevés thermiques réels en degrés Celsius :
  </p>

  <pre>Lire(temp)  # temp est de type Réel
Selon temp
  -10.0 .. 0.0 : Écrire("Gel")
  0.1 .. 20.0  : Écrire("Frais")
  Sinon        : Écrire("Chaud")
Fin Selon</pre>

  <table align="center" border="1">
    <thead>
      <tr>
        <th style="width: 30%;">Code Erroné (Non conforme)</th>
        <th style="width: 30%;">Motif du Rejet / Erreur</th>
        <th style="width: 40%;">Correction Conforme (Normalisée)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>Selon temp (type Réel)</code></td>
        <td>Type Réel continu interdit comme sélecteur</td>
        <td>Remplacer par <code>Si ... Sinon Si ... Sinon</code></td>
      </tr>
      <tr>
        <td><code>-10.0 .. 0.0 :</code></td>
        <td>Intervalles réels non discrets</td>
        <td><code>Si (temp &gt;= -10.0) ET (temp &lt;= 0.0) Alors</code></td>
      </tr>
    </tbody>
  </table>

  <p class="cahier-box">
    ✍️ <strong>Sur votre cahier :</strong> Rédigez l'analyse technique de l'erreur et l'algorithme corrigé conforme aux normes sur votre cahier.
  </p>

  <!-- =========================================================================
       PAGE 5 : PALIER AVANCÉ — ACTIVITÉ 5 (MENU DE CALCULS PHYSIQUES)
       ========================================================================= -->
  <h2 style="page-break-before: always;">4. Palier Avancé (Dépassement &amp; Défi Scientifique)</h2>

  <h3>Activité 5 — Menu interactif de calculs physiques <span class="badge b-green">Avancé · 15 min</span></h3>

  <p class="callout-consignes">
    <strong>Mise en situation technique (Laboratoire de sciences physiques) :</strong> On souhaite concevoir une application interactive pour assister les élèves lors de travaux pratiques :<br>
    • <code>1</code> : Vitesse moyenne en m/s ($v = d / t$) avec $t &gt; 0$.<br>
    • <code>2</code> : Énergie cinétique en Joules ($E_c = \frac{1}{2} m v^2$) avec $m &gt; 0$ et $v \ge 0$.<br>
    • <code>3</code> : Puissance moyenne en Watts ($P = \Delta E / \Delta t$) avec $\Delta t &gt; 0$.<br>
    • <code>0</code> : Quitter l'application.
  </p>

  <div class="img-box">
    <img src="images/seance04/menu_physique_energie_cinematique.jpg" alt="Figure 3 : Station d'expérimentation physique : calculs de vitesse moyenne (v = d/t), d'énergie cinétique (Ec = 1/2 m v²) et de puissance (P = ΔE/Δt).">
    <div class="img-caption">Figure 3 : Station de physique : calculs de vitesse (v = d/t), d'énergie (Ec = 1/2 m v²) et de puissance (P = ΔE/Δt).</div>
  </div>

  <h4>Travail demandé &amp; TDO</h4>
  <ol>
    <li>Modéliser ce menu par une structure <code>Selon choix</code> englobée dans une boucle <code>Répéter ... Jusqu'à choix = 0</code> pour maintenir l'application active jusqu'à la demande de sortie.</li>
    <li>Pour chaque option, inclure le contrôle de validité des grandeurs aux dénominateurs ($t &gt; 0$, $m &gt; 0$, $\Delta t &gt; 0$).</li>
    <li>Compléter le Tableau de Déclaration des Objets (TDO) ci-dessous.</li>
  </ol>

  <table align="center" border="1">
    <thead>
      <tr>
        <th style="width: 20%;">Objet</th>
        <th style="width: 20%;">Type / Nature</th>
        <th style="width: 60%;">Rôle</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>choix</code></td>
        <td>Entier</td>
        <td>Option sélectionnée par l'utilisateur dans le menu (0 à 3)</td>
      </tr>
      <tr>
        <td><code>d, t, v</code></td>
        <td>Réel</td>
        <td>Distance (m), durée (s) et vitesse moyenne calculée (m/s)</td>
      </tr>
      <tr>
        <td><code>m, Ec</code></td>
        <td>Réel</td>
        <td>Masse (kg) et énergie cinétique calculée (J)</td>
      </tr>
      <tr>
        <td><code>E, dt, P</code></td>
        <td>Réel</td>
        <td>Énergie (J), intervalle de temps (s) et puissance moyenne calculée (W)</td>
      </tr>
    </tbody>
  </table>

  <p class="cahier-box">
    ✍️ <strong>Sur votre cahier :</strong> Rédigez l'algorithme complet avec gestion du menu et contrôles de saisie stricts sur votre cahier.
  </p>

  <!-- =========================================================================
       PAGE 6 : PALIER AVANCÉ — ACTIVITÉ 6 (LE LIÈVRE ET LA TORTUE) & BILAN
       ========================================================================= -->
  <h3 style="page-break-before: always;">Activité 6 — Défi Scientifique : Le Lièvre et la Tortue <span class="badge b-green">Défi Avancé · 15 min</span></h3>

  <p class="callout-consignes">
    <strong>Modélisation probabiliste (Processus stochastique) :</strong> La course entre le Lièvre et la Tortue est simulée par un tirage répété d'un dé cubique (1 à 6). Le circuit comporte 6 cases.<br>
    À chaque tour : si le <code>6</code> sort, le Lièvre gagne immédiatement. Sinon (tirages 1 à 5), la Tortue avance d'une case et remporte la victoire dès qu'elle atteint la case 6.
  </p>

  <div class="img-box">
    <img src="images/seance04/lievre_et_tortue_course.jpg" alt="Figure 4 : Simulation de la course : si le dé affiche 6, le Lièvre l'emporte immédiatement ; sinon, la Tortue avance d'une case vers la case 6.">
    <div class="img-caption">Figure 4 : Simulation probabiliste : dé = 6 (Lièvre vainqueur immédiat), sinon Tortue progresse vers la case 6.</div>
  </div>

  <h4>Travail demandé &amp; Trace d'exécution</h4>
  <ol>
    <li>Écrire l'algorithme de simulation en pseudo-code à l'aide d'une boucle <code>Répéter ... Jusqu'à (de = 6 OU case_tortue = 6)</code>.</li>
    <li>Dresser le TDO des objets manipulés.</li>
  </ol>

  <table align="center" border="1">
    <thead>
      <tr>
        <th style="width: 15%;">Tour</th>
        <th style="width: 15%;">Lancer (de)</th>
        <th style="width: 20%;">Case Tortue</th>
        <th style="width: 20%;">Condition d'Arrêt</th>
        <th style="width: 30%;">Événement / Décision</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center">Tour 1</td>
        <td class="text-center">2</td>
        <td class="text-center">Case 1 / 6</td>
        <td class="text-center">Faux</td>
        <td>Tortue progresse d'une case</td>
      </tr>
      <tr>
        <td class="text-center">Tour 2</td>
        <td class="text-center">5</td>
        <td class="text-center">Case 2 / 6</td>
        <td class="text-center">Faux</td>
        <td>Tortue progresse d'une case</td>
      </tr>
      <tr>
        <td class="text-center">Tour 3</td>
        <td class="text-center">6</td>
        <td class="text-center">Case 2 / 6</td>
        <td class="text-center"><strong>VRAI (dé = 6)</strong></td>
        <td>Sortie : <strong>VICTOIRE DU LIÈVRE !</strong></td>
      </tr>
    </tbody>
  </table>

  <p class="callout-synthesis">
    <strong>🎯 Bilan Pédagogique &amp; Synthèse de Séance :</strong><br>
    • <strong>Post-condition :</strong> La boucle <code>Répéter ... Jusqu'à</code> exécute son corps au moins une fois et s'arrête dès que la condition devient Vraie.<br>
    • <strong>Traduction Python :</strong> <code>while not (Condition_Arrêt):</code> traduit directement la boucle Répéter en inversant la condition logique.<br>
    • <strong>Aiguillage Selon :</strong> Exige un sélecteur scalaire discret (Entier ou Caractère). Implémenté en Python 3.10+ par <code>match...case</code>.<br>
    • <strong>Règle ministérielle :</strong> L'instruction <code>break</code> est strictement prohibée. Toutes les sorties de boucle sont pilotées par des conditions logiques claires.
  </p>

  <p class="cahier-box">
    ✍️ <strong>Sur votre cahier :</strong> Implémentez la simulation en Python et testez 10 exécutions consécutives pour observer expérimentalement la fréquence de victoire de chaque concurrent.
  </p>

</body>
</html>
"""

temp_html_path = os.path.join(WORKSPACE_DIR, "seance04_base.html")
with open(temp_html_path, "w", encoding="utf-8") as f:
    f.write(html_doc)

temp_odt_path = os.path.join(WORKSPACE_DIR, "seance04_base.odt")
if os.path.exists(temp_odt_path):
    os.remove(temp_odt_path)

# Convert HTML to basic ODT via LibreOffice
subprocess.run([
    SOFFICE_PATH,
    USER_INSTALL,
    "--headless",
    "--convert-to", "odt:writer8",
    temp_html_path,
    "--outdir", WORKSPACE_DIR
], capture_output=True, text=True)

# Extract ODT
with zipfile.ZipFile(temp_odt_path, 'r') as z:
    z.extractall(extract_dir)

# Embed images into Pictures/
pictures_dir = os.path.join(extract_dir, "Pictures")
os.makedirs(pictures_dir, exist_ok=True)

images_to_embed = [
    ("communication_radio_station.jpg", "image/jpeg"),
    ("entrepot_sol_echiquier.jpg", "image/jpeg"),
    ("menu_physique_energie_cinematique.jpg", "image/jpeg"),
    ("lievre_et_tortue_course.jpg", "image/jpeg")
]

manifest_entries = []
for img_name, media_type in images_to_embed:
    src_path = os.path.join(WORKSPACE_DIR, "images", "seance04", img_name)
    dst_path = os.path.join(pictures_dir, img_name)
    if os.path.exists(src_path):
        shutil.copyfile(src_path, dst_path)
        manifest_entries.append(f'  <manifest:file-entry manifest:full-path="Pictures/{img_name}" manifest:media-type="{media_type}"/>\n')

# Update META-INF/manifest.xml
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
doc_title_header = "Séance 4 · Boucle Répéter ... Jusqu'à &amp; Structure Selon — 3e Sciences"
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
    r'<text:p text:style-name="P2">(Séance 4\s*:.*?)</text:p>',
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
    # Tableau 1: TDO Logistique (total 17.0cm)
    "Tableau1.A": "3.5cm",
    "Tableau1.B": "3.5cm",
    "Tableau1.C": "10.0cm",
    # Tableau 2: Débogage température (total 17.0cm)
    "Tableau2.A": "5.0cm",
    "Tableau2.B": "5.0cm",
    "Tableau2.C": "7.0cm",
    # Tableau 3: TDO Physique (total 17.0cm)
    "Tableau3.A": "3.5cm",
    "Tableau3.B": "3.5cm",
    "Tableau3.C": "10.0cm",
    # Tableau 4: Trace Lièvre & Tortue (total 17.0cm)
    "Tableau4.A": "2.5cm",
    "Tableau4.B": "2.5cm",
    "Tableau4.C": "3.5cm",
    "Tableau4.D": "3.5cm",
    "Tableau4.E": "5.0cm",
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

# 8. Image replacement and resizing (compact height 3.2cm so each diagram fits on its page cleanly)
for img_name, _ in images_to_embed:
    base_stem = os.path.splitext(img_name)[0]
    c_xml = re.sub(r'xlink:href="[^"]*' + base_stem + r'\.(png|svg|jpg)"', f'xlink:href="Pictures/{img_name}"', c_xml)

c_xml = re.sub(
    r'(<draw:frame [^>]*?)(svg:width="[^"]*")([^>]*?)(svg:height="[^"]*")',
    r'\1svg:width="13.0cm"\3svg:height="3.2cm"',
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

# Repack final seance04.odt
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
pdf_out_path = os.path.join(OUT_DIR, "seance04.pdf")
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
