export class Todo {
  id: number;
  status: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(obj: any) {
    this.id        = obj && obj.id || null;
    this.status    = obj && obj.status || 0;
    this.title     = obj && obj.title  || '';
    this.createdAt = obj && obj.created_at || null;
    this.updatedAt = obj && obj.updated_at || null;
  }
}
