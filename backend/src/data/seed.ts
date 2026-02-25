import "dotenv/config";
import { supabase } from "./supabaseClient";

// ─── Soccer ───────────────────────────────────────────────────────────────────

const soccerPlayers = [
  // Attackers / Forwards
  "Lionel Messi",
  "Cristiano Ronaldo",
  "Kylian Mbappé",
  "Erling Haaland",
  "Vinicius Jr",
  "Lamine Yamal",
  "Neymar Jr",
  "Karim Benzema",
  "Harry Kane",
  "Robert Lewandowski",
  "Sadio Mané",
  "Son Heung-min",
  "Antoine Griezmann",
  "Marcus Rashford",
  "Paulo Dybala",
  "Victor Osimhen",
  "Lautaro Martínez",
  "Rafael Leão",
  "Ousmane Dembélé",
  "Khvicha Kvaratskhelia",
  "Julián Álvarez",
  "Bukayo Saka",
  "Gabriel Martinelli",
  "Alejandro Garnacho",
  "Ollie Watkins",
  "Viktor Gyökeres",
  "Alexander Isak",
  "Dušan Vlahović",
  "Mohamed Salah",
  "Phil Foden",
  "Cole Palmer",

  // Midfielders
  "Jude Bellingham",
  "Pedri",
  "Gavi",
  "Rodri",
  "Kevin De Bruyne",
  "Luka Modrić",
  "Bernardo Silva",
  "Bruno Fernandes",
  "Martin Ødegaard",
  "Declan Rice",
  "Hakan Çalhanoğlu",
  "Federico Valverde",
  "Eduardo Camavinga",
  "Aurélien Tchouaméni",
  "Florian Wirtz",
  "Jamal Musiala",
  "Granit Xhaka",
  "Dominik Szoboszlai",
  "N'Golo Kanté",
  "Enzo Fernández",

  // Defenders
  "Virgil van Dijk",
  "Trent Alexander-Arnold",
  "Rúben Dias",
  "Theo Hernández",
  "Andy Robertson",
  "Jan Oblak",

  // Goalkeepers
  "Manuel Neuer",
  "Thibaut Courtois",
  "Alisson Becker",
  "Mike Maignan",
  "Emiliano Martínez",
];

const soccerClubs = [
  // England
  "Manchester City",
  "Liverpool",
  "Arsenal",
  "Chelsea",
  "Manchester United",
  "Tottenham Hotspur",
  "Aston Villa",
  "Newcastle United",

  // Spain
  "Real Madrid",
  "FC Barcelona",
  "Atletico Madrid",
  "Real Sociedad",
  "Sevilla",
  "Villarreal",

  // Germany
  "Bayern Munich",
  "Borussia Dortmund",
  "Bayer Leverkusen",
  "RB Leipzig",
  "Eintracht Frankfurt",

  // Italy
  "Inter Milan",
  "AC Milan",
  "Juventus",
  "Napoli",
  "AS Roma",
  "Atalanta",

  // France
  "Paris Saint-Germain",
  "Olympique de Marseille",
  "Olympique Lyonnais",

  // Portugal
  "Porto",
  "Benfica",
  "Sporting CP",

  // Netherlands
  "Ajax",
  "PSV Eindhoven",

  // Turkey
  "Galatasaray",
  "Fenerbahçe",

  // Scotland
  "Celtic",
];

// ─── Basketball ───────────────────────────────────────────────────────────────

const basketballPlayers = [
  // NBA
  "LeBron James",
  "Stephen Curry",
  "Kevin Durant",
  "Giannis Antetokounmpo",
  "Nikola Jokić",
  "Luka Dončić",
  "Joel Embiid",
  "Jayson Tatum",
  "Ja Morant",
  "Devin Booker",
  "Anthony Davis",
  "Kawhi Leonard",
  "Damian Lillard",
  "Kyrie Irving",
  "James Harden",
  "Jaylen Brown",
  "Donovan Mitchell",
  "Bam Adebayo",
  "Tyrese Haliburton",
  "Shai Gilgeous-Alexander",
  "Victor Wembanyama",
  "Anthony Edwards",
  "Karl-Anthony Towns",
  "Paolo Banchero",
  "LaMelo Ball",
  "Zion Williamson",
  "Chet Holmgren",
  "Alperen Şengün",
  "Mikal Bridges",
  "Franz Wagner",

  // EuroLeague
  "Sergio Llull",
  "Facundo Campazzo",
  "Nikola Mirotić",
  "Shane Larkin",
  "Mike James",
  "Rudy Fernández",
  "Kostas Sloukas",
  "Jan Veselý",
  "Tornike Shengelia",
  "Vasilije Micić",
];

const basketballClubs = [
  // NBA
  "Los Angeles Lakers",
  "Golden State Warriors",
  "Boston Celtics",
  "Chicago Bulls",
  "Miami Heat",
  "San Antonio Spurs",
  "New York Knicks",
  "Oklahoma City Thunder",
  "Denver Nuggets",
  "Milwaukee Bucks",
  "Philadelphia 76ers",
  "Phoenix Suns",
  "Dallas Mavericks",
  "Cleveland Cavaliers",
  "Memphis Grizzlies",
  "Indiana Pacers",

  // EuroLeague
  "Real Madrid",
  "FC Barcelona",
  "Olimpia Milano",
  "Panathinaikos",
  "Olympiacos",
  "Anadolu Efes",
  "Fenerbahçe Beko",
  "Maccabi Tel Aviv",
  "Zalgiris Kaunas",
  "AS Monaco",
  "Virtus Bologna",
  "Valencia Basket",
];

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("Seeding players and clubs...\n");

  const playersRows = [
    ...soccerPlayers.map((name) => ({ name, sport: "soccer" })),
    ...basketballPlayers.map((name) => ({ name, sport: "basketball" })),
  ];

  const clubsRows = [
    ...soccerClubs.map((name) => ({ name, sport: "soccer" })),
    ...basketballClubs.map((name) => ({ name, sport: "basketball" })),
  ];

  const { error: playersError } = await supabase
    .from("players")
    .insert(playersRows);
  if (playersError) {
    console.error("Error seeding players:", playersError.message);
  } else {
    console.log(`✓ ${playersRows.length} players inserted`);
    console.log(`  Soccer:     ${soccerPlayers.length}`);
    console.log(`  Basketball: ${basketballPlayers.length}`);
  }

  const { error: clubsError } = await supabase.from("clubs").insert(clubsRows);
  if (clubsError) {
    console.error("Error seeding clubs:", clubsError.message);
  } else {
    console.log(`\n✓ ${clubsRows.length} clubs inserted`);
    console.log(`  Soccer:     ${soccerClubs.length}`);
    console.log(`  Basketball: ${basketballClubs.length}`);
  }

  console.log("\nDone.");
}

seed();
