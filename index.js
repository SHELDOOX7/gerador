const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Configuração do servidor Express
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Webhook e token do bot
const webhookUrl = 'https://discordapp.com/api/webhooks/1317167507655884870/us06PV5_uhPOmkpyRmAA9vWq7Fi7WYSc9QZmBh-tmumHu8qtmEk2WsauI66nBZS4vJ64';
const botToken = process.env.BOT_TOKEN || 'MTMwOTkzMzgwMTczMjA0Njk2MA.GL4NhV.btxw5KMsT_ZnfQe7xpZe3-hBohbOwUzaY_215Q';

// Criação do bot
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

// Funções de geração
function gerarNome() {
  const nomesBase = [
    'JohnDoe', 'JaneDoe', 'Player123', 'GamerPro', 'NoobSlayer', 'ShadowHunter', 'NightWolf', 
    'MysticWizard', 'FireDragon', 'CoolKid', 'EpicWarrior', 'FastRunner', 'ThunderStorm', 
    'SilentKiller', 'GhostlyShadow', 'DarkPhoenix', 'CrystalKnight', 'LegendX', 'QuickSilver',
    'StarGazer', 'IronFist', 'SpeedyGonzales', 'UltraNinja', 'PowerPlayer', 'MightyBear', 
    'FearlessHero', 'LoneWolf', 'BlueFalcon', 'DragonSlayer', 'IceQueen', 'BlazingSword', 
    'MagicMaster', 'BattleKing', 'WildTiger', 'GoldenArrow', 'SilverBullet', 'StormRider', 
    'DarkKnight', 'SkyWalker', 'LightningBolt', 'FireFlame', 'CyberHawk', 'PixelPanda', 
    'AlphaWolf', 'BetaPlayer', 'GammaRay', 'ZetaZero', 'OmegaKing', 'SolarEclipse', 
    'LunarWave', 'CometCrash', 'AstroNova', 'CosmicRay', 'StellarForce', 'NebulaStorm', 
    'GalacticHero', 'StarVoyager', 'PlanetCrusher', 'OrbitRunner', 'RocketPilot', 
    'SpaceHunter', 'SuperNova', 'MeteorStrike', 'GalaxyQuest', 'BlackHole', 'QuantumFlux', 
    'InfinityEdge', 'NovaBlast', 'Starfire', 'AstralKnight', 'EternalFlame', 'BrightSky', 
    'FrozenBlade', 'VenomStrike', 'ToxicWolf', 'DarkSoul', 'PhantomX', 'InfernoDragon', 
    'GoldenEagle', 'IronClaw', 'ShadowBlade', 'Nightmare', 'TidalWave', 'OceanStorm', 
    'MysticMage', 'WizardKing', 'Archmage', 'SorcererX', 'SpellCaster', 'IceWizard', 
    'FlameMage', 'ElectricBolt', 'ThunderClap', 'StormBreaker', 'WindWalker', 'EarthShaker', 
    'GravityKing', 'MagnetForce', 'TitaniumBlade', 'PlasmaKnight', 'NeonGlow', 
    'CyberKnight', 'FutureWarrior', 'TimeTraveler', 'DimensionX', 'VoidHunter', 'NetherKing', 
    'AbyssWalker', 'ChaosKnight', 'DoomSlayer', 'Frostbite', 'BlizzardStorm', 'ArcticWolf', 
    'SnowLeopard', 'PolarBear', 'IceDagger', 'FrozenArrow', 'GlacierKnight', 'FrostBlade', 
    'CrystalMage', 'FrozenFlame', 'DiamondSword', 'EmeraldKnight', 'RubyMage', 'SapphireBlade', 
    'TopazHunter', 'AmethystKing', 'GemstoneWarrior', 'ObsidianKnight', 'LavaKing', 
    'MoltenBlade', 'Firestorm', 'EmberKnight', 'AshWalker', 'FlameRider', 'BurningPhoenix', 
    'InfernoKing', 'BlazingDragon', 'FireMage', 'PyroMaster', 'HeatWave', 'SolarKnight', 
    'SunlightWarrior', 'DayBreaker', 'DawnRider', 'BrightFlame', 'GoldenSun', 'SolarFlare', 
    'LightRider', 'EclipseKnight', 'MoonlightWarrior', 'NightShade', 'LunarKnight', 
    'SilverMoon', 'StarKnight', 'CosmicHunter', 'NebulaX', 'GalaxyKnight', 'Starlight', 
    'SpaceRider', 'AstroX', 'RocketKnight', 'GravityRider', 'VoidWalker', 'NetherKnight', 
    'ChaosHunter', 'DarkRider', 'BlackKnight', 'ShadowWarrior', 'PhantomKnight', 
    'SilentShadow', 'StealthHunter', 'GhostKnight', 'SpecterX', 'WraithRider', 
    'EtherealKnight', 'VoidX', 'AbyssKnight', 'NetherMage', 'DarkMage', 'ShadowMaster', 
    'PhantomMage', 'SpecterMage', 'WraithMage', 'EtherealMage', 'VoidMage', 'AbyssMage',
    'SkyWarrior', 'CloudRider', 'StormX', 'ThunderKnight', 'LightningRider', 'WindHunter',
    'TornadoX', 'HurricaneX', 'StormBreakerX', 'CycloneX', 'TempestRider', 'BlizzardKnight', 
    'IceStorm', 'FrostKnight', 'SnowHunter', 'WinterRider', 'ColdSnap', 'ArcticKnight',
    'FrozenX', 'ChillMage', 'FrostMage', 'GlacierMage', 'IceMage', 'CrystalX', 'DiamondX', 
    'EmeraldX', 'RubyX', 'SapphireX', 'TopazX', 'AmethystX', 'GemstoneX', 'ObsidianX',
    'LavaX', 'MoltenX', 'FireX', 'BlazeX', 'FlameX', 'InfernoX', 'BurnX', 'HeatX', 
    'SolarX', 'SunX', 'DayX', 'DawnX', 'BrightX', 'GoldenX', 'StarX', 'SpaceX',
    'RocketX', 'AstroX', 'GalacticX', 'CosmicX', 'NebulaX', 'VoidX', 'NetherX', 'ChaosX',
    'DarkX', 'ShadowX', 'PhantomX', 'SilentX', 'StealthX', 'GhostX', 'SpecterX', 'WraithX',
    'EtherealX', 'VoidMageX'
  ];

  const nomeBase = nomesBase[Math.floor(Math.random() * nomesBase.length)];
  const numero = Math.floor(1000 + Math.random() * 9000); // Gera um número de 4 dígitos
  return `${nomeBase}${numero}`;
}


function gerarSenha() {
  return Math.random().toString(36).slice(-8);
}

// Mensagem no console
console.log('[+] Iniciando sistema...');

bot.once('ready', () => {
  console.log('[BOT] Entrou no site...');
});

// Rota principal (página inicial)
app.get('/', (req, res) => {
  res.render('index');
});

// Rota para envio dos dados (geração de nome e senha)
app.post('/send', async (req, res) => {
  const nome = gerarNome();
  const senha = gerarSenha();

  try {
    // Envia para o webhook no Discord
    await axios.post(webhookUrl, {
      embeds: [
        {
          title: '🔑 Nova Conta Gerada',
          description: 'Uma nova conta foi gerada com sucesso! 🎉',
          color: 3447003,
          fields: [
            { name: 'Nome Gerado', value: nome, inline: true },
            { name: 'Senha Gerada', value: senha, inline: true },
          ],
          thumbnail: {
            url: 'https://cdn.discordapp.com/icons/1248451297179336799/baabcebf8da01f583a0cdf7560f3c475.png?size=2048',
          },
          footer: {
            text: 'Feito por rip_sheldoohz',
            icon_url: 'https://cdn.discordapp.com/icons/1248451297179336799/baabcebf8da01f583a0cdf7560f3c475.png?size=2048',
          },
          timestamp: new Date(),
        },
      ],
    });

    console.log(`[+] Dados enviados com sucesso! Nome: ${nome}, Senha: ${senha}`);
    res.json({
      nome,
      senha,
      mensagem: 'Conta gerada com sucesso!',
    });
  } catch (error) {
    console.error('[❌] Erro ao enviar os dados:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Inicia o servidor e o bot
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  bot.login(botToken);
});
