export interface User {
 id: number;
 name: string;
 email: string;
 email_verified_at?: string | null;
 created_at?: string | null;
 updated_at?: string | null;
}

export interface Post {
 id: number;
 title: string;
 date: string; // Menggunakan string untuk merepresentasikan tanggal dan waktu
 image: string;
 desc: string;
 user?: User | null; // Menggunakan null untuk menandakan bahwa user bisa kosong
 created_at?: string | null;
 updated_at?: string | null;
 deleted_at?: string | null;
}