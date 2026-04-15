import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const messageData: Record<string, unknown> = {
      id: uuidv4(),
      firstName: String(formData.firstName || '').trim(),
      lastName: String(formData.lastName || '').trim(),
      email: String(formData.email || '').trim(),
      subject: String(formData.subject || '').trim(),
      message: String(formData.message || '').trim(),
      createdAt: Timestamp.now(),
      status: 'new',
    };

    if (formData.phone && String(formData.phone).trim()) {
      messageData.phone = String(formData.phone).trim();
    }

    await setDoc(doc(db, 'contact_messages', messageData.id as string), messageData);

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}