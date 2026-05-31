import { NextRequest, NextResponse } from 'next/server';
import { FirebaseRepository } from '@/services/implementations/firebaseRepository';
import { Project } from '@/types';

const projectRepo = new FirebaseRepository<Project>('projects');

export async function GET() {
  try {
    const projects = await projectRepo.getAll();
    return NextResponse.json({ success: true, data: projects });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch projects';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const project = await projectRepo.create(body);
    return NextResponse.json({ success: true, data: project });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create project';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}