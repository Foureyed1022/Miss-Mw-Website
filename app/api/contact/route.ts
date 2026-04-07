import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore'; // Import from modular SDK
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    const messageData = {
      id: uuidv4(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    // Correct Firestore v9+ syntax
    await setDoc(doc(db, 'contact_messages', messageData.id), messageData);

    return NextResponse.json({ 
      success: true,
      message: "Contact form submitted successfully"
    });

  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}