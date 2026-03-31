const PUZZLES = [
  {
    answer: "NICE",
    clue: "Foolish, ignorant, simple-minded",
    hints: [
      { era: "1400s", def: "Fussy, fastidious about small details" },
      { era: "1700s", def: "Kind, thoughtful, well-mannered" },
    ],
  },
  {
    answer: "AWFUL",
    clue: "Inspiring great awe, worthy of deep reverence",
    hints: [
      { era: "1500s", def: "Solemnly impressive, awe-inspiring" },
      { era: "1700s", def: "Extremely bad, unpleasant, ugly" },
    ],
  },
  {
    answer: "SILLY",
    clue: "Blessed, holy, spiritually fortunate",
    hints: [
      { era: "1400s", def: "Weak, helpless, defenseless" },
      { era: "1600s", def: "Foolish, senseless, showing poor judgment" },
    ],
  },
  {
    answer: "BULLY",
    clue: "Sweetheart, darling, a term of endearment",
    hints: [
      { era: "1570s", def: "A fine fellow, a good friend" },
      { era: "1700s", def: "A hired ruffian, one who intimidates the weak" },
    ],
  },
  {
    answer: "CLOUD",
    clue: "A mass of rock; a hill, a rocky outcrop",
    hints: [
      { era: "1200s", def: "A mass of earth or clay; a lump" },
      { era: "1500s", def: "Something that obscures or threatens" },
    ],
  },
  {
    answer: "CLUE",
    clue: "A ball of thread or yarn",
    hints: [
      { era: "1500s", def: "A thread guiding one through a labyrinth" },
      { era: "1700s", def: "A fact that serves to reveal something" },
    ],
  },
  {
    answer: "MEAT",
    clue: "Any solid food of any kind, as opposed to drink",
    hints: [
      { era: "1300s", def: "A particular kind or article of food" },
      { era: "1500s", def: "The flesh of animals, distinct from fish" },
    ],
  },
  {
    answer: "GOSSIP",
    clue: "A godparent; a sponsor in baptism",
    hints: [
      { era: "1300s", def: "A close friend, a companion at a birth" },
      { era: "1600s", def: "Idle talk, rumor, trifling conversation" },
    ],
  },
  {
    answer: "NAUGHTY",
    clue: "Having nothing; poor, needy, destitute",
    hints: [
      { era: "1400s", def: "Wicked, morally bad, evil in character" },
      { era: "1600s", def: "Disobedient, badly behaved in children" },
    ],
  },
  {
    answer: "NERVOUS",
    clue: "Sinewy, muscular, possessing great physical strength",
    hints: [
      { era: "1500s", def: "Vigorous, powerful, full of force" },
      { era: "1700s", def: "Easily agitated, suffering from disordered nerves" },
    ],
  },
  {
    answer: "EXPLODE",
    clue: "To drive a performer off stage by clapping and hooting",
    hints: [
      { era: "1600s", def: "To reject with scorn; to hiss off" },
      { era: "1790s", def: "To expand violently with a loud report" },
    ],
  },
  {
    answer: "BROADCAST",
    clue: "To scatter seeds broadly across a field by hand",
    hints: [
      { era: "1800s", def: "To spread widely, as news or information" },
      { era: "1920s", def: "To transmit a radio signal over a wide area" },
    ],
  },
  {
    answer: "SOPHISTICATED",
    clue: "Adulterated, mixed with a foreign substance",
    hints: [
      { era: "1600s", def: "Falsified, altered deceptively" },
      { era: "1800s", def: "Worldly-wise, cultured, refined in manner" },
    ],
  },
  {
    answer: "EGREGIOUS",
    clue: "Distinguished, eminent; remarkably good",
    hints: [
      { era: "1570s", def: "Standing out from the flock; preeminent" },
      { era: "1700s", def: "Remarkably bad, flagrant, outrageous" },
    ],
  },
  {
    answer: "GIRL",
    clue: "A child or young person of either sex",
    hints: [
      { era: "1400s", def: "A female child; also a serving-maid" },
      { era: "1600s", def: "A sweetheart; a female child" },
    ],
  },
  {
    answer: "CUNNING",
    clue: "Possessing knowledge, learned, skillful",
    hints: [
      { era: "1400s", def: "Possessing magical knowledge or skill" },
      { era: "1700s", def: "Crafty, sly, deceitfully clever" },
    ],
  },
  {
    answer: "VILLAIN",
    clue: "A peasant farmer bound to a feudal lord's estate",
    hints: [
      { era: "1300s", def: "A lowborn rustic, a person of base birth" },
      { era: "1600s", def: "A wicked person, a scoundrel" },
    ],
  },
  {
    answer: "HOUND",
    clue: "Any dog whatsoever, regardless of breed",
    hints: [
      { era: "1200s", def: "A dog kept for hunting game" },
      { era: "1600s", def: "To pursue relentlessly, to harass" },
    ],
  },
  {
    answer: "DEER",
    clue: "Any animal, any living creature that is not human",
    hints: [
      { era: "1200s", def: "A wild animal hunted for sport" },
      { era: "1500s", def: "A specific hoofed ruminant with antlers" },
    ],
  },
  {
    answer: "STARVE",
    clue: "To die, from any cause whatsoever",
    hints: [
      { era: "1300s", def: "To die slowly, especially from cold" },
      { era: "1500s", def: "To perish or suffer from lack of food" },
    ],
  },
  {
    answer: "PRETTY",
    clue: "Cunning, crafty, wily in dealings",
    hints: [
      { era: "1400s", def: "Clever, skillfully made, ingenious" },
      { era: "1600s", def: "Pleasing to look at, attractive in a delicate way" },
    ],
  },
  {
    answer: "BRAVE",
    clue: "Showy, gaudy, finely dressed",
    hints: [
      { era: "1500s", def: "Splendid, handsome, making a fine display" },
      { era: "1600s", def: "Courageous, ready to face danger" },
    ],
  },
  {
    answer: "MARSHAL",
    clue: "A servant who tends to horses",
    hints: [
      { era: "1300s", def: "An officer in charge of a royal household" },
      { era: "1500s", def: "A military commander or law enforcement officer" },
    ],
  },
  {
    answer: "HAZARD",
    clue: "A game of dice played for stakes",
    hints: [
      { era: "1400s", def: "A chance, a stroke of luck or fortune" },
      { era: "1600s", def: "A danger, a source of risk or peril" },
    ],
  },
  {
    answer: "FIZZLE",
    clue: "To break wind silently",
    hints: [
      { era: "1500s", def: "To make a hissing or sputtering sound" },
      { era: "1800s", def: "To fail weakly after a promising start" },
    ],
  },
  {
    answer: "MANUFACTURE",
    clue: "To make something by hand, a handmade article",
    hints: [
      { era: "1600s", def: "The process of making goods by hand or machinery" },
      { era: "1800s", def: "To produce goods in large quantities by machine" },
    ],
  },
  {
    answer: "TREACLE",
    clue: "An antidote against venom or poison",
    hints: [
      { era: "1400s", def: "A medicinal compound, a healing remedy" },
      { era: "1600s", def: "A thick, sweet syrup produced in refining sugar" },
    ],
  },
  {
    answer: "PASSENGER",
    clue: "A passer-by, one who passes through a place on foot",
    hints: [
      { era: "1400s", def: "A traveler, a wayfarer on a journey" },
      { era: "1600s", def: "One who is carried in a vehicle or vessel" },
    ],
  },
  {
    answer: "LUXURY",
    clue: "Lust, lechery, sinful indulgence of the flesh",
    hints: [
      { era: "1400s", def: "Lasciviousness, habitual indulgence in pleasure" },
      { era: "1600s", def: "Sumptuous living, costly elegance and comfort" },
    ],
  },
  {
    answer: "ALCOHOL",
    clue: "A very fine powder, especially antimony used as eyeliner",
    hints: [
      { era: "1600s", def: "The pure essence or spirit of any substance" },
      { era: "1700s", def: "The intoxicating ingredient in fermented drinks" },
    ],
  },
  {
    answer: "AMATEUR",
    clue: "A lover of something; one who pursues it for love alone",
    hints: [
      { era: "1800s", def: "One who cultivates a pursuit without doing it professionally" },
      { era: "1900s", def: "Someone unskilled or lacking proficiency" },
    ],
  },
  {
    answer: "ALBUM",
    clue: "A white tablet on which public notices and edicts are recorded",
    hints: [
      { era: "1600s", def: "A book of blank pages for collecting autographs or memorabilia" },
      { era: "1900s", def: "A collection of musical recordings released together" },
    ],
  },
  {
    answer: "ATLAS",
    clue: "A rich satin fabric",
    hints: [
      { era: "1500s", def: "A figure bearing a great weight upon his shoulders" },
      { era: "1600s", def: "A bound collection of maps of the world" },
    ],
  },
];

export default PUZZLES;
