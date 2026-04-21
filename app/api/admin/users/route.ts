import { NextRequest, NextResponse } from 'next/server';
import { initAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';


export async function GET(req: NextRequest) {
  const admin = initAdmin();
  if (!admin) return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const db = admin.firestore();
    
    // Check if the requester is a superadmin
    const requesterDoc = await db.collection('users').doc(decodedToken.uid).get();
    const requesterData = requesterDoc.data();
    
    if (requesterData?.role !== 'superadmin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // List all users from Firestore
    const usersSnapshot = await db.collection('users').orderBy('createdAt', 'desc').get();
    const users = usersSnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    }));

    return NextResponse.json(users);
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Unauthorized', details: error?.message, stack: error?.stack }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  const admin = initAdmin();
  if (!admin) return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const db = admin.firestore();
    
    // Check if the requester is a superadmin
    const requesterDoc = await db.collection('users').doc(decodedToken.uid).get();
    const requesterData = requesterDoc.data();
    
    if (requesterData?.role !== 'superadmin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { email, password, displayName, role } = await req.json();

    if (!email || !password || !displayName || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    // Create user profile in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email,
      displayName,
      role,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });


    return NextResponse.json({ 
      message: 'User created successfully', 
      user: { uid: userRecord.uid, email, displayName, role } 
    });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: error.message || 'Error occurred' }, { status: 500 });
  }
}
