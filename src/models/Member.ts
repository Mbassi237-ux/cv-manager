export interface Member {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  profession: string;
  bio: string;
  diplomas: string;
  skills: string;
  career: string;
  languages: string;
  photo?: string;
  video?: string;
  audio?: string;
  createdAt: number;
  updatedAt: number;
}
