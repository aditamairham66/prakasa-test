export interface User {
 id?: number | null;
 name?: string | null;
 email?: string | null;
 email_verified_at?: string | null;
 created_at?: string | null;
 updated_at?: string | null;
}

export interface Post {
 id?: number | null;
 title?: string | null;
 date?: string | null; // Menggunakan string untuk merepresentasikan tanggal dan waktu
 image?: string | null;
 desc?: string | null;
 user?: User | null; // Menggunakan null untuk menandakan bahwa user bisa kosong
 created_at?: string | null;
 updated_at?: string | null;
 deleted_at?: string | null;
}