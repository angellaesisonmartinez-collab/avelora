"use client";

import { useState } from "react";
import Image from "next/image";

interface Flavor {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  notes: string[];
  color: string;
  bgGradient: string;
  badgeColor: string;
  image: string;
  stats: {
    calories: string;
    sugar: string;
    botanicals: string;
    caffeine: string;
  };
  tasteProfile: {
    brightness: number;
    crispness: number;
    floral: number;
    sweetness: number;
  };
  quote: string;
}

const FLAVORS: Flavor[] = [
  {
    id: "orange-yuzu",
    name: "Electric Blood Orange & Yuzu",
    subtitle: "Sun-drenched Sicilian citrus, cold-pressed Japanese yuzu, wild elderflower & fresh garden basil.",
    tagline: "Vibrant · Sun-Kissed · Uplifting",
    notes: ["Blood Orange Zest", "Japanese Yuzu Juice", "Alpine Elderflower", "Sweet Basil Extract"],
    color: "#F25A2B",
    bgGradient: "from-[#FFF4EE] via-[#FFE5D9] to-[#FDFBF7]",
    badgeColor: "bg-[#F25A2B] text-white",
    image: "/flavor-orange.jpg",
    stats: {
      calories: "25 kcal",
      sugar: "3g natural fruit",
      botanicals: "4 bio-active extracts",
      caffeine: "0mg (Caffeine Free)",
    },
    tasteProfile: {
      brightness: 95,
      crispness: 90,
      floral: 65,
      sweetness: 40,
    },
    quote: "Like biting into a crisp sun-ripened orange in an Italian garden on a midsummer afternoon.",
  },
  {
    id: "hibiscus-mint",
    name: "Wild Hibiscus & Forest Berry",
    subtitle: "Tart ruby hibiscus blossoms, crushed wild marionberries, sweet mint tips & ashwagandha root.",
    tagline: "Deep Velvet · Tart · Grounding",
    notes: ["Wild Hibiscus Petals", "Crushed Forest Blackberries", "Garden Spearmint", "KSM-66 Ashwagandha"],
    color: "#991B5B",
    bgGradient: "from-[#FDF0F6] via-[#FCE4F0] to-[#FDFBF7]",
    badgeColor: "bg-[#991B5B] text-white",
    image: "/flavor-hibiscus.jpg",
    stats: {
      calories: "20 kcal",
      sugar: "2g natural fruit",
      botanicals: "5 calming botanicals",
      caffeine: "0mg (Caffeine Free)",
    },
    tasteProfile: {
      brightness: 75,
      crispness: 80,
      floral: 95,
      sweetness: 35,
    },
    quote: "A rich, ruby-red elixir that starts juicy and tart, settling into a cooling herbal finish.",
  },
  {
    id: "lime-cucumber",
    name: "Alpine Lime & Shaved Cucumber",
    subtitle: "High-altitude mountain limes, ribboned crisp cucumber, lemongrass stalks & sea-salt minerals.",
    tagline: "Ultra-Crisp · Botanical · Pure Chill",
    notes: ["Key Lime Oil", "Hydrating Cucumber Water", "Crushed Lemongrass", "Mallow Leaf"],
    color: "#2E7D32",
    bgGradient: "from-[#F1F8F2] via-[#E2F2E4] to-[#FDFBF7]",
    badgeColor: "bg-[#2E7D32] text-white",
    image: "/flavor-lime.jpg",
    stats: {
      calories: "18 kcal",
      sugar: "2g cold-pressed lime",
      botanicals: "Electrolyte infused",
      caffeine: "0mg (Caffeine Free)",
    },
    tasteProfile: {
      brightness: 98,
      crispness: 100,
      floral: 45,
      sweetness: 25,
    },
    quote: "The ultimate reset button. Shockingly clean, hyper-refreshing, and invigorating.",
  },
  {
    id: "lavender-peach",
    name: "Twilight Lavender & White Peach",
    subtitle: "French lavender inflorescences, orchard white peaches, chamomile blossom & L-theanine.",
    tagline: "Dreamy · Floral · Euphoric",
    notes: ["French Lavender", "White Peach Nectar", "Chamomile Flowers", "Organic Lemon Balm"],
    color: "#6B46C1",
    bgGradient: "from-[#F5F2FC] via-[#EBE4F9] to-[#FDFBF7]",
    badgeColor: "bg-[#6B46C1] text-white",
    image: "/flavor-lavender.jpg",
    stats: {
      calories: "22 kcal",
      sugar: "3g white peach",
      botanicals: "L-theanine + Chamomile",
      caffeine: "0mg (Caffeine Free)",
    },
    tasteProfile: {
      brightness: 60,
      crispness: 70,
      floral: 100,
      sweetness: 45,
    },
    quote: "A soft, fragrant sip that gently settles the nervous system without slowing you down.",
  },
];

export default function Home() {
  const [activeFlavor, setActiveFlavor] = useState<Flavor>(FLAVORS[0]);
  const [packSize, setPackSize] = useState<12 | 24>(12);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
  const [cartCount, setCartCount] = useState<number>(0);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const handleAddToCart = (flavorName: string) => {
    setCartCount((prev) => prev + 1);
    setAddedToast(`${flavorName} (${packSize}-Pack) added to your crate!`);
    setTimeout(() => {
      setAddedToast(null);
    }, 3500);
  };

  const calculatePrice = () => {
    const base = packSize === 12 ? 36 : 64;
    return isSubscribed ? Math.round(base * 0.85) : base;
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#1E1C1A]">
      {/* Top Floating Toast Notification */}
      {addedToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-[#181614] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/10 transition-all transform animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-[#52D47E]" />
          <p className="text-sm font-medium">{addedToast}</p>
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/85 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a href="#" className="flex items-center gap-2 group">
              <span className="font-display font-bold text-3xl tracking-wider text-[#181614] group-hover:text-[#F25A2B] transition-colors">
                AVELORA
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#78716C] border border-black/10 px-2 py-0.5 rounded-full">
                Botanicals
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#44403C]">
              <a href="#flavors" className="hover:text-[#F25A2B] transition-colors">
                Flavors
              </a>
              <a href="#craft" className="hover:text-[#F25A2B] transition-colors">
                The Brew
              </a>
              <a href="#taste-profile" className="hover:text-[#F25A2B] transition-colors">
                Ingredients
              </a>
              <a href="#reviews" className="hover:text-[#F25A2B] transition-colors">
                Journal
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#flavors"
              className="hidden sm:inline-flex items-center justify-center text-xs font-semibold uppercase tracking-wider px-4 py-2 text-[#181614] hover:text-[#F25A2B] transition-colors"
            >
              Find in Stores
            </a>
            <button
              onClick={() => handleAddToCart(activeFlavor.name)}
              className="relative inline-flex items-center justify-center gap-2 bg-[#181614] hover:bg-[#F25A2B] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95"
            >
              <span>Order Crate</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#F25A2B] group-hover:bg-white text-white group-hover:text-black text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* HERO SECTION */}
        <section
          className={`relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 transition-colors duration-700 bg-gradient-to-b ${activeFlavor.bgGradient}`}
        >
          {/* Subtle decorative background circles */}
          <div
            className="absolute top-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-700"
            style={{ backgroundColor: activeFlavor.color }}
          />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-20 bg-[#F8C33D] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Hero Narrative */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-black/5 shadow-xs w-fit mb-6">
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: activeFlavor.color }}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                    Raw Botanical Soda · 100% Living Plants
                  </span>
                </div>

                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#181614] leading-[1.05] mb-6">
                  Soda reimagined with{" "}
                  <span className="italic font-normal underline decoration-[#F25A2B]/40 decoration-wavy decoration-2">
                    living herbs
                  </span>{" "}
                  & wild fruit.
                </h1>

                <p className="text-lg md:text-xl text-[#57534E] leading-relaxed max-w-xl mb-10 font-normal">
                  No artificial extracts, no refined sugar, and zero shortcuts. Crafted with
                  cold-pressed orchards, whole floral infusions, and adaptogens for a clear mind
                  and vibrant gut.
                </p>

                {/* Flavor Switcher Pills */}
                <div className="flex flex-col gap-3 mb-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#78716C]">
                    Select Experience:
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {FLAVORS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setActiveFlavor(f)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 border ${
                          activeFlavor.id === f.id
                            ? "bg-[#181614] text-white border-[#181614] shadow-md scale-105"
                            : "bg-white/80 text-[#57534E] border-black/10 hover:bg-white hover:border-black/30"
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: f.color }}
                        />
                        <span>{f.name.split("&")[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Purchasing Micro-Widget */}
                <div className="p-6 rounded-3xl bg-white/90 border border-black/5 shadow-lg backdrop-blur-sm max-w-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs font-semibold text-[#78716C] uppercase tracking-wider block">
                        Now Tasting
                      </span>
                      <h2 className="font-display font-bold text-xl text-[#181614]">
                        {activeFlavor.name}
                      </h2>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#181614]">
                        ${calculatePrice()}
                      </span>
                      <span className="text-xs text-[#78716C] block">
                        {packSize} cans ({isSubscribed ? "15% off" : "One-time"})
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={() => setPackSize(12)}
                      className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                        packSize === 12
                          ? "bg-[#181614] text-white border-[#181614]"
                          : "bg-[#F7F3EB] text-[#57534E] border-transparent hover:bg-black/5"
                      }`}
                    >
                      12 Pack Standard
                    </button>
                    <button
                      onClick={() => setPackSize(24)}
                      className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                        packSize === 24
                          ? "bg-[#181614] text-white border-[#181614]"
                          : "bg-[#F7F3EB] text-[#57534E] border-transparent hover:bg-black/5"
                      }`}
                    >
                      24 Pack (Best Value)
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-black/5 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-[#57534E]">
                      <input
                        type="checkbox"
                        checked={isSubscribed}
                        onChange={(e) => setIsSubscribed(e.target.checked)}
                        className="rounded accent-[#F25A2B] w-4 h-4 cursor-pointer"
                      />
                      <span>Subscribe monthly (Save 15%)</span>
                    </label>

                    <button
                      onClick={() => handleAddToCart(activeFlavor.name)}
                      className="px-6 py-3 rounded-full bg-[#F25A2B] hover:bg-[#d94a1e] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                    >
                      Add To Crate
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Focus */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                  {/* Decorative rotating accent ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-black/10 animate-spin [animation-duration:40s] pointer-events-none" />

                  {/* Can Image with Floating Animation */}
                  <div className="relative z-10 w-full h-full p-2 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 bg-white/40 backdrop-blur-md border border-white/60">
                    <Image
                      src={activeFlavor.image}
                      alt={activeFlavor.name}
                      width={600}
                      height={600}
                      priority
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Floating badge top right */}
                  <div className="absolute -top-4 -right-4 z-20 bg-white/95 px-4 py-2.5 rounded-2xl shadow-xl border border-black/5 flex items-center gap-2">
                    <span className="text-xl">🌿</span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#78716C]">
                        Naturally Fermented
                      </p>
                      <p className="text-xs font-bold text-[#181614]">Zero Refined Sugars</p>
                    </div>
                  </div>

                  {/* Floating badge bottom left */}
                  <div className="absolute -bottom-4 -left-4 z-20 bg-white/95 px-4 py-2.5 rounded-2xl shadow-xl border border-black/5 flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#78716C]">
                        Carbonation
                      </p>
                      <p className="text-xs font-bold text-[#181614]">Micro-Effervescent</p>
                    </div>
                  </div>
                </div>

                {/* Flavor Notes Pill Strip */}
                <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-md">
                  {activeFlavor.notes.map((note) => (
                    <span
                      key={note}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-white/80 border border-black/5 text-[#44403C] shadow-2xs"
                    >
                      • {note}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: FLAVOR ARCHIVE GALLERY */}
        <section id="flavors" className="py-24 bg-[#FDFBF7] border-t border-black/5">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#F25A2B] block mb-2">
                  The Botanical Lineup
                </span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#181614]">
                  Four distinct flavor profiles. <br />
                  Zero artificial anything.
                </h2>
              </div>
              <p className="text-[#57534E] max-w-md text-sm md:text-base leading-relaxed">
                Each formulation is cold-infused for 48 hours to preserve volatile herbal oils,
                yielding a layered taste that evolves on the palate.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {FLAVORS.map((flavor) => (
                <div
                  key={flavor.id}
                  onClick={() => setActiveFlavor(flavor)}
                  className={`group cursor-pointer rounded-3xl p-5 transition-all duration-500 border flex flex-col justify-between ${
                    activeFlavor.id === flavor.id
                      ? "bg-white shadow-xl border-[#181614]/20 scale-[1.02]"
                      : "bg-[#F7F3EB]/60 hover:bg-white hover:shadow-lg border-black/5"
                  }`}
                >
                  <div>
                    {/* Can visual */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-white/50">
                      <Image
                        src={flavor.image}
                        alt={flavor.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span
                        className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs ${flavor.badgeColor}`}
                      >
                        {flavor.stats.calories}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-[#181614] mb-2 group-hover:text-[#F25A2B] transition-colors">
                      {flavor.name}
                    </h3>
                    <p className="text-xs text-[#57534E] leading-relaxed mb-6 font-normal">
                      {flavor.subtitle}
                    </p>
                  </div>

                  <div>
                    {/* Flavor attributes */}
                    <div className="space-y-2 pt-4 border-t border-black/5 mb-6 text-xs text-[#78716C]">
                      <div className="flex justify-between">
                        <span>Sugar Content</span>
                        <span className="font-semibold text-[#181614]">{flavor.stats.sugar}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Botanicals</span>
                        <span className="font-semibold text-[#181614]">{flavor.stats.botanicals}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveFlavor(flavor);
                        handleAddToCart(flavor.name);
                      }}
                      className="w-full py-2.5 rounded-full bg-[#181614] hover:bg-[#F25A2B] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: CRAFT & FERMENTATION PROCESS */}
        <section id="craft" className="py-24 bg-[#181614] text-[#FDFBF7] relative overflow-hidden">
          {/* Subtle ambient light */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F25A2B]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#2E7D32]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
            <div className="max-w-3xl mb-20">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F8C33D] block mb-3">
                The Science of True Effervescence
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                Most sodas are flavored syrup & tap water. We brew with living botanicals.
              </h2>
              <p className="text-[#A8A29E] text-base md:text-lg leading-relaxed font-normal">
                Conventional sodas spike glucose and dull the senses. Avelora was born in a kitchen
                laboratory to create a beverage that delights the palate while supporting vitality.
              </p>
            </div>

            {/* Step-by-step Craft Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#F25A2B]/20 text-[#F25A2B] flex items-center justify-center text-xl font-bold mb-6">
                  01
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-white">
                  Cold-Macerated Botanicals
                </h3>
                <p className="text-sm text-[#A8A29E] leading-relaxed">
                  We steep whole herbs, citrus rinds, and adaptogenic roots in mountain spring water
                  at precisely 38°F for 48 hours to preserve volatile essential oils without bitterness.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#F8C33D]/20 text-[#F8C33D] flex items-center justify-center text-xl font-bold mb-6">
                  02
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-white">
                  Raw Pressed Fruit Juices
                </h3>
                <p className="text-sm text-[#A8A29E] leading-relaxed">
                  Sweetness comes exclusively from unpasteurized organic fruit: ripe Sicilian blood
                  oranges, fresh yuzu, and crushed blackberries. Never cane sugar or stevia aftertaste.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#52D47E]/20 text-[#52D47E] flex items-center justify-center text-xl font-bold mb-6">
                  03
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-white">
                  Micro-Bubble Conditioning
                </h3>
                <p className="text-sm text-[#A8A29E] leading-relaxed">
                  Carbonated at champagne-grade micro-pressures for an exceptionally silky, fine bubble
                  texture that dances across the tongue rather than overwhelming the throat.
                </p>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/10">
              <h3 className="font-display text-3xl font-bold mb-8 text-center text-white">
                How Avelora compares to standard drinks
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-[#78716C]">
                      <th className="py-4 px-4">Metric</th>
                      <th className="py-4 px-4 text-[#F25A2B] font-bold">AVELORA Craft</th>
                      <th className="py-4 px-4">Commercial Soda</th>
                      <th className="py-4 px-4">Plain Seltzer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#D6D3D1]">
                    <tr>
                      <td className="py-4 px-4 font-medium text-white">Refined Sugar</td>
                      <td className="py-4 px-4 font-bold text-[#52D47E]">0g (Zero)</td>
                      <td className="py-4 px-4 text-[#EF4444]">39g - 44g</td>
                      <td className="py-4 px-4">0g</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium text-white">Ingredients Source</td>
                      <td className="py-4 px-4 font-bold text-white">100% Real Whole Botanicals</td>
                      <td className="py-4 px-4 text-[#A8A29E]">Artificial Flavor Compounds</td>
                      <td className="py-4 px-4 text-[#A8A29E]">Lab Essence / Aroma</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium text-white">Functional Benefits</td>
                      <td className="py-4 px-4 font-bold text-[#52D47E]">Adaptogens & Prebiotics</td>
                      <td className="py-4 px-4 text-[#EF4444]">Sugar Crash & Acidity</td>
                      <td className="py-4 px-4 text-[#A8A29E]">Hydration Only</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium text-white">Effervescence Quality</td>
                      <td className="py-4 px-4 font-bold text-white">Fine Champagne Micro-Bubbles</td>
                      <td className="py-4 px-4 text-[#A8A29E]">Harsh Industrial CO₂</td>
                      <td className="py-4 px-4 text-[#A8A29E]">Variable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: TASTE PROFILE INTERACTIVE EXPLORER */}
        <section id="taste-profile" className="py-24 bg-[#F7F3EB] border-t border-black/5">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5">
                <span className="text-xs font-bold uppercase tracking-widest text-[#F25A2B] block mb-2">
                  Palate Architecture
                </span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#181614] mb-6">
                  Engineered for real sensory depth.
                </h2>
                <p className="text-[#57534E] leading-relaxed mb-8">
                  We don&apos;t mask ingredients with sweeteners. Each can is dialed in to deliver crisp
                  top notes, balanced mid-palate complexity, and a clean, lingering aromatic finish.
                </p>

                {/* Interactive selector */}
                <div className="space-y-3">
                  {FLAVORS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setActiveFlavor(f)}
                      className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center justify-between ${
                        activeFlavor.id === f.id
                          ? "bg-white shadow-md border-black/10"
                          : "bg-white/40 hover:bg-white/70 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: f.color }}
                        />
                        <span className="text-sm font-bold text-[#181614]">{f.name}</span>
                      </div>
                      <span className="text-xs font-medium text-[#78716C]">{f.tagline}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavor Sensory Radar Card */}
              <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-black/5">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
                      Sensory Breakdown
                    </span>
                    <h3 className="font-display text-3xl font-bold text-[#181614]">
                      {activeFlavor.name}
                    </h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${activeFlavor.badgeColor}`}
                  >
                    {activeFlavor.stats.calories}
                  </span>
                </div>

                {/* Taste Spectrum Meters */}
                <div className="space-y-6 mb-8">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-[#44403C] mb-2">
                      <span>Citrus / Brightness</span>
                      <span>{activeFlavor.tasteProfile.brightness}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#F7F3EB] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${activeFlavor.tasteProfile.brightness}%`,
                          backgroundColor: activeFlavor.color,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-[#44403C] mb-2">
                      <span>Crispness / Effervescence</span>
                      <span>{activeFlavor.tasteProfile.crispness}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#F7F3EB] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${activeFlavor.tasteProfile.crispness}%`,
                          backgroundColor: activeFlavor.color,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-[#44403C] mb-2">
                      <span>Botanical & Floral Notes</span>
                      <span>{activeFlavor.tasteProfile.floral}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#F7F3EB] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${activeFlavor.tasteProfile.floral}%`,
                          backgroundColor: activeFlavor.color,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-[#44403C] mb-2">
                      <span>Fruit Sweetness (Natural)</span>
                      <span>{activeFlavor.tasteProfile.sweetness}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#F7F3EB] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${activeFlavor.tasteProfile.sweetness}%`,
                          backgroundColor: activeFlavor.color,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Sommelier Quote */}
                <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-black/5 italic text-sm text-[#57534E] leading-relaxed">
                  &ldquo;{activeFlavor.quote}&rdquo;
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 5: TASTING REVIEWS & SOCIAL PROOF */}
        <section id="reviews" className="py-24 bg-[#FDFBF7]">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F25A2B] block mb-2">
                From The Sommelier Journal
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#181614]">
                Loved by chefs, foodies & sober-curious innovators.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-[#F8C33D] mb-4 text-base">★★★★★</div>
                  <p className="text-base font-display italic text-[#181614] leading-relaxed mb-6">
                    &ldquo;Avelora has completely replaced wine for our dinner pairings. The Electric Blood Orange with basil is unmatched in nuance.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                  <div className="w-10 h-10 rounded-full bg-[#FFE5D9] text-[#F25A2B] flex items-center justify-center font-bold text-sm">
                    MC
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#181614]">Chef Marcus Chen</h4>
                    <p className="text-xs text-[#78716C]">Atelier Sante, San Francisco</p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-[#F8C33D] mb-4 text-base">★★★★★</div>
                  <p className="text-base font-display italic text-[#181614] leading-relaxed mb-6">
                    &ldquo;The fine champagne bubbles make this feel luxurious. It doesn’t feel like a health substitute; it feels like an upgrade.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                  <div className="w-10 h-10 rounded-full bg-[#E2F2E4] text-[#2E7D32] flex items-center justify-center font-bold text-sm">
                    EV
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#181614]">Elena Vance</h4>
                    <p className="text-xs text-[#78716C]">Beverage Editor, Modern Gastronomy</p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-[#F8C33D] mb-4 text-base">★★★★★</div>
                  <p className="text-base font-display italic text-[#181614] leading-relaxed mb-6">
                    &ldquo;Wild Hibiscus with Ashwagandha is my 3 PM ritual. It stops afternoon brain fog without giving me jitters.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                  <div className="w-10 h-10 rounded-full bg-[#EBE4F9] text-[#6B46C1] flex items-center justify-center font-bold text-sm">
                    SL
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#181614]">Dr. Sophia Laurent</h4>
                    <p className="text-xs text-[#78716C]">Holistic Nutritionist & Author</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CURATED CRATE CTA BANNER */}
        <section className="py-20 bg-[#F25A2B] text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center relative z-10">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Taste the difference of true living craft soda.
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-10">
              Order a Discovery Variety Crate today. Shipped chilled straight to your door with carbon-neutral courier delivery.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleAddToCart("Variety 12-Pack Crate")}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#181614] hover:bg-black text-white font-bold text-sm uppercase tracking-wider transition-transform hover:scale-105 shadow-2xl active:scale-95"
              >
                Order The Discovery Crate — $36
              </button>
              <a
                href="#craft"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-sm uppercase tracking-wider transition-colors"
              >
                Read Ingredients
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#181614] text-[#A8A29E] py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="space-y-4">
              <span className="font-display font-bold text-2xl tracking-wider text-white">
                AVELORA
              </span>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Sparkling botanicals brewed from living whole fruit and herbs. Handcrafted for sensory elevation.
              </p>
              <p className="text-xs text-[#57534E]">
                © {new Date().getFullYear()} Avelora Botanical Beverages Inc. All rights reserved.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Flavors</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#flavors" className="hover:text-white transition-colors">Electric Blood Orange & Yuzu</a></li>
                <li><a href="#flavors" className="hover:text-white transition-colors">Wild Hibiscus & Forest Berry</a></li>
                <li><a href="#flavors" className="hover:text-white transition-colors">Alpine Lime & Cucumber</a></li>
                <li><a href="#flavors" className="hover:text-white transition-colors">Twilight Lavender & Peach</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Values</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#craft" className="hover:text-white transition-colors">Zero Artificial Flavors</a></li>
                <li><a href="#craft" className="hover:text-white transition-colors">Adaptogen Sourcing</a></li>
                <li><a href="#craft" className="hover:text-white transition-colors">Recyclable Aluminum</a></li>
                <li><a href="#craft" className="hover:text-white transition-colors">1% For The Planet</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Stay Connected</h4>
              <p className="text-xs text-[#78716C] mb-3">
                Join our botanical tasting notes list for limited micro-batch releases.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder:text-[#57534E] focus:outline-hidden focus:border-[#F25A2B] flex-1"
                />
                <button className="px-4 py-2 bg-[#F25A2B] hover:bg-[#d94a1e] text-white rounded-full text-xs font-bold transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
