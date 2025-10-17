import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFormDto, UpdateFormDto } from './dto';

@Injectable()
export class FormsService {
  constructor(private prisma: PrismaService) {}

  async listByOwner(ownerId: string) {
  return (this.prisma as any).form.findMany({ where: { ownerId }, include: { _count: { select: { submissions: true } } } });
  }

  async create(ownerId: string, dto: CreateFormDto) {
  return (this.prisma as any).form.create({
      data: {
        ownerId,
        title: dto.title,
        description: dto.description,
        isPublic: !!dto.isPublic,
        fields: { create: dto.fields.map((f) => ({
          label: f.label,
          type: f.type as any,
          required: !!f.required,
          order: f.order,
          options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify(f.options || []) : (f.options as any) || [],
          minLength: f.minLength ?? null,
          maxLength: f.maxLength ?? null,
          minValue: f.minValue ?? null,
          maxValue: f.maxValue ?? null,
        })) },
      },
      include: { fields: true },
    });
  }

  async update(formId: string, ownerId: string, dto: UpdateFormDto) {
    const form = await this.prisma.form.findFirst({ where: { id: formId, ownerId } });
    if (!form) throw new NotFoundException('Form not found');

    // Simplify: replace fields fully if provided
  return (this.prisma as any).$transaction(async (tx: any) => {
      if (dto.fields) {
  await (tx as any).field.deleteMany({ where: { formId } });
  await (tx as any).field.createMany({ data: dto.fields.map((f) => ({
          formId,
          label: f.label!,
          type: f.type as any,
          required: !!f.required,
          order: f.order!,
          options: process.env.DATABASE_URL?.startsWith('file:') ? JSON.stringify(f.options || []) : (f.options as any) || [],
          minLength: f.minLength ?? null,
          maxLength: f.maxLength ?? null,
          minValue: f.minValue ?? null,
          maxValue: f.maxValue ?? null,
        })) });
      }
      return (tx as any).form.update({ where: { id: formId }, data: { title: dto.title, description: dto.description, isPublic: dto.isPublic } });
    });
  }

  async remove(formId: string, ownerId: string) {
  const form = await (this.prisma as any).form.findFirst({ where: { id: formId, ownerId } });
    if (!form) throw new NotFoundException('Form not found');
  await (this.prisma as any).form.delete({ where: { id: formId } });
    return { ok: true };
  }

  async getPublicById(publicId: string) {
  const form = await (this.prisma as any).form.findFirst({ where: { publicId, isPublic: true }, include: { fields: true } });
    if (!form) throw new NotFoundException('Form not found');
    if (process.env.DATABASE_URL?.startsWith('file:')) {
      const fields = (form.fields as any[]).map((f: any) => ({
        ...f,
        options: f.options ? JSON.parse(f.options) : [],
      }));
      return { ...form, fields } as any;
    }
    return form;
  }

  async getById(id: string, ownerId: string) {
  const form = await (this.prisma as any).form.findFirst({ where: { id, ownerId }, include: { fields: true } });
    if (!form) throw new NotFoundException('Form not found');
    if (process.env.DATABASE_URL?.startsWith('file:')) {
      const fields = (form.fields as any[]).map((f: any) => ({
        ...f,
        options: f.options ? JSON.parse(f.options) : [],
      }));
      return { ...form, fields } as any;
    }
    return form;
  }
}
