export interface CreateFormDto {
  title: string;
  description?: string;
  isPublic?: boolean;
  fields: Array<{
    label: string;
    type: 'TEXT' | 'NUMBER' | 'TEXTAREA' | 'CHECKBOX' | 'RADIO' | 'IMAGE';
    required?: boolean;
    order: number;
    options?: string[];
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
  }>;
}

export type UpdateFormDto = Partial<CreateFormDto>;
