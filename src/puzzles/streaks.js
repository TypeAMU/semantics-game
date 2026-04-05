import { decode } from "./obfuscate";

const STREAKS = [
  {
    answer: decode("TklDRQ=="),
    clue: "Foolish, ignorant, simple-minded",
    hints: [
      { era: "1400s", def: "Fussy, fastidious about small details" },
      { era: "1700s", def: "Kind, thoughtful, well-mannered" },
    ],
  },
  {
    answer: decode("QVdGVUw="),
    clue: "Inspiring great awe, worthy of deep reverence",
    hints: [
      { era: "1500s", def: "Solemnly impressive, awe-inspiring" },
      { era: "1700s", def: "Extremely bad, unpleasant, ugly" },
    ],
  },
  {
    answer: decode("U0lMTFk="),
    clue: "Blessed, holy, spiritually fortunate",
    hints: [
      { era: "1400s", def: "Weak, helpless, defenseless" },
      { era: "1600s", def: "Foolish, senseless, showing poor judgment" },
    ],
  },
  {
    answer: decode("QlVMTFk="),
    clue: "Sweetheart, darling, a term of endearment",
    hints: [
      { era: "1570s", def: "A fine fellow, a good friend" },
      { era: "1700s", def: "A hired ruffian, one who intimidates the weak" },
    ],
  },
  {
    answer: decode("Q0xPVUQ="),
    clue: "A mass of rock; a hill, a rocky outcrop",
    hints: [
      { era: "1200s", def: "A mass of earth or clay; a lump" },
      { era: "1500s", def: "Something that obscures or threatens" },
    ],
  },
  {
    answer: decode("Q0xVRQ=="),
    clue: "A ball of thread or yarn",
    hints: [
      { era: "1500s", def: "A thread guiding one through a labyrinth" },
      { era: "1700s", def: "A fact that serves to reveal something" },
    ],
  },
  {
    answer: decode("TUVBVA=="),
    clue: "Any solid food of any kind, as opposed to drink",
    hints: [
      { era: "1300s", def: "A particular kind or article of food" },
      { era: "1500s", def: "The flesh of animals, distinct from fish" },
    ],
  },
  {
    answer: decode("R09TU0lQ"),
    clue: "A godparent; a sponsor in baptism",
    hints: [
      { era: "1300s", def: "A close friend, a companion at a birth" },
      { era: "1600s", def: "Idle talk, rumor, trifling conversation" },
    ],
  },
  {
    answer: decode("TkFVR0hUWQ=="),
    clue: "Having nothing; poor, needy, destitute",
    hints: [
      { era: "1400s", def: "Wicked, morally bad, evil in character" },
      { era: "1600s", def: "Disobedient, badly behaved in children" },
    ],
  },
  {
    answer: decode("TkVSVk9VUw=="),
    clue: "Sinewy, muscular, possessing great physical strength",
    hints: [
      { era: "1500s", def: "Vigorous, powerful, full of force" },
      { era: "1700s", def: "Easily agitated, suffering from disordered nerves" },
    ],
  },
  {
    answer: decode("RVhQTE9ERQ=="),
    clue: "To drive a performer off stage by clapping and hooting",
    hints: [
      { era: "1600s", def: "To reject with scorn; to hiss off" },
      { era: "1790s", def: "To expand violently with a loud report" },
    ],
  },
  {
    answer: decode("QlJPQURDQVNU"),
    clue: "To scatter seeds broadly across a field by hand",
    hints: [
      { era: "1800s", def: "To spread widely, as news or information" },
      { era: "1920s", def: "To transmit a radio signal over a wide area" },
    ],
  },
  {
    answer: decode("RUdSRUdJT1VT"),
    clue: "Distinguished, eminent; remarkably good",
    hints: [
      { era: "1570s", def: "Standing out from the flock; preeminent" },
      { era: "1700s", def: "Remarkably bad, flagrant, outrageous" },
    ],
  },
  {
    answer: decode("R0lSTA=="),
    clue: "A child or young person of either sex",
    hints: [
      { era: "1400s", def: "A female child; also a serving-maid" },
      { era: "1600s", def: "A sweetheart; a female child" },
    ],
  },
  {
    answer: decode("Q1VOTklORw=="),
    clue: "Possessing knowledge, learned, skillful",
    hints: [
      { era: "1400s", def: "Possessing magical knowledge or skill" },
      { era: "1700s", def: "Crafty, sly, deceitfully clever" },
    ],
  },
  {
    answer: decode("VklMTEFJTg=="),
    clue: "A peasant farmer bound to a feudal lord's estate",
    hints: [
      { era: "1300s", def: "A lowborn rustic, a person of base birth" },
      { era: "1600s", def: "A wicked person, a scoundrel" },
    ],
  },
  {
    answer: decode("SE9VTkQ="),
    clue: "Any dog whatsoever, regardless of breed",
    hints: [
      { era: "1200s", def: "A dog kept for hunting game" },
      { era: "1600s", def: "To pursue relentlessly, to harass" },
    ],
  },
  {
    answer: decode("REVFUg=="),
    clue: "Any animal, any living creature that is not human",
    hints: [
      { era: "1200s", def: "A wild animal hunted for sport" },
      { era: "1500s", def: "A specific hoofed ruminant with antlers" },
    ],
  },
  {
    answer: decode("U1RBUlZF"),
    clue: "To die, from any cause whatsoever",
    hints: [
      { era: "1300s", def: "To die slowly, especially from cold" },
      { era: "1500s", def: "To perish or suffer from lack of food" },
    ],
  },
  {
    answer: decode("UFJFVFRZ"),
    clue: "Cunning, crafty, wily in dealings",
    hints: [
      { era: "1400s", def: "Clever, skillfully made, ingenious" },
      { era: "1600s", def: "Pleasing to look at, attractive in a delicate way" },
    ],
  },
  {
    answer: decode("QlJBVkU="),
    clue: "Showy, gaudy, finely dressed",
    hints: [
      { era: "1500s", def: "Splendid, handsome, making a fine display" },
      { era: "1600s", def: "Courageous, ready to face danger" },
    ],
  },
  {
    answer: decode("TUFSU0hBTA=="),
    clue: "A servant who tends to horses",
    hints: [
      { era: "1300s", def: "An officer in charge of a royal household" },
      { era: "1500s", def: "A military commander or law enforcement officer" },
    ],
  },
  {
    answer: decode("SEFaQVJE"),
    clue: "A game of dice played for stakes",
    hints: [
      { era: "1400s", def: "A chance, a stroke of luck or fortune" },
      { era: "1600s", def: "A danger, a source of risk or peril" },
    ],
  },
  {
    answer: decode("RklaWkxF"),
    clue: "To break wind silently",
    hints: [
      { era: "1500s", def: "To make a hissing or sputtering sound" },
      { era: "1800s", def: "To fail weakly after a promising start" },
    ],
  },
  {
    answer: decode("VFJFQUNMRQ=="),
    clue: "An antidote against venom or poison",
    hints: [
      { era: "1400s", def: "A medicinal compound, a healing remedy" },
      { era: "1600s", def: "A thick, sweet syrup produced in refining sugar" },
    ],
  },
  {
    answer: decode("UEFTU0VOR0VS"),
    clue: "A passer-by, one who passes through a place on foot",
    hints: [
      { era: "1400s", def: "A traveler, a wayfarer on a journey" },
      { era: "1600s", def: "One who is carried in a vehicle or vessel" },
    ],
  },
  {
    answer: decode("TFVYVVJZ"),
    clue: "Lust, lechery, sinful indulgence of the flesh",
    hints: [
      { era: "1400s", def: "Lasciviousness, habitual indulgence in pleasure" },
      { era: "1600s", def: "Sumptuous living, costly elegance and comfort" },
    ],
  },
  {
    answer: decode("QUxDT0hPTA=="),
    clue: "A very fine powder, especially antimony used as eyeliner",
    hints: [
      { era: "1600s", def: "The pure essence or spirit of any substance" },
      { era: "1700s", def: "The intoxicating ingredient in fermented drinks" },
    ],
  },
  {
    answer: decode("QU1BVEVVUg=="),
    clue: "A lover of something; one who pursues it for love alone",
    hints: [
      { era: "1800s", def: "One who cultivates a pursuit without doing it professionally" },
      { era: "1900s", def: "Someone unskilled or lacking proficiency" },
    ],
  },
  {
    answer: decode("QUxCVU0="),
    clue: "A white tablet on which public notices and edicts are recorded",
    hints: [
      { era: "1600s", def: "A book of blank pages for collecting autographs or memorabilia" },
      { era: "1900s", def: "A collection of musical recordings released together" },
    ],
  },
  {
    answer: decode("QVRMQVM="),
    clue: "A rich satin fabric",
    hints: [
      { era: "1500s", def: "A figure bearing a great weight upon his shoulders" },
      { era: "1600s", def: "A bound collection of maps of the world" },
    ],
  },
];

export default STREAKS;
