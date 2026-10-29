// Patch notes.
// The site loads the newest notes from the GitHub releases of SITE.releasesRepo automatically,
// so publishing a client release with notes is enough. This list is the fallback when GitHub
// can't be reached, and the place for news that isn't a client release (add those at the top
// with "pinned: true" to always show them first).
// Body text supports: "## Heading", "- bullet", "1. step", **bold**, blank lines between paragraphs.
window.PATCH_NOTES = [
  {
    version: "v0.1.39", date: "2026-10-28", title: "Hollow's Eve",
    body: `- Head to Briarford Woods and step onto the graveyard gate to take on the Hollow King's gauntlet.
- Collect Hollow Candy and trade 50+ of it to Old Mother Marrow (press T in Briarford Woods) for new Halloween skins.
- Skins change how your gear looks and give it spooky effects: ghostly hits, candy corn bursts, flaming pumpkins and more.
- New spooky tiles, pumpkins and graveyard props.
- Linux fix: double-clicking to equip gear and to buy from shops now works.`,
  },
  {
    version: "v0.1.37", date: "2026-10-27", title: "Melee effects pass",
    body: `Hits now throw bright sparks away from the attacker, cooling from white-hot to orange, with a short warm flash. The white slash sweeps as an arc from your character through the target.

- New **Melee sparks** option under Graphics in Settings.
- Sparks and slashes now pass underneath treetops and roofs.`,
  },
  {
    version: "v0.1.35", date: "2026-10-27", title: "Spell Charge fixes",
    body: `- The picker closes after choosing a spell and shows charge meters.
- A recharge message appears in chat.
- Fixed recharges never completing.`,
  },
  {
    version: "v0.1.34", date: "2026-10-25", title: "Class Weapon Upgrades",
    body: `- Class weapons can now level up (max level 5). Equip one for the first time to unlock the Class Weapon window.
- Use the slider to send part of your EXP (up to 50%) to your equipped class weapon.
- Each level needs EXP plus an Ascension item: Shard, Sigil, Core, Heart, Soul. Ascension items can be traded.
- Leveled weapons can be traded and keep their level.
- Careful: a class weapon that breaks drops a level and loses half its stored EXP.`,
  },
  {
    version: "v0.1.33", date: "2026-10-25", title: "Quality of life",
    body: `- Dropped items now show on top of the grass.
- Pressing Enter in an empty chat box closes it.
- Right-clicking an item in a shop opens its details.
- The gauntlet countdown and rewards screen fit the game view.`,
  },
  {
    version: "v0.1.31", date: "2026-10-24", title: "New item sprites",
    body: `Over 650 item icons have been redrawn as cleaner pixel art: weapons, armor, shields, rings, potions, ores, keys and more.

1. Open Options.
2. Go to the Inventory section.
3. Turn on **Experimental item sprites**.`,
  },
  {
    version: "v0.1.30", date: "2026-10-22", title: "Gauntlets are here!",
    body: `Timed runs through a chain of rooms. Clear every monster to open the exit portal, rest up in safe rooms, and beat the boss before the clock runs out.

- **Dxj'za Ruins:** walk in to bring up the gate, then hit BEGIN.
- **Daily board:** the fastest clears win prizes.
- **Hard mode:** carry a Dxj'za Seal to the gate for tougher monsters and a separate board.`,
  },
];
