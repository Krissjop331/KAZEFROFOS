export class CreateProductDto {
    readonly name: string;
    readonly description: string;
    readonly characteristics?: { name: string; value: string }[];
    readonly images?: { url: string }[];
    readonly mainImage: string;
    readonly manufacturer?: string;
    readonly category: string
    readonly translations: { locale: string; name: string; description: string }[];
  }