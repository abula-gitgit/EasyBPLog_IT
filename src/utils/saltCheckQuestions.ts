/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SaltQuestion } from '../types';

export const SALT_QUESTIONS: SaltQuestion[] = [
  {
    id: 1,
    question: '1. Con quale frequenza consuma salumi e insaccati (prosciutto crudo o cotto, salame, mortadella, bresaola, speck, pancetta)?',
    category: 'Salumi e Insaccati',
    options: [
      { label: 'Quasi tutti i giorni (5+ giorni a settimana)', points: 3 },
      { label: '3 o 4 volte a settimana', points: 2 },
      { label: '1 o 2 volte a settimana', points: 1 },
      { label: 'Raramente o mai', points: 0 },
    ],
  },
  {
    id: 2,
    question: '2. Con quale frequenza utilizza dadi da brodo, granulari pronti o zuppe/minestre confezionate?',
    category: 'Dadi e Minestre Pronte',
    options: [
      { label: 'Quasi tutti i giorni (5+ volte a settimana)', points: 3 },
      { label: '3 o 4 volte a settimana', points: 2 },
      { label: '1 o 2 volte a settimana', points: 1 },
      { label: 'Raramente (uso brodo vegetale fatto in casa senza sale)', points: 0 },
    ],
  },
  {
    id: 3,
    question: '3. Con quale frequenza mangia pizza, focaccia salata, piadine, panini farciti o fast-food?',
    category: 'Pizza, Focaccia e Street Food',
    options: [
      { label: '3 o più volte a settimana', points: 3 },
      { label: '1 o 2 volte a settimana', points: 2 },
      { label: 'Qualche volta al mese', points: 1 },
      { label: 'Raramente o mai', points: 0 },
    ],
  },
  {
    id: 4,
    question: '4. Quante fette di pane comune salato, grissini, cracker o taralli consuma ogni giorno?',
    category: 'Pane e Prodotti da Forno',
    options: [
      { label: '4 o più porzioni ogni giorno', points: 3 },
      { label: '2 o 3 porzioni al giorno', points: 2 },
      { label: '1 piccola porzione o saltuariamente', points: 1 },
      { label: 'Uso pane toscano sciocco (senza sale) o integrale iposodico', points: 0 },
    ],
  },
  {
    id: 5,
    question: '5. Con quale frequenza consuma aperitivi salati (patatine, noccioline salate, olive in salamoia, salatini)?',
    category: 'Snack e Aperitivi',
    options: [
      { label: 'Quasi tutti i giorni', points: 3 },
      { label: '3 o 4 volte a settimana', points: 2 },
      { label: '1 o 2 volte a settimana', points: 1 },
      { label: 'Raramente (o frutta secca non salata)', points: 0 },
    ],
  },
  {
    id: 6,
    question: '6. Come utilizza sughi pronti in barattolo, salse confezionate, capperi sotto sale, acciughe o salsa di soia?',
    category: 'Sughi Pronti e Condimenti',
    options: [
      { label: 'Li uso abbondantemente quasi ogni giorno', points: 3 },
      { label: 'Uso spesso sughi e salse già pronte', points: 2 },
      { label: 'Solo piccole quantità occasionalmente', points: 1 },
      { label: 'Condisco con olio extravergine, pomodoro fresco ed erbe', points: 0 },
    ],
  },
  {
    id: 7,
    question: '7. Con quale frequenza consuma piatti pronti surgelati, cibi in scatola (tonno in salamoia, legumi in scatola) o primi pronti?',
    category: 'Piatti Pronti e Conserve',
    options: [
      { label: 'Quasi tutti i giorni (4+ volte a settimana)', points: 3 },
      { label: '2 o 3 volte a settimana', points: 2 },
      { label: 'Una volta a settimana o meno', points: 1 },
      { label: 'Raramente (cucino alimenti freschi)', points: 0 },
    ],
  },
  {
    id: 8,
    question: '8. Ha l’abitudine di aggiungere molto sale nell’acqua della pasta o di salare i piatti a tavola?',
    category: 'Sale nella Pasta e a Tavola',
    options: [
      { label: 'Salo abbondantemente l’acqua e aggiungo sale a tavola', points: 3 },
      { label: 'Uso la dose abituale di sale e a volte aggiungo a tavola', points: 2 },
      { label: 'Uso poco sale in cottura e mai a tavola', points: 1 },
      { label: 'Misuro il sale con il cucchiaino e non metto la saliera a tavola', points: 0 },
    ],
  },
  {
    id: 9,
    question: '9. Con quale frequenza pranza al bar, in trattoria, in mensa o acquista piatti pronti a pranzo?',
    category: 'Pranzo Fuori Casa',
    options: [
      { label: 'Quasi tutti i giorni (4–5+ volte a settimana)', points: 3 },
      { label: '2 o 3 volte a settimana', points: 2 },
      { label: 'Una volta a settimana', points: 1 },
      { label: 'Raramente (pasto preparato a casa)', points: 0 },
    ],
  },
  {
    id: 10,
    question: '10. Con quale frequenza cena al ristorante, in pizzeria o ordina cibo a domicilio?',
    category: 'Cena Fuori / Asporto',
    options: [
      { label: 'Quasi tutti i giorni (4+ volte a settimana)', points: 3 },
      { label: '2 o 3 volte a settimana', points: 2 },
      { label: 'Una volta a settimana', points: 1 },
      { label: 'Raramente (cena preparata in casa)', points: 0 },
    ],
  },
  {
    id: 11,
    question: '11. Con quale frequenza consuma formaggi stagionati o saporiti (pecorino, parmigiano/grana, gorgonzola, provolone, feta)?',
    category: 'Formaggi e Latticini',
    options: [
      { label: 'Più volte al giorno (anche abbondante sui primi)', points: 3 },
      { label: 'Una porzione tutti i giorni', points: 2 },
      { label: 'Qualche volta a settimana', points: 1 },
      { label: 'Raramente o preferisco ricotta fresca / mozzarella senza sale', points: 0 },
    ],
  },
  {
    id: 12,
    question: '12. Quale frase descrive meglio il Suo gusto personale riguardo al sale?',
    category: 'Preferenza di Gusto',
    options: [
      { label: 'Preferisco i piatti ben saporiti e decisi', points: 3 },
      { label: 'Gradisco la sapidità normale', points: 2 },
      { label: 'Preferisco i cibi poco salati', points: 1 },
      { label: 'Cucino con pochissimo sale usando basilico, rosmarino, aglio e limone', points: 0 },
    ],
  },
];

export function evaluateSaltScore(totalPoints: number): {
  level: 'excellent' | 'good' | 'warning' | 'danger';
  title: string;
  description: string;
  advice: string;
  badgeColor: string;
} {
  if (totalPoints <= 8) {
    return {
      level: 'excellent',
      title: 'Apporto di Sale Ottimale (Target ESC / SIIA)',
      description: 'Il Suo consumo stimato di sodio è eccellente e rispetta le raccomandazioni cardiologiche (< 5 g di sale al giorno).',
      advice: 'Continui a privilegiare la dieta mediterranea fresca, l’olio extravergine e le erbe aromatiche.',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    };
  } else if (totalPoints <= 14) {
    return {
      level: 'good',
      title: 'Consumo Moderato di Sale (Vicino al Limite)',
      description: 'Il consumo di sale è prossimo alla soglia massima raccomandata dalla Società Italiana dell’Ipertensione Arteriosa (SIIA).',
      advice: 'Provi a ridurre il sale nell’acqua della pasta e limiti salumi, formaggi stagionati e dadi da brodo.',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    };
  } else if (totalPoints <= 21) {
    return {
      level: 'warning',
      title: 'Consumo Elevato di Sale (Attenzione alla Pressione)',
      description: 'L’apporto quotidiano di sodio supera i livelli raccomandati e può favorire l’aumento della pressione arteriosa.',
      advice: 'Riduca prosciutto, salumi, pane salato, grissini e formaggi stagionati. Provi il pane sciocco senza sale.',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    };
  } else {
    return {
      level: 'danger',
      title: 'Eccesso Importante di Sodio (Intervento Consigliato)',
      description: 'Un eccesso di sale trattiene liquidi e riduce l’efficacia dei farmaci antipertensivi.',
      advice: 'Ne parli con il Suo medico o cardiologo per adottare una dieta iposodica graduale.',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    };
  }
}

export const BP_MEASUREMENT_RULES = [
  {
    number: '1',
    title: '5 Minuti di Riposo Prima',
    desc: 'Rimanga seduto in un ambiente tranquillo per 5 minuti prima della misurazione. Non parli durante il gonfiaggio.',
  },
  {
    number: '2',
    title: 'Postura Corretta sulla Sedia',
    desc: 'Schiena ben appoggiata allo schienale, piedi piatti sul pavimento e gambe non accavallate.',
  },
  {
    number: '3',
    title: 'Braccio all’Altezza del Cuore',
    desc: 'Appoggi l’avambraccio su un tavolo in modo che il bracciale si trovi esattamente al livello del cuore.',
  },
  {
    number: '4',
    title: 'Posizionamento del Bracciale',
    desc: 'Applichi il bracciale direttamente sul braccio nudo (senza maniche strette), 2 cm sopra la piega del gomito.',
  },
  {
    number: '5',
    title: 'Misurazione del Mattino',
    desc: 'Misuri entro 1 ora dal risveglio, dopo aver svuotato la vescica e prima della colazione e dei farmaci.',
  },
  {
    number: '6',
    title: 'Misurazione della Sera',
    desc: 'Misuri prima di cena o prima di coricarsi, evitando di misurare subito dopo attività fisica, bagno caldo o alcolici.',
  },
  {
    number: '7',
    title: 'Due Misurazioni (a 1 Minuto di Distanza)',
    desc: 'Effettui 2 misurazioni consecutive a 1 minuto di intervallo. EasyBPLog calcola automaticamente la media.',
  },
];
