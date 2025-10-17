import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'demo@formapp.dev' },
    update: {},
    create: { email: 'demo@formapp.dev', password, name: 'Demo User' },
  });

  // 1. Customer Feedback Form
  const feedback = await prisma.form.create({
    data: {
      ownerId: user.id,
      title: 'Customer Feedback Form',
      description: 'Tell us what you think',
      isPublic: true,
      fields: {
        create: [
          { label: 'Name', type: 'TEXT' as any, required: true, order: 0, options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify([]) : ([] as any) },
          { label: 'Email', type: 'TEXT' as any, required: true, order: 1, options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify([]) : ([] as any) },
          { label: 'Satisfaction', type: 'RADIO' as any, options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify(['Great','Okay','Bad']) : (['Great','Okay','Bad'] as any), required: true, order: 2 },
          { label: 'Comments', type: 'TEXTAREA' as any, order: 3, options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify([]) : ([] as any) },
        ],
      },
    },
  });

  // 2. Job Application Form
  const job = await prisma.form.create({
    data: {
      ownerId: user.id,
      title: 'Job Application Form',
      description: 'Apply to join our team',
      isPublic: true,
      fields: {
        create: [
          { label: 'Full Name', type: 'TEXT' as any, required: true, order: 0, options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify([]) : ([] as any) },
          { label: 'Years of Experience', type: 'NUMBER' as any, required: true, minValue: 0, order: 1, options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify([]) : ([] as any) },
          { label: 'Skills', type: 'CHECKBOX' as any, options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify(['JS','TS','Nest','Next','SQL']) : (['JS','TS','Nest','Next','SQL'] as any), order: 2 },
          { label: 'Resume (Image)', type: 'IMAGE' as any, order: 3, options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify([]) : ([] as any) },
        ],
      },
    },
  });

  // 3. Survey Form showcasing all
  const survey = await prisma.form.create({
    data: {
      ownerId: user.id,
      title: 'Survey Form',
      description: 'Mixed field types',
      isPublic: true,
      fields: {
        create: [
          { label: 'Short Text', type: 'TEXT' as any, order: 0, options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify([]) : ([] as any) },
          { label: 'Number', type: 'NUMBER' as any, minValue: 0, maxValue: 100, order: 1, options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify([]) : ([] as any) },
          { label: 'Long Text', type: 'TEXTAREA' as any, order: 2, options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify([]) : ([] as any) },
          { label: 'Select One', type: 'RADIO' as any, options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify(['A','B','C']) : (['A','B','C'] as any), order: 3 },
          { label: 'Select Many', type: 'CHECKBOX' as any, options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify(['X','Y','Z']) : (['X','Y','Z'] as any), order: 4 },
          { label: 'Upload Image', type: 'IMAGE' as any, order: 5, options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify([]) : ([] as any) },
        ],
      },
    },
  });

  console.log({ user: user.email, feedback: feedback.publicId, job: job.publicId, survey: survey.publicId });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
