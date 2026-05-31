import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { IStorageService } from '../interfaces/IRepository';
import { UploadResponse } from '@/types';

const STORAGE_LIMIT = 1 * 1024 * 1024 * 1024; // 1GB

class CloudflareStorageService implements IStorageService {
  private client: S3Client;
  private bucket: string;
  private publicUrl: string;

  constructor() {
    this.client = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
      },
    });
    this.bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME!;
    this.publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL!;
  }

  async uploadFile(file: File, path: string): Promise<UploadResponse> {
    const { available } = await this.checkStorageLimit();
    if (!available) {
      throw new Error('Storage limit exceeded');
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `${path}/${Date.now()}-${file.name}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    return {
      url: `${this.publicUrl}/${key}`,
      key,
      size: file.size,
      type: file.type,
    };
  }

  async deleteFile(key: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      })
    );
  }

  getFileUrl(key: string): string {
    return `${this.publicUrl}/${key}`;
  }

  async checkStorageLimit(): Promise<{ used: number; limit: number; available: boolean }> {
    const command = new ListObjectsV2Command({ Bucket: this.bucket });
    const response = await this.client.send(command);
    const totalSize = response.Contents?.reduce(
      (acc: number, obj: { Size?: number }) => acc + (obj.Size || 0),
      0
    ) || 0;

    return {
      used: totalSize,
      limit: STORAGE_LIMIT,
      available: totalSize < STORAGE_LIMIT * 0.95,
    };
  }
}

export const cloudflareStorage = new CloudflareStorageService();