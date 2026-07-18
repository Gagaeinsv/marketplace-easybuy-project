const fs = require('fs');

const data = `Women's clothing,Outerwear,Coats
Women's clothing,Outerwear,Jackets
Women's clothing,Outerwear,Parkas
Women's clothing,Outerwear,Down jackets
Women's clothing,Outerwear,Vests
Women's clothing,Outerwear,Raincoats
Women's clothing,Outerwear,Trench coats
Women's clothing,Outerwear,Leather jackets
Women's clothing,Outerwear,Faux fur
Women's clothing,Outerwear,Capes & ponchos
Women's clothing,Knitwear,Sweaters
Women's clothing,Knitwear,Cardigans
Women's clothing,Knitwear,Turtlenecks
Women's clothing,Knitwear,Vests
Women's clothing,Tops,T‑shirts
Women's clothing,Tops,Longsleeves
Women's clothing,Tops,Blouses
Women's clothing,Tops,Shirts
Women's clothing,Tops,Tank tops
Women's clothing,Tops,Bodysuits
Women's clothing,Tops,Hoodies
Women's clothing,Tops,Sweatshirts
Women's clothing,Dresses,Casual
Women's clothing,Dresses,Office
Women's clothing,Dresses,Evening
Women's clothing,Dresses,Cocktail
Women's clothing,Dresses,Summer
Women's clothing,Dresses,Knitted
Women's clothing,Dresses,Shirt dresses
Women's clothing,Dresses,Maxi
Women's clothing,Dresses,Midi
Women's clothing,Dresses,Mini
Women's clothing,Dresses,Maternity
Women's clothing,Dresses,Plus size
Women's clothing,Skirts,Pencil
Women's clothing,Skirts,A‑line
Women's clothing,Skirts,Pleated
Women's clothing,Skirts,Wrap
Women's clothing,Skirts,Mini
Women's clothing,Skirts,Midi
Women's clothing,Skirts,Maxi
Women's clothing,Skirts,Leather
Women's clothing,Pants,Jeans – skinny
Women's clothing,Pants,Jeans – straight
Women's clothing,Pants,Jeans – mom
Women's clothing,Pants,Chinos
Women's clothing,Pants,Trousers
Women's clothing,Pants,Leggings
Women's clothing,Pants,Joggers
Women's clothing,Pants,Culottes
Women's clothing,Pants,Shorts
Women's clothing,Suits,Trouser suits
Women's clothing,Suits,Skirt suits
Women's clothing,Suits,Blazers
Women's clothing,Suits,Vests
Women's clothing,Underwear,Bras
Women's clothing,Underwear,Panties
Women's clothing,Underwear,Sets
Women's clothing,Underwear,Shapewear
Women's clothing,Underwear,Thermal underwear
Women's clothing,Underwear,Socks & tights
Women's clothing,Sleepwear & Home,Pajamas
Women's clothing,Sleepwear & Home,Nightgowns
Women's clothing,Sleepwear & Home,Robes
Women's clothing,Sleepwear & Home,Loungewear
Women's clothing,Sleepwear & Home,Slippers
Women's clothing,Sportswear,Tracksuits
Women's clothing,Sportswear,Leggings
Women's clothing,Sportswear,Sport bras
Women's clothing,Sportswear,Tops
Women's clothing,Sportswear,Outerwear
Women's clothing,Swimwear,One‑piece
Women's clothing,Swimwear,Bikinis
Women's clothing,Swimwear,Tankinis
Women's clothing,Swimwear,Cover‑ups
Women's clothing,Swimwear,Beachwear
Women's clothing,Shoes,Sneakers
Women's clothing,Shoes,Boots
Women's clothing,Shoes,Ankle boots
Women's clothing,Shoes,Heels
Women's clothing,Shoes,Flats
Women's clothing,Shoes,Sandals
Women's clothing,Shoes,Loafers
Women's clothing,Shoes,Mules
Women's clothing,Shoes,Espadrilles
Women's clothing,Shoes,Slippers
Women's clothing,Accessories,Bags – tote
Women's clothing,Accessories,Bags – crossbody
Women's clothing,Accessories,Backpacks
Women's clothing,Accessories,Wallets
Women's clothing,Accessories,Belts
Women's clothing,Accessories,Hats & caps
Women's clothing,Accessories,Scarves
Women's clothing,Accessories,Gloves
Women's clothing,Accessories,Jewelry
Women's clothing,Accessories,Sunglasses
Women's clothing,Accessories,Umbrellas
Women's clothing,Special,For pregnancy
Women's clothing,Special,Plus size
Women's clothing,Special,Workwear
Women's clothing,Special,Uniforms
Men's clothing,Outerwear,Coats
Men's clothing,Outerwear,Jackets
Men's clothing,Outerwear,Parkas
Men's clothing,Outerwear,Down jackets
Men's clothing,Outerwear,Vests
Men's clothing,Outerwear,Raincoats
Men's clothing,Outerwear,Leather jackets
Men's clothing,Outerwear,Blazers
Men's clothing,Knitwear,Sweaters
Men's clothing,Knitwear,Cardigans
Men's clothing,Knitwear,Turtlenecks
Men's clothing,Knitwear,Vests
Men's clothing,Tops,T‑shirts
Men's clothing,Tops,Polos
Men's clothing,Tops,Shirts – casual
Men's clothing,Tops,Shirts – formal
Men's clothing,Tops,Hoodies
Men's clothing,Tops,Sweatshirts
Men's clothing,Pants,Jeans – slim
Men's clothing,Pants,Jeans – straight
Men's clothing,Pants,Chinos
Men's clothing,Pants,Trousers – classic
Men's clothing,Pants,Joggers
Men's clothing,Pants,Shorts
Men's clothing,Suits,Two‑piece suits
Men's clothing,Suits,Three‑piece suits
Men's clothing,Suits,Blazers
Men's clothing,Suits,Vests
Men's clothing,Underwear,Boxers
Men's clothing,Underwear,Briefs
Men's clothing,Underwear,Socks
Men's clothing,Underwear,Thermal underwear
Men's clothing,Sleepwear & Home,Pajamas
Men's clothing,Sleepwear & Home,Robes
Men's clothing,Sleepwear & Home,Loungewear
Men's clothing,Sleepwear & Home,Slippers
Men's clothing,Sportswear,Tracksuits
Men's clothing,Sportswear,Compression
Men's clothing,Sportswear,Outerwear
Men's clothing,Sportswear,Tops
Men's clothing,Sportswear,Bottoms
Men's clothing,Shoes,Sneakers
Men's clothing,Shoes,Derbies
Men's clothing,Shoes,Oxfords
Men's clothing,Shoes,Loafers
Men's clothing,Shoes,Boots
Men's clothing,Shoes,Sandals
Men's clothing,Shoes,Slippers
Men's clothing,Accessories,Bags & backpacks
Men's clothing,Accessories,Wallets
Men's clothing,Accessories,Belts
Men's clothing,Accessories,Hats & caps
Men's clothing,Accessories,Scarves
Men's clothing,Accessories,Gloves
Men's clothing,Accessories,Ties & bow ties
Men's clothing,Accessories,Watches
Men's clothing,Accessories,Sunglasses
Men's clothing,Special,Plus size
Men's clothing,Special,Workwear
Men's clothing,Special,Uniforms
Children's clothing,By age,Baby 0‑24m
Children's clothing,By age,Kids 2‑8y
Children's clothing,By age,Teens 9‑16y
Children's clothing,Outerwear,Coats & jackets
Children's clothing,Outerwear,Down jackets
Children's clothing,Outerwear,Vests
Children's clothing,Outerwear,Rainwear
Children's clothing,Tops,T‑shirts
Children's clothing,Tops,Shirts & blouses
Children's clothing,Tops,Hoodies
Children's clothing,Tops,Sweatshirts
Children's clothing,Bottoms,Jeans
Children's clothing,Bottoms,Trousers
Children's clothing,Bottoms,Leggings
Children's clothing,Bottoms,Shorts
Children's clothing,Bottoms,Skirts (girls)
Children's clothing,Dresses (girls),Casual
Children's clothing,Dresses (girls),Occasion
Children's clothing,Dresses (girls),School
Children's clothing,School,Uniforms
Children's clothing,School,Sports kit
Children's clothing,School,Backpacks
Children's clothing,Shoes,Sneakers
Children's clothing,Shoes,Boots
Children's clothing,Shoes,Sandals
Children's clothing,Shoes,School shoes
Children's clothing,Shoes,Slippers
Children's clothing,Accessories,Hats & scarves
Children's clothing,Accessories,Gloves
Children's clothing,Accessories,Belts
Children's clothing,Accessories,Hair accessories
Accessories (unisex),Bags,Tote
Accessories (unisex),Bags,Crossbody
Accessories (unisex),Bags,Shoulder
Accessories (unisex),Bags,Backpacks
Accessories (unisex),Bags,Suitcases
Accessories (unisex),Bags,Wallets
Accessories (unisex),Jewelry,Necklaces
Accessories (unisex),Jewelry,Bracelets
Accessories (unisex),Jewelry,Earrings
Accessories (unisex),Jewelry,Rings
Accessories (unisex),Jewelry,Watches
Accessories (unisex),Headwear,Caps
Accessories (unisex),Headwear,Hats
Accessories (unisex),Headwear,Beanies
Accessories (unisex),Winter,Scarves
Accessories (unisex),Winter,Gloves
Accessories (unisex),Winter,Mittens
Accessories (unisex),Eyewear,Sunglasses
Accessories (unisex),Eyewear,Frames
Accessories (unisex),Belts & small goods,Belts
Accessories (unisex),Belts & small goods,Keychains
Accessories (unisex),Belts & small goods,Cardholders
Accessories (unisex),Belts & small goods,Umbrellas
Technology & electronics,Phones,Smartphones
Technology & electronics,Phones,Feature phones
Technology & electronics,Phones,Accessories – cases
Technology & electronics,Phones,Accessories – chargers
Technology & electronics,Phones,Cables & adapters
Technology & electronics,Phones,Power banks
Technology & electronics,Phones,Screen protectors
Technology & electronics,Computers,Laptops
Technology & electronics,Computers,Desktops
Technology & electronics,Computers,Monitors
Technology & electronics,Computers,Tablets
Technology & electronics,Computers,Keyboards
Technology & electronics,Computers,Mice
Technology & electronics,Computers,Printers & scanners
Technology & electronics,Components,CPU
Technology & electronics,Components,GPU
Technology & electronics,Components,Motherboards
Technology & electronics,Components,RAM
Technology & electronics,Components,Storage – SSD/HDD
Technology & electronics,Components,PSU
Technology & electronics,Components,Cases
Technology & electronics,Components,Cooling
Technology & electronics,Audio & video,Headphones
Technology & electronics,Audio & video,Portable speakers
Technology & electronics,Audio & video,Soundbars
Technology & electronics,Audio & video,Hi‑Fi
Technology & electronics,Audio & video,TVs
Technology & electronics,Audio & video,Projectors
Technology & electronics,Audio & video,Streaming devices
Technology & electronics,Gaming,Consoles
Technology & electronics,Gaming,Games
Technology & electronics,Gaming,Controllers
Technology & electronics,Gaming,VR headsets
Technology & electronics,Cameras & photo,DSLR
Technology & electronics,Cameras & photo,Mirrorless
Technology & electronics,Cameras & photo,Lenses
Technology & electronics,Cameras & photo,Action cams
Technology & electronics,Cameras & photo,Drones
Technology & electronics,Cameras & photo,Tripods
Technology & electronics,Networking,Routers
Technology & electronics,Networking,Mesh systems
Technology & electronics,Networking,Range extenders
Technology & electronics,Wearables,Smartwatches
Technology & electronics,Wearables,Fitness trackers
Technology & electronics,Wearables,Accessories
Technology & electronics,Smart home,Lights
Technology & electronics,Smart home,Plugs
Technology & electronics,Smart home,Thermostats
Technology & electronics,Smart home,Sensors
Technology & electronics,Smart home,Hubs
Home,Furniture,Living room
Home,Furniture,Bedroom
Home,Furniture,Kitchen & dining
Home,Furniture,Bathroom
Home,Furniture,Office
Home,Furniture,Kids room
Home,Furniture,Outdoor
Home,Bedding & textiles,Bed linen
Home,Bedding & textiles,Blankets
Home,Bedding & textiles,Pillows
Home,Bedding & textiles,Mattress toppers
Home,Bedding & textiles,Curtains
Home,Bedding & textiles,Rugs
Home,Décor,Wall art
Home,Décor,Vases
Home,Décor,Candles & aromas
Home,Décor,Photo frames
Home,Décor,Mirrors
Home,Lighting,Ceiling
Home,Lighting,Floor
Home,Lighting,Table
Home,Lighting,Outdoor
Home,Lighting,Smart lighting
Home,Kitchenware,Cookware
Home,Kitchenware,Tableware
Home,Kitchenware,Knives
Home,Kitchenware,Storage
Home,Small appliances,Coffee makers
Home,Small appliances,Kettles
Home,Small appliances,Toasters
Home,Small appliances,Microwaves
Home,Small appliances,Blenders
Home,Cleaning & storage,Vacuum & mops
Home,Cleaning & storage,Laundry baskets
Home,Cleaning & storage,Boxes & organizers
Home,DIY & tools,Hand tools
Home,DIY & tools,Power tools
Home,DIY & tools,Fasteners
Home,DIY & tools,Paint & supplies
Home,Garden,Planters
Home,Garden,Garden tools
Home,Garden,BBQ & grills
Home,Garden,Outdoor furniture
Beauty & health,Makeup,Face
Beauty & health,Makeup,Eyes
Beauty & health,Makeup,Lips
Beauty & health,Makeup,Nails
Beauty & health,Makeup,Tools & brushes
Beauty & health,Skincare,Cleansers
Beauty & health,Skincare,Toners
Beauty & health,Skincare,Serums
Beauty & health,Skincare,Moisturizers
Beauty & health,Skincare,Masks
Beauty & health,Skincare,Sun care
Beauty & health,Haircare,Shampoo
Beauty & health,Haircare,Conditioner
Beauty & health,Haircare,Treatments
Beauty & health,Haircare,Styling
Beauty & health,Haircare,Color
Beauty & health,Fragrance,Women
Beauty & health,Fragrance,Men
Beauty & health,Fragrance,Unisex
Beauty & health,Bath & body,Shower gels
Beauty & health,Bath & body,Scrubs
Beauty & health,Bath & body,Lotions
Beauty & health,Bath & body,Deodorants
Beauty & health,Men grooming,Shaving
Beauty & health,Men grooming,Beard care
Beauty & health,Men grooming,Aftershave
Beauty & health,Personal care devices,Hair dryers
Beauty & health,Personal care devices,Straighteners
Beauty & health,Personal care devices,Curlers
Beauty & health,Personal care devices,Trimmers
Beauty & health,Personal care devices,Epilators
Beauty & health,Health,Thermometers
Beauty & health,Health,Blood pressure monitors
Beauty & health,Health,Massagers
Beauty & health,Health,First aid
Sports & outdoors,Fitness,Treadmills
Sports & outdoors,Fitness,Exercise bikes
Sports & outdoors,Fitness,Weights
Sports & outdoors,Fitness,Kettlebells
Sports & outdoors,Fitness,Mats
Sports & outdoors,Fitness,Resistance bands
Sports & outdoors,Team sports,Football
Sports & outdoors,Team sports,Basketball
Sports & outdoors,Team sports,Volleyball
Sports & outdoors,Team sports,Hockey
Sports & outdoors,Running,Shoes
Sports & outdoors,Running,Clothing
Sports & outdoors,Running,Accessories
Sports & outdoors,Cycling,Bikes
Sports & outdoors,Cycling,Helmets
Sports & outdoors,Cycling,Parts
Sports & outdoors,Cycling,Accessories
Sports & outdoors,Outdoor,Camping
Sports & outdoors,Outdoor,Tents
Sports & outdoors,Outdoor,Sleeping bags
Sports & outdoors,Outdoor,Backpacks
Sports & outdoors,Outdoor,Cookware
Sports & outdoors,Water sports,Swimming
Sports & outdoors,Water sports,Surfing
Sports & outdoors,Water sports,Diving
Sports & outdoors,Water sports,SUP
Sports & outdoors,Winter sports,Skiing
Sports & outdoors,Winter sports,Snowboarding
Sports & outdoors,Winter sports,Skating
Sports & outdoors,Racket sports,Tennis
Sports & outdoors,Racket sports,Badminton
Sports & outdoors,Racket sports,Table tennis
Sports & outdoors,Racket sports,Squash
Sports & outdoors,Yoga & pilates,Mats
Sports & outdoors,Yoga & pilates,Blocks
Sports & outdoors,Yoga & pilates,Straps
Sports & outdoors,Yoga & pilates,Clothing
Sports & outdoors,Travel,Suitcases
Sports & outdoors,Travel,Travel accessories
For pets,Dogs,Dry food
For pets,Dogs,Wet food
For pets,Dogs,Treats
For pets,Dogs,Leashes & collars
For pets,Dogs,Beds
For pets,Dogs,Toys
For pets,Dogs,Hygiene & grooming
For pets,Dogs,Clothing
For pets,Cats,Dry food
For pets,Cats,Wet food
For pets,Cats,Treats
For pets,Cats,Litter & trays
For pets,Cats,Beds
For pets,Cats,Toys
For pets,Cats,Hygiene & grooming
For pets,Cats,Scratchers
For pets,Fish & aquariums,Food
For pets,Fish & aquariums,Aquariums
For pets,Fish & aquariums,Filters
For pets,Fish & aquariums,Decor
For pets,Birds,Food
For pets,Birds,Cages
For pets,Birds,Toys
For pets,Birds,Care
For pets,Small animals,Food
For pets,Small animals,Cages
For pets,Small animals,Bedding
For pets,Small animals,Toys
Other,Gifts,Gift sets
Other,Gifts,Gift wrap
Other,Gifts,Cards
Other,Seasonal,Christmas
Other,Seasonal,Easter
Other,Seasonal,Halloween
Other,Seasonal,Back to school
Other,Seasonal,Summer
Other,Party,Decorations
Other,Party,Tableware
Other,Party,Costumes
Other,Stationery & office,Notebooks
Other,Stationery & office,Pens
Other,Stationery & office,Paper
Other,Stationery & office,Folders
Other,Stationery & office,Printers supplies
Other,Automotive accessories,Car care
Other,Automotive accessories,Electronics
Other,Automotive accessories,Interior accessories
Other,Automotive accessories,Exterior accessories
Brands directory,Browse,A‑Z index
Brands directory,Browse,Top brands
Brands directory,Browse,New brands`;

const lines = data.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith('L1'));

const iconsMap = {
  "Women's clothing": 'women',
  "Men's clothing": 'men',
  "Children's clothing": 'children',
  "Accessories (unisex)": 'accessories',
  "Technology & electronics": 'tech',
  "Home": 'home',
  "Beauty & health": 'beauty',
  "Sports & outdoors": 'sports',
  "For pets": 'pets',
  "Other": 'other',
  "Brands directory": 'brands'
};

const tree = [];
let l1Counter = 1;

for (const line of lines) {
  const parts = line.split(',');
  if (parts.length < 3) continue;
  
  const l1 = parts[0].trim();
  const l2 = parts[1].trim();
  const l3 = parts[2].trim();
  
  let l1Node = tree.find(n => n.label === l1);
  if (!l1Node) {
    l1Node = {
      id: 'c' + l1Counter++,
      label: l1,
      icon: iconsMap[l1] || 'other',
      children: []
    };
    tree.push(l1Node);
  }
  
  let l2Node = l1Node.children.find(n => n.label === l2);
  if (!l2Node) {
    l2Node = {
      id: l1Node.id + '-' + (l1Node.children.length + 1),
      label: l2,
      children: []
    };
    l1Node.children.push(l2Node);
  }
  
  l2Node.children.push({
    id: l2Node.id + '-' + (l2Node.children.length + 1),
    label: l3
  });
}

const fileContent = 'export const catalogData = ' + JSON.stringify(tree, null, 2) + ';\n';

fs.writeFileSync('./src/data/catalogData.js', fileContent);
console.log('Done!');
