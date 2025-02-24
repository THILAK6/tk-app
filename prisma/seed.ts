import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// Fault probabilities by fabric type
const faultChances: Record<string, { type: string; code: string; chance: number }[]> = {
  Cotton: [
    { type: "Weft Fault", code: "WF02", chance: 30 },
    { type: "Slub", code: "SB01", chance: 40 },
    { type: "Warp Fault", code: "WF01", chance: 20 },
  ],
  Denim: [
    { type: "Warp Fault", code: "WF01", chance: 50 },
    { type: "Broken Pick", code: "BP01", chance: 30 },
  ],
  Silk: [
    { type: "Oil Stain", code: "OS01", chance: 60 },
    { type: "Slub", code: "SB01", chance: 20 },
  ],
  Polyester: [
    { type: "Weft Fault", code: "WF02", chance: 40 },
    { type: "Oil Stain", code: "OS01", chance: 30 },
  ],
};

// Shift-wise fault probability adjustments
const shiftModifiers: Record<string, number> = {
  Morning: 0.8, // Fewer faults
  Evening: 1.0, // Neutral
  Night: 1.2, // More faults due to less supervision
};

async function main() {
  console.log("Seeding database with meaningful test data...");

  // Create Fault Types
  const faultTypes = await Promise.all(
    ["Warp Fault", "Weft Fault", "Oil Stain", "Slub", "Broken Pick"].map((fault, i) =>
      prisma.faultType.create({
        data: { faultType: fault, faultCode: `FT${i + 1}` },
      })
    )
  );

  // Create Customers
  const customers = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.customer.create({
        data: { name: faker.company.name() },
      })
    )
  );

  // Create Machines
  const machines = await Promise.all(
    Array.from({ length: 3 }).map((_, i) =>
      prisma.machine.create({
        data: { machine: `Machine-${i + 1}` },
      })
    )
  );

  // Create Inspectors
  const inspectors = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.user.create({
        data: { name: faker.person.fullName() },
      })
    )
  );

  // Create Inspected Types (Fabric Types)
  const fabricTypes = await Promise.all(
    Object.keys(faultChances).map((type) =>
      prisma.inspectedType.create({
        data: { inspectedType: type },
      })
    )
  );

  // Create Conclusions
  const conclusions = await Promise.all(
    ["Passed", "Rejected", "Rework Needed"].map((conclusion) =>
      prisma.conclusion.create({
        data: { conclusion },
      })
    )
  );

  // Create Rolls with Faults based on realistic data patterns
  for (let i = 0; i < 20; i++) {
    const shift = ["Morning", "Evening", "Night"][i % 3];
    const fabricType = fabricTypes[i % fabricTypes.length];
    const customer = customers[i % customers.length];
    const machine = machines[i % machines.length];

    const roll = await prisma.roll.create({
      data: {
        siNo: faker.string.alphanumeric(6),
        inspectedBy1: inspectors[i % inspectors.length].id,
        inspectedBy2: inspectors[(i + 1) % inspectors.length].id,
        inspectedTypeId: fabricType.id,
        inspectedQnty: faker.number.float({ min: 50, max: 500}),
        rollNo: faker.string.alphanumeric(8).toUpperCase(),
        inspectionMachineId: machine.id,
        shift,
        skipNo: faker.string.numeric(2),
        prdn: faker.date.past().toISOString(),
        startTime: faker.date.past(),
        endTime: faker.date.recent(),
        packedBy1: faker.person.fullName(),
        packedBy2: faker.person.fullName(),
        note: faker.lorem.sentence(),
        customerId: customer.id,
        conclusionId: conclusions[i % conclusions.length].id,
      },
    });

    // Generate faults based on fabric type & shift
    const faultOptions = faultChances[fabricType.inspectedType];
    for (const { type, chance } of faultOptions) {
      const faultProbability = chance * shiftModifiers[shift]; // Adjust for shift
      if (faker.number.int({ min: 1, max: 100 }) <= faultProbability) {
        const faultType = faultTypes.find((ft) => ft.faultType === type);
        if (faultType) {
          await prisma.fault.create({
            data: {
              date: faker.date.recent(),
              refRoll: roll.id,
              faultLength: faker.number.float({ min: 0.1, max: 2.0}),
              time: faker.date.recent(),
              faultTypeId: faultType.id,
              remarks: faker.lorem.words(5),
            },
          });
        }
      }
    }
  }

  console.log("Database seeded successfully with meaningful data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
