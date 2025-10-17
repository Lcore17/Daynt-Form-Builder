import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
function toCsv(rows: any[]): string {
  if (!rows.length) return '';
  const headers = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
  const esc = (v: any) =>
    v == null
      ? ''
      : String(typeof v === 'object' ? JSON.stringify(v) : v)
          .replaceAll('"', '""');
  const headerLine = headers.map((h) => `"${esc(h)}"`).join(',');
  const dataLines = rows.map((r) => headers.map((h) => `"${esc(r[h])}"`).join(',')).join('\n');
  return `${headerLine}\n${dataLines}`;
}

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  async submit(publicId: string, payload: any, fileMap: Record<string, string>) {
  const form = await (this.prisma as any).form.findFirst({ where: { publicId, isPublic: true }, include: { fields: true } });
    if (!form) throw new NotFoundException('Form not found');
  const created = await (this.prisma as any).submission.create({ data: { formId: form.id } });
    // flatten answers
    for (const field of form.fields) {
      const val = payload[field.id] ?? payload[field.label];
      const filePath = fileMap[field.id] || fileMap[field.label];
  await (this.prisma as any).submissionAnswer.create({
        data: {
          submissionId: created.id,
          fieldId: field.id,
          value: process.env.DATABASE_URL?.startsWith('file:') ? (val == null ? null : JSON.stringify(val)) : (val as any),
          filePath: filePath || null,
        },
      });
    }
    return { id: created.id };
  }

  async listByForm(formId: string, ownerId: string) {
  const form = await (this.prisma as any).form.findFirst({ where: { id: formId, ownerId } });
    if (!form) throw new NotFoundException('Form not found');
  return (this.prisma as any).submission.findMany({ where: { formId }, include: { answers: true } });
  }

  async export(formId: string, ownerId: string, type: 'csv' | 'json') {
    const list = await this.listByForm(formId, ownerId);
    const rows = list.map((s: any) => ({
      id: s.id,
      createdAt: s.createdAt,
      ...Object.fromEntries((s.answers as any[]).map((a: any) => [a.fieldId, a.filePath ?? a.value]))
    }));
    if (type === 'json') return JSON.stringify(rows, null, 2);
    return toCsv(rows);
  }
}
