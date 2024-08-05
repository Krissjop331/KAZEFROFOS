export class UpdateProductDto {
    name?: string;
    description?: string;
    category?: string;
    manufacturer?: string;

    characteristics?: {
      name: string;
      value: string;
    }[];
  
    images?: string[];
    mainImage: string;
    translations: { locale: string; name: string; description: string }[];
  }