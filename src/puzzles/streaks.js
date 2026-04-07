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
  {
    answer: decode("Q0FSRUVS"),
    clue: "A short gallop of a horse; a racecourse",
    hints: [
      { era: "1500s", def: "Speed; swift forward motion" },
      { era: "1800s", def: "The general course of one's actions through life" },
    ],
  },
  {
    answer: decode("Q0FNUA=="),
    clue: "An army; conflict; battle",
    hints: [
      { era: "1500s", def: "To fight or contend; to wrangle" },
      { era: "1600s", def: "A base where military forces are lodged" },
    ],
  },
  {
    answer: decode("RE9PTQ=="),
    clue: "A law; a judgment or decision",
    hints: [
      { era: "1300s", def: "A sentence or penalty for illegal behaviour" },
      { era: "1600s", def: "The Last Judgment; final divine reckoning" },
    ],
  },
  {
    answer: decode("Qk9PVA=="),
    clue: "A medicinal cure or remedy",
    hints: [
      { era: "1500s", def: "Profit, gain, advantage; to be of use" },
      { era: "1600s", def: "Repair work; the act of fixing structures" },
    ],
  },
  {
    answer: decode("RUxFTUVOVA=="),
    clue: "The sky; one of the heavenly spheres carrying the celestial bodies",
    hints: [
      { era: "1500s", def: "Earth, water, air, or fire as a fundamental substance" },
      { era: "1700s", def: "The basic principles or rudiments of a field of knowledge" },
    ],
  },
  {
    answer: decode("Q0xFUks="),
    clue: "A scholar; a man of learning",
    hints: [
      { era: "1400s", def: "A cleric or clergyman in holy orders" },
      { era: "1800s", def: "One who works with records and accounts in an office" },
    ],
  },
  {
    answer: decode("Q0FTVUFM"),
    clue: "A vagrant; a tramp receiving parish relief for the night",
    hints: [
      { era: "1800s", def: "Happening by chance; coming without regularity" },
      { era: "1900s", def: "Informal, relaxed; designed for everyday use" },
    ],
  },
  {
    answer: decode("Q0hBTkdF"),
    clue: "A public house; an alehouse",
    hints: [
      { era: "1400s", def: "To exchange one thing for another" },
      { era: "1600s", def: "To become something different" },
    ],
  },
  {
    answer: decode("QkxBTks="),
    clue: "A small French coin, originally of silver, worth five deniers",
    hints: [
      { era: "1500s", def: "White or pale; without colour" },
      { era: "1600s", def: "An empty space; a void on a page to be filled in" },
    ],
  },
  {
    answer: decode("QlVMTEVU"),
    clue: "A small ball; a cannonball",
    hints: [
      { era: "1500s", def: "A round projectile fired from a musket or cannon" },
      { era: "1800s", def: "A pointed metal projectile shot from a gun at high speed" },
    ],
  },
  {
    answer: decode("QVZPSUQ="),
    clue: "To make empty or void; to emit or throw out",
    hints: [
      { era: "1400s", def: "To leave, evacuate; to withdraw from a place" },
      { era: "1600s", def: "To keep away from; to shun" },
    ],
  },
  {
    answer: decode("RFJBSU4="),
    clue: "A drink; a draught of liquor",
    hints: [
      { era: "1500s", def: "To draw off liquid gradually; to filter or strain" },
      { era: "1700s", def: "A conduit or channel for carrying off water" },
    ],
  },
  {
    answer: decode("QlJBTkQ="),
    clue: "A sword; a flame; a piece of burning wood",
    hints: [
      { era: "1500s", def: "A mark burned into flesh with a hot iron" },
      { era: "1800s", def: "A particular make or type of goods; a trademark" },
    ],
  },
  {
    answer: decode("REVCQVRF"),
    clue: "To fight; to engage in combat; strife",
    hints: [
      { era: "1400s", def: "To strive for; to contend in battle" },
      { era: "1600s", def: "To argue or dispute, especially in a formal setting" },
    ],
  },
  {
    answer: decode("QkFSTg=="),
    clue: "A child; a son or daughter",
    hints: [
      { era: "1200s", def: "Offspring; one's progeny" },
      { era: "1500s", def: "A building for storing grain after harvest" },
    ],
  },
  {
    answer: decode("QkVMTA=="),
    clue: "A bubble, especially on the surface of water",
    hints: [
      { era: "1400s", def: "A hollow, rounded shape; a blister or vesicle" },
      { era: "1600s", def: "A cup-shaped metal instrument that rings when struck" },
    ],
  },
  {
    answer: decode("QlVUVE9O"),
    clue: "A unit of length equal to one-twelfth of an inch",
    hints: [
      { era: "1500s", def: "A bud or knob on a plant; a clove of garlic" },
      { era: "1700s", def: "A small disc sewn to a garment, passed through a loop to fasten it" },
    ],
  },
  {
    answer: decode("REFOR0VS"),
    clue: "Dominion; a lord's power to harm or penalise his subjects",
    hints: [
      { era: "1400s", def: "Liability; being within reach of a penalty" },
      { era: "1600s", def: "Exposure to likely harm; peril" },
    ],
  },
  {
    answer: decode("Q0xJUA=="),
    clue: "To hug; to embrace; to clasp in the arms",
    hints: [
      { era: "1500s", def: "To hold tightly; to grip or cling to" },
      { era: "1700s", def: "To fasten together with a small device" },
    ],
  },
  {
    answer: decode("Q0hFQVA="),
    clue: "A market; a marketplace; trade and traffic of goods",
    hints: [
      { era: "1400s", def: "A bargain; a good price for something purchased" },
      { era: "1600s", def: "Low in price; costing little" },
    ],
  },
  {
    answer: decode("Q0FLRQ=="),
    clue: "A foolish person",
    hints: [
      { era: "1300s", def: "A flat round of bread baked hard on both sides" },
      { era: "1600s", def: "A rich, sweet dessert food made of flour and sugar" },
    ],
  },
  {
    answer: decode("REFSRQ=="),
    clue: "To lie or crouch down in fear; to cower",
    hints: [
      { era: "1400s", def: "To stare stupidly or vacantly; to gaze in wonder" },
      { era: "1600s", def: "To have enough courage to do something" },
    ],
  },
  {
    answer: decode("RkFDVA=="),
    clue: "A wrongful or criminal deed; an evil act",
    hints: [
      { era: "1500s", def: "A thing done or performed; an action or deed" },
      { era: "1700s", def: "Something actual, as opposed to invented; a truth" },
    ],
  },
  {
    answer: decode("TElOSw=="),
    clue: "A torch, used to light dark streets at night",
    hints: [
      { era: "1500s", def: "A single ring or loop of a chain" },
      { era: "1700s", def: "A connection between places, people, or ideas" },
    ],
  },
  {
    answer: decode("TUFMTA=="),
    clue: "An old game played with mallets and balls; pall-mall",
    hints: [
      { era: "1700s", def: "A shaded public walk or promenade, originally for playing the game" },
      { era: "1900s", def: "A large enclosed shopping centre" },
    ],
  },
  {
    answer: decode("Tk9JU0U="),
    clue: "Music; a concert; a company of musicians; a band",
    hints: [
      { era: "1300s", def: "A loud outcry; a clamour or commotion" },
      { era: "1600s", def: "Any unwanted or unpleasant sound" },
    ],
  },
  {
    answer: decode("RE9VQlQ="),
    clue: "To fill with fear; to affright; to dread",
    hints: [
      { era: "1400s", def: "To suspect; to fear that something is true" },
      { era: "1600s", def: "To be undecided about; to lack confidence in" },
    ],
  },
  {
    answer: decode("Q1JFQU0="),
    clue: "The chrism; consecrated oil used in anointing ceremonies",
    hints: [
      { era: "1400s", def: "The rich, fatty part of milk that rises to the top" },
      { era: "1700s", def: "The best part of anything; the choicest portion" },
    ],
  },
  {
    answer: decode("RE9DVE9S"),
    clue: "A teacher; one skilled in a profession or branch of knowledge",
    hints: [
      { era: "1500s", def: "A learned theologian; a father of the church" },
      { era: "1700s", def: "A physician; one who practises the healing art" },
    ],
  },
  {
    answer: decode("QlVER0VU"),
    clue: "A wallet, purse, or leather bag",
    hints: [
      { era: "1600s", def: "A compact collection of things; a bundle" },
      { era: "1800s", def: "The amount of money earmarked for a particular purpose" },
    ],
  },
  {
    answer: decode("Q0FSUEVU"),
    clue: "A wrought cover for tables; a thick ornamental tablecloth",
    hints: [
      { era: "1500s", def: "A rich fabric spread over any surface for decoration" },
      { era: "1700s", def: "A thick woven covering laid on a floor" },
    ],
  },
  {
    answer: decode("RU5HSU5F"),
    clue: "Ingenuity; cunning; trickery; guile",
    hints: [
      { era: "1400s", def: "A device or contrivance; an ingenious invention" },
      { era: "1700s", def: "A machine that converts energy into mechanical force" },
    ],
  },
  {
    answer: decode("Qk9UVExF"),
    clue: "A bundle, especially of hay; something tied in a bundle",
    hints: [
      { era: "1400s", def: "A dwelling; a habitation; an abode" },
      { era: "1600s", def: "A container of glass or plastic for holding liquid" },
    ],
  },
  {
    answer: decode("Q0FOQ0VM"),
    clue: "An enclosure; a boundary; a limit",
    hints: [
      { era: "1400s", def: "To shut out with a railing or latticework" },
      { era: "1600s", def: "To cross out or strike through; to annul" },
    ],
  },
  {
    answer: decode("RVNTQVk="),
    clue: "A test or experiment; a trial; an assay",
    hints: [
      { era: "1500s", def: "An attempt or endeavour; a try" },
      { era: "1600s", def: "A written composition exploring a topic at moderate length" },
    ],
  },
  {
    answer: decode("REVDSURF"),
    clue: "To cut off; to separate",
    hints: [
      { era: "1500s", def: "To settle a contest or dispute; to determine the winner" },
      { era: "1700s", def: "To make a choice or come to a conclusion" },
    ],
  },
  {
    answer: decode("REVHUkVF"),
    clue: "A step on a set of stairs; the rung of a ladder",
    hints: [
      { era: "1400s", def: "A stage or position in a scale of rank or quality" },
      { era: "1600s", def: "A qualification awarded upon completion of study" },
    ],
  },
  {
    answer: decode("R0xPUlk="),
    clue: "Pride; boastfulness; arrogance",
    hints: [
      { era: "1300s", def: "The honour and praise offered in worship" },
      { era: "1500s", def: "Great beauty, splendour, and magnificence" },
    ],
  },
  {
    answer: decode("Q0hFQVQ="),
    clue: "A sort of low-quality bread",
    hints: [
      { era: "1500s", def: "An act of fraud or deception; a swindle" },
      { era: "1700s", def: "To violate rules in order to gain advantage" },
    ],
  },
  {
    answer: decode("TFVOQ0g="),
    clue: "A thin piece or thick hunk of something",
    hints: [
      { era: "1500s", def: "A lump of food swallowed at one gulp" },
      { era: "1800s", def: "A light meal eaten around midday" },
    ],
  },
  {
    answer: decode("R1JJTEw="),
    clue: "To make angry; to provoke; to offend",
    hints: [
      { era: "1500s", def: "To terrify; to make tremble; to shiver" },
      { era: "1700s", def: "To cook food on a grating over an open fire" },
    ],
  },
  {
    answer: decode("SEVBVlk="),
    clue: "With child; pregnant",
    hints: [
      { era: "1300s", def: "Laden; burdened; weighed down" },
      { era: "1500s", def: "Having great weight; difficult to lift" },
    ],
  },
  {
    answer: decode("UElOSw=="),
    clue: "A narrow boat; a small sailing vessel",
    hints: [
      { era: "1500s", def: "A garden flower of the genus Dianthus" },
      { era: "1700s", def: "A pale red colour, like that of the flower" },
    ],
  },
  {
    answer: decode("Qk9TUw=="),
    clue: "A hassock or small seat, especially made from a bundle of straw",
    hints: [
      { era: "1500s", def: "A raised knob or stud; a rounded protuberance" },
      { era: "1800s", def: "A person who oversees and directs the work of others" },
    ],
  },
  {
    answer: decode("RE9NRQ=="),
    clue: "A building; a house; an edifice",
    hints: [
      { era: "1500s", def: "A stately building; a mansion or palace" },
      { era: "1600s", def: "A rounded vault forming the roof of a building" },
    ],
  },
  {
    answer: decode("QklSRA=="),
    clue: "A chicken; the young of a fowl; a nestling",
    hints: [
      { era: "1300s", def: "Any feathered creature; a fowl of any kind" },
      { era: "1600s", def: "A person, especially a young woman" },
    ],
  },
  {
    answer: decode("Qk9NQg=="),
    clue: "A great booming noise; a hollow sound",
    hints: [
      { era: "1500s", def: "A hollow iron ball filled with gunpowder and lit by a fuse" },
      { era: "1700s", def: "An explosive device intended as a weapon" },
    ],
  },
  {
    answer: decode("QlVDSw=="),
    clue: "A fop or dandy; a dashing young man of fashion",
    hints: [
      { era: "1300s", def: "A male goat" },
      { era: "1500s", def: "A male deer, antelope, or rabbit" },
    ],
  },
  {
    answer: decode("Q09PSw=="),
    clue: "To make the noise of the cuckoo",
    hints: [
      { era: "1400s", def: "To throw or toss" },
      { era: "1600s", def: "A person who prepares food for eating" },
    ],
  },
  {
    answer: decode("Q09STg=="),
    clue: "To render intoxicated; to make drunk",
    hints: [
      { era: "1300s", def: "A single grain or seed of a cereal plant" },
      { era: "1600s", def: "Any cereal plant that is the main crop of a country" },
    ],
  },
  {
    answer: decode("RFVTVA=="),
    clue: "To drink up quickly; to toss off",
    hints: [
      { era: "1400s", def: "To reduce to a fine powder; to pulverise" },
      { era: "1600s", def: "Fine, dry particles of earth or other matter" },
    ],
  },
  {
    answer: decode("RFVNUA=="),
    clue: "A melancholy strain or tune in music; any tune",
    hints: [
      { era: "1500s", def: "To knock heavily; to stump or thump" },
      { era: "1700s", def: "A place where waste or garbage is left" },
    ],
  },
  {
    answer: decode("RUFSTg=="),
    clue: "Of milk: to curdle, especially in the cheesemaking process",
    hints: [
      { era: "1300s", def: "To grieve; to mourn; to yearn" },
      { era: "1500s", def: "To gain through applied effort or work" },
    ],
  },
  {
    answer: decode("RkxBRw=="),
    clue: "A slice of turf; a sod; a flat paving stone",
    hints: [
      { era: "1400s", def: "A plant with sword-shaped leaves, especially an iris" },
      { era: "1600s", def: "A piece of cloth decorated with an emblem" },
    ],
  },
  {
    answer: decode("RkxBVA=="),
    clue: "A dull fellow; a simpleton; a gull easily cheated",
    hints: [
      { era: "1500s", def: "A level stretch of ground; a plain" },
      { era: "1800s", def: "A set of rooms on one floor forming a residence" },
    ],
  },
  {
    answer: decode("R0VBUg=="),
    clue: "Goods; property; household items; personal belongings",
    hints: [
      { era: "1400s", def: "Business matters; affairs; concern" },
      { era: "1700s", def: "A toothed wheel that meshes with another; equipment" },
    ],
  },
  {
    answer: decode("SElOVA=="),
    clue: "An opportunity; an occasion; a fit time",
    hints: [
      { era: "1500s", def: "A slight mention; an indirect suggestion" },
      { era: "1700s", def: "A clue; a small piece of practical information" },
    ],
  },
  {
    answer: decode("SVRFTQ=="),
    clue: "A hint; an innuendo; an intimation",
    hints: [
      { era: "1500s", def: "An individual entry or article in a list or account" },
      { era: "1700s", def: "A distinct physical object; a thing" },
    ],
  },
  {
    answer: decode("TEFLRQ=="),
    clue: "A kind of fine, white linen",
    hints: [
      { era: "1300s", def: "A pit or ditch; a pool of standing water" },
      { era: "1500s", def: "A large, landlocked body of fresh water" },
    ],
  },
  {
    answer: decode("TEFTVA=="),
    clue: "A burden; a load; a cargo; freight",
    hints: [
      { era: "1400s", def: "A measure of weight, varying by goods" },
      { era: "1600s", def: "Final; coming after all others of its kind" },
    ],
  },
  {
    answer: decode("TE9WRQ=="),
    clue: "A thin silk material",
    hints: [
      { era: "1300s", def: "Affection; a deep feeling of fondness" },
      { era: "1600s", def: "A deep caring for the existence of another" },
    ],
  },
  {
    answer: decode("TUVTUw=="),
    clue: "Mass; a church service; a religious ceremony",
    hints: [
      { era: "1400s", def: "A portion of food served at a meal; a dish" },
      { era: "1700s", def: "A state of disorder; a disorganised jumble" },
    ],
  },
  {
    answer: decode("UE9TRQ=="),
    clue: "To ask questions; to interrogate; to examine closely",
    hints: [
      { era: "1500s", def: "To puzzle or perplex someone with a question" },
      { era: "1700s", def: "To assume a position or attitude for effect" },
    ],
  },
  {
    answer: decode("UExBTlQ="),
    clue: "A stash or cache of hidden goods",
    hints: [
      { era: "1400s", def: "A young tree; a sapling; a cutting set in the ground" },
      { era: "1600s", def: "Any living organism that is not an animal" },
    ],
  },
  {
    answer: decode("QUxMT1c="),
    clue: "To praise; to approve of; to commend",
    hints: [
      { era: "1400s", def: "To sanction; to invest with authority" },
      { era: "1600s", def: "To permit; to let someone do or have something" },
    ],
  },
  {
    answer: decode("Q0hBUk0="),
    clue: "To make music upon; to play or sing",
    hints: [
      { era: "1400s", def: "An incantation; a magic spell recited or chanted" },
      { era: "1600s", def: "An attractive or alluring quality; personal appeal" },
    ],
  },
  {
    answer: decode("RFJJTEw="),
    clue: "To entice or allure; to decoy; to lure",
    hints: [
      { era: "1500s", def: "A small trickling stream; a rill" },
      { era: "1700s", def: "To bore a hole using a rotating tool" },
    ],
  },
  {
    answer: decode("RkFJUlk="),
    clue: "The realm of faerie; enchantment; illusion",
    hints: [
      { era: "1400s", def: "A magical being of human form, often mischievous" },
      { era: "1600s", def: "An attractive young woman" },
    ],
  },
  {
    answer: decode("RkFVTFQ="),
    clue: "Want; lack; absence",
    hints: [
      { era: "1400s", def: "A defect or flaw; an imperfection" },
      { era: "1600s", def: "Culpability; responsibility for something blameworthy" },
    ],
  },
  {
    answer: decode("R1JPU1M="),
    clue: "Easy to perceive; plain; evident; obvious",
    hints: [
      { era: "1500s", def: "Coarse; rough; lacking refinement" },
      { era: "1700s", def: "Highly or conspicuously offensive; disgusting" },
    ],
  },
  {
    answer: decode("QURWRVJU"),
    clue: "To turn attention to; to take notice of something",
    hints: [
      { era: "1600s", def: "To refer to; to make mention of" },
      { era: "1900s", def: "An advertisement; a public notice promoting goods" },
    ],
  },
  {
    answer: decode("Q0FTVExF"),
    clue: "A close helmet; a helm enclosing the whole head",
    hints: [
      { era: "1300s", def: "A fortified tower or stronghold" },
      { era: "1500s", def: "A large fortified residential building or compound" },
    ],
  },
  {
    answer: decode("Q0xJTklD"),
    clue: "Someone who receives baptism on a sickbed",
    hints: [
      { era: "1600s", def: "A school where medicine is taught by examining patients" },
      { era: "1800s", def: "A medical facility for treatment of outpatients" },
    ],
  },
  {
    answer: decode("TUFJTA=="),
    clue: "A spot on a bird's feather; a spotted feather",
    hints: [
      { era: "1300s", def: "Armour made of interlinked metal rings" },
      { era: "1700s", def: "Letters and packages conveyed by a postal system" },
    ],
  },
  {
    answer: decode("SkFERQ=="),
    clue: "To treat with contempt; to spurn; to make ridiculous",
    hints: [
      { era: "1400s", def: "A tired, worn-out horse; a nag" },
      { era: "1600s", def: "A semiprecious green stone used for ornaments" },
    ],
  },
  {
    answer: decode("Q0FOVA=="),
    clue: "To sell by auction; to bid at an auction",
    hints: [
      { era: "1500s", def: "A whining manner of speaking, especially of beggars" },
      { era: "1700s", def: "The jargon of a particular class or subgroup" },
    ],
  },
  {
    answer: decode("Q09QRQ=="),
    clue: "To make return for; to requite; to repay",
    hints: [
      { era: "1400s", def: "To barter; to exchange or trade" },
      { era: "1600s", def: "To deal effectively with something difficult" },
    ],
  },
  {
    answer: decode("Q09QWQ=="),
    clue: "An abundance or plenty of anything",
    hints: [
      { era: "1400s", def: "A pattern, model, or example to be imitated" },
      { era: "1600s", def: "A duplicate; an identical reproduction" },
    ],
  },
  {
    answer: decode("Q1VSRQ=="),
    clue: "To pay heed; to care; to give attention",
    hints: [
      { era: "1400s", def: "The care of souls; spiritual charge of a parish" },
      { era: "1600s", def: "A method or medication that restores good health" },
    ],
  },
  {
    answer: decode("RE9DSw=="),
    clue: "The buttocks or anus",
    hints: [
      { era: "1400s", def: "The tail of an animal, especially when cut short" },
      { era: "1600s", def: "An enclosed area of water for loading and repairing ships" },
    ],
  },
  {
    answer: decode("RE9MTA=="),
    clue: "To warm moderately; to make tepid; to mull",
    hints: [
      { era: "1600s", def: "A sweetheart; a pet name for a woman" },
      { era: "1700s", def: "A small figure resembling a human, used as a toy" },
    ],
  },
  {
    answer: decode("RFVUWQ=="),
    clue: "Respect; reverence; regard; an act of homage",
    hints: [
      { era: "1400s", def: "What is owed; a debt or obligation" },
      { era: "1600s", def: "That which one is morally or legally obligated to do" },
    ],
  },
  {
    answer: decode("RkFJTA=="),
    clue: "To perish; to die",
    hints: [
      { era: "1400s", def: "To be wanting; to fall short; to be deficient" },
      { era: "1600s", def: "To be unsuccessful in an attempt" },
    ],
  },
  {
    answer: decode("RkFSRQ=="),
    clue: "A going; a journey; a voyage; a passage",
    hints: [
      { era: "1400s", def: "Food and drink; provisions for the table" },
      { era: "1700s", def: "Money paid for a transport ticket" },
    ],
  },
  {
    answer: decode("RkVMTA=="),
    clue: "Eager; earnest; intent",
    hints: [
      { era: "1300s", def: "Fierce, cruel, savage; dreadful or terrible" },
      { era: "1500s", def: "The hide or skin of an animal; a pelt" },
    ],
  },
  {
    answer: decode("R0xPVw=="),
    clue: "To look intently; to stare",
    hints: [
      { era: "1400s", def: "To shine with an intense or white heat" },
      { era: "1600s", def: "To emit a steady light without flame" },
    ],
  },
  {
    answer: decode("SE9MRA=="),
    clue: "Gracious; friendly; faithful; true",
    hints: [
      { era: "1300s", def: "Loyal; devoted; steadfast in allegiance" },
      { era: "1500s", def: "To grasp or grip; to keep in one's hands" },
    ],
  },
  {
    answer: decode("SURFQQ=="),
    clue: "The form or shape of something; a quintessential aspect",
    hints: [
      { era: "1500s", def: "A perfect archetype existing in the mind of God" },
      { era: "1700s", def: "A thought; a mental conception or notion" },
    ],
  },
  {
    answer: decode("SlVNUA=="),
    clue: "To expose to danger; to risk; to hazard",
    hints: [
      { era: "1500s", def: "To coincide; to agree; to tally" },
      { era: "1700s", def: "To propel oneself upward rapidly" },
    ],
  },
  {
    answer: decode("TEVBVkU="),
    clue: "To remain behind; to stay",
    hints: [
      { era: "1400s", def: "To allow; to grant permission" },
      { era: "1600s", def: "To go away from; to depart" },
    ],
  },
  {
    answer: decode("Q1JBQ0s="),
    clue: "A boy; generally a pert, lively boy",
    hints: [
      { era: "1500s", def: "One who excels; the best of a group" },
      { era: "1700s", def: "A narrow opening; a fissure or fracture" },
    ],
  },
  {
    answer: decode("QU1FTkQ="),
    clue: "To heal someone sick; to cure a disease",
    hints: [
      { era: "1400s", def: "To free from faults; to correct or rectify" },
      { era: "1600s", def: "To make better; to improve" },
    ],
  },
  {
    answer: decode("QUJVU0U="),
    clue: "A delusion; an imposture; a deception",
    hints: [
      { era: "1500s", def: "To deceive; to trick; to impose upon" },
      { era: "1700s", def: "Improper treatment or usage; mistreatment" },
    ],
  },
  {
    answer: decode("QU5HRUw="),
    clue: "An attendant spirit; a genius; a demon",
    hints: [
      { era: "1400s", def: "A gold coin worth about ten shillings" },
      { era: "1600s", def: "A holy messenger from God; a divine being" },
    ],
  },
  {
    answer: decode("RkFOQ1k="),
    clue: "A sort of love song or light impromptu ballad",
    hints: [
      { era: "1500s", def: "A whim; a capricious notion or inclination" },
      { era: "1700s", def: "The imagination; the faculty of forming images" },
    ],
  },
  {
    answer: decode("RkFWT1I="),
    clue: "Appearance; look; countenance; face",
    hints: [
      { era: "1400s", def: "A token or badge worn to show allegiance" },
      { era: "1600s", def: "A kind deed; an act of voluntary assistance" },
    ],
  },
  {
    answer: decode("Q0xPU0U="),
    clue: "Out of the way of observation; secluded; secret; hidden",
    hints: [
      { era: "1500s", def: "Confined; shut in; narrow or cramped" },
      { era: "1700s", def: "Near in space or time; not far away" },
    ],
  },
  {
    answer: decode("RkxPV0VS"),
    clue: "A substance in the form of a powder, condensed from sublimation",
    hints: [
      { era: "1400s", def: "The finest or best part of anything" },
      { era: "1600s", def: "The colourful blossom of a plant" },
    ],
  },
  {
    answer: decode("SU5WRVNU"),
    clue: "To put on clothing; to dress or adorn",
    hints: [
      { era: "1500s", def: "To formally install in office with ceremony" },
      { era: "1700s", def: "To spend money for future profit or benefit" },
    ],
  },
  {
    answer: decode("QVJSSVZF"),
    clue: "To bring to shore",
    hints: [
      { era: "1400s", def: "To come to land after a voyage by sea" },
      { era: "1600s", def: "To reach any destination; to get to a place" },
    ],
  },
  {
    answer: decode("UElDTklD"),
    clue: "An entertainment at which each person contributed a dish to a common table",
    hints: [
      { era: "1800s", def: "An excursion to the countryside with a packed meal" },
      { era: "1900s", def: "An informal outdoor gathering with food and drink" },
    ],
  },
  {
    answer: decode("Q0FTSU5P"),
    clue: "A small house; a pleasure house or holiday home, especially in Italy",
    hints: [
      { era: "1700s", def: "A public room for music, dancing, and entertainment" },
      { era: "1800s", def: "A public building or room for gambling" },
    ],
  },
  {
    answer: decode("UFJFVkVOVA=="),
    clue: "To come before; to precede; to anticipate",
    hints: [
      { era: "1500s", def: "To act in advance of; to go before with aid" },
      { era: "1700s", def: "To stop from happening; to keep from doing something" },
    ],
  },
  {
    answer: decode("RElTQ1VTUw=="),
    clue: "To deal with, in eating or drinking; to consume",
    hints: [
      { era: "1500s", def: "To break apart; to disperse or scatter" },
      { era: "1700s", def: "To converse or debate concerning a topic" },
    ],
  },
  {
    answer: decode("Q0FCSU5FVA=="),
    clue: "A hut; a cottage; a small house",
    hints: [
      { era: "1600s", def: "A private room for study or consultation" },
      { era: "1800s", def: "A piece of furniture with shelves and doors for storage" },
    ],
  },
  {
    answer: decode("Q09NRk9SVA=="),
    clue: "To make strong; to invigorate; to fortify",
    hints: [
      { era: "1400s", def: "Aid; assistance; support and encouragement" },
      { era: "1700s", def: "Contentment; ease; a state of physical well-being" },
    ],
  },
  {
    answer: decode("R0FSQkFHRQ=="),
    clue: "The bowels of an animal; refuse parts of flesh; offal",
    hints: [
      { era: "1500s", def: "Worthless or nonsensical matter; rubbish" },
      { era: "1700s", def: "Food waste; any unwanted or discarded material" },
    ],
  },
  {
    answer: decode("UE9QVUxBUg=="),
    clue: "Of low birth; not noble; vulgar; plebeian",
    hints: [
      { era: "1500s", def: "Of or carried on by the common people" },
      { era: "1800s", def: "Generally liked or admired by many people" },
    ],
  },
  {
    answer: decode("SFVTQkFORA=="),
    clue: "To till; to cultivate; to farm; to nurture",
    hints: [
      { era: "1300s", def: "The master of a household; a manager of affairs" },
      { era: "1500s", def: "A man in a marriage; a married man" },
    ],
  },
  {
    answer: decode("RElTRUFTRQ=="),
    clue: "To cause unease; to annoy; to irritate",
    hints: [
      { era: "1400s", def: "Discomfort; distress; lack of ease" },
      { era: "1600s", def: "An abnormal condition of the body; a sickness" },
    ],
  },
  {
    answer: decode("UExBU1RJQw=="),
    clue: "A sculptor; a moulder of materials",
    hints: [
      { era: "1600s", def: "Capable of being moulded or shaped; pliable" },
      { era: "1900s", def: "A synthetic polymer material used in manufacturing" },
    ],
  },
  {
    answer: decode("QkFDSEVMT1I="),
    clue: "An unmarried woman",
    hints: [
      { era: "1300s", def: "A young knight serving under another's banner" },
      { era: "1600s", def: "An unmarried man" },
    ],
  },
  {
    answer: decode("Q09DS1RBSUw="),
    clue: "Ostentatiously lacking in manners",
    hints: [
      { era: "1800s", def: "A horse with a docked tail; not a thoroughbred" },
      { era: "1900s", def: "A mixed alcoholic beverage" },
    ],
  },
  {
    answer: decode("TUVESUNJTkU="),
    clue: "A philtre or love potion",
    hints: [
      { era: "1300s", def: "The art of healing; the science of treating disease" },
      { era: "1600s", def: "A substance taken to promote healing when ingested" },
    ],
  },
  {
    answer: decode("SU5OT0NFTlQ="),
    clue: "A harmless simple-minded person; an idiot",
    hints: [
      { era: "1400s", def: "A very young child; a babe" },
      { era: "1600s", def: "Free from guilt, sin, or moral wrong" },
    ],
  },
  {
    answer: decode("RU5PUk1PVVM="),
    clue: "Deviating from the norm; unusual; extraordinary",
    hints: [
      { era: "1500s", def: "Outrageous; exceedingly wicked or wrong" },
      { era: "1700s", def: "Extremely large; greatly exceeding the common size" },
    ],
  },
  {
    answer: decode("UFJFR05BTlQ="),
    clue: "Affording entrance; receptive; willing; open; prompt",
    hints: [
      { era: "1500s", def: "Convincing; compelling; weighty with meaning" },
      { era: "1700s", def: "Carrying developing offspring within the body" },
    ],
  },
  {
    answer: decode("QUNUT1I="),
    clue: "A plaintiff or complainant in a lawsuit",
    hints: [
      { era: "1500s", def: "One who takes action; a doer of deeds" },
      { era: "1600s", def: "A performer on the theatrical stage" },
    ],
  },
  {
    answer: decode("QVJUSUNMRQ=="),
    clue: "A wench; a disreputable woman",
    hints: [
      { era: "1200s", def: "A separate clause or item in a document" },
      { era: "1700s", def: "A piece of writing in a publication" },
    ],
  },
  {
    answer: decode("QkxFU1M="),
    clue: "To wave or brandish a weapon",
    hints: [
      { era: "900s", def: "To mark with blood; to consecrate by sacrifice" },
      { era: "1200s", def: "To make holy by religious rite" },
    ],
  },
  {
    answer: decode("QkxPT0Q="),
    clue: "A lively, showy man; a rake; a dandy",
    hints: [
      { era: "1500s", def: "A man of fiery spirit; a hot-blooded youth" },
      { era: "1700s", def: "The red liquid that circulates in the body" },
    ],
  },
  {
    answer: decode("QlJPS0U="),
    clue: "To act as procurer in love matters; to pimp",
    hints: [
      { era: "1600s", def: "To negotiate or deal on behalf of others" },
      { era: "1800s", def: "Financially ruined; bankrupt" },
    ],
  },
  {
    answer: decode("Q0VMRUJSSVRZ"),
    clue: "A rite or ceremony",
    hints: [
      { era: "1600s", def: "A condition of fame or wide renown" },
      { era: "1800s", def: "A widely known or famous person" },
    ],
  },
  {
    answer: decode("Q0xJTklDQUw="),
    clue: "Of or relating to a bed, especially a deathbed",
    hints: [
      { era: "1700s", def: "Pertaining to a sickbed or hospital ward" },
      { era: "1900s", def: "Coldly detached and efficient; unemotional" },
    ],
  },
  {
    answer: decode("Q09BQ0hJTkc="),
    clue: "A flogging; a severe beating",
    hints: [
      { era: "1800s", def: "Traveling by horse-drawn coach" },
      { era: "1900s", def: "Training or instruction in a sport or skill" },
    ],
  },
  {
    answer: decode("Q09NTUVSQ0U="),
    clue: "Sexual intercourse",
    hints: [
      { era: "1500s", def: "Social dealings; interaction between people" },
      { era: "1700s", def: "The exchange or buying and selling of goods" },
    ],
  },
  {
    answer: decode("Q1JBRlQ="),
    clue: "Strength; power; might; force",
    hints: [
      { era: "1200s", def: "Skill, art, or dexterity in making things" },
      { era: "1600s", def: "A trade or profession requiring manual skill" },
    ],
  },
  {
    answer: decode("Q1VSUklDVUxVTQ=="),
    clue: "A racecourse; a place for running",
    hints: [
      { era: "1600s", def: "A fixed course of study at a university" },
      { era: "1800s", def: "The subjects and content taught at a school" },
    ],
  },
  {
    answer: decode("REVWT1RFRA=="),
    clue: "Cursed; doomed to destruction",
    hints: [
      { era: "1500s", def: "Consecrated; set apart by a solemn vow" },
      { era: "1700s", def: "Deeply loyal, loving, and dedicated" },
    ],
  },
  {
    answer: decode("RElHRVNU"),
    clue: "To suppurate; to generate pus, as an ulcer",
    hints: [
      { era: "1400s", def: "To arrange methodically; to classify" },
      { era: "1600s", def: "To break down food in the stomach" },
    ],
  },
  {
    answer: decode("RVhQTEFJTg=="),
    clue: "To make flat; to smooth out",
    hints: [
      { era: "1500s", def: "To unfold; to spread out for examination" },
      { era: "1600s", def: "To make clear or intelligible to others" },
    ],
  },
  {
    answer: decode("RkFCVUxPVVM="),
    clue: "Known for telling fables or falsehoods; unreliable",
    hints: [
      { era: "1500s", def: "Mythical; existing only in fable or legend" },
      { era: "1800s", def: "Astonishing; remarkably great or wonderful" },
    ],
  },
  {
    answer: decode("RkFDVE9SWQ=="),
    clue: "An invoice or inventory of goods",
    hints: [
      { era: "1500s", def: "A trading post or commercial agency abroad" },
      { era: "1700s", def: "A building where goods are manufactured" },
    ],
  },
  {
    answer: decode("RkFSTQ=="),
    clue: "Food; provisions; a meal",
    hints: [
      { era: "1300s", def: "A fixed annual rent or tax payment" },
      { era: "1500s", def: "A tract of land cultivated for growing crops" },
    ],
  },
  {
    answer: decode("RkFTSElPTg=="),
    clue: "To forge or counterfeit",
    hints: [
      { era: "1300s", def: "The make or form of something; its shape" },
      { era: "1600s", def: "A prevailing custom or style of dress" },
    ],
  },
  {
    answer: decode("RklOQU5DRQ=="),
    clue: "To pay ransom for a captive",
    hints: [
      { era: "1400s", def: "A payment to settle a debt or penalty" },
      { era: "1700s", def: "The management of money and monetary affairs" },
    ],
  },
  {
    answer: decode("RlVSTklUVVJF"),
    clue: "An enhancing feature or embellishment; a decoration",
    hints: [
      { era: "1500s", def: "Equipment or accessories for a purpose" },
      { era: "1700s", def: "Large movable items in a room, such as tables and chairs" },
    ],
  },
  {
    answer: decode("R0FORw=="),
    clue: "An outhouse; an outbuilding used as a lavatory",
    hints: [
      { era: "1600s", def: "A group of laborers working together" },
      { era: "1800s", def: "A band of criminals or ruffians" },
    ],
  },
  {
    answer: decode("R0FURQ=="),
    clue: "A journey; a going",
    hints: [
      { era: "1300s", def: "A way or path; a road or street" },
      { era: "1500s", def: "A moveable barrier at an entrance or opening" },
    ],
  },
  {
    answer: decode("R0VORVJPVVM="),
    clue: "Of noble birth; highborn",
    hints: [
      { era: "1500s", def: "Courageous and high-spirited; gallant" },
      { era: "1700s", def: "Willing to give freely; liberal in sharing" },
    ],
  },
  {
    answer: decode("SEFSRExZ"),
    clue: "Firmly; vigorously; with strength or exertion",
    hints: [
      { era: "1500s", def: "With great difficulty; only just barely" },
      { era: "1700s", def: "Scarcely; barely; almost not at all" },
    ],
  },
  {
    answer: decode("SU1QUk9WRQ=="),
    clue: "To disprove or make void; to refute",
    hints: [
      { era: "1500s", def: "To make profitable use of; to turn to account" },
      { era: "1700s", def: "To make or become better in quality" },
    ],
  },
  {
    answer: decode("SU5GQU5U"),
    clue: "A noble or aristocratic youth",
    hints: [
      { era: "1400s", def: "A person not yet of legal age; a minor" },
      { era: "1600s", def: "A very young child or baby" },
    ],
  },
  {
    answer: decode("Sk9VUk5FWQ=="),
    clue: "A day; one day's time",
    hints: [
      { era: "1300s", def: "A day's travel; a day's work or march" },
      { era: "1500s", def: "Travel from one place to another" },
    ],
  },
  {
    answer: decode("TEFVTkNI"),
    clue: "To pierce with, or as with, a lance",
    hints: [
      { era: "1400s", def: "To hurl or fling with great force" },
      { era: "1600s", def: "To set a vessel afloat; to send forth" },
    ],
  },
  {
    answer: decode("TEFaWQ=="),
    clue: "Wicked; vicious; morally corrupt",
    hints: [
      { era: "1500s", def: "Sluggish; slow-moving; lacking energy" },
      { era: "1600s", def: "Disinclined to work or make an effort" },
    ],
  },
  {
    answer: decode("TElHSFQ="),
    clue: "Unchaste; wanton; sexually loose",
    hints: [
      { era: "1300s", def: "Frivolous; lacking in seriousness or weight" },
      { era: "1600s", def: "The natural agent that makes things visible" },
    ],
  },
  {
    answer: decode("TUlMTA=="),
    clue: "To commit burglary; to rob a house",
    hints: [
      { era: "1300s", def: "To grind grain between stones into flour" },
      { era: "1700s", def: "A building with machinery for manufacturing" },
    ],
  },
  {
    answer: decode("TkFJTA=="),
    clue: "To steal; to purloin",
    hints: [
      { era: "1400s", def: "To catch or seize; to arrest a person" },
      { era: "1600s", def: "To fasten with a pointed metal spike" },
    ],
  },
  {
    answer: decode("UEFSQURJU0U="),
    clue: "A churchyard or cemetery",
    hints: [
      { era: "1200s", def: "The Garden of Eden; the abode of Adam and Eve" },
      { era: "1600s", def: "A place of supreme bliss and delight" },
    ],
  },
  {
    answer: decode("UEVOQ0lM"),
    clue: "A small medicated probe inserted into the body",
    hints: [
      { era: "1400s", def: "An artist's fine-tipped paintbrush" },
      { era: "1600s", def: "A thin stick of graphite used for writing" },
    ],
  },
  {
    answer: decode("UFJJTUU="),
    clue: "Lecherous; lewd; lustful",
    hints: [
      { era: "1400s", def: "First in rank, degree, or excellence" },
      { era: "1600s", def: "Of the highest quality or importance" },
    ],
  },
  {
    answer: decode("VEVSUklGSUM="),
    clue: "Terrifying; causing terror; inspiring dread",
    hints: [
      { era: "1600s", def: "Awe-inspiring; of extraordinary size or intensity" },
      { era: "1800s", def: "Extraordinarily great or wonderful" },
    ],
  },
  {
    answer: decode("QVdFU09NRQ=="),
    clue: "Causing awe or terror; inspiring fearful wonder",
    hints: [
      { era: "1600s", def: "Profoundly reverential; filled with awe" },
      { era: "1900s", def: "Extremely impressive; excellent" },
    ],
  },
  {
    answer: decode("U01BUlQ="),
    clue: "Causing sharp, stinging pain",
    hints: [
      { era: "1300s", def: "Quick; active; clever in a practical way" },
      { era: "1700s", def: "Intelligent; showing mental sharpness" },
    ],
  },
  {
    answer: decode("UklWQUw="),
    clue: "One having a common right or privilege with another; a partner",
    hints: [
      { era: "1500s", def: "One who pursues the same object as another" },
      { era: "1600s", def: "A competitor; one striving against another" },
    ],
  },
  {
    answer: decode("VEhSSUxM"),
    clue: "To perforate with a pointed instrument; to bore or drill",
    hints: [
      { era: "1400s", def: "To penetrate; to pierce through with emotion" },
      { era: "1600s", def: "To cause a sudden wave of excitement or pleasure" },
    ],
  },
  {
    answer: decode("QlVYT00="),
    clue: "Meek; obedient; morally pliant and yielding",
    hints: [
      { era: "1300s", def: "Compliant; yielding; gracious" },
      { era: "1500s", def: "Plump and healthy-looking; full-figured" },
    ],
  },
  {
    answer: decode("QkFMREVSREFTSA=="),
    clue: "A worthless mixture of liquors; a frothy liquid",
    hints: [
      { era: "1600s", def: "A jumble of words; senseless talk" },
      { era: "1700s", def: "Complete nonsense; rubbish" },
    ],
  },
  {
    answer: decode("Q09OQ0VJVA=="),
    clue: "Something conceived in the mind; an idea or thought",
    hints: [
      { era: "1500s", def: "A witty or fanciful notion; an elaborate metaphor" },
      { era: "1700s", def: "Excessive pride in oneself; vanity" },
    ],
  },
  {
    answer: decode("Rk9ORA=="),
    clue: "Foolish; simple; lacking in sense",
    hints: [
      { era: "1400s", def: "Infatuated; doting to excess" },
      { era: "1600s", def: "Having warm or tender feelings; affectionate" },
    ],
  },
  {
    answer: decode("SE9ORVNU"),
    clue: "Chaste; faithful; sexually virtuous",
    hints: [
      { era: "1400s", def: "Respectable; held in high regard" },
      { era: "1600s", def: "Truthful; free from deceit" },
    ],
  },
  {
    answer: decode("SFVTU1k="),
    clue: "A housewife; a thrifty housekeeper",
    hints: [
      { era: "1500s", def: "A woman of the lower classes; a common woman" },
      { era: "1700s", def: "A brazen or immoral woman" },
    ],
  },
  {
    answer: decode("TEVXRA=="),
    clue: "Of the laity; not belonging to the clergy; uneducated",
    hints: [
      { era: "1300s", def: "Common; vulgar; of low birth" },
      { era: "1500s", def: "Obscene; indecent; sexually inappropriate" },
    ],
  },
  {
    answer: decode("TUFOVVJF"),
    clue: "To cultivate land by manual labor; to till",
    hints: [
      { era: "1400s", def: "To work or manage; to handle" },
      { era: "1600s", def: "Animal dung used to fertilize the soil" },
    ],
  },
  {
    answer: decode("UFJFU1RJR0U="),
    clue: "A delusion; an illusion; a conjuring trick",
    hints: [
      { era: "1600s", def: "An imposture; a dazzling deception" },
      { era: "1800s", def: "High standing or reputation; distinction" },
    ],
  },
  {
    answer: decode("UVVBSU5U"),
    clue: "Cunning; crafty; cleverly devised",
    hints: [
      { era: "1300s", def: "Skillfully wrought; elegant; beautiful" },
      { era: "1700s", def: "Attractively unusual in an old-fashioned way" },
    ],
  },
  {
    answer: decode("UVVJQ0s="),
    clue: "Alive; living; not dead",
    hints: [
      { era: "1300s", def: "Lively; animated; vigorous" },
      { era: "1500s", def: "Moving with speed; rapid; fast" },
    ],
  },
  {
    answer: decode("UkVFSw=="),
    clue: "To emit smoke or vapour; to steam",
    hints: [
      { era: "1400s", def: "To give off a strong smell of any kind" },
      { era: "1700s", def: "To smell strongly and unpleasantly; to stink" },
    ],
  },
  {
    answer: decode("U0hSRVdE"),
    clue: "Wicked; evil; portending misfortune",
    hints: [
      { era: "1400s", def: "Sharp; biting; severe" },
      { era: "1600s", def: "Astute; having sharp judgment; clever" },
    ],
  },
  {
    answer: decode("U0lOSVNURVI="),
    clue: "Of the left side; left-handed",
    hints: [
      { era: "1400s", def: "Unlucky; inauspicious; unfavorable" },
      { era: "1600s", def: "Suggesting evil intent; threatening harm" },
    ],
  },
  {
    answer: decode("U01VRw=="),
    clue: "Neat and spruce in dress; trim; smooth and prim",
    hints: [
      { era: "1600s", def: "Affectedly precise; prim; self-satisfied in appearance" },
      { era: "1800s", def: "Excessively self-satisfied; complacent" },
    ],
  },
  {
    answer: decode("VE9JTEVU"),
    clue: "A covering of linen spread over a dressing table",
    hints: [
      { era: "1600s", def: "The act of dressing and grooming oneself" },
      { era: "1800s", def: "A fixture for the disposal of bodily waste" },
    ],
  },
  {
    answer: decode("VFJBVkVM"),
    clue: "To toil; to labor; to suffer the pains of childbirth",
    hints: [
      { era: "1300s", def: "To make a difficult or arduous journey" },
      { era: "1500s", def: "To go from one place to another" },
    ],
  },
  {
    answer: decode("V0FSUkFOVA=="),
    clue: "A defender; a protector; a guardian",
    hints: [
      { era: "1300s", def: "A guarantee; an assurance of quality or safety" },
      { era: "1600s", def: "A legal writ authorizing an action" },
    ],
  },
  {
    answer: decode("V0VJUkQ="),
    clue: "Fate; destiny; the power to control fate",
    hints: [
      { era: "1400s", def: "Of or pertaining to the Fates; prophetic" },
      { era: "1800s", def: "Uncanny; strange; eerily unusual" },
    ],
  },
  {
    answer: decode("V09STQ=="),
    clue: "A serpent; a dragon; a great sea creature",
    hints: [
      { era: "1200s", def: "Any creeping or crawling animal, including snakes" },
      { era: "1600s", def: "A small, soft-bodied invertebrate that burrows in soil" },
    ],
  },
  {
    answer: decode("TElWSUQ="),
    clue: "Of a blue-gray or leaden color; discolored as a bruise",
    hints: [
      { era: "1600s", def: "Pale; ashen; deathly white" },
      { era: "1900s", def: "Furiously angry; enraged" },
    ],
  },
  {
    answer: decode("R0xBTU9VUg=="),
    clue: "A magic spell; an enchantment cast over the eyes",
    hints: [
      { era: "1700s", def: "A bewitching or alluring charm" },
      { era: "1900s", def: "An attractive or exciting quality; beauty and elegance" },
    ],
  },
  {
    answer: decode("S05JR0hU"),
    clue: "A boy; a young servant or attendant",
    hints: [
      { era: "1100s", def: "A military servant; a mounted soldier" },
      { era: "1300s", def: "A man given an honorary title by the sovereign" },
    ],
  },
  {
    answer: decode("VE9SUEVETw=="),
    clue: "An electric ray; a fish that delivers numbing shocks",
    hints: [
      { era: "1700s", def: "An underwater explosive mine" },
      { era: "1800s", def: "A self-propelled underwater missile" },
    ],
  },
  {
    answer: decode("VEFMRU5U"),
    clue: "A unit of weight or money in the ancient world",
    hints: [
      { era: "1400s", def: "A person's natural disposition or inclination" },
      { era: "1600s", def: "A natural aptitude or skill" },
    ],
  },
  {
    answer: decode("U1BJTlNURVI="),
    clue: "A woman whose occupation is spinning thread",
    hints: [
      { era: "1600s", def: "A woman past the typical age of marriage" },
      { era: "1700s", def: "An unmarried woman, especially an older one" },
    ],
  },
  {
    answer: decode("RElBUEVS"),
    clue: "A textile fabric woven with a repeating diamond pattern",
    hints: [
      { era: "1500s", def: "A towel or napkin of patterned fabric" },
      { era: "1800s", def: "An absorbent garment worn by infants" },
    ],
  },
  {
    answer: decode("REVDSU1BVEU="),
    clue: "To select by lot and execute one in every ten soldiers",
    hints: [
      { era: "1600s", def: "To destroy a large proportion of something" },
      { era: "1800s", def: "To cause great destruction or devastation" },
    ],
  },
  {
    answer: decode("Rk9SVFVORQ=="),
    clue: "To happen or take place",
    hints: [
      { era: "1300s", def: "Chance, luck, or fate as a governing force" },
      { era: "1600s", def: "Accumulated wealth or material prosperity" },
    ],
  },
  {
    answer: decode("REVTUElURQ=="),
    clue: "Disdain, contemptuous hatred",
    hints: [
      { era: "1300s", def: "An act of contempt or outrage against someone" },
      { era: "1500s", def: "Notwithstanding, used in the phrase 'in despite of'" },
    ],
  },
  {
    answer: decode("Q09OVkVSU0FUSU9O"),
    clue: "A place where one lives or dwells",
    hints: [
      { era: "1300s", def: "One's general conduct or manner of living in the world" },
      { era: "1600s", def: "Intimate familiarity or close company with others" },
    ],
  },
  {
    answer: decode("Rk9SRVNU"),
    clue: "An area of land allocated for royal hunting",
    hints: [
      { era: "1300s", def: "Any uncultivated tract of land, whether wooded or not" },
      { era: "1500s", def: "A large, wild area densely covered with trees" },
    ],
  },
  {
    answer: decode("Q09ORlVTSU9O"),
    clue: "Overthrow; complete ruin or destruction",
    hints: [
      { era: "1300s", def: "A state of disorder, shame, or embarrassment" },
      { era: "1500s", def: "A mingling together so that things cannot be distinguished" },
    ],
  },
];

export default STREAKS;
