import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Soil Types
  const alluvial = await prisma.soilType.upsert({
    where: { name: 'Alluvial' },
    update: {},
    create: {
      name: 'Alluvial',
      description: 'Fertile soil suitable for various crops.',
      characteristics: 'Rich in potash and lime.',
    },
  });

  const black = await prisma.soilType.upsert({
    where: { name: 'Black' },
    update: {},
    create: {
      name: 'Black',
      description: 'Good for cotton and sugarcane.',
      characteristics: 'High water retention capacity.',
    },
  });

  // Seed Seasons
  const kharif = await prisma.season.upsert({
    where: { name: 'Kharif' },
    update: {},
    create: { name: 'Kharif', months: 'June-October' },
  });

  const rabi = await prisma.season.upsert({
    where: { name: 'Rabi' },
    update: {},
    create: { name: 'Rabi', months: 'October-March' },
  });

  // Seed Crops
  const rice = await prisma.crop.create({
    data: {
      name: 'Rice',
      scientificName: 'Oryza sativa',
      duration: '120-150 days',
      waterRequirement: 'High',
      description: 'Major food crop.',
      suitability: {
        create: [
          { soilTypeId: alluvial.id, seasonId: kharif.id },
        ],
      },
      marketPrices: {
        create: [
          { marketName: 'Delhi Mandi', price: 2500, state: 'Delhi', district: 'Delhi' },
        ],
      },
    },
  });

  const wheat = await prisma.crop.create({
    data: {
      name: 'Wheat',
      scientificName: 'Triticum',
      duration: '120-140 days',
      waterRequirement: 'Medium',
      description: 'Staple food crop.',
      suitability: {
        create: [
          { soilTypeId: alluvial.id, seasonId: rabi.id },
        ],
      },
      marketPrices: {
        create: [
          { marketName: 'Punjab Mandi', price: 2200, state: 'Punjab', district: 'Ludhiana' },
        ],
      },
    },
  });

  // Seed Schemes
  await prisma.governmentScheme.create({
    data: {
      name: 'PM-KISAN',
      description: 'Income support scheme for farmers.',
      eligibilityCriteria: 'Small and marginal farmers.',
      applicationLink: 'https://pmkisan.gov.in',
    },
  });

  // Seed Weather Data
  await prisma.weatherData.create({
    data: {
      location: 'New Delhi',
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      rainfall: 0,
      forecast: 'Sunny with clear skies',
    },
  });

  // Seed Tasks
  await prisma.task.createMany({
    data: [
      {
        category: 'Preparation',
        task: 'Soil testing for Nitrogen levels',
        dueDate: new Date('2024-11-25'),
        completed: false,
      },
      {
        category: 'Sowing',
        task: 'Purchase high-yield wheat seeds',
        dueDate: new Date('2024-11-28'),
        completed: false,
      },
      {
        category: 'Irrigation',
        task: 'Check canal water availability',
        dueDate: new Date('2024-12-01'),
        completed: false,
      },
    ],
  });

  // Seed Crop Advisories
  // Ensure we have a crop ID to link to
  const wheatCrop = await prisma.crop.findFirst({ where: { name: 'Wheat' } });
  if (wheatCrop) {
    await prisma.cropAdvisory.createMany({
      data: [
        {
          cropId: wheatCrop.id,
          location: 'Field A (North)',
          stage: 'Vegetative',
          status: 'active',
          date: new Date(),
          message: 'Apply nitrogen fertilizer as per soil test results.',
        },
        {
          cropId: wheatCrop.id,
          location: 'Field B (South)',
          stage: 'Sowing',
          status: 'completed',
          date: new Date('2023-11-15'),
          message: 'Completed sowing of HD-2967 variety.',
        },
      ],
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
